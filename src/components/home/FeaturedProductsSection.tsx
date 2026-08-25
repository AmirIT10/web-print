'use client';

import React from 'react';
import { tokens } from '@/types/tokens';
import { ProductCardData } from '@/types';

interface FeaturedProductsSectionProps {
  title: string;
  products: ProductCardData[];
  viewAllHref?: string;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  title,
  products,
  viewAllHref,
}) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (products.length === 0) {
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
              marginBottom: '16px',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.body.fontSize,
              color: tokens.colors.text[500],
            }}
          >
            محصول منتخب برای نمایش وجود ندارد.
          </p>
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <h2
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.h2.desktop.fontSize,
              fontWeight: tokens.typography.h2.desktop.fontWeight,
              color: tokens.colors.text[900],
            }}
          >
            {title}
          </h2>
          {viewAllHref && (
            <a
              href={viewAllHref}
              style={{
                fontFamily: tokens.typography.fontFamily,
                fontSize: tokens.typography.button.fontSize,
                fontWeight: tokens.typography.button.fontWeight,
                color: tokens.colors.primary[500],
                textDecoration: 'none',
              }}
            >
              مشاهده همه
            </a>
          )}
        </div>

        {/* Desktop/Tablet Grid */}
        <div
          className="products-grid"
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
                  <div
                    style={{
                      height: '20px',
                      width: '80%',
                      backgroundColor: tokens.colors.border,
                      marginTop: '16px',
                      borderRadius: '4px',
                      animation: 'pulse 1.5s infinite',
                    }}
                  />
                  <div
                    style={{
                      height: '14px',
                      width: '60%',
                      backgroundColor: tokens.colors.border,
                      marginTop: '8px',
                      borderRadius: '4px',
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
                  <p
                    style={{
                      fontFamily: tokens.typography.fontFamily,
                      fontSize: tokens.typography.bodySm.fontSize,
                      color: tokens.colors.text[500],
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {product.shortDescription}
                  </p>
                  <div
                    style={{
                      marginTop: '16px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: tokens.spacing.buttonHeight,
                      padding: '0 24px',
                      borderRadius: tokens.radius.button,
                      backgroundColor: tokens.colors.primary[500],
                      color: tokens.colors.surface,
                      fontFamily: tokens.typography.fontFamily,
                      fontSize: tokens.typography.button.fontSize,
                      fontWeight: tokens.typography.button.fontWeight,
                      textDecoration: 'none',
                      transition: `background-color ${tokens.transitions.default}`,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = tokens.colors.primary[700])
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = tokens.colors.primary[500])
                    }
                  >
                    مشاهده محصول
                  </div>
                </a>
              ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div
          className="products-rail"
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
                  <p
                    style={{
                      fontFamily: tokens.typography.fontFamily,
                      fontSize: tokens.typography.bodySm.fontSize,
                      color: tokens.colors.text[500],
                      margin: 0,
                    }}
                  >
                    {product.shortDescription}
                  </p>
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
          .products-grid {
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
          .products-grid {
            display: none !important;
          }
          .products-rail {
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
