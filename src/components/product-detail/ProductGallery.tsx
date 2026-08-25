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
  const [lightboxOpen, setLightboxOpen] = React.useState(false);

  const hasMultipleImages = images.length > 1;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!hasMultipleImages && !lightboxOpen) return;
    
    if (lightboxOpen) {
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      return;
    }
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % images.length);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Touch/swipe handling for mobile
  const touchStartX = React.useRef<number | null>(null);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !hasMultipleImages) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        // Swipe left - next image
        setSelectedIndex((prev) => (prev + 1) % images.length);
      } else {
        // Swipe right - previous image
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
    
    touchStartX.current = null;
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
          onClick={() => setLightboxOpen(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0,
            transition: `opacity ${tokens.transitions.default}`,
            cursor: hasMultipleImages ? 'pointer' : 'default',
          }}
        />
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setLightboxOpen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="نمایش بزرگ تصویر"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: tokens.colors.surface,
              cursor: 'pointer',
              padding: '12px',
              minHeight: tokens.spacing.touchTarget,
              minWidth: tokens.spacing.touchTarget,
              zIndex: 2001,
            }}
            aria-label="بستن نمایش بزرگ"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
            }}
            style={{
              position: 'absolute',
              left: '20px',
              background: 'none',
              border: 'none',
              color: tokens.colors.surface,
              cursor: 'pointer',
              padding: '16px',
              minHeight: tokens.spacing.touchTarget,
              minWidth: tokens.spacing.touchTarget,
              opacity: 0.8,
            }}
            aria-label="تصویر قبلی"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev + 1) % images.length);
            }}
            style={{
              position: 'absolute',
              right: '20px',
              background: 'none',
              border: 'none',
              color: tokens.colors.surface,
              cursor: 'pointer',
              padding: '16px',
              minHeight: tokens.spacing.touchTarget,
              minWidth: tokens.spacing.touchTarget,
              opacity: 0.8,
            }}
            aria-label="تصویر بعدی"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          
          <div
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={currentImage.url}
              alt={currentImage.alt || productName}
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                objectFit: 'contain',
              }}
            />
            <p
              style={{
                textAlign: 'center',
                color: tokens.colors.surface,
                fontFamily: tokens.typography.fontFamily,
                fontSize: tokens.typography.caption.fontSize,
                marginTop: '12px',
              }}
            >
              تصویر {selectedIndex + 1} از {images.length}
            </p>
          </div>
        </div>
      )}

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
