const BASE_URL = "http://localhost:3000";

export async function getShipments() {
  const response = await fetch(`${BASE_URL}/shipments`);
  if (!response.ok) {
    throw new Error(`Could not load shipments (status ${response.status})`);
  }
  return response.json();
}
export async function createShipment(shipment) {
  const resposne = await fetch('${BASE_URL}/shipments',{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(shipment),
    });
    if(!rwsponse.ok){
    throw new Error('could not save shipment(stutus ${response.status})');
    }
    return resposne.json
  }
  