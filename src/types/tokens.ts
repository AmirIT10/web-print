// Design Tokens for Web Print Project
// Based on sections/design specification
// Single source of truth for design tokens

export const tokens = {
  colors: {
    primary: {
      50: '#EAF8F5',
      500: '#11A089',
      700: '#0C7867',
    },
    text: {
      900: '#17211F',
      700: '#46514E',
      500: '#6F7976',
    },
    surface: '#FFFFFF',
    background: '#F7F9F8',
    border: '#E2E8E5',
    error: '#D64545',
  },
  typography: {
    fontFamily: 'Vazirmatn, Inter, system-ui, sans-serif',
    display: {
      desktop: { fontSize: '48px', fontWeight: 700, lineHeight: 1.15 },
      mobile: { fontSize: '34px', fontWeight: 700, lineHeight: 1.15 },
    },
    h1: {
      desktop: { fontSize: '40px', fontWeight: 700, lineHeight: 1.2 },
      mobile: { fontSize: '32px', fontWeight: 700, lineHeight: 1.2 },
    },
    h2: {
      desktop: { fontSize: '32px', fontWeight: 700, lineHeight: 1.25 },
      mobile: { fontSize: '26px', fontWeight: 700, lineHeight: 1.25 },
    },
    h3: {
      desktop: { fontSize: '24px', fontWeight: 700, lineHeight: 1.3 },
      mobile: { fontSize: '20px', fontWeight: 700, lineHeight: 1.3 },
    },
    bodyLg: { fontSize: '18px', fontWeight: 400, lineHeight: 1.7 },
    body: { fontSize: '16px', fontWeight: 400, lineHeight: 1.6 },
    bodySm: { fontSize: '14px', fontWeight: 400, lineHeight: 1.6 },
    button: { fontSize: '15px', fontWeight: 600, lineHeight: 1 },
    caption: { fontSize: '12px', fontWeight: 500, lineHeight: 1.5 },
  },
  spacing: {
    pageMaxWidth: '1200px',
    desktopPadding: '32px',
    tabletPadding: '24px',
    mobilePadding: '20px',
    sectionVertical: {
      desktop: '96px',
      tablet: '72px',
      mobile: '56px',
    },
    cardPadding: '20px',
    componentGap: '16px',
    componentGapLg: '24px',
    buttonHeight: '48px',
    buttonHeightMobile: '52px',
    touchTarget: '48px',
  },
  radius: {
    card: '16px',
    button: '10px',
    image: '16px',
    modal: '16px',
  },
  shadow: {
    default: '0 8px 24px rgba(23,33,31,0.08)',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
  },
  transitions: {
    default: '160ms ease-out',
  },
} as const;

export type TokenColors = typeof tokens.colors;
export type TokenTypography = typeof tokens.typography;
export type TokenSpacing = typeof tokens.spacing;
export type TokenRadius = typeof tokens.radius;
export type TokenShadow = typeof tokens.shadow;

