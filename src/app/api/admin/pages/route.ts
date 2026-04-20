import { NextResponse } from 'next/server';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { isAuthenticated } from '@/lib/admin-auth';
import { writeFile, deleteFile } from '@/lib/github';
import type { PageConfig } from '@/types/page-builder';

const PAGES_DIR = 'src/data/pages';

const RESERVED_SLUGS = new Set([
  'api', 'admin', 'preview', '_next', 'favicon.ico',
  'about', 'contact', 'projects', 'contractors', 'suppliers',
  'faq', 'safety', 'training', 'home',
]);

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9][a-z0-9-]*$/.test(slug) && slug.length >= 2 && slug.length <= 50;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const dir = join(process.cwd(), PAGES_DIR);
    if (!existsSync(dir)) return NextResponse.json({ pages: [] });

    const files = readdirSync(dir).filter((f) => f.endsWith('.json'));
    const pages = files.map((file) => {
      const slug = file.replace(/\.json$/, '');
      const content = readFileSync(join(dir, file), 'utf-8');
      try {
        const config = JSON.parse(content) as PageConfig;
        return {
          slug,
          title: config.title || slug,
          sectionCount: config.sections?.length || 0,
          description: config.metadata?.description || '',
          isBuiltIn: RESERVED_SLUGS.has(slug),
        };
      } catch {
        return { slug, title: slug, sectionCount: 0, description: '', isBuiltIn: RESERVED_SLUGS.has(slug) };
      }
    });

    return NextResponse.json({ pages });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug, title, metaTitle, metaDescription } = await request.json();

    if (!slug || !title) {
      return NextResponse.json({ error: 'Missing slug or title' }, { status: 400 });
    }
    if (!isValidSlug(slug)) {
      return NextResponse.json(
        { error: 'Slug must be lowercase letters, numbers, and dashes (2-50 chars)' },
        { status: 400 }
      );
    }
    if (RESERVED_SLUGS.has(slug)) {
      return NextResponse.json({ error: `"${slug}" is reserved` }, { status: 400 });
    }

    const filePath = `${PAGES_DIR}/${slug}.json`;
    const fullPath = join(process.cwd(), filePath);
    if (existsSync(fullPath)) {
      return NextResponse.json({ error: `Page "${slug}" already exists` }, { status: 409 });
    }

    const config: PageConfig = {
      slug,
      title,
      metadata: {
        title: metaTitle || title,
        description: metaDescription || '',
      },
      sections: [
        {
          id: `${slug}-banner`,
          type: 'PageBanner',
          props: { title, subtitle: metaDescription || '', backgroundImage: '/images/hero-interior.png' },
          enabled: true,
        },
      ],
    };

    await writeFile(filePath, JSON.stringify(config, null, 2), `Admin: Create page "${title}"`);

    return NextResponse.json({ success: true, slug });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await request.json();
    if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

    if (RESERVED_SLUGS.has(slug)) {
      return NextResponse.json(
        { error: `"${slug}" is a built-in page and cannot be deleted` },
        { status: 400 }
      );
    }

    await deleteFile(`${PAGES_DIR}/${slug}.json`, `Admin: Delete page "${slug}"`);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
