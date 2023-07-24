const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const button = document.querySelectorAll("#buttons-container button")

class Calculator{
constructor(previousOperationText, currentOperationText) {
this.previousOperationText = previousOperationText
this.currentOperationText = currentOperationText
this.currentOperation = ""
}

//adiciona digitos na tela da calculadora
addDigit(digit) {
//checar se ja tem ponto digitado
if(digit === "." && this.currentOperationText.innerText.includes(".")){
    return;
}

    this.currentOperation = digit;
    this.updateScreen();
}

//processamento de operaçoes da calculadora
processOperation(operation){
    //checar current vazio
    if(this.currentOperationText.innerText === "" && operation !== "C"){
        //Mudança de operação
        if(this.previousOperationText.innerText !== ""){
            this.changeOperation(operation)
        }
        return;
    }

    //pegar valores
    let operationValue
    const previous =+this.previousOperationText.innerText.split(" ")[0]
    const current = +this.currentOperationText.innerText

    switch(operation){
        case "+":
            operationValue = previous + current
            this.updateScreen(operationValue, operation, current, previous)
            break;
        case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break;
        case "*":
            operationValue = previous * current
            this.updateScreen(operationValue, operation, current, previous)
            break;
        case "/":
            operationValue = previous / current
            this.updateScreen(operationValue, operation, current, previous)
            break;

            case "DEL":
                this.processDELoperator()
                break;
            case "CE":
               
                this.processCEoperator()
                break;
            case "C":
                this.processCoperator()
                break;
            case "=":
                this.processEqual()
        default:
            return;
    }
}


//Troca de valores na tela da calculadora
updateScreen(operationValue = null, 
    operation = null, 
    current = null,
    previous = null) 
    {
    console.log(operationValue, operation, current, previous)
    if(operationValue === null) {
        this.currentOperationText.innerText += this.currentOperation;
        }
    else{
        //checar se o valor é zero
        if(previous === 0){ operationValue = current}

        //adiciona o valor current para o previous
        this.previousOperationText.innerText = `${operationValue} ${operation}`;
        this.currentOperationText.innerText = "";
    }
    }

    //Troca de operação
    changeOperation(operation){
        const mathOperations = ["+", "/", "*", "-"]
        if(!mathOperations.includes(operation)){ 
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;

    }
    //Deletar
    processDELoperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }
    processCEoperator(){
        this.currentOperationText.innerText = ""
    }
    processCoperator(){
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }

    //Igual
    processEqual(){
        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation)
       
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

button.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === "."){
            calc.addDigit(value);
        } else{
            calc.processOperation(value);
        }
    });
});
