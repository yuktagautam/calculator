class Calculator{
	constructor(previousOperandTextElement,currentOperandTextElement){
		this.previousOperandTextElement=previousOperandTextElement
		this.currentOperandTextElement=currentOperandTextElement
		this.readyToReset = false;
		this.checker=false;
		this.clear();
	}
	clear(){
		this.currentOperand=``;
		this.previousOperand=``;
		this.operation=undefined;
	}
	delete(){
		this.currentOperand=this.currentOperand.toString().slice(0,-1);

	}
	appendNumber(number){
		if(this.currentOperand.includes('.') && number==='.') return

		this.currentOperand=this.currentOperand.toString() + number.toString();

	}
	chooseOperation(operation){
		this.checker=true;
		if(this.currentOperand===`` && this.operation!=``&& this.previousOperand!=`` )
		{
			this.operation=operation;
		}
		if(this.currentOperand===``) return
		if(this.previousOperand!=``){

			this.compute();
			this.checker=false;

		}
		this.operation=operation;
		this.previousOperand=this.currentOperand.toString();
		
		// var last_previous_operation=this.previousOperand.slice(-1);
		// console.log("last_previous_operation");
		// let l1=this.previousOperand.length;
		// if((operation===("+" || "-"||"/"||"%"||"x")) && (last_previous_operation===("+" || "-"||"/"||"%"||"x")))
		// {
		// 	console.log("inside if");
		// 	console.log(this.previousOperand.slice(0,(l1-1)));
		// 	this.previousOperand=this.previousOperand.slice(0,(l1-1));
		// }

		this.currentOperand=``;
		// if(this.previousOperand.slice(-1)===operation){
		// 	console.log("previous operation equal");
		// }
		if(this.checker==true){
			console.log(this.operation);
		}
		

	}
	compute(){
		let computation
		const curr=parseFloat(this.currentOperand);
		const prev=parseFloat(this.previousOperand);
		if(isNaN(prev) || isNaN(curr)) return

		switch (this.operation){

			case '+':
			  computation=prev+curr;console.log(computation);
			  break;
			case '-':
			  computation=prev-curr;
			  break;
			case '/':
			  computation=prev/curr;
			  break;
			case 'x':
			  computation=prev * curr;
			  break;

			 case '%':

			  break;

			default:
			  return
			}
			this.currentOperand=computation;
			this.operation=undefined;
			this.previousOperand=``;
			this.readyToReset=true;


		}


	updateDisplay(){
		this.currentOperandTextElement.innerText=this.currentOperand;
		this.previousOperandTextElement.innerText=this.previousOperand;

		if(this.operation!=null){
			this.previousOperandTextElement.innerText=`${this.previousOperand} ${this.operation}`;
		}

}
}

const numberButtons=document.querySelectorAll(".data-number");
const operationButton1=document.querySelectorAll(".data-operation");
const equalsButton=document.querySelector(".data-equals");

const deleteButton=document.querySelector(".data-delete");

const allClearButton=document.querySelector(".data-all-clear");
const previousOperandTextElement=document.querySelector(".data-previous-operand");
const currentOperandTextElement=document.querySelector(".data-current-operand");


const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button=>{
	button.addEventListener("click",()=>{
		if(calculator.readyToReset && calculator.previousOperand==="" && calculator.currentOperand!=""){
			calculator.currentOperand="";
			calculator.readyToReset=false;
		}
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();

	})
})
operationButton1.forEach(button=>{
	button.addEventListener("click",()=>{
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();

	})
})
equalsButton.addEventListener("click",()=>{
	calculator.compute();
	calculator.updateDisplay();
})

allClearButton.addEventListener("click",()=>{
	calculator.clear();
	calculator.updateDisplay();
})

deleteButton.addEventListener("click",()=>{
	calculator.delete();
	calculator.updateDisplay();
})
