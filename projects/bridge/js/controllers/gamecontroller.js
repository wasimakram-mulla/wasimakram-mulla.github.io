angular.module("BridgeApp")
	.controller("GameController", GameController);

GameController.$inject = ["DeckService", "$log", "$timeout"];

function GameController(DeckService, $log, $timeout){
	var vm = this;
	vm.deckPool = new Array();											// Prop: Pool area where Cards are played
	vm.masterDeckSet = null;											// Prop: Complete Deck master copy
	vm.deckSet = null;													// Prop: Complete Deck
	vm.card_distribution_time = 200;									// Prop: Time to distribute cards to players
	vm.AI_playing_time = 4000;											// Prop: AI Playing time.
	vm.showPlayerBtns = true;											// Prop: This will remove player buttons for other players so that player1 wont play
	vm.selectedCard = null;												// Prop: User/Player1 selected card
	vm.currentPlayer = 1;												// Prop: Current playing player
	vm.playerInfo = null;												// Prop: Current playing player Display only
	vm.cardsToPull = 1;													// Prop: Number of cards any player need to pull
	vm.currentDirection = "Anticlockwise";								// Prop: Change Direction of play
	vm.playerCards = null;												// Prop: Cards details of all the players
	vm.distributionCnt = 0;												// Prop: Traces cards distributed each player
	vm.shuffleBtnEnable = true;											// Prop: Enable/Disable shuffle button
	vm.skip_next_user_turn = false;										// Prop: Flag for skipping next user turn (only used when played "9")
	vm.already_tackled_JAQ29_cards = true;								// Prop: Handler for JAQ29 cards if its already tacked by previous player.
	vm.firstTurn = true;												// Prop: Check if it is the first turn of game
	vm.chosenNewCard = { status: false, cardType: null};				// Prop: This checks if J is played and next player understands the new card to play
	vm.startgameflag = false;
	vm.showLoader = false;
	vm.player_won = false;
	vm.loaderMsg = "Please wait...";
	/* Method Declaration */
	vm.init = init;
	vm.shuffleDeck = shuffleDeck;
	vm.distributeCards = distributeCards;
	vm.hoverCard = hoverCard;
	vm.hoverLeave = hoverLeave;
	vm.selectCardToPlay = selectCardToPlay;
	vm.playCardToPool = playCardToPool;
	vm.userPullNewCardFromDeck = userPullNewCardFromDeck;
	vm.initiateFirstCard = initiateFirstCard;
	vm.play_next_player = play_next_player;
	vm.tackle_JAQ29_cards_in_play = tackle_JAQ29_cards_in_play;
	vm.selectCardType_userPlay = selectCardType_userPlay;
	vm.selectCardType_AI_Play = selectCardType_AI_Play;
	vm.AI_logical_decision_to_play_next_card = AI_logical_decision_to_play_next_card;
	vm.AlreadyTackled_logic_with_multiple_decisions = AlreadyTackled_logic_with_multiple_decisions;
	vm.rearrange_cards_in_hands = rearrange_cards_in_hands;
	vm.startGame = startGame;

	/** Called on "Play card button" click.
		Tasks:
			1. Will play the card according to the scenarios present.
			2. Playing card is totally a users choice until and unless scenarios suffice, like card no. match or card type matches.
			2. Also checks if player one all cards are played and declares a won to Player.
	*/
	function playCardToPool(){
		console.log("%c------------------------------------------**************************************-------------------------------------------------","color:brown");
		console.log("%c Inside playCardToPool %c %c | Line: 57","color:green","color:black","color:red");
		if(vm.deckPool[vm.deckPool.length-1].cardNo != vm.selectedCard.cardNo && vm.deckPool[vm.deckPool.length-1].cardType != vm.selectedCard.cardType && vm.selectedCard.cardNo != "J" && vm.chosenNewCard.status == false){
			alert('Neither Card number nor Card type is matching.');
		}else
		{
			if(vm.chosenNewCard.status == true || vm.already_tackled_JAQ29_cards == false){
				if(vm.chosenNewCard.status == true){
					console.log("Chosen Card Status == true %c %c %c | Line: 64","color:blue","color:black","color:red");
					var player1_cards = vm.playerCards.player1.cards;
					var tmpPlayedCard = null;
					if(vm.chosenNewCard.cardType == vm.selectedCard.cardType || vm.selectedCard.cardNo == "J"){
						for(var i=0; i<player1_cards.length; i++){
							if(player1_cards[i].id == vm.selectedCard.id){
								tmpPlayedCard = player1_cards.splice(i,1);
								break;
							}
						}
						var randomized_rotation = Math.floor(Math.random() * 359) + 1;
						tmpPlayedCard[0].rotation = randomized_rotation;
						vm.chosenNewCard.status = false;
						vm.deckPool.push(tmpPlayedCard[0]);
						if(tmpPlayedCard[0].cardNo == "J"){
							vm.selectCardType_userPlay();
						}
						else if(tmpPlayedCard[0].cardNo == "A"){
							console.log("Played card is %c 'A' %c %c | Line: 82","color:blue","color:black","color:red");
							vm.cardsToPull = vm.cardsToPull + 3;
						}
						else if(tmpPlayedCard[0].cardNo == "2"){
							console.log("Played card is %c '2' %c %c | Line: 86","color:blue","color:black","color:red");
							vm.cardsToPull = vm.cardsToPull + 2;
						}
						else if(tmpPlayedCard[0].cardNo == "Q"){
							console.log("Played card is %c 'Q' %c direction changed %c | Line: 90","color:blue","color:black","color:red");
							vm.currentDirection == "Anticlockwise"? vm.currentDirection = "Clockwise" : vm.currentDirection = "Anticlockwise";
						}
						else if(tmpPlayedCard[0].cardNo == "9"){
							console.log("Played card is %c '9' %c %c | Line: 94","color:blue","color:black","color:red");
							vm.skip_next_user_turn = true;
							vm.already_tackled_JAQ29_cards = false;
						}
						tmpPlayedCard = null;
						randomized_rotation = null;
						vm.selectedCard = null;
						vm.rearrange_cards_in_hands();
						vm.play_next_player();	//COMMENT: Next player play Game.
					}
					else{
						alert('Card type is not matching, play another card.');
					}
				}
				else{
					console.log("Chosen Card Status == false %c %c %c | Line: 109","color:blue","color:black","color:red");
					if(vm.deckPool[vm.deckPool.length-1].cardNo == "9")
					{
						console.log("Pool top card is %c '9' %c %c | Line: 112","color:blue","color:black","color:red");
						var player1_cards = vm.playerCards.player1.cards;
						var tmpPlayedCard = null;
						var has9Flag = false;
						for(var i=0; i<player1_cards.length; i++){
							if(player1_cards[i].cardNo == "9"){
								has9Flag = true;
								break;
							}
						}
						if(has9Flag == false)
						{
							alert("You cannot play this turn, Your turn is passed.");
						}
						else{
							console.log("Found a card %c '9' %cmatching in your hand %c | Line: 127","color:blue","color:black","color:red");
							if(vm.selectedCard.cardNo == 9){
								console.log("Played the card number %c'9' %c %c | Line: 129","color:blue","color:black","color:red");
								var player1_cards = vm.playerCards.player1.cards;
								var tmpPlayedCard = null;
								for(var i=0; i<player1_cards.length; i++){
									if(player1_cards[i].id == vm.selectedCard.id){
										tmpPlayedCard = player1_cards.splice(i,1);
										break;
									}
								}
								var randomized_rotation = Math.floor(Math.random() * 359) + 1;
								tmpPlayedCard[0].rotation = randomized_rotation;
								vm.deckPool.push(tmpPlayedCard[0]);
								vm.skip_next_user_turn = true;
								vm.already_tackled_JAQ29_cards = false;
								tmpPlayedCard = null;
								randomized_rotation = null;
								vm.selectedCard = null;
								vm.rearrange_cards_in_hands();
								vm.play_next_player();	//COMMENT: Next player play Game.
							}
							else{
								alert("You can only play card '9' in this turn.");
							}
						}
					}
					else if(vm.deckPool[vm.deckPool.length-1].cardNo == "A")
					{
						console.log("Pool Top Card is %c 'A' %c %c | Line: 156","color:blue","color:black","color:red");
						var player1_cards = vm.playerCards.player1.cards;
						var tmpPlayedCard = null;
						var hasAFlag = false;
						for(var i=0; i<player1_cards.length; i++){
							if(player1_cards[i].cardNo == "A"){
								hasAFlag = true;
								break;
							}
						}
						if(hasAFlag == false)
						{
							alert("You should pull cards to pass this turn.");
						}
						else{
							console.log("Found card %c 'A' %c in Hand %c | Line: 171","color:blue","color:black", "color:red");
							if(vm.selectedCard.cardNo == "A"){
								console.log("Played card %c 'A' %c %c | Line: 173","color:blue","color:black", "color:red");
								var player1_cards = vm.playerCards.player1.cards;
								var tmpPlayedCard = null;
								for(var i=0; i<player1_cards.length; i++){
									if(player1_cards[i].id == vm.selectedCard.id){
										tmpPlayedCard = player1_cards.splice(i,1);
										break;
									}
								}
								var randomized_rotation = Math.floor(Math.random() * 359) + 1;
								tmpPlayedCard[0].rotation = randomized_rotation;
								vm.deckPool.push(tmpPlayedCard[0]);
								vm.cardsToPull = vm.cardsToPull + 3;
								vm.skip_next_user_turn = false;
								vm.already_tackled_JAQ29_cards = false;
								tmpPlayedCard = null;
								randomized_rotation = null;
								vm.selectedCard = null;
								vm.rearrange_cards_in_hands();
								vm.play_next_player();	//COMMENT: Next player play Game.
							}
							else{
								alert("You can play card 'A' / pull cards in this turn.");
							}
						}
					}
					else if(vm.deckPool[vm.deckPool.length-1].cardNo == "2")
					{
						console.log("Pool Top Card is %c '2' %c %c | Line: 201","color:blue","color:black","color:red");
						var player1_cards = vm.playerCards.player1.cards;
						var tmpPlayedCard = null;
						var has2Flag = false;
						for(var i=0; i<player1_cards.length; i++){
							if(player1_cards[i].cardNo == "2"){
								has2Flag = true;
								break;
							}
						}
						if(has2Flag == false)
						{
							alert("You should pull cards to pass this turn.");
						}
						else{
							console.log("Found Card %c '2' %c in hand %c | Line: 216","color:blue","color:black","color:red");
							if(vm.selectedCard.cardNo == "2"){
								var player1_cards = vm.playerCards.player1.cards;
								var tmpPlayedCard = null;
								for(var i=0; i<player1_cards.length; i++){
									if(player1_cards[i].id == vm.selectedCard.id){
										tmpPlayedCard = player1_cards.splice(i,1);
										break;
									}
								}
								var randomized_rotation = Math.floor(Math.random() * 359) + 1;
								tmpPlayedCard[0].rotation = randomized_rotation;
								vm.deckPool.push(tmpPlayedCard[0]);
								vm.cardsToPull = vm.cardsToPull + 2;
								vm.skip_next_user_turn = false;
								vm.already_tackled_JAQ29_cards = false;
								tmpPlayedCard = null;
								randomized_rotation = null;
								vm.selectedCard = null;
								vm.rearrange_cards_in_hands();
								vm.play_next_player();	//COMMENT: Next player play Game.
							}
							else{
								alert("You can play card '2' / pull cards in this turn.");
							}
						}
					}
					else{
						//COMMENT: Not a JAQ29 Card on top of pool but still somewhere already_tackled_JAQ29_cards remains false, so to handle written this method
						console.log("Not a JAQ29 Card on top of pool %c %c %c | Line: 245","color:blue","color:black","color:red");
						var player1_cards = vm.playerCards.player1.cards;
						var hasJcard = false;
						if(player1_cards.length == 2 || player1_cards.length == 1)
						{
							for(var i=0; i<player1_cards.length; i++){
								if(player1_cards[i].cardNo == "J")
								hasJcard = true;
								break;
							}
						}

						if(hasJcard == true && player1_cards.length == 1){
							alert("You cannot play J card in the End. Please pull a new card.");
							return;
						}
						if(vm.deckPool[vm.deckPool.length-1].cardNo == vm.selectedCard.cardNo || vm.deckPool[vm.deckPool.length-1].cardType == vm.selectedCard.cardType || vm.selectedCard.cardNo == "J"){
							console.log("NON JAQ29 on top of pool | Top card and selected card matches or a %c 'J' %c card %c | Line: 262","color:blue","color:black","color:red");
							for(var i=0; i<player1_cards.length; i++){
								if(player1_cards[i].cardNo == vm.selectedCard.cardNo && player1_cards[i].cardType == vm.selectedCard.cardType){
									tmpPlayedCard = player1_cards.splice(i,1);
									break;
								}
							}
							var randomized_rotation = Math.floor(Math.random() * 359) + 1;
							tmpPlayedCard[0].rotation = randomized_rotation;
							vm.deckPool.push(tmpPlayedCard[0]);
							randomized_rotation = null;
							vm.selectedCard = null;
							if(tmpPlayedCard[0].cardNo == "A"){
								console.log("Played card is %c 'A' %c %c | Line: 275","color:blue","color:black","color:red");
								vm.cardsToPull = vm.cardsToPull + 3;
							}
							else if(tmpPlayedCard[0].cardNo == "2"){
								console.log("Played card is %c '2' %c %c | Line: 279","color:blue","color:black","color:red");
								vm.cardsToPull = vm.cardsToPull + 2;
							}
							else if(tmpPlayedCard[0].cardNo == "J"){
								console.log("Played card is %c 'J' %c %c | Line: 283","color:blue","color:black","color:red");
								vm.selectCardType_userPlay();
							}
							else if(tmpPlayedCard[0].cardNo == "Q"){
								console.log("Played card is %c 'Q' %c direction changed %c | Line: 287","color:blue","color:black","color:red");
								vm.currentDirection == "Anticlockwise"? vm.currentDirection = "Clockwise" : vm.currentDirection = "Anticlockwise";
							}
							else if(tmpPlayedCard[0].cardNo == "9"){
								console.log("Played card is %c '9' %c %c | Line: 291","color:blue","color:black","color:red");
								vm.skip_next_user_turn = true;
								vm.already_tackled_JAQ29_cards = false;
							}
							tmpPlayedCard = null;
							vm.rearrange_cards_in_hands();
							vm.play_next_player();	//COMMENT: Next player play Game.
							if(vm.playerCards.player1.cards.length == 0){	//COMMENT: User Played Last Card and won the game
								console.log("%c %c %c P1 WON | Line: 299","color:blue","color:black","color:red");
								alert('Player 1 Won');
								vm.player_won = true;
							}
						}
						else{
							console.log("%c %c %c Something went wrong | Line: 305","color:blue","color:black","color:red");
							alert('Something went wrong. Gameplay error, please refresh game to start again.');
						}
					}
				}
			}
			else{
				var player1_cards = vm.playerCards.player1.cards;
				var hasJcard = false;
				if(player1_cards.length == 2 || player1_cards.length == 1)
				{
					for(var i=0; i<player1_cards.length; i++){
						if(player1_cards[i].cardNo == "J")
						hasJcard = true;
						break;
					}
				}

				if(hasJcard == true && player1_cards.length == 1){
					alert("You cannot play J card in the End. Please pull a new card.");
					return;
				}
				console.log("CHOSEN Card status != true || already_tackled_JAQ29_cards != false %c %c %c | Line: 327","color:blue","color:black","color:red");
				if(vm.selectedCard.cardNo == "J"){
					console.log("Selected card played %c 'J' %c %c | Line: 329","color:blue","color:black","color:red");
					vm.selectCardType_userPlay();
				}
				if(vm.selectedCard.cardNo == "A"){
					console.log("Selected card played %c 'A' %c %c | Line: 333","color:blue","color:black","color:red");
					vm.cardsToPull == 1 ? vm.cardsToPull=3: vm.cardsToPull = vm.cardsToPull+3;
					vm.already_tackled_JAQ29_cards = false;
				}
				if(vm.selectedCard.cardNo == "Q"){
					console.log("Selected card played %c 'Q' %c %c | Line: 338","color:blue","color:black","color:red");
					vm.currentDirection == "Anticlockwise"? vm.currentDirection = "Clockwise" : vm.currentDirection = "Anticlockwise";
					vm.already_tackled_JAQ29_cards = false;
				}
				if(vm.selectedCard.cardNo == "2"){
					console.log("Selected card played %c '2' %c %c | Line: 343","color:blue","color:black","color:red");
					vm.cardsToPull == 1 ? vm.cardsToPull=2: vm.cardsToPull = vm.cardsToPull+2;
					vm.already_tackled_JAQ29_cards = false;
				}
				if(vm.selectedCard.cardNo == "9"){
					console.log("Selected card played %c '9' %c %c | Line: 348","color:blue","color:black","color:red");
					vm.skip_next_user_turn = true;
					vm.already_tackled_JAQ29_cards = false;
				}
				//COMMENT: Playing a card
				var tmpPlayedCard = null;
				for(var i=0; i<player1_cards.length; i++){
					if(player1_cards[i].id == vm.selectedCard.id){
						tmpPlayedCard = player1_cards.splice(i,1);
						break;
					}
				}
				var randomized_rotation = Math.floor(Math.random() * 359) + 1;
				tmpPlayedCard[0].rotation = randomized_rotation;
				vm.deckPool.push(tmpPlayedCard[0]);
				tmpPlayedCard = null;
				randomized_rotation = null;
				vm.selectedCard = null;
				vm.rearrange_cards_in_hands();
				vm.play_next_player();		//COMMENT: Next player play Game.
			}
		}
		if(vm.playerCards.player1.cards.length == 0){	//COMMENT: User Played Last Card and won the game
			console.log("%c %c %c | P1 WON Line: 371","color:blue","color:black","color:red");
			alert('Player 1 Won');
			vm.player_won = true;
		}
	}

	/** Called on "Pull card button" click.
		Tasks:
			1. Will check if this is the first turn of the game and user is pull a card.
			2. If not first turn then it will check for any A/2 card is played and will pull cards from deck accordingly.
		Note: uses two variables-
						1. firstTurn - check for first turn only will be true at the beginning of the game.
						2. already_tackled_JAQ29_cards - will be called if not first turn and checks if A/2 cards are already handled by previous player by
						   pulling cards, it not handled then user will pull cards accordingly.
	*/
	function userPullNewCardFromDeck(){
		console.log("%c Inside userPullNewCardFromDeck %c %c | Line: 387","color:green","color:black","color:red");
		if(vm.firstTurn != true){
			if(vm.already_tackled_JAQ29_cards == false){	//COMMENT: previous player have thrown JAQ29 card
				console.log("Not Tackled JAQ29 card in play %c %c %c | Line: 390","color:blue","color:black","color:red");
				var deckTopCard = null;
				if(vm.deckPool[vm.deckPool.length-1].cardNo == "A"){
					console.log("Pool top card is %c 'A' %c %c | Line: 393","color:blue","color:black","color:red");
					vm.already_tackled_JAQ29_cards = true;
					if(vm.deckSet.length == 0 || vm.deckSet.length < vm.cardsToPull){
						console.log("%c Getting cards from pool and re-shuffling %c %c | Line: 396","color:blue","color:black","color:red");
						var poolCards = vm.deckPool.splice(0,vm.deckPool.length-1);
						DeckService.shuffleNewCards(poolCards)
						.then(function(response){
							poolCards = response;
							for(var i=0; i<poolCards.length; i++){
								vm.deckSet.push(poolCards[i]);
							}
							console.log("Cards to pull %c " +vm.cardsToPull+ " %c %c | Line: 404","color:blue","color:black","color:red");
							deckTopCard = vm.deckSet.splice(0, vm.cardsToPull);	//COMMENT: Used 0 instead of (vm.deckSet.length-1) coz, array will not return multi set from last
						})
						.catch(function(error){
							alert(error)
						});
					}
					else{
						console.log("Cards to pull %c " +vm.cardsToPull+ " %c %c | Line: 412","color:blue","color:black","color:red");
						deckTopCard = vm.deckSet.splice(0, vm.cardsToPull);	//COMMENT: Used 0 instead of (vm.deckSet.length-1) coz, array will not return multi set from last
					}
				}
				else if(vm.deckPool[vm.deckPool.length-1].cardNo == "2"){
					console.log("Pool Top Card is %c '2' %c %c | Line: 417","color:blue","color:black","color:red");
					vm.already_tackled_JAQ29_cards = true;
						if(vm.deckSet.length == 0 || vm.deckSet.length < vm.cardsToPull){
							console.log("%c Deck cards is <= 1, pulling from pool %c %c | Line: 420","color:blue","color:black","color:red");
							var poolCards = vm.deckPool.splice(0,vm.deckPool.length-1);
							DeckService.shuffleNewCards(poolCards)
							.then(function(response){
								poolCards = response;
								for(var i=0; i<poolCards.length; i++){
									vm.deckSet.push(poolCards[i]);
								}
								console.log("Cards to pull %c "+vm.cardsToPull+" %c %c | Line: 428","color:blue","color:black","color:red");
								deckTopCard = vm.deckSet.splice(0, vm.cardsToPull);
							})
							.catch(function(error){
								alert(error)
							});
						}
						else{
							console.log("Cards to pull %c "+vm.cardsToPull+" %c %c | Line: 436","color:blue","color:black","color:red");
							deckTopCard = vm.deckSet.splice(0, vm.cardsToPull);
						}
				}
				else{
					console.log("Pool top card is neither %c 'A' nor '2' %c %c | Line: 441","color:blue","color:black","color:red");
					vm.already_tackled_JAQ29_cards = true;
						if(vm.deckSet.length == 0 || vm.deckSet.length < vm.cardsToPull){
							console.log("Deck <= 1 getting cards from pool %c %c %c | Line: 444","color:blue","color:black","color:red");
							var poolCards = vm.deckPool.splice(0,vm.deckPool.length-1);
							DeckService.shuffleNewCards(poolCards)
							.then(function(response){
								poolCards = response;
								for(var i=0; i<poolCards.length; i++){
									vm.deckSet.push(poolCards[i]);
								}
								console.log("Cards to pull %c "+vm.cardsToPull+" %c %c | Line: 452","color:blue","color:black","color:red");
								deckTopCard = vm.deckSet.splice(0, vm.cardsToPull);
							})
							.catch(function(error){
								alert(error)
							});
						}
						else{
							console.log("Cards to pull %c "+vm.cardsToPull+" %c %c | Line: 460","color:blue","color:black","color:red");
							deckTopCard = vm.deckSet.splice(0, vm.cardsToPull);
						}
				}
				console.log("deckTopCards.length: %c "+deckTopCard.length+" %c %c | Line: 464","color:blue","color:black","color:red");
				for(var i=0;i<deckTopCard.length;i++){
					deckTopCard[i].left = vm.playerCards.player1.movingcnt * 40;
					vm.playerCards.player1.movingcnt += 1;
					vm.playerCards.player1.cards.push(deckTopCard[i]);
				}
				tmpdeckTopCard = null;
			}
			else{
				console.log("Pool top cards is JAQ29 but already tackled %c %c %c | Line: 473","color:blue","color:black","color:red");
				vm.firstTurn = false;
				vm.already_tackled_JAQ29_cards = true;
				if(vm.deckSet.length == 0){
					console.log("Deck length == %c 0 %c getting cards from pool and re-shuffle %c | Line: 477","color:blue","color:black","color:red");
					var poolCards = vm.deckPool.splice(0,vm.deckPool.length-1);
					DeckService.shuffleNewCards(poolCards)
					.then(function(response){
						poolCards = response;
						for(var i=0; i<poolCards.length; i++){
							vm.deckSet.push(poolCards[i]);
						}
						console.log("Pulling top deck card post re-shuffle %c %c %c | Line: 485","color:blue","color:black","color:red");
						var deckTopCard = vm.deckSet.splice(0, 1);
						deckTopCard[0].left = vm.playerCards.player1.movingcnt * 40;
						vm.playerCards.player1.movingcnt += 1;
						vm.playerCards.player1.cards.push(deckTopCard[0]);
					})
					.catch(function(error){
						alert(error)
					});
				}
				else{
					console.log("Pull %c 1 %c card from deck %c | Line: 496","color:blue","color:black","color:red");
					var deckTopCard = vm.deckSet.splice(0, 1);
					deckTopCard[0].left = vm.playerCards.player1.movingcnt * 40;
					vm.playerCards.player1.movingcnt += 1;
					vm.playerCards.player1.cards.push(deckTopCard[0]);
				}
			}
		}
		else{
			console.log("First turn play %c %c %c | Line: 505","color:blue","color:black","color:red");
			vm.firstTurn = false;
			if(vm.deckSet.length == 0){
				var poolCards = vm.deckPool.splice(0,vm.deckPool.length-1);
				DeckService.shuffleNewCards(poolCards)
				.then(function(response){
					poolCards = response;
					for(var i=0; i<poolCards.length; i++){
						vm.deckSet.push(poolCards[i]);
					}
					var deckTopCard = vm.deckSet.splice(0, 1);
				})
				.catch(function(error){
					alert(error)
				});
			}
			else{
				var deckTopCard = vm.deckSet.splice(0, 1);
			}
			console.log("Pull %c 1 %c card from deck %c | Line: 524","color:blue","color:black","color:red");
			deckTopCard[0].left = vm.playerCards.player1.movingcnt * 40;
			vm.playerCards.player1.movingcnt += 1;
			vm.playerCards.player1.cards.push(deckTopCard[0]);
		}
		vm.cardsToPull == 1;
		vm.skip_next_user_turn = false;
		vm.already_tackled_JAQ29_cards = true;
		vm.rearrange_cards_in_hands();
		vm.play_next_player();
	}

	/** Returns card type only if user have entered from value of card type.
		Tasks:
			1. Returns card type only if user have entered from value of card type, or keeps asking to user recurrsively.
			2. Method is called if user Player 1 have played a "J" card.
	*/
	function selectCardType_userPlay(){
		console.log("%c Inside selectCardType_userPlay %c %c | Line: 542","color:green","color:black","color:red");
		var selectType = prompt("Enter a card type to be played next.");
		if(selectType.toLowerCase() != "spade" && selectType.toLowerCase() != "heart" && selectType.toLowerCase() != "club" && selectType.toLowerCase() != "diamond"){
			alert("you can only enter- spade, heart, diamond, and heart, my deck does not contain special cards.");
			return vm.selectCardType_userPlay();
		}
		else{
			console.log("Chosen new card type %c "+selectType+" %c %c | Line: 549","color:blue","color:black","color:red");
			vm.chosenNewCard.status = true;
			vm.chosenNewCard.cardType = selectType;
			vm.already_tackled_JAQ29_cards = false;
		}
	}

	/** Game is initialized from here
		Tasks:
			1. Deck is assembled
			2. control passed to shuffleDeck method
	*/
	function init(){
		console.log("%c Game Started %c %c | Line: 562","color:green","color:black","color:red");
		DeckService.assembleDeck()
			.then(function(response){
				vm.loaderMsg = "Shuffling cards...";
				$timeout(function(){vm.shuffleDeck()},700);
			})
			.catch(function(error){
				alert(error)
			});
	};

	/** Deck is shuffle
		Tasks:
			1. Deck is shuffled
			2. control passed to distributeCards method, which will later be call only on start button
	*/
	function shuffleDeck(){
		console.log("%c Shuffle deck after Game start %c %c | Line: 579","color:green","color:black","color:red");
		vm.deckSet = null;
		DeckService.shuffleDeck()
			.then(function(response){
				vm.masterDeckSet = angular.copy(response);
				console.log("%c Distribution of card begin %c %c | Line: 584","color:green","color:black","color:red");
				$timeout(function(){
					vm.loaderMsg = "Distributing cards...";
					vm.distributeCards();
				},50);
			})
			.catch(function(error){
				alert(error)
			});
	}

	/** Cards are distributed using a recurrion method.
		Tasks:
			1. Card distribution, which will later be call only on start button
			2. All player cards are set here. All players cards information is held in "vm.playerCards" variable.
			3. control passed to initiateFirstCard method.
		Note: "vm.card_distribution_time" variable handles timer control.
	*/
	function distributeCards(){
		vm.shuffleBtnEnable = false;
		$timeout(function(){
			if(vm.distributionCnt < 24){
				DeckService.distributeCards()
					.then(function(response){
						vm.deckSet = response.deckSet;
						vm.playerCards = response.playerCards;
					})
					.catch(function(error){
						alert(error)
					});
				vm.distributionCnt++;
				vm.distributeCards();
			}else{
				vm.distributionCnt = 0;
				console.log("%c All Cards distributed %c %c | Line: 618","color:blue","color:black","color:red");
				$timeout(function(){
					vm.playerInfo = angular.copy(vm.currentPlayer);
				},80);
				vm.initiateFirstCard();
			}
		},vm.card_distribution_time);
	}

	/** Cards are popped up.
		Tasks:
			1. bring card on top of deck only for player 1
	*/
	function hoverCard(event){
		jQuery(event.target).parent().css("z-index",11);
	}

	/** Cards are popped down.
		Tasks:
			1. sends card to original position in deck only for player 1
	*/
	function hoverLeave(event){
		jQuery(event.target).parent().css("z-index",0);
	}

	/** Card is selected to be played.
		Tasks:
			1. Card is selected to be played, only for player 1
	*/
	function selectCardToPlay(card, event){
		vm.selectedCard = card;
	}

	/** Decks bottom card is thrown in pool.
		Tasks:
			1. after distribution of cards to all players, bottom card from the deck is thrown by AI in the pool. Irrespective of card details.
			2. Does not pass the control to any method.
	*/
	function initiateFirstCard(){
		var randomized_rotation = Math.floor(Math.random() * 359) + 1;
		var tmpPlayedCard = vm.deckSet.splice(0,1);
		tmpPlayedCard[0].rotation = randomized_rotation;
		vm.deckPool.push(tmpPlayedCard[0]);
		console.log("%c Game begins | Played first card to pool %c'"+tmpPlayedCard[0].cardNo+"' %c %c | Line: 661","color:green","font-weight:bold;color:#1e90ff","color:black","color:red");
		tmpPlayedCard = null;
		randomized_rotation = null;
		vm.showLoader = false;
	}

	/** This method is only for AI's.
		Tasks:
			1. This method handles the playing of cards by AI's (i.e 2nd, 3rd and 4th player.)
			2. Also calls a method "tackle_JAQ29_cards_in_play" to play according to the top most card played by previous player.
	*/
	function play_next_player(){
		console.log("%c-----------------------------**************************************-----------------------------","color:brown");console.log("AI play...%c Inside play_next_player %c %c | Line: 673","color:green","color:black","color:red");
		vm.showPlayerBtns = false;
		if(vm.player_won == true){
			return;
		}
		if(vm.currentDirection == "Anticlockwise"){
			vm.currentPlayer++;
			if(vm.currentPlayer > 4)
			{
				vm.currentPlayer=1;
			}
			console.log("%c "+vm.currentPlayer+" Player Playing %c Anticlockwise %c | Line: 684","color:blue","color:black","color:red");
		}
		else{
			vm.currentPlayer--;
			if(vm.currentPlayer < 1)
			{
				vm.currentPlayer=4;
			}
			console.log(vm.currentPlayer+"%c Player Playing %c Clockwise %c | Line: 692","color:blue","color:black","color:red");
		}
		vm.playerInfo = null;
		$timeout(function(){
			vm.playerInfo = angular.copy(vm.currentPlayer);
		},500);
		vm.firstTurn = false;

			if(vm.currentPlayer != 1){	//COMMENT: Player 1 is always a human so no else
			$timeout(function(){
				if(vm.deckPool[vm.deckPool.length-1].cardNo == "J" || vm.deckPool[vm.deckPool.length-1].cardNo == "A" || vm.deckPool[vm.deckPool.length-1].cardNo == "Q" || vm.deckPool[vm.deckPool.length-1].cardNo == "2" || vm.deckPool[vm.deckPool.length-1].cardNo == "9")
				{
					if(vm.already_tackled_JAQ29_cards == true){				//COMMENT: Check if already tackled JAQ29
						console.log("Pool top card is %c JAQ29 (TACKLED) %c %c | Line: 705","color:blue","color:black","color:red");
						var tmpPlayerCards = vm.playerCards["player"+vm.currentPlayer].cards;
						var hasJcard = false;
						if(tmpPlayerCards.length == 2){
							for(var i=0; i<tmpPlayerCards.length; i++){
								if(tmpPlayerCards[i].cardNo == "J"){
									hasJcard = true;
									tmpLogicalDecisionArray.push(tmpPlayerCards[i]);
									break;
								}
							}
						}

						if(hasJcard == true){
							vm.AI_logical_decision_to_play_next_card(tmpLogicalDecisionArray);	//COMMENT: AI thinks according to the array passed
						}
						else{
							if(vm.deckPool[vm.deckPool.length-1].cardNo == "J")	//COMMENT: If top card is joker then must play according to new card chosen
							{
								console.log("Pool top card is %c 'J' %c playing according to chosen card %c | Line: 724","color:blue","color:black","color:red");
								var topPoolCard = vm.chosenNewCard.cardType;
								var tmpLogicalDecisionArray = new Array();
								for(var i=0; i<tmpPlayerCards.length; i++)
								{
									if(topPoolCard == tmpPlayerCards[i].cardType){
										tmpLogicalDecisionArray.push(tmpPlayerCards[i]);
									}
								}
								console.log("Decision to make with cards: %c "+tmpLogicalDecisionArray.length+"%c %c | Line: 733","color:blue","color:black","color:red");
								vm.AI_logical_decision_to_play_next_card(tmpLogicalDecisionArray);	//COMMENT: AI thinks according to the array passed
							}
							else{
								console.log("Pool top card is %c AQ29 (TACKLED) %c %c | Line: 737","color:blue","color:black","color:red");
								//COMMENT: Normal play | If top pool card is joker/Queen/Ace/2/9 but is tackled already.
								var topPoolCard = vm.deckPool[vm.deckPool.length-1];
								var tmpLogicalDecisionArray = new Array();
								for(var i=0; i<tmpPlayerCards.length; i++)
								{
									if(topPoolCard.cardNo == tmpPlayerCards[i].cardNo || topPoolCard.cardType == tmpPlayerCards[i].cardType || tmpPlayerCards[i].cardNo == "J"){
										tmpLogicalDecisionArray.push(tmpPlayerCards[i]);
									}
								}
								console.log("Decision to make with cards: %c "+tmpLogicalDecisionArray.length+"%c %c | Line: 747","color:blue","color:black","color:red");
								vm.AI_logical_decision_to_play_next_card(tmpLogicalDecisionArray);	//COMMENT: AI thinks according to the array passed
							}
						}
					}
					else{
						console.log("%c Top card JAQ29 (TO TACKLE) %c %c | Line: 753","color:blue","color:black","color:red");
						//COMMENT: Tackle JAQ29 card using smart play of AI.
						vm.tackle_JAQ29_cards_in_play(vm.deckPool[vm.deckPool.length-1], vm.currentPlayer);
					}
				}
				else{
					console.log("Normal Play | Pool top card is %c NOT JAQ29 %c %c | Line: 759","color:blue","color:black","color:red");
					//COMMENT: If top pool card is non joker, non Queen, non Ace, non 2 and non 9
					var tmpPlayerCards = vm.playerCards["player"+vm.currentPlayer].cards;
					var topPoolCard = vm.deckPool[vm.deckPool.length-1];
					var tmpLogicalDecisionArray = new Array();
					for(var i=0; i<tmpPlayerCards.length; i++)
					{
						if(topPoolCard.cardNo == tmpPlayerCards[i].cardNo || topPoolCard.cardType == tmpPlayerCards[i].cardType || tmpPlayerCards[i].cardNo == "J"){
							tmpLogicalDecisionArray.push(tmpPlayerCards[i]);
						}
					}
					console.log("Decision to make with cards: %c "+tmpLogicalDecisionArray.length+"%c %c | Line: 770","color:blue","color:black","color:red");
					vm.AI_logical_decision_to_play_next_card(tmpLogicalDecisionArray);	//COMMENT: AI thinks according to the array passed
				}
				vm.rearrange_cards_in_hands();
				vm.play_next_player();
			},vm.AI_playing_time);
			}
			else{	//COMMENT: If next player is Human
				console.log("P1 player %c is HUMAN %c %c | Line: 778","color:blue","color:black","color:red");
				if(vm.deckPool[vm.deckPool.length-1].cardNo == "9" && vm.already_tackled_JAQ29_cards == false){
					console.log("Pool top card is %c '9' %c check if have 9 else skip turn set to false %c | Line: 780","color:blue","color:black","color:red");
					var player1_cards = vm.playerCards.player1.cards;
					var has9card = false;
					for(var i=0; i<player1_cards.length; i++){
						if(player1_cards[i].cardNo == "9")
						{
							has9card = true;
							break;
						}
					}

					if(has9card != true){
						vm.skip_next_user_turn = false;
						vm.already_tackled_JAQ29_cards = true;
						vm.rearrange_cards_in_hands();
						vm.play_next_player();
					}
					has9card = null;
					player1_cards = null;
				}

					$timeout(function(){
						vm.playerInfo = 1;
						vm.showPlayerBtns = true;
					},50);
			}
			if(vm.playerCards["player"+vm.currentPlayer].cards.length == 0){
				console.log("%c %c %c "+vm.currentPlayer+" Player WON  | Line: 807","color:blue","color:black","color:red");
				alert("Player "+ vm.currentPlayer + " Won the Game");
				vm.player_won = true;
			}
	};

	/** This method is also for AI's.
		Tasks:
			1. This method handles the top card played by previous player and plays next card accordingly.
	*/
	function tackle_JAQ29_cards_in_play(pool_top_card, currPlayer){
		console.log("%c Inside Tackle JAQ29 Cards %c %c | Line: 818","color:green","color:black","color:red");
		var tmpPlayedCard = null;
		var tmpPlayerCards = vm.playerCards["player"+currPlayer].cards;
		var tmpIndex = -1;
		for(var i=0; i<tmpPlayerCards.length; i++){
			if(pool_top_card.cardNo == tmpPlayerCards[i].cardNo){
				tmpIndex = i;
				break;
			}
		}

		if(tmpIndex != -1){		//COMMENT: found counter measure cards to pool card played
			console.log("Found Counter measure to tackle JAQ29 Card%c %c %c | Line: 830","color:blue","color:black","color:red");
			for(var i=0; i<tmpPlayerCards.length; i++)
			{
				if(pool_top_card.cardNo == tmpPlayerCards[i].cardNo)
				{
					tmpPlayedCard = tmpPlayerCards.splice(i,1);
					break;
				}
			}
			tmpPlayedCard[0].rotation = Math.floor(Math.random() * 359) + 1;
			vm.deckPool.push(tmpPlayedCard[0]);
			vm.already_tackled_JAQ29_cards = false;

			if(tmpPlayedCard[0].cardNo == "A"){
				console.log("Played card %c 'A' %c %c | Line: 844","color:blue","color:black","color:red");
				vm.cardsToPull = vm.cardsToPull + 3;
			}
			else if(tmpPlayedCard[0].cardNo == "2"){
				console.log("Played card %c '2' %c %c | Line: 848","color:blue","color:black","color:red");
				vm.cardsToPull = vm.cardsToPull + 2;
			}
			else if(tmpPlayedCard[0].cardNo == "J"){
				console.log("Played card %c 'J' %c %c | Line: 852","color:blue","color:black","color:red");
				vm.selectCardType_AI_Play();
			}
			else if(tmpPlayedCard[0].cardNo == "Q"){
				console.log("Played card %c 'Q' %c %c | Line: 856","color:blue","color:black","color:red");
				vm.currentDirection == "Anticlockwise"? vm.currentDirection = "Clockwise" : vm.currentDirection = "Anticlockwise";
			}
			else if(tmpPlayedCard[0].cardNo == "9"){
				console.log("Played card %c '9' %c %c | Line: 860","color:blue","color:black","color:red");
				vm.already_tackled_JAQ29_cards = false;
				vm.skip_next_user_turn = true;
			}
		}
		else{
			console.log("NO counter measure found %c %c %c | Line: 866","color:blue","color:black","color:red");
			//COMMENT: Cannot matched with any JAQ29 cards so pulled cards from deck.
			if(pool_top_card.cardNo == "A" || pool_top_card.cardNo == "2")
			{
				if(vm.deckSet.length == 0 || vm.deckSet.length < vm.cardsToPull){
					var poolCards = vm.deckPool.splice(0,vm.deckPool.length-1);
					DeckService.shuffleNewCards(poolCards)
					.then(function(response){
						poolCards = response;
						for(var i=0; i<poolCards.length; i++){
							vm.deckSet.push(poolCards[i]);
						}

						var tmpCardsPulled = vm.deckSet.splice(0, vm.cardsToPull);
						for(var i=0; i<tmpCardsPulled.length; i++)
						{
							tmpCardsPulled[i].left = vm.playerCards["player"+currPlayer].movingcnt * 40;
							vm.playerCards["player"+currPlayer].movingcnt += 1;
							vm.playerCards["player"+currPlayer].cards.push(tmpCardsPulled[i]);
						}
					})
					.catch(function(error){
						alert(error)
					});
				}
				else{
						var tmpCardsPulled = vm.deckSet.splice(0, vm.cardsToPull);
						for(var i=0; i<tmpCardsPulled.length; i++)
						{
							tmpCardsPulled[i].left = vm.playerCards["player"+currPlayer].movingcnt * 40;
							vm.playerCards["player"+currPlayer].movingcnt += 1;
							vm.playerCards["player"+currPlayer].cards.push(tmpCardsPulled[i]);
						}
				}
				console.log("Pool top card is %c 'A'/'2' therefore '"+vm.cardsToPull+"' %c cards pulled %c | Line: 900","color:blue","color:black","color:red");
				vm.cardsToPull = 1;
				vm.already_tackled_JAQ29_cards = true;
				vm.skip_next_user_turn = false;
			}
			if(pool_top_card.cardNo == "9")
			{
				console.log("Pool top card is %c '9' %c so skipped turn %c | Line: 907","color:blue","color:black","color:red");
				//COMMENT: Need to do nothing pass turn;
				vm.cardsToPull = 1;
				vm.already_tackled_JAQ29_cards = true;
				vm.skip_next_user_turn = false;
			}
			if(pool_top_card.cardNo == "Q")
			{
				console.log("Pool top card is %c 'Q' %c %c | Line: 915","color:blue","color:black","color:red");
				var tmpMatchedCard = false;
				var tmpLogicalDecisionArray = new Array();
				for(var i=0; i<tmpPlayerCards.length; i++)
				{
					if(pool_top_card.cardType == tmpPlayerCards[i].cardType)
					{
						tmpMatchedCard = true;
						tmpLogicalDecisionArray.push(tmpPlayerCards[i]);
					}
				}

				if(tmpMatchedCard == true)
				{
					console.log("Have a matching card | Decision to make with cards: %c "+tmpLogicalDecisionArray.length+"%c %c | Line: 929","color:blue","color:black","color:red");
					vm.AI_logical_decision_to_play_next_card(tmpLogicalDecisionArray);	//COMMENT: AI thinks according to the array passed
				}
				else{
					//COMMENT: Pull a card
					console.log("Pulling a card no matching card found %c %c %c | Line: 934","color:blue","color:black","color:red");
					if(vm.deckSet.length == 0){
						var poolCards = vm.deckPool.splice(0,vm.deckPool.length-1);
						DeckService.shuffleNewCards(poolCards)
						.then(function(response){
							poolCards = response;
							for(var i=0; i<poolCards.length; i++){
								vm.deckSet.push(poolCards[i]);
							}
							var pulledCard = vm.deckSet.splice(0, 1);
						})
						.catch(function(error){
							alert(error)
						});
					}
					else{
						var pulledCard = vm.deckSet.splice(0, 1);
					}

					pulledCard[0].left = vm.playerCards["player"+vm.currentPlayer].movingcnt * 40;
					vm.playerCards["player"+vm.currentPlayer].movingcnt += 1;
					vm.playerCards["player"+vm.currentPlayer].cards.push(pulledCard[0]);
					pulledCard = null;
					vm.cardsToPull = 1;
					vm.already_tackled_JAQ29_cards = true;
					vm.skip_next_user_turn = false;
				}
			}
			if(pool_top_card.cardNo == "J")
			{
				console.log("Pool top card is %c 'J' %c playing according to new card type chosen %c | Line: 964","color:blue","color:black","color:red");
				var tmpMatchedCard = false;
				var tmpLogicalDecisionArray = new Array();
				for(var i=0; i<tmpPlayerCards.length; i++)
				{
					if(vm.chosenNewCard.cardType == tmpPlayerCards[i].cardType)
					{
						tmpMatchedCard = true;
						tmpLogicalDecisionArray.push(tmpPlayerCards[i]);
					}
				}

				if(tmpMatchedCard == true)
				{
					console.log("Have a matching card | Decision to make with cards: %c "+tmpLogicalDecisionArray.length+"%c %c | Line: 978","color:blue","color:black","color:red");
					vm.AI_logical_decision_to_play_next_card(tmpLogicalDecisionArray);	//COMMENT: AI thinks according to the array passed
				}
				else{
					//COMMENT: Pull a card
					console.log("Pulling a card no matching card found %c %c %c | Line: 983","color:blue","color:black","color:red");
					if(vm.deckSet.length == 0){
						var poolCards = vm.deckPool.splice(0,vm.deckPool.length-1);
						DeckService.shuffleNewCards(poolCards)
						.then(function(response){
							poolCards = response;
							for(var i=0; i<poolCards.length; i++){
								vm.deckSet.push(poolCards[i]);
							}
							var pulledCard = vm.deckSet.splice(0, 1);
						})
						.catch(function(error){
							alert(error)
						});
					}
					else{
						var pulledCard = vm.deckSet.splice(0, 1);
					}
					pulledCard[0].left = vm.playerCards["player"+vm.currentPlayer].movingcnt * 40;
					vm.playerCards["player"+vm.currentPlayer].movingcnt += 1;
					vm.playerCards["player"+vm.currentPlayer].cards.push(pulledCard[0]);
					pulledCard = null;
					vm.cardsToPull = 1;
					vm.already_tackled_JAQ29_cards = true;
					vm.skip_next_user_turn = false;
				}
			}
		}
	}

	/** AI's Logical decisions are based on all the cards whose either card number or card type is matched
		Tasks:
			1. It will play card according to the decisions based on cards present in hand or matched cards.
	*/
	function AI_logical_decision_to_play_next_card(tmpLogicalDecisionArray){
		console.log("%c Inside AI_logical_decision_to_play_next_card %c %c | Line: 1018","color:green","color:black","color:red");
		var tmpPlayerCards = vm.playerCards["player"+vm.currentPlayer].cards;
		var topPoolCard = vm.deckPool[vm.deckPool.length-1];
		if(tmpLogicalDecisionArray.length>0){
			if(tmpLogicalDecisionArray.length == 1){ //COMMENT: AI have only one card to play.
				console.log("AI have only %c '1' %c card to play %c | Line: 1023","color:blue","color:black","color:red");
				var tmpPlayedCard = null;
				for(var i=0; i<tmpPlayerCards.length; i++)
				{
					if(tmpLogicalDecisionArray[0].cardNo == tmpPlayerCards[i].cardNo && tmpLogicalDecisionArray[0].cardType == tmpPlayerCards[i].cardType)
					{ 	//COMMENT: as length is 1 there for hardcoded [0]
						tmpPlayedCard = tmpPlayerCards.splice(i,1);
						break;
					}
				}
				vm.cardsToPull = 1;
				tmpPlayedCard[0].rotation = Math.floor(Math.random() * 359) + 1;
				vm.deckPool.push(tmpPlayedCard[0]);
				vm.chosenNewCard.status = false;
				if(tmpPlayedCard[0].cardNo == "J"){
					console.log("Card played: %c 'J' %c %c | Line: 1038","color:blue","color:black","color:red");
					vm.selectCardType_AI_Play();
				}
				if(tmpPlayedCard[0].cardNo == "Q"){
					console.log("Card played: %c 'Q' %c %c | Line: 1042","color:blue","color:black","color:red");
					vm.currentDirection == "Anticlockwise"? vm.currentDirection = "Clockwise" : vm.currentDirection = "Anticlockwise";
					vm.chosenNewCard.status = false;
				}
				if(tmpPlayedCard[0].cardNo == "A"){
					console.log("Card played: %c 'A' %c %c | Line: 1047","color:blue","color:black","color:red");
					vm.cardsToPull = 3;
					vm.chosenNewCard.status = false;
					vm.already_tackled_JAQ29_cards = false;
				}
				if(tmpPlayedCard[0].cardNo == "2"){
					console.log("Card played: %c '2' %c %c | Line: 1053","color:blue","color:black","color:red");
					vm.cardsToPull = 2;
					vm.chosenNewCard.status = false;
					vm.already_tackled_JAQ29_cards = false;
				}
				if(tmpPlayedCard[0].cardNo == "9"){
					console.log("Card played: %c '9' %c %c | Line: 1059","color:blue","color:black","color:red");
					vm.already_tackled_JAQ29_cards = false;
					vm.chosenNewCard.status = false;
					vm.skip_next_user_turn = true;
				}
			}
			else{		//COMMENT: here tmpLogicalDecisionArray.length > 1
				console.log("AI has multiple possibilities to think %c %c %c | Line: 1066","color:blue","color:black","color:red");
				vm.AlreadyTackled_logic_with_multiple_decisions(tmpLogicalDecisionArray)
			}
		}else{
			console.log("No Cards to play %c %c %c | Line: 1070","color:blue","color:black","color:red");
			if(vm.skip_next_user_turn != true){
				console.log("%c Pulling a card from deck %c | skip_next_user_turn == false  %c | Line: 1072","color:blue","color:black","color:red");
				alert("Pulling a card from deck.");
				vm.already_tackled_JAQ29_cards = true;
				if(vm.deckSet.length == 0){
					var poolCards = vm.deckPool.splice(0,vm.deckPool.length-1);
					DeckService.shuffleNewCards(poolCards)
					.then(function(response){
						poolCards = response;
						for(var i=0; i<poolCards.length; i++){
							vm.deckSet.push(poolCards[i]);
						}
						var pulledCard = vm.deckSet.splice(0,1);
						pulledCard[0].left = vm.playerCards["player"+vm.currentPlayer].movingcnt * 40;
						vm.playerCards["player"+vm.currentPlayer].movingcnt += 1;
						vm.playerCards["player"+vm.currentPlayer].cards.push(pulledCard[0]);
						pulledCard = null;
					})
					.catch(function(error){
						alert(error)
					});
				}
				else{
					var pulledCard = vm.deckSet.splice(0,1);
					pulledCard[0].left = vm.playerCards["player"+vm.currentPlayer].movingcnt * 40;
					vm.playerCards["player"+vm.currentPlayer].movingcnt += 1;
					vm.playerCards["player"+vm.currentPlayer].cards.push(pulledCard[0]);
					pulledCard = null;
				}
			}
			else{
				console.log("Skipped turn as previously played %c '9' %c %c | Line: 1102","color:blue","color:black","color:red");
				vm.skip_next_user_turn = false;
				alert('Skipped Turn as previously played 9');
			}
		}
	};

	/** A Subset decision code for method "AI_logical_decision_to_play_next_card"
		Tasks:
			1. This method handles the decisions when AI have multiple scenarios like,
				a. Next player has only one card.
				b. any player has one card.
				c. If It can skip the next turn, etc.
	*/
	function AlreadyTackled_logic_with_multiple_decisions(tmpLogicalDecisionArray){
		console.log("%c Inside AlreadyTackled_logic_with_multiple_decisions %c %c | Line: 1117","color:green","color:black","color:red");
		var tmpCurrPlayerCards = vm.playerCards["player"+vm.currentPlayer].cards;
		var topPoolCard = vm.deckPool[vm.deckPool.length-1];
		var nextPlayer = null;
		var next_nextPlayer = null;
		var lastPlayer = null;

		if(vm.currentDirection == "Anticlockwise"){
			console.log("Current direction %c 'Anticlockwise' with "+vm.currentPlayer+" %c player playing %c | Line: 1125","color:blue","color:black","color:red");
			if(vm.currentPlayer == 4){
				nextPlayer = 1;
				next_nextPlayer = 2;
				lastPlayer = 3;
			}
			else if(vm.currentPlayer == 3){
				nextPlayer = 4;
				next_nextPlayer = 1;
				lastPlayer = 2;
			}
			else if(vm.currentPlayer == 2){
				nextPlayer = 3;
				next_nextPlayer = 4;
				lastPlayer = 1;
			}
			else{
				nextPlayer = 2;
				next_nextPlayer = 3;
				lastPlayer = 4;
			}
		}
		else{
			console.log("Current direction %c 'Clockwise' with "+vm.currentPlayer+" %c player playing %c | Line: 1148","color:blue","color:black","color:red");
			if(vm.currentPlayer == 4){
				nextPlayer = 3;
				next_nextPlayer = 2;
				lastPlayer = 1;
			}
			else if(vm.currentPlayer == 3){
				nextPlayer = 2;
				next_nextPlayer = 1;
				lastPlayer = 4;
			}
			else if(vm.currentPlayer == 2){
				nextPlayer = 1;
				next_nextPlayer = 4;
				lastPlayer = 3;
			}
			else{
				nextPlayer = 4;
				next_nextPlayer = 3;
				lastPlayer = 2;
			}
		}

		if(vm.playerCards["player"+nextPlayer].cards.length == 1){	//COMMENT: Next player has only one card in hand
			console.log("%c "+nextPlayer+" %c player has only card %c | Line: 1172","color:blue","color:black","color:red");
			var foundAceOr2 = false;
			var found9 = false;
			var foundJ = false;
			var foundQ = false;
			var index = -1;
			for(var i=0; i<tmpLogicalDecisionArray.length; i++){
				if(tmpLogicalDecisionArray[i].cardNo == "A" || tmpLogicalDecisionArray[i].cardNo == "2"){
					console.log("Found %c 'A/2' %c to play %c | Line: 1180","color:blue","color:black","color:red");
					foundAceOr2 = true;
					index = i;
					break;
				}
			}

			if(foundAceOr2 == false){
				for(var i=0; i<tmpLogicalDecisionArray.length; i++){
					if(tmpLogicalDecisionArray[i].cardNo == "9"){
						console.log("Found %c '9' %c to play %c | Line: 1190","color:blue","color:black","color:red");
						found9 = true;
						index = i;
						break;
					}
				}
			}

			if(foundAceOr2 == false && found9 == false){
				for(var i=0; i<tmpLogicalDecisionArray.length; i++){
					if(tmpLogicalDecisionArray[i].cardNo == "J"){
						console.log("Found %c 'J' %c to play %c | Line: 1201","color:blue","color:black","color:red");
						foundJ = true;
						index = i;
						break;
					}
				}
			}

			if(foundAceOr2 == false && found9 == false && foundJ == false){
				for(var i=0; i<tmpLogicalDecisionArray.length; i++){
					if(tmpLogicalDecisionArray[i].cardNo == "Q"){
						console.log("Found %c 'Q' %c to play %c | Line: 1212","color:blue","color:black","color:red");
						foundQ = true;
						index = i;
						break;
					}
				}
			}
			if(index!=-1 && (foundAceOr2 == true || found9 == true || foundJ == true || foundQ == true)){	//COMMENT: Found Either A / 2 / Q / 9 to play
				console.log("Found JAQ29 card to play and stop next playe from winning %c %c %c | Line: 1220","color:blue","color:black","color:red");
				var tmpPlayedCard = null;
				for(var i=0; i<tmpCurrPlayerCards.length; i++)
				{
					if(tmpLogicalDecisionArray[index].cardNo == tmpCurrPlayerCards[i].cardNo && tmpLogicalDecisionArray[index].cardType == tmpCurrPlayerCards[i].cardType)
					{
						tmpPlayedCard = tmpCurrPlayerCards.splice(i,1);
						break;
					}
				}
				vm.cardsToPull = 1;
				tmpPlayedCard[0].rotation = Math.floor(Math.random() * 359) + 1;
				vm.deckPool.push(tmpPlayedCard[0]);
				vm.chosenNewCard.status = false;
				if(tmpPlayedCard[0].cardNo == "Q"){
					console.log("Found %c 'Q' %c to play %c | Line: 1235","color:blue","color:black","color:red");
					vm.currentDirection == "Anticlockwise"? vm.currentDirection = "Clockwise" : vm.currentDirection = "Anticlockwise";
				}
				if(tmpPlayedCard[0].cardNo == "A"){
					console.log("Found %c 'A' %c to play %c | Line: 1239","color:blue","color:black","color:red");
					vm.cardsToPull = 3;
					vm.already_tackled_JAQ29_cards = false;
					vm.chosenNewCard.status = false;
				}
				if(tmpPlayedCard[0].cardNo == "2"){
					console.log("Found %c '2' %c to play %c | Line: 1245","color:blue","color:black","color:red");
					vm.cardsToPull = 2;
					vm.already_tackled_JAQ29_cards = false;
					vm.chosenNewCard.status = false;
				}
				if(tmpPlayedCard[0].cardNo == "9"){
					console.log("Found %c '9' %c to play %c | Line: 1251","color:blue","color:black","color:red");
					vm.already_tackled_JAQ29_cards = false;
					vm.skip_next_user_turn = true;
				}
				if(tmpPlayedCard[0].cardNo == "J"){
					console.log("Found %c 'J' %c to play %c | Line: 1256","color:blue","color:black","color:red");
					vm.selectCardType_AI_Play();
				}
			}
			else{
				//COMMENT: Cannot find either A / 2 / Q / 9 / J to play
				console.log("Not able to change next players cards %c %c %c | Line: 1262","color:blue","color:black","color:red");
				var randomCard = tmpLogicalDecisionArray[Math.floor(Math.random() * tmpLogicalDecisionArray.length)];
				var tmpPlayedCard = null;
				for(var i=0; i<tmpCurrPlayerCards.length; i++)
				{
					if(randomCard.cardNo == tmpCurrPlayerCards[i].cardNo && randomCard.cardType == tmpCurrPlayerCards[i].cardType)
					{
						tmpPlayedCard = tmpCurrPlayerCards.splice(i,1);
						break;
					}
				}
				vm.cardsToPull = 1;
				tmpPlayedCard[0].rotation = Math.floor(Math.random() * 359) + 1;
				console.log("Randomly played %c '"+tmpPlayedCard[0].cardNo+"' %c card %c | Line: 1275","color:blue","color:black","color:red");
				vm.deckPool.push(tmpPlayedCard[0]);
				vm.chosenNewCard.status = false;
			}
		}
		else if(vm.playerCards["player"+next_nextPlayer].cards.length == 1 || vm.playerCards["player"+lastPlayer].cards.length == 1){
			console.log("%c "+next_nextPlayer+"/"+lastPlayer+" %c player has only card %c | Line: 1281","color:blue","color:black","color:red");
			//COMMENT: Next Player / Last player has one card in hand
			var logical_dec_has_other_cards = false;
			var foundJ = false;
			var index = -1;
			for(var i=0; i<tmpLogicalDecisionArray.length; i++){
				if(tmpLogicalDecisionArray[i].cardNo != "9" || tmpLogicalDecisionArray[i].cardNo != "2" || tmpLogicalDecisionArray[i].cardNo != "Q" || tmpLogicalDecisionArray[i].cardNo != "A"){	//COMMENT: J will be treated as regular card to play and these remaining cards will be removed.
				logical_dec_has_other_cards = true;
					break;
				}
			}

			if(logical_dec_has_other_cards == true){
				//COMMENT: remove all AQ29 cards as playing these will increase next_next or last players winning chances.
				console.log("Removing AQ29 cards so that next player have a chance of stopping some player from winning %c %c %c | Line: 1295","color:blue","color:black","color:red");
				for(var i=0; i<tmpLogicalDecisionArray.length; i++){
					if(tmpLogicalDecisionArray[i].cardNo == "9" || tmpLogicalDecisionArray[i].cardNo == "2" || tmpLogicalDecisionArray[i].cardNo == "Q" || tmpLogicalDecisionArray[i].cardNo == "A"){
						tmpLogicalDecisionArray.splice(i,1);
						i--;
					}
				}
			}

			for(var i=0; i<tmpLogicalDecisionArray.length; i++){
				if(tmpLogicalDecisionArray[i].cardNo == "J"){
					console.log("%c 'J' %c card found to play %c | Line: 1306","color:blue","color:black","color:red");
					foundJ = true;
					index = i;
					break;
				}
			}

			if(foundJ == true){		//COMMENT: Playing 'J' card.
				var tmpPlayedCard = null;
				for(var i=0; i<tmpCurrPlayerCards.length; i++)
				{
					if(tmpLogicalDecisionArray[index].cardNo == tmpCurrPlayerCards[i].cardNo && tmpLogicalDecisionArray[index].cardType == tmpCurrPlayerCards[i].cardType)
					{
						tmpPlayedCard = tmpCurrPlayerCards.splice(i,1);
					}
				}
				vm.cardsToPull = 1;
				console.log("Card played: %c "+tmpPlayedCard[0].cardNo+" %c %c | Line: 1323","color:blue","color:black","color:red");
				tmpPlayedCard[0].rotation = Math.floor(Math.random() * 359) + 1;
				vm.deckPool.push(tmpPlayedCard[0]);
				vm.selectCardType_AI_Play();
			}
			else{	//COMMENT: Randomly play any card.
				var randomCard = tmpLogicalDecisionArray[Math.floor(Math.random() * tmpLogicalDecisionArray.length)];
				var tmpPlayedCard = null;
				for(var i=0; i<tmpCurrPlayerCards.length; i++)
				{
					if(randomCard.cardNo == tmpCurrPlayerCards[i].cardNo && randomCard.cardType == tmpCurrPlayerCards[i].cardType)
					{
						tmpPlayedCard = tmpCurrPlayerCards.splice(i,1);
						break;
					}
				}
				vm.cardsToPull = 1;
				console.log("Randomly played: %c "+tmpPlayedCard[0].cardNo+" %c %c | Line: 1340","color:blue","color:black","color:red");
				tmpPlayedCard[0].rotation = Math.floor(Math.random() * 359) + 1;
				vm.deckPool.push(tmpPlayedCard[0]);
			}
		}
		else{
			//COMMENT: All Players has more then one cards in hand so Randomly play any card.
			console.log("Playing normally as all players have more than 1 card in hand %c %c %c | Line: 1347","color:blue","color:black","color:red");
			var randomCard = tmpLogicalDecisionArray[Math.floor(Math.random() * tmpLogicalDecisionArray.length)];
			var tmpPlayedCard = null;
			for(var i=0; i<tmpCurrPlayerCards.length; i++)
			{
				if(randomCard.cardNo == tmpCurrPlayerCards[i].cardNo && randomCard.cardType == tmpCurrPlayerCards[i].cardType)
				{
					tmpPlayedCard = tmpCurrPlayerCards.splice(i,1);
					break;
				}
			}
			vm.cardsToPull = 1;
			tmpPlayedCard[0].rotation = Math.floor(Math.random() * 359) + 1;
			vm.deckPool.push(tmpPlayedCard[0]);
			vm.chosenNewCard.status = false;
			if(tmpPlayedCard[0].cardNo == "Q"){
				console.log("Found %c 'Q' %c to play %c | Line: 1363","color:blue","color:black","color:red");
				vm.currentDirection == "Anticlockwise"? vm.currentDirection = "Clockwise" : vm.currentDirection = "Anticlockwise";
			}
			if(tmpPlayedCard[0].cardNo == "A"){
				console.log("Found %c 'A' %c to play %c | Line: 1367","color:blue","color:black","color:red");
				vm.cardsToPull = 3;
				vm.already_tackled_JAQ29_cards = false;
			}
			if(tmpPlayedCard[0].cardNo == "2"){
				console.log("Found %c '2' %c to play %c | Line: 1372","color:blue","color:black","color:red");
				vm.cardsToPull = 2;
				vm.already_tackled_JAQ29_cards = false;
			}
			if(tmpPlayedCard[0].cardNo == "9"){
				console.log("Found %c '9' %c to play %c | Line: 1377","color:blue","color:black","color:red");
				vm.already_tackled_JAQ29_cards = false;
				vm.skip_next_user_turn = true;
			}
			if(tmpPlayedCard[0].cardNo == "J"){
				console.log("Found %c 'J' %c to play %c | Line: 1382","color:blue","color:black","color:red");
				vm.selectCardType_AI_Play();
			}
		}
	};

	/** Returns randomized card type from AI. */
	function selectCardType_AI_Play(){
		console.log("%c Inside selectCardType_AI_Play %c %c | Line: 1390","color:green","color:black","color:red");
		var tmpCardTypes = ["spade", "heart", "diamond", "club"];
		var tmpCurrPlayerCards = angular.copy(vm.playerCards["player"+vm.currentPlayer].cards);
		var flag_player_have_1_card = false;
		for(var i=1; i<=4; i++){
			if(vm.playerCards["player"+i].cards.length == 1 && i != vm.currentPlayer)
			{
				flag_player_have_1_card = true;
				break;
			}
		}

		var tmpDeck = null;
		var tmpPool = angular.copy(vm.deckPool);
		if(flag_player_have_1_card == true && tmpPool){
			for(var i=0; i<tmpPool.length; i++){	//52-12(card pool) = 40 appx
				for(var j=0; j<vm.masterDeckSet.length; j++){
					if(vm.masterDeckSet[j].cardNo == tmpPool[i].cardNo && vm.masterDeckSet[j].cardType == tmpPool[i].cardType){
						vm.masterDeckSet.splice(j,1);
						break;
					}
				}
			}

			for(var i=0; i<tmpCurrPlayerCards.length; i++){	//40-5(hand cards) = 35 appx
				for(var j=0; j<vm.masterDeckSet.length; j++){
					if(vm.masterDeckSet[j].cardNo == tmpCurrPlayerCards[i].cardNo && vm.masterDeckSet[j].cardType == tmpCurrPlayerCards[i].cardType){
						vm.masterDeckSet.splice(j,1);
						break;
					}
				}
			}

			var calc_cards = {spade:0, heart:0, diamond:0, club:0}
			for(var k=0; k<vm.masterDeckSet.length; k++){
				if(vm.masterDeckSet[k].cardType == "spade"){
					calc_cards.spade = calc_cards.spade+1;
				}
				else if(vm.masterDeckSet[k].cardType == "heart"){
					calc_cards.heart = calc_cards.heart+1;
				}
				else if(vm.masterDeckSet[k].cardType == "diamond"){
					calc_cards.diamond = calc_cards.diamond+1;
				}
				else{
					calc_cards.club = calc_cards.club+1;
				}
			}

			var tmpCardType = null;
			if(calc_cards.spade > calc_cards.heart && calc_cards.spade > calc_cards.diamond && calc_cards.spade > calc_cards.club)
			{
				tmpCardType = "spade";
			}
			else if(calc_cards.heart > calc_cards.spade && calc_cards.heart > calc_cards.diamond && calc_cards.heart > calc_cards.club)
			{
				tmpCardType = "heart";
			}
			else if(calc_cards.diamond > calc_cards.spade && calc_cards.diamond > calc_cards.heart && calc_cards.heart > calc_cards.club)
			{
				tmpCardType = "diamond";
			}
			else
			{
				tmpCardType = "club";
			}
			console.log("SMARTLY CHOSEN CARD | The new Card Type will be %c "+tmpCardType+" %c %c | Line: 1456","color:blue","color:black","color:red");
			alert("SMARTLY CHOSEN CARD | The new Card Type will be: "+ tmpCardType);
			vm.chosenNewCard.status = true;
			vm.chosenNewCard.cardType = tmpCardType;
			vm.already_tackled_JAQ29_cards = false;
		}
		else{
			var tmpCurrPlayerCards = angular.copy(vm.playerCards["player"+vm.currentPlayer].cards);
			var spade,heart,diamond,club;
			spade = heart = diamond = club = 0
			for(var i=0; i<tmpCurrPlayerCards.length; i++){
				if(tmpCurrPlayerCards[i].cardNo != "J" && tmpCurrPlayerCards[i].cardType == "spade"){
					spade = spade+1;
				}
				else if(tmpCurrPlayerCards[i].cardNo != "J" && tmpCurrPlayerCards[i].cardType == "heart"){
					heart = heart+1;
				}
				else if(tmpCurrPlayerCards[i].cardNo != "J" && tmpCurrPlayerCards[i].cardType == "diamond"){
					diamond = diamond+1;
				}
				else{
					club = club+1;
				}
			}

			if(spade >= heart && spade >= diamond && spade >= club){
				var randCardType = "spade";
			}
			else if(heart >= spade && heart >= diamond && heart >= club){
				var randCardType = "heart";
			}
			else if(diamond >= spade && diamond >= heart && diamond >= club){
				var randCardType = "diamond";
			}
			else{
				var randCardType = "club";
			}
			console.log("New Card Type is chosen according to max type card player have in hand %c i.e: "+randCardType+" %c %c | Line: 1493","color:blue","color:black","color:red");
			alert("The new Card Type will be: "+ randCardType);
			vm.chosenNewCard.status = true;
			vm.chosenNewCard.cardType = randCardType;
			vm.already_tackled_JAQ29_cards = false;
		}
	};


	function rearrange_cards_in_hands(){
		console.log("Re-arranging cards of %c Player "+vm.currentPlayer+" hand %c %c | Line: 1503","color:green","color:black","color:red");
		var playerCards = vm.playerCards["player"+vm.currentPlayer].cards;
		$timeout(function(){
			for(var i=0; i<playerCards.length; i++){
				playerCards[i].left = i*40;
			}
		},300);
	}

	function startGame(){
		/** Initial function call post loading game/page refresh */
		vm.startgameflag = true;
		vm.showLoader = true;
		vm.loaderMsg = "Assembling Deck...";
		$timeout(function(){vm.init()},700);	//COMMENT: initialization
	}
}