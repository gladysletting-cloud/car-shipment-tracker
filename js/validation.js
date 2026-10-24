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
  "make",
  "model",
  "year",
  "vin",
  "origin",
  "destination",
  "carrier", 
  "eta",
];

export function isValidVin(vin) {
  if (typeof vin !== "string") 
    return false;
  const cleaned = vin.trim().toUpperCase();
  if (cleaned.length !== 17) 
    return false;
  for (const char of cleaned) {
    if (!ALLOWED_VIN_CHARS.includes(char)) 
      return false;
  }
  return true;
}

export function isValidTransition(current, next) {
  const currentIndex = STATUSES.indexOf(current);
  const nextIndex = STATUSES.indexOf(next);
  if (currentIndex === -1 || nextIndex === -1) 
    return false;
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

export function validateShipment(data){
  const errors = {};

  for(const field of getMissingFields(data)) {
    errors[field] = "This field is required.";
  }
  if(!errors.vin && !isValidVin(data.vin)){
    errors.vin = "VIN must be 17 characters(no I, O or Q).";
  
  }
  const year = Number(data.year);
  const maxyear = new Date().getFullYear() +1;
  if(!errors.year && !(Number.isInteger(year) && year >=1980 && year <= maxyear)){
    errors.year =`Year must be a whole number from 1980 to ${maxyear}.`;
  }
  return errors;
}