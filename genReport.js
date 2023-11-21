	
	
	// Your web app's Firebase configuration
		// For Firebase JS SDK v7.20.0 and later, measurementId is optional

		var firebaseConfig = {
			apiKey: "AIzaSyAFsv4I5iH09ZsCi0vwlDDFGHconcP6ju4",
			authDomain: "grmas-34b8f.firebaseapp.com",
			databaseURL: "https://grmas-34b8f-default-rtdb.firebaseio.com",
			projectId: "grmas-34b8f",
			storageBucket: "grmas-34b8f.appspot.com",
			messagingSenderId: "35768824628",
			appId: "1:35768824628:web:79d0c93354bc317627eb61",
			measurementId: "G-Z5208G6DXT"
		};

		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
		firebase.analytics();
		const auth = firebase.auth();
		const db = firebase.firestore();
        var User ;
	


        var title = "";
        var reference = ""; 
        var duration = "";
        var total = "";
        var dateStart = "";
        var dateEnd = "";
        var exDate = "";
        var Status = "";
        var ReportNumber = "";
        var PrincipalName = "";
        var PrincipalID = "";
        var ProjectMember = "";
        var Achievement = "";
        var AchievementYes = "";
        var AchievementNo = "";
        var DateReport = "";

        var inputAchievement1= "";
        var inputAchievement2 = "";
        var inputAchievement3 = "";
        var inputAchievement4 = "";
        var inputAchievement5 = "";
        var inputAchievement6 = "";
        var inputAchievement7 = "";

        var AprovedGrant = "";
        var ReceivedGrant = "";
        var TotalGrant = "";
        var TotalBalance = "";
        var Synopsis = "";
        var srcData = "";
        var srcData2 = "";

        var srcEncoded;
        var srcEncodedStamp;

        var RMCSignURL ="";
        var RMCStampURL ="";

        var RMCNote = "";
        var RMCAppDate = "";
        var RMCStatus = "Sent";

        


genbutton = document.getElementById("save_button");
try {
    
 

        genbutton.addEventListener('click', function(e) { 
            if(User){


                 if(srcData == ""){

                    alert("Please select your signature image !" );	
 
                 }else{

                    title = document.getElementById("title_input");
                    reference = document.getElementById("reference_input");
                    duration = document.getElementById("duration_input");
                    total = document.getElementById("total_input");
                    dateStart = document.getElementById("dateStart_input");
                    dateEnd = document.getElementById("dateEnd_input");
                    exDate = document.getElementById("exDate_input");
                    Status = document.getElementById("Project_Status");
                    ReportNumber = document.getElementById("reportNum_input");
                    PrincipalName = document.getElementById("PrincipalName_input");
                    PrincipalID = document.getElementById("PrincipleID_input");
                    ProjectMember = document.getElementById("ProjectMember_input");
                    AchievementY = document.getElementById("AchievementY_input");
                    AchievementN = document.getElementById("AchievementN_input");
                    DateReport = document.getElementById("DateReport_input");



                    inputAchievement1 = document.getElementById("phase1");
                    inputAchievement2 = document.getElementById("phase2");
                    inputAchievement3 = document.getElementById("phase3");
                    inputAchievement4 = document.getElementById("phase4");
                    inputAchievement5 = document.getElementById("phase5");
                    inputAchievement6 = document.getElementById("phase6");
                

                    //get radio button

                   if(AchievementY.checked || AchievementN.checked){

                                    if (AchievementY.checked){
                                    Achievement = document.getElementById("AchievementY_input").value;
                                } else {
                                Achievement = document.getElementById("AchievementN_input").value;
                                };
                        };

                    
                    

                    //get checkbox value

                    if (inputAchievement1.checked){
                        inputAchievement1 = document.getElementById("phase1").value;
                    } else {
                        inputAchievement1 = "";
                    };

                    if (inputAchievement2.checked){
                        inputAchievement2 = document.getElementById("phase2").value;
                    } else {
                        inputAchievement2 = "";
                    };

                    if (inputAchievement3.checked){
                        inputAchievement3 = document.getElementById("phase3").value;
                    } else {
                        inputAchievement3 = "";
                    };

                    if (inputAchievement4.checked ){
                        inputAchievement4 = document.getElementById("phase4").value;
                    } else {
                        inputAchievement4 = "";
                    };

                    if (inputAchievement5.checked ){
                        inputAchievement5 = document.getElementById("phase5").value;
                    } else {
                        inputAchievement5 = "";
                    };

                    

                    if (inputAchievement6.checked ){
                        inputAchievement6 = document.getElementById("PhaseOther_input").value;
                    } else {
                        inputAchievement6 = "";
                    };

                    AprovedGrant = document.getElementById("ApprovedGrant_input");
                    ReceivedGrant = document.getElementById("ReceivedGrant_input");
                    TotalGrant = document.getElementById("TotalGrant_input");
                    Synopsis = document.getElementById("Synopsis_input");
                    TotalBalance = document.getElementById("TotalBalance_input");


                      //console.log(User.uid);
                         
                        
                        

                    sessionStorage.setItem("title", title.value);
                    sessionStorage.setItem("reference", reference.value);
                    sessionStorage.setItem("duration", duration.value);
                    sessionStorage.setItem("dateStart", dateStart.value);
                    sessionStorage.setItem("dateEnd", dateEnd.value);
                    sessionStorage.setItem("exDate", exDate.value);
                    sessionStorage.setItem("Status", Status.value);
                    sessionStorage.setItem("ReportNumber", ReportNumber.value);
                    sessionStorage.setItem("PrincipalName", PrincipalName.value);
                    sessionStorage.setItem("PrincipalID", PrincipalID.value);
                    sessionStorage.setItem("ProjectMember", ProjectMember.value);
                    sessionStorage.setItem("Achievement", Achievement);
                    sessionStorage.setItem("DateReport", DateReport.value);

                

                    sessionStorage.setItem("total", total.value);

                    sessionStorage.setItem("inputAchievement1", inputAchievement1);
                    sessionStorage.setItem("inputAchievement2", inputAchievement2);
                    sessionStorage.setItem("inputAchievement3", inputAchievement3);
                    sessionStorage.setItem("inputAchievement4", inputAchievement4);
                    sessionStorage.setItem("inputAchievement5", inputAchievement5);
                    sessionStorage.setItem("inputAchievement6", inputAchievement6);
                  

                    sessionStorage.setItem("AprovedGrant", AprovedGrant.value);
                    sessionStorage.setItem("ReceivedGrant", ReceivedGrant.value);
                    sessionStorage.setItem("TotalGrant", TotalGrant.value);
                    sessionStorage.setItem("Synopsis", Synopsis.value);
                    sessionStorage.setItem("TotalBalance", TotalBalance.value);
                    sessionStorage.setItem("sign", srcEncoded);
                    sessionStorage.setItem("stamp", srcEncodedStamp);

                    sessionStorage.setItem("rmcAppDate", RMCAppDate.value);
                    sessionStorage.setItem("rmcAppDate", RMCNote.value);
                    sessionStorage.setItem("rmcAppDate", RMCStatus.value);

                    var DocSet = db.collection('ReportProgress/'+'UserID/' + User.uid).doc();



                   DocSet.set({
			
                        Title_Grant : title.value.toUpperCase(),
                        Grant_Reference : reference.value.toUpperCase(),
                        Duration : duration.value.toUpperCase(),
                        Start_Date : dateStart.value.toUpperCase(),
                        End_Date : dateEnd.value.toUpperCase(),
                        Extension_Date : exDate.value.toUpperCase(),
                        Status : Status.value.toUpperCase(),
                        Number_Report : ReportNumber.value.toUpperCase(),

                        Principal_Name : PrincipalName.value.toUpperCase(),
                        Principal_ID : PrincipalID.value.toUpperCase(),
                        Project_Member : ProjectMember.value.toUpperCase(),
                        Achievement_Grant : Achievement.toUpperCase(),
                        Total : total.value,
                        Achievement1 : inputAchievement1.toUpperCase(),
                        Achievement2 : inputAchievement2.toUpperCase(),
                        Achievement3 : inputAchievement3.toUpperCase(),
                        Achievement4 : inputAchievement4.toUpperCase(),
                        Achievement5 : inputAchievement5.toUpperCase(),
                        Achievement6 : inputAchievement6.toUpperCase(),
                        Report_Date : DateReport.value.toUpperCase(),

                   
                        Aproved_Grant : AprovedGrant.value,
                        Received_Grant : ReceivedGrant.value,
                        Total_Grant : TotalGrant.value,
                        Synopsis : Synopsis.value.toUpperCase(),
                        Balance : TotalBalance.value,

                        SignURL : srcEncoded,
                        StampURL : srcEncodedStamp,
                        RMCSignURL : RMCSignURL,
                        RMCStampURL : RMCStampURL,

                        RMC_Note : "",
                        RMC_AppDate : "",
                        RMC_Status : "PENDING"




          
                      }).then(()=>{


                        //console.log("fileId : " + DocSet.id);
                        //console.log("fileId : " + User.uid);

                      

                    
                        
    
                    
                        
                
                            
                            db.collection('ReportProgress/'+'UserID/' + User.uid).doc(DocSet.id).update({
                            
                            
                            SignURL : srcEncoded,
                            StampURL : srcEncodedStamp
                            
                
                            }).then(() => {
                                sessionStorage.setItem("FinalReportID", DocSet.id);
                            
                                
                
                            })

                        window.location.href = 'reportPDF.html';
            
                    });
                    };


                  


                    

                  //  
                }
        });
    

    }
    catch(err) {
      alert('Please fill all the form correctly');
    };

  //---------------------------------------Convert to basee64--------------------------------------------------------------------------//

  function encodeImageFileURL(){
    fileSelect = document.getElementById("ImageFile").files;
 


    if (fileSelect.length > 0 ){
        var fileSelect = fileSelect[0];
        var fileReader = new FileReader();

      

        fileReader.onload = function(FileLoadEvent){
            srcData = FileLoadEvent.target.result;
            process();
        }
        fileReader.readAsDataURL(fileSelect)

 
    }
}


function process() {
    const file = document.querySelector("#ImageFile").files[0];
  
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.readAsDataURL(file);
  
    reader.onload = function (event) {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;
      //document.querySelector("#input").src = event.target.result;
  
      imgElement.onload = function (e) {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 400;
  
        const scaleSize = MAX_WIDTH / e.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = e.target.height * scaleSize;
  
        const ctx = canvas.getContext("2d");
  
        ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
  
        srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
  
        // you can send srcEncoded to the server
        //console.log(srcEncoded)
      };
    };
  }


function encodeImageStampFileURL(){
    fileSelectStamp = document.getElementById("StampFile").files;


    if ( fileSelectStamp.length > 0 ){


        var fileSelectStamp = fileSelectStamp[0];
        var fileReaderStamp = new FileReader();

 

        fileReaderStamp.onload = function(FileLoadEventStamp){
            srcData2 = FileLoadEventStamp.target.result;             
            processStamp();
        }
        fileReaderStamp.readAsDataURL(fileSelectStamp)
    }
}


function processStamp() {
    const file = document.querySelector("#StampFile").files[0];
  
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.readAsDataURL(file);
  
    reader.onload = function (event) {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;
      //document.querySelector("#input").src = event.target.result;
  
      imgElement.onload = function (e) {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 400;
  
        const scaleSize = MAX_WIDTH / e.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = e.target.height * scaleSize;
  
        const ctx = canvas.getContext("2d");
  
        ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
  
        srcEncodedStamp = ctx.canvas.toDataURL(e.target, "image/jpeg");
  
        // you can send srcEncoded to the server
       // console.log(srcEncodedStamp)
      };
    };
  }

    var ImageFile= document.getElementById("ImageFile");
    ImageFile.addEventListener("change",function(){
        encodeImageFileURL();
    })
    var StampFile= document.getElementById("StampFile");
    StampFile.addEventListener("change",function(){
        encodeImageStampFileURL();
    })

    


//---------------------------------------Auth state Changed--------------------------------------------------------------------------//
auth.onAuthStateChanged(user => {
	if (user) {
		
		User = user;	
		


	}else{
		console.log('user logged out');
	}
});

//---------------------------------------Drag and drop--------------------------------------------------------------------------//

document.querySelectorAll(".containerfile_input").forEach(inputElement =>{
 
	const dropzoneElement = inputElement.closest(".containerfile");
   


	dropzoneElement.addEventListener("click", e =>{
		inputElement.click();
	});

	inputElement.addEventListener("change", e=>{
		if (inputElement.files.length) {
			Folder =  e.target.files;
        
			
			for (let i = 0; i < Folder.length; i++) {
				updateThumbnail(dropzoneElement, inputElement.files[0]);
				
			}
		}
	});

	dropzoneElement.addEventListener("dragover", e =>{
		e.preventDefault();
		dropzoneElement.classList.add("containerfile--over");
	});

	["dragleave","dragend"].forEach(type =>{
		dropzoneElement.addEventListener(type, e =>{
			dropzoneElement.classList.remove("containerfile--over");
		});
	});

	dropzoneElement.addEventListener("drop", e =>{
		e.preventDefault();

		if (e.dataTransfer.files.length) {
			
            inputElement.files = e.dataTransfer.files;
            Folder =  inputElement.files;
            for (let i = 0; i < Folder.length; i++) {
			updateThumbnail(dropzoneElement, e.dataTransfer.files[0]);
				
			}

		}

		dropzoneElement.classList.remove("containerfile--over");
	});
});

function updateThumbnail(dropzoneElement, file){
	let thumbnailElement = dropzoneElement.querySelector(".containerfile_thumb");
   
	//console.log(file);
   


	if (dropzoneElement.querySelector(".containerfile_prompt")) {
		dropzoneElement.querySelector(".containerfile_prompt").style.display = 'none';
	}
	//first time, there no thumbnail element, lets create
	if (!thumbnailElement) {
		thumbnailElement = document.createElement("div");
		thumbnailElement.classList.add("containerfile_thumb");
		dropzoneElement.appendChild(thumbnailElement);
		
	}

	thumbnailElement.dataset.label = file.name;

	//show thumnail image file
	for (let i = 0; i < Folder.length; i++) {
		if (file.type.startsWith("image/")) {
			const reader = new FileReader();
	
			reader.readAsDataURL(file);
            

			reader.onload =  ()=>{
				thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
               


			};
	
			
		}else
		{
			thumbnailElement.style.backgroundImage = null;
		}
	}
}

const bar = document.querySelector('.progress');
const uploadfile = document.getElementById("upload_button");

	

//---------------------------------------Log Out Account--------------------------------------------------------------------------//
 
           
LogOut.addEventListener('click', function(e) {
    e.preventDefault();
    auth.signOut().then(() => {
        (e => alert(e.message));
        alert("Sign Out" );	
        window.location.href = 'home.html';
    })			
                        
                        
            });
















