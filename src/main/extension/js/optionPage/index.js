const extensionStorage = browser.storage.local;
const keyName = "firefoxScriptExtensionValue";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("saveButton").addEventListener("click", function (event) {
        event.preventDefault();
        saveValue(document.getElementById(keyName).value);
    });
    loadValue();
});

function saveValue(value) {
    let obj = {};
    obj[keyName] = {value: value};
    extensionStorage.set(obj);
}

function loadValue() {
    extensionStorage.get(keyName)
        .then(function (obj) {
            if (!!obj[keyName]) {
                document.getElementById(keyName).value = obj[keyName].value;
            }
        }, function (error) {
            console.error(`Error: ${error}`);
        });
}
