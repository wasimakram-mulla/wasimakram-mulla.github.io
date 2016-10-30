angular.module("DiceRoll")
	.service("StepsWriter", StepsWriter);

function StepsWriter(){
	var vm=this;
	vm.writeSteps=writeSteps;

	function writeSteps(graphtype, noOfSteps){
		if(noOfSteps==100){
			if(graphtype=="graph1"){
				//graph type 1
				var cnt=0;
				for(var i=1;i<=100;i++){
					if((i>=1 && i<=12) || (i>=29 && i<=40) || (i>=57 && i<=68) || (i>=85 && i<=96)){
						if(i==1 || i==29 || i==57 || i==85){
							cnt=i;
							$(".graphsteps").append('<div class="col-md-12 graphstep'+cnt+'">');
						}
						$(".graphsteps .graphstep"+cnt).append('<div class="step'+i+' step horizontal">'+i+'</div>');
						
						if(i==12 || i==40 || i==68 || i==96){
							$(".graphsteps").append('</div>');
						}
					}
					else if((i>=13 && i<=14) || (i>=41 && i<=42) || (i>=69 && i<=70) || (i>=97 && i<=98)){
						$(".graphsteps").append('<div class="col-md-12"><div class="step'+i+' step verticalRight">'+i+'</div></div>');
					}
					else if((i>=15 && i<=26) || (i>=43 && i<=54) || (i>=71 && i<=82) || (i>=99 && i<=100)){
						if(i==15 || i==43 || i==71 || i==99){
							cnt=i;
							$(".graphsteps").append('<div class="col-md-12 graphstep'+cnt+'">');
						}
						if(i!=100){
							$(".graphsteps .graphstep"+cnt).append('<div class="step'+i+' step horizontalRight">'+i+'</div>');
						}else{
							$(".graphsteps .graphstep"+cnt).append('<div class="step'+i+' step horizontalRight end">'+i+'</div>');
						}
						
						if(i==26 || i==54 || i==82 || i==100){
							$(".graphsteps").append('</div>');
						}
					}
					else if((i>=27 && i<=28) || (i>=55 && i<=56) || (i>=83 && i<=84)){
						$(".graphsteps").append('<div class="col-md-12"><div class="step'+i+' step verticalLeft">'+i+'</div></div>');
					}
				}
			}else{
				//graph type 2
				var cnt=0;
				for(var i=1;i<=100;i++){
					if((i>=1 && i<=12) || (i>=25 && i<=36) || (i>=49 && i<=60) || (i>=73 && i<=84) || (i>=97 && i<=100)){
						if(i==1 || i==25 || i==49 || i==73 || i==97){
							cnt=i;
							$(".graphsteps").append('<div class="col-md-12 graphstep'+cnt+'">');
						}
							if(i!=100){							
								$(".graphsteps .graphstep"+cnt).append('<div class="step'+i+' step horizontal">'+i+'</div>');
							}
							else{
								$(".graphsteps .graphstep"+cnt).append('<div class="step'+i+' step horizontal end">'+i+'</div>');							
							}
						
						if(i==12 || i==36 || i==60 || i==84 ||  i==100){
							$(".graphsteps").append('</div>');
						}
					}
					else if((i>=13 && i<=24) || (i>=37 && i<=48) || (i>=61 && i<=72) || (i>=85 && i<=96)){
						if(i==13 || i==37 || i==61 || i==85){
							cnt=i;
							$(".graphsteps").append('<div class="col-md-12 graphstep'+cnt+'">');
						}
							$(".graphsteps .graphstep"+cnt).append('<div class="step'+i+' step horizontalRight">'+i+'</div>');
						
						if(i==24 || i==48 || i==72 || i==96){
							$(".graphsteps").append('</div>');
						}
					}
				}
			}
		}
		else if(noOfSteps==50){
			if(graphtype=="graph1"){
				//graph type 1
				var cnt=0;
				for(var i=1;i<=50;i++){
					if((i>=1 && i<=12) || (i>=29 && i<=40)){
						if(i==1 || i==29){
							cnt=i;
							$(".graphsteps").append('<div class="col-md-12 graphstep'+cnt+'">');
						}
						$(".graphsteps .graphstep"+cnt).append('<div class="step'+i+' step horizontal">'+i+'</div>');
						
						if(i==12 || i==40){
							$(".graphsteps").append('</div>');
						}
					}
					else if((i>=13 && i<=14) || (i>=41 && i<=42)){
						$(".graphsteps").append('<div class="col-md-12"><div class="step'+i+' step verticalRight">'+i+'</div></div>');
					}
					else if((i>=15 && i<=26) || (i>=43 && i<=50)){
						if(i==15 || i==43){
							cnt=i;
							$(".graphsteps").append('<div class="col-md-12 graphstep'+cnt+'">');
						}
						if(i!=50){
							$(".graphsteps .graphstep"+cnt).append('<div class="step'+i+' step horizontalRight">'+i+'</div>');
						}else{
							$(".graphsteps .graphstep"+cnt).append('<div class="step'+i+' step horizontalRight end"></div>');
						}
						
						if(i==26 || i==50){
							$(".graphsteps").append('</div>');
						}
					}
					else if((i>=27 && i<=28)){
						$(".graphsteps").append('<div class="col-md-12"><div class="step'+i+' step verticalLeft">'+i+'</div></div>');
					}
				}
			}else{
				//graph type 2
				var cnt=0;
				for(var i=1;i<=50;i++){
					if((i>=1 && i<=12) || (i>=25 && i<=36) || (i>=49 && i<=50)){
						if(i==1 || i==25 || i==49){
							cnt=i;
							$(".graphsteps").append('<div class="col-md-12 graphstep'+cnt+'">');
						}
							if(i!=50){							
								$(".graphsteps .graphstep"+cnt).append('<div class="step'+i+' step horizontal">'+i+'</div>');
							}
							else{
								$(".graphsteps .graphstep"+cnt).append('<div class="step'+i+' step horizontal end"></div>');							
							}
						
						if(i==12 || i==36 ||  i==50){
							$(".graphsteps").append('</div>');
						}
					}
					else if((i>=13 && i<=24) || (i>=37 && i<=48) ){
						if(i==13 || i==37 ){
							cnt=i;
							$(".graphsteps").append('<div class="col-md-12 graphstep'+cnt+'">');
						}
							$(".graphsteps .graphstep"+cnt).append('<div class="step'+i+' step horizontalRight">'+i+'</div>');
						
						if(i==24 || i==48){
							$(".graphsteps").append('</div>');
						}
					}
				}
			}
		}
		else{
			alert("Number of Steps can be either 100 or 50");
		}
	}	//Writing Steps to method ends
	
};
