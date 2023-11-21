
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
		
		const Register = document.getElementById('Register');
		const SignIn = document.getElementById('SignIn');
		const LogOut = document.getElementById('LogOut');


		var User;
//----------------------------------------Ready Register database-----------------------------------------------------------------------------------//
        var Name, IdNo, email, password;
		function writeData() {
			
				Name = document.getElementById('Rname').value.toUpperCase();
				IdNo = document.getElementById('RIdNo').value.toUpperCase();
				email = document.getElementById('Remail').value;
				password = document.getElementById('Rpassword').value;
				faculty = document.getElementById('Rfaculty').value;
				passkey = document.getElementById('Rpasskey').value;
			
		}

	
	



//---------------------------------------Register into database--------------------------------------------------------------------------//
const singupForm = document.querySelector('#signupForm');

Register.addEventListener('click', function(e) {
	e.preventDefault();
	
			
						writeData();
						var count = false;
						
						
							db.collection('Administration/').get().then(function(doc) {
								e.preventDefault();
								
								doc.forEach(function(fileRef){
									pass_key = fileRef.data().Pass_Key;
									
									


									if (passkey == pass_key && count == false)  {
										console.log(passkey, pass_key, count);
										console.log(passkey == pass_key);
										count = true;
									

									};

									
								
									
								});

								if(count == true){

									auth.createUserWithEmailAndPassword(email, password)
										.then(cred => {
														return db.collection('Lecturer/'+ cred.user.uid +'/'+ 'Profile' ).doc().set({
																Name : Name,
																ID_Number : IdNo,
																Password : password,
																Faculty : faculty,
																Email : firebase.auth().currentUser.email,
																UserUID : firebase.auth().currentUser.uid,
																Phone_Number : "",
																Start_Date : "",
																End_Date : "",
																

														}).then(() => {
															
															return db.collection('Lecturer/'+ cred.user.uid+'/'+'Grant_Member') .doc().set({
															GrantMember_Name: "",
															GrantMember_Email :"",
															GrantMember_PhoneNumber: "",
															
															});

															
													

														}).then(() => {
															
															return db.collection('Lecturer_ID/').doc().set({
															Lecturer_UID : firebase.auth().currentUser.uid
															});
															
															}).then(() => {
																(e => alert(e.message));
																
																alert("Register Successfull. Please Sign In to proceed.");	
																						
																signupForm.reset();
																location.reload();
																
															}).catch(err => {
																singupForm.querySelector('.errorSU').innerHTML = err.message;
																document.getElementById('Rpassword').value ="";
															});
															
															
										});

								}else if(count == false){
									alert("The Pass Key is not correct Please refer to the administration");
										
										signupForm.reset();	
										location.reload();
								}
});

});
//---------------------------------------Auth State Change--------------------------------------------------------------------------//
	
     auth.onAuthStateChanged(user => {
		 if (user){
			User = user;
			db.collection('Lecturer').onSnapshot(snapshot =>{
				
		 }, err =>{
			 console.log(err.message)
		 });
		 }else if(user != null){
			
		 }
		 
	 });
         
//---------------------------------------Sign In into database--------------------------------------------------------------------------//
const signinForm = document.querySelector('#signinForm');		
var SignInEmail, SignInPassword;
		function writeDataSI() {
			
			
			SignInEmail = document.getElementById('SIEmail').value;
			SignInPassword = document.getElementById('SIPassword').value;
			//console.log(SignInEmail)

			
		

			
		}


		SignIn.addEventListener('click', function(e) {
			e.preventDefault();
			writeDataSI();

			
					
			auth.signInWithEmailAndPassword(SignInEmail,SignInPassword)
				.then(cred => {
				// Signed in
				
				(e => alert(e.message));
				alert("Signed in as :" + SignInEmail );	
				
				
				signinForm.reset();
				window.location.href = 'profile.html';

				}).catch(err => {
					signinForm.querySelector('.errorSI').innerHTML = err.message;
					document.getElementById('SIEmail').value ="";
					document.getElementById('SIPassword').value ="";
					
				});			
								
								
			});



//---------------------------------------(Sign In Admin)--------------------------------------------------------------------------//
//!. Create new Admin in database( Create auth and the the database Admin//

//---------------------------------------(Sign In Admin)--------------------------------------------------------------------------//


		const AdsignInButton = document.getElementById('AdSignIn');		

		var SignInEmail, SignInPassword;
		function writeDataSI() {
			
			
			SignInEmail = document.getElementById('SIEmail').value;
			SignInPassword = document.getElementById('SIPassword').value;
			
		}


		AdsignInButton.addEventListener('click', function(e) {
			var ErrorMessage = "";
		
			e.preventDefault();
			writeDataSI();

			db.collection('Administration/').get().then(function(doc) {
				e.preventDefault();
				//console.log(SignInEmail )
				doc.forEach(function(fileRef){

				if (SignInEmail == fileRef.data().Admin_Email && SignInPassword == fileRef.data().Admin_Password)  {
					
						

							
									
									
									auth.signInWithEmailAndPassword(SignInEmail,SignInPassword)
										.then(cred => {
										// Signed in
										
										(e => alert(e.message));
										alert("Signed in as an admin :" + SignInEmail );	
										
										
										signinForm.reset();
										window.location.href = 'admin.html';

										}).catch(err => {
											signinForm.querySelector('.errorSI').innerHTML = err.message;	
											alert(err);	
											console.log(error);
											
										});	

						

					}else if (SignInEmail == fileRef.data().Admin_Email|| SignInPassword == fileRef.data().Admin_Password)  {
						ErrorMessage = "error";
					}	



					
				});

			
				if (ErrorMessage == "error"){
					signinForm.querySelector('.errorSI').innerHTML = "You enter the wrong password or email.";	
				};
				
			});




			
					
								
								
			});

//---------------------------------------(Sign In RMC)--------------------------------------------------------------------------//

		const RMCsignInButton = document.getElementById('RMCSignIn');		

		var SignInEmail, SignInPassword;
		function writeDataSI() {
			
			
			SignInEmail = document.getElementById('SIEmail').value;
			SignInPassword = document.getElementById('SIPassword').value;
			
		}


		RMCsignInButton.addEventListener('click', function(e) {
			e.preventDefault();
			writeDataSI();
			var ErrorMessage = "";
		

			db.collection('RMC/').get().then(function(doc) {
				e.preventDefault();
			
				doc.forEach(function(fileRef){

					if (SignInEmail == fileRef.data().RMC_Email && SignInPassword == fileRef.data().RMC_Password)  {
							
						auth.signInWithEmailAndPassword(SignInEmail,SignInPassword)
							.then(cred => {
							// Signed in
							
							(e => alert(e.message));
							alert("Signed in as RMC staff :" + SignInEmail );	
							
							
							signinForm.reset();
							window.location.href = 'rmc.html';
					


							}).catch(err => {
								signinForm.querySelector('.errorSI').innerHTML = err.message;	
								alert(err);	
							});	

						

					}else if (SignInEmail == fileRef.data().RMC_Email|| SignInPassword == fileRef.data().RMC_Password)  {
						ErrorMessage = "error";
				

					};

				});

	
			
				if (ErrorMessage == "error"){
					signinForm.querySelector('.errorSI').innerHTML = "You enter the wrong password or email.";	
				};
				
			});


			
					
								
								
			});
