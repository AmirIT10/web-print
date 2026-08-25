'use client';

import React from 'react';
import { tokens } from '@/types/tokens';
import { NavItem } from '@/types';

interface FooterProps {
  brandName: string;
  brandLogo?: string;
  navigation: NavItem[];
  services: string[];
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
  };
  socialLinks?: { platform: string; href: string }[];
}

export const Footer: React.FC<FooterProps> = ({
  brandName,
  brandLogo,
  navigation,
  services,
  contactInfo,
  socialLinks,
}) => {
  return (
    <footer
      style={{
        backgroundColor: tokens.colors.text[900],
        color: tokens.colors.surface,
        padding: `${tokens.spacing.sectionVertical.desktop} ${tokens.spacing.desktopPadding}`,
      }}
    >
      <div
        style={{
          maxWidth: tokens.spacing.pageMaxWidth,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: tokens.spacing.componentGapLg,
        }}
      >
        {/* Brand */}
        <div>
          {brandLogo ? (
            <img
              src={brandLogo}
              alt={brandName}
              style={{ height: '40px', marginBottom: '16px' }}
            />
          ) : (
            <h3
              style={{
                fontFamily: tokens.typography.fontFamily,
                fontSize: tokens.typography.h3.desktop.fontSize,
                fontWeight: tokens.typography.h3.desktop.fontWeight,
                color: tokens.colors.surface,
                margin: '0 0 16px',
              }}
            >
              {brandName}
            </h3>
          )}
          <p
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.body.fontSize,
              color: tokens.colors.text[500],
              margin: 0,
            }}
          >
            ارائه‌دهنده راهکارهای چاپ و تبلیغات
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.body.fontSize,
              fontWeight: 600,
              color: tokens.colors.surface,
              margin: '0 0 16px',
            }}
          >
            دسترسی سریع
          </h4>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  style={{
                    fontFamily: tokens.typography.fontFamily,
                    fontSize: tokens.typography.body.fontSize,
                    color: tokens.colors.text[500],
                    textDecoration: 'none',
                    transition: `color ${tokens.transitions.default}`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = tokens.colors.primary[500])
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = tokens.colors.text[500])
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.body.fontSize,
              fontWeight: 600,
              color: tokens.colors.surface,
              margin: '0 0 16px',
            }}
          >
            خدمات
          </h4>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {services.map((service, index) => (
              <li
                key={index}
                style={{
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: tokens.typography.body.fontSize,
                  color: tokens.colors.text[500],
                }}
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.body.fontSize,
              fontWeight: 600,
              color: tokens.colors.surface,
              margin: '0 0 16px',
            }}
          >
            تماس با ما
          </h4>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {contactInfo.phone && (
              <li
                style={{
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: tokens.typography.body.fontSize,
                  color: tokens.colors.text[500],
                }}
              >
                تلفن: {contactInfo.phone}
              </li>
            )}
            {contactInfo.email && (
              <li
                style={{
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: tokens.typography.body.fontSize,
                  color: tokens.colors.text[500],
                }}
              >
                ایمیل: {contactInfo.email}
              </li>
            )}
            {contactInfo.address && (
              <li
                style={{
                  fontFamily: tokens.typography.fontFamily,
                  fontSize: tokens.typography.body.fontSize,
                  color: tokens.colors.text[500],
                }}
              >
                آدرس: {contactInfo.address}
              </li>
            )}
          </ul>
          {socialLinks && socialLinks.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '12px',
              }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: tokens.radius.button,
                    backgroundColor: tokens.colors.text[700],
                    color: tokens.colors.surface,
                    textDecoration: 'none',
                    transition: `background-color ${tokens.transitions.default}`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = tokens.colors.primary[500])
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = tokens.colors.text[700])
                  }
                  aria-label={link.platform}
                >
                  {link.platform[0]}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: ${tokens.breakpoints.tablet}) {
          footer {
            padding: ${tokens.spacing.sectionVertical.tablet} ${tokens.spacing.tabletPadding} !important;
          }
          div[style*="grid-template-columns"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: ${tokens.breakpoints.mobile}) {
          footer {
            padding: ${tokens.spacing.sectionVertical.mobile} ${tokens.spacing.mobilePadding} !important;
          }
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
