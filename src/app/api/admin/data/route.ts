import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { isAuthenticated } from '@/lib/admin-auth';
import { writeFile, uploadImage } from '@/lib/github';

export async function GET(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: 'Missing file parameter' }, { status: 400 });
  }

  try {
    // Read directly from the local file system (files are part of the build)
    const filePath = join(process.cwd(), file);
    const content = readFileSync(filePath, 'utf-8');
    return NextResponse.json({ content });
  } catch (err) {
    return NextResponse.json({ error: `Failed to read ${file}: ${String(err)}` }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, file, content, message, imagePath, imageData } = body;

    if (action === 'upload-image') {
      if (!imagePath || !imageData) {
        return NextResponse.json({ error: 'Missing imagePath or imageData' }, { status: 400 });
      }
      const publicPath = await uploadImage(imagePath, imageData, message || `Upload image: ${imagePath}`);
      return NextResponse.json({ path: publicPath });
    }

    if (!file || content === undefined) {
      return NextResponse.json({ error: 'Missing file or content' }, { status: 400 });
    }

    await writeFile(file, content, message || `Admin: Update ${file}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
