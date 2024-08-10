const container = document.querySelector(".container");
const inputScreen = document.querySelector(".inputScreen");
const resultScreen = document.querySelector(".resultScreen");
let isFirstOperator = true;
let onScreen = "";
let expression = "";
let operator ='';
let firstNumber = "";
let firstNumberFinished = false;
let secondNumber = "";
let dotFirst = false;
let dotSecond = false;


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
function isOperator(character){
    return (character==='+' || character==='-' || character==='*' || character==='/');
}
function operation(num1 , num2 , operator){
    switch(operator){
        case '+':
            return add(+num1,+num2);
        case '-':
            return subtract(+num1,+num2);
        case '*':
            return multiply(+num1,+num2);
        case '/':
            return division(+num1,+num2);
    }
}

container.addEventListener('click',(e)=>{
    switch(e.target.className){
        case "digit" :
            if(!firstNumberFinished){
                if(e.target.id==="butDot" && dotFirst) break;
                else if(e.target && !dotFirst)
                    dotFirst=true;
                onScreen+=e.target.textContent;
                firstNumber+=e.target.textContent;
            }
            else{
                if(e.target.id==="butDot" && dotSecond)break;
                else if(e.target.id==="butDot" && !dotSecond)
                    dotSecond=true;
                onScreen+=e.target.textContent;
                secondNumber+=e.target.textContent;
            }
            break;
        case "operator" :
            if(isOperator(onScreen.slice(-1))&&(e.target.textContent!=='-' || onScreen.slice(-1)==='-')){
                onScreen = onScreen.slice(0,-1)+e.target.textContent;
            }
            else if(isFirstOperator){
                isFirstOperator = false;
                onScreen+=e.target.textContent;
                expression+=e.target.textContent;
            }
            else if(expression.slice(-1)==='='){
                expression = expression.slice(0,-1);
                expression+=e.target.textContent;
                onScreen=expression;
            }
            else{
                resultScreen.textContent = expression=operation(expression).toString();
                onScreen+=e.target.textContent;
                expression+=e.target.textContent;
            }
            break;
        case "action":
            switch(e.target.id){
                case "equal":
                    if(expression.slice(-1)!=='='){
                        resultScreen.textContent=expression=operation(expression).toString();
                        onScreen=expression;
                        expression+=e.target.textContent;
                    }
                    break;
                case "backspace":
                    if(onScreen!==0){
                        onScreen = onScreen.slice(0,-1);
                        if(expression.slice(-1)==='=')
                            expression = expression.slice(0,-2);
                        else
                            expression=expression.slice(0,-1);
                        if(isOperator(expression.slice(-1)))
                            isFirstOperator=true;
                    }
                    break;
                case "clear":
                    onScreen = '';
                    expression="";
                    isFirstOperator= true;
                    resultScreen.textContent = '0';
            }
            break;
    }
    inputScreen.textContent = onScreen;

});