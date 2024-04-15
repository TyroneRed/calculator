let str2 = '0';
let str1 = '';
let operator = '';
let otherButtonClicked = 'false';

//Listen for input at each of the buttons
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener("click", getInput);
})
 
//Handle button input
function getInput(event) {
    button = event.target;

    // Create and display output when number button pressed
    if (button.className === 'num-btn'){
        str2 = createOutput(button.textContent);
        displayOutput(str2);

    // Handle calculations and output when + - / * or = pressed        
    }else if (button.className === 'operator'){
    
        otherButtonClicked = 'false';
        result = operate(operator);
        if (result !== ''){
        displayOutput(String(result));
        } 
        operator = button.id;
        if (str2 !== ''){
        str1 = str2;
        str2 = '';
        }      
    // Handle calculations and output when ! % or +/- pressed   
    }else if (button.className === 'other'){
        result = handleOtherButton(button.id);
        displayOutput(String(result));
    }

    // Clear screen when CE button pressed
    else if (button.className === 'clear'){
        clearDisplay();
    }
};

// Add characters to string when numbers or . pressed

function createOutput(character){
    //Don't add extra zeros at the front
    if (str2 === '0'){
        str2 = ''
    }   
    
    // Don't allow extra decimals
    if (character === '.'){
        if (str2.includes('.')){
            character = '';
        }
        // Add a zero before a starting decimal
        if (str2 == ''){
            character = '0.';
        }
    }    
    // Don't add extra zeros, don't allow the addition of characters after !, % or +/- pressed
    if ((character === '0' && str2 == '') || (otherButtonClicked === 'true')){
        character = ''; 
    }

    // Limit string length for display purposes
    if (str2.length < 8){
    str2 += character;
    }
    return str2;
};
    

// Calculate and output immediately when !, % or +/- pressed 
function handleOtherButton(otherButton){
    let result = 1;
        if (str2 === ''){
            str2 = str1;
        }
        if (str2){
        switch (otherButton){
            
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
            
      
         
        str2 = String(result);  
        otherButtonClicked = 'true'; 
        return result;     
    };
}

// display output
function displayOutput(str){
    let output = document.querySelector('#output');
    
    // Round decimals to 8 total characters
    if (str.length > 8 && str.includes('.') && !str.includes('e')){
        let stringArr = str.split('.');
        let length = stringArr[0].length;
        let power = 7 - length; 
        let rounded = Math.round(Number(str)*(10**power))/(10**power);
        output.textContent = String(rounded);

    // Display ERROR message for calculations resulting in greater than 8 digits and division by 0    
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



// Calculate and Display results
function operate(){
    num1 = Number(str1);
    num2 = Number(str2);
    otherButtonClicked = 'false';
    let result = '';
    if (str2 !== '' && str1 !== '' && operator !== ''){
        
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
        str1 = String(result);
        str2 = '';//prevents operating again 
        operator = '';
    }

return result;    
};
    


