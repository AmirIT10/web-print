'use client';

import React from 'react';
import { tokens } from '@/types/tokens';
import { CTA, NavItem } from '@/types';

interface HeaderProps {
  logo: string;
  navItems: NavItem[];
  ctaLabel?: string;
}

export const Header: React.FC<HeaderProps> = ({ logo, navItems, ctaLabel }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: tokens.colors.surface,
        borderBottom: `1px solid ${tokens.colors.border}`,
        height: '72px',
        transition: 'height 160ms ease-out',
      }}
    >
      <div
        style={{
          maxWidth: tokens.spacing.pageMaxWidth,
          margin: '0 auto',
          padding: `0 ${tokens.spacing.desktopPadding}`,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="لوگو"
            style={{ height: '40px', width: 'auto' }}
          />
        </a>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: 'flex',
            gap: tokens.spacing.componentGapLg,
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                fontFamily: tokens.typography.fontFamily,
                fontSize: tokens.typography.body.fontSize,
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
          ))}
        </nav>

        {/* CTA */}
        {ctaLabel && (
          <a
            href="/products"
            style={{
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
              transition: `background-color ${tokens.transitions.default}, transform ${tokens.transitions.default}`,
              cursor: 'pointer',
              minHeight: tokens.spacing.touchTarget,
              minWidth: tokens.spacing.touchTarget,
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
            {ctaLabel}
          </a>
        )}

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="mobile-menu-trigger"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            minHeight: tokens.spacing.touchTarget,
            minWidth: tokens.spacing.touchTarget,
          }}
          aria-label="منو"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={tokens.colors.text[900]}
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '320px',
              backgroundColor: tokens.colors.surface,
              padding: `${tokens.spacing.sectionVertical.mobile} ${tokens.spacing.mobilePadding}`,
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <img src={logo} alt="لوگو" style={{ height: '32px' }} />
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  minHeight: tokens.spacing.touchTarget,
                  minWidth: tokens.spacing.touchTarget,
                }}
                aria-label="بستن منو"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={tokens.colors.text[900]}
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={{
                    fontFamily: tokens.typography.fontFamily,
                    fontSize: tokens.typography.bodyLg.fontSize,
                    color: tokens.colors.text[700],
                    textDecoration: 'none',
                    padding: '12px 0',
                    borderBottom: `1px solid ${tokens.colors.border}`,
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              {ctaLabel && (
                <a
                  href="/products"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: tokens.spacing.buttonHeightMobile,
                    marginTop: '16px',
                    borderRadius: tokens.radius.button,
                    backgroundColor: tokens.colors.primary[500],
                    color: tokens.colors.surface,
                    fontFamily: tokens.typography.fontFamily,
                    fontSize: tokens.typography.button.fontSize,
                    fontWeight: tokens.typography.button.fontWeight,
                    textDecoration: 'none',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {ctaLabel}
                </a>
              )}
            </nav>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: ${tokens.breakpoints.tablet}) {
          header {
            height: 68px !important;
          }
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-trigger {
            display: block !important;
          }
        }
        @media (max-width: ${tokens.breakpoints.mobile}) {
          header {
            height: 64px !important;
          }
        }
      `}</style>
    </header>
  );
};
