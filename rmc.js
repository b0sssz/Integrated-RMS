	
	
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
        const fac = sessionStorage.getItem("fac");
        const header = document.getElementById('header');

		

		
//---------------------------------------display list file into firestore--------------------------------------------------------------------------//
const FileRow = document.querySelector('.filerow');
const FileRow2 = document.querySelector('.filerow2');
const FileRow3 = document.querySelector('.filerow3');
const modal2display = document.querySelector('.modal2display');

window.onload = function () {

    if(fac=="FCOM"){
    header.innerHTML="&bull; FCOM &bull;";
    }else if(fac=="FBASS"){
        header.innerHTML="&bull; FBASS &bull;";
        }else if(fac=="FEHA"){
            header.innerHTML="&bull; FEHA &bull;";
            }else if(fac=="IPS"){
                header.innerHTML="&bull; IPS &bull;";
                }else if(fac=="CIGLS"){
                    header.innerHTML="&bull; CIGLS &bull;";
                    }else if(fac=="IGS"){
                        header.innerHTML="&bull; IGS &bull;";
                        }

}

function listfile(){
	if (User) {
    

   var i = 0;
   var a =0;		
   var b = 0;	 
   var c = 0;

         
 
		db.collection('Lecturer_ID/').get().then(function(doc) {
            
            
			doc.forEach(function(fileRef){
              var lect = fileRef.data().Lecturer_UID.toString();
                

                db.collection('Lecturer/'+ lect + '/' +'Profile/').get().then(function(doc) {
                    doc.forEach(function(fileRef2){
                       // console.log("fileId : " + fileRef2.id);
                       Sdate = new Date(fileRef2.data().Start_Date);
					   Smonth = Sdate.getMonth()+1;
					   Edate  = new Date(fileRef2.data().End_Date);
					   Emonth = Edate.getMonth()+1;
					   start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
					   end = Edate.getDate() + '/'+ Emonth+ '/'+ Edate.getFullYear();
					 
                       if(fileRef2.data().Faculty == fac){            
                                                            const html = `
                                                            
                                                            <tr class="filerow" >
															<td  >${i+1}</td>
                                                            <td  >${fileRef2.data().Name}</td>
                                                            <td>${fileRef2.data().ID_Number}</td>
                                                            <td>${fileRef2.data().Faculty}</td>
                                                            <td>${fileRef2.data().Phone_Number}</td>
                                                            <td>${fileRef2.data().Email}</td>
															<td>${start} </td>
                                                            <td>${end}</td>
                                                            <td colspan="2">
                            
                                                                <input type="button"  data-id1 = ${fileRef2.id} data-id2 =${lect}   value="View" id ="viewFbutton${+i}"  />
                                                                
                                            
                                                            </td>
                                                            
                                                            </tr>
                                                            

                                                                `;
                                                                
                                                                FileRow.innerHTML += html;

                                                                
                                                                i++;
                       }
                    });

                    for ( d = 0; d < i; d++) {
                        //console.log("d"+d);
    
                            
                            let viewbtn = document.getElementById('viewFbutton'+ d);
                            
                            
                                                            
    
                                                            
                                                            
                                                            viewbtn.addEventListener('click', (e) => {
    
                                                                e.stopPropagation();
                                                                
                                                                var  userID= e.target.getAttribute('data-id2');
                                                               
                                                                sessionStorage.setItem("userIDF", userID);
                                                                
                                                                
                                                                window.location.href = 'rmcVProfile.html';
    
                                                            });
                                                                
                                                            
                                                                        
                                    
                                                            
    
    
                    };

                   
                                    
                });

            
              

			});
			
					
		});
	 };
};

function listFaculty(){
	
	FileRow.innerHTML = "";

     Cat =  fac;
	
    db.collection('Lecturer_ID/').get().then(function(doc) {
         var i=0;   
            
        doc.forEach(function(fileRef){
            var lect = fileRef.data().Lecturer_UID.toString();
            console.log(lect);
           

            db.collection('Lecturer/'+ lect + '/' +'Profile/').get().then(function(doc) {
                doc.forEach(function(fileRef2){

					var name  = fileRef2.data().Name;
				    var id  = fileRef2.data().ID_Number;
					var number  = fileRef2.data().Phone_Number;
					var email = fileRef2.data().Email;
					var faculty = fileRef2.data().Faculty;

					Sdate = new Date(fileRef2.data().Start_Date);
					   Smonth = Sdate.getMonth()+1;
					   Edate  = new Date(fileRef2.data().End_Date);
					   Emonth = Edate.getMonth()+1;
					   start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
					   end = Edate.getDate() + '/'+ Emonth+ '/'+ Edate.getFullYear();

					if(faculty == fac){
					
						const html = `
												
						         
						<tr class="filerow" >
						<td>${i+1}</td>
						<td  >${fileRef2.data().Name}</td>
                        <td>${fileRef2.data().ID_Number}</td>
						<td>${fileRef2.data().Faculty}</td>
                        <td>${fileRef2.data().Phone_Number}</td>
						<td>${fileRef2.data().Email}</td>
						<td>${start} </td>
						<td> ${end}</td>

								
						 </tr>	

						   `;
									
						 FileRow.innerHTML += html;
						 //report progress
						 i++;

					};

					
                                                                
                                                      
                                    
                });

			

               
                                
            });
            
            
        });
        
                
    });
   			

                     
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
	FileRow.innerHTML = "";

    const searchvalue = document.getElementById("Search_value").value.toUpperCase();
	
    db.collection('Lecturer_ID/').get().then(function(doc) {
         var i=0;   
            
        doc.forEach(function(fileRef){
            var lect = fileRef.data().Lecturer_UID.toString();
            console.log(lect);
           

            db.collection('Lecturer/'+ lect + '/' +'Profile/').get().then(function(doc) {
                doc.forEach(function(fileRef2){

					var name  = fileRef2.data().Name;
				    var id  = fileRef2.data().ID_Number;
					var number  = fileRef2.data().Phone_Number;
					var email = fileRef2.data().Email;
					var faculty = fileRef2.data().Faculty;

					Sdate = new Date(fileRef2.data().Start_Date);
					   Smonth = Sdate.getMonth()+1;
					   Edate  = new Date(fileRef2.data().End_Date);
					   Emonth = Edate.getMonth()+1;
					   start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
					   end = Edate.getDate() + '/'+ Emonth+ '/'+ Edate.getFullYear();

					if(name.includes(searchvalue)){
					
						const html = `
												
						         
						<tr class="filerow" >
															<td  >${i+1}</td>
                                                            <td  >${fileRef2.data().Name}</td>
                                                            <td>${fileRef2.data().ID_Number}</td>
                                                            <td>${fileRef2.data().Faculty}</td>
                                                            <td>${fileRef2.data().Phone_Number}</td>
                                                            <td>${fileRef2.data().Email}</td>
															<td>${start} </td>
                                                            <td>${end}</td>
                                                            <td colspan="2">
                            
                                                                <input type="button"  data-id1 = ${fileRef2.id} data-id2 =${lect}   value="View" id ="viewFbutton${+i}"  />
                                                                
                                            
                                                            </td>
                                                            
                                                            </tr>

						   `;
									
						 FileRow.innerHTML += html;
						 //report progress
						 i++;

					}else if(id.includes(searchvalue)){
					
					
						const html = `
												
						         
						<tr class="filerow" >
															<td  >${i+1}</td>
                                                            <td  >${fileRef2.data().Name}</td>
                                                            <td>${fileRef2.data().ID_Number}</td>
                                                            <td>${fileRef2.data().Faculty}</td>
                                                            <td>${fileRef2.data().Phone_Number}</td>
                                                            <td>${fileRef2.data().Email}</td>
															<td>${start} </td>
                                                            <td>${end}</td>
                                                            <td colspan="2">
                            
                                                                <input type="button"  data-id1 = ${fileRef2.id} data-id2 =${lect}   value="View" id ="viewFbutton${+i}"  />
                                                                
                                            
                                                            </td>
                                                            
                                                            </tr>

						   `;
									
						 FileRow.innerHTML += html;
						 //report progress
						 i++;

					}else if(faculty.includes(searchvalue)){
					
					
						const html = `
												
						         
						<tr class="filerow" >
															<td  >${i+1}</td>
                                                            <td  >${fileRef2.data().Name}</td>
                                                            <td>${fileRef2.data().ID_Number}</td>
                                                            <td>${fileRef2.data().Faculty}</td>
                                                            <td>${fileRef2.data().Phone_Number}</td>
                                                            <td>${fileRef2.data().Email}</td>
															<td>${start} </td>
                                                            <td>${end}</td>
                                                            <td colspan="2">
                            
                                                                <input type="button"  data-id1 = ${fileRef2.id} data-id2 =${lect}   value="View" id ="viewFbutton${+i}"  />
                                                                
                                            
                                                            </td>
                                                            
                                                            </tr>

						   `;
									
						 FileRow.innerHTML += html;
						 //report progress
						 i++;

					}else if(number.includes(searchvalue)){
					
						
						const html = `
												
						         
						<tr class="filerow" >
															<td  >${i+1}</td>
                                                            <td  >${fileRef2.data().Name}</td>
                                                            <td>${fileRef2.data().ID_Number}</td>
                                                            <td>${fileRef2.data().Faculty}</td>
                                                            <td>${fileRef2.data().Phone_Number}</td>
                                                            <td>${fileRef2.data().Email}</td>
															<td>${start} </td>
                                                            <td>${end}</td>
                                                            <td colspan="2">
                            
                                                                <input type="button"  data-id1 = ${fileRef2.id} data-id2 =${lect}   value="View" id ="viewFbutton${+i}"  />
                                                                
                                            
                                                            </td>
                                                            
                                                            </tr>

						   `;
									
						 FileRow.innerHTML += html;
						 //report progress
						 i++;

					}else if(email.includes(searchvalue)){
					
					
						const html = `
												
						         
						<tr class="filerow" >
															<td  >${i+1}</td>
                                                            <td  >${fileRef2.data().Name}</td>
                                                            <td>${fileRef2.data().ID_Number}</td>
                                                            <td>${fileRef2.data().Faculty}</td>
                                                            <td>${fileRef2.data().Phone_Number}</td>
                                                            <td>${fileRef2.data().Email}</td>
															<td>${start} </td>
                                                            <td>${end}</td>
                                                            <td colspan="2">
                            
                                                                <input type="button"  data-id1 = ${fileRef2.id} data-id2 =${lect}   value="View" id ="viewFbutton${+i}"  />
                                                                
                                            
                                                            </td>
                                                            
                                                            </tr>
						   `;
									
						 FileRow.innerHTML += html;
						 //report progress
						 i++;

					};

					
                                                                
                                                      
                                    
                });

                for ( d = 0; d < i; d++) {
                    //console.log("d"+d);

                        
                        let viewbtn = document.getElementById('viewFbutton'+ d);
                        
                        
                                                        

                                                        
                                                        
                                                        viewbtn.addEventListener('click', (e) => {

                                                            e.stopPropagation();
                                                            
                                                            var  userID= e.target.getAttribute('data-id2');
                                                           
                                                            sessionStorage.setItem("userIDF", userID);
                                                            
                                                            
                                                            window.location.href = 'rmcVProfile.html';

                                                        });
                                                            
                                                        
                                                                    
                                
                                                        


                };

			

               
                                
            });
            
            
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

					