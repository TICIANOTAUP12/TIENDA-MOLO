import '@testing-library/jest-dom';

const originalToLocaleString = Number.prototype.toLocaleString;
Number.prototype.toLocaleString = function(locale?: string, options?: Intl.NumberFormatOptions) {
  const loc = locale || 'es-AR';
  return originalToLocaleString.call(this, loc, options);
};
