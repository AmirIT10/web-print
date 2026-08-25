'use client';

import React from 'react';
import { tokens } from '@/types/tokens';
import { ProductCardData } from '@/types';

interface RelatedProductsSectionProps {
  title: string;
  products: ProductCardData[];
}

export const RelatedProductsSection: React.FC<RelatedProductsSectionProps> = ({
  title,
  products,
}) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      // Simulate random error for demo
      if (Math.random() > 1.5) {
        setError(true);
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!products || products.length === 0) {
    return null;
  }

  if (error) {
    return (
      <section
        style={{
          padding: `${tokens.spacing.sectionVertical.desktop} ${tokens.spacing.desktopPadding}`,
          backgroundColor: tokens.colors.background,
        }}
      >
        <div
          style={{
            maxWidth: tokens.spacing.pageMaxWidth,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.body.fontSize,
              color: tokens.colors.error,
              marginBottom: '16px',
            }}
          >
            بارگذاری محصولات مرتبط با خطا مواجه شد
          </p>
          <button
            onClick={() => {
              setLoading(true);
              setError(false);
              setTimeout(() => setLoading(false), 500);
            }}
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.button.fontSize,
              fontWeight: tokens.typography.button.fontWeight,
              color: tokens.colors.primary[500],
              background: 'none',
              border: `2px solid ${tokens.colors.primary[500]}`,
              borderRadius: tokens.radius.button,
              padding: '8px 24px',
              cursor: 'pointer',
              minHeight: tokens.spacing.touchTarget,
            }}
          >
            تلاش مجدد
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        padding: `${tokens.spacing.sectionVertical.desktop} ${tokens.spacing.desktopPadding}`,
        backgroundColor: tokens.colors.background,
      }}
    >
      <div
        style={{
          maxWidth: tokens.spacing.pageMaxWidth,
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.h2.desktop.fontSize,
            fontWeight: tokens.typography.h2.desktop.fontWeight,
            color: tokens.colors.text[900],
            margin: '0 0 24px',
          }}
        >
          {title}
        </h2>

        {/* Desktop/Tablet Grid */}
        <div
          className="related-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
          }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: tokens.radius.card,
                    backgroundColor: tokens.colors.surface,
                    padding: tokens.spacing.cardPadding,
                    boxShadow: tokens.shadow.default,
                  }}
                >
                  <div
                    style={{
                      aspectRatio: '1/1',
                      borderRadius: tokens.radius.image,
                      backgroundColor: tokens.colors.border,
                      animation: 'pulse 1.5s infinite',
                    }}
                  />
                </div>
              ))
            : products.map((product) => (
                <a
                  key={product.id}
                  href={`/products/${product.slug}`}
                  style={{
                    display: 'block',
                    borderRadius: tokens.radius.card,
                    backgroundColor: tokens.colors.surface,
                    padding: tokens.spacing.cardPadding,
                    boxShadow: tokens.shadow.default,
                    textDecoration: 'none',
                    transition: `transform ${tokens.transitions.default}, box-shadow ${tokens.transitions.default}`,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = tokens.shadow.default;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    loading="lazy"
                    style={{
                      width: '100%',
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      borderRadius: tokens.radius.image,
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: tokens.typography.fontFamily,
                      fontSize: tokens.typography.h3.desktop.fontSize,
                      fontWeight: tokens.typography.h3.desktop.fontWeight,
                      color: tokens.colors.text[900],
                      margin: '16px 0 8px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {product.name}
                  </h3>
                </a>
              ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div
          className="related-rail"
          style={{
            display: 'none',
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollSnapType: 'x mandatory',
            gap: '16px',
            paddingBottom: '16px',
          }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    minWidth: '260px',
                    scrollSnapAlign: 'start',
                    borderRadius: tokens.radius.card,
                    backgroundColor: tokens.colors.surface,
                    padding: tokens.spacing.cardPadding,
                    boxShadow: tokens.shadow.default,
                  }}
                >
                  <div
                    style={{
                      aspectRatio: '1/1',
                      borderRadius: tokens.radius.image,
                      backgroundColor: tokens.colors.border,
                      animation: 'pulse 1.5s infinite',
                    }}
                  />
                </div>
              ))
            : products.map((product) => (
                <a
                  key={product.id}
                  href={`/products/${product.slug}`}
                  style={{
                    minWidth: '260px',
                    scrollSnapAlign: 'start',
                    borderRadius: tokens.radius.card,
                    backgroundColor: tokens.colors.surface,
                    padding: tokens.spacing.cardPadding,
                    boxShadow: tokens.shadow.default,
                    textDecoration: 'none',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    loading="lazy"
                    style={{
                      width: '100%',
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      borderRadius: tokens.radius.image,
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: tokens.typography.fontFamily,
                      fontSize: tokens.typography.h3.mobile.fontSize,
                      fontWeight: tokens.typography.h3.desktop.fontWeight,
                      color: tokens.colors.text[900],
                      margin: '16px 0 8px',
                    }}
                  >
                    {product.name}
                  </h3>
                </a>
              ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: ${tokens.breakpoints.tablet}) {
          section {
            padding: ${tokens.spacing.sectionVertical.tablet} ${tokens.spacing.tabletPadding} !important;
          }
          .related-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          h2 {
            font-size: ${tokens.typography.h2.mobile.fontSize} !important;
          }
        }
        @media (max-width: ${tokens.breakpoints.mobile}) {
          section {
            padding: ${tokens.spacing.sectionVertical.mobile} ${tokens.spacing.mobilePadding} !important;
          }
          .related-grid {
            display: none !important;
          }
          .related-rail {
            display: flex !important;
          }
          h2 {
            font-size: ${tokens.typography.h2.mobile.fontSize} !important;
          }
          h3 {
            font-size: ${tokens.typography.h3.mobile.fontSize} !important;
          }
        }
      `}</style>
    </section>
  );
};
