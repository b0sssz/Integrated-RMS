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

		var GrantM_Name = "";
		var GrantM_Email  = "";
		

		const LogOut = document.getElementById('LogOut');
		const uploadfile = document.getElementById('saveM_button');
	
		var User;
		

			 // Get the modal
			 var modal = document.getElementById("memberModal");
			 var modal2 = document.getElementById("myModal2");
				
			 // Get the button that opens the modal
			 var btn = document.getElementById("addbtn");
			 
			 
			 // Get the <span> element that closes the modal
			 var span = document.getElementsByClassName("close")[0];
			 var span2 = document.getElementsByClassName("close2")[0];

			 		
         
		  
		  
		  // When the user clicks on <span> (x), close the modal
		  span.onclick = function() {
			modal.style.display = "none";	
			
		  }
 
		   
		   
		   // When the user clicks on <span> (x), close the modal2
		   span2.onclick = function() {
			 modal2.style.display = "none";	

		   }
   
 

		  // When the user clicks anywhere outside of the modal, close it
		  window.onclick = function(event) {
			if (event.target == modal2) {
			  modal2.style.display = "none";
			  

			 thumbnailElement.remove();
			 dropzoneElement.querySelector(".containerfile_prompt").style.display = 'block';
			 
			}
			if (event.target == modal) {
			 modal.style.display = "none";
			 
			thumbnailElement.remove();
			dropzoneElement.querySelector(".containerfile_prompt").style.display = 'block';
			
	
		   }
		  }


//---------------------------------------Function hide button--------------------------------------------------------------------------//

		function hidebutton() {
			var x = document.getElementById("save_button");
			var y = document.getElementById("updateP_button");
					if (x.style.display === "none") {
						x.style.display = "block";
						y.style.display = "none"
					} else {
						x.style.display = "none";
						y.style.display = "block";
					}
		  }

//---------------------------------------Auth state Changed--------------------------------------------------------------------------//
		auth.onAuthStateChanged(user => {
			if (user) {
				//console.log('user logged in: ',user);
				setupUI(user);
				hidebutton();
				User = user;

				

				

			}else{
				console.log('user logged out ');
			}
		});
//---------------------------------------Profile Display-------------------------------------------------------------------------//
const modal2display = document.querySelector('.modal2display');

const accountDetails = document.querySelector('.account-details');
const MemberDetails = document.querySelector('.filerow');
var html
var profileref;

const setupUI = (user) => {
	if (user){
	
		db.collection('Lecturer/'+ user.uid +'/'+ 'Profile').get().then(function(doc) {
			doc.forEach(function(fileRef){
				//account  info
				profileref = fileRef.id;
					const html = `

						<form id="profile_form">
						<div class= "account-details">
						
						<div class="name">
						<label> Name</label>
						<input type="text" value="${fileRef.data().Name}" name="name" id="name_input" required>
				      	</div>
					
					    <div class="faculty" >
						<label>Faculty</label>
						<input type="text" value="${fileRef.data().Faculty}" name="email" id="faculty_input" >
					    </div>

					    <div class="email" >
						<label>Email</label>
						<input style="background-color:#ECEBEB;" type="text" value="${fileRef.data().Email}" name="email" id="email_input" required>
				        </div>
						
					    <div class="idnumber">
						<label >Staff ID</label>
						<input type="text" value="${fileRef.data().ID_Number}" name="idnumber" id="idnumber_input" required>
					    </div>
				 <br>
					
					
					<div class="phone">
						<label >Phone</label>
						<input type="text" value="${fileRef.data().Phone_Number}" placeholder = "PHONE NUMBER" name="phone" id="phone_input" required>
					</div>
					
					<div class="title">
						<label >Grant Title : </label>
						<input type="text" value="${fileRef.data().Grant_Title}"  placeholder = "GRANT TITLE" name="title" id="title_input" required>
					</div>

					<div class="category">
					<label >Grant Category : </label>

					<div class="dropdown"  id="dropdown">
					<input type="text"  value="${fileRef.data().Grant_Category}" placeholder="Category" id="category_input" required/>
					<div class="dropdown-content"  >
					
					  <button type='button' name="University Grants" id="universityGrant" onclick="category(name)">University Grants</button>
					  <button type='button' name="National Grant" id="nationalGrant" onclick="category(name)">National Grant</button>
					  <button type='button' name="Industrial / NGO / Private Grants" id="industrialGrant" onclick="category(name)">Industrial / NGO / Private Grants</button>
					  <button type='button' name="International Grants" id="internationalGrant" onclick="category(name)">International Grants</button>
					
					</div>
				  </div>
				  </div>
						
				  <div class="EndDate">
				  <label >Session Start Date : </label>
				  <input type="date" value="${fileRef.data().Start_Date}"  placeholder = "Start Date" name="dateStart" id="startDate_input" required>
			  </div> 
					<div class="StartDate">
						<label >Session End Date : </label>
						<input type="date" value="${fileRef.data().End_Date}"  placeholder = "End Date" name="dateEnd" id="endDate_input" required>
					</div><br><br><br>
					
					

					<form id = "member_form">

					

					</form>
						</div>
						
						
						
						
					</form><!-- // End form -->

			

					`;

					accountDetails.innerHTML = html;
					

				});
	
		}).then(() => {
			var i= 1;					
			db.collection('Lecturer/'+ user.uid +'/'+ 'Grant_Member').get().then(function(doc) {
			//console.log(doc)
				doc.forEach(function(fileRef){
					
					
					const html = `

						 
						<tr class="filerow" >
						<td data-id1 = ${fileRef.id} >${i}</td>
						<td  >${fileRef.data().GrantMember_Name}</td>
						<td>${fileRef.data().GrantMember_Email}</td>
						<td>${fileRef.data().GrantMember_PhoneNumber}</td>
						<td colspan="2">
							
							<input type="button" data-id1= "${fileRef.id}" value="Edit" id ="editbutton${+i}"  />
							<input type="button"  data-id1= "${fileRef.id}" id="delete${+i}"  value = "Delete"/>

						</td>
						</tr>
						
				

			

					`;
					
					MemberDetails.innerHTML += html;

					for ( b = 0; b < i; b++) {
						var c = b+1;

						let cross = document.getElementById('delete'+ c );
						let editbtn = document.getElementById('editbutton'+ c);
						
						
														cross.addEventListener('click', (e) => {
															e.stopPropagation();
															let id = e.target.getAttribute('data-id1');
															//console.log(id);
															
															(e => alert(e.message));
																					
																if (confirm("Are you sure to delete this Grants Member?")) {
																
																	 
																	db.collection('Lecturer/'+ User.uid +'/'+ 'Grant_Member' ).doc(id).delete().then(()=>{
																		
																		location.reload();
																		 
																	  }).catch(err => {
																			alert("Unable to delete")
																		});
																	
																	
																  } else {
																	txt = "You pressed Cancel!";
																	location.reload();
																  }
															
															
															
								
														});

														
														
														editbtn.addEventListener('click', (e) => {

															   
														
															e.stopPropagation();
															let id = e.target.getAttribute('data-id1');
															

															modal2.style.display = "block";
															db.collection('Lecturer/'+ user.uid +'/'+ 'Grant_Member').doc(id).get().then(function(doc) {
																const html = `

																<div class="modal2display">
		
																<div class="subject_input">
																 <label for="title">Grant Member Name</label>
																 <input type="text" value = "${doc.data().GrantMember_Name}" name="title" id="updateName" required>      
																 <label for="title"> Grant Member Email</label>
																 <input type="email" value="${doc.data().GrantMember_Email}" name="title" id="updateMember" required>
																 <label for="title">Grant Member Phone Number</label>
																 <input type="email" value="${doc.data().GrantMember_PhoneNumber}" name="title" id="updatePhoneNumber" required>

																 </div>
																 
														   
																</div><!-- // End form -->
																	
														

																`;
																modal2display.innerHTML = html;

																});


															   var updatebtn = document.getElementById('update_button');
															
															   updatebtn.addEventListener('click', (e) =>{
																//console.log(id);
															   e.preventDefault;
															  
																UpName = document.getElementById('updateName').value.toUpperCase();
																UpMember = document.getElementById('updateMember').value.toUpperCase();
																UpPhoneNumber = document.getElementById('updatePhoneNumber').value.toUpperCase();

																db.collection('Lecturer/'+ User.uid +'/'+ 'Grant_Member' ).doc(id).update({
																	GrantMember_Name : UpName,
																	GrantMember_Email : UpMember,
																	GrantMember_PhoneNumber : UpPhoneNumber
																	
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
                        i++;
					
						});
						disableform(profile_form);

						function disableform(profile_form) {
						var form = document.getElementById("profile_form");
						var elements = form.elements;
						for (var i = 0, len = elements.length; i < len; ++i) {
							var but = i+1;
							elements[i].readOnly = true;
							
						};

						document.getElementById('dropdown').classList.remove("dropdown");
						
						
					};
					});
				});
					
	
		
	}else{
		console.log('user logged out ');
	}

};

//---------------------------------------Onclick-------------------------------------------------------//
function category(name){
	
	Category = document.getElementById("category_input");

	Category.setAttribute('placeholder',name);
	Category.setAttribute('value',name);
 }
//---------------------------------------Update Profile--------------------------------------------------------------------------//

const update = document.getElementById('updateP_button');
const reminder = document.querySelector('.reminder');


		update.addEventListener('click', function(e) {
			
				e.preventDefault();

				const html = `

					<br>	
					<div class="GrantMember">
					<h4>Please fill in the form to update your information.</h4>
					</div>
						
						
			

					`;
					reminder.innerHTML = html;

				enableform(profile_form);

						function enableform(profile_form) {
						var form = document.getElementById("profile_form");
						var disemail = document.getElementById("email_input");
						var elements = form.elements;
						for (var i = 0, len = elements.length; i < len; ++i) {
							elements[i].readOnly = false;
						}
						disemail.readOnly =true;
						document.getElementById('dropdown').classList.add("dropdown");

						
					}		
					hidebutton();

					

					
			});

			const save = document.getElementById('save_button');


			save.addEventListener('click', function(e) {
				e.preventDefault();
			
				UpName = document.getElementById('name_input').value.toUpperCase();
				UpEmail = document.getElementById('email_input').value.toUpperCase();
				UpIdNumber = document.getElementById('idnumber_input').value.toUpperCase();
				UpPhoneNumber = document.getElementById('phone_input').value;
				GrantTitle = document.getElementById('title_input').value.toUpperCase();
				Category = document.getElementById('category_input').value.toUpperCase();
				UpStartdate = document.getElementById('startDate_input').value.toUpperCase();
				UpEndDate = document.getElementById('endDate_input').value.toUpperCase();
				console.log(UpStartdate);
				
				
				const html = `

					<br>	
					<div class="GrantMember">
					<h4>Please remember to update your information regularly.</h4>
					</div>
						
					`;
					reminder.innerHTML = html;

				
				if (User){

				
					
					db.collection('Lecturer/'+ User.uid +'/'+ 'Profile' ).doc(profileref).update({
							//account  info
							
							Name : UpName,
							Email :UpEmail,
							ID_Number :UpIdNumber,
							Phone_Number : UpPhoneNumber,
							Grant_Title : GrantTitle,
							Grant_Category : Category,
							Start_Date : UpStartdate,
							End_Date : UpEndDate
							
							
							
					});

					
					
					alert("Succesfully Updated");
					
					hidebutton();
					disableform(profile_form);

						function disableform(profile_form) {
						var form = document.getElementById("profile_form");
						var elements = form.elements;
						for (var i = 0, len = elements.length; i < len; ++i) {
							elements[i].readOnly = true;
						}
						document.getElementById('dropdown').classList.remove("dropdown");

					}
			
				}else{
					console.log('user logged out ');
				}
							
									
				});


//---------------------------------------Register file into database--------------------------------------------------------------------------//

btn.addEventListener('click', function(e) {
					
	e.preventDefault();


	modal.style.display = "block";



}), err =>{
console.log(err.message)
};	
	
                uploadfile.addEventListener('click', function(e) {
					
						e.preventDefault();
					
					
                 if (User){
							
			
				    GrantM_Name = document.getElementById('Member_Name').value.toUpperCase();	
					GrantM_Email = document.getElementById('Member_Email').value.toUpperCase();	
					GrantM_Number = document.getElementById('Member_PhoneNumber').value.toUpperCase();	

				
							
							db.collection('Lecturer/'+ User.uid+'/'+'Grant_Member') .doc().set({
								GrantMember_Name: GrantM_Name,
								GrantMember_Email :GrantM_Email,
								GrantMember_PhoneNumber : GrantM_Number
							
							}).then(() => {
								location.reload();
	
							});
					}else{
						console.log('user logged out ');
					};


				
				}), err =>{
					console.log(err.message)
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