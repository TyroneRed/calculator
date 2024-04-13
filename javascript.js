let str2 = '0';
let str1 = '';
let operator = '';
let otherButtonClicked = 'false';

const numberButtons = document.querySelectorAll('.num-btn');
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click",function getInput(){
        console.log(otherButtonClicked);
        if (str2 === '0'){
            str2 = ''
        }    
        additionalCharacter = numberButton.textContent    
        if (additionalCharacter === '.'){
            if (str2.includes('.')){
                additionalCharacter = '';
            }
            if (str2 == ''){
                additionalCharacter = '0.'
            }
        }    
        if ((additionalCharacter === '0' && str2 == '') || (otherButtonClicked === 'true')){
            additionalCharacter = ''; 
        }
    
        if (str2.length < 8){
        str2 += additionalCharacter;
        displayOutput(str2);  
        }
    } );
});



const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", function getOperator(){
        otherButtonClicked = 'false';
        operate();
        operator = operatorButton.id; 
        if (str2 !== ''){
        str1 = str2;
        str2 = '';
        }    
    });
});

// Display output to 8 characters, round decimals, show errors when output too long
function displayOutput(str){
    let output = document.querySelector('#output');
    if (str.length > 8 && str.includes('.') && !str.includes('e')){
        let stringArr = str.split('.');
        let length = stringArr[0].length;
        let power = 7 - length; 
        let rounded = Math.round(Number(str)*(10**power))/(10**power);
        output.textContent = String(rounded);    
    }else if (str.length > 8 || str == 'Infinity' || str == 'NaN'){
  
        output.textContent = 'ERROR';

    }else{ 
        output.textContent = str;
    };
};

//Clear the display, reset variables 
function clearDisplay(){
    
    str2 = '0';
    str1 = '';
    operator = '';
    displayOutput(str2);
    otherButtonClicked = 'false';
};

let clearButton = document.querySelector('#CE')
clearButton.addEventListener("click", clearDisplay);


let equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click",  operate)


function operate(){
    num1 = Number(str1);
    num2 = Number(str2);
    otherButtonClicked = 'false';
    if (str2 !== '' && str1 !== '' && operator !== ''){
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
    str1 = String(result);
    str2 = '';//prevents operating again 
    operator = '';
}
    
};

let otherButtons = document.querySelectorAll(".other");
otherButtons.forEach((otherButton) => {
    otherButton.addEventListener("click", function handleOtherButtons() {
        
        
        let result = 1;
        if (str2 === ''){
            str2 = str1;
        }
        if (str2){
        switch (otherButton.id){
            
            case 'factorial': 
                num2 = Number(str2);
                if (num2 === 0){
                    result = 1
                }    
                else if ((num2 - Math. floor(num2)) !== 0 || (num2 < 0)){
                    result = 'ERROR';
                    num2 = 0;
                }else{
                    for(let i = num2; i > 1; i--)
                    result *= i;
                }
                break;

            case 'percent':
                result = Number(str2)/100;
                break;

            case 'plus-minus':
                result = -1*Number(str2);
                break;
            }  
            
      
        displayOutput(String(result)); 
        str2 = String(result);  
        otherButtonClicked = 'true';      
    };
    });   
    
});        
        