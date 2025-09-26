// Centralized font management for GoLocal application
// This file contains all font-related configurations and utility classes

// Font families
export const fontFamilies = {
  primary: "'Inter', sans-serif",
  heading: "'Poppins', sans-serif",
  accent: "'Montserrat', sans-serif",
  display: "'Playfair Display', serif",
  mono: "'Source Code Pro', monospace",
};

// Font sizes
export const fontSizes = {
  xs: "0.75rem",    // 12px
  sm: "0.875rem",   // 14px
  base: "1rem",     // 16px
  lg: "1.125rem",   // 18px
  xl: "1.25rem",    // 20px
  "2xl": "1.5rem",  // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem",    // 48px
  "6xl": "3.75rem", // 60px
};

// Font weights
export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

// Line heights
export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

// Letter spacing
export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
};

// Font style utility classes
export const fontStyles = {
  // Headings
  h1: `font-family: ${fontFamilies.heading}; font-size: ${fontSizes["5xl"]}; font-weight: ${fontWeights.bold}; line-height: ${lineHeights.tight};`,
  h2: `font-family: ${fontFamilies.heading}; font-size: ${fontSizes["4xl"]}; font-weight: ${fontWeights.bold}; line-height: ${lineHeights.tight};`,
  h3: `font-family: ${fontFamilies.heading}; font-size: ${fontSizes["3xl"]}; font-weight: ${fontWeights.semibold}; line-height: ${lineHeights.snug};`,
  h4: `font-family: ${fontFamilies.heading}; font-size: ${fontSizes["2xl"]}; font-weight: ${fontWeights.semibold}; line-height: ${lineHeights.snug};`,
  h5: `font-family: ${fontFamilies.heading}; font-size: ${fontSizes.xl}; font-weight: ${fontWeights.semibold}; line-height: ${lineHeights.normal};`,
  
  // Body text
  bodyLarge: `font-family: ${fontFamilies.primary}; font-size: ${fontSizes.lg}; font-weight: ${fontWeights.normal}; line-height: ${lineHeights.relaxed};`,
  bodyDefault: `font-family: ${fontFamilies.primary}; font-size: ${fontSizes.base}; font-weight: ${fontWeights.normal}; line-height: ${lineHeights.relaxed};`,
  bodySmall: `font-family: ${fontFamilies.primary}; font-size: ${fontSizes.sm}; font-weight: ${fontWeights.normal}; line-height: ${lineHeights.normal};`,
  
  // Special text
  display: `font-family: ${fontFamilies.display}; font-size: ${fontSizes["6xl"]}; font-weight: ${fontWeights.bold}; line-height: ${lineHeights.tight}; letter-spacing: ${letterSpacing.tight};`,
  accent: `font-family: ${fontFamilies.accent}; font-size: ${fontSizes.base}; font-weight: ${fontWeights.medium}; line-height: ${lineHeights.normal};`,
  
  // UI elements
  button: `font-family: ${fontFamilies.primary}; font-size: ${fontSizes.sm}; font-weight: ${fontWeights.medium}; line-height: ${lineHeights.none};`,
  caption: `font-family: ${fontFamilies.primary}; font-size: ${fontSizes.xs}; font-weight: ${fontWeights.normal}; line-height: ${lineHeights.normal};`,
  label: `font-family: ${fontFamilies.primary}; font-size: ${fontSizes.sm}; font-weight: ${fontWeights.medium}; line-height: ${lineHeights.none};`,
  
  // Form elements
  input: `font-family: ${fontFamilies.primary}; font-size: ${fontSizes.base}; font-weight: ${fontWeights.normal};`,
  
  // Modal elements
  modalTitle: `font-family: ${fontFamilies.heading}; font-size: ${fontSizes.xl}; font-weight: ${fontWeights.semibold}; line-height: ${lineHeights.snug};`,
  modalBody: `font-family: ${fontFamilies.primary}; font-size: ${fontSizes.base}; font-weight: ${fontWeights.normal}; line-height: ${lineHeights.relaxed};`,
};

// CSS classes for direct use in className
export const fontClasses = {
  // Heading classes
  h1: "text-5xl font-bold font-heading leading-tight",
  h2: "text-4xl font-bold font-heading leading-tight",
  h3: "text-3xl font-semibold font-heading leading-snug",
  h4: "text-2xl font-semibold font-heading leading-snug",
  h5: "text-xl font-semibold font-heading leading-normal",
  
  // Body text classes
  bodyLarge: "text-lg font-normal font-primary leading-relaxed",
  bodyDefault: "text-base font-normal font-primary leading-relaxed",
  bodySmall: "text-sm font-normal font-primary leading-normal",
  
  // Special text classes
  display: "text-6xl font-bold font-display leading-tight tracking-tight",
  accent: "text-base font-medium font-accent leading-normal",
  
  // UI element classes
  button: "text-sm font-medium font-primary leading-none",
  caption: "text-xs font-normal font-primary leading-normal",
  label: "text-sm font-medium font-primary leading-none",
  
  // Form element classes
  input: "text-base font-normal font-primary",
  
  // Modal element classes
  modalTitle: "text-xl font-semibold font-heading leading-snug",
  modalBody: "text-base font-normal font-primary leading-relaxed",
};

export default {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  fontStyles,
  fontClasses,
};