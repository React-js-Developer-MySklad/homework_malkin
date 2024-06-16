import {
    contragentsMap,
    contragents,
    createContragentRow,
    lastClickedCounteragent,
    populateTable,
    updateLastClickedContragent
} from "../table/table";
import {Contragent} from "../../../contragent";

const itnPattern = /^\d{11}$/;
const trrcPatter = /^\d{9}$/;

const observer = new MutationObserver(onModalVisibilityChange);

const contragentModal = document.getElementById("contragent-modal");
const itnError = document.querySelector(".itn-error");
const trrcError = document.querySelector(".trrc-error");
const contragentForm = document.getElementById("contragent-form");


observer.observe(contragentModal, {
    attributes: true,
    attributeFilter: ['role']
})

function onModalVisibilityChange(mutationList, observer) {
    for (let mutation of mutationList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'role') {
            if (!contragentModal.getAttribute("role")) {
                updateLastClickedContragent(null);
                clearForm();
            } else {
                itnError.textContent = "";
                trrcError.textContent = "";
            }
        }
    }
}

function clearForm() {

    contragentForm.querySelector('input[name="name"]').value = "";
    contragentForm.querySelector('input[name="itn"]').value = "";
    contragentForm.querySelector('input[name="address"]').value = "";
    contragentForm.querySelector('input[name="trrc"]').value = "";
}

document.getElementById("save-contragent").addEventListener("click", (e) => {
    e.preventDefault();

    const formData = new FormData(document.getElementById("contragent-form"));

    const nameToSave = formData.get("name");
    const itnToSave = formData.get("itn");
    const addressToSave = formData.get("address");
    const trrcToSave = formData.get("trrc");

    let valid = true;

    if (!itnPattern.test(itnToSave)) {
        itnError.textContent = "ИНН должен состоять из 11 цифр";
        valid = false;
    } else {
        itnError.textContent = "";
    }

    if (!trrcPatter.test(trrcToSave)) {
        trrcError.textContent = "КПП должен состоять из 9 цифр";
        valid = false;
    } else {
        trrcError.textContent = "";
    }

    if (!valid) {
        return;
    }

    if (lastClickedCounteragent) {
        const contragentToUpdate = contragentsMap.get(lastClickedCounteragent);
        contragentToUpdate.name = nameToSave;
        contragentToUpdate.itn = itnToSave;
        contragentToUpdate.address = addressToSave;
        contragentToUpdate.trrc = trrcToSave;

    } else {
        const contragent = new Contragent(Math.floor(Math.random() * 1000),
            nameToSave,
            itnToSave,
            addressToSave,
            trrcToSave)

        const table = document.querySelector(".conteragent-table");
        createContragentRow(table, contragent);
        contragents.push(contragent);
    }
    populateTable();
})

document.getElementById("cancel-update-button").addEventListener("click", (e) => {
    e.preventDefault();
})
