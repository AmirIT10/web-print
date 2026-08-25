'use client';

import React from 'react';
import { tokens } from '@/types/tokens';
import { CTA } from '@/types';

interface PrimaryCTASectionProps {
  title: string;
  description: string;
  cta: CTA;
}

export const PrimaryCTASection: React.FC<PrimaryCTASectionProps> = ({
  title,
  description,
  cta,
}) => {
  return (
    <section
      style={{
        padding: `${tokens.spacing.sectionVertical.desktop} ${tokens.spacing.desktopPadding}`,
        backgroundColor: tokens.colors.primary[50],
      }}
    >
      <div
        style={{
          maxWidth: tokens.spacing.pageMaxWidth,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.h2.desktop.fontSize,
              fontWeight: tokens.typography.h2.desktop.fontWeight,
              color: tokens.colors.text[900],
              margin: '0 0 12px',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.bodyLg.fontSize,
              color: tokens.colors.text[700],
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>
        <div>
          <a
            href={cta.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: tokens.spacing.buttonHeight,
              padding: '0 32px',
              borderRadius: tokens.radius.button,
              backgroundColor: tokens.colors.primary[500],
              color: tokens.colors.surface,
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.button.fontSize,
              fontWeight: tokens.typography.button.fontWeight,
              textDecoration: 'none',
              transition: `background-color ${tokens.transitions.default}`,
              cursor: 'pointer',
              minHeight: tokens.spacing.touchTarget,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = tokens.colors.primary[700])
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = tokens.colors.primary[500])
            }
            onFocus={(e) => {
              e.currentTarget.style.outline = `2px solid ${tokens.colors.primary[500]}`;
              e.currentTarget.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            {cta.label}
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: ${tokens.breakpoints.tablet}) {
          section {
            padding: ${tokens.spacing.sectionVertical.tablet} ${tokens.spacing.tabletPadding} !important;
          }
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          h2 {
            font-size: ${tokens.typography.h2.mobile.fontSize} !important;
          }
        }
        @media (max-width: ${tokens.breakpoints.mobile}) {
          section {
            padding: ${tokens.spacing.sectionVertical.mobile} ${tokens.spacing.mobilePadding} !important;
          }
        }
      `}</style>
    </section>
  );
};
