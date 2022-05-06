import { isValid, isBefore, isAfter, differenceInYears, parse, addMonths } from 'date-fns';

// tslint:disable-next-line: max-line-length
export const emailRexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
export const nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
export const cifRexp = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
export const passportRexp = /^[A-Z]{1,3}[0-9]{5,7}[A-Z]{0,1}$/i;
export const otherDocumentRexp = /^[A-Z0-9]{3,10}$/i;
export const validNifNieChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
export const postalCodeRexp = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/i;


export function isValidEmail(email: string) {
  return !!email && emailRexp.test(email);
}

export function isValidPhone(prefix: string, phone: string) {
  if (prefix && /^(\+34|0034|34)/.test(prefix)) { // Spanish mobile phone prefix
    return !!phone && /^[6789]\d{8}$/.test(phone) && /^\d+$/.test(phone);
  }
  return false;
}

export function isValidBirthdate(birthdate: string) {
  const date = new Date(birthdate);
  return birthdate?.length === 10 && isValid(date) && isBefore(date, Date.now()) && isAfter(date, new Date('1900-01-01'));
}

export function isValidPassword(password: string) {
  return isValidPassword_length(password)
    && isValidPassword_noSpecialChars(password)
    && isValidPassword_oneNumber(password);
}

export function isValidPassword_length(password: string) {
  return password && password.length >= 6 && password.length <= 8; // length min 6 max 8
}

export function isValidPassword_noSpecialChars(password: string) {
  return /[[a-zA-Z0-9]/.test(password);                            // only numbers and letters
}

export function isValidPassword_oneNumber(password: string) {
  return /[\d]/.test(password);                                    // at least one number
}

export function hasLegalAge(birthdate: string) {
  return getYearsByBirthdate(birthdate) >= 18;
}

export function getYearsByBirthdate(birthdate: string) {
  const date = new Date(birthdate);
  return differenceInYears(Date.now(), date);
}

export function isEmpty(value: any) {
  return value == null || value?.trim().length === 0;
}

export function isCreditCardExpired(month: string, year: string, format = 'MM/yyyy') {
  const expirationDate = parse(`${month}/${year}`, format, new Date());
  return isValid(expirationDate) && (addMonths(expirationDate, 1).getTime() < Date.now());
}


export function isValidFormatDocument(document: string) {
  if (!document) { return false; }
  const str = document?.toUpperCase()?.trim();
  return nifRexp.test(str) || nieRexp.test(str) || passportRexp.test(str);
}

export function isValidDocumentNumber(type: 'NIF' | 'NIE' | 'CIF' | 'DNI' | 'Otros', docNumber: string) {
  switch (type) {
    case 'NIF': return isValidNIF(docNumber);
    case 'NIE': return isValidNIE(docNumber);
    case 'CIF': return isValidCIF(docNumber);
    case 'DNI': return isValidNIF(docNumber) || isValidNIE(docNumber);
    case 'Otros': return isValidOtherUserDocument(docNumber);
    default: return false;
  }
}

export function isValidNIF(nif: string) {
  if (!nif) { return false; }
  const str = nif.toString().toUpperCase();
  if (!nifRexp.test(str)) { return false; }
  const letter = str.charAt(str.length - 1);
  const charIndex = parseInt(nif.substring(0, 8), 10) % 23;
  if (validNifNieChars.charAt(charIndex) === letter) { return true; }
  return false;
}

export function isValidNIE(nie: string) {
  if (!nie) { return false; }
  const str = nie.toString().toUpperCase();
  if (!nieRexp.test(str)) { return false; }
  const fixedNie = str
    .replace(/^[X]/, '0')
    .replace(/^[Y]/, '1')
    .replace(/^[Z]/, '2');
  const letter = str.charAt(str.length - 1);
  const charIndex = parseInt(fixedNie.substring(0, 8), 10) % 23;
  if (validNifNieChars.charAt(charIndex) === letter) { return true; }
  return false;
}

export function isValidCIF(cif: string) {
  if (!cif) { return false; }
  const match = cif.match(cifRexp);
  if (!match) { return false; }
  match.shift();
  const [ letter, numb, control ] = match;
  let evenSum = 0;
  let oddSum = 0;
  let n: number;
  for (let i = 0; i < numb.length; i++) {
    n = parseInt(numb[i], 10);
    if (i % 2 === 0) {
      n *= 2;
      oddSum += n < 10 ? n : n - 9;
    } else {
      evenSum += n;
    }
  }
  const sum = (evenSum + oddSum) % 10;
  const controlDigit = sum !== 0 ? (10 - sum) : sum;
  const controlLetter = 'JABCDEFGHI'.substring(controlDigit, controlDigit + 1);
  const formattedControlDigit = `${controlDigit}`;
  // Control must be a digit
  if (letter.match(/[ABEH]/) ) {
    return control === formattedControlDigit;
  // Control must be a letter
  } else if ( letter.match( /[KPQS]/ ) ) {
    return control === controlLetter;
  // Can be either
  } else {
    return control === formattedControlDigit || control === controlLetter;
  }
}

export function isValidOtherUserDocument(value: string) {
  if (!value) { return false; }
  return otherDocumentRexp.test(value);
}

export function hasValidFormatDocument(document: string) {
  if (!document) { return false; }
  const str = document.toUpperCase().trim();
  return nifRexp.test(str) || nieRexp.test(str) || passportRexp.test(str);
}

export function isValidPostalCode(postalCode: string) {
  return postalCode && postalCodeRexp.test(postalCode);
}

