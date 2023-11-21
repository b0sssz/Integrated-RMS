	
	
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
        var Cat =  document.getElementById("Category");
        var i =0; 
        var c = 0;

       

	
		
//---------------------------------------display list file into firestore--------------------------------------------------------------------------//

const FileRow2 = document.querySelector('.filerow2');
const FileRow3 = document.querySelector('.filerow3');
const modal2display = document.querySelector('.modal2display');

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
                       var type = fileRef2.data().Faculty;
                            
                       if (type == "CIGLS"){
                        var lect2 = lect;
                          

                                db.collection('ReportProgress/'+'UserID/' + lect2  ).get().then(function(doc) {
                    
                                    //  console.log(lect);
                                      doc.forEach(function(fileRef){
                                          
                                          
                                          var RefFile  = fileRef.id;
                                          
                                          const html = `
                                          
                                          <tr class="filerow" >
                                          <td>${a+1}</td>
                                          <td  >${fileRef.data().Title_Grant}</td>
                                          <td>${fileRef.data().Grant_Reference}</td>
                                          <td>${fileRef.data().Report_Date}</td>
                                          <td>${fileRef.data().RMC_Status}</td>
                                          <td colspan="2">
                                              
                                              <input type="button"  data-id1 = ${fileRef.id} data-id2 =${lect2}   value="View" id ="viewbutton${+a}"  />
                                              
                          
                                          </td>
                                          </tr>
                                          
                          
                                              `;
                                              
                                              FileRow2.innerHTML += html;
                          
                                              
                                              a++;
                                      });
                                    // console.log(a);
                                      
                                              for ( b = 0; b < a; b++) {
                          
                                                      
                                                      let viewbtn = document.getElementById('viewbutton'+ b);
                                                      
                                                                                      
                                                                                      viewbtn.addEventListener('click', (e) => {
                          
                                                                                          e.stopPropagation();
                                                                                          var  reportID= e.target.getAttribute('data-id1');
                                                                                          var  userID= e.target.getAttribute('data-id2');
                                                                                          sessionStorage.setItem("reportID", reportID);
                                                                                          sessionStorage.setItem("userID", userID);
                                                                                          
                                                                                          window.location.href = 'AdminViewPDF.html';
                          
                              
                                                                              
                                                                                          
                                                                                      });
                                                                              
                          
                                              };
                                  });
                  
                                  db.collection('FinalReport/'+'UserID/' + lect2  ).get().then(function(doc) {
                                      
                                      //console.log(lect);
                                      doc.forEach(function(fileRef3){
                                          
                                          
                                          var RefFile  = fileRef3.id;
                                          
                                          const html = `
                                          
                                          <tr class="filerow" >
                                          <td>${c+1}</td>
                                          <td  >${fileRef3.data().Title_Grant}</td>
                                          <td>${fileRef3.data().Grant_Reference}</td>
                                          <td>${fileRef3.data().Report_Date}</td>
                                          <td>${fileRef3.data().RMC_Status}</td>
                                          <td colspan="2">
                                              
                                              <input type="button"  data-id1 = ${fileRef3.id} data-id2 =${lect2}   value="View" id ="viewFbutton${+c}"  />
                                              
                          
                                          </td>
                                          </tr>
                                          
                          
                                              `;
                                              
                                              FileRow3.innerHTML += html;
                          
                                              
                                              c++;
                                      });
                                    // console.log("c"+c);
                                      
                                              for ( d = 0; d < c; d++) {
                                                  //console.log("d"+d);
                          
                                                      
                                                      let viewbtn = document.getElementById('viewFbutton'+ d);
                                                      
                                                                                      
                                                                                      viewbtn.addEventListener('click', (e) => {
                          
                                                                                          e.stopPropagation();
                                                                                          var  reportID= e.target.getAttribute('data-id1');
                                                                                          var  userID= e.target.getAttribute('data-id2');
                                                                                          sessionStorage.setItem("FinalReportID", reportID);
                                                                                          sessionStorage.setItem("userIDF", userID);
                                                                                          
                                                                                          window.location.href = 'AdminViewFinalPDF.html';
                                                                                          
                                                                                      });
                                                     
                                              };
                                  });
                       }
                    });

                   
                                    
                });
               

			});
			
					
		});
	 };
};

//---------------------------------------List Progress Report--------------------------------------------------------------------------//
function listProgress(){

    FileRow2.innerHTML ="";

  
    var y = document.getElementById("final-section");
    y.style.display = "none";
    var z = document.getElementById("progress-section");
    z.style.display = "block";

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
                            var type = fileRef2.data().Faculty;
                                 
                            if (type == "CIGLS"){
                             var lect2 = lect;
                                 
     
                                     db.collection('ReportProgress/'+'UserID/' + lect2  ).get().then(function(doc) {
                         
                                         //  console.log(lect);
                                           doc.forEach(function(fileRef){
                                               
                                               
                                               var RefFile  = fileRef.id;
                                               
                                               const html = `
                                               
                                               <tr class="filerow" >
                                               <td>${a+1}</td>
                                               <td  >${fileRef.data().Title_Grant}</td>
                                               <td>${fileRef.data().Grant_Reference}</td>
                                               <td>${fileRef.data().Report_Date}</td>
                                               <td>${fileRef.data().RMC_Status}</td>
                                               <td colspan="2">
                                                   
                                                   <input type="button"  data-id1 = ${fileRef.id} data-id2 =${lect2}   value="View" id ="viewbutton${+a}"  />
                                                   
                               
                                               </td>
                                               </tr>
                                               
                               
                                                   `;
                                                   
                                                   FileRow2.innerHTML += html;
                               
                                                   
                                                   a++;
                                           });
                                         // console.log(a);
                                           
                                                   for ( b = 0; b < a; b++) {
                               
                                                           
                                                           let viewbtn = document.getElementById('viewbutton'+ b);
                                                           
                                                                                           
                                                                                           viewbtn.addEventListener('click', (e) => {
                               
                                                                                               e.stopPropagation();
                                                                                               var  reportID= e.target.getAttribute('data-id1');
                                                                                               var  userID= e.target.getAttribute('data-id2');
                                                                                               sessionStorage.setItem("reportID", reportID);
                                                                                               sessionStorage.setItem("userID", userID);
                                                                                               
                                                                                               window.location.href = 'AdminViewPDF.html';
                               
                                   
                                                                                   
                                                                                               
                                                                                           });
                                                                                   
                               
                                                   };
                                       });
                       
                                      
                            }
                         });
     
                        
                                         
                     });
                    
     
                 });
                 
                         
             });
          };
}
//---------------------------------------Log Out Account--------------------------------------------------------------------------//
function listFinal(){

    
    if (User) {

  
    var y = document.getElementById("final-section");
    y.style.display = "block";
    var z = document.getElementById("progress-section");
    z.style.display = "none";

    FileRow3.innerHTML = "";

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
                            var type = fileRef2.data().Faculty;
                                 
                            if (type == "CIGLS"){
                             var lect2 = lect;
                               
     
                                   
                                       db.collection('FinalReport/'+'UserID/' + lect2  ).get().then(function(doc) {
                                           
                                           //console.log(lect);
                                           doc.forEach(function(fileRef3){
                                               
                                               
                                               var RefFile  = fileRef3.id;
                                               
                                               const html = `
                                               
                                               <tr class="filerow" >
                                               <td>${c+1}</td>
                                               <td  >${fileRef3.data().Title_Grant}</td>
                                               <td>${fileRef3.data().Grant_Reference}</td>
                                               <td>${fileRef3.data().Report_Date}</td>
                                               <td>${fileRef3.data().RMC_Status}</td>
                                               <td colspan="2">
                                                   
                                                   <input type="button"  data-id1 = ${fileRef3.id} data-id2 =${lect2}   value="View" id ="viewFbutton${+c}"  />
                                                   
                               
                                               </td>
                                               </tr>
                                               
                               
                                                   `;
                                                   
                                                   FileRow3.innerHTML += html;
                               
                                                   
                                                   c++;
                                           });
                                         // console.log("c"+c);
                                           
                                                   for ( d = 0; d < c; d++) {
                                                       //console.log("d"+d);
                               
                                                           
                                                           let viewbtn = document.getElementById('viewFbutton'+ d);
                                                           
                                                                                           
                                                                                           viewbtn.addEventListener('click', (e) => {
                               
                                                                                               e.stopPropagation();
                                                                                               var  reportID= e.target.getAttribute('data-id1');
                                                                                               var  userID= e.target.getAttribute('data-id2');
                                                                                               sessionStorage.setItem("FinalReportID", reportID);
                                                                                               sessionStorage.setItem("userIDF", userID);
                                                                                               
                                                                                               window.location.href = 'AdminViewFinalPDF.html';
                                                                                               
                                                                                           });
                                                          
                                                   };
                                       });
                            }
                         });
     
                        
                                         
                     });
                    
     
                 });
                 
                         
             });
          };
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

search.addEventListener('click', function(e) {
    e.preventDefault();
    FileRow.innerHTML = "";
    FileRow2.innerHTML = "";
    console.log(Cat.innerText);

    const searchvalue = document.getElementById("Search_value").value.toUpperCase();
    var i=0; 
    var c= 0;  
    var e = 0;
    db.collection('Lecturer_ID/').get().then(function(doc) {
       
            
        doc.forEach(function(fileRef){
            var lect = fileRef.data().Lecturer_UID.toString();
           
          //report progress
    FileRow2.innerHTML = "";
   
    db.collection('ReportProgress/'+'UserID/' + lect  ).get().then(function(doc) {
       
        
        doc.forEach(function(fileRefP){
            var Title = fileRefP.data().Title_Grant;
            var Reference = fileRefP.data().Grant_Reference;
            var Year1 = fileRefP.data().Report_Date;
            var Year2 = new Date(Year1).getFullYear();
            
            
            
            if (Title.includes(searchvalue)){
                console.log ("Success");
                
                var RefFile  = fileRefP.id;
            

                const html = `
                
                <tr class="filerow" >
                <td>${i+1}</td>
                <td  >${fileRefP.data().Title_Grant}</td>
                <td>${fileRefP.data().Grant_Reference}</td>
                <td>${fileRefP.data().Report_Date}</td>
                <td>${fileRefP.data().RMC_Status}</td>
                <td colspan="2">
                    
                    <input type="button"  data-id1 = ${fileRefP.id} data-id2 =${lect}   value="View" id ="viewPbutton${+i}"  />
                    
    
                </td>
                </tr>
                
    
                    `;
                    
                    FileRow2.innerHTML += html;
                    i++;
                    
                    

            }else if (Reference.includes(searchvalue)){
                console.log ("Success");
                
                var RefFile  = fileRefP.id;
            

                const html = `
                
                <tr class="filerow" >
                <td>${i+1}</td>
                <td  >${fileRefP.data().Title_Grant}</td>
                <td>${fileRefP.data().Grant_Reference}</td>
                <td>${fileRefP.data().Report_Date}</td>
                <td>${fileRefP.data().RMC_Status}</td>
                <td colspan="2">
                    
                    <input type="button"  data-id1 = ${fileRefP.id} data-id2 =${lect}   value="View" id ="viewPbutton${+i}"  />
                    
    
                </td>
                </tr>
                
    
                    `;
                    
                    FileRow2.innerHTML += html;
                    i++;
                   

            }else if (searchvalue == Year2.toString()){
                console.log ("Success");
                
                var RefFile  = fileRefP.id;
            

                const html = `
                
                <tr class="filerow" >
                <td>${i+1}</td>
                <td  >${fileRefP.data().Title_Grant}</td>
                <td>${fileRefP.data().Grant_Reference}</td>
                <td>${fileRefP.data().Report_Date}</td>
                <td>${fileRefP.data().RMC_Status}</td>
                <td colspan="2">
                    
                    <input type="button"  data-id1 = ${fileRefP.id} data-id2 =${lect}   value="View" id ="viewPbutton${+i}"  />
                    
    
                </td>
                </tr>
                
    
                    `;
                    
                    FileRow2.innerHTML += html;
                    i++;
       

            }

            
            
        });
        
                for ( b = 0; b < i; b++) {

                        let viewbtn = document.getElementById('viewPbutton'+ b);
                     
                       
                                                        
                                                        
                                                        viewbtn.addEventListener('click', (e) => {

                                                            e.stopPropagation();
                                                            var  reportID= e.target.getAttribute('data-id1');
															var  userID= e.target.getAttribute('data-id2');
                                                            
                                                            sessionStorage.setItem("reportID", reportID);
															sessionStorage.setItem("userID", userID);
                                                            window.location.href = 'AdminViewPDF.html';

                                                        });
                   

                };
    });

       //Final Report
       FileRow3.innerHTML = "";
       db.collection('FinalReport/'+'UserID/' + lect  ).get().then(function(doc) {
           
           doc.forEach(function(fileRef){
               
            var Title = fileRef.data().Title_Grant;
            var Reference = fileRef.data().Grant_Reference;
            var Year1 = fileRef.data().Report_Date;
            var Year2 = new Date(Year1).getFullYear();
            
            
            
             if (Title.includes(searchvalue)){
                var RefFile  = fileRef.id;
                const html = `
                
                <tr class="filerow" >
                <td>${c+1}</td>
                <td  >${fileRef.data().Title_Grant}</td>
                <td>${fileRef.data().Grant_Reference}</td>
                <td>${fileRef.data().Report_Date}</td>
                <td>${fileRef.data().RMC_Status}</td>
                <td colspan="2">
                    
                    <input type="button"  data-id1 = ${fileRef.id} data-id2 =${lect}   value="View" id ="viewFbutton${+c}"  />
                    
    
                </td>
                </tr>
                
    
                    `;
                    
                    FileRow3.innerHTML += html;
    
                    
                    c++;
             } else if ( Reference.includes(searchvalue)){
                var RefFile  = fileRef.id;
                const html = `
                
                <tr class="filerow" >
                <td>${c+1}</td>
                <td  >${fileRef.data().Title_Grant}</td>
                <td>${fileRef.data().Grant_Reference}</td>
                <td>${fileRef.data().Report_Date}</td>
                <td>${fileRef.data().RMC_Status}</td>
                <td colspan="2">
                    
                    <input type="button"  data-id1 = ${fileRef.id} data-id2 =${lect}   value="View" id ="viewFbutton${+c}"  />
                    
    
                </td>
                </tr>
                
    
                    `;
                    
                    FileRow3.innerHTML += html;
    
                    
                    c++;
             } else if (searchvalue == Year2.toString()){
                var RefFile  = fileRef.id;
                const html = `
                
                <tr class="filerow" >
                <td>${c+1}</td>
                <td  >${fileRef.data().Title_Grant}</td>
                <td>${fileRef.data().Grant_Reference}</td>
                <td>${fileRef.data().Report_Date}</td>
                <td>${fileRef.data().RMC_Status}</td>
                <td colspan="2">
                    
                    <input type="button"  data-id1 = ${fileRef.id} data-id2 =${lect}   value="View" id ="viewFbutton${+c}"  />
                    
    
                </td>
                </tr>
                
    
                    `;
                    
                    FileRow3.innerHTML += html;
    
                    
                   c++;
             }

                   
           });
           
                   for ( b = 0; b < c; b++) {
   
                           let viewbtn = document.getElementById('viewFbutton'+ b);
                           
                           
                                                           
                                                           
                                                           viewbtn.addEventListener('click', (e) => {
   
                                                               e.stopPropagation();
                                                               var  reportID= e.target.getAttribute('data-id1');
                                                               var  userID= e.target.getAttribute('data-id2');
                                                               sessionStorage.setItem("FinalReportID", reportID);
															   sessionStorage.setItem("userIDF", userID);
                                                               window.location.href = 'AdminViewFinalPDF.html';
   
   
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

					