import { getShipments } from "./api.js";
import { renderShipments, showMessage } from "./ui.js";

async function init() {
  showMessage("Loadind shipment...")
  try {
    const shipments = await getShipments();
    shipments("");
    renderShipments(shipments)
  } catch (error) {
    showMessage(error.message, true);
  }
}

init();