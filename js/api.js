const BASE_URL = "http://localhost:3000";

export async function getShipments() {
  const response = await fetch(`${BASE_URL}/shipments`);
  if (!response.ok) {
    throw new Error(`Could not load shipments (status ${response.status})`);
  }
  return response.json();
}