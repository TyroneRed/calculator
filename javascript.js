let str2 = ''
let str1 = ''
let operator = ''

let numberButtons = document.querySelectorAll('.num-btn');
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", function getInput(){
    additionalCharacter = numberButton.textContent
    if (additionalCharacter === '.'){
        if (str2.includes('.')){
            additionalCharacter = '';
        }
        if (str2 == ''){
            additionalCharacter = '0.'
        }
    if (additionalCharacter === '0' && str2 == ''){
        additionalCharacter = '';
    }
    }
    if (str2.length < 8){
    str2 += additionalCharacter;
    displayOutput(str2);  
    }
});
});

let operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", function getOperator(){
        if (str1 !== ''){
            console.log(str1, str2, operator);
            operate();
        };
        operator = operatorButton.id;
            
        str1 = str2
        str2 = ''

    });
});

function displayOutput(str){
    let output = document.querySelector('#output');
    if (str.length > 8 && str.includes('.')){
        let stringArr = str.split('.');
        let length = stringArr[0].length;
        let power = 7 - length; 
        let rounded = Math.round(Number(str)*(10**power))/(10**power);
        output.textContent = String(rounded);    
    }else if (str.length > 8 || str == 'Infinity'){
        output.textContent = 'ERROR';
    }else{ 
        output.textContent = str;
    };
};

function clearDisplay(){
    str2 = '0';
    displayOutput(str2);
    str2 = '';
    str1 = '';
};

let clearButton = document.querySelector('#CE')
clearButton.addEventListener("click", clearDisplay);


let equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click",  operate)
// (){
//     num1 = Number(str1);
//     num2 = Number(str2);
    
//     let result;
//     switch(operator){
//         case 'plus':
//             result = num1 + num2;
//             break;
//         case 'minus':
//             result = num1 - num2;
//             break;
//         case 'times':
//             result = num1 * num2;
//             break;
//         case 'divide':
//             result = num1 / num2;
//             break;
//     };
    
//     displayOutput(String(result));
//     str2 = String(result);
//     str1 = '';
    
    
// });

function operate(){
    num1 = Number(str1);
    num2 = Number(str2);
    
    let result;
    switch(operator){
        case 'plus':
            result = num1 + num2;
            break;
        case 'minus':
            result = num1 - num2;
            break;
        case 'times':
            result = num1 * num2;
            break;
        case 'divide':
            result = num1 / num2;
            break;
    };
    
    displayOutput(String(result));
    str2 = String(result);
    str1 = '';
    
    
};



let factorialButton = document.querySelector('#factorial');
factorialButton.addEventListener("click", function factorial() {
    if (str2){
        let result = 1;
        console.log(str1, str2, operator);
        num2 = Number(str2);
        if ((num2 - Math. floor(num2)) !== 0){
            result = 'ERROR';
        }
        if (num2 === 0){
            result = 1
        }else{
            for(let i = num2; i > 1; i--){
            result *= i;
        }}
   
        displayOutput(String(result));
        num2 = result;
        str2 = String(num2);
};
});




let percentButton = document.querySelector('#percent')
percentButton.addEventListener("click", function percent() {
    if (str2){
    num2 = Number(str2)/100;
    str2 = String(num2);
    displayOutput(str2)
    };
    
});


let plusMinusButton = document.querySelector('#plus-minus')
plusMinusButton.addEventListener("click", function negative() {
    console.log('here');
    if (str2){
    num2 = -1*Number(str2);
    console.log(num2);
    str2 = String(num2)
    console.log(str2);
    displayOutput(str2);
    }
});



