	
	
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
        db.settings({timestampsInSnapshots : true})

		
		var storage = firebase.storage();
		var fileref = storage.ref();
		db.settings({timestampsInSnapshots : true})
        
        var User ;
        var file;
        var Folder;
        var srcData = "";
        var srcData2 = "";
     
     
	


        var title = "";
        var reference = ""; 
        var duration = "";
        var total = "";
        var dateStart = "";
        var dateEnd = "";
        var exDate = "";
        var compDate =";"
        var DateReport = "";
        var Status = "";
        var ReportNumber = "";
        var PrincipalName = "";
        var PrincipalID = "";
        var ProjectMember = "";
        var Folder;
        var title1 = "";



        var Research = "";
        var Deliverables = "";
        var RiskManagement ="";
        var Future = "";

        var RecommendY = "";
        var RecommendN = "";
        var Recommend = "";
        var Reason = " ";

        var ImageURL = " ";

        var FundingAllocation ;
        var FundingSpent ;

        var Funding1Allocation = "0";
        var Funding2Allocation = 0;
        var Funding3Allocation = 0;
        var Funding4Allocation = 0;
        var Funding5Allocation = 0;
        var Funding6Allocation = 0;
        var Funding7Allocation = 0;
        var Funding8Allocation = 0;

        var Funding1Spent = 0;
        var Funding2Spent = 0;
        var Funding3Spent = 0;
        var Funding4Spent = 0;
        var Funding5Spent = 0;
        var Funding6Spent = 0;
        var Funding7Spent = 0;
        var Funding8Spent = 0;


        var PercentSpent = 0;
        var TotalReceived =0 ;
        var TotalReturn = 0;
        var TotalInput = 0;

        var RMCImageURL = "";
        var RMCImageURL = "";
        var RMCNote = "";
        var RMCAppDate = ""
        var RMCStatus = "Sent";

        var srcEncoded;
        var srcEncodedStamp;



        


        genbutton = document.getElementById("save_button");
        try {
            
        

                genbutton.addEventListener('click', function(e) { 
                    e.preventDefault();
                    if(User){

                        
                 if(srcData == "" && srcData2 == ""){

                    alert("Please select your signature image !" );	
 
                 }else{

                            title = document.getElementById("title_input");
                            reference = document.getElementById("reference_input");
                            duration = document.getElementById("duration_input");
                            total = document.getElementById("total_input");
                            dateStart = document.getElementById("dateStart_input");
                            dateEnd = document.getElementById("dateEnd_input");
                            exDate = document.getElementById("exDate_input");
                            compDate = document.getElementById("dateComplete_input");
                            DateReport = document.getElementById("DateReport_input");
                            Status = document.getElementById("Project_Status");
                            ReportNumber = document.getElementById("reportNum_input");
                            PrincipalName = document.getElementById("PrincipalName_input");
                            PrincipalID = document.getElementById("PrincipleID_input");
                            ProjectMember = document.getElementById("ProjectMember_input");
                            RecommendY = document.getElementById("RecommendY_input");
                            RecommendN = document.getElementById("RecommendN_input");
                        // Reason = document.getElementById("Reason_input");

                            Research = document.getElementById("ResearchFinding_input");
                            Deliverables = document.getElementById("Deliverables_input");
                            RiskManagement = document.getElementById("RiskManagement_input");
                            Future = document.getElementById("Future_input");
                            TotalInput = document.getElementById("total_input");



                            Funding1Allocation = Number(document.getElementById("Funding1Allocation_input").value);
                            Funding2Allocation = Number(document.getElementById("Funding2Allocation_input").value);
                            Funding3Allocation = Number(document.getElementById("Funding3Allocation_input").value);
                            Funding4Allocation = Number(document.getElementById("Funding4Allocation_input").value);
                            Funding5Allocation = Number(document.getElementById("Funding5Allocation_input").value);
                            Funding6Allocation = Number(document.getElementById("Funding6Allocation_input").value);
                            Funding7Allocation = Number(document.getElementById("Funding7Allocation_input").value);
                            Funding8Allocation = Number(document.getElementById("Funding8Allocation_input").value);

                            Funding1Spent = Number(document.getElementById("Funding1Spent_input").value);
                            Funding2Spent = Number(document.getElementById("Funding2Spent_input").value);
                            Funding3Spent = Number(document.getElementById("Funding3Spent_input").value);
                            Funding4Spent = Number(document.getElementById("Funding4Spent_input").value);
                            Funding5Spent = Number(document.getElementById("Funding5Spent_input").value);
                            Funding6Spent = Number(document.getElementById("Funding6Spent_input").value);
                            Funding7Spent = Number(document.getElementById("Funding7Spent_input").value);
                            Funding8Spent = Number(document.getElementById("Funding8Spent_input").value);

                            FundingAllocation = Funding1Allocation + Funding2Allocation+ Funding3Allocation + Funding4Allocation+ Funding5Allocation + Funding6Allocation + Funding7Allocation + Funding8Allocation;
                            FundingSpent = Funding1Spent + Funding2Spent+ Funding3Spent + Funding4Spent + Funding5Spent + Funding6Spent + Funding7Spent +Funding8Spent;

                            PercentSpent = (FundingSpent / FundingAllocation) * 100;


                        

                            //get radio button

                        if(RecommendY.checked || RecommendN.checked){

                                            if (RecommendY.checked){
                                                Recommend = document.getElementById("RecommendY_input").value;
                                        } else if(RecommendN.checked) {
                                            Recommend = document.getElementById("RecommendN_input").value;
                                            Reason = document.getElementById("Reason_input").value; 
                                        };
                                };

                            
                            

                        

                            TotalReceived = Number(document.getElementById("TotalReceived_input").value);
                            TotalReturn =Number(document.getElementById("TotalReturn_input").value);
                            
                            //console.log(Recommend);
                            //console.log(FundingSpent);
                            //console.log(DateReport);
                           // console.log(User.uid);
                                
                                
                                

                            sessionStorage.setItem("title", title.value);
                            sessionStorage.setItem("reference", reference.value);
                            sessionStorage.setItem("duration", duration.value);
                            sessionStorage.setItem("dateStart", dateStart.value);
                            sessionStorage.setItem("dateEnd", dateEnd.value);
                            sessionStorage.setItem("exDate", exDate.value);
                            sessionStorage.setItem("dateComplete", compDate.value);
                            sessionStorage.setItem("DateReport", DateReport.value);
                            sessionStorage.setItem("TotalInput", TotalInput.value);
                            sessionStorage.setItem("Status", Status.value);
                            sessionStorage.setItem("ReportNumber", ReportNumber.value);
                            sessionStorage.setItem("PrincipalName", PrincipalName.value);
                            sessionStorage.setItem("PrincipalID", PrincipalID.value);
                            sessionStorage.setItem("ProjectMember", ProjectMember.value);
                            sessionStorage.setItem("Recommend", Recommend);
                            sessionStorage.setItem("Reason", Reason);

                            sessionStorage.setItem("Research",Research.value);
                            sessionStorage.setItem("Deliverables",Deliverables.value);
                            sessionStorage.setItem("RiskManagement",RiskManagement.value);               
                            sessionStorage.setItem("Future",Future.value);    

                        
                        

                            sessionStorage.setItem("FundingAllocation", FundingAllocation);
                            sessionStorage.setItem("FundingSpent", FundingSpent);
                            sessionStorage.setItem("PercentSpent", PercentSpent);



                            sessionStorage.setItem("Funding1Allocation", Funding1Allocation);
                            sessionStorage.setItem("Funding2Allocation", Funding2Allocation);
                            sessionStorage.setItem("Funding3Allocation", Funding3Allocation);
                            sessionStorage.setItem("Funding4Allocation", Funding4Allocation);
                            sessionStorage.setItem("Funding5Allocation", Funding5Allocation);
                            sessionStorage.setItem("Funding6Allocation", Funding6Allocation);
                            sessionStorage.setItem("Funding7Allocation", Funding7Allocation);
                            sessionStorage.setItem("Funding8Allocation", Funding8Allocation);

                            sessionStorage.setItem("Funding1Spent", Funding1Spent);
                            sessionStorage.setItem("Funding2Spent", Funding2Spent);
                            sessionStorage.setItem("Funding3Spent", Funding3Spent);
                            sessionStorage.setItem("Funding4Spent", Funding4Spent);
                            sessionStorage.setItem("Funding5Spent", Funding5Spent);
                            sessionStorage.setItem("Funding6Spent", Funding6Spent);
                            sessionStorage.setItem("Funding7Spent", Funding7Spent);
                            sessionStorage.setItem("Funding8Spent", Funding8Spent);




                            sessionStorage.setItem("TotalReceived", TotalReceived);
                            sessionStorage.setItem("TotalReturn", TotalReturn);

                            sessionStorage.setItem("sign", srcEncoded);
                            sessionStorage.setItem("stamp", srcEncodedStamp);
                            sessionStorage.setItem("rmcAppDate", RMCAppDate.value);
                            sessionStorage.setItem("rmcAppDate", RMCNote.value);
                            sessionStorage.setItem("rmcAppDate", RMCStatus.value);


                        
                            var DocSet = db.collection('FinalReport/'+'UserID/' + User.uid).doc();

                        DocSet.set({
                    
                                Title_Grant : title.value.toUpperCase(),
                                Grant_Reference : reference.value.toUpperCase(),
                                Duration : duration.value.toUpperCase(),
                                Total_Input : TotalInput.value,
                                Start_Date : dateStart.value.toUpperCase(),
                                End_Date : dateEnd.value.toUpperCase(),
                                Extension_Date : exDate.value.toUpperCase(),
                                Completion_Date : compDate.value.toUpperCase(),
                                Report_Date : DateReport.value.toUpperCase(),
                                Status : Status.value.toUpperCase(),
                                Number_Report : ReportNumber.value,
                                Principal_Name : PrincipalName.value.toUpperCase(),
                                Principal_ID : PrincipalID.value.toUpperCase(),
                                Project_Member : ProjectMember.value.toUpperCase(),
                                Recommend : Recommend.toUpperCase(),
                                Reason : Reason.toUpperCase(),

                                Research : Research.value.toUpperCase(),
                                Deliverables : Deliverables.value.toUpperCase(),
                                RiskManagement : RiskManagement.value.toUpperCase(),
                                Future : Future.value.toUpperCase(),


                                FundingSpent : FundingSpent,
                                FundingAllocation : FundingAllocation,
                                PercentageSpent : PercentSpent,
                                TotalReceived : TotalReceived,
                                TotalReturn :TotalReturn,

                                Funding1Allocation : Funding1Allocation,
                                Funding2Allocation : Funding2Allocation,
                                Funding3Allocation : Funding3Allocation,
                                Funding4Allocation : Funding4Allocation,
                                Funding5Allocation : Funding5Allocation,
                                Funding6Allocation : Funding6Allocation,
                                Funding7Allocation : Funding7Allocation,
                                Funding8Allocation : Funding8Allocation,

                                Funding1Spent : Funding1Spent,
                                Funding2Spent : Funding2Spent,
                                Funding3Spent : Funding3Spent,
                                Funding4Spent : Funding4Spent,
                                Funding5Spent : Funding5Spent,
                                Funding6Spent : Funding6Spent,
                                Funding7Spent : Funding7Spent,
                                Funding8Spent : Funding8Spent,

                                SignURL : srcEncoded,
                                StampURL : srcEncodedStamp,
                                RMCSignURL : RMCImageURL,
                                RMCStampURL : RMCImageURL,
                                RMC_Note : "",
                                RMC_AppDate : "",
                                RMC_Status : "PENDING"


                                


                
                            }).then(() => {
                    
                            
                                    //console.log("fileId : " + DocSet.id);
                                    //console.log("fileId : " + User.uid);
                                    //console.log("fileId : " + title1);

                            
                                        console.log(Fileurl);
                                        
                                        db.collection('FinalReport/'+'UserID/' + User.uid ).doc(DocSet.id).update({
                                        
                                            SignURL : srcEncoded,
                                            StampURL : srcEncodedStamp,
                                       
                                        
                            
                                        }).then(() => {
                                            sessionStorage.setItem("FinalReportID", DocSet.id);
                                            
                                            //sessionStorage.setItem("ImageURL", Fileurl);
                                            window.location.href = 'FinalReportPDF.html';
                            
                                        })
                                
                            
                    
                                
                            
                                
                    
                            });
                            };

                        


                            

                        //  
        
                    }
                });

            }
            catch(err) {
            alert('Please fill all the form correctly');
            };

        

//---------------------------------------Auth state Changed--------------------------------------------------------------------------//
auth.onAuthStateChanged(user => {
	if (user) {
		
		User = user;	
		


	}else{
		console.log('user logged out');
	}
});

// Get the modal
var modal = document.getElementById("myModal");

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
        //console.log(srcEncodedStamp)
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

    

//---------------------------------------Save file into firestore--------------------------------------------------------------------------//
var Fileurl;

function savefile(){
	if (User) {

  
				 
		var uploadref = storage.ref('FinalReport/'+ User.uid+'/' + title1+'/'+ file.name+'/');
		
		uploadref.getDownloadURL().then(function(url){

			this.Fileurl = url.toString();

			//console.log(file);
			
			 db.collection('FinalReport/'+'UserID/' + User.uid ).doc().update({
			
              
			  ImageURL : Fileurl,
			  

		    }).then(() => {
				location.reload();

			})
		}).catch(err => {
			alert('Unable to upload. Please try again');
			location.reload();
		});
	 };
};	


//---------------------------------------Log Out Account--------------------------------------------------------------------------//
 
           
LogOut.addEventListener('click', function(e) {
    e.preventDefault();
    auth.signOut().then(() => {
        (e => alert(e.message));
        alert("Sign Out" );	
        window.location.href = 'home.html';
    })			
                        
                        
            });
















