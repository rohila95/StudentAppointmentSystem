var loginUID ="";
var loggedIn ="0";
var isAdmin = false;
var adminType= 0;
var inBTWAddition = false;
var curIPunderSugg="";
var currTutionPSem = 0;
var projOptionStr ='<option value="None-0">None</option><option value="createNew-">CreateNew</option>';
var allProjects=[];
var nextSemYear ="";
var colUnderSearch="";
var existingSemYear ="";
var newSemYear = "";
var curSearchStr="";
var curColNum="";
var curAccYear = "";
// var cursemester ="";
var SERVERHOST ="Dev";
//var SERVERHOST ="Prod";
// var SERVERHOST ="Dev_karan";
var curSemEndDate="";
var curSemStartDate="";
var popUpTimeOut = 3000;
var isExistingAppt = false;
var addPositionCouter = 0;
var curentPostionTR = null;
// just a test to commit only in the branch MultipleProjectIPs
function errorPopUpWithRD(errMsg){
	$('#errorModal .modal-body').html("<p>"+errMsg+"</p>");
	 $('#errorModal').on('hidden.bs.modal', function (e) {
				$('#errorModal').off();
					window.location.href = "/"+SERVERHOST+"_StudentAppointmentSystem/home.php";
					// window.location.href =
					// "/Prod_StudentAppointmentSystem/home.php";
		});
	 
	 $('#errorModal').on('shown.bs.modal', function (e) {
		
			/*
			 * $("#errorModal").fadeOut( popUpTimeOut, function() {
			 * $("#errorModal").modal("hide"); });
			 */
	 });	 
	 
	$("#errorModal").modal("show");
	 $("#errorModal").css("z-index","1100");
}



function errorPopUp(errMsg){
	$('#errorModal .modal-body').html("<p>"+errMsg+"</p>");
	 $('#errorModal').on('hidden.bs.modal', function (e) {
				$('#errorModal').off();
		});
	 
	 $('#errorModal').on('shown.bs.modal', function (e) {
		
			/*
			 * $("#errorModal").fadeOut( popUpTimeOut, function() {
			 * $("#errorModal").modal("hide"); });
			 */
	 });	 
	 
	$("#errorModal").modal("show");
	 $("#errorModal").css("z-index","1100");
}

function successPopUpWithRD(msg){
	$('#successModal .modal-body').html("<p>"+msg+"</p>");
	 $('#successModal').on('hidden.bs.modal', function (e) {  
				$('#successModal').off();
					window.location.href = "/"+SERVERHOST+"_StudentAppointmentSystem/home.php";
					// window.location.href =
					// "/Prod_StudentAppointmentSystem/home.php";
			});
	 
	 $('#successModal').on('shown.bs.modal', function (e) {
		
			/*
			 * $("#successModal").fadeOut( popUpTimeOut, function() {
			 * $("#successModal").modal("hide");
			 * 
			 * });
			 */
	 });	 
	 
	$("#successModal").modal("show");
	 $("#successModal").css("z-index","1100");
}




function successPopUp(msg){
	$('#successModal .modal-body').html("<p>"+msg+"</p>");
		 $('#successModal').on('hidden.bs.modal', function (e) {
					$('#successModal').off();					
		 });
	 
	 $('#successModal').on('shown.bs.modal', function (e) {
		
			/*
			 * $("#successModal").fadeOut( popUpTimeOut, function() {
			 * $("#successModal").modal("hide");
			 * 
			 * });
			 */
	 });
	 
	$("#successModal").modal("show");
	 $("#successModal").css("z-index","1100");

}


// karan start
// This functionality is for adding non cs students to the database
function AddStudenttoDB(){
				var uin = document.getElementById('uin').value;
				var firstname = document.getElementById('addstudent_firstname').value;
				var lastname = document.getElementById('addstudent_lastname').value;
				var email = document.getElementById('addstudent_email').value;
				var gradlevel = document.getElementById('addstudent_gradlevel').value;
				var i9expiry = document.getElementById('addstudent_i9expiry').value;
				alert(uin);
				if(uin==""){
					errorPopUp("Fill out the field: UIN ");
					exit();
				}
				else if(firstname==""){
					errorPopUp("Fill out the field: firstname ");
					exit();

				}
				else if(lastname==""){
					errorPopUp("Fill out the field: lastname ");
					exit();

				}
				else if(email==""){
					errorPopUp("Fill out the field: email ");
					exit();

				}
				else if(gradlevel==""){
					errorPopUp("Fill out the field: GradLevel ");
					exit();
				}
				
				if(validateEmail(email)){
					// alert("email vaild");
				}
				else { 
					// alert("email not valid");
					errorPopUp("email is not valid");
					exit();
				}

			 var data = {};       	
        	 data["uin"] = uin;
        	 data["firstname"] = firstname;
        	 data["lastname"] = lastname;
        	 data["email"] = email;
        	 data["gradlevel"] = gradlevel;
        	 data["i9expiry"] = i9expiry;
    		 $.ajax({
	              url: 'addStudent.php',
	              type: 'POST',
	              data: data,
	              dataType: "text",
	              success: function(data) {
	              	// data updated in database
	              	alert(data);
	              	$('#AddStudentModal').modal('hide');
			        		 
	              },
	              error: function(xhr,error){    
	            	  $('#cover').hide();
		    		    errorPopUp("error: some problem !");
	              }
	      });  

}
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
// karan end

function start()
{	
	$(document).ready(function() {
	
		loggedIn ="0";	
		
		$('.message a').click(function(){
			   $('.defalutForms').animate({height: "toggle", opacity: "toggle"}, "slow");
		});
		
		 $("#submitButtLogin").on("click",function(){    	
			 
			 $(".login-form").find("input").each(function(){
				 if($.trim($(this).val())==""){
					// alert("please fill in the "+$(this).attr("placeholder")+"
					// field properly to login.");
					 errorPopUp("please fill in the "+$(this).attr("placeholder")+" field properly to login.");
					 return false;
				 }
			 });			 			 
	    		// var queryStr= $(".login-form").serialize();
	    		var formdata = $(".login-form").serializeArray();
	    		var data = {};
	    		$(formdata ).each(function(index, obj){
	    		    data[obj.name] = obj.value;
	    		});
	    		
	    		// this authentication is through my local DB
	    		// $.post('/Prod_StudentAppointmentSystem/checklogin.php',data,function
				// (data){
	    		$.post('/'+SERVERHOST+'_StudentAppointmentSystem/'+SERVERHOST+'_checklogin.php',data,function (data){
	    			if($.trim(data) != ""){
	    				alert($.trim(data));	    				
	    				errorPopUp($.trim(data));	
	    				return false;
	    			}	   				    		
	    		});
	    		
	    		// this authentication is LDAP
	    		/*
				 * $.post('/Maheedhar/StudentRecruitmentTS/ldap_auth_test.php',data,function
				 * (data){ if($.trim(data) != ""){ alert($.trim(data));
				 * errorPopUp($.trim(data)); return false; } });
				 */
		  	    		 	
	    });
		
		 $("#submitButtRegister").on("click",function(){    			 
				$(".register-form").find("input[required='required']").each(function(){
					 if($.trim($(this).val())==""){
						 var errMsg = "please fill in the "+$(this).attr("placeholder")+" field properly to Register."
						 // alert("please fill in the
							// "+$(this).attr("placeholder")+" field properly to
							// Register.");
						 errorPopUp(errMsg);
						 return false;
					 }				 
				});			 			 
	    		var queryStr= $(".register-form").serialize();	    		
	    		$.ajax({
		          type: "GET",
		         // url:
					// "/Prod_StudentAppointmentSystem/addFaculyRegistration.php?"+queryStr,
		          url: "/"+SERVERHOST+"_StudentAppointmentSystem/addFaculyRegistration.php?"+queryStr,
		          dataType: "text",
		          success: function( data, textStatus, jqXHR) {			      				       				     
	    			var msg= $.trim(data);
	    			// alert($.trim(data));
				    // window.location.href =
					// "http://qav2.cs.odu.edu/Maheedhar/StudentRecruitmentTS/home.php";
				     successPopUpWithRD(msg);				    	 
		          },
	  			  error: function( data, textStatus, jqXHR) {
	  		      	var errMsg = "some problem while Registration!";
	  		      	errorPopUp(errMsg);	 
	  		      }
	    		});   		  	    		 	
	    }); 
		 
		
		 
		loginUID = $(".loggedInUID").text().split("-")[0];
		if(loginUID == ""){
			return false;
		}
		
		// // for the default Start and end date of the semester
		var today = new Date();
		 var currentMonth = today.getMonth()+1; // Default January is 0, so
												// incrementing by 1!
		 var currentYear = today.getFullYear();
		 var minmaxDSD = "";
		 var minmaxDED = "";
		 cursemester ="";
		
		 var defaultStartDate=currentYear+"-08-01";
		 var defaultEndDate=currentYear+"-12-15";
		  // this code segemets are for the 8 week rule to populate the
			// default semester
		  if(currentMonth >=7 && currentMonth <=10 ){
			 minmaxDSD = currentYear+"-08-01";
			defaultStartDate = currentYear+"-08-02";
			minmaxDED = currentYear+"-12-30";
			defaultEndDate = currentYear+"-12-15";
			cursemester= "Fall";

		  }else if(currentMonth <=3 || currentMonth>=11 ){
			  if(currentMonth>=11){
				  minmaxDSD = (currentYear+1)+"-01-01";
				  defaultStartDate = (currentYear+1)+"-01-02";
				  defaultEndDate = (currentYear+1)+"-04-15";
				  minmaxDED = (currentYear+1)+"-04-30";
			  }else if(currentMonth <=3){
				  minmaxDSD = currentYear+"-01-01";
				  defaultStartDate = currentYear+"-01-02";
				  defaultEndDate = currentYear+"-04-15";
				  minmaxDED = currentYear+"-04-30";
			  }			  			
			cursemester= "Spring";      	
			// $(".semseladmsett option[value='Fall']").attr("disabled",true);
		  
		  }else{
			 minmaxDSD = currentYear+"-05-01";
			defaultStartDate = currentYear+"-05-02";
			defaultEndDate = currentYear+"-07-15";
			minmaxDED = currentYear+"-07-30";
			cursemester= "Summer";
		
			// $(".semseladmsett option[value='Fall']").attr("disabled",true);
			// (".semseladmsett option[value='Spring']").attr("disabled",true);
		  }
		  
    		if(cursemester.toUpperCase() =="SPRING"){	
    			if(currentMonth == 11 || currentMonth == 12){
    				curAccYear= currentYear+"-"+(currentYear+1);
    			}else{
    				curAccYear= (currentYear-1)+"-"+(currentYear);
    			}		
    			
    		}else if(cursemester.toUpperCase() == "SUMMER"){  	
    			curAccYear=(currentYear-1)+"-"+currentYear;
    		}else{		     			
    			curAccYear= currentYear+"-"+(currentYear+1);
    		}
		  
		  
		 $.ajax({
	          type: "GET",
	          url: "/"+SERVERHOST+"_StudentAppointmentSystem/updateSettingsAdmin.php?action=6&sem="+cursemester+"&accyear="+curAccYear+"&defStartDate="+defaultStartDate+"&defEndDate="+defaultEndDate+"&oduRRF=1",
	          dataType: "text",
	          success: function( data, textStatus, jqXHR) {			  			
			 	if($.trim(data).split("|")[0] == "Success"){
			 		if($.trim(data).split("|")[1] == "definsert"){
			 			curSemEndDate=defaultEndDate;
			 			 curSemStartDate=defaultStartDate;
			     		$("#startDateAdmSett").val(defaultStartDate);     			     		
			     		$("#endDateAdmSett").val(defaultEndDate);
			 		}else{
			 			$("#startDateAdmSett").val($.trim(data).split("|")[1]);    
			 			curSemStartDate=$.trim(data).split("|")[1];
			 			$("#endDateAdmSett").val($.trim(data).split("|")[2]);	
			 			curSemEndDate = $.trim(data).split("|")[2];
			 		}
			 		
			 	}else{
			 		var errMsg = "some problem while getting the start and end dates of the semester details";
		         	errorPopUp(errMsg);
			 	}
	          },
			  error: function( data, textStatus, jqXHR) {
	        	$('#cover').hide();
		      	// alert("error: some problem while getting the project
				// details");
	         	var errMsg = "some problem while getting the start and end dates of the semester details";
	         	errorPopUp(errMsg);	 
		      }
 		}); 	

		$(".semseladmsett").val(cursemester);
		$(".yearseladmsett").val(curAccYear).change();
		



		// Updated by karan
		// start
		// ajax call to get notes fromo the database
		$('#EditButtonforNotes').hide();
		$.ajax({
	          type: "GET",
	          url: "/"+SERVERHOST+"_StudentAppointmentSystem/GetNotesFromAdmin.php",
	          dataType: "text",
	          success: function( data, textStatus, jqXHR) {	
	          // var out = "<p>"+data+"</p>";
			  $("#NotesFromAdmin").html(data);
	          },
			  error: function( data, textStatus, jqXHR) {
	        	$('#cover').hide();
		      	// alert("error: some problem while getting the project
				// details");
	         	var errMsg = "some problem";
	         	errorPopUp(errMsg);	 
		      }
 		}); 	

		// Following code id admin specific
		// If the admin clicks submit button for the text area Notes written
		// will be updated in the database
		$( "#EditButtonforNotes" ).click(function() {
			var NotesText = $("#NotesFromAdmin").val();
			if(adminType==1){faculty_id=15}
			else if(adminType==2){faculty_id=14}
			var data = {};       	
        	 data["faculty_id"] = faculty_id;
        	 data["note"] = NotesText;
			console.log(faculty_id);
	 	 $.ajax({
	              url: 'updateNote.php',
	              type: 'POST',
	              data: data,
	              dataType: "text",
	              success: function(data) {

			        		 
	              },
	              error: function(xhr,error){    
	            	  $('#cover').hide();
		    		    errorPopUp("error: some problem !");
	              }
	      });  
		
	 	 // If the admin clicks the submit button success model will
			// displayed and submit button will be hidden
		$(function(){
		    	$('#myModal').on('show.bs.modal', function(){
				        var myModal = $(this);
				        clearTimeout(myModal.data('hideInterval'));
				        myModal.data('hideInterval', setTimeout(function(){
				            myModal.modal('hide');
				        }, 800));
				        $('#EditButtonforNotes').hide()
				    });

			});
		
		});

		// By clicking on text area, submit buttton for textarea will be
		// displayed
		$("#NotesFromAdmin").click(function(){	
	       	 		$('#EditButtonforNotes').show();
	     });  
		// If the admin click outside the text are the submit button will be
		// hidden
		 window.addEventListener('click', function(e){   
			  if (document.getElementById('NotesFromAdmin').contains(e.target)){
			    // inside text area
			  }else{
			  	$('#EditButtonforNotes').hide()
			    // Clicked outside the box
			  }
		});

		// end
		// upadate by karan


		/*
		 * $("#startDateAdmSett").attr("max",minmaxDED);
		 * $("#startDateAdmSett").attr("min",minmaxDSD);
		 * $("#endDateAdmSett").attr("min",minmaxDSD);
		 * $("#endDateAdmSett").attr("max",minmaxDED);
		 */
		
		
		isAdmin = Boolean($(".loggedInUID").text().split("-")[1]);

			$(".downloadCsvButt").click(function(){	
			
				window.location.href = "/"+SERVERHOST+"_StudentAppointmentSystem/downloadAppointments.php?userid="+loginUID+"&admin="+isAdmin+""; 

			});

        // var downloadCsUrlStr="<i class='glyphicon glyphicon-download-alt'
		// style='font-size:30px;'></i><a
		// href='/"+SERVERHOST+"_StudentAppointmentSystem/downloadAppointments.php?userid="+loginUID+"&admin="+isAdmin+"'
		// style='color: #ffffff'>&nbsp;</a>";

		// $(".downloadCsvButt").html(downloadCsUrlStr);
		





		adminType = parseInt($(".loggedInUID").text().split("-")[2]);
		if(adminType == 3 && $(".splAdminSelBox").val()=="2"){
			isAdmin = false;
		}

		if(isAdmin ){
			// to get the project details with the admin to edit back
			if(adminType == 1){
				$.ajax({
			          type: "GET",
			         // url:
						// "/Prod_StudentAppointmentSystem/updateSettingsAdmin.php?action=1",
			          url: "/"+SERVERHOST+"_StudentAppointmentSystem/getAllProjects.php",
			          dataType: "text",
			          success: function( data, textStatus, jqXHR) {			  			
						allProjects = JSON.parse(data);	
						
						$("#RecruitedStuTable tbody tr .releaseOffAdmin[isfinanceverified='1']").each(function(){
							$(this).parents("tr").find("select").attr("disabled",true);
							$(this).parents("tr").find("input").attr("disabled",true);
													
						});
						
						
						
						$("#RecruitedStuTable tbody tr .releaseOffAdmin[isfinanceverified!='1']").each(function(){
							
							$(this).parents("tr").find(".stuProj").find("span").hide();
							$(this).parents("tr").find(".stuProj").find("select").remove();
							var currProjId = $(this).parents("tr").find(".stuProj").attr("projid");
							var currentStaffId=  $(this).parents("tr").find(".staName").attr("staffid");
							
							var optionStr="";
							$.each( allProjects, function( index, value ) {
								if(value.split("-")[3]== currentStaffId || value.split("-")[2] == "1"){
									var purpose = "SGRA";
									 if(value.split("-")[2] == "1"){
										 purpose = "SGRA";
									 }else{
										 purpose = "GRA";
									 }
									 if(value.split("-")[1] == currProjId){
										 optionStr+= "<option purp='"+purpose+"' title='"+value.split("-")[4]+"' value='"+value.split("-")[1] +"' selected>"+ value.split("-")[0]+"</option>";
									 }else{
										 optionStr+= "<option purp='"+purpose+"' title='"+value.split("-")[4]+"' value='"+value.split("-")[1] +"'>"+ value.split("-")[0]+"</option>";

									}
								}	
							});					
							$(this).parents("tr").find(".stuProj").append("<select class='form-control projSel'>"+optionStr +"</select>");		
							
						});
						
			          },
					  error: function( data, textStatus, jqXHR) {
			        	$('#cover').hide();
				      	// alert("error: some problem while getting the project
						// details");
			         	var errMsg = "some problem while getting the project details";
			         	errorPopUp(errMsg);	 
				      }
		  		}); 
			}
			

			$.ajax({
		          type: "GET",
		         // url:
					// "/Prod_StudentAppointmentSystem/updateSettingsAdmin.php?action=1",
		          url: "/"+SERVERHOST+"_StudentAppointmentSystem/updateSettingsAdmin.php?action=1",
		          dataType: "text",
		          success: function( data, textStatus, jqXHR) {			  			
					$("#currentTution").val($.trim(data).split("-")[1]);
					currTutionPSem = parseFloat($("#currentTution").val());
		          },
				  error: function( data, textStatus, jqXHR) {
		        	$('#cover').hide();
			      	// alert("error: some problem while getting the project
					// details");
		         	var errMsg = "some problem while getting the project details";
		         	errorPopUp(errMsg);	 
			      }
	  		}); 	

		}else{
			getAllProjectsByStaff(loginUID);
		}
			
// karan edit
		facultyOptionStr="<option value='None-0'>None</option>";
		

		$.ajax({
		          type: "GET",
		         // url:
					// "/Prod_StudentAppointmentSystem/updateSettingsAdmin.php?action=1",
		          url: "/"+SERVERHOST+"_StudentAppointmentSystem/GetFacultyNames.php",
		          dataType: "text",
		          success: function(data, textStatus, jqXHR) {	
		          // alert(data);

		          	$.each(JSON.parse(data), function(k,value) {
		          		var result=value.split("-");
		          		facultyOptionStr+="<option value="+value+">"+result[0]+"</option>"
		          	});
					// alert(data.event_details);
					$(".faculty_name").append(facultyOptionStr);
		          },
				  error: function( data, textStatus, jqXHR) {
		        	$('#cover').hide();
			      	// alert("error: some problem while getting the project
					// details");
		         	var errMsg = "some problem while getting the project details";
		         	errorPopUp(errMsg);	 
			      }
	  		}); 
		// karan edit end
						

	    // Setup - add a text input to each footer cell
	    $('#RecruitedStuTable tfoot th').each( function () {
	        var placeHolder = $.trim($(this).text());   
	        var title = $.trim($(this).attr("purp"));
	        // just to show the search icon in the ID field
	        if(title == "UIN"){
		        $(this).html('<div class="right-inner-addon"><i class="icon-search"></i><input class="form-control type="text" data-toggle="tooltip" data-placement="top" title="Search By '+title +'" placeholder="'+placeHolder+'" /></div>' );
	        }
	        else if( title == "SemStartDate" || title == "SemEndDate"){
		       // $(this).html('<div class="right-inner-addon"><input
				// class="form-control" type="text" data-toggle="tooltip"
				// data-placement="top" title="Search By '+title +'"
				// placeholder="'+placeHolder+'" /></div>' );
	        	$(this).html('<div class="right-inner-addon"><input class="form-control" type="date" data-toggle="tooltip" data-placement="top" title="Search By '+title +'" placeholder="'+placeHolder+'" /></div>' );
	        }
	        else{
		        $(this).html('<div class="right-inner-addon"><input class="form-control" type="text" data-toggle="tooltip" data-placement="top" title="Search By '+title +'" placeholder="'+placeHolder+'" /></div>' );
	        }	         
	    });
	    $('[placeholder="Re-Appoint"]').parent().css("display","none");
	    $('[placeholder="Action"]').parent().css("display","none");
	    $('[placeholder="Offer Docs"]').parent().css("display","none");
	    // $('[data-toggle="tooltip"]').tooltip();	   
	    // DataTable
	    var table = $('#RecruitedStuTable').on('order.dt',  function () {inBTWAddition=false; } )
        .on( 'search.dt', function () { 
        	inBTWAddition=false; 
        	// alert("insearch of the dataTable");
        }).on( 'page.dt',   function () {
        	inBTWAddition=false; 
        }).DataTable({
        	 lengthMenu: [ [5,10, 25, 50, 100, -1], [5,10, 25, 50, 100, "All"] ],
        	pageLength: 10,
        	/*
			 * scrollY: "500px", scrollCollapse: true, paging: false
			 */
        });	    
	    // table.order( [ 3, 'desc' ] ).draw();
	    
	    if(isAdmin && adminType==3){
	    	if($(".splAdminSelBox").val()=="1"){
	    		
	    		$("#RecruitedStuTable").dataTable().fnGetNodes().forEach(function(ele){
					 $(ele).find(".stuStartDate input").attr("disabled",true);
					 $(ele).find(".stuEndDate input").attr("disabled",true);
					 $(ele).find(".reLeaseOffAdmin").find("i").hide();
				});
	    		
	    		
	    		/*
				 * $(".stuStartDate input").attr("disabled",true);
				 * $(".stuEndDate input").attr("disabled",true);
				 * $(".reLeaseOffAdmin i").hide();
				 */
	    		
	    		
			}
	    }
	   $('#RecruitedStuTable').on( 'length.dt', function ( e, settings, len ) {
	    inBTWAddition=false;
	    $(".appointmentToAdd").remove();
		});


	    


	    	    
	    // Apply the search in DataTable
	    table.columns().every( function () {
	        var that = this;	 
	        $( 'input', this.footer() ).on( 'keyup change focusout', function () {	        	
	            if ( that.search() !== this.value ) {
	            	curColNum = that[0][0];
	            	// trying to incorporate the search date range functionality
					// here
	            	colUnderSearch = "";
	            	if($(this).attr("placeholder")== "StartDate" || $(this).attr("placeholder")== "EndDate" ){	            		
	            		colUnderSearch =$(this).attr("placeholder");
	            		curSearchStr = this.value;         		
	            		 // this is the custom extension of the the datatable
							// search
			           		 $.fn.dataTable.ext.search.push(
			           		    	    function( settings, data, dataIndex ) {		    	    				           		    	    	
			           		    	    		// implementing the search for
												// reset of the stuff Except for
												// the Dates
			           									if(colUnderSearch == "StartDate"){	 
			           						 	    		if($("input[placeHolder='StartDate']").val() == ""){
			           						 	    			return true;
			           						 	    		}
			           						 	    		
			           						 	    		var searchDateIP = $("input[placeHolder='StartDate']").eq(0).val().split("-");
			           						 	    		$("input[placeHolder='EndDate']").attr("min",searchDateIP);
			           						 	    		var searchDate = new Date(searchDateIP[0],(parseInt(searchDateIP[1]-1)),searchDateIP[2] );
			           						 	    		
			           						 	    	var curRowDate = new Date(data[6]);
			           						 	    		// for the All
															// appointment
															// search, may
															// change if some
															// more columns are
															// added to
															// datatable, have
															// to repair a bit
															// more
			           						 	    		if(isAdmin && adminType == 3){
			           						 	    			if($(".splAdminSelBox").val()=="1"){
			           						 	    				var curDateIp = $("input[placeHolder='StartDate']").eq(dataIndex).val().split("-");
			           						 	    				
			           						 	    				curRowDate =  new Date(curDateIp[0],(parseInt(curDateIp[1]-1)),curDateIp[2] );
			           						 	    			}
			           						 	    		}
			           						 	    		
			           						 	    		
			           						 	    		
			           						 	    		if(  curRowDate >= searchDate ){
			           						 	    			return true;
			           						 	    		}
			           						 	    	} else if( colUnderSearch == "EndDate"){	
			           						 	    		if($("input[placeHolder='EndDate']").val() == ""){
			           						 	    			return true;
			           						 	    		}
			           						 	    		
			           						 	    		var searchDateIP = $("input[placeHolder='EndDate']").eq(dataIndex).val().split("-");
			           						 	    		$("input[placeHolder='StartDate']").attr("max",searchDateIP)
			           						 	    		var searchDate = new Date(searchDateIP[0],(parseInt(searchDateIP[1]-1)),searchDateIP[2] );		           						 	    	
			           						 	    		var curRowDate = new Date(data[7]);
					           						 	    	if(isAdmin && adminType == 3){
				           						 	    			if($(".splAdminSelBox").val()=="1"){
				           						 	    				var curDateIp = $("input[placeHolder='StartDate']").eq(dataIndex).val().split("-");
				           						 	    				
				           						 	    				curRowDate =  new Date(curDateIp[0],(parseInt(curDateIp[1]-1)),curDateIp[2] );
				           						 	    			}
				           						 	    		}
			           						 	    		
			           						 	    		
			           						 	    		if(  curRowDate <= searchDate ){
			           						 	    			return true;
			           						 	    		}	            			    	    		
			           						         	}			           			    	    		
			           									return false;	 	       
			           		    	    });
			           		 		table.draw();
			           		 		$.fn.dataTable.ext.search.pop();
	            	}
	            	else{
	            		// this is where the redrawing of the
	            		that.search(  this.value ).draw();
	            	}
	            		            	
	                curSearchStr ="";
	                curColNum = "";
	                colUnderSearch = "";
	                if(this.value == ""){
	                	return;
	                }
	                var searchType = $(this).parents("th").attr("purp");
	                if( searchType== "Staff" || searchType == "Year" || searchType=="SemStartDate" ||searchType=="SemEndDate" || searchType == "Tution" || searchType == "Semester" ||  searchType=="Funding" || searchType == "Post" || searchType == "Project" || searchType=="Name" ||searchType == "UIN"){
	                	// here is where the logic that gets additional row
						// containing the total of the fonds spent by the
						// professor
	                	var totalTutionAmt = 0;
	                	var avgCredits = 0;
	                	var avgHrs = 0;
	                	var totalSalary = 0;
	                	
	                	var dataRowCount = $("#RecruitedStuTable").find("tbody tr.dataRow").length;
	                	$("#RecruitedStuTable").find("tbody tr.dataRow").each(function(){
	                		if(isAdmin && adminType==1){
	                			
	                			if($(this).find(".stuTWaive input").length == 1){
	                				if($(this).attr("multipos") == "false"){
		                				totalTutionAmt+= ((parseFloat($(this).find(".stuTWaive").attr("currtutionfee")) * parseFloat($(this).find(".stuTWaive input").val())/ 100) * parseFloat($(this).find(".stuNoOfCredits input").val()) );
	                				}			            
	                				avgCredits += parseInt($(this).find(".stuNoOfCredits input").val());
			                		totalSalary += parseFloat($(this).find(".stuSal input").val());
			                		avgHrs += parseInt($(this).find(".stuWHours .oSpan").text());
	                			}else{
	                				if($(this).attr("multipos") == "false"){
	                					totalTutionAmt+= ((parseFloat($(this).find(".stuTWaive").attr("currtutionfee")) * parseFloat($(this).find(".stuTWaive .oSpan").text())/ 100) * parseFloat($(this).find(".stuNoOfCredits .oSpan").text()) );
	                				}
	                				avgCredits += parseInt($(this).find(".stuNoOfCredits .oSpan").text());
			                		totalSalary += parseFloat($(this).find(".stuSal .oSpan").text());
			                		avgHrs += parseInt($(this).find(".stuWHours .oSpan").text());        
	                			}
	                		}else{
	                			if($(this).attr("multipos") == "false"){                		
	                				totalTutionAmt+= ((parseFloat($(this).find(".stuTWaive").attr("currtutionfee")) * parseFloat($(this).find(".stuTWaive .oSpan").text())/ 100) * parseFloat($(this).find(".stuNoOfCredits .oSpan").text()) );
	                			}
		                		avgCredits += parseInt($(this).find(".stuNoOfCredits .oSpan").text());
		                		totalSalary += parseFloat($(this).find(".stuSal .oSpan").text());
		                		avgHrs += parseInt($(this).find(".stuWHours .oSpan").text());          		
	                		}
	                	});
	                	
	                	if(dataRowCount > 0){
	                		var totalSummaryRow ="";
	                		
	                		if(isAdmin){
		                	 totalSummaryRow ='<tr style="text-align: center;background: #337AB7;color: white;"><td></td><td colspan="2"><b>Total Summary -</b></td><td colspan="6"></td><td title=" Total Tution Amount"> $'+totalTutionAmt+'</td><td title="Average Credits">'+parseFloat(avgCredits/dataRowCount).toFixed(2) +'</td><td title="Total Salary"> $'+totalSalary +'</td><td title="Average Hours">'+ parseFloat(avgHrs/dataRowCount).toFixed( 2 )+'</td><td colspan="3"></td></tr>';	    	      			    	      		
	                		}else{
		                		totalSummaryRow ='<tr style="text-align: center;background: #337AB7;color: white;"><td></td><td colspan="2"><b>Total Summary -</b></td><td colspan="5"></td><td title=" Total Tution Amount"> $'+totalTutionAmt+'</td><td title="Average Credits">'+parseFloat(avgCredits/dataRowCount).toFixed(2) +'</td><td title="Total Salary"> $'+totalSalary +'</td><td title="Average Hours">'+ parseFloat(avgHrs/dataRowCount).toFixed( 2 )+'</td><td colspan="3"></td></tr>';	    	      			    	      		
	                		}

		        	      	$("#RecruitedStuTable tbody").append(totalSummaryRow);	   
	                	}
	                }
	            }
	        });
	    });
	    

	    $(document).on("click",".checkonsubmit",function(){	 
	    	 // $(this).css('color', 'red');
	    	parentTR = $(this).parents("tr");
	    	var Curr_RecID=parentTR.attr("id");

	    	var data = {};
	    	data["Curr_RecID"] = Curr_RecID;

	    	 $.ajax({
	    		            	 // url: 'emailStudent.php',
	    		            	  url: "/"+SERVERHOST+"_StudentAppointmentSystem/AfterStudentSubmission.php",
	    		                  type: 'POST',
	    		                  data: data,
	    		                  success: function(data) {
	    		            		if(data=="Success")
	    		            		{
	    		            			// alert("Success");
	    		            		}
	    		            		else{
	    		            			errorPopUp("error: some problem after Student submission");
	    		            		}
	    		                  },
	    		                  error: function(xhr,error){    
	    		                	  $('#cover').hide();
	    		  	    		    // alert('Holy errors, testFileUpload!');
	    		  	    		    errorPopUp("error: some problem after Student submission");
	    		                  }
	    		              });
	    	window.location.reload();
	    });

	    
	    
	    // event registration to trigger on content change of input
	    $(document).on("input","#currentTution",function(){	    
	    	$(".updateTutionButt").show();
	    });
	    
	    $(document).on("click",".updateTutionButt",function(){	 
	    	
	    	var currTution = $.trim($("#currentTution").val());
	    	if( currTution == "" || currTution <= 0){
	    		// alert("Error: Update the Current Tution with a proper
				// value.");
	    		// return false;
	    		var errMsg = "Update the Current Tution with a proper value.";
	    		errorPopUp(errMsg);
	    		return false;
	    	}
	    	
	    	$.ajax({
		          type: "GET",
		         // url:
					// "/Prod_StudentAppointmentSystem/updateSettingsAdmin.php?action=2&currTution="+currTution,
		          url: "/"+SERVERHOST+"_StudentAppointmentSystem/updateSettingsAdmin.php?action=2&currTution="+currTution,

		          dataType: "text",
		          success: function( data, textStatus, jqXHR) {		
	    			 $('#cover').hide();
	    			 var msg = "Tution is updated successfully";
	    			 
				     // alert("Tution is updated successfully");
				     // window.location.href =
						// "http://qav2.cs.odu.edu/Maheedhar/StudentRecruitmentTS/home.php";
	    			 successPopUpWithRD(msg);
		          },
	  			  error: function( data, textStatus, jqXHR) {
		        	  $('#cover').hide();
	  		      	// alert("error: some problem while updating the tution
					// details");
		        	  var errMsg = "some problem while updating the tution details";
		        	  errorPopUp(errMsg);
	  		      }
	    		}); 
	    });
	    
	    
	    // to take care of ODU | ODURF Start and End Date selection
	    $(document).on("change",".fundingIP",function(){
	    	
	    		if($(this).parents("tr").hasClass("extraPosToAdd")){
	    			curentPostionTR = $(".appointmentToAdd.extraPosToAdd");
	    		}else{
	    			curentPostionTR = $(".appointmentToAdd");
	    		}
	    		
	    	$.ajax({
		          type: "GET",
		          url: "/"+SERVERHOST+"_StudentAppointmentSystem/updateSettingsAdmin.php?action=6&sem="+cursemester+"&accyear="+curAccYear+"&defStartDate="+defaultStartDate+"&defEndDate="+defaultEndDate+"&oduRRF="+$(this).val(),
		          dataType: "text",
		          success: function( data, textStatus, jqXHR) {			  			
				 	if($.trim(data).split("|")[0] == "Success"){
				 		if($.trim(data).split("|")[1] == "definsert"){
				 			curSemEndDate=defaultEndDate;
				 			 curSemStartDate=defaultStartDate;				     		
				 		}else{
				 		 
				 			curSemStartDate=$.trim(data).split("|")[1];				 		
				 			curSemEndDate = $.trim(data).split("|")[2];
				 		}
				 		curentPostionTR.find(".startDateIP").val(curSemStartDate);
				 		curentPostionTR.find(".endDateIP").val(curSemEndDate);
				 		
				 	}else{
				 		var errMsg = "some problem while getting the start and end dates of the semester details";
			         	errorPopUp(errMsg);
				 	}
		          },
				  error: function( data, textStatus, jqXHR) {
		        	$('#cover').hide();
			      	// alert("error: some problem while getting the project
					// details");
		         	var errMsg = "some problem while getting the start and end dates of the semester details";
		         	errorPopUp(errMsg);	 
			      }
	 		}); 
		});
	    
	    
	    
	    // to take care of ODU | ODURF Start and End Date selection
	    $(document).on("change",".reFundingIP",function(){	 
	    	$.ajax({
		          type: "GET",
		          url: "/"+SERVERHOST+"_StudentAppointmentSystem/updateSettingsAdmin.php?action=6&sem="+nextSemYear[0]+"&accyear="+nextSemYear[1]+"&defStartDate="+nextSemYear[2]+"&defEndDate="+nextSemYear[3]+"&oduRRF="+$(this).val(),
		          dataType: "text",
		          success: function( data, textStatus, jqXHR) {			  			
				 	if($.trim(data).split("|")[0] == "Success"){
				 		if($.trim(data).split("|")[1] == "definsert"){
				 			curSemEndDate=defaultEndDate;
				 			 curSemStartDate=defaultStartDate;				     		
				 		}else{
				 		 
				 			curSemStartDate=$.trim(data).split("|")[1];				 		
				 			curSemEndDate = $.trim(data).split("|")[2];
				 		}
				 		$(".reStartDateIP").val(curSemStartDate);
				 		$(".reEndDateIP").val(curSemEndDate);
				 		
				 	}else{
				 		var errMsg = "some problem while getting the start and end dates of the semester details";
			         	errorPopUp(errMsg);
				 	}
		          },
				  error: function( data, textStatus, jqXHR) {
		        	$('#cover').hide();
			      	// alert("error: some problem while getting the project
					// details");
		         	var errMsg = "some problem while getting the start and end dates of the semester details";
		         	errorPopUp(errMsg);	 
			      }
	 		}); 
		});
	    
	    

	    // to take care of setting Project to NONE on selecting GTA or Grader
		// while re-appointing
	    $(document).on("change",".rePostIP",function(){	 
	    	var selectedPost = $(this).val();
	    	var parentRow = $(this).parents("tr");
	    	var preProjVal  = $(this).parents("tr").find(".reProjSel").val();
	    	parentRow.find(".reFundingIP").attr("disabled", "true");
	    	parentRow.find(".reProjSel").val("None-0");	    	
	    	if(selectedPost.split("_")[0] == "PHD"){
	    		if(selectedPost == "PHD_GRA"){
	    			parentRow.find(".reProjSel option[purp='SGRA']").hide();
	    			parentRow.find(".reProjSel option[purp='GRA']").show();   
	    			// GRA Comes under Only ODURF = 2
	    			parentRow.find(".reFundingIP").val("2").trigger('change');		
	    				    			
	    		}else{
	    			// except GRA, all other Comes under Only ODU = 1
	    			parentRow.find(".reFundingIP").val("1").trigger('change');
	    			parentRow.find(".reProjSel option[purp='SGRA']").show();
	    			parentRow.find(".reProjSel option[purp='GRA']").hide();       			
	    		}    		
	    		return false;	    		
	    	}
	    	
	    	
	    	if( selectedPost == "GRA" ){
	    		// GRA Comes under Only ODURF = 2
    			parentRow.find(".reFundingIP").val("2").trigger('change');	
	    	}else{
	    		// except GRA, all other Comes under Only ODU = 1
    			parentRow.find(".reFundingIP").val("1").trigger('change');	
	    	}
	    	    	
	    	if(selectedPost == "GTA" || selectedPost == "Grader"){	    		
	    		if($(".semesterIP").val() != "Summer"){
	    			parentRow.find(".reTutionIP").val("50");
		    		parentRow.find(".reCreditsIP").val("9");
	    		}else{
	    			parentRow.find(".reTutionIP").val("50");
		    		parentRow.find(".reCreditsIP").val("3");
	    		}
	    	}else{	    	
	    		
	    		parentRow.find(".reProjSel").removeAttr("disabled");
	    		parentRow.find(".reProjSel").val(preProjVal);
	    		  
	    		
	    		if($(".semesterIP").val() != "Summer"){
	    			// for the additional requirements of accomadating tution
					// and no of credits
		    		parentRow.find(".reTutionIP").val("75");
		    		parentRow.find(".reCreditsIP").val("6");	 
	    		}
	    		else{
	    			// for the additional requirements of accomadating tution
					// and no of credits
		    		parentRow.find(".reTutionIP").val("75");
		    		parentRow.find(".reCreditsIP").val("3");	 
	    		}
	    		
	    	}	  
	    	
	    	if(selectedPost == "GRA" || selectedPost == "GTA" || selectedPost == "Grader"){
    			parentRow.find(".reProjSel option[purp='SGRA']").hide();
    			parentRow.find(".reProjSel option[purp='GRA']").show();
    		}else{
    			parentRow.find(".reProjSel option[purp='SGRA']").show();
    			parentRow.find(".reProjSel option[purp='GRA']").hide();
    		}
	    	
		});
	    
	    // to take care of setting Project to NONE on selecting GTA or Grader
		// while cadding new
	    $(document).on("change",".postIP",function(){	 
	    	
	    	var selectedPost = $(this).val();
	    	var parentRow = $(this).parents("tr");
	    	parentRow.find(".projSel").val("None-0");
	    	parentRow.find(".fundingIP").attr("disabled", "true");
	    	if(selectedPost.split("_")[0] == "PHD"){
	    		if(selectedPost == "PHD_GRA"){
	    			parentRow.find(".projSel option[purp='SGRA']").hide();
	    			parentRow.find(".projSel option[purp='GRA']").show(); 
	    			
	    			// GRA Comes under Only ODURF = 2
	    			parentRow.find(".fundingIP").val("2").trigger('change');	
	    				    			
	    		}else{
	    			// except GRA, all other Comes under Only ODU = 1
	    			parentRow.find(".fundingIP").val("1").trigger('change');	
	    			parentRow.find(".projSel option[purp='SGRA']").show();
	    			parentRow.find(".projSel option[purp='GRA']").hide();
	    			
	    		}	    		
	    		return false;
	    	}
	    	
	    	if( selectedPost == "GRA" ){
	    		// GRA Comes under Only ODURF = 2
    			parentRow.find(".fundingIP").val("2").trigger('change');
	    	}else{
	    		// except GRA, all other Comes under Only ODU = 1
    			parentRow.find(".fundingIP").val("1").trigger('change');
	    	}
	    	
	    	
	    	if(selectedPost == "GTA" || selectedPost == "Grader"){	
	    		if($(".semesterIP").val() != "Summer"){
	    			parentRow.find(".tutionWaiveIP").val("50");
		    		parentRow.find(".noOfCreditsIP").val("9");
	    		}else{
	    			parentRow.find(".tutionWaiveIP").val("50");
		    		parentRow.find(".noOfCreditsIP").val("3");
	    		}
	    	}else{    		
	    		
	    		
	    		parentRow.find(".projSel").removeAttr("disabled");
	    		
	    		if($(".semesterIP").val() != "Summer"){
	    			  // for the additional requirements of accomadating
						// tution and no of credits
		    		parentRow.find(".tutionWaiveIP").val("75");
		    		parentRow.find(".noOfCreditsIP").val("6");
	    		}else{
	    			parentRow.find(".tutionWaiveIP").val("75");
		    		parentRow.find(".noOfCreditsIP").val("3");
	    		}
	    		
	    	}
	    	
	    	
	    	if(selectedPost == "GRA" || selectedPost == "GTA" || selectedPost == "Grader"){
    			parentRow.find(".projSel option[purp='SGRA']").hide();
    			parentRow.find(".projSel option[purp='GRA']").show();
    		}else{
    			parentRow.find(".projSel option[purp='SGRA']").show();
    			parentRow.find(".projSel option[purp='GRA']").hide();
    		}
    	
		});
	    
	    
	    // to handle the new project selection stuff
	    $(document).on("change",".reProjSel",function(){	    	
	    	if($(this).val().split("-")[0] == "createNew"){	    		
  	    		// var reProjIPStr='<input type="text" name="reProjIP"
				// class="reProjIP form-control width_100Per" placeholder="Proj
				// Number" required />';
  	    		// $(this).parent().find(".reProjIP").remove();
  	    		// $(this).parent().append(reProjIPStr);
  	    		// $(this).hide();
  	    		$("#projectDetPopup").modal("show");
	    	}else{
	    		$(this).parent().find(".reProjIP").remove();
	    	}
		});
	    


	    
	    $(document).on("change",".projSel",function(){	    	
	    	if($(this).val().split("-")[0] == "createNew"){	    

  	    		// var projIPStr='<input type="text" name="projIP" class="projIP
				// form-control width_100Per" placeholder="Proj Number" required
				// />';
  	    		// $(this).parent().find(".projIP").remove();
  	    		// $(this).parent().append(projIPStr);
  	    		// $(this).hide();
  	    		if(isAdmin && (adminType==1 || adminType==2)) {
  	    			var count=2;
  	    			var curRowParent = $(this).parents("tr");

  	    			if(curRowParent.find(".staffIP ").val()==""){
  	    				errorPopUp("Please select the Faculty before creating a project");
  	    				return false;
  	    			}
  	    		}


	    		$("#projectDetPopup").modal("show");



	    	}else{
	    		$(this).parent().find(".projIP").remove();
	    	}    
		});
	    
	    
	    // to add a new project into DB
	    $(document).on("click",".newProjCreateButt",function(){	   	    	
	    	var formdata = $(this).eq(0).parents(".modal").find("form").serializeArray();
	    	var data = {};
	    	$(formdata).each(function(index, obj){
	    	    data[obj.name] = obj.value;
	    	});
	    	
	    	if(isAdmin && adminType==1||adminType==2){
	    		var curRowParent = $(this).parents("tr");
	    		//var id=curRowParent.find(".staffIP").attr("staffid");
	    		data["faculty_id"]=$(".appointmentToAdd").find(".staffIP").attr("staffid"); 		
	    	}
	    	else{
	    		data["faculty_id"] = loginUID;
	    	}

	    	data["name"]= $.trim(data["name"]).replace("-","/");
	    	
	    	if(data["name"]== ""){
	    		errorPopUp("Please give a name, before creating a project");  
	    		return false;
	    	}
	    	
	    	
    		 $('#cover').show();   		 
    		$.ajax({
	          type: "POST",
	         // url: "/Prod_StudentAppointmentSystem/addReAppointment.php",
	          url: "/"+SERVERHOST+"_StudentAppointmentSystem/addNewProject.php",
	          dataType: "text",
	          data:data,
	          success: function( data, textStatus, jqXHR) {	
    			
    			 $('#cover').hide();
			     // var jObj = jQuery.parseJSON(data);
			    // console.log(jObj[0].stu_id);
    			if($.trim(data).split("-")[0]== "fail"){
    				if($.trim(data).split("-")[1] == "duplicate"){    								
        				errorPopUp("Project with this name already exist, choose a different name");
    				}else{
        				errorPopUp("No projects exist, please create one");
    				}   				
    			}else{
    				// have to implement the logic of updating the projects list
						successPopUp("Project Created Succesfully");

    				$(".projCreatForm input, textarea").val("");
					projOptionStr ='<option value="None-0">None</option><option value="createNew-">CreateNew</option>';

    				$(JSON.parse($.trim(data))).each(function(index,obj){
    					
    					var purp = "GRA";
    					if(parseInt(obj["issgraproj"])== 1){
    						purp = "SGRA";
    					}
    					
    					projOptionStr+='<option purp="'+purp +'" value="'+obj["name"]+'-'+obj["id"]+'">'+obj["name"].replace("/","-")+'</option>'; 	    		   					
    				});
    				$(".projSel").empty().append(projOptionStr);
    				$(".reprojSel").empty().append(projOptionStr);
    				$('#projectDetPopup').modal("hide");
    				$(".postIP").val($(".postIP").val()).trigger('change');
    				$(".repostIP").val($(".repostIP").val()).trigger('change');

    			}			   
	          },
  			  error: function( data, textStatus, jqXHR) {
	        	$('#cover').hide();
  		      	// alert("error: some problem while sending an email!");
				errorPopUp("some problem while creating a new project");
  		      }
    		});  		
	    });
      
	  

	    
          // modified-- actions to be done on checkbox click
  	    $(".reAppointCB").on("click",function(){

  	    	var ParentTR = $(this).parents("tr");  
  	    	// karan edit
  	    	var preHours;
  	    	var preSal;
  	    		if(nextSemYear[0]=="Summer"){
  	    				preHours=40;
  	    				preSal=2500;
  	    		}
  	    		else{ preHours=20;
  	    			  preSal=3200;
  	    		}
  	    	// end kedit

  	    	
  	    	if($(this).prop("checked")){ 	
  	    		// to make any number of appointments to be initiated at once by
				// Faculty -- currently left unimplemented have to revisit this
  	    		if(inBTWAddition){
  		  			// alert("Please add one Appointment at a time.");
  		  			var errMsg ="Please add one Appointment at a time.";
  		  			errorPopUp(errMsg); 		  			
  		  			return false;
  		  		}
  	    		inBTWAddition = true;
  	    		// to revert to the state of being unchecked
  	    		var originalTrContent = $(ParentTR).html();
  	    		
  	    		var recId = $(this).parents("tr").attr("id");
  	    		// var temp=ParentTR.find(".reAppointButt");

  	    		ParentTR.find(".reAppointButt").css("display","block"); 
 	
  	    		
  	    		// just to show the next sem and year - accomidating the changes
				// suggested "next Sem|Year-year|StartDate|EndDate"
  	    		existingSemYear = ParentTR.find(".stuStartDate").attr("title");
	    		nextSemYear= getNextSemAndYear(existingSemYear).split("|");
	    		newSemYear = nextSemYear[0]+"|"+nextSemYear[1];
	    			    		
	    		var preStartDate = jQuery.trim(ParentTR.find(".stuStartDate .oSpan").text()); 	    
	    		var startDateIPStr='<span class="tSpan"><input type="date" name="reStartDateIP" class="reStartDateIP form-control width_100Per" placeholder="Semester StartDate" required disabled semyear="'+nextSemYear[0]+'|'+ nextSemYear[1]+'" value="'+ nextSemYear[2] +'"/></span>';
  	    		ParentTR.find(".stuStartDate .oSpan").hide();
  	    		ParentTR.find(".stuStartDate").append(startDateIPStr);
  	    		ParentTR.find(".stuStartDate").attr("title",newSemYear);
  	    		
	    		var preEndDate = jQuery.trim(ParentTR.find(".stuEndDate .oSpan").text()); 	    		
  	    		var endDateIPStr='<span class="tSpan"><input type="date" name="reEndDateIP" class="reEndDateIP form-control width_100Per" placeholder="semester EndDate" required disabled semyear="'+nextSemYear[0]+'|'+ nextSemYear[1]+'" value="'+ nextSemYear[3] +'"/></span>';
  	    		ParentTR.find(".stuEndDate .oSpan").hide();
  	    		ParentTR.find(".stuEndDate").append(endDateIPStr);
  	    		ParentTR.find(".stuEndDate").attr("title",newSemYear);
	    			
	    		var preSem = jQuery.trim(ParentTR.find(".stuSem .oSpan").text()); 	    		
  	    		var semIPStr='<span class="tSpan"><input type="text" name="reSemIP" class="reSemIP form-control width_100Per" placeholder="Semester" required disabled value="'+ nextSemYear[0] +'"/></span>';
  	    		ParentTR.find(".stuSem .oSpan").hide();
  	    		ParentTR.find(".stuSem").append(semIPStr);
  	    		
  	    		/*
				 * var preYear = jQuery.trim(ParentTR.find(".stuSal
				 * .oSpan").text()); var yearIPStr='<span class="tSpan"><input
				 * type="number" name="reYearIP" class="reYearIP form-control
				 * width_100Per" placeholder="Year" required disabled value="'+
				 * nextSemYear[1] +'"/></span>'; ParentTR.find(".stuYear
				 * .oSpan").hide(); ParentTR.find(".stuYear").append(yearIPStr);
				 */

  	    		// var preSal = jQuery.trim(ParentTR.find(".stuSal
				// .oSpan").text());
  	    		var salIPStr='<span class="tSpan"><input type="number" name="reSalaryIP" class="reSalaryIP form-control width_100Per" placeholder="Salary" required value="'+ parseInt(preSal) +'"/></span>';
  	    		ParentTR.find(".stuSal .oSpan").hide();
  	    		ParentTR.find(".stuSal").append(salIPStr);

  	    		
  	    		
  	    		// var preHours = jQuery.trim(ParentTR.find(".stuWHours
				// .oSpan").text());
  	    		var hoursIPStr='<span class="tSpan"><input type="number" name="reHoursIP" class="reHoursIP form-control width_100Per" placeholder="Hours" required value="'+ parseInt(preHours) +'"/></span>';
  	    		ParentTR.find(".stuWHours .oSpan").hide();
  	    		ParentTR.find(".stuWHours").append(hoursIPStr);
  	    		
  	    		// these are for the additional requirements of tutuion and fee
  	    		var preTution = jQuery.trim(ParentTR.find(".stuTWaive .oSpan").text()); 	    	
  	    		var tutionIPStr='<span class="tSpan"><input type="number" name="reTutionIP" disabled class="reTutionIP form-control width_100Per" placeholder="Tution Waive" required value="'+ parseInt(preTution) +'"/></span>';
  	    		ParentTR.find(".stuTWaive .oSpan").hide();
  	    		ParentTR.find(".stuTWaive").append(tutionIPStr);
  	    		
  	    		var preNoOfCredits = jQuery.trim(ParentTR.find(".stuNoOfCredits .oSpan").text()); 	    	
  	    		var creditsIPStr='<span class="tSpan"><input type="number" name="reCreditsIP" disabled class="reCreditsIP form-control width_100Per" placeholder="No.of Credits" required value="'+ parseInt(preNoOfCredits) +'"/></span>';
  	    		ParentTR.find(".stuNoOfCredits .oSpan").hide();
  	    		ParentTR.find(".stuNoOfCredits").append(creditsIPStr);
  	    		
  	    		
  			    var postSelectStr = '<span class="tSpan"> <select class="form-control rePostIP" name="rePostIP"><option value="0">select post</option><option value="GRA">GRA</option><option value="SGRA">SGRA</option><option value="GTA">GTA</option><option value="Grader">Grader</option></select></span>';
  	    		var prePost = jQuery.trim(ParentTR.find(".stuPost .oSpan").text());
  	    		ParentTR.find(".stuPost .oSpan").hide();
  	    		ParentTR.find(".stuPost").append(postSelectStr);
  	    		ParentTR.find(".rePostIP").val(prePost); 
  	    		
  	    		$staffId = loginUID;
  	    		
  	    		if(isAdmin){
  	    			// here the staffID of the selected staff has to be filled
  	    			$staffId = ParentTR.find(".staName").attr("staffid");
  	    		}    		
  	    		// to populate all the projects
  				  projSelectHelper(ParentTR,prePost); 
  				  
  				  var postSelectStr = '<span class="tSpan"> <select class="form-control reFundingIP" name="reFundingIP"><option value="1">ODU</option><option value="2">ODURF</option></select></span>';
    	    	  var preFundType = jQuery.trim(ParentTR.find(".stuFundingType .oSpan").text());
    	    	  ParentTR.find(".stuFundingType .oSpan").hide();
    	    	  ParentTR.find(".stuFundingType").append(postSelectStr);
    	    	  if(preFundType == "ODU"){
    	    		  ParentTR.find(".reFundingIP").val("1");
    	    	  }else{
    	    		  ParentTR.find(".reFundingIP").val("2");
    	    	  }
    	    	  
    	    	  /*
					 * the following modification is to accomidate the new
					 * change of DR Wiegle, which says the re-appointment must
					 * start in the row below the current one, so i am tweeking
					 * the existing code a bit instood of re-writing the whole
					 * thing, thanks for the patients
					 */
    	    	  	// karan edit
    	    	  // font-size:20px;
    	    	  var reAppointTR = ParentTR.clone();
  				  $('<i class="fa fa-plus addOtherPosition_reap" title="Add Another Position" style="margin-top: 8%;display:none;"></i>').insertBefore(reAppointTR.find(".reAppointButt"));

    	    	  reAppointTR.addClass("reAppointRow_afterCR");
    	    	  reAppointTR.find("td .reAppointCB").attr("checked",false);
    	    	  reAppointTR.find("td .reAppointCB").hide();
    	    	  reAppointTR.find("td.stuRecStatus").hide();
    	    	  reAppointTR.find("td.stuRecDocs").hide();

    	    	  ParentTR.find(".tSpan").remove();
    	    	  ParentTR.find(".oSpan").show();
    	    	  ParentTR.find(".reAppointButt").css("display","none"); 
    	    	  ParentTR.find(".stuEndDate").attr("title",existingSemYear);
    	    	  ParentTR.find(".stuStartDate").attr("title",existingSemYear);
    	    	  reAppointTR.insertAfter(ParentTR);
    	    	  	
    	    	    	    	     	    	  
  	    	}else{
  	    		inBTWAddition = false;
  	    		// this comment is mainly because of the modification
  	    		/*
				 * ParentTR.find(".tSpan").remove();
				 * ParentTR.find(".oSpan").show();
				 * ParentTR.find(".reAppointButt").css("display","none");
				 * ParentTR.find(".stuEndDate").attr("title",existingSemYear);
				 * ParentTR.find(".stuStartDate").attr("title",existingSemYear);
				 */
			    // window.location.href =
				// "/Maheedhar/StudentRecruitmentTS/home.php";
  	    		$(".reAppointRow_afterCR").remove();
  	    		
  	    	}  	  	    
  	    });
  	    
  	    // modified-- on click of Re-Appoint Button I/////////////
  	 /*
		 * $(document).on("click",".reAppointButt",function(){ var ParentTR =
		 * $(this).parents("tr"); var recId = ParentTR.attr("id"); var postIP =
		 * $.trim(ParentTR.find(".rePostIP").val()); var reSal =
		 * $.trim(ParentTR.find(".reSalaryIP ").val()); var reHours =
		 * $.trim(ParentTR.find(".reHoursIP ").val()); var reTution =
		 * $.trim(ParentTR.find(".reTutionIP ").val()); var reNoofCredits =
		 * $.trim(ParentTR.find(".reCreditsIP ").val()); var reFundingType =
		 * $(".reFundingIP").val();
		 * 
		 * var curRowParent= $(this).parents("tr"); var extaRowParent = null;
		 * 
		 * alert(curRowParent.find(".reHoursIP").val());
		 * 
		 * console.log(postIP+" "+reSal);
		 * 
		 * 
		 * 
		 * 
		 * 
		 * if($.trim(postIP)== 0){ //alert("Please fill in the Post input
		 * correctly"); errorPopUp("Please fill in the Post input correctly");
		 * return false; }else if(reTution=="" || reTution==0){ //alert("Please
		 * fill in the Turion Waive field correctly"); errorPopUp("Please fill
		 * in the Turion Waive field correctly"); return false; }else
		 * if(reNoofCredits=="" || reNoofCredits == 0){ //alert("Please fill in
		 * the No.of Credits field correctly"); errorPopUp("Please fill in the
		 * No.of Credits field correctly"); return false; }else if(reSal==""){
		 * //alert("Please fill in the Salary field correctly");
		 * errorPopUp("Please fill in the Salary field correctly"); return
		 * false; }
		 * 
		 * 
		 * if(reHours== "" || parseInt(reHours)==0 || parseInt(reHours) > 20 ||
		 * parseInt(reHours) < 0){ //alert("Please fill in the Hours input
		 * correctly; Hours assigned must be less than 20 and greater than 0");
		 * errorPopUp("Please fill in the Hours input correctly: Hours assigned
		 * must be less than 20 and greater than 0"); return false; }
		 * console.log(curRowParent.find(".reProjSel").val()); var reProjIp =
		 * ParentTR.find(".reProjIP").val();
		 * if(curRowParent.find(".reProjSel").val() == "None-0"){
		 * //alert("Please fill in the Project field correctly");
		 * errorPopUp("Please fill in the Project field correctly.."); return
		 * false; } // if( ParentTR.find(".reProjSel").val().split("-")[0]==
		 * "createNew"){ // reProjIp = ParentTR.find(".reProjIP").val(); //
		 * reProjId=""; // projectConfirmStr = " on a New Project
		 * "+reProjIp.toUpperCase(); // if($.trim(reProjIp) == ""){ //
		 * //alert("Please fill in the Project field correctly"); //
		 * errorPopUp("Please fill in the Project field correctly"); // return
		 * false; // } // }else{ // reProjIp =
		 * ParentTR.find(".reProjSel").val().split("-")[0]; // reProjId=
		 * ParentTR.find(".reProjSel").val().split("-")[1]; // if(
		 * ParentTR.find(".reProjSel").val().split("-")[1]!= "0"){ //
		 * projectConfirmStr = " on a Budget Code "+reProjIp.toUpperCase(); // } // }
		 * 
		 * 
		 * 
		 * if(parseInt(curRowParent.find(".reHoursIP").val()) < 20){
		 * if($(".extraPosToAdd_reap").length == 1){ extaRowParent =
		 * $(".extraPosToAdd_reap");
		 * 
		 * 
		 * if(extaRowParent.find(".reProjSel").val() == "None-0"){
		 * //alert("Please fill in the Project field correctly");
		 * errorPopUp("Please fill in the Post field for the second row ");
		 * return false; }
		 * 
		 * if( (parseInt(curRowParent.find(".reHoursIP").val()) +
		 * parseInt(extaRowParent.find(".reHoursIP").val())) > 20){ alert("Total
		 * Students Hours id exceeding 20, please correct it."); isExit = true; } } }
		 * 
		 * 
		 * //var nextSemYear= getNextSemAndYear(ParentTR.find(".stuSem
		 * input").val(),ParentTR.find(".stuYear input").val()).split("|"); var
		 * fundingDet = ""; if(reFundingType == "1"){ fundingDet = "funded by
		 * ODU"; }else{ fundingDet = "funded by ODU Research Fundation"; } var
		 * confirmationStr = " Are you sure to Re Appoint the student
		 * "+ParentTR.find(".stuName").text()
		 * +"("+ParentTR.find(".stuUIN").text()+")"; confirmationStr+= " as a "+
		 * postIP + " for "+ ParentTR.find(".stuStartDate
		 * input").attr("semyear")+" "+ projectConfirmStr +" "+ fundingDet+" and
		 * pay him "+reSal+" ?";
		 * 
		 * var proceed = confirm(confirmationStr);
		 * 
		 * if(!proceed){ return false; }
		 * 
		 * var querySTR =
		 * "recid="+recId+"&reProj="+reProjIp.toUpperCase()+"-"+reProjId+"&reSalaryIP="+jQuery.trim(ParentTR.find(".reSalaryIP").val())+"&rePostIP="+ParentTR.find(".rePostIP").val()+
		 * "&reHourIP="+reHours+"&reTutionIP="+reTution+"-"+reNoofCredits; var
		 * data = {}; data["recid"]= recId; data["reProj"]=
		 * reProjIp.toUpperCase()+"-"+reProjId; data["reSalaryIP"]=
		 * jQuery.trim(ParentTR.find(".reSalaryIP").val()); data["rePostIP"]=
		 * ParentTR.find(".rePostIP").val(); data["reHourIP"]= reHours;
		 * data["reTutionIP"]= reTution+"-"+reNoofCredits; data["semester"] =
		 * nextSemYear[0]; data["year"]= nextSemYear[1];
		 * 
		 * data["startdate"]= nextSemYear[2]; data["enddate"]= nextSemYear[3];
		 * data["reFundingIP"]= reFundingType; console.log(querySTR);
		 * $('#cover').show(); $.ajax({ type: "POST", // url:
		 * "/Prod_StudentAppointmentSystem/addReAppointment.php", url:
		 * "/"+SERVERHOST+"_StudentAppointmentSystem/addReAppointment.php",
		 * dataType: "text", data:data, success: function( data, textStatus,
		 * jqXHR) { $('#cover').hide(); //var jObj = jQuery.parseJSON(data); //
		 * console.log(jObj[0].stu_id); if($.trim(data).split("-")[0]==
		 * "success"){ successPopUpWithRD("Student Appointment Process is
		 * initiated"); // alert("Student Appointment Process is initiated");
		 * //window.location.href =
		 * "http://qav2.cs.odu.edu/Maheedhar/StudentRecruitmentTS/home.php";
		 * }else if($.trim(data).split("-")[0]== "fail"){
		 * 
		 * if($.trim(data).split("-")[1] != ""){
		 * errorPopUp($.trim(data).split("-")[1]);
		 * //alert($.trim(data).split("-")[1]); }else{ //alert("error: some
		 * problem while initiating the Appointment!"); errorPopUp("some problem
		 * while initiating the Appointment!"); } } }, error: function( data,
		 * textStatus, jqXHR) { $('#cover').hide(); //alert("error: some problem
		 * while sending an email!"); errorPopUp("some problem while sending an
		 * email!"); } });
		 * 
		 * });
		 */
	    $(document).on("change",".splAdminSelBox",function(){ 		
  		window.location.href= "http://qav2.cs.odu.edu/"+SERVERHOST+"_StudentAppointmentSystem/home.php?splAdmin="+$(this).val();
	    // change it to the following while deploying in Prod - Prod Deploy
  		// window.location.href=
		// "http://appointments.cs.odu.edu/home.php?splAdmin="+$(this).val();
  		});
	    
	    $(document).on("change",".appointmentToAdd #startDateIP ", function(){
	    	
	    	if(isAdmin){    	
	      		if(adminType != 3){
	    			var selStartMonth =$.trim( $(this).val()).split("-")[1];
	    	    	var curSem = "Fall"
	    	    	if(selStartMonth >=7 && selStartMonth <=10 ){
	    	    		curSem= "Fall";
	      	  		  }else if(selStartMonth <=3 || selStartMonth>=11 ){
	      	  			curSem= "Spring";
	      	  		  }else{
	      	  			curSem= "Summer";
	      	  		  }	 	
	    	    	$(this).parents("tr").find(".semesterIP").val(curSem);
	    	    	
	    		}
	    	}
	    });
	    

	    // karan edit
	    // writing new function for handling two
	  	$(document).on("click",".reAppointButt",function(){	 
	  		var isExit = false;
			var curRowParent = $(this).parents("tr");
			var extaRowParent = null;
			
			var isExit = false;
			
			/*
			 * var isExit = validateBeforeAdd_ReAppointment(curRowParent);
			 * if(isExit){ return false; }
			 * 
			 * if(parseInt(curRowParent.find(".reHoursIP").val()) < 20){
			 * if($(".extraPosToAdd_reap").length == 1){ extaRowParent =
			 * $(".extraPosToAdd_reap"); isExit =
			 * validateBeforeAdd_ReAppointment(extaRowParent); if(isExit){
			 * return false; } if(
			 * (parseInt(curRowParent.find(".reHoursIP").val()) +
			 * parseInt(extaRowParent.find(".reHoursIP").val())) > 20){
			 * alert("Total Students Hours id exceeding 20, please correct
			 * it."); isExit = true; } } }
			 * 
			 * if($(".extraPosToAdd_reap").length == 1){ extaRowParent =
			 * $(".extraPosToAdd_reap"); }
			 * 
			 * var dataArray =[]; var positionData =
			 * prepareData_forreappintment(curRowParent);
			 * dataArray.push(positionData); if(extaRowParent != null){
			 * positionData = prepareData_forreappintment(extaRowParent);
			 * dataArray.push(positionData); }
			 */

			var curReAppSem = cursemester;
			
			
			
			
			var totalHours = 0;
			
			$(".reAppointRow_afterCR").each(function(){

				curReAppSem = $(this).find(".reSemIP").val();
				if(!isExit){
					isExit = validateBeforeAdd_ReAppointment($(this));
					if(isExit){
						return false;
					}else{
						totalHours += parseInt($(this).find(".reHoursIP").val());
					}	
				}
			});
			
			var maxWorkHours = 20;
			if(curReAppSem == "Summer"){
				maxWorkHours =40;
			}else{
				maxWorkHours = 20;
			}	
		
			if(isExit){
				return false;
			}

			if(totalHours > maxWorkHours){
				alert("Total Students Hours id exceeding "+ maxWorkHours+ ", please correct it.");
				isExit = true;		
			}
					
			if(isExit){
				return false;
			}	
			var dataArray =[];
			var row_count=0;

			$(".reAppointRow_afterCR").each(function(){
				row_count++;
				var positionData = prepareData_forreappintment($(this));
				dataArray.push(positionData);	
			});
			
			
			
			
			 var confirmationStr =""; 
		 if(isExistingAppt){
			// confirmationStr = " Are you sure to import the existing
			// appointment for the student "+ data["firstNameIP"]+"
			// "+data["lastNameIP"]+"("+data["uinIP"]+")";
			 // confirmationStr+= " by prof "+
				// curRowParent.find(".staffIP").val()+" as a "+data["postIP"]+
				// " for "+data["semesterIP"]+"
				// "+data["yearIP"]+projectConfirmStr+" "+fundingDet+ " and pay
				// him "+data["salaryIP"]+" ?";
			 confirmationStr ="Confirm importing this Existing Appointment";
		 }else{
				// confirmationStr = " Are you sure to Appoint the student "+
				// data["firstNameIP"]+"
				// "+data["lastNameIP"]+"("+data["uinIP"]+")";
				// confirmationStr+= " as a "+data["postIP"]+ " for
				// "+data["semesterIP"]+" "+data["yearIP"]+projectConfirmStr+"
				// "+fundingDet+ " and pay him "+data["salaryIP"]+" ?";
			 //confirmationStr ="Confirm doing this new Appointment";

			 confirmationStr = "Are you sure to Appoint the student with the following details:"+
			 "\nStudent name :"+ dataArray[0]  ["firstNameIP"]+ " " + dataArray[0]["lastNameIP"];

			 for (i=0;i<row_count;i++) {
		 		 
		 		 //for
		 		var Budget_code= $(".reAppointRow_afterCR").eq(i).find(".reprojSel").val();
		 		var budgetCode=Budget_code.split("-");


		 		confirmationStr +="\nFor Position :"+ eval(i+1) + 
		 		"\nPost : "+ dataArray[i]["rePostIP"]+
		 		"\nNo of hours :"+ dataArray[i]["reHoursIP"]+
		 		"\nBudget_code :"+ budgetCode[0]+
		 		"\nStarting Date :"+ dataArray[i]["startdate"]+
		 		//"\nEnding Date : "+ dataArray[i]["reEndDateIP"]+
		 		"\nSalary : "+ dataArray[i]["reSalaryIP"];
		 	}


		 }
		var proceed = confirm(confirmationStr);	 
		 if(!proceed){
			 return false;
		 }
		 var jsonData = {"data":JSON.stringify({"dataset":dataArray})};
		 $('#cover').show();
	 		$.ajax({
		          type: "POST",
		         // url:
					// "/Prod_StudentAppointmentSystem/addReAppointment.php",
		          url: "/"+SERVERHOST+"_StudentAppointmentSystem/addReAppointmentNewService.php",
		          dataType: "text",
		          data:jsonData,
		          success: function( data, textStatus, jqXHR) {	
	 			 $('#cover').hide();
				     // var jObj = jQuery.parseJSON(data);
				    // console.log(jObj[0].stu_id);
	 			if($.trim(data).split("-")[0]== "success"){
	 				 successPopUpWithRD("Student Appointment Process is initiated");
	 			 // alert("Student Appointment Process is initiated");
				     // window.location.href =
						// "http://qav2.cs.odu.edu/Maheedhar/StudentRecruitmentTS/home.php";
	 			}else if($.trim(data).split("-")[0]== "fail"){
	 				
	 				if($.trim(data).split("-")[1] != ""){
	 					errorPopUp($.trim(data).split("-")[1]);
	 					// alert($.trim(data).split("-")[1]);
	 				}else{
		    				// alert("error: some problem while initiating the
							// Appointment!");
		    				errorPopUp("some problem while initiating the Appointment!");
	 				}		
	 			}			   
		          },
				  error: function( data, textStatus, jqXHR) {
		        	$('#cover').hide();
			      	// alert("error: some problem while sending an email!");
			       	errorPopUp("some problem while sending an email!");
			      }
	 		});   	
	  	});

		function prepareData_forreappintment(curRowParent){
			var data = {};
						
			var disabledIPs = curRowParent.find(':input:disabled').removeAttr('disabled');
		 				// serialize all input elements
			var formdata = curRowParent.find("input").serializeArray();
			 // re-disabled the set of inputs that you previously enabled
			disabledIPs.attr('disabled','disabled');

			var formdata = curRowParent.find("input").serializeArray();
			$(formdata).each(function(index, obj){
		    data[obj.name] = obj.value;
			});
			var firstandlastname=curRowParent.find("td.stuName").html();
			 // data["firstNameIP"] = firstandlastname.split(",")[0];
			 // data["lastNameIP"] =
				// (firstandlastname.split(",")[1]).split("-")[0];
			 data["recid"]= curRowParent.attr("id");
			 data["reProj"]= curRowParent.find(".reProjSel").val();
			 data["reSalaryIP"] = parseInt(curRowParent.find(".reSalaryIP ").val());
			 data["rePostIP"]= curRowParent.find(".rePostIP").val();
		 	 data["reHourIP"] = parseInt(curRowParent.find(".reHoursIP").val());
		 	 data["reTutionIP"] = parseInt(curRowParent.find(".reTutionIP").val());;
		 	data["reCreditsIP"] = parseInt(curRowParent.find(".reCreditsIP").val());;
			 if(isAdmin){
				 data["staffIP"]= curRowParent.find(".staffIP").attr("staffid");
				 data["extAppImpBy"] = loginUID;
			 }else{
				 data["staffIP"]= loginUID;
			 }

			 data["rePostIP"]= curRowParent.find(".rePostIP").val();  
			 data["reFundingIP"]= curRowParent.find(".reFundingIP").val();

			 selStartMonth=curRowParent.find(".reStartDateIP").val().split("-")[1];

			 // var selStartMonth =
				// parseInt(data["startDateIP"].split("-")[1]);
			 data["startdate"]= curRowParent.find(".reStartDateIP").val();
			 data["enddate"]= curRowParent.find(".reEndDateIP").val();
			 	var selSemester="";
			 	if(selStartMonth >=7 && selStartMonth <=10 ){
			 		selSemester= "Fall";
				  }else if(selStartMonth <=3 || selStartMonth>=11 ){
					selSemester= "Spring";
				  }else{
					selSemester= "Summer";
				  }	 	 
			 	
			 data["semester"]=selSemester; 
			 // to get the current academic year value
			 if(selSemester == "Spring"){
				 data["yearIP"] = (parseInt(data["startdate"].split("-")[0])-1)+"-"+(parseInt(data["startdate"].split("-")[0]));
			 }else if (selSemester == "Fall"){
				 data["yearIP"] = data["startdate"].split("-")[0]+"-"+(parseInt(data["startdate"].split("-")[0])+1);
			 }else{
				 data["yearIP"] = (parseInt(data["startdate"].split("-")[0])-1)+"-"+(parseInt(data["startdate"].split("-")[0]));
			 }
			 
			 
			 // data["tutionWaiveIP"]=
				// parseInt(curRowParent.find(".reTutionIP").val());
			 // data["noOfCreditsIP"]=
				// parseInt(curRowParent.find(".reCreditsIP").val());
			return data;
		}

		function validateBeforeAdd_ReAppointment(curRowParent){

			var isExit = false;
			var postionIdentifier="";
			var currentSemester= $(".reSemIP").val();


			if(curRowParent.hasClass("extraPosToAdd")){
				postionIdentifier=" for second position ";
			}else{
				postionIdentifier=" for first position ";
			}
			
			curRowParent.find("input.form-control").each(function(inputEle){				
				if($(this).val() == ""){
					// alert("Fill out the field: "+ $(this).attr("placeholder")
					// +" Properly before submitting");
					errorPopUp("Fill out the field: "+ $(this).attr("placeholder") + postionIdentifier +"Properly before submitting");
					isExit = true;
					return isExit;
				}						
			});		
			
			if(isExit){
				return true;
			}

			
			if (currentSemester="Summer"){

				if(parseInt(curRowParent.find(".reHoursIP").val()) == 0 || parseInt(curRowParent.find(".reHoursIP").val()) < 0 || parseInt(curRowParent.find(".reHoursIP").val())>40  ){
					// alert("A Number of hours of work the student must be
					// asigned is more than 0 and must be less than 20.");
					errorPopUp("A Number of hours of work the student must be asigned is more than 0 and must be less than 40. please correct it for"+postionIdentifier);
					isExit = true;
					return isExit;
				}
			}	
			else{

				if(parseInt(curRowParent.find(".reHoursIP").val()) == 0 || parseInt(curRowParent.find(".reHoursIP").val()) < 0 || parseInt(curRowParent.find(".reHoursIP").val())>20  ){
					// alert("A Number of hours of work the student must be
					// asigned is more than 0 and must be less than 20.");
					errorPopUp("A Number of hours of work the student must be asigned is more than 0 and must be less than 20. please correct it for"+postionIdentifier);
					isExit = true;
					return isExit;
				}

			}
			
			
			curRowParent.find("select.form-control").each(function(inputEle){				
				if($(this).val() == "0"){
					// alert("Fill select an option from the filed: "+
					// $(this).attr("purpose") +" properly before submitting");
					errorPopUp("Fill select an option from the filed: "+ $(this).attr("purpose") + postionIdentifier+" properly before submitting");
					isExit = true;
					return false;
				}						
			});
			
			if(isExit){
				return true;
			}
			
			var curPostVal = curRowParent.find(".rePostIP").val();	
			
			if(curPostVal == "GRA" ||curPostVal == "SGRA"){		
				if (curRowParent.find(".reProjSel").val() == "None-0"){
					// alert("There must be a project assigned to a sudent if he
					// is appointed as GRA, Please choose a project");
					errorPopUp("There must be a project assigned to a sudent if he is appointed as GRA, Please choose a project"+postionIdentifier);
					isExit = true;
					return isExit;
				}
			}
		}
  	  
  	$(document).on("click",".attachFileExistApp",function(){	   		
  		$(".signedOfferExistAppt").click();
  	});
  	
	$(document).on("change",".signedOfferExistAppt",function(){	 
		var chosedFNameArr = $(this).val().split("\\");
		$(".choosedFNameExistApp").html(chosedFNameArr[chosedFNameArr.length -1]);		
	});
  	
  	// adding the extra position stuff
	$(document).on("click",".addOtherPosition",function(){
		var ParentTr = $(this).parents("tr")

		var CheckHours;// CheckHours is for comparing number of hours for
						// semester
		var CurrenSem=ParentTr.find(".semesterIP").val();
		if(CurrenSem=="Summer"){
			CheckHours=40;
		}
		else{
			CheckHours=20;
		}
		console.log("inside the add position click")
		if($.trim(ParentTr.find("td").eq(0).find("input").val()) == ""){
			alert("Select the student first before adding another position");
		}else if(parseInt(ParentTr.find(".hoursIP").val()) >= CheckHours){

			alert("Can't add another position as student is occupied for 20 hours already.");
			// to implement adding another postion concept
		}else{

			  var additionalPosTr = ParentTr.clone();	  
			  additionalPosTr.addClass("extraPosToAdd");
			  additionalPosTr.find(".nameUINGroupAddApp").css("visibility","hidden");
			  additionalPosTr.find(".buttGroupAddApp").css("visibility","hidden");
			  additionalPosTr.insertAfter(ParentTr);
			  $(".addOtherPosition").hide();
			  addPositionCouter++;

		}
	});

	// add row for reappoint reap********************************
	$(document).on("click",".addOtherPosition_reap",function(){	 
		var ParentTr = $(this).parents("tr")
		/* alert(ParentTr.find("td").eq(0).find("input").val()); */
		console.log("inside the add position click")
		/*
		 * if($.trim(ParentTr.find("td").eq(0).find("input").val()) == ""){
		 * alert("Select the student first before adding another position");
		 * }else
		 */ if(parseInt(ParentTr.find(".reHoursIP").val()) >= 20){
			alert("Can't add another position as student is occupied for 20 hours already.");
			// to implement adding another postion concept
		}else{

			  var additionalPosTr_reap = ParentTr.clone();	
			  
			  additionalPosTr_reap.find(".stuUIN").css("visibility","hidden");
			  additionalPosTr_reap.find(".stuName").css("visibility","hidden");
			  additionalPosTr_reap.find(".addOtherPosition_reap").css("visibility","hidden");
			  additionalPosTr_reap.find(".reAppointButt").css("visibility","hidden");   
			  additionalPosTr_reap.addClass("extraPosToAdd_reap");
			  additionalPosTr_reap.insertAfter(ParentTr);
			 /*
				 * $(".addOtherPosition").hide(); addPositionCouter_reap++;
				 */

		//
	}
	});
	
	
	// getting the
	$(document).on("keyup",".hoursIP",function(){	 
		
		if($(".semesterIP").val() == "Summer"){
			if(parseInt($(this).val()) < 40){
				$(".addOtherPosition").show();
			}else{
				// Also have to take care of newly added position, whether it
				// has to be removed or not
				$(".addOtherPosition").hide();
			}
		}else{
			if(parseInt($(this).val()) < 20){
				$(".addOtherPosition").show();
			}else{
				// Also have to take care of newly added position, whether it
				// has to be removed or not
				$(".addOtherPosition").hide();
			}
		}
			
		
	});


	$(document).on("keyup",".reHoursIP",function(){	 

		// var ParentTR = $(this).parents("tr");
		// $('<i class="fa fa-plus addOtherPosition_reap" title="Add Position"
		// style="font-size:20px;margin-top:
		// 8%;display:none;"></i>').insertBefore(ParentTR.find(".reAppointButt"));
		// ParentTR.find(".reAppointButt").prepend('<div><i class="fa fa-plus
		// addOtherPosition_reap" title="Add Position"
		// style="font-size:20px;margin-top: 8%;display:none;"></i></div>');
		if(parseInt($(this).val()) < 20){
			 
			$(".addOtherPosition_reap").show();
		}else{
			// Also have to take care of newly added position, whether it has to
			// be removed or not
			$(".addOtherPosition_reap").hide();
		}
	});


	
	
  	    
   // this event for adding new appointment
  	$(".addNewAppointmet").on("click",function(){
  		if(isAdmin){
  			isExistingAppt = true;
  		}else{
  			isExistingAppt = false;
  		}
  		// to make any number of appointments to be initiated at once by Faculty
		// -- currently left unimplemented have to revisit this
  		if(inBTWAddition){
	  		// alert("Please add one Appointment at a time.");
	  		errorPopUp("Please add one Appointment at a time.");
	  		return false;
	  	}
	  	inBTWAddition = true;
  		
  		var formGroupDiv = "<div class='form-group'>";		    	 
  		var divEnding = "</div>";

  		  var today = new Date();
  		  var currentMonth = today.getMonth()+1; // Default January is 0, so
													// incrementing by 1!
  		  var currentYear = today.getFullYear();
  		  var defaultSal = "3200";
  		  var defaultSemester="";
  		  var defaultStartDate=currentYear+"-08-01";
  		  var defaultEndDate=currentYear+"-12-15";
  		  var defaultTutionWaiver = 50;
  		  var defaultNoofCredits = 9;
  		  var defaultWorkinghours= 20;
  		  
  		  // this code segemets are for the 8 week rule to populate the
			// default semester
  		  if(currentMonth >=7 && currentMonth <=10 ){
  			defaultStartDate = currentYear+"-08-01";
  			defaultEndDate = currentYear+"-12-15";
  			defaultSemester= "Fall";
  		  }else if(currentMonth <=3 || currentMonth>=11 ){
  			  
  			if(currentMonth>=11){
				 
				  defaultStartDate = (currentYear+1)+"-01-02";
				  defaultEndDate = (currentYear+1)+"-04-15";
				
			  }else if(currentMonth <=3){
				
				  defaultStartDate = currentYear+"-01-02";
				  defaultEndDate = currentYear+"-04-15";
			  }		  			 
  			defaultSemester= "Spring";
  			
  		  }else{
  			  
  			defaultStartDate = (currentYear)+"-05-01";
  			defaultEndDate = (currentYear)+"-07-15";
  			defaultSemester= "Summer";
  			
  		  }
  		  if(defaultSemester=="Summer"){
  		  	defaultSal = "2500";
  		  	defaultWorkinghours=40;
  		  }
	  
		    var postSelectStr = '<select purpose="Post" class="form-control postIP" name="postIP"><option value="0">select post</option><option value="GRA">GRA</option><option value="SGRA">SGRA</option><option value="GTA">GTA</option><option value="Grader">Grader</option></select>';
  		   // var semSelectStr = '<select purpose="Semester"
			// class="form-control semesterIP" name="semesterIP"><option
			// value="0">select semester</option><option
			// value="Spring">Spring</option><option
			// value="Summer">Summer</option><option
			// value="Fall">Fall</option></select>';
  		    var fundingSelStr = '<select purpose="Funding" class="form-control fundingIP" name="fundingIP"><option value="1">ODU</option><option value="2">ODURF</option></select>';

  		  /*
			 * now chaninging the order of the fields from order :
			 * UIN,StudentName, Post, StartDate,
			 * EndDate,%T,#cr,$Sal,Hrs,Project(Budjet),Funcding,Faculty,OfferStatus,Offer
			 * Docs,Action to Following order :
			 * 
			 * UIN,StudentName,Post,Faculty,Project(Budjet),Funding, StartDate,
			 * EndDate,%T,#cr,$Sal,Hrs,OfferStatus,Offer Docs,Action
			 */		
		 	
  		    
	      	var editableRow ='<tr class="appointmentToAdd"><td class="nameUINGroupAddApp">'+formGroupDiv+'<input type="text" name="uinIP" class="uinIP txt-auto form-control  width_100Per " placeholder="Uin"  required />'+divEnding+'</td>';
	      		editableRow+='<td class="nameUINGroupAddApp">'+formGroupDiv +'<input type="text" name="nameIP" id="nameIP" class="nameIP txt-auto form-control width_100Per" placeholder="Name" required />'+divEnding+'</td>';	      		
	      		
	      		if(isAdmin){
	      			if(adminType != 3){
	      				editableRow+='<td>'+formGroupDiv +'<input type="text" name="staffIP" class="staffIP form-control txt-auto width_100Per" placeholder="Staff Name" required />'+divEnding+'</td>';
	      			}
	      		}
	      		
	      		editableRow+='<td>'+formGroupDiv+postSelectStr+divEnding+'</td>';
	      		 if(isAdmin){
		      			projOptionStr ='<option value="None-0">None</option><option value="createNew-">Create New</option>';
	      		  }
		      		// to populate all the projects
  		    	var projSelectStr = '<select class="form-control projSel" name="projSel">'+ projOptionStr+'</select>';
		    	editableRow+='<td>'+formGroupDiv +fundingSelStr+divEnding+'</td>'; 
		    	editableRow+='<td>'+formGroupDiv +projSelectStr+divEnding+'</td>';   	      		
		      	  
		    	
		    	// condition to get the select boxes in the multiple position
				// admin
		    	if(isAdmin){
	      			if(adminType != 3){
	      				editableRow+='<td>'+formGroupDiv +'<Select name="semesterIP" class="semesterIP txt-auto form-control width_100Per"><option value="Fall">Fall</option><option value="Spring">Spring</option><option value="Summer">Summer</option> </select>'+divEnding+'</td>';
	      			}
		    	}else{
		      		editableRow+='<td>'+formGroupDiv +'<input type="text" name="semesterIP" disabled class="semesterIP txt-auto form-control width_100Per" placeholder="Semester" required value="'+ defaultSemester +'"/>'+divEnding+'</td>';
		    	}

	      		// the below one is from StartDate and EndDate
	      		editableRow+='<td>'+formGroupDiv+'<input type="date" name="startDateIP" id="startDateIP" class="startDateIP width85p txt-auto form-control " placeholder="Semester Start Date" title="Semester Start Date"  required /> '+divEnding+'</td>'
	      		editableRow+='<td>'+formGroupDiv+'<input type="date" name="endDateIP" id="endDateIP" class="endDateIP width85p txt-auto form-control "  placeholder="Semester End date" title="Semester End Date" required /> '+divEnding+'</td>'	      	
	      		


	      		// editableRow+='<td>'+formGroupDiv+semSelectStr+divEnding+'</td>';
	      		// editableRow+='<td>'+formGroupDiv +'<input type="number"
				// name="yearIP" class="yearIP txt-auto form-control
				// width_100Per" placeholder="Year" required value="'+
				// currentYear +'"/>'+divEnding+'</td>';
	      		


	      		// the following two are added for additional requirements of
				// tutuion and no of credit hours
	      		if(isExistingAppt){
	      			editableRow+='<td>'+formGroupDiv +'<input type="number" name="tutionWaiveIP" class="tutionWaiveIP txt-auto form-control width_100Per" placeholder="Tution Waive" required value="'+ defaultTutionWaiver +'"/>'+divEnding+'</td>';
		      		editableRow+='<td>'+formGroupDiv +'<input type="number" name="noOfCreditsIP" class="noOfCreditsIP txt-auto form-control width_100Per" placeholder="No.of Credits" required value="'+ defaultNoofCredits +'"/>'+divEnding+'</td>';	      		
	      		}else{
	      			editableRow+='<td>'+formGroupDiv +'<input type="number" name="tutionWaiveIP" disabled class="tutionWaiveIP txt-auto form-control width_100Per" placeholder="Tution Waive" required value="'+ defaultTutionWaiver +'"/>'+divEnding+'</td>';
		      		editableRow+='<td>'+formGroupDiv +'<input type="number" name="noOfCreditsIP" disabled class="noOfCreditsIP txt-auto form-control width_100Per" placeholder="No.of Credits" required value="'+ defaultNoofCredits +'"/>'+divEnding+'</td>';		      		
	      		}	      		  		
	      		editableRow+='<td>'+formGroupDiv +'<input type="number" name="salaryIP" class="salaryIP form-control txt-auto width_100Per" placeholder="Salary" required value="'+ defaultSal +'"/>'+divEnding+'</td>';
	      		editableRow+='<td>'+formGroupDiv +'<input type="number" name="hoursIP" class="hoursIP form-control txt-auto width_100Per" placeholder="Hours" required value="'+ defaultWorkinghours +'"/>'+divEnding+'</td>';	    		
		
	      		if(isAdmin){
		      		editableRow+='<td class="buttGroupAddApp">'+formGroupDiv +'<i class="fa fa-paperclip attachFileExistApp" title="Attach the appointment letter" style="margin-top:10%;margin-left:8%;font-size:25px;" aria-hidden="true"></i><br/><span class="choosedFNameExistApp"></span><input type="file" class="signedOfferExistAppt hidden btn btn-primary" title="Choose the signed offer letter" style="width:95%;">'+divEnding+'</td>';     	
		      		editableRow+='<td class="buttGroupAddApp">'+formGroupDiv +'<i class="fa fa-plus addOtherPosition" title="Add Another Position" style="margin-top: 8%;display:none;"></i><button type="button" title="Import Existing Appointment" class="submitExistAppt btn btn-success pull-right" onclick="addNewAppointmentExtraChange($(this))">Import</button>'+divEnding+'</td>';     	
		      		editableRow+='<td class="buttGroupAddApp">'+formGroupDiv +'<button type="button" class="closeAppmntRow btn btn-success pull-left" onclick="closeAppmntRow($(this))">close</button>'+divEnding+'</td></tr>';     	
	      		}
	      		else{
	      			// font-size:20px; has been taken out becasue button is
					// moving down when changing the value
	      			editableRow+='<td class="buttGroupAddApp">'+formGroupDiv +'<i class="fa fa-plus addOtherPosition" title="Add Another Position" style="margin-top: 8%;display:none;"></i><button type="button" class="submitAppointment btn btn-success pull-right" onclick="addNewAppointmentExtraChange($(this))">Appoint</button>'+divEnding+'</td>';     	
		      		editableRow+='<td class="buttGroupAddApp">'+formGroupDiv +'<button type="button" class="closeAppmntRow btn btn-success pull-left" onclick="closeAppmntRow($(this))">close</button>'+divEnding+'</td></tr>';     	
	      		}
	      
	      		$("#RecruitedStuTable tbody").prepend(editableRow);
	      		if(isAdmin){
	      			if(adminType != 3){		
	      				$(".appointmentToAdd .semesterIP").val(defaultSemester);
	      			}
	      		}
	    	    var today = new Date().toISOString().split('T')[0];
	    	    // $(".appointmentToAdd .startDateIP").attr('min', today);
	    	    $(".appointmentToAdd .startDateIP").val(curSemStartDate);
	    	    
	    	    $(".appointmentToAdd .endDateIP").val(curSemEndDate);	    	    
	    	    // $(".appointmentToAdd .endDateIP").attr('min', today);
	      		
	      		$staffId = loginUID;
	    		if(isAdmin){
	    			// here the staffID of the selected staff has to be filled
	    			$staffId = loginUID;
	    		}
   	
	      	// $(".semesterIP").val(defaultSemester);
	      		      	
	      	// type a head of student UIN
	      	$( "input.uinIP" ).keyup(function() {
	      		$(".resSuggDiv").remove();
	      		 curIPunderSugg = $(this);
	      		 var curRowParent = $(this).parents("tr");
	      		var strVal = $(this).val().trim();
	      		curRowParent.find("#nameIP").val("");
	      		if(strVal.length >=2){	
	      			
	      			$.ajax({
		  		          type: "GET",
		  		          // url:
							// "/Prod_StudentAppointmentSystem/autoCompleteStudentUIN.php?searchVal="+strVal,
		  		          url: "/"+SERVERHOST+"_StudentAppointmentSystem/autoCompleteStudentUIN.php?searchVal="+strVal,
		  		          dataType: "text",
		  		          success: function( data, textStatus, jqXHR) {			      				       				     
		  				   	var result = $.parseJSON(data);
		  				   	if(result.length == 0){
		  				   		if(strVal.length == 8){	
		  							 $('#cover').show();
		  							successPopUp("No Student found with this UIN in the Local DB, Initiating the LDAP Search...");
		  				   			// alert("No Student found with this UIN in
									// the Local DB, Initiating the LDAP
									// Search...");
			  				   		LDAPSearchByUIN(strVal);
		  				   		}		  				   			  				   		
		  				   	}else{		
		  				   		var listGroupDiv = $("<div class='resSuggDiv'><ul class='list-group'></ul></div>");				   	
		  				   		var liComp = "";
		  				   		$.each(result,function(index,value){
		  				   			liComp += '<li class="list-group-item stuUINSuggList" id="'+value.split("-")[0] +'" gradlevel="'+value.split("-")[2] +'">'+value.split("-")[1]+'</li>';		  				   		
		  				   		});
		  				   		listGroupDiv.find("ul").append(liComp);
		  				   		$("body").append(listGroupDiv);
		  				   			listGroupDiv.css( {position:'absolute',
		  				   			 top:curIPunderSugg.offset().top+31,
			  				   		  left:curIPunderSugg.offset().left
		  				   		});
		  				   		
		  				   		$(".stuUINSuggList").click(function(){		  
			  				   		if($(this).attr("gradLevel") == "phd"){
						   				var optStrPHD = '<option value="0">select Post</option><option value="PHD_GRA">PHD-GRA</option><option value="PHD_SGRA">PHD-SGRA</option><option value="PHD_GTA">PHD-GTA</option><option value="PHD_Grader">PHD-Grader</option>';
						   				curRowParent.find(".tutionWaiveIP").val("100");
						   				curRowParent.find(".noOfCreditsIP").val("6");
						   				curRowParent.find(".postIP").html(optStrPHD);
						   			}else{
						   				var optStrGrad = '<option value="0">select post</option><option value="GRA">GRA</option><option value="SGRA">SGRA</option><option value="GTA">GTA</option><option value="Grader">Grader</option>';
						   				curRowParent.find(".tutionWaiveIP").val("75");
						   				curRowParent.find(".noOfCreditsIP").val("6");
						   				curRowParent.find(".postIP").html(optStrGrad);
						   			}
		  				   			curIPunderSugg.val($(this).html());
		  				   			curRowParent.find("#nameIP").val($(this).attr("id"));
		  				   			$(".resSuggDiv").remove();
		  				   		});	
		  				   	}		  				   	
		  		          },
			  			  error: function( data, textStatus, jqXHR) {
			  		      	// alert("error: some problem!");
		  		        	  errorPopUp("some problem!");
			  		      }
		  	    		});    	
	      		}
	      	});
	      	
	      	
	      	// type a head of student Name
	    	$( "input#nameIP" ).keyup(function() {
	      		 curIPunderSugg = $(this);
	      		 var curRowParent = $(this).parents("tr");
	      		$(".resSuggDiv").remove();
	      		var strVal = $(this).val().trim();
	      		curRowParent.find(".uinIP").val("");
	      		if(strVal.length >=2){	      		
	      			$.ajax({
		  		          type: "GET",
		  		          // url:
							// "/Prod_StudentAppointmentSystem/autoCompleteStudentName.php?searchVal="+strVal,
		  		          url: "/"+SERVERHOST+"_StudentAppointmentSystem/autoCompleteStudentName.php?searchVal="+strVal,
		  		          dataType: "text",
		  		          success: function( data, textStatus, jqXHR) {			      				       				     
		  				   	var result = $.parseJSON(data);
		  				   	if(result.length == 0){
			  				   	if(strVal.length > 3){	
		  							$('#cover').show();
		  							// commented as felt unnessesary, cause the
									// reponse from DB is always fast, so just
									// commented not to annoy
		  							// successPopUp("No Student found with this
									// name in the Local DB, Initiating the LDAP
									// Search...");
		  				   			// alert("No Student found with this name in
									// the Local DB, Initiating the LDAP
									// Search...");
			  				   		LDAPSearchByName(strVal);
		  				   		}		
		  				   	}else{		  				   	 				   			   		
		  				   		var listGroupDiv = $("<div class='resSuggDiv'><ul class='list-group'></ul></div>");				   	
		  				   		var liComp = "";
		  				   		$.each(result,function(index,value){
		  				   			liComp += '<li class="list-group-item stuNameSuggList" id="'+value.split("-")[1] +'" gradlevel="'+value.split("-")[2] +'">'+value.split("-")[0]+'</li>';		  				   		
		  				   		});
		  				   		listGroupDiv.find("ul").append(liComp);
		  				   		$("body").append(listGroupDiv);
		  				   			listGroupDiv.css( {position:'absolute',
		  				   			 top:curIPunderSugg.offset().top+31,
			  				   		  left:curIPunderSugg.offset().left
		  				   		});
		  				   		
		  				   		$(".stuNameSuggList").click(function(){	
			  				   		if($(this).attr("gradLevel") == "phd"){
						   				var optStrPHD = '<option value="0">select post</option><option value="PHD_GRA">PHD-GRA</option><option value="PHD_SGRA">PHD-SGRA</option><option value="PHD_GTA">PHD-GTA</option><option value="PHD_Grader">PHD-Grader</option>';
						   				if($(".semesterIP").val() != "Summer"){
						   					curRowParent.find(".tutionWaiveIP").val("100");
							   				curRowParent.find(".noOfCreditsIP").val("6");
						   				}else{
						   					curRowParent.find(".tutionWaiveIP").val("100");
							   				curRowParent.find(".noOfCreditsIP").val("3");
						   				}
						   				curRowParent.find(".postIP").html(optStrPHD);
						   			}else{
						   				var optStrGrad = '<option value="0">select post</option><option value="GRA">GRA</option><option value="SGRA">SGRA</option><option value="GTA">GTA</option><option value="Grader">Grader</option>';
						   				
						   				if($(".semesterIP").val() != "Summer"){
						   					curRowParent.find(".tutionWaiveIP").val("75");
							   				curRowParent.find(".noOfCreditsIP").val("6");
						   				}else{
						   					curRowParent.find(".tutionWaiveIP").val("75");
							   				curRowParent.find(".noOfCreditsIP").val("3");
						   				}	
						   				curRowParent.find(".postIP").html(optStrGrad);
						   			}
		  				   			curIPunderSugg.val($(this).html());
		  				   			curRowParent.find(".uinIP").val($(this).attr("id"));
		  				   			$(".resSuggDiv").remove();
		  				   		});	
		  				   	}		  				   	
		  		          },
			  			  error: function( data, textStatus, jqXHR) {
			  		      	// alert("error: some problem!");
			  		      	errorPopUp("some problem!");
			  		      }
		  	    		});    	
	      		}
	      	});
	      		      
	    	
	    	// type a head of FacultyNameN
	    	$( "input.staffIP" ).keyup(function() {
	      		 curIPunderSugg = $(this);
	      		 var curRowParent = $(this).parents("tr");
	      		$(".resSuggDiv").remove();
	      		var strVal = $(this).val().trim();
	      		if(strVal.length >=2){	      		
	      			$.ajax({
		  		          type: "GET",		  		        
		  		          url: "/"+SERVERHOST+"_StudentAppointmentSystem/autoCompleteStaffName.php?searchVal="+strVal,
		  		          dataType: "text",
		  		          success: function( data, textStatus, jqXHR) {			      				       				     
		  				   	var result = $.parseJSON(data);
		  				   	if(result.length == 0){
			  				   	if(strVal.length > 3){	
		  							$('#cover').show();
		  							successPopUp("No Professor found with this name in the Local DB, Initiating the LDAP Search...");
		  				   			// alert("No Student found with this name in
									// the Local DB, Initiating the LDAP
									// Search...");
			  				   		// LDAPSearchByName(strVal);
		  				   		}		
		  				   	}else{		  				   	 				   			   		
		  				   		var listGroupDiv = $("<div class='resSuggDiv'><ul class='list-group'></ul></div>");				   	
		  				   		var liComp = "";
		  				   		$.each(result,function(index,value){
		  				   			liComp += '<li class="list-group-item proffNameSuggList" id="'+value.split("-")[1] +'">'+value.split("-")[0]+'</li>';		  				   		
		  				   		});
		  				   		listGroupDiv.find("ul").append(liComp);
		  				   		$("body").append(listGroupDiv);
		  				   			listGroupDiv.css( {position:'absolute',
		  				   			 top:curIPunderSugg.offset().top+31,
			  				   		  left:curIPunderSugg.offset().left
		  				   		});
		  				   		
		  				   		$(".proffNameSuggList").click(function(){	
		  				   			curIPunderSugg.val($(this).html());
		  				   			curIPunderSugg.attr("staffid",$(this).attr("id"));
		  				   			$(".resSuggDiv").remove();
		  				   			$(".appointmentToAdd .postIP").val("0");
		  				   			ajaxGetProjByStaffIDAddExistingApp($(this).attr("id"));
		  				   		});	
		  				   	}		  				   	
		  		          },
			  			  error: function( data, textStatus, jqXHR) {
			  		      	// alert("error: some problem!");
			  		      	errorPopUp("some problem!");
			  		      }
		  	    		});    	
	      		}
	      	});
	    	
	    	
	    	
	   });  
  	
  	
  	

	});
}


// return the String combination of "next Sem|(Accademic)Year-year|(Genuine
// Date)StartDate|EndDate"
function getNextSemAndYear(semyearStr){
	var curSem =  $.trim(semyearStr.split("|")[0]);
	var curAccYear = $.trim(semyearStr.split("|")[1]);
	var startYear= parseInt(curAccYear.split("-")[0]);
	var endYear = parseInt(curAccYear.split("-")[1]);
	var nextSem="";
	var semAndYear = "";
	var nextSemDefSDate="";
	var nextSemDefEDate="";

	if(curSem.toUpperCase() =="SPRING"){
		nextSem = "Summer";
		// semAndYear="Summer|"+curAccYear+"|"+endYear+"-05-01"+"|"+endYear+"-07-15";
		nextSemDefSDate = endYear+"-05-01";
		nextSemDefEDate = endYear+"-07-15";	
		semAndYear= "Summer|"+curAccYear+"|";
		
	}else if(curSem.toUpperCase() == "SUMMER"){
  // for instance - Fall|2016-2017|2016-08-01|2016-12-15
		curAccYear = endYear+"-"+(endYear+1);
		nextSem = "Fall";
		// semAndYear="Fall|"+curAccYear+"|"+endYear+"-08-01"+"|"+endYear+"-12-15";
		nextSemDefSDate = endYear+"-08-01";
		nextSemDefEDate = endYear+"-12-15";	
		semAndYear="Fall|"+curAccYear+"|";
	}else{		
		
		// semAndYear=
		// "Spring|"+curAccYear+"|"+endYear+"-01-01|"+endYear+"-04-15";
		nextSem = "Spring";
		nextSemDefSDate = endYear+"-01-02";
		nextSemDefEDate = endYear+"-04-15";	
		semAndYear= "Spring|"+curAccYear+"|";
	}
	// this one is to get the semester Start and End from the DataBase
	$.ajax({
          type: "GET",
          url: "/"+SERVERHOST+"_StudentAppointmentSystem/updateSettingsAdmin.php?action=6&sem="+nextSem+"&accyear="+curAccYear+"&defStartDate="+nextSemDefSDate+"&defEndDate="+nextSemDefEDate+"&oduRRF=1",
          dataType: "text",
          success: function( data, textStatus, jqXHR) {			  			
		 	if($.trim(data).split("|")[0] == "Success"){
		 		if($.trim(data).split("|")[1] == "definsert"){

		 		}else{
		 			nextSemDefSDate = $.trim(data).split("|")[1];
		 			nextSemDefEDate = $.trim(data).split("|")[2];	
		 			$(".reStartDateIP").val(nextSemDefSDate);
		 			$(".reEndDateIP").val(nextSemDefEDate);
		 		}
		 	
		 	}else{
		 		var errMsg = "some problem while getting the start and end dates of the semester details";
	         	errorPopUp(errMsg);
		 	}
          },
		  error: function( data, textStatus, jqXHR) {
        	$('#cover').hide();
	      	// alert("error: some problem while getting the project details");
         	var errMsg = "some problem while getting the start and end dates of the semester details";
         	errorPopUp(errMsg);	 
	      }
  	}); 	

	return semAndYear+ nextSemDefSDate+"|"+nextSemDefEDate;
}





// construct the project select box on fly
function projSelectHelper(ParentTR,prePost){ 
	    var projSelectStr = '<span class="tSpan"><select class="form-control reProjSel" name="reProjSel">'+projOptionStr +'</select></span>';		
		var preProjName = jQuery.trim(ParentTR.find(".stuProj .oSpan").text());
		var preProjId = jQuery.trim(ParentTR.find(".stuProj").attr("projId"));
		ParentTR.find(".stuProj .oSpan").hide();
		ParentTR.find(".stuProj").append(projSelectStr);
		ParentTR.find(".reProjSel").val(preProjName+"-"+preProjId); 
		if(prePost == "GTA" || prePost == "Grader"){
    		// commented beacuse looks like even GTA and Grader has the Budget
			// code and Project number
			// ParentTR.find(".reProjSel").attr("disabled","disabled");
			ParentTR.find(".reProjIP").remove();
		}
}

// construct the project select box on fly
function projSelectHelperInEdit(ParentTR,prePost){ 
	    var projSelectStr = '<span class="tSpan"><select class="form-control projSel" name="projSel">'+projOptionStr +'</select></span>';		
		var preProjName = jQuery.trim(ParentTR.find(".stuProj .oSpan").text());
		var preProjId = jQuery.trim(ParentTR.find(".stuProj").attr("projId"));
		ParentTR.find(".stuProj .oSpan").hide();
		ParentTR.find(".stuProj").append(projSelectStr);
		ParentTR.find(".projSel").val(preProjName+"-"+preProjId); 
		if(prePost == "GTA" || prePost == "Grader"){
    		// commented beacuse looks like even GTA and Grader has the Budget
			// code and Project number
			// ParentTR.find(".reProjSel").attr("disabled","disabled");
			ParentTR.find(".reProjIP").remove();
		}
}



function closeAppmntRow(buttonClicked){
	buttonClicked.parents("tr").remove();
	$(".extraPosToAdd").remove();
	addPositionCouter = 0;
	inBTWAddition = false;

}




// this is the method that get called on click of new appointment submit
// go///////////////////////////
function addNewAppointment(buttonClicked){
	// alert("clicked Button");
	var isExit = false;

	var curRowParent= buttonClicked.parents("tr");
	var extaRowParent = null;

	curRowParent.find("input.form-control").each(function(inputEle){				
		if($(this).val() == ""){
			// alert("Fill out the field: "+ $(this).attr("placeholder") +"
			// Properly before submitting");
			errorPopUp("Fill out the field: "+ $(this).attr("placeholder") +" Properly before submitting");
			isExit = true;
			return false
		}						
	});			
	if(isExit){
		return false;
	}
	

	
	if(parseInt(curRowParent.find(".hoursIP").val()) == 0 || parseInt(curRowParent.find(".hoursIP").val()) < 0 || parseInt(curRowParent.find(".hoursIP").val())>20  ){
		// alert("A Number of hours of work the student must be asigned is more
		// than 0 and must be less than 20.");
		errorPopUp("A Number of hours of work the student must be asigned is more than 0 and must be less than 20.");
		return false;
	}
	
	
	var curPostVal = curRowParent.find(".postIP").val();	
	
	if(curPostVal == "GRA" ||curPostVal == "SGRA"){		
		if (curRowParent.find(".projSel").val() == "None-0"){
			// alert("There must be a project assigned to a sudent if he is
			// appointed as GRA, Please choose a project");
			errorPopUp("There must be a project assigned to a sudent if he is appointed as GRA, Please choose a project");
			return false;
		}
	}


	curRowParent.find("select.form-control").each(function(inputEle){				
		if($(this).val() == "0"){
			// alert("Fill select an option from the filed: "+
			// $(this).attr("purpose") +" properly before submitting");
			errorPopUp("Fill select an option from the filed: "+ $(this).attr("purpose") +" properly before submitting");
			isExit = true;
			return false;
		}						
	});
	// for extra position adding stuuf
	if(parseInt(curRowParent.find(".hoursIP").val()) < 20){
		if($(".extraPosToAdd").length == 1){
			extaRowParent = $(".extraPosToAdd");
			if( (parseInt(curRowParent.find(".hoursIP").val()) + parseInt(extaRowParent.find(".hoursIP").val())) > 20){
				alert("Total Students Hours id exceeding 20, please correct it.");
				isExit = true;		
			}
		}
	}
	
	
	
	if(isExit){
		return false;
	}	
	
	var formdata = curRowParent.find("input").serializeArray();
	var data = {};
	$(formdata).each(function(index, obj){
	    data[obj.name] = obj.value;
	});
	
	 data["firstNameIP"] = data["nameIP"].split(",")[0];
	 data["lastNameIP"] = (data["nameIP"].split(",")[1]).split("-")[0];
	 
	 if(isAdmin){
		 data["staffIP"]= curRowParent.find(".staffIP").attr("staffid");
		 data["extAppImpBy"] = loginUID;
	 }else{
		 data["staffIP"]= loginUID;
	 }

	 data["postIP"]= curRowParent.find(".postIP").val();
	 
	 data["fundingIP"]= curRowParent.find(".fundingIP").val();
	
	 
	 var selStartMonth = parseInt(data["startDateIP"].split("-")[1]);
	 	var selSemester="";
	 	if(selStartMonth >=7 && selStartMonth <=10 ){
	 		selSemester= "Fall";
		  }else if(selStartMonth <=3 || selStartMonth>=11 ){
			selSemester= "Spring";
		  }else{
			selSemester= "Summer";
		  }	 	 
	 	

	 data["semesterIP"]=selSemester; 
	 // to get the current academic year value
	 if(selSemester == "Spring"){
		 data["yearIP"] = (parseInt(data["startDateIP"].split("-")[0])-1)+"-"+(parseInt(data["startDateIP"].split("-")[0]));
	 }else if (selSemester == "Fall"){
		 data["yearIP"] = data["startDateIP"].split("-")[0]+"-"+(parseInt(data["startDateIP"].split("-")[0])+1);
	 }else{
		 data["yearIP"] = (parseInt(data["startDateIP"].split("-")[0])-1)+"-"+(parseInt(data["startDateIP"].split("-")[0]));
	 }
	 
	 var projIp = "",projId="", projectConfirmStr = "";
		if( curRowParent.find(".projSel").val().split("-")[0]== "createNew"){
			
			projIp = curRowParent.find(".projIP").val();
			projId="";
			projectConfirmStr = " on a New Project "+projIp.toUpperCase();
			if($.trim(projIp) == ""){
	 			// alert("Please fill in the Project field correctly");
				errorPopUp("Please fill in the Project field correctly");

	 			return false;
			}			
		}else{
			projIp = curRowParent.find(".projSel").val().split("-")[0];

			projId= curRowParent.find(".projSel").val().split("-")[1];
			
			if(  curRowParent.find(".projSel").val().split("-")[1]!= "0"){
				projectConfirmStr = " on a Budget Code "+projIp.toUpperCase();
			}			
		}
	 data["projIP"]= projIp.toUpperCase();
	 data["projID"]= projId;
	 
	 data["tutionWaiveIP"]= parseInt(curRowParent.find(".tutionWaiveIP").val());
	 data["noOfCreditsIP"]= parseInt(curRowParent.find(".noOfCreditsIP").val());
	 if(projIp == "")
	 {
		 // alert("please give a proper name for the project");
		 errorPopUp("please give a proper name for the project");

		 return;
	 }
	 var fundingDet = "";
	 if(data["fundingIP"] == "1"){
		 fundingDet = "funded by ODU";
	 }else{
		 fundingDet = "funded by ODU Research Fundation";
	 }
	 
	 


	 var confirmationStr =""; 
	 if(isExistingAppt){
		 
		// if($(".signedOfferExistAppt").val() == ""){
			// errorPopUp("Please attach the existing appointment offer
			// letter.");
			// return false;
		// }
		// confirmationStr = " Are you sure to import the existing appointment
		// for the student "+ data["firstNameIP"]+"
		// "+data["lastNameIP"]+"("+data["uinIP"]+")";
		// confirmationStr+= " by prof "+ curRowParent.find(".staffIP").val()+"
		// as a "+data["postIP"]+ " for "+data["semesterIP"]+"
		// "+data["yearIP"]+projectConfirmStr+" "+fundingDet+ " and pay him
		// "+data["salaryIP"]+" ?";
		 confirmationStr = "Confirm importing this existing appointment";
	 }else{
			// confirmationStr = " Are you sure to Appoint the student "+
			// data["firstNameIP"]+" "+data["lastNameIP"]+"("+data["uinIP"]+")";
			// confirmationStr+= " as a "+data["postIP"]+ " for
			// "+data["semesterIP"]+" "+data["yearIP"]+projectConfirmStr+"
			// "+fundingDet+ " and pay him "+data["salaryIP"]+" ?";
		 confirmationStr = "Confirm doing this new Appointment";

	 }
	 
	 
	 

	var proceed = confirm(confirmationStr);
	 
	 if(!proceed){
		 return false;
	 }
	 $('#cover').show();
	 if(isExistingAppt){		 
		   ajaxAddExistingAppt(data);
	 }else{
		 ajaxAddRecruitment(data);		
	 }
	
}

function validateBeforeAddAppointment(curRowParent){
	
	var isExit = false;
	var postionIdentifier="";
	var hours;
	var currentSemester= $(".semesterIP").val();


	if(curRowParent.hasClass("extraPosToAdd")){
		postionIdentifier=" for second position ";
	}else{
		postionIdentifier=" for first position ";
	}
	
	curRowParent.find("input.form-control").each(function(inputEle){				
		if($(this).val() == ""){
			// alert("Fill out the field: "+ $(this).attr("placeholder") +"
			// Properly before submitting");
			errorPopUp("Fill out the field: "+ $(this).attr("placeholder") + postionIdentifier +"Properly before submitting");
			isExit = true;
			return isExit;
		}						
	});		
	
	if(isExit){
		return true;
	}
	
	if(currentSemester=='Summer'){
		
		if(parseInt(curRowParent.find(".hoursIP").val()) == 0 || parseInt(curRowParent.find(".hoursIP").val()) < 0 || parseInt(curRowParent.find(".hoursIP").val())>40  ){
			// alert("A Number of hours of work the student must be asigned is
			// more than 0 and must be less than 20.");
			errorPopUp("A Number of hours of work the student must be asigned is more than 0 and must be less than 40. please correct it for"+postionIdentifier);
			isExit = true;
			return isExit;
		}
	}
	else{
		
		if(parseInt(curRowParent.find(".hoursIP").val()) == 0 || parseInt(curRowParent.find(".hoursIP").val()) < 0 || parseInt(curRowParent.find(".hoursIP").val())>20  ){
			// alert("A Number of hours of work the student must be asigned is
			// more than 0 and must be less than 20.");
			errorPopUp("A Number of hours of work the student must be asigned is more than 0 and must be less than 20. please correct it for"+postionIdentifier);
			isExit = true;
			return isExit;
		}
	}


	
	
	curRowParent.find("select.form-control").each(function(inputEle){				
		if($(this).val() == "0"){
			// alert("Fill select an option from the filed: "+
			// $(this).attr("purpose") +" properly before submitting");
			errorPopUp("Fill select an option from the filed: "+ $(this).attr("purpose") + postionIdentifier+" properly before submitting");
			isExit = true;
			return false;
		}						
	});
	
	if(isExit){
		return true;
	}
	
	var curPostVal = curRowParent.find(".postIP").val();	
	
	if(curPostVal == "GRA" ||curPostVal == "SGRA"){		
		if (curRowParent.find(".projSel").val() == "None-0"){
			// alert("There must be a project assigned to a sudent if he is
			// appointed as GRA, Please choose a project");
			errorPopUp("There must be a project assigned to a sudent if he is appointed as GRA, Please choose a project"+postionIdentifier);
			isExit = true;
			return isExit;
		}
	}

	
	
}

function prepareDataforAppPosition(curRowParent){
	
	var data = {};  
	var disabledIPs = curRowParent.find(':input:disabled').removeAttr('disabled');
	 // serialize all input elements
	var formdata = curRowParent.find("input").serializeArray();
	 // re-disabled the set of inputs that you previously enabled
	disabledIPs.attr('disabled','disabled');
	
	var formdata = curRowParent.find("input").serializeArray();
	$(formdata).each(function(index, obj){
	    data[obj.name] = obj.value;
	});
	 data["firstNameIP"] = data["nameIP"].split(",")[0];
	 data["lastNameIP"] = (data["nameIP"].split(",")[1]).split("-")[0];
	 
	 if(isAdmin){
		 data["staffIP"]= curRowParent.find(".staffIP").attr("staffid");
		 data["extAppImpBy"] = loginUID;
	 }else{
		 data["staffIP"]= loginUID;
	 }
	 data["postIP"]= curRowParent.find(".postIP").val();
	 
	 data["fundingIP"]= curRowParent.find(".fundingIP").val();
	
	 var selStartMonth = parseInt(data["startDateIP"].split("-")[1]);
	 	var selSemester="";
	 	if(selStartMonth >=7 && selStartMonth <=10 ){
	 		selSemester= "Fall";
		  }else if(selStartMonth <=3 || selStartMonth>=11 ){
			selSemester= "Spring";
		  }else{
			selSemester= "Summer";
		  }	 	 
	 	
	 data["semesterIP"]=selSemester; 
	 // to get the current academic year value
	 if(selSemester == "Spring"){
		 data["yearIP"] = (parseInt(data["startDateIP"].split("-")[0])-1)+"-"+(parseInt(data["startDateIP"].split("-")[0]));
	 }else if (selSemester == "Fall"){
		 data["yearIP"] = data["startDateIP"].split("-")[0]+"-"+(parseInt(data["startDateIP"].split("-")[0])+1);
	 }else{
		 data["yearIP"] = (parseInt(data["startDateIP"].split("-")[0])-1)+"-"+(parseInt(data["startDateIP"].split("-")[0]));
	 }
	 data["projID"]= curRowParent.find(".projSel").val().split("-")[1];
	 
	 data["tutionWaiveIP"]= parseInt(curRowParent.find(".tutionWaiveIP").val());
	 data["noOfCreditsIP"]= parseInt(curRowParent.find(".noOfCreditsIP").val());
	return data;
}


// this is the method that get called on click of new appointment submit
function addNewAppointmentExtraChange(buttonClicked){
	// alert("clicked Button");
	var curRowParent = buttonClicked.parents("tr");
	var extaRowParent = null;
	
	var isExit = false;
		
	/*
	 * validateBeforeAddAppointment(buttonClicked.parents("tr")); if(isExit){
	 * return false; } // for extra position adding stuff
	 * if(parseInt(curRowParent.find(".hoursIP").val()) < 20){
	 * if($(".extraPosToAdd").length == 1){ extaRowParent = $(".extraPosToAdd");
	 * isExit = validateBeforeAddAppointment(extaRowParent); if(isExit){ return
	 * false; }
	 * 
	 * 
	 * if( (parseInt(curRowParent.find(".hoursIP").val()) +
	 * parseInt(extaRowParent.find(".hoursIP").val())) > 20){ alert("Total
	 * Students Hours id exceeding 20, please correct it."); isExit = true; } } }
	 */
	
	
	var maxWorkHours = 20;
	if(cursemester == "Summer"){
		maxWorkHours =40;
	}else{
		maxWorkHours = 20;
	}	
	
	if(isAdmin){
		if(adminType != 3){
			if($(".appointmentToAdd").eq(0).find(".semesterIP").val() == "Summer"){
				maxWorkHours =40;
			}else{
				maxWorkHours = 20;
			}
		}
	}
	
	var totalHours = 0;
	$(".appointmentToAdd").each(function(){
		if(!isExit){
			isExit = validateBeforeAddAppointment($(this));
			if(isExit){
				return false;
			}else{
				totalHours += parseInt($(this).find(".hoursIP").val());
			}	
		}
	});
			
	if(isExit){
		return false;
	}

	if(totalHours > maxWorkHours){
		alert("Total Students Hours id exceeding "+ maxWorkHours+ ", please correct it.");
		isExit = true;		
	}
			
	if(isExit){
		return false;
	}	
	var dataArray =[];
	var row_count=0;
	$(".appointmentToAdd").each(function(){
		row_count++;
		var positionData = prepareDataforAppPosition($(this));
		dataArray.push(positionData);	
	});
	
	
	// changed - multiple positions
/*
 * var positionData = prepareDataforAppPosition(curRowParent);
 * dataArray.push(positionData); if(extaRowParent != null){ positionData =
 * prepareDataforAppPosition(extaRowParent); dataArray.push(positionData); }
 */

	 var confirmationStr =""; 
	 if(isExistingAppt){
	// confirmationStr = " Are you sure to import the existing appointment for
	// the student "+ data["firstNameIP"]+"
	// "+data["lastNameIP"]+"("+data["uinIP"]+")";
	// confirmationStr+= " by prof "+ curRowParent.find(".staffIP").val()+" as a
	// "+data["postIP"]+ " for "+data["semesterIP"]+"
	// "+data["yearIP"]+projectConfirmStr+" "+fundingDet+ " and pay him
	// "+data["salaryIP"]+" ?";
	//confirmationStr ="Confirm importing this existing Appointment";

		 confirmationStr = " Are you sure to Appoint the student with the following details:"+
		 "\nStudent name :"+ dataArray[0]  ["firstNameIP"]+ " " + dataArray[0]["lastNameIP"];

		 for (i=0;i<row_count;i++) {
	 		 
	 		 //for
	 		var Budget_code= $(".appointmentToAdd").eq(i).find(".projSel").val();
	 		var budgetCode=Budget_code.split("-");


	 		confirmationStr +="\nFor Position :"+ eval(i+1) + 
	 		"\nPost : "+ dataArray[i]["postIP"]+
	 		"\nNo of hours :"+ dataArray[i]["hoursIP"]+
	 		"\nBudget_code :"+ budgetCode[0]+
	 		"\nStarting Date :"+ dataArray[i]["startDateIP"]+
	 		"\nEnding Date : "+ dataArray[i]["endDateIP"]+
	 		"\nSalary : "+ dataArray[i]["salaryIP"];
	 	}






	 }else{


	 	confirmationStr = " Are you sure to Appoint the student with the following details:"+
		 "\nStudent name :"+ dataArray[0]  ["firstNameIP"]+ " " + dataArray[0]["lastNameIP"];


	 	
	 	for (i=0;i<row_count;i++) {
	 		 
	 		 //for
	 		var Budget_code= $(".appointmentToAdd").eq(i).find(".projSel").val();
	 		var budgetCode=Budget_code.split("-");


	 		confirmationStr +="\nFor Position :"+ eval(i+1) + 
	 		"\nPost : "+ dataArray[i]["postIP"]+
	 		"\nNo of hours :"+ dataArray[i]["hoursIP"]+
	 		"\nBudget_code :"+ budgetCode[0]+
	 		"\nStarting Date :"+ dataArray[i]["startDateIP"]+
	 		"\nEnding Date : "+ dataArray[i]["endDateIP"]+
	 		"\nSalary : "+ dataArray[i]["salaryIP"];
	 	}
		
		


		 /*dataArray[0]["firstNameIP"]+" "+ dataArray[0]["lastNameIP"]+"("+ dataArray[0]["uinIP"]+") ";
			 confirmationStr+= " as a "+ dataArray[0]["postIP"]+ " for "+dataArray[0]["hoursIP"] +" hours with Budget Code"+ dataArray[0]["projSel"]+
			  "for "+dataArray[0]["semesterIP"]+" "+ dataArray[0]["yearIP"]+
			" and pay him "+ dataArray[0]["salaryIP"]+" ?";*/
		//confirmationStr ="Confirm doing this new Appointment";
		//positionData.firstNameIP;
	 }
	var proceed = confirm(confirmationStr);	 
	 if(!proceed){
		 return false;
	 }
	 $('#cover').show();
	 if(isExistingAppt){		 
		 // ajaxAddExistingAppt(dataArray[0]);
		 ajaxAddExistingAppt(dataArray);
	 }else{
		 // ajaxAddRecruitment(data);
		// just changed to the new flow of adding an extra position
		 // -- currently working on Multiple positions change May/18/2017
		ajaxAddRecruitmentNew(dataArray);
	 }
}

// this function is called in multiple places, when do we use file upload part
// in this function
// previously we were sending data[0], because there could be only one value to
// this function check for the issues
// function ajaxAddExistingAppt(data){
function ajaxAddExistingAppt(dataArray){	
	// $.post('/'+SERVERHOST+'_StudentAppointmentSystem/addExistingAppointment.php',data,function
	// (data){
	var jsonData = {"data":JSON.stringify({"dataset":dataArray})};
	$.post('/'+SERVERHOST+'_StudentAppointmentSystem/addExistingAppointmentNew.php',jsonData,function (data){
		$('#cover').hide();
		if($.trim(data).split("-")[0]== "success"){
			
			if($(".signedOfferExistAppt").val() != ""){
				var fileFormData = new FormData();
				fileFormData.append('filetoUpload', $('.signedOfferExistAppt ')[0].files[0]);	
			  successPopUp("Existing student appointment imported successfully, uploading the Appointment Letter Attached...");	
			  fileFormData.append("appointmentID",$.trim(data).split("-")[1]);
			  $.ajax({
                  url: 'uploadExistApmt.php',
                  type: 'POST',
                  data: fileFormData,
                  processData: false,
                  contentType: false,
                  success: function(data) {
            		 $('#cover').hide();
	                	if($.trim(data) == "success"){	     
	     				    successPopUpWithRD("Existing Appointment uploaded successfully!");
	                	}
						else{
							errorPopUp("error: some problem while uploading the existing Appointment letter!");
						}
                  },
                  error: function(xhr,error){    
                	  $('#cover').hide();
  	    		    errorPopUp("error: some problem while uploading the existing Appointment letter!");
                  }
              });
			} else{
				successPopUpWithRD("Existing student appointment imported successfully.");
			}
		}else if (data.split("-")[0]== "fail"){
			errorPopUp("Some problem while importing the existing student appointment");
		}
	});
	
	
}


function ajaxAddRecruitment(data){
	$.post('/'+SERVERHOST+'_StudentAppointmentSystem/addRecruitment.php',data,function (data){
		$('#cover').hide();
		if($.trim(data).split("-")[0]== "success"){		
			var insertedRecID = data.split("-")[1];
			// code to send email from proff to Student - On Change Request
			$('#cover').show();
			$.ajax({
		          type: "GET",
		         // url:
					// "/Prod_StudentAppointmentSystem/emailStudent1.php?recid="+insertedRecID,
		          url: "/"+SERVERHOST+"_StudentAppointmentSystem/emailStudent1.php?recid="+insertedRecID,
		          dataType: "text",
		          success: function( data, textStatus, jqXHR) {	
					$('#cover').hide();
				     // var jObj = jQuery.parseJSON(data);
				    // console.log(jObj[0].stu_id);
					if($.trim(data) == "success"){
						// alert("Student Appointment Initiated Successfully");
					     // window.location.href =
							// "http://qav2.cs.odu.edu/Maheedhar/StudentRecruitmentTS/home.php";
						addPositionCouter = 0;
					     successPopUpWithRD("Student Appointment Initiated Successfully");
					}
					else{
						// alert("error: some problem while sending an email!");
						errorPopUp("some problem while sending an email!");
					}					
		          },
	  			  error: function( data, textStatus, jqXHR) {
		        	$('#cover').hide();
	  		      	// alert("error: some problem while sending an email!");
	  		      	errorPopUp("some problem while sending an email!");
	  		      }
	    	});   
			
		}else if (data.split("-")[0]== "fail"){
			$('#cover').hide();
			if(data.split("-")[1] != "" && data.split("-")[1] != undefined){
				// alert(data.split("-")[1]);
				errorPopUp(data.split("-")[1]);
			}else{
				// alert("something went wrong");
				errorPopUp("something went wrong");
			}
		}		
	});
}

function ajaxAddRecruitmentNew(dataArray){
	// make sure the changes you do will now change the previous work flow
	var jsonData = {"data":JSON.stringify({"dataset":dataArray})};
	$.post('/'+SERVERHOST+'_StudentAppointmentSystem/addRecruitmentNew.php',jsonData,function (data){
		$('#cover').hide();
		if($.trim(data).split("-")[0]== "success"){	
			var insertedIDStr = data.split("-")[1];
			var insertedRecID = [];
			insertedRecID.push(insertedIDStr.split("|")[0]);
			if(insertedIDStr.split("|")[1] !=""){
				insertedRecID.push(insertedIDStr.split("|")[1]);
			}
			// this is where it is left, to work on this task - March 13
			/*
			 * if(insertedRecID.length == 1){
			 * emailStudentSinglePosition(insertedRecID[0]); }else{
			 * emailStudentMultiplePosition(insertedRecID); }
			 */
			
			emailStudentMultiplePosition(insertedRecID[0]);
			

		}else if (data.split("-")[0]== "fail"){
			$('#cover').hide();
			if(data.split("-")[1] != "" && data.split("-")[1] != undefined){
				// alert(data.split("-")[1]);
				errorPopUp(data.split("-")[1]);
			}else{
				// alert("something went wrong");
				errorPopUp("something went wrong");
			}
		}		
	});
}

// to send the email to the student with single position - task to
function emailStudentSinglePosition(insertedRecID){
	// code to send email from proff to Student - On Change Request
	$('#cover').show();
	$.ajax({
          type: "GET",
         // url:
			// "/Prod_StudentAppointmentSystem/emailStudent1.php?recid="+insertedRecID,
          url: "/"+SERVERHOST+"_StudentAppointmentSystem/emailStudent1.php?recid="+insertedRecID,
          dataType: "text",
          success: function( data, textStatus, jqXHR) {	
			$('#cover').hide();
		     // var jObj = jQuery.parseJSON(data);
		    // console.log(jObj[0].stu_id);
			if($.trim(data) == "success"){
				// alert("Student Appointment Initiated Successfully");
			     // window.location.href =
					// "http://qav2.cs.odu.edu/Maheedhar/StudentRecruitmentTS/home.php";
				addPositionCouter = 0;
			     successPopUpWithRD("Student Appointment Initiated Successfully");
			}
			else{
				// alert("error: some problem while sending an email!");
				errorPopUp("some problem while sending an email!");
			}					
          },
			  error: function( data, textStatus, jqXHR) {
        	$('#cover').hide();
		      	// alert("error: some problem while sending an email!");
		      	errorPopUp("some problem while sending an email!");
		      }
	});
}

// to send the email to the student with single position
function emailStudentMultiplePosition(insertedRecID){
	// var recruitmentIdsStr = insertedRecID[0]+"-"+insertedRecID[1];
	var recruitmentIdsStr = insertedRecID;
	// code to send email from proff to Student - On Change Request
	$('#cover').show();
	$.ajax({
          type: "GET",
         // url:
			// "/Prod_StudentAppointmentSystem/emailStudent1.php?recid="+insertedRecID,
          // the method name in the following URL is for the emailing purpose
			// of multiple postions
          url: "/"+SERVERHOST+"_StudentAppointmentSystem/emailStudent1MultiplePositions.php?recids="+recruitmentIdsStr,
          dataType: "text",
          success: function( data, textStatus, jqXHR) {	
			$('#cover').hide();
		     // var jObj = jQuery.parseJSON(data);
		    // console.log(jObj[0].stu_id);
			if($.trim(data) == "success"){
				// alert("Student Appointment Initiated Successfully");
			     // window.location.href =
					// "http://qav2.cs.odu.edu/Maheedhar/StudentRecruitmentTS/home.php";
				addPositionCouter = 0;
			     successPopUpWithRD("Student Appointment Initiated Successfully");
			}
			else{
				// alert("error: some problem while sending an email!");
				errorPopUp("some problem while sending an email!");
			}					
          },
			  error: function( data, textStatus, jqXHR) {
        	$('#cover').hide();
		      	// alert("error: some problem while sending an email!");
		      	errorPopUp("some problem while sending an email!");
		      }
	});
}




function LDAPSearchByUIN (strVal){
	$.ajax({
          type: "GET",
          // url:
			// "/Prod_StudentAppointmentSystem/ldapSearchByUIN.php?searchVal="+strVal,
          url: "/"+SERVERHOST+"_StudentAppointmentSystem/ldapSearchByUIN.php?searchVal="+strVal,
          dataType: "text",
          success: function( data, textStatus, jqXHR) {		
				data = data.trim().split("-");
				if(data[0] == "success"){
					 $('#cover').hide();
					// alert(data[1]);
					successPopUp(data[1]);
					if(data[3] == "phd"){
		   				var optStrPHD = '<option value="0">select post</option><option value="PHD_GRA">PHD-GRA</option><option value="PHD_SGRA">PHD-SGRA</option><option value="PHD_GTA">PHD-GTA</option><option value="PHD_Grader">PHD-Grader</option>';
		   				
		   				$(".postIP").html(optStrPHD);
		   			}else{
		   				var optStrGrad = '<option value="0">select post</option><option value="GRA">GRA</option><option value="SGRA">SGRA</option><option value="GTA">GTA</option><option value="Grader">Grader</option>';
		   				
		   				$(".postIP").html(optStrGrad);
		   			}
					$(".nameIP").val(data[2]);			
				}else if(data[0] == ""){
					 $('#cover').hide();
					 errorPopUp("Couldn't find a student on this UIN with the LDAPSearch too..");
				}else{
					 $('#cover').hide();
					// alert(data[1]);
					errorPopUp(data[1]);
				}
          },
		  error: function( data, textStatus, jqXHR) {
        		 $('#cover').hide();
	      	// alert("error: some problem with LDAP Connection!");
	      	errorPopUp("some problem with LDAP Connection!");
	      }
		});    	
}

function LDAPSearchByName (strVal){
	$.ajax({
          type: "GET",
         // url:
			// "/Prod_StudentAppointmentSystem/ldapSearchByName.php?searchVal="+strVal,
          url: "/"+SERVERHOST+"_StudentAppointmentSystem/ldapSearchByName.php?searchVal="+strVal,
          dataType: "text",
          success: function( data, textStatus, jqXHR) {		
				var isFound = true;
				studentdata = $.trim(data).split("--");
				if(studentdata[0] == "success"){
					 $('#cover').hide();
					var studentListObj = $.parseJSON(studentdata[1]);
					var studentListArr = $.map(studentListObj, function(el) { return el });
					var listGroupDiv = $("<div class='resSuggDiv'><ul class='list-group'></ul></div>");				   	
			   		var liComp = "";
			   		
					$.each(studentListArr, function( index, student ) {
						
						if(student == 0){
							isFound = false;
						}
						if( typeof student === 'object' && student.employeenumber != undefined && student.employeenumber[0].trim()!=""){
							if(student.extensionattribute1 != undefined){
								console.log(student.givenname[0]+"-"+student.sn[0]+"-"+student.employeenumber[0]+"-"+student.extensionattribute1[0]);
								var gradLevel = gradLevelFinder(student);
								if(gradLevel != "inactive"){
									liComp += '<li class="list-group-item stuNameLDAPList" id="'+student.employeenumber[0]+'" mail="'+student.extensionattribute1[0]+'" gradlevel="'+gradLevel+'">'+student.sn[0]+','+student.givenname[0]+'</li>';
								}
							}
							

						}
					});
					
						if(!isFound){
							errorPopUp("No Student Found on this name with the LDAPSearch. Please contact admin.");
							return false;
						}

				   		listGroupDiv.find("ul").append(liComp);
				   		$("body").append(listGroupDiv);
				   			listGroupDiv.css( {position:'absolute',
				   			 top:curIPunderSugg.offset().top+31,
  				   		  left:curIPunderSugg.offset().left
				   		});
				   		
				   		$(".stuNameLDAPList").click(function(){		  				   			
				   			var firstname = $(this).html().split(",")[0];
				   			var lastname = $(this).html().split(",")[1];
				   			var email = $(this).attr("mail");
				   			var uin = $(this).attr("id");
				   			var gradLevel = $(this).attr("gradlevel");
				   			var data={};
				   			data["firstname"]= firstname;
				   			data["lastname"]= lastname;
				   			data["email"]= email;
				   			data["uin"]= uin;	
				   			data["gradlevel"]= gradLevel;
				   			if(gradLevel == "phd"){
				   				var optStrPHD = '<option value="0">select post</option><option value="PHD_GRA">PHD-GRA</option><option value="PHD_SGRA">PHD-SGRA</option><option value="PHD_GTA">PHD-GTA</option><option value="PHD_Grader">PHD-Grader</option>';
				   				$(".postIP").html(optStrPHD);
				   			}else{
				   				var optStrGrad = '<option value="0">select post</option><option value="GRA">GRA</option><option value="SGRA">SGRA</option><option value="GTA">GTA</option><option value="Grader">Grader</option>';
				   				$(".postIP").html(optStrGrad);
				   			}
				   			$('#cover').show();
				   			// $.post('/Prod_StudentAppointmentSystem/addStudent.php',data,function
							// (data){
					   		$.post('/'+SERVERHOST+'_StudentAppointmentSystem/addStudent.php',data,function (data){
				   				$('#cover').hide();
					   			if(data.trim().split("-")[0]== "success"){
					   				// alert("Student added successfuly into
									// Local DB");
					   				successPopUp("Student added successfuly into Local DB");
						   			curIPunderSugg.val(firstname+","+lastname);
						   			$(".uinIP").val(uin);
						   			$(".resSuggDiv").remove();						   								   								
					   			}else{
					   				// alert("Error: Problem with adding student
									// into Local DB");
					   				errorPopUp("Problem with adding student into Local DB");
					   			}		
					   		});
				   		});
															
				}else{
					 $('#cover').hide();
					// alert("Error: some problem occured with the LDAPSearch");
					errorPopUp("some problem occured with the LDAPSearch");
				}
          },
		  error: function( data, textStatus, jqXHR) {
        	$('#cover').hide();
	      	// alert("error: some problem with LDAP Connection!");
	      	errorPopUp("some problem with LDAP Connection!");
	      }
		});    	
}

// this method returns whether the student is of PHD level or masters level
function gradLevelFinder( student){
	var membersof = [];
	if(student.memberof != undefined){
		for(var i=0;i<student.memberof["count"]; i++ ){		
			membersof.push( (student.memberof[i].split(",")[0]).split("=")[1]);
		}
		if(membersof.indexOf("phd") >=0 || membersof.indexOf("phd".toLowerCase) >=0){
			return "phd";
		}else {
			var dnArr=student["dn"].split(",");
			if( dnArr.indexOf("OU="+"Undergrad".toLowerCase()) >= 0  || dnArr.indexOf("OU=Undergrad") >= 0 ){
				return "undergrad";
			}else if(dnArr.indexOf("OU="+"Grad".toLowerCase()) >= 0 || dnArr.indexOf("OU=Grad") >= 0){
				return "grad";
			}
		}
	}else{
		return "inactive";
	}
}
function ajaxGetProjByStaffIDAddExistingApp(staffID){	
	$.ajax({
          type: "GET",
          // url:
			// "/Prod_StudentAppointmentSystem/getAllProjectsByStaff.php?staffId="+staffID,
          url: "/"+SERVERHOST+"_StudentAppointmentSystem/getAllProjectsByStaff.php?staffId="+staffID,

          dataType: "text",
          success: function( data, textStatus, jqXHR) {			      				       				     		     
			var projDetArray = $.parseJSON(data);
			projOptionStr ='<option value="None-0">None</option><option value="createNew-">CreateNew</option>';
			$.each(projDetArray,function(index,value){
				var purp = "GRA";
				if(parseInt(value.split("-")[2])== 1){
					purp = "SGRA";
				}
				projOptionStr+='<option purp="'+purp +'" title="'+value.split("-")[3] +'" value="'+value.split("-")[0]+'-'+value.split("-")[1]+'">'+value.split("-")[0] +'</option>'; 	    		
				$(".appointmentToAdd .projSel").empty().append(projOptionStr);
			});	
		},
          error: function( data, textStatus, jqXHR) {	  
		    // alert("error: some problem while getting the project details");
		    errorPopUp("some problem while getting the project details!");
		 }
	}); 
}

function ajaxGetProjByStaffIDAddExistingAppInEdit(ParentTR, preProjVal){
	
	var staffID = ParentTR.find(".staName").attr("staffid");
	$.ajax({
          type: "GET",
          // url:
			// "/Prod_StudentAppointmentSystem/getAllProjectsByStaff.php?staffId="+staffID,
          url: "/"+SERVERHOST+"_StudentAppointmentSystem/getAllProjectsByStaff.php?staffId="+staffID,

          dataType: "text",
          success: function( data, textStatus, jqXHR) {	
		
			var projDetArray = $.parseJSON(data);
			projOptionStr ='<option value="None-0">None</option><option value="createNew-">CreateNew</option>';
			$.each(projDetArray,function(index,value){
				var purp = "GRA";
				if(parseInt(value.split("-")[2])== 1){
					purp = "SGRA";
				}
				projOptionStr+='<option purp="'+purp +'" title="'+value.split("-")[3] +'" value="'+value.split("-")[0]+'-'+value.split("-")[1]+'">'+value.split("-")[0].replace("/","-") +'</option>'; 	    		
				//$("appointmentToAdd .projSel").empty().append(projOptionStr);
				//$("appointmentToAdd .projSel").val(preProjVal); 
			});	
			ParentTR.find(".stuProj .projSel").empty().append(projOptionStr);
			ParentTR.find(".stuProj .projSel").val(preProjVal); 

		},
          error: function( data, textStatus, jqXHR) {
        	  
		    // alert("error: some problem while getting the project details");
		    errorPopUp("some problem while getting the project details!");
		 }
	}); 
}



function getAllProjectsByStaff($staffId){
	$('#cover').show();

	// to populate all the projects
	$.ajax({
	  type: "GET",
	  // url:
		// "/Prod_StudentAppointmentSystem/getAllProjectsByStaff.php?staffId="+$staffId,
	  url: "/"+SERVERHOST+"_StudentAppointmentSystem/getAllProjectsByStaff.php?staffId="+$staffId,
	  dataType: "text",
	  success: function( data, textStatus, jqXHR) {		
		 $('#cover').hide();
	    var projDetArray = $.parseJSON(data);	   
		$.each(projDetArray,function(index,value){
			var purp = "GRA";
			if(parseInt(value.split("-")[2])== 1){
				purp = "SGRA";
			}
			projOptionStr+='<option purp="'+purp +'" title="'+value.split("-")[3] +'" value="'+value.split("-")[0]+'-'+value.split("-")[1]+'">'+value.split("-")[0].replace("/","-") +'</option>'; 	    		
		});	
	  },
	 error: function( data, textStatus, jqXHR) {
		$('#cover').hide();
	    	// alert("error: some problem while getting the project details");
	      errorPopUp("some problem while getting the project details!");	    
	    }
	 }); 
	 return projOptionStr;
}
start();


































