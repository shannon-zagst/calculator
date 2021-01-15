
// add event listeners
let displayNum = "";
let numArray = [];
let opArray = [];
let typeArr = [];
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
  if (/*newNum === ""*/isOp(prevC) || prevC === '(' || displayNum.length === 0) {
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
let prev = displayNum[displayNum.length-1];
    if (prev === '+' ||
        prev === '/' ||
      prev === '*' ||
    prev === '-') {

    if(prev === '-' && minusFlag === true){
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
if(prev === '(' || displayNum.length === 0){ // dont add
}else{
  displayNum += this.textContent;
  display.textContent = displayNum;
  deleteNext = "op";
  minusFlag = false;
}
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
  if(prev === '%' || prev === ')'){ // dont add
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

document.getElementById("parenthesesOne").addEventListener("click", function() {
    if(isNum(displayNum[displayNum.length-1]) === false && displayNum[displayNum.length-1] !== ')'){
    newNum += '(';
    displayNum += '(';
    display.textContent = displayNum;
  }
});

function needRightParen(display){
  let leftP = 0;
  let rightP = 0;
  for(let i = 0; i < display.length; i++){
    if(display[i] === '('){
      leftP++;
    }
    else if(display[i] === ')'){
      rightP++;
    }
  }
  console.log(leftP);
  console.log(rightP);
  if(leftP > rightP){
    return true;
  }
  else if(leftP <= rightP){
    return false;
  }

}

document.getElementById("parenthesesTwo").addEventListener("click", function() {
    if(needRightParen(displayNum) === true && isOp(displayNum[displayNum.length-1]) === false && displayNum[displayNum.length-1] !== '('){
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

document.getElementById("equals").addEventListener("click", function() {

while(needRightParen(displayNum)){
  displayNum += ')';
}



// use displayNum to add num and op to correct opArray
// if num, convert from string to nums

// finds first or last index of ps
// find innermost set of paran??

/*
//let pp = typeArr.findIndex(type => type === 'p1');
let ppp = typeArr.lastIndexOf('p1');
console.log(ppp);
let pp2 = typeArr.findIndex(type => type === 'p2');
//let ppp2 = typeArr.lastIndexOf('p2');
console.log(pp2);
*/
let parenCount = findNumP(displayNum);
for(let i = 0; i < parenCount; i++){
calculateParen();
}

console.log(displayNum);
console.log(numArray);
console.log(opArray);

console.log(typeArr);
//console.log(newNumExp);
console.log(numArray);
console.log(opArray);
//newNumExp = '';

let res = 0;
findTypeArray(displayNum);
let opLeft = typeArr.includes('o');
if(opLeft === false){
  res = Number(displayNum);
}
else{
  pushNumOpArraysFinal();
   res = returnNum();
}

  postNum(res);

  /*  for(let i = 0; i < displayNum.length; i++){
      let regNum = /[0-9]/;
      let result = regNum.test(displayNum[i]);
    }
;*/
});

// find number of paren expressions
function findNumP(display){
  let count = 0;
  for(let i = 0; i < display.length; i++){
    if(display[i] === '('){
      count++;
    }
  }
  return count;
}

// finds type array, then finds index of p, then calculates that expression
function calculateParen(){
    findTypeArray(displayNum);
  let pIndex = findPIndex(displayNum);
  console.log(pIndex);
  findPExpression(pIndex);
}

// uses type array and display to find p index of expression
function findPIndex(display){

  // give +1 to each left p and -1 to each right p, LEFT of (
  let pArray = [];
  for(let i = 0; i < display.length; i++){
    if(typeArr[i] === 'p1' || typeArr[i] === 'p2'){
      pArray.push(typeArr[i]);
    }
  }
  console.log(pArray);
  let countP = 0;
  let pCount = [];
  for(let i = 0; i < pArray.length; i++){
    if(pArray[i] === 'p1'){
      //calculate
      countP = 0;
      for(let j = 0; j < i; j++){
        if(pArray[j] === 'p1'){    countP++;    }
        else if(pArray[j] === 'p2'){     countP--;   }
      }
      pCount.push(countP);
    }
  }
  console.log(pCount);
  let maxP = 0;
  for(let i = 0; i < pCount.length; i++){
    if(pCount[i] > maxP){
      maxP = pCount[i];
    }
  }
  console.log(maxP);
  let pIndex = 0;

for(let i = 0; i < pCount.length; i++){
  if(pCount[i] === maxP){
    pIndex = i;
    break;
  }
}

  //let pIndex = pCount.findIndex(count => count === maxP);
  console.log(pIndex);
  let pNum = 0;
  let getPIndex = 0;
  console.log(pIndex);
  for(let i = 0; i < display.length; i++){
    console.log("getPIndex: ", getPIndex, "pNum: ", pNum);
    if(display[i] === '('){
      if(pIndex === pNum){
        getPIndex = i;
        console.log(getPIndex);
        pNum++;
      }
      else if(pNum < pIndex){
        pNum++;
      }
      else{     }
    }
  }
  console.log(getPIndex);
  return getPIndex;
}

// using index of p1, find expression in paren, push to num and op arrays, calc answer, refine displayNum
function findPExpression(indexP){
  let newNum = '';
  let newNumExp = '';
  opArray = [];
  numArray = [];

        let  j = indexP + 1;
          while(typeArr[j] !== 'p2'){
            newNumExp += displayNum[j];
            j++;
          }
          let newTypeArr = typeArr.splice(indexP, newNumExp.length + 2);
          newTypeArr = newTypeArr.splice(1, newNumExp.length);
          console.log(newTypeArr);

          for(let k = 0; k < newTypeArr.length; k++){
            if(newTypeArr[k] === 'n'){
              newNum += displayNum[k + indexP + 1];
            }
            if(newTypeArr[k] === 'o'){
              pushToNumArray(newNum);
              opArray.push(displayNum[k + indexP + 1]);
              newNum = '';
            }
            if(k === newTypeArr.length - 1){
              pushToNumArray(newNum);
              newNum = '';
            }
          }
         let r = returnNum();
          r = r.toString();
          let dd = displayNum.split('');
          dd.splice(indexP,newNumExp.length+2);
          displayNum = dd.join('');
        displayNum = displayNum.slice(0,indexP) + r + displayNum.slice(indexP);
    console.log(displayNum);




/*  for(let i = indexP; i < displayNum.length; i++){
    if(typeArr[i] === 'p1'){
      let  j = i + 1;
        while(typeArr[j] !== 'p2'){
          newNumExp += displayNum[j];
          j++;
        }
        let newTypeArr = typeArr.splice(i, newNumExp.length + 2);
        newTypeArr = newTypeArr.splice(1, newNumExp.length);
        console.log(newTypeArr);

        for(let k = 0; k < newTypeArr.length; k++){
          if(newTypeArr[k] === 'n'){
            newNum += displayNum[k + i + 1];
          }
          if(newTypeArr[k] === 'o'){
            pushToNumArray(newNum);
            opArray.push(displayNum[k + i + 1]);
            newNum = '';
          }
          if(k === newTypeArr.length - 1){
            pushToNumArray(newNum);
            newNum = '';
          }
        }
       let r = returnNum();
        r = r.toString();
        let dd = displayNum.split('');
        dd.splice(i,newNumExp.length+2);
        displayNum = dd.join('');
      displayNum = displayNum.slice(0,i) + r + displayNum.slice(i);
  console.log(displayNum);

    }
  }*/

}

// push string num into numArray as number
function pushToNumArray(num){
  if (!num.includes('.')) {
    numArray.push(parseInt(num));
  } else {
    num = parseFloat(num);
    num = Math.round(num * 1e4) / 1e4;
    numArray.push(num);
  }
}
// find if num, op, or paran for expression, push to typeArr
function findTypeArray(display){
typeArr = [];
  for(let i = 0; i < display.length; i++){
    if(isNum(display[i]) === true){
      // keep looping until op
      typeArr.push("n");
    }
    else if(isOp(display[i]) === true){
      if((display[i] === '-' && typeArr[typeArr.length-1] === 'o') ||
      (display[i] === '-' && i === 0) ||
    (display[i] === '-' && typeArr[typeArr.length-1] === 'p1')){
        typeArr.push("n");
      } else{
          typeArr.push("o");
      }
    }
    else if(display[i] === '(')
    {
      typeArr.push("p1");
    }
    else if(display[i] === ')'){
      typeArr.push("p2");
    }
  }

  console.log(typeArr);
}
// finds mode and return answer to expression
function returnNum(){
  let res;
    if (mode === "immediate") {
      res = calculateImmediate();
    } else if (mode === "formula") {
       res = calculateFormula();
    }
    return res;
}
// calculates answer using (MD)(AS), needs numArray and opArray, doesn't use displayNum
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
  } else if (newOpArr.length === 0 && newNumArr.length > 0) {
    result = newNumArr[0];
  } else if(numArray.length === 1){
    console.log("numarray", numArray[0])
    result = numArray[0];
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
  if (!Number.isInteger(result)) {
    result = Math.round(result * 1e4) / 1e4;
  }
  numArray = [];
  opArray = [];
  newNumArr = [];
  newOpArr = [];
return result;

}
// calculates answer using (MDAS), needs numArray and opArray, doesn't use displayNum
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

if(opArray.length === 0){
  addResult = numArray[0];
}

  addResult = Number(addResult);
  if (!Number.isInteger(addResult)) {
    addResult = Math.round(addResult * 1e4) / 1e4;
  }
  numArray = [];
  opArray = [];
  return addResult;
/*  if (!Number.isInteger(addResult)) {
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
  console.log(displayNum);*/
}
// first, find types for final displayNum, then push to num or op arrays
function pushNumOpArraysFinal(){
  numArray = [];
  opArray = [];
  //findTypeArray(displayNum);
  // calculate
newNum = '';
  for(let i = 0; i < typeArr.length; i++){
    // find n, add to num arr, if o add to opArray
    if(typeArr[i] === 'n'){
      newNum += displayNum[i];
      if(i === typeArr.length - 1){
        pushToNumArray(newNum);
        newNum = '';
      }
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

}
// post final answer to display
function postNum(num){
  if (!Number.isInteger(num)) {
    num = Math.round(num * 1e4) / 1e4;
  }
  newNum = num.toString();
  display2.textContent = displayNum + "=" + newNum;
  displayNum = newNum;
  display.textContent = displayNum;

}
