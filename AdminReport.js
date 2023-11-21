	
	
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
const FileRow = document.querySelector('.filerow');
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
                            
                            </tr>
                            

                                `;
                                
                                FileRow.innerHTML += html;

                                
                                i++;
                    });

                   
                                    
                });
                db.collection('ReportProgress/'+'UserID/' + lect  ).get().then(function(doc) {
                    
                    
                  //  console.log(lect);
                    doc.forEach(function(fileRef){
                        
                        Sdate = new Date(fileRef.data().Report_Date);
                        Smonth = Sdate.getMonth()+1;
                
                        start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
                        
                        var RefFile  = fileRef.id;
						
                        const html = `
                        
                        <tr class="filerow" >
                        <td>${a+1}</td>
                        <td  >${fileRef.data().Title_Grant}</td>
                        <td>${fileRef.data().Grant_Reference}</td>
                        <td>${start}</td>
                        <td>${fileRef.data().RMC_Status}</td>
                        <td colspan="2">
                            
                            <input type="button"  data-id1 = ${fileRef.id} data-id2 =${lect}   value="View" id ="viewbutton${+a}"  />
                            
        
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

				db.collection('FinalReport/'+'UserID/' + lect  ).get().then(function(doc) {
                    
                    //console.log(lect);
                    doc.forEach(function(fileRef3){
                        
                        Sdate = new Date(fileRef3.data().Report_Date);
                        Smonth = Sdate.getMonth()+1;
                
                        start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
                        
                        var RefFile  = fileRef3.id;
						
                        const html = `
                        
                        <tr class="filerow" >
                        <td>${c+1}</td>
                        <td  >${fileRef3.data().Title_Grant}</td>
                        <td>${fileRef3.data().Grant_Reference}</td>
                        <td>${start}</td>
                        <td>${fileRef3.data().RMC_Status}</td>
                        <td colspan="2">
                            
                            <input type="button"  data-id1 = ${fileRef3.id} data-id2 =${lect}   value="View" id ="viewFbutton${+c}"  />
                            
        
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

			});
			
					
		});
	 };
};

//---------------------------------------List Progress--------------------------------------------------------------------------//
function listProgress(){
    if (User) {

        var i = 0;
        var a =0;		
        var b = 0;	 
        var c = 0;

        FileRow2.innerHTML ="";

        var x = document.getElementById("listGrant-section");
        x.style.display = "none";
        var y = document.getElementById("final-section");
        y.style.display = "none";
        var z = document.getElementById("progress-section");
        z.style.display = "block";

        
        
             db.collection('Lecturer_ID/').get().then(function(doc) {
                 
                 
                 doc.forEach(function(fileRef){
                   var lect = fileRef.data().Lecturer_UID.toString();
                     
     

                     db.collection('ReportProgress/'+'UserID/' + lect  ).get().then(function(doc) {
                         
                       //  console.log(lect);
                         doc.forEach(function(fileRef){
                            Sdate = new Date(fileRef.data().Report_Date);
                        Smonth = Sdate.getMonth()+1;
                
                        start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
                             
                             
                             var RefFile  = fileRef.id;
                             
                             const html = `
                             
                             <tr class="filerow" >
                             <td>${a+1}</td>
                             <td  >${fileRef.data().Title_Grant}</td>
                             <td>${fileRef.data().Grant_Reference}</td>
                             <td>${start}</td>
                             <td>${fileRef.data().RMC_Status}</td>
                             <td colspan="2">
                                 
                                 <input type="button"  data-id1 = ${fileRef.id} data-id2 =${lect}   value="View" id ="viewbutton${+a}"  />
                                 
             
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
     
                     
     
                 });
                 
                         
             });
          };
}

//---------------------------------------List Final--------------------------------------------------------------------------//
function listFinal(){
    if (User) {

        var i = 0;
        var a =0;		
        var b = 0;	 
        var c = 0;
        FileRow3.innerHTML ="";

        var x = document.getElementById("listGrant-section");
        x.style.display = "none";
        var y = document.getElementById("progress-section");
        y.style.display = "none";
        var z = document.getElementById("final-section");
        z.style.display = "block";

             db.collection('Lecturer_ID/').get().then(function(doc) {
                 
                 
                 doc.forEach(function(fileRef){
                   var lect = fileRef.data().Lecturer_UID.toString();
                     
     
                     db.collection('FinalReport/'+'UserID/' + lect  ).get().then(function(doc) {
                        
                         
                         //console.log(lect);
                         doc.forEach(function(fileRef3){
                            Sdate = new Date(fileRef3.data().Report_Date);
                        Smonth = Sdate.getMonth()+1;
                
                        start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
                             
                             
                             var RefFile  = fileRef3.id;
                             
                             const html = `
                             
                             <tr class="filerow" >
                             <td>${c+1}</td>
                             <td  >${fileRef3.data().Title_Grant}</td>
                             <td>${fileRef3.data().Grant_Reference}</td>
                             <td>${start}</td>
                             <td>${fileRef3.data().RMC_Status}</td>
                             <td colspan="2">
                                 
                                 <input type="button"  data-id1 = ${fileRef3.id} data-id2 =${lect}   value="View" id ="viewFbutton${+c}"  />
                                 
             
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
           
           if (Cat.innerText == "Category" ){

            db.collection('Lecturer/'+ lect + '/' +'Profile/').get().then(function(doc) {
                doc.forEach(function(fileRef2){

                    var name  = fileRef2.data().Name;
			        var email = fileRef2.data().Email;
                    var number = fileRef2.data().Phone_Number;
                    var id = fileRef2.data().ID_Number;
                    var StartD = fileRef2.data().Start_Date;
                    var EndD = fileRef2.data().End_Date;
                   

                    Sdate = new Date(fileRef2.data().Start_Date);
                    Smonth = Sdate.getMonth()+1;
                    Edate  = new Date(fileRef2.data().End_Date);
                    Emonth = Edate.getMonth()+1;
                    start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
                    end = Edate.getDate() + '/'+ Emonth+ '/'+ Edate.getFullYear();
					
                    
                    if(name.includes(searchvalue)){
                            
                         const html = `
                                                    
                                            <tr class="filerow" >
                                            <td>${e+1}</td>
                                            <td  >${fileRef2.data().Name}</td>
                                            <td>${fileRef2.data().ID_Number}</td>
                                            <td>${fileRef2.data().Phone_Number}</td>
                                            <td>${fileRef2.data().Email}</td>
                                            <td>${start} to ${end}</td>

                                                    
                                             </tr>
                                                    

                                               `;
                                                        
                                             FileRow.innerHTML += html;
                                             //report progress
                                             e++;
   
                                             getreport(lect,searchvalue);
                    }else if(email.includes(searchvalue)){
                    
                    
                       
                        

                         const html = `
                                                    
                                            <tr class="filerow" >
                                            <td>${e+1}</td>
                                            <td  >${fileRef2.data().Name}</td>
                                            <td>${fileRef2.data().ID_Number}</td>
                                            <td>${fileRef2.data().Phone_Number}</td>
                                            <td>${fileRef2.data().Email}</td>
                                            <td>${start} to ${end}</td>

                                                    
                                             </tr>
                                                    

                                               `;
                                                        
                                             FileRow.innerHTML += html;
                                             //report progress
                                             e++;

                                             getreport(lect,searchvalue);

                    }else if(number.includes(searchvalue)){
                    
                    
                       
                        

                         const html = `
                                                    
                                            <tr class="filerow" >
                                            <td>${e+1}</td>
                                            <td  >${fileRef2.data().Name}</td>
                                            <td>${fileRef2.data().ID_Number}</td>
                                            <td>${fileRef2.data().Phone_Number}</td>
                                            <td>${fileRef2.data().Email}</td>
                                            <td>${start} to ${end}</td>

                                                    
                                             </tr>
                                                    

                                               `;
                                                        
                                             FileRow.innerHTML += html;
                                             //report progress
                                             e++;

                                             getreport(lect,searchvalue);

                    }else if(id.includes(searchvalue)){
                    
                    
                       
                  

                         const html = `
                                                    
                                            <tr class="filerow" >
                                            <td>${e+1}</td>
                                            <td  >${fileRef2.data().Name}</td>
                                            <td>${fileRef2.data().ID_Number}</td>
                                            <td>${fileRef2.data().Phone_Number}</td>
                                            <td>${fileRef2.data().Email}</td>
                                            <td>${start} to ${end}</td>

                                                    
                                             </tr>
                                                    

                                               `;
                                                        
                                             FileRow.innerHTML += html;
                                             //report progress
                                             e++;

                                             getreport(lect,searchvalue);

                    }else if(StartD.includes(searchvalue)|| EndD.includes(searchvalue)){
                    
                    
                       
                        

                         const html = `
                                                    
                                            <tr class="filerow" >
                                            <td>${e+1}</td>
                                            <td  >${fileRef2.data().Name}</td>
                                            <td>${fileRef2.data().ID_Number}</td>
                                            <td>${fileRef2.data().Phone_Number}</td>
                                            <td>${fileRef2.data().Email}</td>
                                            <td>${start} to ${end}</td>

                                                    
                                             </tr>
                                                    

                                               `;
                                                        
                                             FileRow.innerHTML += html;
                                             //report progress
                                             e++;

                                             getreport(lect,searchvalue);

                    };
                
                              
                });                  
            });   

            }else if (Cat.innerText != "Category"){
                    getreport(lect,searchvalue);
                    i++;
                    c++;
                };
        });
 
                
    });			
              
  });

function getreport(lect,searchvalue){


    //report progress
    FileRow2.innerHTML = "";
   
    db.collection('ReportProgress/'+'UserID/' + lect  ).get().then(function(doc) {
       
        
        doc.forEach(function(fileRefP){
            var Title = fileRefP.data().Title_Grant;
            var Reference = fileRefP.data().Grant_Reference;
            var Year1 = fileRefP.data().Report_Date;
            var Year2 = new Date(Year1).getFullYear();
            
            
            
            if (Cat.innerText == "Category" ){
                
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
                
               
            } else if (Cat.innerText == "Report Name" && Title.includes(searchvalue)){
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
                    
                    

            }else if (Cat.innerText == "Report Reference" && Reference.includes(searchvalue)){
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
                   

            }else if (Cat.innerText == "Year" && searchvalue == Year2.toString()){
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
            
            
            
            if (Cat.innerText == "Category" ){
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
            } else if (Cat.innerText == "Report Name" && Title.includes(searchvalue)){
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
             } else if (Cat.innerText == "Report Reference" && Reference.includes(searchvalue)){
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
             } else if (Cat.innerText == "Year" && searchvalue == Year2.toString()){
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

					