// have one subtract button and one minus button, change int to float for dec

// add event listeners
let displayNum = "";
let numArray = [];
let opArray = [];
let newNum = "";
let mode = "immediate";

let putMode = document.getElementById("mode");
document.getElementById("immediate").addEventListener("click", function() {
  putMode.textContent = "Current Mode: Immediate";
  mode = "immediate";
});
document.getElementById("formula").addEventListener("click", function() {
  putMode.textContent = "Current Mode: Formula";
  mode = "formula";
});

let display = document.getElementById("display");

let nums = document.getElementsByClassName("num");

for (let i = 0; i < nums.length; i++) {
  nums[i].addEventListener("click", putNum);
}

let ops = document.getElementsByClassName("op");
for (let i = 0; i < ops.length; i++) {
  ops[i].addEventListener("click", putOp);
}

document.getElementById("decimal").addEventListener("click", function() {
  if (!newNum.includes('.')) {
    newNum += this.textContent;
    displayNum += this.textContent;
    display.textContent = displayNum;
  }
});

document.getElementById("minus").addEventListener("click", function() {
  if (newNum === "") {
    newNum += '-';
    displayNum += '-';
    display.textContent = displayNum;
  }
});


function putOp() {
  if (newNum.length > 0) {
    if (displayNum[displayNum.length - 1] === '+' ||
      displayNum[displayNum.length - 1] === '-' ||
      displayNum[displayNum.length - 1] === '/' ||
      displayNum[displayNum.length - 1] === '*') {

      opArray.pop();
      displayNum = displayNum.slice(0, -1);
      console.log(displayNum);
      display.textContent = displayNum;

    } else {
      // newNum = newNum.toPrecision(2);
      if (!newNum.includes('.')) {
        numArray.push(parseInt(newNum));
      } else {
        // newNum = newNum.toFixed(4);
        newNum = parseFloat(newNum);
        newNum = Math.round(newNum * 1e4) / 1e4;
        numArray.push(newNum);
      }
      newNum = "";
    }
    opArray.push(this.textContent);
    displayNum += this.textContent;
    display.textContent = displayNum;
  }
}

function putNum() {

  if (newNum.length === 1) {
    if (newNum[0] === '0' && this.textContent === '0') { // dont add
    } else {
      newNum += this.textContent;
      displayNum += this.textContent;
    }
  } else {
    newNum += this.textContent;
    displayNum += this.textContent;
  }
  display.textContent = displayNum;
}

document.getElementById("clear").addEventListener("click", function() {
  displayNum = "";
  newNum = "";
  numArray = [];
  opArray = [];
  display.textContent = displayNum;
});

let tempNum = "";
let tempNum2 = "";
/*document.getElementById("add").addEventListener("click", function(){
  tempNum = parseInt(displayNum);
});*/

document.getElementById("paranthesesOne").addEventListener("click", function() {
  if (mode === "immediate") {
    /* don't add */ } else if (mode === "formula") {
    newNum += '(';
    displayNum += '(';
    display.textContent = displayNum;
  }
});

document.getElementById("paranthesesTwo").addEventListener("click", function() {
  if (mode === "immediate") {} else if (mode === "formula") {
    newNum += ')';
    displayNum += ')';
    display.textContent = displayNum;
  }
});

document.getElementById("equals").addEventListener("click", function() {
  if (!newNum.includes('.')) {
    numArray.push(parseInt(newNum));
  } else {
    newNum = parseFloat(newNum);
    newNum = Math.round(newNum * 1e4) / 1e4;
    numArray.push(newNum);
  }
  newNum = "";

  if (mode === "immediate") {
    calculateImmediate();
  } else if (mode === "formula") {
    calculateFormula();
  }

  /*
    for(let i = 0; i < displayNum.length; i++){
     // console.log(displayNum);
      let regNum = /[0-9]/;
      let result = regNum.test(displayNum[i]);

      //console.log(result)
      if(result){
        //console.log("num" + displayNum[i]);
        //let createNum = parseInt(displayNum[i]);
        tempNum += displayNum[i];
        if(i === displayNum.length-1){
          tempNum = parseInt(tempNum);
        }
      }
      else{
       // console.log("op" + displayNum[i]);
        if(tempNum2.length === 0){
          tempNum2 = tempNum;
         // tempNum2 = tempNum2.join();
         // console.log(tempNum2)
          tempNum2 = parseInt(tempNum2);
          tempNum = "";
        }
        else{
          // tempNum2 op tempNum
         // let final = tempNum2 displayNum[i] tempNum;
          //tempNum2 = tempNum;
          //tempNum = "";
          tempNum = parseInt(tempNum);
        }

      }

    }

    tempNum = "";
    tempNum2 = "";*/
});

function calculateFormula() {
  let newOpArr = [];
  let newNumArr = [];
  let tempSum = 0;
  let lastOp = '';
  if (opArray[0] === '+' || opArray[0] === '-') {
    lastOp = 'AS';
  }
  if (opArray[0] === '*' || opArray[0] === '/') {
    lastOp = 'MD';
  }
  // * & / first, then + & -
  // loop through opArray
  for (let i = 0; i < opArray.length; i++) {
    //if + OR - push op and num of same index
    if (opArray[i] === '+' || opArray[i] === '-') {
      newOpArr.push(opArray[i]);
      if (lastOp === 'AS') {
        newNumArr.push(numArray[i]);
      }
      if (i === opArray.length - 1) {
        newNumArr.push(numArray[i + 1]);
      }
      lastOp = 'AS';
    }
    //if x OR / don't push op, get num at same index and +1, do op, then add num
    if (opArray[i] === '*' || opArray[i] === '/') {
      if (i === 0) {
        if (opArray[i] === '*') {
          tempSum = numArray[0] * numArray[1];
        }
        if (opArray[i] === '/') {
          tempSum = numArray[0] / numArray[1];
        }
        newNumArr[0] = tempSum;
      } else if (i > 0) {
        if (lastOp === 'AS') {
          if (opArray[i] === '*') {
            tempSum = numArray[i] * numArray[i + 1];
          }
          if (opArray[i] === '/') {
            tempSum = numArray[i] / numArray[i + 1];
          }
          newNumArr.push(tempSum);
        }
        if (lastOp === 'MD') {
          if (opArray[i] === '*') {
            tempSum = newNumArr[newNumArr.length - 1] * numArray[i + 1];
          }
          if (opArray[i] === '/') {
            tempSum = newNumArr[newNumArr.length - 1] / numArray[i + 1];
          }
          newNumArr[newNumArr.length - 1] = tempSum;
        }
      }

      lastOp = 'MD';

    }

  }
  console.log(newOpArr);
  console.log(newNumArr);
  let result;
  if (newOpArr.length > 0) {
    result = 0;
  } else if (newOpArr.length === 0) {
    result = newNumArr[0];
  }

  for (let i = 0; i < newOpArr.length; i++) {
    if (i === 0) {
      if (newOpArr[0] === '+') {
        result = newNumArr[0] + newNumArr[1];
      } else if (newOpArr[0] === '-') {
        result = newNumArr[0] - newNumArr[1];
      }
    } else if (newOpArr[i] === '+') {
      result += newNumArr[i + 1];
    } else if (newOpArr[i] === '-') {
      result -= newNumArr[i + 1];
    }
  }

  result = Number(result);
  console.log(result);
  if (!Number.isInteger(result)) {
    result = Math.round(result * 1e4) / 1e4;
  }
  newNum = result.toString();
  displayNum = result.toString();
  numArray = [];
  opArray = [];
  newNumArr = [];
  newOpArr = [];
  display.textContent = displayNum;
}

function calculateImmediate() {

  // left to right (immediate execution logic)
  let addResult = 0;
  for (let i = 0; i < opArray.length; i++) {
    if (i === 0) {
      if (opArray[0] === '+') {
        addResult = numArray[0] + numArray[1];
      } else if (opArray[0] === '-') {
        addResult = numArray[0] - numArray[1];
      } else if (opArray[0] === '/') {
        addResult = numArray[0] / numArray[1];
      } else if (opArray[0] === '*') {
        addResult = numArray[0] * numArray[1];
      }
    } else if (opArray[i] === '+') {
      addResult += numArray[i + 1];
    } else if (opArray[i] === '-') {
      addResult -= numArray[i + 1];
    } else if (opArray[i] === '/') {
      addResult /= numArray[i + 1];
    } else if (opArray[i] === '*') {
      addResult *= numArray[i + 1];
    }
  }
  //console.log(tempNum);
  // console.log(tempNum2);


  addResult = Number(addResult);
  if (!Number.isInteger(addResult)) {
    addResult = Math.round(addResult * 1e4) / 1e4;
  }
  console.log(numArray);
  console.log(opArray);
  console.log(addResult);
  console.log(displayNum);
  //let addR = ;
  newNum = addResult.toString();
  displayNum = addResult.toString();
  numArray = [];
  opArray = [];

  display.textContent = addResult;
  console.log(numArray);
  console.log(opArray);
  console.log(addResult);
  console.log(displayNum);
}
