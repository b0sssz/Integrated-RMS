	
	
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
    const record = sessionStorage.getItem("record");
       

		

		
//---------------------------------------display list file into firestore--------------------------------------------------------------------------//
const FileRow = document.querySelector('.filerow');
const FileRow2 = document.querySelector('.filerow2');
const FileRow3 = document.querySelector('.filerow3');
const modal2display = document.querySelector('.modal2display');
const header = document.getElementById('header');

window.onload = function () {

  if(record=="finance"){
  header.innerHTML="Finance Record";
  }else if(record=="conference"){
      header.innerHTML="Conference Record";
      }else if(record=="innovation"){
          header.innerHTML="Innovation Record";
          }else if(record=="copyright"){
              header.innerHTML="Copyright Record";
              }else if(record=="proceeding"){
                  header.innerHTML="Proceeding Record";
                  }else if(record=="journal"){
                      header.innerHTML="Journal Record";
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
					 
                                                        
                                                            const html = `
                                                            
                                                            <tr class="filerow" >
														                              	<td  >${i+1}</td>
                                                            <td  >${fileRef2.data().Name}</td>
                                                            <td>${fileRef2.data().ID_Number}</td>
                                                            <td>${fileRef2.data().Faculty}</td>
                                                            <td>${fileRef2.data().Phone_Number}</td>
                                                            <td>${fileRef2.data().Email}</td>
															                              <td>${start} to ${end}</td>
                                                            <td colspan="2">
                            
                                                                <input type="button"  data-id1 = ${fileRef2.id} data-id2 =${lect}   value="View" id ="viewFbutton${+i}"  />
                                                                
                                            
                                                            </td>
                                                            
                                                            </tr>
                                                            

                                                                `;
                                                                
                                                                FileRow.innerHTML += html;

                                                                
                                                                i++;
                    });

                    for ( d = 0; d < i; d++) {
                        //console.log("d"+d);
    
                            
                            let viewbtn = document.getElementById('viewFbutton'+ d);
                            
                            
                                                            
    
                                                            
                                                            
                                                            viewbtn.addEventListener('click', (e) => {
    
                                                                e.stopPropagation();
                                                                
                                                                var  userID= e.target.getAttribute('data-id2');
                                                               
                                                                sessionStorage.setItem("userIDF", userID);
                                                                sessionStorage.setItem("record", record);
                                                                
                                                                window.location.href = 'adminVRecord.html';
    
                                                            });
                                                                
                                                            
                                                                        
                                    
                                                            
    
    
                    };

                   
                                    
                });

            
              

			});
			
					
		});
	 };
};

function listFaculty(){

  var i = 0;
  var a =0;		
  var b = 0;	 
  var c = 0;
	
	FileRow.innerHTML = "";

     Cat =  document.getElementById("Category");
	
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

					if(faculty == Cat.innerText){
					
            const html = `
                                                            
            <tr class="filerow" >
            <td  >${i+1}</td>
            <td  >${fileRef2.data().Name}</td>
            <td>${fileRef2.data().ID_Number}</td>
            <td>${fileRef2.data().Faculty}</td>
            <td>${fileRef2.data().Phone_Number}</td>
            <td>${fileRef2.data().Email}</td>
            <td>${start} to ${end}</td>
            <td colspan="2">

                <input type="button"  data-id1 = ${fileRef2.id} data-id2 =${lect}   value="View" id ="viewFbutton${+i}"  />
                

            </td>
            
            </tr>
            

                `;
                
						 FileRow.innerHTML += html;
						 //report progress
						 i++;

					};

          for ( d = 0; d < i; d++) {
            //console.log("d"+d);

                
                let viewbtn = document.getElementById('viewFbutton'+ d);
                
                
                                                

                                                
                                                
                                                viewbtn.addEventListener('click', (e) => {

                                                    e.stopPropagation();
                                                    
                                                    var  userID= e.target.getAttribute('data-id2');
                                                   
                                                    sessionStorage.setItem("userIDF", userID);
                                                    sessionStorage.setItem("record", record);
                                                    window.location.href = 'adminVRecord.html';

                                                });
                                                    
                                                
                                                            
                        
                                                


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
    var b = 0;

    const searchvalue = document.getElementById("Search_value").value.toUpperCase();
    
    FileRow.innerHTML = "";
  

    db.collection('Lecturer_ID/').get().then(function(doc) {
         var i=0;   
            
        doc.forEach(function(fileRef){
            var lect = fileRef.data().Lecturer_UID.toString();
           
           

            db.collection('Lecturer/'+ lect + '/' +'Profile/').get().then(function(doc) {
                doc.forEach(function(fileRef2){
                 

                  Sdate = new Date(fileRef2.data().Start_Date);
                  Smonth = Sdate.getMonth()+1;
                  Edate  = new Date(fileRef2.data().End_Date);
                  Emonth = Edate.getMonth()+1;
                  start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
                  end = Edate.getDate() + '/'+ Emonth+ '/'+ Edate.getFullYear();

                    var name  = fileRef2.data().Name;
                    var email = fileRef2.data().Email;
                    var faculty = fileRef2.data().Faculty;
                    var number = fileRef2.data().Phone_Number;
                    var id = fileRef2.data().ID_Number;
                    var StartD = fileRef2.data().Start_Date;
                    var EndD = fileRef2.data().End_Date;
                    

                    if(name.includes(searchvalue)){
                            
                        
                   

                        const html = `
                                                   
                                           <tr class="filerow" >
                                           <td>${i+1}</td>
                                           <td  >${fileRef2.data().Name}</td>
                                           <td>${fileRef2.data().ID_Number}</td>
                                           <td>${fileRef2.data().Faculty}</td>
                                           <td>${fileRef2.data().Phone_Number}</td>
                                           <td>${fileRef2.data().Email}</td>
                                           <td>${start} to ${end}</td>
                                           <td colspan="2">
           
                                               <input type="button"  data-id1 = ${fileRef2.id} data-id2 =${lect}   value="View" id ="viewSbutton${+b}"  />
                                               
                           
                                           </td>
                                                   
                                            </tr>
                                                   

                                              `;
                                            
                                            FileRow.innerHTML += html;
                                            //report progress
                                            b++;

                                            

                   }else if(email.includes(searchvalue)){
                   
                   
                      
                       

                        const html = `
                                                   
                                           <tr class="filerow" >
                                           <td>${i+1}</td>
                                           <td  >${fileRef2.data().Name}</td>
                                           <td>${fileRef2.data().ID_Number}</td>
                                           <td>${fileRef2.data().Faculty}</td>
                                           <td>${fileRef2.data().Phone_Number}</td>
                                           <td>${fileRef2.data().Email}</td>
                                           <td>${start} to ${end}</td>
                                           <td colspan="2">
           
                                               <input type="button"  data-id1 = ${fileRef2.id} data-id2 =${lect}   value="View" id ="viewSbutton${+b}"  />
                                               
                           
                                           </td>       
                                            </tr>
                                                   

                                              `;
                                                       
                                            FileRow.innerHTML += html;
                                            //report progress
                                            b++;

                                           

                   }else if(number.includes(searchvalue)){
                   
                   
                      
                       

                        const html = `
                                                   
                                           <tr class="filerow" >
                                           <td>${i+1}</td>
                                           <td  >${fileRef2.data().Name}</td>
                                           <td>${fileRef2.data().ID_Number}</td>
                                           <td>${fileRef2.data().Faculty}</td>
                                           <td>${fileRef2.data().Phone_Number}</td>
                                           <td>${fileRef2.data().Email}</td>
                                           <td>${start} to ${end}</td>
                                           <td colspan="2">
           
                                               <input type="button"  data-id1 = ${fileRef2.id} data-id2 =${lect}   value="View" id ="viewSbutton${+b}"  />
                                               
                           
                                           </td>
                                                   
                                            </tr>
                                                   

                                              `;
                                                       
                                            FileRow.innerHTML += html;
                                            //report progress
                                            b++;


                   }else if(faculty.includes(searchvalue)){
                   
                   
                      
                       

                    const html = `
                                               
                                       <tr class="filerow" >
                                       <td>${i+1}</td>
                                       <td  >${fileRef2.data().Name}</td>
                                       <td>${fileRef2.data().ID_Number}</td>
                                       <td>${fileRef2.data().Faculty}</td>
                                       <td>${fileRef2.data().Phone_Number}</td>
                                       <td>${fileRef2.data().Email}</td>
                                       <td>${start} to ${end}</td>
                                       <td colspan="2">
       
                                           <input type="button"  data-id1 = ${fileRef2.id} data-id2 =${lect}   value="View" id ="viewSbutton${+b}"  />
                                           
                       
                                       </td>       
                                        </tr>
                                               

                                          `;
                                                   
                                        FileRow.innerHTML += html;
                                        //report progress
                                        b++;


               }else if(id.includes(searchvalue)){
                   
                   
                      
                 

                        const html = `
                                                   
                                           <tr class="filerow" >
                                           <td>${i+1}</td>
                                           <td  >${fileRef2.data().Name}</td>
                                           <td>${fileRef2.data().ID_Number}</td>
                                           <td>${fileRef2.data().Faculty}</td>
                                           <td>${fileRef2.data().Phone_Number}</td>
                                           <td>${fileRef2.data().Email}</td>
                                           <td>${start} to ${end}</td>
                                           <td colspan="2">
           
                                               <input type="button"  data-id1 = ${fileRef2.id} data-id2 =${lect}   value="View" id ="viewSbutton${+b}"  />
                                               
                           
                                           </td>
                                                   
                                            </tr>
                                                   

                                              `;
                                                       
                                            FileRow.innerHTML += html;
                                            //report progress
                                            b++;


                   }else if(StartD.includes(searchvalue)|| EndD.includes(searchvalue)){
                   
                   
                      
                       

                        const html = `
                                                   
                                           <tr class="filerow" >
                                           <td>${i+1}</td>
                                           <td  >${fileRef2.data().Name}</td>
                                           <td>${fileRef2.data().ID_Number}</td>
                                           <td>${fileRef2.data().Faculty}</td>
                                           <td>${fileRef2.data().Phone_Number}</td>
                                           <td>${fileRef2.data().Email}</td>
                                           <td>${start} to ${end}</td>
                                           <td colspan="2">
           
                                               <input type="button"  data-id1 = ${fileRef2.id} data-id2 =${lect}   value="View" id ="viewSbutton${+b}"  />
                                               
                           
                                           </td>
                                                   
                                            </tr>
                                                   

                                              `;
                                                       
                                            FileRow.innerHTML += html;
                                            //report progress
                                            b++;


                   };


					                                                     
                                    
                });
                
                for ( d = 0; d < b; d++) {
                  //console.log("d"+d);

                      
                      let viewbtn2 = document.getElementById('viewSbutton'+ d);
                      console.log("search");
                      
                                                      

                                                      
                                                      
                                                      viewbtn2.addEventListener('click', (e) => {
                                                        console.log("search");

                                                          e.stopPropagation();
                                                          
                                                          var  userID= e.target.getAttribute('data-id2');
                                                         
                                                          sessionStorage.setItem("userIDF", userID);
                                                          sessionStorage.setItem("record", record);
                                                          window.location.href = 'adminVRecord.html';

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

					