import { getShipments } from "./api.js";

async function init() {
  try {
    const shipments = await getShipments();
    console.log(shipments);
  } catch (error) {
    console.error(error.message);
  }
}

init();