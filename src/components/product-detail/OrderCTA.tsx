'use client';

import React from 'react';
import { tokens } from '@/types/tokens';

interface OrderCTAProps {
  label: string;
  disabled?: boolean;
  href?: string;
  disabledReason?: string;
}

export const OrderCTA: React.FC<OrderCTAProps> = ({
  label,
  disabled = false,
  href,
  disabledReason,
}) => {
  const content = (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '48px',
        padding: '0 32px',
        borderRadius: tokens.radius.button,
        backgroundColor: disabled ? tokens.colors.text[500] : tokens.colors.primary[500],
        color: tokens.colors.surface,
        fontFamily: tokens.typography.fontFamily,
        fontSize: tokens.typography.button.fontSize,
        fontWeight: tokens.typography.button.fontWeight,
        textDecoration: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: `background-color ${tokens.transitions.default}`,
        minHeight: tokens.spacing.touchTarget,
      }}
    >
      {label}
    </div>
  );

  return (
    <div
      style={{
        width: '100%',
        marginBottom: disabledReason ? '8px' : 0,
      }}
    >
      {href && !disabled ? (
        <a
          href={href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '48px',
            padding: '0 32px',
            borderRadius: tokens.radius.button,
            backgroundColor: tokens.colors.primary[500],
            color: tokens.colors.surface,
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.button.fontSize,
            fontWeight: tokens.typography.button.fontWeight,
            textDecoration: 'none',
            transition: `background-color ${tokens.transitions.default}`,
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
          {label}
        </a>
      ) : (
        <button
          disabled={disabled}
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '48px',
            padding: '0 32px',
            borderRadius: tokens.radius.button,
            backgroundColor: disabled ? tokens.colors.text[500] : tokens.colors.primary[500],
            color: tokens.colors.surface,
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.button.fontSize,
            fontWeight: tokens.typography.button.fontWeight,
            border: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: `background-color ${tokens.transitions.default}`,
            minHeight: tokens.spacing.touchTarget,
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = tokens.colors.primary[700];
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = tokens.colors.primary[500];
            }
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.currentTarget.style.outline = `2px solid ${tokens.colors.primary[500]}`;
              e.currentTarget.style.outlineOffset = '2px';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
        >
          {label}
        </button>
      )}
      {disabled && disabledReason && (
        <p
          style={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.bodySm.fontSize,
            color: tokens.colors.error,
            margin: '8px 0 0',
          }}
        >
          {disabledReason}
        </p>
      )}

      <style jsx>{`
        @media (max-width: ${tokens.breakpoints.mobile}) {
          button, a {
            height: 52px !important;
          }
        }
      `}</style>
    </div>
  );
};
