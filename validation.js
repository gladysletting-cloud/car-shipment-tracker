const ALLOWED_VIN_CHARS = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789";

export const STATUSES = [
  "Booked",
  "Picked up",
  "In transit",
  "At port/customs",
  "Out for delivery",
  "Delivered",
];

const REQUIRED_FIELDS = [
  "make", "model", "year", "vin", "origin", "destination", "carrier", "eta",
];

export function isValidVin(vin) {
  if (typeof vin !== "string") return false;
  const cleaned = vin.trim().toUpperCase();
  if (cleaned.length !== 17) return false;
  for (const char of cleaned) {
    if (!ALLOWED_VIN_CHARS.includes(char)) return false;
  }
  return true;
}

export function isValidTransition(current, next) {
  const currentIndex = STATUSES.indexOf(current);
  const nextIndex = STATUSES.indexOf(next);
  if (currentIndex === -1 || nextIndex === -1) return false;
  return nextIndex === currentIndex + 1;
}

export function getMissingFields(shipment) {
  const missing = [];
  for (const field of REQUIRED_FIELDS) {
    const value = shipment[field];
    if (value === undefined || value === null || String(value).trim() === "") {
      missing.push(field);
    }
  }
  return missing;
}