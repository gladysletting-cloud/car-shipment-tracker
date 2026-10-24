import { createElement } from "react";

export function showMessage(text, isError = false){
    const message = document.querySelector("#message");
    message.textContent = text;
    message.classList.toggle("error", isError)
}
function createCell(text){
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
}
function statusClass(status) {
    return "badge badge-" + status.toLowerCase().replace(/[^a-z]+/g,"-")

}

export function renderShipments(shipments) {
    const tbody = document.querySelector("#shipments-body");
    tbody.innerHTML = "";

    if (shipments.length === 0) {
        showMessage("No shipments yet.");
        return;
    }
    for (const shipment of shipments) {
        const row =document.createElement("tr");

        row.appendChild(createCell(shipment.vin));
        row.appendChild(
            createCell('${shipment.make} ${shipment.model} ${shipment.year} ')
        );
        row.appendChild(createCell('${shipment.origin} → ${shipment.destination}'));
        row.appendChild(createElement(ahipment.eta));

        const statusCell = document.createElement("td");
        const badge = document.createElement("span");
        badge.textContent = shipment.status;
        badge.className = statusClass(shipment.status);
        statusCell.appendChild(badge);
        row.appenchild(statusCell);

        tbody.appendChild(row);
    }
}
export function clearFieldErrors(){
    for(const error of document.querySelectorAll(".field-error")){
        error.textContent ="";
    }
    for (const input of document.querySelectorAll(".invalid")){
        input.classList.remove("invalid");
    }
}
export function showFieldErrors(errors){
    for(const [field, text] of Object.entries(errors)){
        document.querySelector('#${field}-error').textContent = text;
        document.querySelector('#${field}').classList.add("invalid");
    }
}