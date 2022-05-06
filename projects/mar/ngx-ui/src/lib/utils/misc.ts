import { toastOverlay } from './toast-overlay';

export function copyToClipboard(text: string) {
  navigator?.clipboard?.writeText(text);
  toastOverlay.present('Copiado en el portapapeles');
}

export function getFormattedAddress(address: any) {
  if (!address) { return ''; }
  let fullAddress = '';
  if (address.streetType) { fullAddress += address.streetType; }
  if (address.street) {
    if (fullAddress.length !== 0) { fullAddress += ' '; }
    fullAddress += address.street;
  }
  if (address.number) { fullAddress += ' ' + address.number; }
  if (address.door) { fullAddress += ' - ' + address.door; }
  if (address.postalCode) { fullAddress += ', ' + address.postalCode; }
  if (address.city) { fullAddress += ' ' + address.city; }
  return fullAddress;
}



export function getUserFormattedAddress(address: any) {
  if (!address) { return ''; }
  let fullAddress = '';
  if (address.road_type_code) { fullAddress += address.road_type_code + '/'; }
  if (address.road_name) {
    if (fullAddress.length !== 0) { fullAddress += ' '; }
    fullAddress += address.road_name;
  }
  if (address.road_number) { fullAddress += ' ' + address.road_number; }
  if (address.portal) { fullAddress += ', ' + address.portal; }
  if (address.stairs) { fullAddress += ', esc. ' + address.stairs; }
  if (address.door) { fullAddress += ' - ' + address.door; }
  if (address.complement_address) { fullAddress += ' (' + address.complement_address + ')'; }
  if (address.postal_code) { fullAddress += ', ' + address.postal_code; }
  if (address.city) { fullAddress += ' ' + address.city; }
  return fullAddress;
}
