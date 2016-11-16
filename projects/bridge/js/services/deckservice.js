angular.module("BridgeApp")
	.service("DeckService", DeckService);

DeckService.$inject = ["$q", "$timeout"];

function DeckService($q, $timeout){
	var vm=this;
	vm.deck = new Array();
	vm.cardType = ["spade", "heart", "diamond", "club"];
	vm.distributeCardPlayers = {
		"player1" : {status:true , cards: [], movingcnt:0},
		"player2" : {status:false, cards: [], movingcnt:0},
		"player3" : {status:false, cards: [], movingcnt:0},
		"player4" : {status:false, cards: [], movingcnt:0}
	};
	vm.assembleDeck = assembleDeck;
	vm.shuffleDeck = shuffleDeck;
	vm.shuffleNewCards = shuffleNewCards;
	vm.distributeCards = distributeCards;

	function assembleDeck(){
		var tmpDeck  = {};
		var cardColor = null;
		return $q(function(resolve, reject) {
			for(var i=0; i<vm.cardType.length; i++){
				for(var j=1; j<=13; j++)	//no of cards in all 0 - K (A=1,J=11,Q=12,K=13)
				{
					if(vm.cardType[i] == "heart" || vm.cardType[i] == "diamond"){
						cardColor = "red";
					}
					else{
						cardColor = "black";
					}

					if(j === 1){	//Ace - A
						tmpDeck  = {
							"id": i+""+j,
							"cardNo": "A",
							"cardType": vm.cardType[i],
							"cardColor": cardColor,
							"rotation" : 0,
							"left" : 0
						};
					}
					else if(j === 11){	//Joker - J
						tmpDeck  = {
							"id": i+""+j,
							"cardNo": "J",
							"cardType": vm.cardType[i],
							"cardColor": cardColor,
							"rotation" : 0,
							"left" : 0
						};
					}
					else if(j === 12){	//Queen - Q
						tmpDeck  = {
							"id": i+""+j,
							"cardNo": "Q",
							"cardType": vm.cardType[i],
							"cardColor": cardColor,
							"rotation" : 0,
							"left" : 0
						};
					}
					else if(j === 13){	//King - K
						tmpDeck  = {
							"id": i+""+j,
							"cardNo": "K",
							"cardType": vm.cardType[i],
							"cardColor": cardColor,
							"rotation" : 0,
							"left" : 0
						};
					}
					else	//remaining 2 - 10
					{
						tmpDeck  = {
							"id": i+""+j,
							"cardNo": j,
							"cardType": vm.cardType[i],
							"cardColor": cardColor,
							"rotation" : 0,
							"left" : 0
						};
					}
					vm.deck.push(tmpDeck);
				}
			}
			if(vm.deck.length == 52)
			{
				resolve(vm.deck);
			}
			else{
				reject("Deck length less than 52, Please check");
			}
		});//$q finish
	};

	function shuffleDeck(){
		var array = angular.copy(vm.deck);
		return $q(function(resolve, reject) {
				// Array Shuffle code form http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
			  var currentIndex = array.length, temporaryValue, randomIndex;
			  // While there remain elements to shuffle...
			  while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			  }

			if(array.length == 52){
				$timeout(function(){
					vm.deck = array;
					resolve(array);
				},300);
			}
			else{
				reject("Cannot Shuffle!!! Deck length less than 52, Please check");
			}
		});//$q finish
	};

	function shuffleNewCards(newcards){
		var array = angular.copy(newcards);
		return $q(function(resolve, reject) {
				// Array Shuffle code form http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
			  var currentIndex = array.length, temporaryValue, randomIndex;
			  // While there remain elements to shuffle...
			  while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			  }

			if(array.length){				
					vm.deck = array;
					resolve(array);
			}
			else{
				reject("Cannot Shuffle!!! Please check");
			}
		});//$q finish
	};

	function distributeCards(){
		var tmpData  = {
			"deckSet" : null,
			"playerCards": null
		};
		var card = null;
		return $q(function(resolve, reject) {
			if(vm.distributeCardPlayers.player1.status == true){
				card = vm.deck.splice(0,1);
				card[0].left = vm.distributeCardPlayers.player1.cards.length*40;
				vm.distributeCardPlayers.player1.cards.push(card[0]);
				vm.distributeCardPlayers.player1.movingcnt += 1;
				vm.distributeCardPlayers.player1.status = false;
				vm.distributeCardPlayers.player2.status = true;
			}
			else if(vm.distributeCardPlayers.player2.status == true){
				card = vm.deck.splice(0,1);
				card[0].left = vm.distributeCardPlayers.player2.cards.length*40;
				vm.distributeCardPlayers.player2.cards.push(card[0]);
				vm.distributeCardPlayers.player2.movingcnt += 1;
				vm.distributeCardPlayers.player2.status = false;
				vm.distributeCardPlayers.player3.status = true;
			}
			else if(vm.distributeCardPlayers.player3.status == true){
				card = vm.deck.splice(0,1);
				card[0].left = vm.distributeCardPlayers.player3.cards.length*40;
				vm.distributeCardPlayers.player3.cards.push(card[0]);
				vm.distributeCardPlayers.player3.movingcnt += 1;
				vm.distributeCardPlayers.player3.status = false;
				vm.distributeCardPlayers.player4.status = true;
			}
			else{
				card = vm.deck.splice(0,1);
				card[0].left = vm.distributeCardPlayers.player4.cards.length*40;
				vm.distributeCardPlayers.player4.cards.push(card[0]);
				vm.distributeCardPlayers.player4.movingcnt += 1;
				vm.distributeCardPlayers.player4.status = false;
				vm.distributeCardPlayers.player1.status = true;
			}
			card = null;
			tmpData.deckSet = vm.deck;
			tmpData.playerCards = vm.distributeCardPlayers;
			resolve(tmpData)
		});//$q finish
	}
}