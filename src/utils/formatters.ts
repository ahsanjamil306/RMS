import { format, parseISO } from 'date-fns';

export const formatDate = (dateStr: string | null, formatStr = 'MMM dd, yyyy') => {
  if (!dateStr) return '';
  try {
    const date = parseISO(dateStr);
    return format(date, formatStr);
  } catch {
    return '';
  }
};

export const formatTime = (dateStr: string | null, formatStr = 'h:mm a') => {
  if (!dateStr) return '';
  try {
    const date = parseISO(dateStr);
    return format(date, formatStr);
  } catch {
    return '';
  }
};

export const formatDateTime = (
  dateStr: string | null,
  formatStr = 'MMM dd, yyyy h:mm a'
) => {
  if (!dateStr) return '';
  try {
    const date = parseISO(dateStr);
    return format(date, formatStr);
  } catch {
    return '';
  }
};

export const formatCurrency = (
  amount: number,
  currency = 'USD',
  locale = 'en-US'
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};
