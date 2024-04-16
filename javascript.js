let str2 = '0';
let str1 = '';
let operator = '';
let otherButtonClicked = 'false';


const body = document.querySelector('body');
body.addEventListener("keydown", getKeyInput);
//Handle button input

function getKeyInput(event) {
    const possibleNumbers = '1234567890.';
    const operators = ['+', '-', '/', '*', '=', 'Enter'];

 
    key = event.key;
  

    // Create and display output when number or decimal entered on keyboard
    if (possibleNumbers.includes(key)){
        str2 = createOutput(key);
        displayOutput(str2);

    // Handle calculations and output when + - / * or = pressed on keyboard       
    }else if (operators.includes(key)){
        otherButtonClicked = 'false';
        result = operate(operator);
        if (result !== ''){
        displayOutput(String(result));
        } 
        operator = key;
        if (str2 !== ''){
        str1 = str2;
        str2 = '';
        } 

    // Handle calculations and output when ! % or +/- pressed   
    }else if (key === '%' || key === '!'){
        result = handleOtherButton(key, key);
        displayOutput(String(result));
     
    // Handle ouput when backspace is pressed    
    }else if (key === 'Backspace'){
    str2 = str2.slice(0,-1);
    console.log(`str1: ${str1}, str2: ${str2} button: $"{button.id}`);
    if (str2 === ''){
        displayOutput(str1);
        }else{
    displayOutput(str2);
        };    
    
    
    // Clear screen when CE button pressed
    }else if (key === 'Delete'){
        clearDisplay();
    }
};

//Listen for input at each of the buttons
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener("mousedown", getInput);
})

//Handle button input
function getInput(event) {
    button = event.target;
 
    // Create and display output when number button pressed
    if (button === 'backspace'){
        str2 = str2.slice(0,-1);
        console.log(`str1: ${str1}, str2: ${str2} button: $"{button.id}`);
        if (str2 == ''){
            displayOutput(str1);
        }else{
        displayOutput(str2);
        };    
        
    }else if (button.className === 'num-btn'){
        str2 = createOutput(button.textContent, button.id);
   
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
    
        displayOutput(str2);
        clearDisplay();
        
    }
};

// Add characters to string when numbers or . pressed

function createOutput(character, id){
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
    // Don't add extra zeros at the front, don't allow the addition of characters after !, % or +/- pressed
    if ((character === '0' && str2 == '') || (otherButtonClicked === 'true')){
        character = ''; 
    }
    if (id === 'backspace'){
        str2 = str2.slice(0, -1);
        if (str2 === ''){
            displayOutput(str1);
        }else{
        displayOutput(str2);
        };    
   
        console.log(`str1: ${str1}, str2: ${str2} button: $"{button.id}`);


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
            case '!':
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
            case '%':    
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
function operate(operator){
    num1 = Number(str1);
    num2 = Number(str2);
    otherButtonClicked = 'false';
    let result = '';
    if (str2 !== '' && str1 !== '' && operator !== ''){
        
        switch(operator){
            case 'plus':
            case '+':
                result = num1 + num2;
                break;
            case 'minus':
            case '-':
                result = num1 - num2;
                break;
            case 'times':
            case '*':
                result = num1 * num2;
                break;
            case 'divide':
            case '/':
                result = num1 / num2;
                break;
        };
        if (operator !== 'Enter' && operator !== 'equals' && operator !== '='){
        str1 = String(result);
        str2 = '';//prevents operating again 
        operator = '';}
  
    }

return result;    
};
    


