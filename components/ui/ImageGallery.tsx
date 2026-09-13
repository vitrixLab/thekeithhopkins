'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { resolveImagePath } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const cleanImages = images
    .map(resolveImagePath)
    .filter((src) => src && !src.includes('undefined'));

  if (!cleanImages.length) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + cleanImages.length) % cleanImages.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % cleanImages.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {cleanImages.map((src, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className="glass-card group relative aspect-square w-full overflow-hidden rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <Image
              src={src}
              alt={`${title} image ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 backdrop-blur-sm">
                <Maximize2 className="h-5 w-5" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 z-10 rounded-full bg-gray-800/80 p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            aria-label="Close image preview"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev Button */}
          {cleanImages.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-gray-800/80 p-3 text-white transition-colors hover:bg-gray-700"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Current Image */}
          <div
            className="relative max-h-[85vh] max-w-[90vw] aspect-video w-[1000px] overflow-hidden rounded-xl border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={cleanImages[selectedIndex]}
              alt={`${title} preview ${selectedIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next Button */}
          {cleanImages.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-gray-800/80 p-3 text-white transition-colors hover:bg-gray-700"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Image index indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-gray-900/80 px-4 py-1.5 text-xs text-gray-300 backdrop-blur-sm">
            {selectedIndex + 1} / {cleanImages.length}
          </div>
        </div>
      )}
    </>
  );
}
