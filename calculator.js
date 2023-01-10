function add(num1, num2){ 
    return (+num1) + (+num2);
}

function subtract(num1, num2){ 
    return num1 - num2;
}

function multiply(num1, num2){ 
    return num1 * num2; 
}

function divide(num1, num2){ 
    return num1 / num2; 
}

function operate(num1, operator, num2){ 
    switch(operator){ 
        case "+": 
        return add(num1, num2);

        case "-": 
        return subtract(num1, num2); 

        case "*": 
        return multiply(num1, num2); 

        case "÷": 
        return divide(num1, num2);
    }
}

function numCheck(element){ 
    return +element === +element;
}


function calculate(){ 
  
    
    let displayArray = []; 
    const screen = document.getElementsByClassName("screenDigits")[0];   
    const allButtons = Array.from(document.querySelectorAll("button")); 
    let buttonPressed; 

    for(let i = 0; i <= allButtons.length - 1; i++) { 
        allButtons[i].addEventListener("click", (e) => { 
        buttonPressed = e.target.textContent; 
        console.log(buttonPressed);
        buttonPress();
        }); 
    }

    // function executeEquation(displayArray, element) { 
    //     let result = operate(displayArray[indexOfOperator - 1], element, displayArray[indexOfOperator + 1]); 
    //     displayArray.splice(indexOfOperator - 1, 3); 
    //     displayArray.splice(indexOfOperator - 1, 0, multResult);
    //     addToScreen(displayArray);
    //     i--;
    //     continue;
    // }

    function orderOfOperations(displayArray) { 

        if(displayArray.length < 3){ 
            for(let element of displayArray){ 
                let numberCount = 0; 
                if(numCheck(element)){ 
                    numberCount++;
                    displayArray = []; 
                    displayArray.push(element);
                    addToScreen(displayArray); 
                    return; 
                } 
            }
            if(displayArray.length > 0){ 
                clearScreen();
                return; 
            }
        }

        for(let i = 0; i < displayArray.length; i++){ 
            let element = displayArray[i];
            if(isOperator(element)){ 
             let indexOfOperator = displayArray.indexOf(element);
             if(!displayArray[indexOfOperator - 1]){ 
                continue; 
             }
             switch(element){ 
                 case "*": 
                    let multResult = operate(displayArray[indexOfOperator - 1], element, displayArray[indexOfOperator + 1]).toFixed(2); 
                    displayArray.splice(indexOfOperator - 1, 3); 
                    displayArray.splice(indexOfOperator - 1, 0, multResult);
                    addToScreen(displayArray);
                    i--;
                    continue;

                 case "÷": 
                    let divideResult = operate(displayArray[indexOfOperator - 1], element, displayArray[indexOfOperator + 1]).toFixed(2); 
                    displayArray.splice(indexOfOperator - 1, 3); 
                    displayArray.splice(indexOfOperator - 1, 0, divideResult);
                    addToScreen(displayArray);
                    i--;
                    continue;
             }
         }
        }

        for(let i = 0; i < displayArray.length; i++){ 
            let element = displayArray[i];
            if(isOperator(element)){ 

             let indexOfOperator = displayArray.indexOf(element);
             if(!displayArray[indexOfOperator - 1]){ 
                continue; 
             }
             
             switch(element){ 
                 case "+": 
                    let addResult = operate(displayArray[indexOfOperator - 1], element, displayArray[indexOfOperator + 1]); 
                    displayArray.splice(indexOfOperator - 1, 3); 
                    displayArray.splice(indexOfOperator - 1, 0, addResult);
                    addToScreen(displayArray);
                    i--;
                    continue;

                 case "-": 
                    let subtractResult = operate(displayArray[indexOfOperator - 1], element, displayArray[indexOfOperator + 1]); 
                    displayArray.splice(indexOfOperator - 1, 3); 
                    displayArray.splice(indexOfOperator - 1, 0, subtractResult);
                    addToScreen(displayArray);
                    i--;
                    continue;
             }
         }
        }

        addToScreen(displayArray);
        return; 
        // Plus and minus loop 
     //    for(element in displayArray){ 
     
     //    }
     
     }
     
    // Called from button event listener 
    function buttonPress() { 
        addToCalculations(buttonPressed, displayArray)
    }
    
    // Clears screen, replaces with updated array of operands 
    function addToScreen(displayArray) { 
        screen.textContent = "";
       
        for(operand of displayArray) { 
            screen.textContent += operand.toString();
        }
        console.log(displayArray);
    } 

    // Resets memory/screen
    function clearScreen() { 
        displayArray.length = 0;
        screen.textContent = "";
        return;
    }

    calculate.clearScreen = clearScreen; 

    // Checks for operator
    function isOperator(element) { 
        return(element == "+" || element == "-" || element == "*" || element == "÷");
    }
   
    function deleteElement() { 
        const lastElement = displayArray[displayArray.length - 1]; 
        console.log("delete detected");
        
        if(displayArray.length == 1) { 
            clearScreen();
        }

        if(numCheck(lastElement)) { 

            if(displayArray[displayArray.length - 1].split("").length > 2) { 

                let toDelete = displayArray[displayArray.length - 1];
                let splittedDelete = toDelete.split("");
                splittedDelete.splice(splittedDelete.length - 1, 1);
                displayArray[displayArray.length - 1] = splittedDelete.join("");

            } 

            else { 
                displayArray.splice(displayArray.length - 1, 1); 
            } 

        }
        else { 
            displayArray.splice(displayArray.length - 1, 1); 
         }
            addToScreen(displayArray);
            return;
    }
    //Split function to smaller pieces. Dont repeat yourself. 

    function addToCalculations(buttonPressed, displayArray) { 

        if(displayArray.length == 0) { 
            if(buttonPressed == "Delete"){ 
                return;
            }
            displayArray[0] = buttonPressed; 
            addToScreen(displayArray); 
            return; 
        }

        switch(buttonPressed) { 
            case "Clear": 
                clearScreen(); 
                return;

            case "=": 
                orderOfOperations(displayArray);
                return;

            case "Delete": 
                deleteElement();
                return;              
        }
     
        if(isOperator(buttonPressed)) { 
            let prevElement = displayArray[displayArray.length - 1];
            if(isOperator(prevElement)) { 
                displayArray[displayArray.length - 1] = buttonPressed;
            } else { 
                displayArray.push(buttonPressed);
            }
        }

        if(numCheck(buttonPressed)) { 
            let prevElement = displayArray[displayArray.length - 1];
            if(numCheck(prevElement)) { 
                displayArray[displayArray.length - 1] += buttonPressed
            } 
            else { 
            displayArray.push(buttonPressed);
            }
        }
        
        addToScreen(displayArray);
    }
}

calculate();