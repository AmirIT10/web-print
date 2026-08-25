'use client';

import React from 'react';
import { tokens } from '@/types/tokens';
import { CTA } from '@/types';

interface HeroSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction: CTA;
  secondaryAction?: CTA;
  image: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  image,
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  return (
    <section
      style={{
        backgroundColor: tokens.colors.background,
        minHeight: '560px',
        padding: `${tokens.spacing.sectionVertical.desktop} ${tokens.spacing.desktopPadding}`,
      }}
    >
      <div
        style={{
          maxWidth: tokens.spacing.pageMaxWidth,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '52% 48%',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        {/* Text Content */}
        <div>
          {eyebrow && (
            <p
              style={{
                fontFamily: tokens.typography.fontFamily,
                fontSize: tokens.typography.caption.fontSize,
                fontWeight: tokens.typography.caption.fontWeight,
                color: tokens.colors.primary[500],
                marginBottom: '12px',
              }}
            >
              {eyebrow}
            </p>
          )}
          <h1
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.h1.desktop.fontSize,
              fontWeight: tokens.typography.h1.desktop.fontWeight,
              lineHeight: tokens.typography.h1.desktop.lineHeight,
              color: tokens.colors.text[900],
              marginBottom: '16px',
              maxWidth: '100%',
              overflowWrap: 'break-word',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.bodyLg.fontSize,
              lineHeight: tokens.typography.bodyLg.lineHeight,
              color: tokens.colors.text[700],
              marginBottom: '24px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </p>
          <div
            style={{
              display: 'flex',
              gap: tokens.spacing.componentGap,
              flexWrap: 'wrap',
            }}
          >
            <a
              href={primaryAction.href}
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
              {primaryAction.label}
            </a>
            {secondaryAction && (
              <a
                href={secondaryAction.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: tokens.spacing.buttonHeight,
                  padding: '0 32px',
                  borderRadius: tokens.radius.button,
                  backgroundColor: 'transparent',
                  color: tokens.colors.primary[500],
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: tokens.typography.button.fontSize,
                  fontWeight: tokens.typography.button.fontWeight,
                  textDecoration: 'none',
                  border: `2px solid ${tokens.colors.primary[500]}`,
                  transition: `background-color ${tokens.transitions.default}`,
                  cursor: 'pointer',
                  minHeight: tokens.spacing.touchTarget,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = tokens.colors.primary[50])
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'transparent')
                }
                onFocus={(e) => {
                  e.currentTarget.style.outline = `2px solid ${tokens.colors.primary[500]}`;
                  e.currentTarget.style.outlineOffset = '2px';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              >
                {secondaryAction.label}
              </a>
            )}
          </div>
        </div>

        {/* Image/Visual */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '4/3',
            borderRadius: tokens.radius.image,
            overflow: 'hidden',
            backgroundColor: tokens.colors.border,
          }}
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
            src={image}
            alt=""
            role="presentation"
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
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: ${tokens.breakpoints.tablet}) {
          section {
            min-height: 500px !important;
            padding: ${tokens.spacing.sectionVertical.tablet} ${tokens.spacing.tabletPadding} !important;
          }
          div[style*="grid-template-columns"] {
            grid-template-columns: 55% 45% !important;
            gap: 32px !important;
          }
        }
        @media (max-width: ${tokens.breakpoints.mobile}) {
          section {
            padding: ${tokens.spacing.sectionVertical.mobile} ${tokens.spacing.mobilePadding} !important;
          }
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          h1 {
            font-size: ${tokens.typography.h1.mobile.fontSize} !important;
          }
        }
      `}</style>
    </section>
  );
};
