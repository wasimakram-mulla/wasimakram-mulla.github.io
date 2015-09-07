/* 
	Last Modified: 06/02/2015
	Creator: Wasimakram Mulla.
	workingEmployee Status='pending / allocated';
	Finalized Code on: 27-01-2015.
	Code-Version: 1.6
	Pending: AddOrder| payment method is pending and for CC show the textBox of payment Id.  
 */

/** A Complete Controller for Add Order Page - this controller consists following functions: 
1. searchCustomer - Will search for customer whose number is searched. / [HTTP Request]
2. showProducts - Will show all the products for selection (e.g French Fries, Softies, etc.) / [HTTP Request]
3. selectProduct - Will create a Object of all the selected Items. / [UI Code]
4. addToDatabase - Will push the orders to the Data Base / [HTTP Request]
5. clearCheckBoxes - Will Clear the Object Selection done in selectProduct and also will clear them from the UI. / [UI Code]
6. showDoneOrders - Will show all the Orders which are in done from the kitchen but the Customer have not Collected the Order. / [HTTP Request]
7. finishFinalOrder- Will Update the UI after the Customer have taken his order. There is a Finish It button on the UI which will call this function and respective Order will be 	
					 finished. Changes status in DB to Complete from Done. / [HTTP Request]

Following are some Important Variables Used:
1. globalFlagCheck- Important for checking whether we have the user or its an New User.
2. orderContent - This Object stores the selected product/s.
3. products -	This Object stores the total products available in the system.
4. doneOrders -	This Object stores total products which are in 'Done' status but are 'not completed' yet.
*/
CoreStructure.controller("OrderController", function($scope, $http, $templateCache){	
	var globalFlagCheck=0;
	var mainScope=this;
	mainScope.orderContent = new Array();
	mainScope.products = new Array();
	mainScope.doneOrders = new Array();
	mainScope.billContent = new Array();
	mainScope.totPrice=0;
	mainScope.vatAmt=5.5;
	mainScope.netAmount=0;
	mainScope.OId='';
	mainScope.paymentId='';
	var showDoneOrdersTimeOut='';
	
	this.searchCustomer = function(data){
		if($scope.oNo!=undefined){
			if($scope.oNo!=''){
				if(data.toString().length==10){
					$("#printBtn").removeAttr('disabled');
					$("#paymentBtn").removeAttr('disabled');
					globalFlagCheck=0;
					$("#oName").attr('disabled', 'disabled');
					this.clearCheckBoxes();
					/* $http({
					method: 'POST',
					url: 'php_controllers/master.php?action=searchCustomer',
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					data: $scope.oNo,
					cache: $templateCache
					}).
					success(function(data, status, headers, config) {
						if(data.name!=null){
							$scope.oName=data.name;
							mainScope.OId=parseInt(data.Oid)+1;
							$("#oName").val(data.name);
							globalFlagCheck = 1;							
						}
						else{							
							$("#oName").val('');
							$scope.oName='';
							$("#oName").removeAttr('disabled');
							$("#oName").focus();
						}
					}).
					error(function(data, status, headers, config) {
						alert('Service Error');
					}); */
					alert('All the Database calls are blocked for Security reasons... Thanks.');
				}
			}
		}
	};
	
	this.showProducts = function(){
		/* $http({
			method: 'POST',
			url: 'php_controllers/master.php?action=showProducts',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			cache: $templateCache
		}).
		success(function(data, status, headers, config) {
			if(data!=null){
				mainScope.products=data;				
				for(var i=0;i<data.length;i++){
					mainScope.products[i].cnt=false;
					mainScope.products[i].index=i;
					mainScope.products[i].quan=1;
				}
			}
			else{
				alert('Data Absent');
			}			
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}); */
		alert('All the Database calls are blocked for Security reasons... Thanks.');
	};
	
	this.selectProduct = function(prod, flag, price, prodnm, prodQuan){
		
		if(flag!=true){
			this.orderContent.push(prod);
			var tmpOrder = {
				"prodid":prod,
				"prodnm":prodnm,
				"price":price,
				"amount":(price*prodQuan),
				"quan":prodQuan
			}
			mainScope.billContent.push(tmpOrder);
			mainScope.totPrice = parseInt(mainScope.totPrice) + (parseInt(price)*parseInt(prodQuan));
			mainScope.netAmount=(mainScope.totPrice)+(mainScope.totPrice*mainScope.vatAmt/100);
		}
		else{
			var tmpIndex;
			for(var i=0;i<this.orderContent.length;i++){
				if(prod==this.orderContent[i]){
					tmpIndex=i;
					break;
				}
			}
			this.orderContent.splice(tmpIndex,1);
			mainScope.billContent.splice(tmpIndex,1);
			mainScope.totPrice = parseInt(mainScope.totPrice) - (parseInt(price)*parseInt(prodQuan));
			mainScope.netAmount=(mainScope.totPrice)+(mainScope.totPrice*mainScope.vatAmt/100);
		}
	};
	
	this.changeQuantity = function(prod, flag, price, prodQuan){
		if(flag==true){
			var tmpIndex=0;
			for(var i=0;i<mainScope.billContent.length;i++){
				if(mainScope.billContent[i].prodid==prod){
					tmpIndex=i;
					break;
				}
			}
			
			mainScope.totPrice = parseInt(mainScope.totPrice) - (parseInt(price)*parseInt(mainScope.billContent[tmpIndex].quan));
			mainScope.totPrice = parseInt(mainScope.totPrice) + (parseInt(price)*parseInt(prodQuan));
			mainScope.netAmount=(mainScope.totPrice)+(mainScope.totPrice*mainScope.vatAmt/100);
			mainScope.billContent[tmpIndex].amount = parseInt(price)*parseInt(prodQuan);
			mainScope.billContent[tmpIndex].quan = prodQuan;
			//console.log(mainScope.billContent[tmpIndex].quan + '' + prodQuan)
		}
	};
	
	this.addToDatabase = function(){		
		if($scope.oNo!=undefined && $scope.oName!=undefined){
			if($scope.oNo!='' && $scope.oName!='' && $(".checkBx:checked").length!=0){
				tmpflag = globalFlagCheck;
				var tmpQuans= new Array();
				for(var i=0;i<mainScope.billContent.length;i++){
					tmpQuans[i]=mainScope.billContent[i].quan;
				}
				var FormData = {
				  'contactNo' : $scope.oNo,
				  'contactName' : $scope.oName,
				  'order_content' : JSON.stringify(this.orderContent),
				  'order_quan' : JSON.stringify(tmpQuans),
				  'contact_flag' : tmpflag,
				  'pay_id' : mainScope.paymentId,
				  'order_amount' : mainScope.netAmount
				};
				/* $http({
					method: 'POST',
					url: 'php_controllers/master.php?action=addOrder',
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					data: FormData,
					cache: $templateCache
				}).
				success(function(data, status, headers, config) {
					if(data==true){
						alert('Data Successfully Inserted');						
					}
					else{
						alert('Data Insertion failed');
					}
					$scope.oNo='';
					$scope.oName='';
					$('#oNo').focus();					
				}).
				error(function(data, status, headers, config) {
					alert('Service Error');
				});  */
				alert('All the Database calls are blocked for Security reasons... Thanks.');
					this.clearCheckBoxes();
			}else{
				alert('Blank Entities');
				mainScope.billContent=[];
				mainScope.totPrice=0;
				mainScope.netAmount=0;
			}
		}else{
			alert('Undefined Entities!!!');
			mainScope.billContent=[];
			mainScope.totPrice=0;
			mainScope.netAmount=0;
		}
	}
	
	this.clearCheckBoxes = function(){
		this.orderContent.length=0;
		$(".checkBx:checked").removeAttr('checked');
		for(var i=0;i<mainScope.products.length;i++){
			mainScope.products[i].cnt=false;
			mainScope.products[i].quan=1;
		}
		$("#printBtn").attr('disabled');
		$("#paymentBtn").attr('disabled');
		mainScope.billContent=[];
		mainScope.totPrice=0;
		mainScope.netAmount=0;
		mainScope.OId='';
	};
	
	this.makePayment = function(payType){
		var dt=new Date();
		if(payType=='cash'){
			var tmpPayObj={
				'payType': payType,
				'trans_id': '',
				'trans_date':dt.toString()
			};
		}
		else{
			var tmpPayObj={
				'payType': payType,
				'trans_id': $scope.paymentId,
				'trans_date':dt.toString()
			};			
		}
		
		/* $http({
			method: 'POST',
			url: 'php_controllers/master.php?action=makePayment',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data:tmpPayObj,
			cache: $templateCache
		}).
		success(function(data, status, headers, config) {
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			console.log(result.data);
			if(result.data==false){
				alert('Payment not inserted');
			}
			else{
				mainScope.paymentId=result.data;
			}
			$('#nxtOrder').removeAttr('disabled');
			$('#paymentBtn').attr('disabled','disabled');
		}); */
		alert('All the Database calls are blocked for Security reasons... Thanks.');
	};
	
	this.changePayment = function(payType){
		if(payType == 'cc'){
			$('#paymentBtn').attr('disabled', 'disabled');
		}else{
			if($scope.oNo!=null && $scope.oNo!=undefined){
				$('#paymentBtn').removeAttr('disabled');
			}else{
				$('#paymentBtn').attr('disabled', 'disabled');
			}
		}
		$scope.paymentId='';
		$("#paymentId").val("");
		setTimeout(function(){$("#paymentId").focus()},100);
	};
	
	this.showDoneOrders = function(){
		/* $http({
			method: 'POST',
			url: 'php_controllers/master.php?action=showDoneOrders',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			cache: $templateCache
		}).
		success(function(data, status, headers, config) {
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			mainScope.doneOrders = result.data;
			showDoneOrdersTimeOut = setTimeout(function(){
				mainScope.showDoneOrders();
			},5000);
		}); */
		alert('All the Database calls are blocked for Security reasons... Thanks.');
	};
	
	this.finishFinalOrder = function(orderId){		
		/* $http({
			method: 'POST',
			url: 'php_controllers/master.php?action=finishDoneOrders',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data:orderId,
			cache: $templateCache
		}).
		success(function(data, status, headers, config) {
			console.log(showDoneOrdersTimeOut);
			clearTimeout(showDoneOrdersTimeOut);
			mainScope.showDoneOrders();
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}); */
		alert('All the Database calls are blocked for Security reasons... Thanks.');
	};
	
	this.printBill = function(){
		var printContents = document.getElementById('billToPrint').innerHTML;
		var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no, width=400,height=auto');
			popupWin.document.open()
			popupWin.document.write('<html><head><link rel="stylesheet" href="css/bootstrap.min.css" /><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()"><center><h3>Assasa Technologies</h3>51/1372, MitthaNagar, Kondhwa Khurd,Pune 411 048, Maharashtra, India.</center><br/>' + printContents + '<br/></html>');
			popupWin.document.close();
	};
	
	this.bindEvents = function(){
		$('#paymentId').bind('keyup', function(e){		
			if(!$(this).val()){
				$('#paymentBtn').attr('disabled','disabled');
			}else{
				$('#paymentBtn').removeAttr('disabled');
				
			}			
		});
		$('#paymentId').bind('keydown', function(e){	
			return e.which !== 32;
		});
	};
	
	this.showDoneOrders();
	this.showProducts();
	this.bindEvents();	
});

/** A Complete Controller for View Order Page - this controller consists following functions: 
1. updateScope   - 	Will update the Global orders in Queue after every 5000 milliseconds. / [HTTP Request]
2. completeOrder - 	Will complete the orders in the kitchen and will updated the order as "Done"[not complete yet]. 
					These Done orders will be shown of the Display Screen. / [HTTP Request]
3. initAssignment- 	Will initially assign the work whenever the window of View Orders is open or refreshed. / [UI Code]
4. autoAssignWork-	Will automatically assign work to all employees who are "idle" at the moment. / [UI Code]

Following are Important Variables Used:
1. empCnt - Stores the total count of employees.
2. workingEmployee - This Object stores the complete information about which employee is working and which one is Idle.
3. completeObject - This Object holds complete data of pending orders and orders in Queue. later it is just modified for Orders in Queue.
4. initAssign - This flag will run only when page is loaded and with help of this flag we assign task to all employees at the beginning only.
*/
CoreStructure.controller("ViewController", function($scope, $http, $templateCache){
	var superObj = this;
	superObj.empCnt = 4;	//Total Employee Count
	superObj.workingEmployee = new Array();
	superObj.completeObject='';
	superObj.initAssign=false;
	/* Below loop for assigning Employees whenever viewController is called */
	for(var i=0;i<superObj.empCnt;i++){
		var tmpObj={};
		tmpObj.employee_id=i;
		tmpObj.employeeStatus='free';
		superObj.workingEmployee.push(tmpObj);
	}
	this.updateScope = function(){		
		/* $http({
			method: 'POST',
			url: 'php_controllers/master.php?action=viewOrder',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			cache: $templateCache
		}).
		success(function(data, status, headers, config) {
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			superObj.completeObject= result.data;
			if(superObj.completeObject.length!=0){
				if(superObj.initAssign==false){
					superObj.initAssign=true;
					superObj.initAssignment();
				}
				else{
					var localAssignedEmployees=0;
					for(var i=0;i<superObj.workingEmployee.length;i++){
						if(superObj.workingEmployee[i].employeeStatus=='allocated'){
							localAssignedEmployees++;
						}
					}
					superObj.completeObject.splice(0,localAssignedEmployees);
					superObj.autoAssignWork();
				}
			}
			setTimeout(function() {
				$scope.$apply(function() {
					superObj.updateScope();
				});
			}, 5000);
		});	 */	
		alert('All the Database calls are blocked for Security reasons... Thanks.');		
	};
	
	this.completeOrder = function(orderId, emplId){
		var order = {
			'orderId':orderId
		}
		/* $http({
			method: 'POST',
			url: 'php_controllers/master.php?action=completeOrder',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: order,
			cache: $templateCache
		}).
		success(function(data, status, headers, config) {
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
		}); */
		
		for(var i=0;i<superObj.workingEmployee.length;i++){
			if(i==emplId){
				superObj.workingEmployee[emplId].order_id='';
				superObj.workingEmployee[emplId].cust_id='';
				superObj.workingEmployee[emplId].order_content='';
				superObj.workingEmployee[emplId].order_quantity='';
				superObj.workingEmployee[emplId].employeeStatus='free';
				superObj.autoAssignWork(emplId);
				break;
			}
		}
	};
	superObj.updateScope();
	
	this.initAssignment = function(){
		var tmpObjs=0;
		if(superObj.completeObject.length >= superObj.empCnt){
			for(var i=0;i<superObj.empCnt;i++){
				superObj.workingEmployee[i].order_id=superObj.completeObject[i].order_id;
				superObj.workingEmployee[i].cust_id=superObj.completeObject[i].cust_id;
				superObj.workingEmployee[i].order_content=superObj.completeObject[i].order_content;
				superObj.workingEmployee[i].order_quantity=superObj.completeObject[i].order_quantity;
				superObj.workingEmployee[i].employeeStatus='allocated';
				tmpObjs++;
			}
		}
		else{
			for(var i=0;i<superObj.completeObject.length;i++){
				superObj.workingEmployee[i].order_id=superObj.completeObject[i].order_id;
				superObj.workingEmployee[i].cust_id=superObj.completeObject[i].cust_id;
				superObj.workingEmployee[i].order_content=superObj.completeObject[i].order_content;
				superObj.workingEmployee[i].order_quantity=superObj.completeObject[i].order_quantity;
				superObj.workingEmployee[i].employeeStatus='allocated';
				tmpObjs++;
			}
		}
		superObj.completeObject.splice(0,tmpObjs);
	};
	
	this.autoAssignWork = function(emplId){
		if(superObj.completeObject.length!=0){
			if(emplId){
				superObj.workingEmployee[emplId].order_id=superObj.completeObject[0].order_id;
				superObj.workingEmployee[emplId].cust_id=superObj.completeObject[0].cust_id;
				superObj.workingEmployee[emplId].order_content=superObj.completeObject[0].order_content;
				superObj.workingEmployee[emplId].order_quantity=superObj.completeObject[0].order_quantity;
				superObj.workingEmployee[emplId].employeeStatus='allocated';
				superObj.completeObject.splice(0,1);
			}
			else{
				for(var i=0;i<superObj.workingEmployee.length;i++){
					if(superObj.workingEmployee[i].employeeStatus=='free')
					{
						superObj.workingEmployee[i].order_id=superObj.completeObject[0].order_id;
						superObj.workingEmployee[i].cust_id=superObj.completeObject[0].cust_id;
						superObj.workingEmployee[i].order_content=superObj.completeObject[0].order_content;
						superObj.workingEmployee[i].order_quantity=superObj.completeObject[0].order_quantity;
						superObj.workingEmployee[i].employeeStatus='allocated';
						superObj.completeObject.splice(0,1);
						break;
					}
				}
			}
		}
	}
});

/** A Complete Controller for Display Order Page - this controller consists following functions:
1. fetchDoneOrders -	Will fetch only the order id's of Orders which are in Done status. and will show it to the UI, it will automatically gets updated after every 5000 
						milliseconds. / [HTTP Request]
						
Following are Important Variables Used:
1. doneOrders - Stores the total orders id's of Orders which are in "Done" status but not "Complete".
*/
CoreStructure.controller("DispController", function($scope, $http, $templateCache){
	var superObj = this;
	superObj.doneOrders = new Array();
	
	superObj.fetchDoneOrders = function(){
		/* $http({
			method: 'POST',
			url: 'php_controllers/master.php?action=fetchDoneOnlyOrders',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			cache: $templateCache
		}).
		success(function(data, status, headers, config) {				
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			superObj.doneOrders = result.data;
			setTimeout(function(){
				superObj.fetchDoneOrders();
			},5000);
		}); */
		alert('All the Database calls are blocked for Security reasons... Thanks.');
	};
	superObj.fetchDoneOrders();
});