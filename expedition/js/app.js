/*
Tricks:
	1: Go Home
	2: Snakes kill, Need Katana
	3: Bear attack: Need Gun with Bullets
	4: Viral Fewer: Need Medicine
	5: Town: Free Crate.
	6: Jump: 2 Places
	7: Swamp: Go Back 4 Places

Dices Rolls:
	**Die 1**
		1: 1
		2: 2
		3: 3
		4: 4
		5: 5
		6: 6

	**Die 2**
		1: New Friend
		2: Food Crate
		3: Medicine
		4: Gun
		5: bullets
		6: Katana sword
*/
angular.module("DiceRoll", [])
	.controller("RollDiceController", RollDiceController);

RollDiceController.$inject=["$timeout", "StepsWriter", "RandomizeTricks"];

function RollDiceController($timeout, StepsWriter, RandomizeTricks){
	var vm=this;
	vm.rollingdice=false;
	vm.rolldie = rolldie;
	vm.stopDie = stopDie;
	vm.movePlayer = movePlayer;
	vm.addBlackDie = addBlackDie;
	vm.checkEachStep = checkEachStep;
	vm.checkFriend_Crate = checkFriend_Crate;
	vm.reduceFood = reduceFood;
	vm.randomizeTricks = randomizeTricks;
	vm.startGame = startGame;
	vm.whiteDie=null;
	vm.blackDie=null;
	vm.playerPosition=0;
	vm.friend=[2,2,2,2];
	vm.food_crate=[6,6,6,6];
	vm.medicine=[0,0,0,0];
	vm.gun=[0,0,0,0];
	vm.bullet=[0,0,0,0];
	vm.katana_sword=[0,0,0,0];
	vm.gamenote=" Game Started ";
	vm.firstPage=true;
	vm.allPlayers=new Array();
	vm.player=1;
	vm.playernote="Player 1 to play"
	vm.playerCnt=0;
	vm.noOfSteps=50;

	function rolldie(){
		vm.rollingdice=true;
		vm.stopDie();
	};

	function stopDie(randNo){
		var randNo=Math.floor(Math.random() * 6) + 1;
		var randNoBlack=Math.floor(Math.random() * 6) + 1;
		vm.whiteDie=randNo;
		vm.blackDie=randNoBlack;
		$timeout(function(){
			vm.rollingdice=false;
			$(".cubeWhite .face").css("z-index","1");
			$(".cubeWhite .face"+ randNo).css("z-index","2");
			$(".cubeBlack .face").css("z-index","1");
			$(".cubeBlack .face"+ randNoBlack).css("z-index","2");
			vm.gamenote=" - ";
			addBlackDie();
			reduceFood();
			vm.checkFriend_Crate();
			$timeout( movePlayer ,100);
		},1200);

	};

	function movePlayer(){
		var playerPos=parseInt($(".player"+vm.player).parent().attr('class').split("step")[1]);
		var expectedPos= playerPos + vm.whiteDie;
		$(".step"+playerPos).children('.player'+vm.player).remove();
		if($(".step"+expectedPos).size()!=0){
			$(".step"+expectedPos).append('<div class="player'+vm.player+' playerQue"></div>');
			vm.playerPosition = expectedPos;
			checkEachStep(expectedPos, vm.player);
		}
		else{
			$(".step100").append('<div class="player'+vm.player+' playerQue"></div>');
			vm.playerPosition = 100;
			var index = vm.allPlayers.indexOf(vm.player);
			vm.allPlayers.splice(index,1);
			alert("Player"+vm.player+" Game Over.");
		}

		if((vm.playerCnt+1)<vm.allPlayers.length){
			vm.playerCnt++;						
			vm.player=vm.allPlayers[vm.playerCnt];
			vm.playernote="Player "+vm.player+" to play";
		}
		else{
			vm.playerCnt=0;			
			vm.player=vm.allPlayers[vm.playerCnt];
			vm.playernote="Player "+vm.player+" to play"
		}
		if(vm.allPlayers.length==0){
			vm.rollingdice=true;
			alert("All players lost the game, Please refresh to restart the game.");
		}
		console.log(vm.allPlayers);
	};

	function checkFriend_Crate(){
		if(vm.friend[(vm.player-1)]<=0 || vm.food_crate[(vm.player-1)]<=0)
		{
			if(vm.food_crate[(vm.player-1)]<=0){
				vm.food_crate[(vm.player-1)]=0;
				var index = vm.allPlayers.indexOf(vm.player);
				vm.allPlayers.splice(index,1);				
				alert('Player:'+vm.player+' You Lose Game, No Food');				
			}
			if(vm.friend[(vm.player-1)]<=0){
				vm.friend[(vm.player-1)]=0;
				var index = vm.allPlayers.indexOf(vm.player);
				vm.allPlayers.splice(index,1);				
				alert('Player:'+vm.player+' You Lose Game, No Friend');
			}
		}
	};

	function addBlackDie(){
		switch(vm.blackDie)
		{
			case 1:				
				vm.friend[(vm.player-1)]=vm.friend[(vm.player-1)]+1;
				vm.gamenote="Player: "+vm.player+" got a new friend.";
				break;
			case 2:
				vm.food_crate[(vm.player-1)]=vm.food_crate[(vm.player-1)]+2;
				vm.gamenote="Player: "+vm.player+" got a new food crate.";
				break;
			case 3:
				vm.medicine[(vm.player-1)]=vm.medicine[(vm.player-1)]+1;
				vm.gamenote="Player: "+vm.player+" got a medicine vial.";
				break;
			case 4:
				vm.gun[(vm.player-1)]=1;
				vm.gamenote="Player: "+vm.player+" got a gun/renewed gun.";
				break;
			case 5:
				vm.bullet[(vm.player-1)]=vm.bullet[(vm.player-1)]+1;
				vm.gamenote="Player: "+vm.player+" got a bullet.";
				break;
			case 6:
				vm.katana_sword[(vm.player-1)]=vm.katana_sword[(vm.player-1)]+1;
				vm.gamenote="Player: "+vm.player+" got a Katana sword.";
				break;
		}
	};

	function checkEachStep(expectedPos, player){
		if($(".step"+expectedPos).attr("data-trick")!=undefined){
			var trickNo = parseInt($(".step"+expectedPos).attr("data-trick"));

			switch(trickNo)
			{
				case 1:
					//Go Home
					vm.gamenote="Player"+player+" Start Again...";
					$timeout(function(){
						var playerPos=parseInt($(".player"+player).parent().attr('class').split("step")[1]);
						var expectedPos= 0;
						$(".step"+playerPos).children('.player'+player+'.playerQue').remove();
						$(".step"+expectedPos).append('<div class="player'+player+' playerQue"></div>');
						vm.playerPosition = expectedPos;
					},1000);
					break;
				case 2:
					//2: Snakes kill, Need Katana
					if(vm.katana_sword[(player-1)]!=0){
						vm.katana_sword[(player-1)]=vm.katana_sword[(player-1)]-1;
						vm.gamenote="You lost your Katana.";
					}
					else{
						if(vm.friend[(player-1)]>0){
							vm.friend[(player-1)]=vm.friend[(player-1)]-1;
							vm.gamenote="You lost a friend, No Katana";
						}
						else{
							
							var index = vm.allPlayers.indexOf(player);
							vm.allPlayers.splice(index,1);							
							alert("Player "+player +' You Lose Game.');							
						}
					}
					break;
				case 3:
					//3: Bear attack: Need Gun with Bullets.
					if(	vm.gun[(player-1)]!=0 && vm.bullet[(player-1)]!=0){
						if(vm.bullet[(player-1)]>=2)
						{
							vm.bullet[(player-1)]=vm.bullet[(player-1)]-2;
							vm.gamenote="You killed the Bear.";
						}
						else{
							vm.bullet[(player-1)]=0;
							vm.friend[(player-1)]=vm.friend[(player-1)]-1;
							vm.gamenote="You lost a friend, less bullets";
						}
					}
					else if(vm.gun[(player-1)]==0){
						vm.friend[(player-1)]=vm.friend[(player-1)]-1;
						vm.gamenote="You lost a friend, no gun";
					}
					else if(vm.bullet[(player-1)]==0){
						vm.friend[(player-1)]=vm.friend[(player-1)]-1;
						vm.gamenote="You lost a friend, no bullets";
					}
					break;
				case 4:
					//4: Viral Fewer: Need Medicine
					if(vm.medicine[(player-1)]!=0){
						vm.medicine[(player-1)]=vm.medicine[(player-1)]-1;
						vm.gamenote="Consumed a medicine vial.";
					}
					else{
						vm.friend[(player-1)]=vm.friend[(player-1)]-1;
						vm.gamenote="You lost a friend, no Medicine.";
					}
					break;
				case 5:
					//5: Town: Free Crate.
					vm.food_crate[(player-1)]=vm.food_crate[(player-1)]+1;
					vm.gamenote="Townsmen gave you a crate of Food.";
					break;
				case 6:
					//6: Jump: 2 Places
					vm.gamenote="Jumping 2 Places";
					$timeout(function(){
						var playerPos=parseInt($(".player"+player).parent().attr('class').split("step")[1]);
						var expectedPos= playerPos + 2;
						$(".step"+playerPos).children('.player'+player+'.playerQue').remove();
						$(".step"+expectedPos).append('<div class="player'+player+' playerQue"></div>');
						vm.playerPosition = expectedPos;
						vm.gamenote="You moved ahead 2 Places";
					},1000);
					break;
				case 7:
					//7: Swamp: Go Back 4 Places
					vm.gamenote="Going back 4 Places";
					$timeout(function(){
						var playerPos=parseInt($(".player"+player).parent().attr('class').split("step")[1]);
						var expectedPos= playerPos - 4;
						$(".step"+playerPos).children('.player'+player+'.playerQue').remove();
						if(expectedPos>0){
							$(".step"+expectedPos).append('<div class="player'+player+' playerQue"></div>');
							vm.playerPosition = expectedPos;
						}
						else{
							$(".step0").append('<div class="player'+player+' playerQue"></div>');
							vm.playerPosition = 0;
						}
						vm.gamenote="You moved back 4 Places";
					},1000);
					break;
			}
		}
	};

	function reduceFood(){
		var totalFrnds = vm.friend[(vm.player-1)];
		vm.food_crate[(vm.player-1)]=vm.food_crate[(vm.player-1)]-(totalFrnds*0.25);
	};

	function randomizeTricks(){
		RandomizeTricks.randomize(vm.noOfSteps);
	};

	function startGame(){
		vm.firstPage=false;
		if(vm.playergraph1==true){
			StepsWriter.writeSteps("graph1", vm.noOfSteps);
		}
		else{
			StepsWriter.writeSteps("graph2", vm.noOfSteps);
		}
		vm.randomizeTricks();
		for(var i=0;i<vm.playersSelected;i++){
			vm.allPlayers.push((i+1));
		}
		vm.player=vm.allPlayers[0];
		vm.playerCnt=0;
		$("#rulesPopup").modal("show");
	}	
};
