let display = document.getElementById('result');
let memory = 0;
let currentMode = 'basic';

function setMode(mode) {
    currentMode = mode;
    const calculator = document.querySelector('.calculator');
    
    if (mode === 'basic') {
        calculator.classList.add('basic-mode');
        calculator.classList.remove('scientific-mode');
        document.querySelectorAll('.mode-btn')[0].classList.add('active');
        document.querySelectorAll('.mode-btn')[1].classList.remove('active');
    } else {
        calculator.classList.add('scientific-mode');
        calculator.classList.remove('basic-mode');
        document.querySelectorAll('.mode-btn')[1].classList.add('active');
        document.querySelectorAll('.mode-btn')[0].classList.remove('active');
    }
}

function appendToDisplay(value) {
    if (display.value === '0' || display.value === 'Error') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearAll() {
    display.value = '0';
}

function clearEntry() {
    display.value = '0';
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
}

function calculate() {
    try {
        let expression = display.value.replace(/×/g, '*');
        let result = eval(expression);
        
        if (!isFinite(result)) {
            throw new Error('Invalid calculation');
        }
        
        display.value = result;
        
    } catch (error) {
        display.value = 'Error';
    }
}

// ========== SCIENTIFIC FUNCTIONS ========== //

function calculateSin() {
    try {
        let value = parseFloat(display.value);
        let result = Math.sin(value * Math.PI / 180); // Convert to radians
        display.value = roundResult(result);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateCos() {
    try {
        let value = parseFloat(display.value);
        let result = Math.cos(value * Math.PI / 180); // Convert to radians
        display.value = roundResult(result);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateTan() {
    try {
        let value = parseFloat(display.value);
        let result = Math.tan(value * Math.PI / 180); // Convert to radians
        display.value = roundResult(result);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateLog() {
    try {
        let value = parseFloat(display.value);
        if (value <= 0) throw new Error('Invalid input');
        let result = Math.log10(value);
        display.value = roundResult(result);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateLn() {
    try {
        let value = parseFloat(display.value);
        if (value <= 0) throw new Error('Invalid input');
        let result = Math.log(value);
        display.value = roundResult(result);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateSqrt() {
    try {
        let value = parseFloat(display.value);
        if (value < 0) throw new Error('Invalid input');
        let result = Math.sqrt(value);
        display.value = roundResult(result);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateSquare() {
    try {
        let value = parseFloat(display.value);
        let result = value * value;
        display.value = roundResult(result);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculatePower() {
    appendToDisplay('**');
}

function calculateFactorial() {
    try {
        let value = parseInt(display.value);
        if (value < 0 || value > 100) throw new Error('Invalid input');
        
        let result = 1;
        for (let i = 2; i <= value; i++) {
            result *= i;
        }
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

function calculatePercentage() {
    try {
        let value = parseFloat(display.value);
        let result = value / 100;
        display.value = roundResult(result);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateReciprocal() {
    try {
        let value = parseFloat(display.value);
        if (value === 0) throw new Error('Division by zero');
        let result = 1 / value;
        display.value = roundResult(result);
    } catch (error) {
        display.value = 'Error';
    }
}

function toggleSign() {
    if (display.value !== '0' && display.value !== 'Error') {
        if (display.value.startsWith('-')) {
            display.value = display.value.slice(1);
        } else {
            display.value = '-' + display.value;
        }
    }
}

function addPi() {
    if (display.value === '0' || display.value === 'Error') {
        display.value = Math.PI.toString();
    } else {
        display.value += Math.PI.toString();
    }
}

function addE() {
    if (display.value === '0' || display.value === 'Error') {
        display.value = Math.E.toString();
    } else {
        display.value += Math.E.toString();
    }
}

// ========== HELPER FUNCTIONS ========== //

function roundResult(result) {
    return Math.round(result * 100000000) / 100000000;
}

// ========== MEMORY FUNCTIONS ========== //

function memoryStore() {
    let value = parseFloat(display.value);
    if (!isNaN(value)) {
        memory = value;
    }
}

function memoryRecall() {
    display.value = memory.toString();
}

function memoryClear() {
    memory = 0;
}

function memoryAdd() {
    let value = parseFloat(display.value);
    if (!isNaN(value)) {
        memory += value;
    }
}

function memorySubtract() {
    let value = parseFloat(display.value);
    if (!isNaN(value)) {
        memory -= value;
    }
}

// ========== KEYBOARD SUPPORT ========== //

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    }
    else if (key === '.') {
        appendToDisplay('.');
    }
    else if (key === '+') {
        appendToDisplay('+');
    }
    else if (key === '-') {
        appendToDisplay('-');
    }
    else if (key === '*') {
        appendToDisplay('*');
    }
    else if (key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    }
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    else if (key === 'Escape') {
        clearAll();
    }
    else if (key === 'Backspace') {
        deleteLast();
    }
    else if (key === '(') {
        appendToDisplay('(');
    }
    else if (key === ')') {
        appendToDisplay(')');
    }
});

// Initialize
setMode('basic');