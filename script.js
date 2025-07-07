  document.addEventListener('DOMContentLoaded', () => {
    const screen = document.querySelector('.calculator-screen');
    const keys = document.querySelectorAll('.key');

    let currentInput = '0';
    let operator = null;
    let previousValue = null;
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

    function clearCalculator() {
      currentInput = '0';
      operator = null;
      previousValue = null;
      waitingForSecondValue = false;
    }

    function handleOperator(nextOperator) {
      const inputValue = parseFloat(currentInput);

      if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
      }

      if (previousValue == null) {
        previousValue = inputValue;
      } else if (operator) {
        const result = calculate(previousValue, inputValue, operator);
        currentInput = String(result);
        previousValue = result;
      }

      operator = nextOperator;
      waitingForSecondValue = true;
    }

    function calculate(first, second, op) {
      switch (op) {
        case '+':
          return first + second;
        case '-':
          return first - second;
        case '*':
          return first * second;
        case '/':
          return second !== 0 ? first / second : 'Erro';
        default:
          return second;
      }
    }

    keys.forEach(key => {
      key.addEventListener('click', () => {
        const value = key.value;

        if (value === 'clear') {
          clearCalculator();
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
          handleOperator(value);
        } else if (value === '.') {
          inputDecimal(value);
        } else if (value === '=') {
          if (operator && previousValue !== null) {
            const result = calculate(previousValue, parseFloat(currentInput), operator);
            currentInput = String(result);
            operator = null;
            previousValue = null;
            waitingForSecondValue = false;
          }
        } else {
          inputNumber(value);
        }

        updateScreen(currentInput);
      });
    });
  });