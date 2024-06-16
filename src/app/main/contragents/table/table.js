import updateContragentModalHtml from "../modal/contragent-modal.html"


const updateContragentModalElement = document.getElementById("contragent-modal-id");
updateContragentModalElement.innerHTML = updateContragentModalHtml;

export const contragents = [
    {
        "id": 1,
        "name": "Контрагент1",
        "itn": 12345678911,
        "address": "Test",
        "trrc": 111111111
    }, {
        "id": 1,
        "name": "Test",
        "itn": 22222222222,
        "address": "Test",
        "trrc": 111111111
    }
];

export const contragentsMap = new Map();

const columnCellNameToIndex= {
    "name": 0,
    "itn": 1,
    "address": 2,
    "trrc": 3,
    "bin": 4
}

export let lastClickedCounteragent;

export function updateLastClickedContragent(clickedContragent) {
    lastClickedCounteragent = clickedContragent;
}

populateTable();

export function populateTable() {
    const table = document.querySelector(".conteragent-table");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    for (let i = 0; i < contragents.length; i++) {
        let contragent = contragents[i];
        createContragentRow(table, contragent);
    }
}

export function createContragentRow(table, conteragent) {
    let newRow = table.insertRow();
    newRow.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700";
    newRow.setAttribute("conterparty-id", conteragent.id);

    const cellClassName = "px-6 py-4 font-semibold text-gray-900";

    const nameCell = newRow.insertCell(columnCellNameToIndex.name);
    nameCell.innerHTML = conteragent.name;
    nameCell.className = cellClassName;

    const itnCell = newRow.insertCell(columnCellNameToIndex.itn);
    itnCell.innerHTML = conteragent.itn;
    itnCell.className = cellClassName;

    const addressCell = newRow.insertCell(columnCellNameToIndex.address);
    addressCell.innerHTML = conteragent.address;
    addressCell.className = cellClassName;

    const trrcCell = newRow.insertCell(columnCellNameToIndex.trrc);
    trrcCell.innerHTML = conteragent.trrc;
    trrcCell.className = cellClassName;

    const binCell = newRow.insertCell(columnCellNameToIndex.bin);
    binCell.innerHTML = `
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
            <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
        </svg>`;

    binCell.addEventListener("click", () => {
        contragents.splice(newRow.rowIndex - 1, 1);
        populateTable();
    })

    contragentsMap.set(conteragent.id, conteragent);

    newRow.addEventListener("dblclick", () => {
        const contragentForm = document.getElementById("contragent-form");

        const contragentId = parseInt(newRow.getAttribute("conterparty-id"));
        updateLastClickedContragent(contragentId);

        const currentCounteragent = contragentsMap.get(contragentId);

        document.getElementById("contragent-modal-button").click();

        contragentForm.querySelector('input[name="name"]').value = currentCounteragent.name;
        contragentForm.querySelector('input[name="itn"]').value = currentCounteragent.itn;
        contragentForm.querySelector('input[name="address"]').value = currentCounteragent.address;
        contragentForm.querySelector('input[name="trrc"]').value = currentCounteragent.trrc;
    })
}




