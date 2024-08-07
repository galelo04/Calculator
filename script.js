const container = document.querySelector(".container");
const screen = document.querySelector(".screen");
let isFirst = false;
let first = "";
let second = "";
let operator;

function add (num1 , num2){
    return num1+num2;
}
function subtract(num1,num2){
    return num1-num2;
}
function multiply(num1,num2){
    return num1*num2;
}
function division(num1,num2){
    return num1/num2;
}
function operation(num1,num2,operator){
    switch(operator){
        case '+':
            return add(num1,num2);
        case '-':
            return subtract(num1,num2);
        case '*':
            return multiply(num1,num2);
        case '/':
            return division(num1,num2);
    }
}

container.addEventListener('click',(e)=>{
    switch(e.target.className){
        case "digit" :
            if(!isFirst)
                first+=e.target.textContent;
            else
                second+=e.target.textContent;
            break;
        case "operator" :
            if(!isFirst)
                isFirst = true;
            else
                operation(first,second,operator);
            operator = e.target.textContent;
            break;
        case "action":
            switch(e.target.id){
                case "equal":
                    operation(first,second,operator);
                    break;
                case "backspace":
                    if(!isFirst)
                        first = first.slice(0,-1);
                    else
                        second = second.slice(0,-1);
                    break;
                case "clear":
                    first = second = "";
                    isFirst = false;
            }
    }

});