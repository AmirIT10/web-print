'use client';

import React from 'react';
import { tokens } from '@/types/tokens';
import { BreadcrumbItem } from '@/types';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  // Mobile: show Home, ellipsis, and last item if more than 3 items
  const displayItems = items.length > 3 
    ? [items[0], { label: '…', href: '' }, ...items.slice(-1)] 
    : items;

  return (
    <nav
      aria-label="مسیر صفحه"
      style={{
        padding: `${tokens.spacing.componentGap} ${tokens.spacing.desktopPadding}`,
      }}
    >
      <ol
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: tokens.typography.fontFamily,
          fontSize: tokens.typography.bodySm.fontSize,
        }}
      >
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '…';

          return (
            <React.Fragment key={item.href || index}>
              <li>
                {isLast || isEllipsis ? (
                  <span
                    style={{
                      color: isEllipsis
                        ? tokens.colors.text[500]
                        : tokens.colors.text[900],
                      fontWeight: isLast ? 600 : 400,
                    }}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    style={{
                      color: tokens.colors.text[700],
                      textDecoration: 'none',
                      transition: `color ${tokens.transitions.default}`,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = tokens.colors.primary[500])
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = tokens.colors.text[700])
                    }
                  >
                    {item.label}
                  </a>
                )}
              </li>
              {!isLast && (
                <li
                  aria-hidden="true"
                  style={{
                    color: tokens.colors.text[500],
                  }}
                >
                  /
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>

      <style jsx>{`
        @media (max-width: ${tokens.breakpoints.tablet}) {
          nav {
            padding: ${tokens.spacing.componentGap} ${tokens.spacing.tabletPadding} !important;
          }
        }
        @media (max-width: ${tokens.breakpoints.mobile}) {
          nav {
            padding: ${tokens.spacing.componentGap} ${tokens.spacing.mobilePadding} !important;
          }
        }
      `}</style>
    </nav>
  );
};
