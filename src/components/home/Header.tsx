'use client';

import React from 'react';
import { tokens } from '@/types/tokens';
import { NavItem } from '@/types';

interface HeaderProps {
  logo: string;
  navItems: NavItem[];
  ctaLabel?: string;
}

export const Header: React.FC<HeaderProps> = ({ logo, navItems, ctaLabel }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close menu on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
      // Focus first focusable element in menu
      setTimeout(() => {
        const firstFocusable = menuRef.current?.querySelector('a, button') as HTMLElement;
        firstFocusable?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  // Handle click outside to close menu
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header
      className="header"
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
        className="header-container"
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
        <a href="/" className="logo-link" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="لوگو"
            style={{ height: '40px', width: 'auto' }}
          />
        </a>

        {/* Desktop Navigation */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            gap: tokens.spacing.componentGapLg,
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              style={{
                fontFamily: tokens.typography.fontFamily,
                fontSize: tokens.typography.body.fontSize,
                color: tokens.colors.text[700],
                textDecoration: 'none',
                transition: `color ${tokens.transitions.default}`,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        {ctaLabel && (
          <a
            href="/products"
            className="header-cta"
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
          >
            {ctaLabel}
          </a>
        )}

        {/* Mobile Menu Trigger */}
        <button
          ref={menuButtonRef}
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
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
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
          className="mobile-menu-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            ref={menuRef}
            id="mobile-menu"
            className="mobile-menu"
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
            role="dialog"
            aria-modal="true"
            aria-label="منوی موبایل"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
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
            <nav className="mobile-nav" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="mobile-nav-link"
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
            </nav>
            {ctaLabel && (
              <a
                href="/products"
                className="mobile-cta"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: tokens.spacing.buttonHeightMobile,
                  marginTop: '24px',
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
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: ${tokens.breakpoints.tablet}) {
          .header {
            height: 68px !important;
          }
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-trigger {
            display: block !important;
          }
          .header-cta {
            display: none !important;
          }
        }
        @media (max-width: ${tokens.breakpoints.mobile}) {
          .header {
            height: 64px !important;
          }
        }
        
        .nav-link:hover,
        .nav-link:focus {
          color: ${tokens.colors.primary[500]};
        }
        
        .header-cta:hover {
          background-color: ${tokens.colors.primary[700]};
        }
        
        .header-cta:focus,
        .mobile-cta:focus,
        .mobile-menu-trigger:focus {
          outline: 2px solid ${tokens.colors.primary[500]};
          outline-offset: 2px;
        }
      `}</style>
    </header>
  );
};

export default Header;
