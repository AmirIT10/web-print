'use client';

import React from 'react';
import { tokens } from '@/types/tokens';
import { ProductOption } from '@/types';

interface ProductOptionsProps {
  options?: ProductOption[];
  value?: Record<string, string>;
  onChange?: (optionId: string, valueId: string) => void;
}

export const ProductOptions: React.FC<ProductOptionsProps> = ({
  options = [],
  value = {},
  onChange,
}) => {
  if (!options || options.length === 0) {
    return null;
  }

  const handleSelect = (optionId: string, valueId: string, disabled?: boolean) => {
    if (disabled || !onChange) return;
    onChange(optionId, valueId);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '24px',
      }}
    >
      {options.map((option) => (
        <div key={option.id}>
          <label
            style={{
              display: 'block',
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.bodySm.fontSize,
              fontWeight: 600,
              color: tokens.colors.text[900],
              marginBottom: '12px',
            }}
          >
            {option.label}
          </label>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            {option.values.map((val) => {
              const isSelected = value[option.id] === val.id;
              return (
                <button
                  key={val.id}
                  onClick={() => handleSelect(option.id, val.id, val.disabled)}
                  disabled={val.disabled}
                  aria-pressed={isSelected}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '80px',
                    height: '44px',
                    padding: '0 20px',
                    borderRadius: tokens.radius.button,
                    border: isSelected
                      ? `2px solid ${tokens.colors.primary[500]}`
                      : `2px solid ${tokens.colors.border}`,
                    backgroundColor: isSelected
                      ? tokens.colors.primary[50]
                      : tokens.colors.surface,
                    color: val.disabled
                      ? tokens.colors.text[500]
                      : tokens.colors.text[900],
                    fontFamily: tokens.typography.fontFamily,
                    fontSize: tokens.typography.body.fontSize,
                    cursor: val.disabled ? 'not-allowed' : 'pointer',
                    opacity: val.disabled ? 0.5 : 1,
                    transition: `all ${tokens.transitions.default}`,
                  }}
                  onMouseEnter={(e) => {
                    if (!val.disabled && !isSelected) {
                      e.currentTarget.style.backgroundColor = tokens.colors.background;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!val.disabled && !isSelected) {
                      e.currentTarget.style.backgroundColor = tokens.colors.surface;
                    }
                  }}
                  onFocus={(e) => {
                    if (!val.disabled) {
                      e.currentTarget.style.outline = `2px solid ${tokens.colors.primary[500]}`;
                      e.currentTarget.style.outlineOffset = '2px';
                    }
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  {val.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
