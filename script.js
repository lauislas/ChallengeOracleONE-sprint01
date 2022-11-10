'use strict'
let btnEncrypt = document.getElementById("btn-encrypt");
let btnDecrypt = document.getElementById("btn-decrypt");
let btnCopy = document.getElementById("btn-copy");
let txtAreaIn = document.querySelector(".txt-in");
let txtAreaOut = document.querySelector(".txt-out");
let reset = document.querySelector(".reload");

txtAreaIn.focus()

function validateInput() {

    let patron = /[áéíóú´]/;

    if (txtAreaIn.value.length == 0) {
        alertBox("El campo de texto no puede estar vacío.", 'warning');
        txtAreaIn.value = "";
        return true;
    }

    if (patron.test(txtAreaIn.value)) {
        alertBox("El texto no puede contener tildes.", 'warning');
        txtAreaIn.value = "";
        return true;
    }
}

function replaceView() {
    document.querySelector(".msg-img").classList.toggle("msg-img-view");
    document.querySelector(".msg-text").classList.toggle("msg-text-view");

}

function encryptButton() {
    let outputText = encryptText(txtAreaIn.value);
    txtAreaOut.value = outputText;
    txtAreaIn.value = "";
    replaceView();
}


btnEncrypt.addEventListener("click", function () {
    txtAreaIn.focus()
    if (!validateInput()) {
        encryptButton();
    }
});


function decryptButton() {
    let outputText = decryptText(txtAreaOut.value);
    txtAreaOut.value = outputText;
}

btnDecrypt.addEventListener("click", decryptButton)


function copyText() {
    txtAreaOut.select()
    navigator.clipboard.writeText(txtAreaOut.value);
    alertBox("Texto copiado.", 'success');

}

btnCopy.addEventListener("click", copyText)


function refresh() {
   location.reload()
}

reset.addEventListener("click", refresh)


const rules = { "e": "enter", "i": "imes", "a": "ai", "o": "ober", "u": "ufat" };

function encryptText(text) {

    let output = "";

    for (const obj in rules) {
        output = text.replaceAll(obj, rules[obj]);
        text = output;
    }
    return output.toLowerCase();
}


function decryptText(text) {

    let output = "";

    for (const obj in rules) {
        output = text.replaceAll(rules[obj], obj);
        text = output;
    }
    return output;
}

function alertBox(text, symbol) {
    Swal.fire({
        title: text,
        icon: symbol,
        confirmButtonColor: '#0A3871',
        confirmButtonText: 'Aceptar',
        showCloseButton: true
    })
};