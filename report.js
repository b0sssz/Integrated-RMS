	
	
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
		var storage = firebase.storage();
		var fileref = storage.ref();
		db.settings({timestampsInSnapshots : true})
		
        var album;
		const dropzone = document.querySelector('#dropzone');
		var User;
		var Folder;
		storageRef1 = storage.ref("Report/" );
		var storageRef;						
		var uploadtask ;
		var title1 ="";
		var ReportDate = "";
		var html;
		var file;
		const btnfolder = document.querySelector('.wrapper');
		const uploadfile = document.getElementById("save_button");
		const genReport = document.getElementById("generate_button");
		const genFinalReport = document.getElementById("generateFinal_button");


		

		 // Get the modal
         var modal = document.getElementById("myModal");
		 var modal2 = document.getElementById("myModal2");
            
         // Get the button that opens the modal
         var btn = document.getElementById("addbtn");
		 
         
         // Get the <span> element that closes the modal
         var span = document.getElementsByClassName("close")[0];
		 var span2 = document.getElementsByClassName("close2")[0];
		 


		 

	
//---------------------------------------Drag and drop--------------------------------------------------------------------------//
/*
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
			Folder =  e.target.files;
			


			for (let i = 0; i < Folder.length; i++) {
				inputElement.files = e.dataTransfer.files;
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
			reader.onload = ()=>{
				thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
			};
	
			
		}else
		{
			thumbnailElement.style.backgroundImage = null;
		}
	}
	
		
	//----------------------------------------MODAL (close)-----------------------------------------------------------------------------------//

	 // When the user clicks on <span> (x), close the modal
	 span.onclick = function() {
		modal.style.display = "none";	
		dropzone.reset();
		thumbnailElement.remove();
		dropzoneElement.querySelector(".containerfile_prompt").style.display = 'block';
		savefile();

		
	
					
		}
         // When the user clicks anywhere outside of the modal, close it
         window.onclick = function(event) {
           if (event.target == modal) {
             modal.style.display = "none";
			 dropzone.reset();
		    thumbnailElement.remove();
		    dropzoneElement.querySelector(".containerfile_prompt").style.display = 'block';
			savefile();
			
	
           }
         }
}
*/


		
//---------------------------------------display list file into firestore--------------------------------------------------------------------------//
const FileRow = document.querySelector('.filerow');
const FileRow2 = document.querySelector('.filerow2');
const FileRow3 = document.querySelector('.filerow3');
const modal2display = document.querySelector('.modal2display');
var i = 0;


function listProgress(){

	FileRow2.innerHTML ="";

	
	
	var x = document.getElementById("final");
	x.style.display = "none";

	var y = document.getElementById("progress");
	y.style.display = "block";

	db.collection('ReportProgress/'+'UserID/' + User.uid  ).get().then(function(doc) {
		var i =0;
		
		doc.forEach(function(fileRef){

			Sdate = new Date(fileRef.data().Start_Date);
					   Smonth = Sdate.getMonth()+1;
					   Edate  = new Date(fileRef.data().End_Date);
					   Emonth = Edate.getMonth()+1;
					   start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
					   end = Edate.getDate() + '/'+ Emonth+ '/'+ Edate.getFullYear();
			
			
			var RefFile  = fileRef.id;
			const html = `
			
			<tr class="filerow" >
			<td>${i+1}</td>
			<td  >${fileRef.data().Title_Grant}</td>
			<td>${fileRef.data().Grant_Reference}</td>
			<td>${start}</td>
			<td>${end}</td>
			<td>${fileRef.data().RMC_Status}</td>
			<td colspan="2">
				
				<input type="button"  data-id1 = ${fileRef.id}  value="View" id ="viewbutton${+i}"  />
				<input type="button"  data-id1 = ${fileRef.id}   id="deleteGR${+i}"  value = "Delete"/>

			</td>
			</tr>
			

				`;
				
				FileRow2.innerHTML += html;

				
				i++;
		});
		
				for ( b = 0; b < i; b++) {

						let cross = document.getElementById('deleteGR'+ b );
						let viewbtn = document.getElementById('viewbutton'+ b);
						
						console.log(cross);
														cross.addEventListener('click', (e) => {
															e.stopPropagation();
															let id = e.target.getAttribute('data-id1');
														
															//console.log(id);
															
															(e => alert(e.message));
																					
																if (confirm("Are you sure to delete this file?")) {
																	
																	
																		db.collection('ReportProgress/'+'UserID/' + User.uid  ).doc(id).delete().then(()=>{
																	  location.reload();
																	   });
																
																	
																	
																	
																  } else {
																	txt = "You pressed Cancel!";
																	location.reload();
																  }
															
															
															
								
														});

														
														
														viewbtn.addEventListener('click', (e) => {

															e.stopPropagation();
															var  reportID= e.target.getAttribute('data-id1');
															sessionStorage.setItem("reportID", reportID);
															
															window.location.href = 'viewPDF.html';

															
														});
															
														
																	
								
														


				};
	});



};

function listFinal(){
	FileRow3.innerHTML ="";

	

	var y = document.getElementById("progress");
	y.style.display = "none";
	
	var x = document.getElementById("final");
	x.style.display = "block";

	  

	db.collection('FinalReport/'+'UserID/' + User.uid  ).get().then(function(doc) {
		var i =0;
		
		doc.forEach(function(fileRef){
			
			Sdate = new Date(fileRef.data().Start_Date);
					   Smonth = Sdate.getMonth()+1;
					   Edate  = new Date(fileRef.data().End_Date);
					   Emonth = Edate.getMonth()+1;
					   start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
					   end = Edate.getDate() + '/'+ Emonth+ '/'+ Edate.getFullYear();

					   cdate = new Date(fileRef.data().Completion_Date);
					   cmonth = cdate.getMonth()+1;
					  
					   compl = cdate.getDate() + '/'+ cmonth+ '/'+ cdate.getFullYear();
					
			
			var RefFile  = fileRef.id;
			const html = `
			
			<tr class="filerow" >
			<td>${i+1}</td>
			<td  >${fileRef.data().Title_Grant}</td>
			<td>${fileRef.data().Grant_Reference}</td>
			<td>${start}</td>
			<td>${end}</td>
			<td>${compl}</td>
			<td>${fileRef.data().RMC_Status}</td>
			<td colspan="2">
				
				<input type="button"  data-id1 = ${fileRef.id}  value="View" id ="viewFbutton${+i}"  />
				<input type="button"  data-id1 = ${fileRef.id}   id="deleteFR${+i}"  value = "Delete"/>

			</td>
			</tr>
			

				`;
				
				FileRow3.innerHTML += html;

				
				i++;
		});
		
				for ( b = 0; b < i; b++) {

						let cross = document.getElementById('deleteFR'+ b );
						let viewbtn = document.getElementById('viewFbutton'+ b);
						
						//console.log(cross);
														cross.addEventListener('click', (e) => {
															e.stopPropagation();
															let id = e.target.getAttribute('data-id1');
														
															//console.log(id);
															
															(e => alert(e.message));
																					
																if (confirm("Are you sure to delete this file?")) {
																	
																	
																		db.collection('FinalReport/'+'UserID/' + User.uid  ).doc(id).delete().then(()=>{
																	  location.reload();
																	   });
																
																	
																	
																	
																  } else {
																	txt = "You pressed Cancel!";
																	location.reload();
																  }
															
															
															
								
														});

														
														
														viewbtn.addEventListener('click', (e) => {

															e.stopPropagation();
															var  FinalReportID= e.target.getAttribute('data-id1');
															sessionStorage.setItem("FinalReportID", FinalReportID);
															
															window.location.href = 'viewFinalPDF.html';

															
														});
															
														
																	
								
														


				};
	});
	

 };
	

	
	


   
		
//---------------------------------------Auth state Changed--------------------------------------------------------------------------//
auth.onAuthStateChanged(user => {
	if (user) {
		
		User = user;	
		listProgress();
		
		


	}else{
		console.log('user logged out');
	}
});
//----------------------------------------MODAL-----------------------------------------------------------------------------------//
/*

         
         
         // When the user clicks the button, open the modal 
         btn.onclick = function() {
           modal.style.display = "block";
         }
		 
         
         // When the user clicks on <span> (x), close the modal
         span.onclick = function() {
           modal.style.display = "none";	
		   dropzone.reset();
		   savefile();
         }

		  
		  
		  // When the user clicks on <span> (x), close the modal2
		  span2.onclick = function() {
			modal2.style.display = "none";	
			dropzone.reset();
			savefile();
		  }
  

		 // When the user clicks on <span> (x), close the modal
	 span2.onclick = function() {
		modal2.style.display = "none";	
		dropzone.reset();
		//dropzoneElement.querySelector(".containerfile_prompt").style.display = 'block';
		savefile();

					
		}
         // When the user clicks anywhere outside of the modal, close it
         window.onclick = function(event) {
           if (event.target == modal2) {
             modal2.style.display = "none";
			 
			 dropzone.reset();
		    thumbnailElement.remove();
		    dropzoneElement.querySelector(".containerfile_prompt").style.display = 'block';
			savefile();
			
	
           }
		   if (event.target == modal) {
			modal.style.display = "none";
			
			dropzone.reset();
		   thumbnailElement.remove();
		   dropzoneElement.querySelector(".containerfile_prompt").style.display = 'block';
		   savefile();
		   
   
		  }
         }
		  */
//---------------------------------------Log Out Account--------------------------------------------------------------------------//
 
           
genReport.addEventListener('click', function(e) {
	e.preventDefault();
	
		window.location.href = 'genReport.html';
				
			});

			genFinalReport.addEventListener('click', function(e) {
				e.preventDefault();
				
					window.location.href = 'genFinalReport.html';
							
						});
//---------------------------------------Log Out Account--------------------------------------------------------------------------//
 
           
		LogOut.addEventListener('click', function(e) {
			e.preventDefault();
			auth.signOut().then(() => {
				(e => alert(e.message));
				alert("Sign Out" );	
				window.location.href = 'home.html';
			})			
								
								
					});

					