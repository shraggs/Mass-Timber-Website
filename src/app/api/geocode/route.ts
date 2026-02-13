import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&countrycodes=us,ca`,
      {
        headers: {
          'User-Agent': 'IWMassTimber/1.0 (contact@iwmasstimber.com)',
        },
      }
    );

    const data = await response.json();

    if (!data.length) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }

    return NextResponse.json({
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      displayName: data[0].display_name,
    });
  } catch {
    return NextResponse.json({ error: 'Geocoding service unavailable' }, { status: 503 });
  }
}
