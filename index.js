
// have one subtract button and one minus button, change int to float for dec

// add event listeners
let displayNum = "";
let numArray = [];
let opArray = [];
let newNum = "";

let display = document.getElementById("display");

/*let num0 = document.getElementById("zero");
num0text = num0.textContent;
console.log(num0);
console.log(num0text);
num0.addEventListener("click", putNum);*/

//document.getElementById("one").addEventListener("click", putNum);
let nums = document.getElementsByClassName("num");

for(let i = 0; i < nums.length; i++){
nums[i].addEventListener("click", putNum);
}

let ops = document.getElementsByClassName("op");
for(let i = 0; i < ops.length; i++){
  ops[i].addEventListener("click", putOp);
}

document.getElementById("decimal").addEventListener("click", function(){
  if(!newNum.includes('.')){
  newNum += this.textContent;
  displayNum += this.textContent;
  display.textContent = displayNum;
  }
});


function putOp(){

  if(displayNum[displayNum.length -1] === '+'
     || displayNum[displayNum.length -1] === '-'
     || displayNum[displayNum.length -1] === '/'
     || displayNum[displayNum.length -1] === '*' ){
      // if(this.textContent === '-'){ newNum = '-';}

    opArray.pop();
   displayNum = displayNum.slice(0, -1);
    console.log(displayNum);
    display.textContent = displayNum;
    //opArray.push(this.textContent);

  }
  else{
   // newNum = newNum.toPrecision(2);
    if(!newNum.includes('.')){ numArray.push(parseInt(newNum));}
    else{
     // newNum = newNum.toFixed(4);
      newNum = parseFloat(newNum);
      newNum = Math.round( newNum * 1e4) / 1e4;
      numArray.push(newNum); }

       newNum = "";
  }
  // if(this.textContent === '-'){ newNum = '-';}
  opArray.push(this.textContent);


   displayNum += this.textContent;
  display.textContent = displayNum;
}

function putNum(){

  if(newNum.length === 1){
       if(newNum[0] === '0' && this.textContent === '0'){// dont add
    }
      else{
        newNum += this.textContent;
        displayNum += this.textContent;
       }
      }
 else{
  newNum += this.textContent;
  displayNum += this.textContent;
   }
  display.textContent = displayNum;
}

document.getElementById("clear").addEventListener("click", function(){
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

document.getElementById("equals").addEventListener("click", function(){
  if(!newNum.includes('.')){numArray.push(parseInt(newNum));}
  else{
  newNum = parseFloat(newNum);
      newNum = Math.round( newNum * 1e4) / 1e4;
      numArray.push(newNum);
  }
  newNum = "";
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
  // left to right (immediate execution logic)
  let addResult = 0;
  for(let i = 0; i < opArray.length; i++){
  if(i === 0){
    if(opArray[0] === '+'){ addResult = numArray[0] + numArray[1]; }
    else if(opArray[0] === '-'){ addResult = numArray[0] - numArray[1]; }
    else if(opArray[0] === '/'){ addResult = numArray[0] / numArray[1]; }
    else if(opArray[0] === '*'){ addResult = numArray[0] * numArray[1]; }
  }
    else if(opArray[i] === '+'){
      addResult += numArray[i+1];
    }
    else if(opArray[i] === '-'){
      addResult -= numArray[i+1];
    }
    else if(opArray[i] === '/'){
      addResult /= numArray[i+1];
    }
    else if(opArray[i] === '*'){
      addResult *= numArray[i+1];
    }
  }
    //console.log(tempNum);
   // console.log(tempNum2);

 addResult = Number(addResult);
   if(!Number.isInteger(addResult)){ addResult = Math.round(addResult * 1e4)/1e4; }
  console.log(numArray);
  console.log(opArray);
  console.log(addResult);
  console.log(displayNum);

  display.textContent = addResult;

  tempNum = "";
  tempNum2 = "";
});
