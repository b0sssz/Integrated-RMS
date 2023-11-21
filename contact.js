	
	
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
		
    


		 


		 

	


//---------------------------------------Register file into database--------------------------------------------------------------------------//
const uploadContact= document.getElementById("contact_button");
	
                uploadContact.addEventListener('click', function(e) {
                    ContactName = document.getElementById('Contact_Name').value;	
					ContactEmail = document.getElementById('Contact_Email').value;	
					ContactMessage = document.getElementById('Contact_Message').value;	
					
					e.preventDefault();
					
                    db.collection('Contact Message/').doc().set({
			
                        Contact_Name : ContactName,
                        Contact_Email : ContactEmail,
                        Contact_Message : ContactMessage
                        
          
                      }).then(() => {
                          alert("Message Sent Succesfully");
                          //location.reload();
          
                      })

				
				}), err =>{
					console.log(err.message)
				};	

				
			
//---------------------------------------Help--------------------------------------------------------------------------//
window.onload = function () {
		
	const nav = document.querySelector('.topnav');
	
		
				 
		var help = storage.ref('UserManual/'+ 'User Manual.pdf');
		
		help.getDownloadURL().then(function(url){

			this.Fileurl = url.toString();
			
			//console.log(Fileurl);

			const html = `
                
			<div class="w3-top">
			<div class="w3-bar w3-white w3-padding w3-card" style="letter-spacing:4px;">
			<a href="home.html" class="w3-bar-item w3-button"><img src="newlogo1.png" style="width:100px "style="height:50px" >  Research Management System (RMS)</a>
			<!-- Right-sided navbar links. Hide them on small screens -->
			  <div class="w3-right w3-hide-small">
				<a href="#about" class="w3-bar-item w3-button">About</a>
				<a href="${Fileurl}"  class="w3-bar-item w3-button" onclick="help();return false;">Help</a> 
				<a href="SignIn.html" class="w3-bar-item w3-button">Sign In</a>
			  </div>
			</div>
		  </div>
				

					`;
					
				    nav.innerHTML += html;
			
            
		});
			
			

}
		



					