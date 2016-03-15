angular.module("Hangman")
	.controller("HangmanController",HangmanController);

HangmanController.$inject=["MoveWordsToArray","AlphabetsArray"];

function HangmanController(MoveWordsToArray, AlphabetsArray){
	var vm=this
	vm.firstScreen=true;
	vm.startGame= startGame;
	//vm.movienm="hum tum";
	vm.gameLost=false;
	vm.MoveWordsToArray=MoveWordsToArray.moveWords;
	vm.movieNameArray=null;
	vm.toGuessCharacters=AlphabetsArray.alphabetArray;
	vm.charClicked=charClicked;	
	vm.checkCharClicked=MoveWordsToArray.checkCharClicked;
	vm.reloadApp=reloadApp;
	vm.wrongAnsCnt=0;
	vm.wrongChar=new Array();

	//console.log(vm.toGuessCharacters)
	//vm.startGame();
	function reloadApp(){
		window.location.reload();
	};
	
	function startGame(){
		vm.firstScreen=!vm.firstScreen;
		vm.movieNameArray=vm.MoveWordsToArray(vm.movienm);
	};

	function charClicked(character){
		var returnVal=vm.checkCharClicked(character, vm.toGuessCharacters);
		//console.log(returnVal)
		vm.movieNameArray=returnVal.movieArray;
		vm.toGuessCharacters=returnVal.alphabetArray;		
		if(returnVal.gameCompleted==true){
			alert('Game Won');
		}
		else{
			if(vm.wrongAnsCnt==8)
			{
				if(returnVal.found!=true){
					vm.wrongAnsCnt++;
					vm.gameLost=true;
					alert('You Lost');
				}
			}
			else{
				if(returnVal.found==false){
					vm.wrongChar.push(character);
					vm.wrongAnsCnt++;
				}
			}
		}
	};
}
