(function(){
	'use strict';

angular.module("Hangman")
	.service("MoveWordsToArray",MoveWordsToArray);

function MoveWordsToArray(){
	var vm=this;
	vm.originalMovieName=null;
	vm.moveWords = moveWords;
	vm.movieNameArray=new Array();
	vm.checkCharClicked=checkCharClicked;

	function moveWords(movieName){
		vm.originalMovieName=movieName;
		for(var i=0;i<movieName.length;i++){
			if(movieName[i]==" ")
			{
				var tmpChar={
					"character":movieName[i],
					"show":true
				}			
			}
			else{
				var tmpChar={
					"character":movieName[i],
					"show":false
				}
			}
			vm.movieNameArray.push(tmpChar);
		}
		return vm.movieNameArray;
	};

	function checkCharClicked(character, alphabetArray){
		var flag=false;
		var gameCompleted=true;
		for(var j=0;j<vm.movieNameArray.length;j++){
			if(vm.movieNameArray[j].character.toUpperCase()==character.toUpperCase())
			{
				flag=true;
				vm.movieNameArray[j].show=true;				
			}			
		}
		
		for(var k=0;k<vm.movieNameArray.length;k++){
			//console.log(vm.movieNameArray[k].character+" -*- "+vm.movieNameArray[k].show)
			if(vm.movieNameArray[k].show==false)
			{
				gameCompleted=false;
				break;
			}
		}
		
		for(var l=0;l<alphabetArray.length;l++){
			if(alphabetArray[l].charVal==character){
				alphabetArray[l].disabledChar=true;
				break;
			}
		}
		
		var tmpArray={
			"movieArray":vm.movieNameArray,
			"found":flag,
			"gameCompleted":gameCompleted,
			"alphabetArray":alphabetArray
		};
		return tmpArray;
	};
};
})();