
// add event listeners
let displayNum = "";
let numArray = [];
let opArray = [];
let newNum = "";
let mode = "immediate";
let deleteNext = "";
let minusFlag = false;

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
let display2 = document.getElementById("display2");

let nums = document.getElementsByClassName("num");

for (let i = 0; i < nums.length; i++) {
  nums[i].addEventListener("click", putNum);
}

let ops = document.getElementsByClassName("op");
for (let i = 0; i < ops.length; i++) {
  ops[i].addEventListener("click", putOp);
}

function hasDecimal(display){
  let nextNum = "";
  let hasOp = false;
  for(let i = 0; i < display.length; i++){
    if(isOp(display[i]) === true){
      nextNum = display.slice(i+1);
      hasOp = true;
  }
    if(hasOp === false && i === display.length - 1){
    nextNum = display.slice(0);
    }
  }
  if(nextNum.includes('.')){
    return true;
  }
  else{
    return false;
  }
}

document.getElementById("decimal").addEventListener("click", function() {
//  if (hasDecimal(displayNum) === false){
if(hasDecimal(displayNum) === false){
    newNum += this.textContent;
    displayNum += this.textContent;
    display.textContent = displayNum;
    deleteNext = "num";
  }
});

document.getElementById("minus").addEventListener("click", function() {
  let prevC = displayNum[displayNum.length-1];
  if (/*newNum === ""*/isOp(prevC)) {
    newNum += '-';
    displayNum += '-';
    display.textContent = displayNum;
    deleteNext = "num";
    minusFlag = true;
  }
});


// make separate percent calculator
/*
document.getElementById("percent").addEventListener("click", function(){
  let prev = displayNum[displayNum.length-1];
  if(isOp(prev) === true || prev === '%' || displayNum.length === 0){ // don't add
  } else {
    newNum += '%';
  displayNum += '%';
  display.textContent = displayNum;
}
});
*/

function putOp() {
//  if (newNum.length > 0) {
    if (displayNum[displayNum.length - 1] === '+' ||
        displayNum[displayNum.length - 1] === '/' ||
      displayNum[displayNum.length - 1] === '*' ||
    displayNum[displayNum.length - 1] === '-') {

    if(displayNum[displayNum.length-1] === '-' && minusFlag === true){
      displayNum = displayNum.slice(0, -2);
      console.log(displayNum);
      display.textContent = displayNum;
    }else{
      displayNum = displayNum.slice(0, -1);
      console.log(displayNum);
      display.textContent = displayNum;
}
      newNum = "";
  }

  displayNum += this.textContent;
  display.textContent = displayNum;
  deleteNext = "op";
  minusFlag = false;
}

function putNum() {

/*  if (newNum.length === 1) {
    if (newNum[0] === '0' && this.textContent === '0') { // dont add
    } else {
      newNum += this.textContent;
      displayNum += this.textContent;
    }
  } else {
    newNum += this.textContent;
    displayNum += this.textContent;
  }*/
  let prev = displayNum[displayNum.length - 1];
// if prev is %
  if(prev === '%'){ // dont add
  } else{
      //if 0 and at beg of display or num, dont add. nvm could just be 0,check other nums
if(/*this.textContent === '0' && isOp(prev) === true*/prev === '0' && isOp(displayNum[displayNum.length-2]) === true){
  displayNum = displayNum.slice(0,-1);
  displayNum += this.textContent;
}
  //else add
  else{
  displayNum += this.textContent;
}

  display.textContent = displayNum;
  deleteNext = "num";
  minusFlag = false;
}
}

document.getElementById("clear").addEventListener("click", function() {
  displayNum = "";
  newNum = "";
  numArray = [];
  opArray = [];
  display.textContent = displayNum;
});

document.getElementById("erase").addEventListener("click", function(){
  // get prev char of display num
let eraseChar = displayNum[displayNum.length-1];
  // if op, pop most recent in op opArray
/*if(deleteNext === "op"){
//  opArray.pop();
  displayNum = displayNum.slice(0, displayNum.length-1);
  display.textContent = displayNum;
}
  //if num, pop last digit of num in numArray
  else if(deleteNext === "num"){
    let lastNum = numArray[numArray.length-1];
    lastNum = lastNum.toString();
    lastNum = lastNum.slice(lastNum.length-1);
    lastNum = Number(lastNum);
  }*/
  displayNum = displayNum.slice(0, displayNum.length-1);
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


let digits = ['0','1','2','3','4','5','6','7','8','9','.'];
function isNum(n){
  for(let i = 0; i < digits.length; i++){
    if(n === digits[i]){
      return true;
    }
  }
  return false;
}

function isOp(prevC){
  if(prevC === '+' || prevC === '*' || prevC === '/'){
    return true;
  }
  else if(prevC === '-' && minusFlag === false){
    return true;
  }
  else{
    return false;
  }
}

function pushToNumArray(num){
  if (!num.includes('.')) {
    numArray.push(parseInt(num));
  } else {
    num = parseFloat(num);
    num = Math.round(num * 1e4) / 1e4;
    numArray.push(num);
  }
}

document.getElementById("equals").addEventListener("click", function() {

display2.textContent = displayNum;
// use displayNum to add num and op to correct opArray
// if num, convert from string to nums
let typeArr = [];
for(let i = 0; i < displayNum.length; i++){
  if(isNum(displayNum[i]) === true){
    // keep looping until op
    typeArr.push("n");
  }
  if(isOp(displayNum[i]) === true){
    if(displayNum[i] === '-' && typeArr[typeArr.length-1] === 'o'){
      typeArr.push("n");
    } else{
        typeArr.push("o");
    }
  }
}
console.log(typeArr);
newNum = '';
for(let i = 0; i < typeArr.length; i++){
  // find n, add to num arr, if o add to opArray
  if(typeArr[i] === 'n'){
    newNum += displayNum[i];
  }
  if(typeArr[i] === 'o'){
    pushToNumArray(newNum);
    opArray.push(displayNum[i]);
    newNum = '';
  }
  if(i === typeArr.length - 1){
    pushToNumArray(newNum);
    newNum = '';
  }
}
console.log(numArray);
console.log(opArray);


  if (mode === "immediate") {
    calculateImmediate();
  } else if (mode === "formula") {
    calculateFormula();
  }


  /*
    for(let i = 0; i < displayNum.length; i++){

      let regNum = /[0-9]/;
      let result = regNum.test(displayNum[i]);

    }
;*/
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
