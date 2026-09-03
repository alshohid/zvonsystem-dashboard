import type { BillingDetailsFormValues, CardEntryValues } from './types';


export type DetailsFieldErrors = Partial<Record<keyof BillingDetailsFormValues, string>>;
export type CardFieldErrors = Partial<Record<keyof CardEntryValues, string>>;

// const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Latin + Latin Extended letters, then spaces, apostrophes, dots and hyphens.
const NAME_PATTERN = /^[A-Za-z\u00C0-\u024F](?:[A-Za-z\u00C0-\u024F\s'.-])*$/;
// const PHONE_PATTERN = /^\+?[0-9\s()-]+$/;
const POSTAL_CODE_PATTERN = /^[A-Za-z0-9][A-Za-z0-9\s-]{2,9}$/;
const CVV_PATTERN = /^\d{3,4}$/;
const EXPIRY_PATTERN = /^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/;

const DETAILS_FIELD_LABELS: Record<keyof BillingDetailsFormValues, string> = {
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email address',
  phone: 'Phone number',
  street: 'Street address',
  city: 'City',
  postalCode: 'Postal code',
  country: 'Country',
};

const CARD_FIELD_LABELS: Record<keyof CardEntryValues, string> = {
  cardNumber: 'Card number',
  cardholderName: 'Cardholder name',
  expiry: 'Expiry date',
  cvv: 'CVV',
};

const digitsOnly = (value: string) => value.replace(/\D/g, '');

/** Luhn checksum - used by every major card issuer. */
const passesLuhnCheck = (digits: string): boolean => {
  let checksum = 0;
  let shouldDouble = false;

  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = digits.charCodeAt(index) - 48;

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    checksum += digit;
    shouldDouble = !shouldDouble;
  }

  return checksum % 10 === 0;
};


export function validateDetailsField(
  field: keyof BillingDetailsFormValues,
  value: string,
): string | null {
  const trimmed = value.trim();
  const label = DETAILS_FIELD_LABELS[field];

  switch (field) {
    case 'firstName':
    case 'lastName': {
      if (!trimmed) return `${label} is required.`;
      if (trimmed.length < 2) return `${label} must be at least 2 characters long.`;
      if (!NAME_PATTERN.test(trimmed)) return `${label} contains invalid characters.`;
      return null;
    }

    case 'email': {
      if (!trimmed) return `${label} is required.`;
      // if (!EMAIL_PATTERN.test(trimmed)) return 'Enter a valid email address.';
      return null;
    }

    case 'phone': {
      if (!trimmed) return `${label} is required.`;
      // if (!PHONE_PATTERN.test(trimmed)) return 'Enter a valid phone number (7-15 digits).';
      // const digitCount = digitsOnly(trimmed).length;
      // if (digitCount < 7 || digitCount > 15) {
      //   return 'Enter a valid phone number (7-15 digits).';
      // }
      return null;
    }

    case 'street': {
      if (!trimmed) return `${label} is required.`;
      if (trimmed.length < 4) return 'Enter your full street address.';
      return null;
    }

    case 'city': {
      if (!trimmed) return `${label} is required.`;
      if (trimmed.length < 2) return `${label} must be at least 2 characters long.`;
      return null;
    }

    case 'postalCode': {
      if (!trimmed) return `${label} is required.`;
      // if (!POSTAL_CODE_PATTERN.test(trimmed)) return 'Enter a valid postal code.';
      return null;
    }

    case 'country': {
      if (!trimmed) return 'Select your country.';
      return null;
    }

    default:
      return null;
  }
}


export function validateDetails(values: BillingDetailsFormValues): DetailsFieldErrors {
  const errors: DetailsFieldErrors = {};

  (Object.keys(DETAILS_FIELD_LABELS) as (keyof BillingDetailsFormValues)[]).forEach(field => {
    const message = validateDetailsField(field, values[field] ?? '');
    if (message) errors[field] = message;
  });

  return errors;
}


export function firstDetailsError(errors: DetailsFieldErrors): string | null {
  const fields = Object.keys(DETAILS_FIELD_LABELS) as (keyof BillingDetailsFormValues)[];

  for (const field of fields) {
    const message = errors[field];
    if (message) return message;
  }

  return null;
}

export function validateCardField(field: keyof CardEntryValues, value: string): string | null {
  const trimmed = value.trim();
  const label = CARD_FIELD_LABELS[field];

  switch (field) {
    case 'cardNumber': {
      const digits = digitsOnly(trimmed);
      if (!digits) return `${label} is required.`;
      if (!/^\d+$/.test(digits)) return `${label} can only contain digits.`;
      if (digits.length < 12 || digits.length > 19) {
        return `${label} must be 12-19 digits long.`;
      }
      if (!passesLuhnCheck(digits)) return `${label} looks invalid. Please double-check it.`;
      return null;
    }

    case 'cardholderName': {
      if (!trimmed) return `${label} is required.`;
      if (trimmed.length < 2) return 'Enter the full name on the card.';
      return null;
    }

    case 'expiry': {
      if (!trimmed) return `${label} is required.`;
      const match = EXPIRY_PATTERN.exec(trimmed);
      if (!match) return 'Use MM/YY format, e.g. 09/29.';

      const month = Number(match[1]);
      const year = 2000 + Number(match[2]);
      const now = new Date();
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const expiryEnd = new Date(year, month, 1); // first day after the expiry month

      if (expiryEnd <= currentMonthStart) {
        return 'This card has expired. Please use another card.';
      }
      return null;
    }

    case 'cvv': {
      if (!trimmed) return `${label} is required.`;
      if (!CVV_PATTERN.test(trimmed)) return `${label} must be 3 or 4 digits.`;
      return null;
    }

    default:
      return null;
  }
}

/** Validates every card field; returns only the fields that failed. */
export function validateCardEntry(values: CardEntryValues): CardFieldErrors {
  const errors: CardFieldErrors = {};

  (Object.keys(CARD_FIELD_LABELS) as (keyof CardEntryValues)[]).forEach(field => {
    const message = validateCardField(field, values[field] ?? '');
    if (message) errors[field] = message;
  });

  return errors;
}

/** First failing card field in declaration order. */
export function firstCardEntryError(errors: CardFieldErrors): string | null {
  const fields = Object.keys(CARD_FIELD_LABELS) as (keyof CardEntryValues)[];

  for (const field of fields) {
    const message = errors[field];
    if (message) return message;
  }

  return null;
}
