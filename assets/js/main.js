const calculator = document.querySelector(".calculator");
const input = document.querySelector("#inputBox");

let state = {
    value: ""
};

function updateDisplay() {
    input.value = state.value || "0";
}

function appendValue(val) {
    const operators = ['+', '-', '*', '/'];
    const lastChar = state.value.slice(-1);

    // منع تكرار العمليات
    if (operators.includes(val) && operators.includes(lastChar)) return;

    // Not rpeety
    if (val === '.' && lastChar === '.') return;

    state.value += val;
}

function calculate() {
    try {
        state.value = Function('return ' + state.value)().toString();
    } catch {
        state.value = "Error";
    }
}

function clearAll() {
    state.value = "";
}

function deleteLast() {
    state.value = state.value.slice(0, -1);
}

function percentage() {
    if (!state.value) return;
    state.value = (parseFloat(state.value) / 100).toString();
}

calculator.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;

    const value = e.target.innerHTML;

    if (value === '=') {
        calculate();
    } else if (value === 'AC') {
        clearAll();
    } else if (value === 'DEL') {
        deleteLast();
    } else if (value === '%') {
        percentage();
    } else {
        appendValue(value);
    }

    updateDisplay();
});
///For Keybord
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
        appendValue(e.key);
    } else if (e.key === "Enter") {
        calculate();
    } else if (e.key === "Backspace") {
        deleteLast();
    }

    updateDisplay();
});

updateDisplay();