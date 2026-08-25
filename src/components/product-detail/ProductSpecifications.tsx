'use client';

import React from 'react';
import { tokens } from '@/types/tokens';
import { Specification } from '@/types';

interface ProductSpecificationsProps {
  specifications?: Specification[];
}

export const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
  specifications = [],
}) => {
  if (!specifications || specifications.length === 0) {
    return null;
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
          مشخصات فنی
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0',
          }}
        >
          {specifications.map((spec, index) => (
            <div
              key={spec.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '16px 24px',
                minHeight: '48px',
                alignItems: 'center',
                borderBottom: `1px solid ${tokens.colors.border}`,
                backgroundColor: index % 2 === 0 ? tokens.colors.surface : tokens.colors.background,
              }}
            >
              <span
                style={{
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: tokens.typography.body.fontSize,
                  color: tokens.colors.text[700],
                  fontWeight: 500,
                }}
              >
                {spec.label}
              </span>
              <span
                style={{
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: tokens.typography.body.fontSize,
                  color: tokens.colors.text[900],
                }}
              >
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: ${tokens.breakpoints.tablet}) {
          section {
            padding: ${tokens.spacing.sectionVertical.tablet} ${tokens.spacing.tabletPadding} !important;
          }
          h2 {
            font-size: ${tokens.typography.h2.mobile.fontSize} !important;
          }
        }
        @media (max-width: ${tokens.breakpoints.mobile}) {
          section {
            padding: ${tokens.spacing.sectionVertical.mobile} ${tokens.spacing.mobilePadding} !important;
          }
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="justify-content"] {
            flex-direction: column !important;
            gap: 4px !important;
            padding: 12px 16px !important;
          }
          span:first-child {
            font-weight: 600 !important;
            margin-bottom: 4px !important;
          }
        }
      `}</style>
    </section>
  );
};
