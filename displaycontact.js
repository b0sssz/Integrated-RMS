	
	
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
		



		 

	


		


		
//---------------------------------------display list file into firestore--------------------------------------------------------------------------//
const FileRow = document.querySelector('.filerow');
const modal2display = document.querySelector('.modal2display');

function listfile(){
	if (User) {

   var i = 0;
				 
		db.collection('Contact Message/').get().then(function(doc) {
            
            
			doc.forEach(function(fileRef){
                
                const html = `
                                                            
                <tr class="filerow" >
				<td  >${i+1}</td>
                <td  >${fileRef.data().Contact_Name}</td>
                <td>${fileRef.data().Contact_Email}</td>
                <td>${fileRef.data().Contact_Message}</td>
                
                
                </tr>
                

                    `;
                    
                    FileRow.innerHTML += html;

                    
                    i++;

				
				
			});
			
					
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

//---------------------------------------Search Account--------------------------------------------------------------------------//

search.addEventListener('click', function(e) {
    e.preventDefault();
    const searchvalue = document.getElementById("Search_value").value;
	FileRow.innerHTML = "";

    db.collection('Contact Message/').get().then(function(doc) {
            var i =0;
            
        doc.forEach(function(fileRef2){

			var name  = fileRef2.data().Contact_Name;
			var email = fileRef2.data().Contact_Email;

            if(name.includes(searchvalue)){
					
				const html = `
												
						         
				<tr class="filerow" >
				<td  >${i+1}</td>
				<td  >${fileRef2.data().Contact_Name}</td>
				<td>${fileRef2.data().Contact_Email}</td>
				<td>${fileRef2.data().Contact_Message}</td>
			  
				 </tr>
							

						   `;
								
							
				 FileRow.innerHTML += html;
				 //report progress
				 i++;

			}else if(email.includes(searchvalue)){
			
			
				const html = `
												
						         
				<tr class="filerow" >
				<td  >${i+1}</td>
				<td  >${fileRef2.data().Contact_Name}</td>
				<td>${fileRef2.data().Contact_Email}</td>
				<td>${fileRef2.data().Contact_Message}</td>
			  
				 </tr>
						

						   `;
								
							
				 FileRow.innerHTML += html;
				 //report progress
				 i++;

			};
			                                          
                                                      
                         
                                          
                });

               
                                
            });
            
            
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

					