function isValidPhoneNumber(text: string): boolean {
  // Remove all spaces for cleaner validation
  const cleaned = text.replace(/\s/g, '');
  
  // Enhanced regex for better international and Egyptian support
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
  
  // Additional check for Egyptian numbers specifically
  const egyptRegex = /^01[0-2,5]{1}[0-9]{8}$/;
  
  return phoneRegex.test(cleaned) || egyptRegex.test(cleaned);
}

function isValidEmail(text: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
}

export function checkTextTypePhoneOrEmail(text: string): 'email' | 'phone' | 'unknown' {
  if (isValidEmail(text)) {
    return 'email';
  } else if (isValidPhoneNumber(text)) {
    return 'phone';
  } else {
    return 'unknown';
  }
}