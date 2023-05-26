import { TypographyVariantsOptions } from '@mui/material/styles';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';

// Module augmentation
declare module '@mui/material/styles' {
  export interface TypographyVariantsOptions {
    body3?: TypographyStyleOptions;
  }
}

const typography: TypographyVariantsOptions = {
  h1: {
    fontWeight: 700,
    fontSize: 32,
  },
  h2: {
    fontWeight: 600,
    fontSize: 30
  },
  h3: {
    fontWeight: 600,
    fontSize: 26
  },
  h4: {
    fontWeight: 600,
    fontSize: 22
  },
  h5: {
    fontWeight: 600,
    fontSize: 20
  },
  h6: {
    fontWeight: 600,
    fontSize: 14
  },
  caption: {
    fontWeight: 500,
    fontSize: 18,
    color: '#666'
  },
  body1: {
    fontWeight: 500,
    fontSize: 14
  },
  body2: {
    fontWeight: 400,
    fontSize: 14,
  },
  body3: {
    fontSize: 12,
    fontWeight: 400,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: 500,
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: 14,
  },
  overline: {
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'none'
  },
  fontFamily: [
    'BlinkMacSystemFont',
    'sans-serif',
  ].join(','),
};

export default typography;