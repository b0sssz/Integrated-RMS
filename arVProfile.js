	
	
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
        var userID = sessionStorage.getItem("userIDF");
        var record = sessionStorage.getItem("record");
       var Name ="";

		

		
//---------------------------------------display list file into firestore--------------------------------------------------------------------------//
const FileRow = document.querySelector('.filerow');
const FileRow2 = document.querySelector('.filerow2');

const modal2display = document.querySelector('.modal2display');

var member = document.getElementById("member-section");

const header = document.getElementById('header');





function listfile(){

    
	if (User) {
    

   var i = 0;
   var a =0;		
   var b = 0;	 
   var c = 0;
 
              
     db.collection('Lecturer/'+ userID + '/' +'Profile/').get().then(function(doc) {
                    doc.forEach(function(fileRef2){
                        Name = fileRef2.data().Name;
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
                                                            <td>${fileRef2.data().Grant_Title}</td>
                                                            <td>${fileRef2.data().Grant_Category}</td>
                                                            <td>${fileRef2.data().Faculty}</td>
                                                            <td>${fileRef2.data().Phone_Number}</td>
                                                            <td>${fileRef2.data().Email}</td>
															<td>${start} to ${end}</td>
                                                          
                                                            
                                                            </tr>
                                                            

                                                                `;
                                                                
                                                                FileRow.innerHTML += html;

                                                                
                                                                i++;
                    });


                   
                                    
     });

     listMember();
              

		
			
					
	
	 };
};

function listMember(){
    FileRow2.innerHTML ="";

       



        console.log(userID);
        i =1;

        db.collection('Lecturer/'+ userID +'/'+ 'Grant_Member').get().then(function(doc) {
			//console.log(doc)
				doc.forEach(function(fileRef){
					
					
					const html = `

						 
						<tr class="filerow" >
						<td data-id1 = ${fileRef.id} >${i}</td>
						<td  >${fileRef.data().GrantMember_Name}</td>
						<td>${fileRef.data().GrantMember_Email}</td>
						<td>${fileRef.data().GrantMember_PhoneNumber}</td>
						
						</tr>
						
				

			

					`;
					
					FileRow2.innerHTML += html;

					i++;
						
					});
					});

}



function exportFile(type,fn,dl){
   

    if(record == "journal"){

        var elt = document.getElementById('journal-table');
        
        var wb = XLSX.utils.table_to_book(elt, { sheet: "Journal" });
      

        return dl ?
          XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
          XLSX.writeFile(wb, fn || ('Journal-'+Name +"." + (type || 'xlsx')));

    }else if (record == "finance"){

        var elt = document.getElementById('finance-table');
        
        var wb = XLSX.utils.table_to_book(elt, { sheet: "Finance" });
      

        return dl ?
          XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
          XLSX.writeFile(wb, fn || ('Finance-'+Name +"." + (type || 'xlsx')));

    }else if (record == "copyright"){

        var elt = document.getElementById('copyright-table');
        
        var wb = XLSX.utils.table_to_book(elt, { sheet: "Copyright" });
      

        return dl ?
          XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
          XLSX.writeFile(wb, fn || ('Copyright-'+Name +"." + (type || 'xlsx')));

    }else if (record == "conference"){

        var elt = document.getElementById('conference-table');
        
        var wb = XLSX.utils.table_to_book(elt, { sheet: "Conference" });
      

        return dl ?
          XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
          XLSX.writeFile(wb, fn || ('Conference-'+Name +"." + (type || 'xlsx')));

    }else if (record == "innovation"){

        var elt = document.getElementById('innovation-table');
        
        var wb = XLSX.utils.table_to_book(elt, { sheet: "Innovation" });
      

        return dl ?
          XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
          XLSX.writeFile(wb, fn || ('Innovation-'+Name +"." + (type || 'xlsx')));

    }else if (record == "proceeding"){

        var elt = document.getElementById('proceeding-table');
        
        var wb = XLSX.utils.table_to_book(elt, { sheet: "Proceeding" });
      

        return dl ?
          XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
          XLSX.writeFile(wb, fn || ('Proceeding-'+Name +"." + (type || 'xlsx')));
    }
 
    
      
     
}




		
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
/*
search.addEventListener('click', function(e) {
    e.preventDefault();

    const searchvalue = document.getElementById("Search_value").value.toUpperCase();
    
    FileRow.innerHTML = "";
   

    db.collection('Lecturer_ID/').get().then(function(doc) {
         var i=0;   
            
        doc.forEach(function(fileRef){
            var lect = fileRef.data().Lecturer_UID.toString();
           
           

            db.collection('Lecturer/'+ lect + '/' +'Profile/').get().then(function(doc) {
                doc.forEach(function(fileRef2){

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
                                           <td>${fileRef2.data().Start_Date} to ${fileRef2.data().End_Date}</td>

                                                   
                                            </tr>
                                                   

                                              `;
                                                       
                                            FileRow.innerHTML += html;
                                            //report progress

                                            

                   }else if(email.includes(searchvalue)){
                   
                   
                      
                       

                        const html = `
                                                   
                                           <tr class="filerow" >
                                           <td>${i+1}</td>
                                           <td  >${fileRef2.data().Name}</td>
                                           <td>${fileRef2.data().ID_Number}</td>
                                           <td>${fileRef2.data().Faculty}</td>
                                           <td>${fileRef2.data().Phone_Number}</td>
                                           <td>${fileRef2.data().Email}</td>
                                           <td>${fileRef2.data().Start_Date} to ${fileRef2.data().End_Date}</td>

                                                   
                                            </tr>
                                                   

                                              `;
                                                       
                                            FileRow.innerHTML += html;
                                            //report progress

                                           

                   }else if(number.includes(searchvalue)){
                   
                   
                      
                       

                        const html = `
                                                   
                                           <tr class="filerow" >
                                           <td>${i+1}</td>
                                           <td  >${fileRef2.data().Name}</td>
                                           <td>${fileRef2.data().ID_Number}</td>
                                           <td>${fileRef2.data().Faculty}</td>
                                           <td>${fileRef2.data().Phone_Number}</td>
                                           <td>${fileRef2.data().Email}</td>
                                           <td>${fileRef2.data().Start_Date} to ${fileRef2.data().End_Date}</td>

                                                   
                                            </tr>
                                                   

                                              `;
                                                       
                                            FileRow.innerHTML += html;
                                            //report progress


                   }else if(faculty.includes(searchvalue)){
                   
                   
                      
                       

                    const html = `
                                               
                                       <tr class="filerow" >
                                       <td>${i+1}</td>
                                       <td  >${fileRef2.data().Name}</td>
                                       <td>${fileRef2.data().ID_Number}</td>
                                       <td>${fileRef2.data().Faculty}</td>
                                       <td>${fileRef2.data().Phone_Number}</td>
                                       <td>${fileRef2.data().Email}</td>
                                       <td>${fileRef2.data().Start_Date} to ${fileRef2.data().End_Date}</td>

                                               
                                        </tr>
                                               

                                          `;
                                                   
                                        FileRow.innerHTML += html;
                                        //report progress


               }else if(id.includes(searchvalue)){
                   
                   
                      
                 

                        const html = `
                                                   
                                           <tr class="filerow" >
                                           <td>${i+1}</td>
                                           <td  >${fileRef2.data().Name}</td>
                                           <td>${fileRef2.data().ID_Number}</td>
                                           <td>${fileRef2.data().Faculty}</td>
                                           <td>${fileRef2.data().Phone_Number}</td>
                                           <td>${fileRef2.data().Email}</td>
                                           <td>${fileRef2.data().Start_Date} to ${fileRef2.data().End_Date}</td>

                                                   
                                            </tr>
                                                   

                                              `;
                                                       
                                            FileRow.innerHTML += html;
                                            //report progress


                   }else if(StartD.includes(searchvalue)|| EndD.includes(searchvalue)){
                   
                   
                      
                       

                        const html = `
                                                   
                                           <tr class="filerow" >
                                           <td>${i+1}</td>
                                           <td  >${fileRef2.data().Name}</td>
                                           <td>${fileRef2.data().ID_Number}</td>
                                           <td>${fileRef2.data().Faculty}</td>
                                           <td>${fileRef2.data().Phone_Number}</td>
                                           <td>${fileRef2.data().Email}</td>
                                           <td>${fileRef2.data().Start_Date} to ${fileRef2.data().End_Date}</td>

                                                   
                                            </tr>
                                                   

                                              `;
                                                       
                                            FileRow.innerHTML += html;
                                            //report progress


                   };
					                                                     
                                    
                });
			                    
            });
  
        });
                      
    });
   			

                        
                        
            });
*/

//---------------------------------------Log Out Account--------------------------------------------------------------------------//
 
           
		LogOut.addEventListener('click', function(e) {
			e.preventDefault();
			auth.signOut().then(() => {
				(e => alert(e.message));
				alert("Sign Out" );	
				window.location.href = 'home.html';
			})			
								
								
					});

					