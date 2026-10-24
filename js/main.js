import { getShipments, createShipment } from "./api.js";
import { 
  renderShipments,
  showMessage,
  showFieldErrors,
  clearFieldErrors
} from "./ui.js";
import { validateshipment } from "./validation.js";

async function loadShipment() {
  showMessage("Loadind shipment...")
  try {
    const shipments = await getShipments();
    showMessage("");
    renderShipments(shipments)
  } catch (error) {
    showMessage(error.message, true);
  }
}

function buildShipment(data){
  const today = new Date().toISOString().slice(0, 10);
  return{
    make: data.make.trim(),
    model: data.model.trim(),
    year: Number(data.year),
    vin: data.vin.trim().toUppercase(),
    origin: data.origin.trim(),
    destination: data.destination.trim(),
    carrier: data.carrier.trim(),
    eta: data.eta,
    notes: data.notes.trim(),
    status: "Booked",
    history: [{
      status:"Booked", 
      location: data.origin.trim(), 
        date: today}]
  };
}

async function handleSubmit(event) {
  event.preventDefault();
  clearFieldErrors();

  const from = event.target
  const data = Object.fromEntries(new FormData(from));
  const errors = validateshipment(data);

  if (Object.keys(error).length > 0) {
    showFieldErrors(errors);
    return;
  }

  try{
    await createShipment(buildShipment(data));
    from.reset();
    await loadShipments();
    showMessage("Shipment saved.");
  }catch(error){
    showMessage(error.message, true);
  }
}
document.querySelector("#shipment-form").addEventListener("submit", handleSubmit);
loadShipments