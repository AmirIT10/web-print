'use client';

import React from 'react';
import { tokens } from '@/types/tokens';
import { CategoryCardData } from '@/types';

interface CategorySectionProps {
  title: string;
  categories: CategoryCardData[];
  viewAllHref?: string;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  categories,
  viewAllHref,
}) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (categories.length === 0) {
    return (
      <section
        style={{
          padding: `${tokens.spacing.sectionVertical.desktop} ${tokens.spacing.desktopPadding}`,
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
              marginBottom: '24px',
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
            دسته‌بندی برای نمایش وجود ندارد.
          </p>
        </div>
      </section>
    );
  }

  const displayCategories = categories.slice(0, 6);

  return (
    <section
      style={{
        padding: `${tokens.spacing.sectionVertical.desktop} ${tokens.spacing.desktopPadding}`,
        backgroundColor: tokens.colors.surface,
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

        <div
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
                    aspectRatio: '4/3',
                    borderRadius: tokens.radius.card,
                    backgroundColor: tokens.colors.border,
                    animation: 'pulse 1.5s infinite',
                  }}
                />
              ))
            : displayCategories.map((category) => (
                <a
                  key={category.id}
                  href={`/products/${category.slug}`}
                  style={{
                    display: 'block',
                    position: 'relative',
                    aspectRatio: '4/3',
                    borderRadius: tokens.radius.card,
                    overflow: 'hidden',
                    backgroundColor: tokens.colors.background,
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
                    src={category.image}
                    alt={category.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '16px',
                      background: `linear-gradient(to top, rgba(0,0,0,0.6), transparent)`,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: tokens.typography.fontFamily,
                        fontSize: tokens.typography.h3.desktop.fontSize,
                        fontWeight: tokens.typography.h3.desktop.fontWeight,
                        color: tokens.colors.surface,
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {category.title}
                    </h3>
                  </div>
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
          div[style*="grid-template-columns"] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          h2 {
            font-size: ${tokens.typography.h2.mobile.fontSize} !important;
          }
        }
        @media (max-width: ${tokens.breakpoints.mobile}) {
          section {
            padding: ${tokens.spacing.sectionVertical.mobile} ${tokens.spacing.mobilePadding} !important;
          }
          h3 {
            font-size: ${tokens.typography.h3.mobile.fontSize} !important;
          }
        }
      `}</style>
    </section>
  );
};
