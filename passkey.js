	
	
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
        var User;
		db.settings({timestampsInSnapshots : true})
		
      
        const edit = document.getElementById("edit_button");
       
        
		
        
          
    
    
        
        	


    
//---------------------------------------display list file into firestore--------------------------------------------------------------------------//
const FileRow = document.querySelector('.filerow');
const modal2display = document.querySelector('.modal2display');

function listfile(){
	if (User) {

   var i = 0;
				 
		db.collection('Administration/').get().then(function(doc) {
            
        
			doc.forEach(function(fileRef){
                   

              
                      
                                                        
                                                            const html = `
                                                            
                                                            <tr class="filerow" >
                                                            <td>${i+1}</td>
															<td  >${fileRef.data().Pass_Key}</td>
                                                           
                                                            
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
		
		edit.addEventListener('click', (e) => {


            //console.log(user.uid);
          const keyvalue = document.getElementById("Search_value").value;
             
              
             e.preventDefault;
            
              

              db.collection('Administration/' ).doc(user.uid).update({
                  Pass_Key : keyvalue,
                  
              }).then(() => {
                  location.reload();

              });
              
       
      

          
      });	

	}else{
		console.log('user logged out');
	}
});


//---------------------------------------Log ut Account--------------------------------------------------------------------------//
 
           
		LogOut.addEventListener('click', function(e) {
			e.preventDefault();
			auth.signOut().then(() => {
				(e => alert(e.message));
				alert("Sign Out" );	
				window.location.href = 'home.html';
			})			
								
								
					});

					