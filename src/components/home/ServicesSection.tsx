'use client';

import React from 'react';
import { tokens } from '@/types/tokens';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ServicesSectionProps {
  services: ServiceItem[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
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
          className="services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: tokens.spacing.componentGapLg,
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                padding: tokens.spacing.cardPadding,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  marginBottom: '16px',
                }}
              >
                {service.icon}
              </div>
              <h3
                style={{
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: tokens.typography.h3.desktop.fontSize,
                  fontWeight: tokens.typography.h3.desktop.fontWeight,
                  color: tokens.colors.text[900],
                  margin: '0 0 8px',
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: tokens.typography.body.fontSize,
                  color: tokens.colors.text[700],
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: ${tokens.breakpoints.tablet}) {
          section {
            padding: ${tokens.spacing.sectionVertical.tablet} ${tokens.spacing.tabletPadding} !important;
          }
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          h3 {
            font-size: ${tokens.typography.h3.mobile.fontSize} !important;
          }
        }
        @media (max-width: ${tokens.breakpoints.mobile}) {
          section {
            padding: ${tokens.spacing.sectionVertical.mobile} ${tokens.spacing.mobilePadding} !important;
          }
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .services-grid > div:not(:last-child) {
            border-bottom: 1px solid ${tokens.colors.border};
            padding-bottom: 24px;
          }
        }
      `}</style>
    </section>
  );
};
