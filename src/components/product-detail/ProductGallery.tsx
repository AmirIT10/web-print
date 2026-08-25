'use client';

import React from 'react';
import { tokens } from '@/types/tokens';
import { ProductImage } from '@/types';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const hasMultipleImages = images.length > 1;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!hasMultipleImages) return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % images.length);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (images.length === 0) {
    return (
      <div
        style={{
          aspectRatio: '1/1',
          borderRadius: tokens.radius.image,
          backgroundColor: tokens.colors.background,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke={tokens.colors.text[500]}
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <p
          style={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.body.fontSize,
            color: tokens.colors.text[500],
            margin: 0,
          }}
        >
          تصویری برای نمایش وجود ندارد.
        </p>
      </div>
    );
  }

  const currentImage = images[selectedIndex];

  return (
    <div>
      {/* Main Image */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '1/1',
          borderRadius: tokens.radius.image,
          overflow: 'hidden',
          backgroundColor: tokens.colors.border,
          marginBottom: hasMultipleImages ? '16px' : 0,
        }}
        onKeyDown={handleKeyDown}
        tabIndex={hasMultipleImages ? 0 : -1}
        role={hasMultipleImages ? 'img' : undefined}
        aria-label={hasMultipleImages ? `${productName} - تصویر ${selectedIndex + 1} از ${images.length}` : productName}
      >
        {!imageLoaded && !imageError && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: tokens.colors.border,
              animation: 'pulse 1.5s infinite',
            }}
          />
        )}
        {imageError && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: tokens.colors.background,
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke={tokens.colors.text[500]}
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
        <img
          src={currentImage.url}
          alt={currentImage.alt || productName}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageLoaded(false);
            setImageError(true);
          }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0,
            transition: `opacity ${tokens.transitions.default}`,
          }}
        />
      </div>

      {/* Thumbnails */}
      {hasMultipleImages && (
        <div
          className="thumbnail-rail"
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}
        >
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => {
                setSelectedIndex(index);
                setImageLoaded(false);
                setImageError(false);
              }}
              aria-label={`تصویر ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : undefined}
              style={{
                flexShrink: 0,
                width: '80px',
                height: '80px',
                borderRadius: tokens.radius.image,
                overflow: 'hidden',
                border: index === selectedIndex 
                  ? `2px solid ${tokens.colors.primary[500]}` 
                  : `2px solid transparent`,
                backgroundColor: tokens.colors.background,
                cursor: 'pointer',
                padding: 0,
                minHeight: tokens.spacing.touchTarget,
                minWidth: tokens.spacing.touchTarget,
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `2px solid ${tokens.colors.primary[500]}`;
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              <img
                src={image.url}
                alt=""
                role="presentation"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: ${tokens.breakpoints.mobile}) {
          .thumbnail-rail {
            overflow-x: auto !important;
            scroll-snap-type: x mandatory;
          }
          .thumbnail-rail button {
            scroll-snap-align: start;
          }
        }
      `}</style>
    </div>
  );
};
