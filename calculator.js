const numbButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const clearAllButton = document.querySelector('[data-all-clear]')
const upperDisplay = document.querySelector('[data-upper-display]');
const lowerDisplay = document.querySelector('[data-lower-display]');
const equalsButton = document.querySelector('[data-equals]');
const specialOperationButton = document.querySelectorAll('[data-special-operation]');


class Calculator{
    constructor(upperDisplay, lowerDisplay){
        this.upperDisplay = upperDisplay;
        this.lowerDisplay = lowerDisplay;
        this.clearAll();
    }

    clear(){
        this.currentNumber = '';
    }

    delete(){
        this.currentNumber = this.currentNumber.toString().slice(0,-1);
    }

    clearAll(){
        this.currentNumber = '';
        this.previousNumber = '';
        this.operation = undefined;
    }

    appendNumber(number){
        if(number === '.'&& this.currentNumber.includes('.'))return;
        this.currentNumber = this.currentNumber.toString() + number.toString();
    }

    selectOperation(operation){
        if(this.currentNumber === '') return;
        if(this.previousNumber !== ''){
            this.operate();
        }
        this.operation = operation;
        this.previousNumber = this.currentNumber;
        this.currentNumber = '';
    }

    special(specialoperation){
        this.specialoperation = specialoperation;
        let result;
        if(this.currentNumber === '') return;
        const numb = parseFloat(this.currentNumber)
        switch (this.specialoperation) {
            case '√':
                 result = Math.pow(numb, 0.5);
                 break;
            case '%':
                 result = (numb/100);
                 break;
            default:
                return;
        }
        this.currentNumber = parseFloat(result.toFixed(4));
        this.previousNumber = '';
    }

    operate(){
        let computed;
        const previous = parseFloat(this.previousNumber)
        const current = parseFloat(this.currentNumber)
        if(isNaN(previous) || isNaN(current))return
        switch (this.operation) {
            case '÷':
                 computed = previous / current;
                 break;
            case 'x':
                 computed = previous * current;
                 break;
            case '+':
                 computed = previous + current;
                 break;
            case '−':
                 computed = previous - current;
                 break;
            default:
                return;
        }
        this.currentNumber = parseFloat(computed.toFixed(4))
        this.operation = undefined
        this.previousNumber = ''
    }

    updateDisplay(){
        this.lowerDisplay.innerText = this.currentNumber
        this.upperDisplay.innerText = this.previousNumber
        if(this.currentNumber.length > 15){
            this.lowerDisplay.innerText = this.lowerDisplay.innerText.substring(0,15);
        }
    }
}


const calculator = new Calculator(upperDisplay, lowerDisplay);

numbButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateDisplay()
    })
})

specialOperationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.special(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () =>{
    calculator.operate()
    calculator.updateDisplay()
})

clearAllButton.addEventListener('click', () =>{
    calculator.clearAll()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', () =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () =>{
    calculator.delete()
    calculator.updateDisplay()
})