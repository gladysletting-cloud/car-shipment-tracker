import { describe, it, expect } from "vitest";
import {
  isValidVin,
  isValidTransition,
  getMissingFields,
  validateShipment,
} from "../js/validation.js";

describe("isValidVin", () => {
  it("accepts a valid 17-character VIN", () => {
    expect(isValidVin("JTMHV05J004123456"))
    .toBe(true);
  });

  it("rejects a VIN that is too short", () => {
    expect(isValidVin("JTMHV05J0041"))
    .toBe(false);
  });

  it("rejects a VIN containing the letter O", () => {
    expect(isValidVin("JTMHV05J00412345O"))
    .toBe(false);
  });

  it("rejects a value that is not a string", () => {
    expect(isValidVin(12345))
    .toBe(false);
  });
});

describe("isValidTransition", () => {
  it("allows moving to the next status", () => {
    expect(isValidTransition("Booked", "Picked up"))
    .toBe(true);
  });

  it("blocks skipping a status", () => {
    expect(isValidTransition("Booked", "Delivered"))
    .toBe(false);
  });

  it("blocks moving backwards", () => {
    expect(isValidTransition("In transit", "Booked"))
    .toBe(false);
  });

  it("rejects an unknown status", () => {
    expect(isValidTransition("Booked", "Lost"))
    .toBe(false);
  });
});

describe("getMissingFields", () => {
  it("returns an empty array when nothing is missing", () => {
    const shipment = {
      make: "Toyota", 
      model: "Land Cruiser", 
      year: 2022,
      vin: "JTMHV05J004123456", 
      origin: "Mombasa",
      destination: "Nairobi", 
      carrier: "Maersk", 
      eta: "2026-10-28",
    };
    expect(getMissingFields(shipment)).toEqual([]);
  });

  it("lists the fields that are empty or absent", () => {
    expect(getMissingFields({ make: "Toyota", model: "  " })).toContain("model");
    expect(getMissingFields({ make: "Toyota" })).toContain("vin");
  });
});
describe("validateShipment", () => {
  const valid = {
    make: "Toyota", model: "Land Cruiser", year: "2022",
    vin: "JTMHV05J004123456", origin: "Mombasa",
    destination: "Nairobi", carrier: "Maersk", eta: "2026-10-28",
  };

  it("returns no errors for a valid shipment", () => {
    expect(validateShipment(valid)).toEqual({});
  });

  it("reports a bad VIN", () => {
    expect(validateShipment({ ...valid, vin: "123" }).vin).toBeDefined();
  });

  it("reports a bad year", () => {
    expect(validateShipment({ ...valid, year: "abc" }).year).toBeDefined();
  });

  it("reports missing fields", () => {
    expect(validateShipment({ ...valid, make: "" }).make).toBeDefined();
  });
});