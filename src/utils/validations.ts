export const validateEmail = (emailField: string) => {
  if (emailField) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailField);
  }
  return true;
};

export const required = (value: string, fieldName: string) => {
  return !!value;
  // return `${fieldName} is required.`;
};