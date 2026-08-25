'use client';

import React from 'react';
import { tokens } from '@/types/tokens';
import { ProductStatus } from '@/types';

interface ProductSummaryProps {
  name: string;
  shortDescription?: string;
  status?: ProductStatus;
  children?: React.ReactNode;
}

export const ProductSummary: React.FC<ProductSummaryProps> = ({
  name,
  shortDescription,
  status,
  children,
}) => {
  const [isSticky, setIsSticky] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 1024) {
        setIsSticky(window.scrollY > 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const statusText: Record<ProductStatus, string> = {
    available: 'موجود',
    'out-of-stock': 'ناموجود',
    'coming-soon': 'به‌زودی',
  };

  const statusColor: Record<ProductStatus, string> = {
    available: tokens.colors.primary[500],
    'out-of-stock': tokens.colors.error,
    'coming-soon': tokens.colors.text[500],
  };

  return (
    <div
      style={{
        position: isSticky ? 'sticky' : 'static',
        top: isSticky ? '96px' : 'auto',
        padding: tokens.spacing.cardPadding,
      }}
    >
      <h1
        style={{
          fontFamily: tokens.typography.fontFamily,
          fontSize: tokens.typography.h1.desktop.fontSize,
          fontWeight: tokens.typography.h1.desktop.fontWeight,
          color: tokens.colors.text[900],
          margin: '0 0 12px',
          lineHeight: tokens.typography.h1.desktop.lineHeight,
        }}
      >
        {name}
      </h1>

      {shortDescription && (
        <p
          style={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.bodyLg.fontSize,
            color: tokens.colors.text[700],
            margin: '0 0 16px',
            lineHeight: tokens.typography.bodyLg.lineHeight,
          }}
        >
          {shortDescription}
        </p>
      )}

      {status && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: statusColor[status],
            }}
          />
          <span
            style={{
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.bodySm.fontSize,
              color: statusColor[status],
              fontWeight: 600,
            }}
          >
            {statusText[status]}
          </span>
        </div>
      )}

      {children}
    </div>
  );
};
