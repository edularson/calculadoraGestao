document.addEventListener('DOMContentLoaded', () => {
    const screen = document.querySelector('.calculator-screen');
    const keys = document.querySelectorAll('.key');

    let currentInput = '0';
    let previousValue = null;
    let operator = null;
    let waitingForSecondValue = false;

    function updateScreen(value) {
        screen.value = value;
    }

    function inputNumber(num) {
        if (waitingForSecondValue) {
            currentInput = num;
            waitingForSecondValue = false;
        } else {
            currentInput = currentInput === '0' ? num : currentInput + num;
        }
    }

    function inputDecimal(dot) {
        if (waitingForSecondValue) {
            currentInput = '0.';
            waitingForSecondValue = false;
            return;
        }
        if (!currentInput.includes(dot)) {
            currentInput += dot;
        }
    }
});