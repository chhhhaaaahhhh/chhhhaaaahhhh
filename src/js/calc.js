let screenValue = "";

function appendValue(value) {
    screenValue += value;
    document.getElementById("screen").textContent = screenValue;
}

function clearScreen() {
    screenValue = "";
    document.getElementById("screen").textContent = "";
}

function calculateResult() {
    try {
        screenValue = eval(screenValue);
        document.getElementById("screen").textContent = screenValue;
    } catch (error) {
        document.getElementById("screen").textContent = "Erreur";
    }
}