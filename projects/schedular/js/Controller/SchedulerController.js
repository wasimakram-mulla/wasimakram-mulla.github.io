var schObj=new Array();

var Scheduler = function(){}
	
Scheduler.init = function(){
		$('#dtp').datepicker();
		Scheduler.setClockTimings();
		Scheduler.callEvents();
		setInterval(function(){
			var chkMatch=Scheduler.matchSchedularDateandTime();
			if(chkMatch!=-123){
				console.log(chkMatch);
				schObj[chkMatch].dismiss=1;
				alert("ALARM !!!\n\nCourse: "+schObj[chkMatch].course+"\nPage No: "+schObj[chkMatch].coursepgnum+"\nComment: "+schObj[chkMatch].comment);
			}
			else{
				console.log(chkMatch);
			}
		},60000);
}
	
Scheduler.callEvents = function(){
		$("#addScheduler").bind("click", function(){
			Scheduler.addScheduler();
		});
	}
	
Scheduler.setClockTimings = function(){
		for(var i=0;i<24;i++){
			if(i<10){
				$('#hr').append('<option>0'+i+'</option>');
			}
			else{
				$('#hr').append('<option>'+i+'</option>');
			}
		}
		
		for(var i=0;i<60;i++){
			if(i<10){
				$('#min').append('<option>0'+i+'</option>');
			}
			else{
				$('#min').append('<option>'+i+'</option>');
			}
		}
}

/** Function To Add Scheduler */
Scheduler.addScheduler = function(){
		if($('#dtp').val()!="" && $('#course').val()!="" && $('#coursepgnum').val()!="" && $('#SchedulerComment').val()!=""){
			if(Scheduler.checkDateAndTime()){
				var dtpval=$('#dtp').val();
				var course=$('#course').val();
				var coursepgnum=$('#coursepgnum').val();
				var comment=$('#SchedulerComment').val();
				var hr= $('#hr').val();
				var min= $('#min').val();
				var chk=Scheduler.checkCourseScheduler(course);
				console.log(chk);
				if(chk != -123){
					/* Update Scheduler */					
					schObj[chk].dtpval=dtpval;
					schObj[chk].course=course;
					schObj[chk].coursepgnum=coursepgnum;
					schObj[chk].comment=comment;
					schObj[chk].hr= hr;
					schObj[chk].min= min;
				}
				else{
					/* Add Scheduler */
					var tmpObj = {};
					tmpObj.dtpval=dtpval;
					tmpObj.course=course;
					tmpObj.coursepgnum=coursepgnum;
					tmpObj.comment=comment;
					tmpObj.hr= hr;
					tmpObj.min= min;
					tmpObj.dismiss = 0;
					schObj.push(tmpObj);
				}
			}
			else{
				alert('Sorry! The Time has Past Away.');
			}			
		}
		else{
			alert('Entity Missing');
		}
}

/** This Function Checks the Date and Time so as to Add the Scheduler */
Scheduler.checkDateAndTime = function(){
	var dt=new Date();
	var dtpDate=$("#dtp").val();
	var dtphrs=parseInt($("#hr").val());
	var dtpmins=parseInt($("#min").val());
	if(parseInt(dtpDate.split('/')[2])==dt.getFullYear()){
		if(parseInt(dtpDate.split('/')[0])==(dt.getMonth()+1)){
			if(parseInt(dtpDate.split('/')[1])==dt.getDate()){
				if(dtphrs==dt.getHours()){
					if(dtpmins>dt.getMinutes()){
						return true;
					}
					else{
						return false;
					}
				}
				else if(dtphrs>dt.getHours()){
					return true;
				}
			}
			else if(parseInt(dtpDate.split('/')[1])>dt.getDate()){
				return true;
			}
		}
		else if(parseInt(dtpDate.split('/')[0])>(dt.getMonth()+1)){
			return true;
		}
	}
	else if(parseInt(dtpDate.split('/')[2])>dt.getFullYear()){
		return true;
	}
	return false;
}

/** This Function Matches the Date and Time as per Added Scheduler and when time is up Alarm is Popped */
Scheduler.matchSchedularDateandTime = function(){
	var dt=new Date();
	var flag=-123;
	for(var i=0;i<schObj.length;i++){
	var dtphrs = schObj[i].hr;
	var dtpmins = schObj[i].min;
		if(schObj[i].dismiss==0){
			console.log("in Dismiss");
			var dtpDate=schObj[i].dtpval;
			if(parseInt(dtpDate.split('/')[2])==dt.getFullYear()){
				console.log("in Year");
				if(parseInt(dtpDate.split('/')[0])==(dt.getMonth()+1)){
					console.log("in Month");
					if(parseInt(dtpDate.split('/')[1])==dt.getDate()){
						console.log("in Date");
						if(dtphrs==dt.getHours()){
							console.log("in Hours");
							if(dtpmins<=(dt.getMinutes()+1)){
								return i;
							}
							else{
								return flag;
							}
						}
						else if(dtphrs<dt.getHours()){
							return i;
						}
					}
					else if(parseInt(dtpDate.split('/')[1])<dt.getDate()){
						return i;
					}
				}
				else if(parseInt(dtpDate.split('/')[0])<(dt.getMonth()+1)){
					return i;
				}
			}
			else if(parseInt(dtpDate.split('/')[2])<dt.getFullYear()){
				return i;
			}
		} // dismiss condn
	} // loop
	return flag;
}

/** To Check whether to Scheduler is Already present in Object */
Scheduler.checkCourseScheduler = function(course){
	var tmpchk = -123;		//Here -123 is an Garbage Value
	for(var i=0;i<schObj.length;i++){
		if(schObj[i].course==course){			
			return i;
			break;
		}
	}
	return tmpchk;	
}

/** Function To Enter only Numbers */
Scheduler.numbersonly = function(e){
				var unicode=e.charCode? e.charCode : e.keyCode
				
				if (unicode!=8){ //if the key isn't the backspace key (which we should allow)
				if (unicode<48||unicode>57) //if not a number
				return false //disable key press
				}
}