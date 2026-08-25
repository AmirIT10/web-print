'use client';

import React from 'react';
import { tokens } from '@/types/tokens';

interface ProductDescriptionProps {
  description: string;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
}) => {
  return (
    <section
      style={{
        padding: `${tokens.spacing.sectionVertical.desktop} ${tokens.spacing.desktopPadding}`,
        backgroundColor: tokens.colors.surface,
      }}
    >
      <div
        style={{
          maxWidth: '760px',
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
          توضیحات محصول
        </h2>
        <div
          style={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.body.fontSize,
            lineHeight: tokens.typography.body.lineHeight,
            color: tokens.colors.text[700],
          }}
        >
          {description.split('\n').map((paragraph, index) => (
            <p
              key={index}
              style={{
                margin: '0 0 16px',
              }}
            >
              {paragraph}
            </p>
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
            font-size: 16px !important;
            line-height: 1.7 !important;
          }
        }
      `}</style>
    </section>
  );
};
