angular.module("DiceRoll")
	.service("RandomizeTricks", RandomizeTricks);

function RandomizeTricks(){
	var vm=this;
	vm.randomize = randomize;

	function randomize(steps){		
		for(var i=0;i<Math.floor(steps/7);i++){
			var randStep=Math.floor(Math.random() * (steps-1)) + 1;
			var randTrick=Math.floor(Math.random() * 7) + 1;
			switch(randTrick)
			{
				case 1:
					$(".step"+randStep).attr('data-trick',"1");
					$(".step"+randStep).html('Start Again<br/><img src="./imgs/home.png" height="25" width="25" />');
					break;
				case 2:
					$(".step"+randStep).attr('data-trick',"2");
					$(".step"+randStep).html('Snakes <br/><img src="./imgs/snake.png" height="25" width="25" />');
					break;
				case 3:
					$(".step"+randStep).attr('data-trick',"3");
					$(".step"+randStep).html('Bear attack<br/><img src="./imgs/bear.png" height="25" width="25" />');
					break;
				case 4:
					$(".step"+randStep).attr('data-trick',"4");
					$(".step"+randStep).html('Viral Fewer<br/><img src="./imgs/viral_fewer.png" height="25" width="25" />');
					break;
				case 5:
					$(".step"+randStep).attr('data-trick',"5");
					$(".step"+randStep).html('Town<br/><img src="./imgs/Town.png" height="25" width="25" />');
					break;
				case 6:
					$(".step"+randStep).attr('data-trick',"6");
					$(".step"+randStep).html('Jump<br/><img src="./imgs/jump.png" height="25" width="25" />');
					break;
				case 7:
					$(".step"+randStep).attr('data-trick',"7");
					$(".step"+randStep).html('Swamp<br/><img src="./imgs/swamp.png" height="25" width="25" />');
					break;
			}
		}
	};
}
