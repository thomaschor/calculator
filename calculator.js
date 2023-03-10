function add(num1, num2) { 
    return (+num1) + (+num2);
}

function subtract(num1, num2) { 
    return num1 - num2;
}

function multiply(num1, num2) { 
    return num1 * num2; 
}

function divide(num1, num2) { 
    
    return num1 / num2; 
}

function operate(num1, operator, num2) { 
    switch (operator) { 
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

function numCheck(element) {  
    if (element === ".") { 
        return true; 
    }
    return +element === +element;
}

function calculate() { 
  
    let displayArray = []; 
    const screen = document.getElementsByClassName("screenDigits")[0];   
    const allButtons = Array.from(document.querySelectorAll("button")); 
    let buttonPressed; 
    let kbListener = document.addEventListener("keydown", function(e) { 
        buttonPressed = e.key.toString();
        switch(e.key){ 
            case "*":
                buttonPress();
                return;
            case "+": 
                buttonPress();
                return;
            case "Backspace": 
                buttonPressed = "Del";
                buttonPress();
                return;
        
            case "/": 
                alert(buttonPressed);
                buttonPressed = "÷";
                buttonPress();
                return;
            case "-": 
                buttonPress();
                return;   

            case "=": 
                buttonPress();
                return;   

            case "Enter": 
                buttonPressed = "=";
                buttonPress();
                return;  
            case "0":
                buttonPress();
                return;
            case "1":
                buttonPress();
                return;
            case "2":
                buttonPress();
                return;
            case "3":
                buttonPress();
                return;
            case "4":
                buttonPress();
                return;
            case "5":
                buttonPress();``
                return;
            case "6":
                buttonPress();
                return;
            case "7":
                buttonPress();
                return;
            case "8":
                buttonPress();
                return;
            case "9":
                buttonPress();
                return;

        }
    })
    for (let i = 0; i <= allButtons.length - 1; i++) { 
        allButtons[i].addEventListener("click", (e) => { 
        buttonPressed = e.target.textContent; 
        console.log(buttonPressed);
        buttonPress(); 
        }); 
    }

    function orderOfOperations(displayArray) { 

        for (let i = 0; i < displayArray.length; i++) { 

            let element = displayArray[i];
            let indexOfElement = displayArray.indexOf(element);
            let nextElementIndex = indexOfElement+1; 
            let prevElementIndex = indexOfElement-1;
            
             if (isOperator(element)) { 

                if (!displayArray[i+1]) { 
                    displayArray.pop();
                    continue;
                }

                if (!numCheck(displayArray[i-1])){ 
                    displayArray.shift();
                    continue;
                }
                if (!displayArray[prevElementIndex]) { 

                   if(element == "-") { 

                       if(numCheck(displayArray[nextElementIndex])) { 
                            displayArray[indexOfElement] = displayArray[nextElementIndex] * -1; 
                            displayArray.splice(nextElementIndex, 1);
                        }
                         
                        else { 
                        displayArray.shift();
                        }

                    }

                }
            
             switch(element) { 
                 case "*": 
                    let multResult = operate(displayArray[prevElementIndex], element, displayArray[nextElementIndex]); 
                    displayArray.splice(prevElementIndex, 3); 
                    if(!Number.isInteger(multResult)){ 
                        multResult = multResult.toFixed(2);
                    }
                    displayArray.splice(prevElementIndex, 0, multResult);
                    addToScreen(displayArray);
                    i--;
                    continue;

                 case "÷": 
                    if(displayArray[nextElementIndex] == 0) {
                        displayArray = ["Can't divide by 0 dumbass"];
                        clearScreen();
                        continue; 
                    }

                let divideResult = operate(displayArray[prevElementIndex], element, displayArray[nextElementIndex]); 
                if(!Number.isInteger(divideResult)){ 
                    divideResult = divideResult.toFixed(2);
                }
                displayArray.splice(prevElementIndex, 3); 
                displayArray.splice(prevElementIndex, 0, divideResult);
                addToScreen(displayArray);
                i--;
                continue;
             }
         }
        }

        for(let i = 0; i < displayArray.length; i++) { 
            let element = displayArray[i];
            let indexOfElement = displayArray.indexOf(element);
            let prevElementIndex = indexOfElement - 1; 
            let nextElementIndex = indexOfElement + 1; 

            if(isOperator(element)) { 
       
             if(!displayArray[prevElementIndex]) { 
                if(element == "-") { 
                    if(numCheck(nextElementIndex)) { 
                    displayArray[indexOfElement] = displayArray[nextElementIndex] * -1;
                    displayArray.splice(nextElementIndex, 1);

                    } else { 
                    displayArray.shift();
                    }
                }
             }

                switch(element) { 
                    case "+": 
                        let addResult = operate(displayArray[prevElementIndex], element, displayArray[nextElementIndex]); 
                        displayArray.splice(prevElementIndex, 3); 
                        displayArray.splice(prevElementIndex, 0, addResult);
                        addToScreen(displayArray);
                        i--;
                        continue;

                    case "-": 
                        let subtractResult = operate(displayArray[prevElementIndex], element, displayArray[nextElementIndex]); 
                        displayArray.splice(prevElementIndex, 3); 
                        displayArray.splice(prevElementIndex, 0, subtractResult);
                        addToScreen(displayArray);
                        i--;
                        continue;
                 }
         }
        }

        addToScreen(displayArray);
        return; 
     }
     
    // Called from button event listener 
    function buttonPress() { 
        addToCalculations(buttonPressed, displayArray);

    }
    
    // Clears screen, replaces with updated array of operands 
    function addToScreen(displayArray) { 
        screen.textContent = "";
       
        for(operand of displayArray) { 
            screen.textContent += operand.toString() + " ";
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
        
        if(numCheck(lastElement)) { 

            if(lastElement.split("").length > 1) { 
                let toDelete = displayArray[displayArray.length - 1];
                let splittedDelete = toDelete.split("");
                splittedDelete.splice(splittedDelete.length - 1, 1);
                displayArray[displayArray.length - 1] = splittedDelete.join("");
                addToScreen(displayArray);
                return;
            } 

            if (displayArray.length == 1) { 
                clearScreen();
                return;
            }
            
            else { 
                displayArray.splice(displayArray.length - 1, 1); 
                addToScreen(displayArray);
                return;
            }

        }

        else { 
            displayArray.splice(displayArray.length - 1, 1); 
            addToScreen(displayArray);
            return;
        } 
           
    }

    function decimalCombiner() { 
        if (displayArray[displayArray.length - 1].split("").includes(".")){ 
            return;
        }
        
        if (displayArray.length == 0) { 
            displayArray[0] = "."; 
            return;
        }

        let prevElement = displayArray[displayArray.length - 1];
        if (numCheck(prevElement)) { 
                displayArray[displayArray.length - 1] += "."; 
                addToScreen(displayArray);
                return;
        } 
        else { 
            displayArray.push(".");
            addToScreen(displayArray);
            return;
        }
    }
            
    //Split function to smaller pieces. Dont repeat yourself. 

    function addToCalculations(buttonPressed, displayArray) { 

        if(buttonPressed == "Spc") { 
            return;
        }

        if(displayArray.length == 0) { 
            if(buttonPressed == "Del" || buttonPressed == "CA") { 
                return;
            }
            displayArray[0] = buttonPressed; 
            addToScreen(displayArray); 
            return; 
        }

        switch(buttonPressed) { 
            case "CA": 
                clearScreen(); 
                return;

            case ".": 
                decimalCombiner(); 
                return; 
            case "=": 
                orderOfOperations(displayArray);
                return;

            case "Del": 
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