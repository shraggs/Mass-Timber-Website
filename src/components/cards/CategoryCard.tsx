import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/projects?category=${category.slug}`} className="group block">
      <div className="relative h-64 rounded-xl overflow-hidden glass-hover-glow">
        {category.image && (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-cream font-[family-name:var(--font-jakarta)]">{category.name}</h3>
          <p className="text-amber-400 text-sm font-semibold mt-1">{category.projectCount} Projects</p>
        </div>
      </div>
    </Link>
  );
}
