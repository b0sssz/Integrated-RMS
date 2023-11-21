	
	
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
		storageRef1 = storage.ref("Conference/" );
		var storageRef;						
		var uploadtask ;
		var title1 ="";
		var ConfLocation = "";
		var ConfDate = "";
		var html;
		var file;
		const btnfolder = document.querySelector('.wrapper');
		const uploadfile = document.getElementById("save_button");
		const search = document.getElementById("search_button");
		

		 // Get the modal
         var modal = document.getElementById("myModal");
		 var modal2 = document.getElementById("myModal2");
            
         // Get the button that opens the modal
         var btn = document.getElementById("addbtn");
		 
         
         // Get the <span> element that closes the modal
         var span = document.getElementsByClassName("close")[0];
		 var span2 = document.getElementsByClassName("close2")[0];
		 


		 

	
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

		

//---------------------------------------Register file into database--------------------------------------------------------------------------//
const bar = document.querySelector('.progress');
	
                uploadfile.addEventListener('click', function(e) {
					
					e.preventDefault();
					
					
                 if (User){
				
					var storageRef;
					
					e.preventDefault();
					title1 = document.getElementById('subject').value.toUpperCase();	
				    ConfLocation = document.getElementById('Conf_location').value.toUpperCase();	
					ConfDate = document.getElementById('Conf_date').value;	
					
						 file = Folder[0];
						
						storageRef1 = storage.ref("Conference/" );
						storageRef2 = storageRef1.child(User.uid);
						storageRef3 = storageRef2.child(title1);	
						storageRef = storageRef3.child(file.name );		
										
					    uploadtask = storageRef.put(file);

						uploadtask.on('state_changed',function(snapshot){
							let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100 ;
							const html = `
	
							<div class="progress">
							<div class="progress-done" data-done="0" >
							  ${progress.toPrecision(4)} %
							</div>
						  </div>  <!-- // End form -->
																		
															
	
																	`;
						 bar.innerHTML = html;



							const progressbar = document.querySelector('.progress-done');
							progressbar.setAttribute("data-done", progress);
							progressbar.style.width = progressbar.getAttribute('data-done') +'%' ;							
							progressbar.style.opacity = 1;
							
						});


						
						
					
				
					
					}else{
						console.log('user logged out ');
					}


				
				}), err =>{
					console.log(err.message)
				};	

				
			
//---------------------------------------Save file into firestore--------------------------------------------------------------------------//
var Fileurl;

function savefile(){
	if (User) {
		//console.log(title1);
				 
		var uploadref = storage.ref('Conference/'+ User.uid+'/'+title1+'/'+file.name+'/');
		
		uploadref.getDownloadURL().then(function(url){

			this.Fileurl = url.toString();

			//console.log(Fileurl);
			
			 db.collection('Conference/'+'UserID/' + User.uid ).doc().set({
			
			  Conference_Name : title1,
			  File_Link : Fileurl,
			  Conference_Location : ConfLocation,
			  Conference_Date : ConfDate

		    }).then(() => {
				location.reload();

			})
		}).catch(err => {
			alert('Unable to upload. Please try again');
			location.reload();
		});
	 };
};			

		
//---------------------------------------display list file into firestore--------------------------------------------------------------------------//
const FileRow = document.querySelector('.filerow');
const modal2display = document.querySelector('.modal2display');
var i = 0;	
function listfile(){
	if (User) {
			 
		db.collection('Conference/'+'UserID/' + User.uid ).orderBy('Conference_Date', "desc").get().then(function(doc) {
			
			doc.forEach(function(fileRef){

				Sdate = new Date(fileRef.data().Conference_Date);
					   Smonth = Sdate.getMonth()+1;
					
					   start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
					 
				
				//console.log("fileId : " + fileRef.data().Conference_Name);
				//console.log("fileId : " + fileRef.id);
				var RefFile  = fileRef.id;
				const html = `
                
				<tr class="filerow" >
				<td>${i+1}</td>
				<td  ><a href = "${fileRef.data().File_Link}" >${fileRef.data().Conference_Name}</td>
				<td>${fileRef.data().Conference_Location}</td>
				<td>${start}</td>
				<td colspan="2">
				    
					<input type="button"  data-id1 = ${fileRef.id} data-id2 = ${fileRef.data().File_Link}  value="Edit" id ="editbutton${+i}"  />
					<input type="button"  data-id1 = ${fileRef.id} data-id2 = ${fileRef.data().File_Link} data-id3 = ${fileRef.data().Conference_Name} id="delete${+i}"  value = "Delete"/>

                </td>
			    </tr>
				

					`;
					
				    FileRow.innerHTML += html;

					
					i++;
			});
			
					for ( b = 0; b < i; b++) {

							let cross = document.getElementById('delete'+ b );
							let editbtn = document.getElementById('editbutton'+ b);

//---------------------------------------delete file from firestore--------------------------------------------------------------------------//

							
															cross.addEventListener('click', (e) => {
																e.stopPropagation();
																let id = e.target.getAttribute('data-id1');
																let id2 = e.target.getAttribute('data-id2');
																let id3 = e.target.getAttribute('data-id3');
																//console.log(id);
																
																(e => alert(e.message));
																		                
																	if (confirm("Are you sure to delete this file?")) {
																		storageRef1 = storage.ref("Conference/" );
																		storageRef2 = storageRef1.child(User.uid);
																		storageRef3 = storageRef2.child(id3);
																		storageRef = storageRef3.child(id2 );
																		let filestore = storage.refFromURL(id2);
																		 
																	      
																		filestore.delete().then(function(){
																			db.collection('Conference/'+'UserID/' + User.uid ).doc(id).delete().then(()=>{
																		  location.reload();
																		   });
																		}).catch(err => {
																			  db.collection('Conference/'+'UserID/' + User.uid ).doc(id).delete().then(()=>{
																				  location.reload();
																			  });
																		  });
																		
																		
																	  } else {
																		txt = "You pressed Cancel!";
																		location.reload();
																	  }
																
																
																
									
															});

//---------------------------------------edit file from firestore--------------------------------------------------------------------------//

                                                            
															editbtn.addEventListener('click', (e) => {

																e.stopPropagation();
																let id = e.target.getAttribute('data-id1');
																let id2 = e.target.getAttribute('data-id2'); 

																modal2.style.display = "block";
																db.collection('Conference/'+'UserID/' + User.uid ).doc(id).get().then(function(doc) {
																	const html = `
	
																	<div class="modal2display">
			
																	<div class="subject_input">
																	 <label for="title"> Conference Name</label>
																	 <input type="text" value = "${doc.data().Conference_Name}" name="title" id="updatetitle" required>      
																	 <label for="title"> Conference Location</label>
																     <input type="text" value="${doc.data().Conference_Location}" name="title" id="updateConf_location" required>
																	 <label for="title">Date: </label> 
																	 <input type="date" value = "${doc.data().Conference_Date}" id="updateConf_date" name="ConferenceDate">          
																	 </div>
																	 
																	 
																	 
																   
																	
																	 
															   
																	</div><!-- // End form -->
																		
															
	
																	`;
																	modal2display.innerHTML = html;
	
																	});
	

															    	var updatebtn = document.getElementById('update_button');
																
																   updatebtn.addEventListener('click', (e) =>{
																	
                                                                   e.preventDefault;
																  
																    Uptitle = document.getElementById('updatetitle').value.toUpperCase();
																	Uplocation = document.getElementById('updateConf_location').value.toUpperCase();
																	UpCdate = document.getElementById('updateConf_date').value.toUpperCase();

																	db.collection('Conference/'+'UserID/' + User.uid ).doc(id).update({
																		Conference_Name : Uptitle,
			                                                            Conference_Location : Uplocation,
																		Conference_Date : UpCdate
																		
																	}).then(() => {
																		location.reload();
											
																	});
																	
																		  
																});	

																	// When the user clicks on <span> (x), close the modal2
																	span2.onclick = function() {
																		modal2.style.display = "none";	
																		id = e.target.getAttribute('');
		
																	}
		
																															
																	// When the user clicks anywhere outside of the modal, close it
																	window.onclick = function(event) {
																		if (event.target == modal2) {
																		modal2.style.display = "none";
																		id = e.target.getAttribute('');
																		}
																		
																	}
																
													
																
															});
																
															
																		
									
															


	                };
		});
	 };
};



		
//---------------------------------------Auth state Changed--------------------------------------------------------------------------//
auth.onAuthStateChanged(user => {
	if (user) {
		
		User = user;	
		listfile();


	}else{
		console.log('user logged out');
	}
});
//----------------------------------------MODAL-----------------------------------------------------------------------------------//


         
         
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
		  


//---------------------------------------Log Out Account--------------------------------------------------------------------------//
 
           
		LogOut.addEventListener('click', function(e) {
			e.preventDefault();
			auth.signOut().then(() => {
				(e => alert(e.message));
				alert("Sign Out" );	
				window.location.href = 'home.html';
			})			
								
								
					});

					