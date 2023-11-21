	
	
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
const FileRow3 = document.querySelector('.filerow3');
const FileRow4 = document.querySelector('.filerow4');
const FileRow5 = document.querySelector('.filerow5');
const FileRow6 = document.querySelector('.filerow6');
const FileRow7 = document.querySelector('.filerow7');
const modal2display = document.querySelector('.modal2display');

var j = document.getElementById("journal-section");
var f = document.getElementById("finance-section");
var p = document.getElementById("proceeding-section");
var c = document.getElementById("copyright-section");
var cn = document.getElementById("conference-section");
var i = document.getElementById("innovation-section");
const header = document.getElementById('header');

window.onload = function () {
    var j = document.getElementById("journal-section");
var f = document.getElementById("finance-section");
var p = document.getElementById("proceeding-section");
var c = document.getElementById("copyright-section");
var cn = document.getElementById("conference-section");
var i = document.getElementById("innovation-section");

        j.style.display = "none";
        f.style.display = "none";
        p.style.display = "none";
        c.style.display = "none";
        cn.style.display = "none";
        i.style.display = "none";

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

     if (record == "finance"){
        listFinance();
     }
     if(record == "journal"){
        listJournal();
     }else if (record == "copyright"){
        listCopyright();
     
     }else if (record == "conference"){
        listConference();
 
     }else if (record == "innovation"){
        listInnovation();
     }else if (record == "proceeding"){
        listProceeding();
         
     }
              

		
			
					
	
	 };
};

function listJournal(){
    FileRow2.innerHTML ="";

        var j = document.getElementById("journal-section");
        var f = document.getElementById("finance-section");
        var p = document.getElementById("proceeding-section");
        var c = document.getElementById("copyright-section");
        var cn = document.getElementById("conference-section");
        var i = document.getElementById("innovation-section");
        j.style.display = "block";
        f.style.display = "none";
        p.style.display = "none";
        c.style.display = "none";
        cn.style.display = "none";
        i.style.display = "none";
        



        console.log(userID);
        i =0;

        db.collection('Journal/'+'UserID/'+ userID).orderBy('Journal_Date', "desc").get().then(function(doc) {
			
			doc.forEach(function(fileRef){

                Sdate = new Date(fileRef.data().Journal_Date);
                Smonth = Sdate.getMonth()+1;
              
                start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
          
				
				
				var RefFile  = fileRef.id;
				const html = `
                
				<tr class="filerow2" >
				<td>${i+1}</td>
				<td>${fileRef.data().Article_Title}</td>
				<td  ><a href = "${fileRef.data().Link} "target="_blank" rel="noopener noreferrer" >${fileRef.data().Journal_Name}</td>
				<td>${fileRef.data().Author}</td>
				<td style="white-space:pre ;">${fileRef.data().Co_Author}</td>
				<td>${fileRef.data().Index}</td>
				<td>${fileRef.data().Status}</td>
				<td>${start}</td>
				
			    </tr>
				

					`;
					
				    FileRow2.innerHTML += html;

					
					i++;
			});
           


           
                            
        });

}

function listFinance(){
    FileRow3.innerHTML ="";

    var j = document.getElementById("journal-section");
    var f = document.getElementById("finance-section");
    var p = document.getElementById("proceeding-section");
    var c = document.getElementById("copyright-section");
    var cn = document.getElementById("conference-section");
    var i = document.getElementById("innovation-section");
    j.style.display = "none";
    f.style.display = "block";
    p.style.display = "none";
    c.style.display = "none";
    cn.style.display = "none";
    i.style.display = "none";

        console.log(userID);
        i =0;

        if (User) {
				 
            db.collection('Financial/'+'UserID/' + userID ).orderBy('Financial_Date').get().then(function(doc) {
                    var FDebit = 0.00;
                  var FCredit = 0.00;	
                  var FBalance = 0;
                doc.forEach(function(fileRef){
                    
                  
                    var RefFile  = fileRef.id;
                    var Entry  = fileRef.data().Financial_Entries;
                
                    Sdate = new Date(fileRef.data().Financial_Date);
                    Smonth = Sdate.getMonth()+1;
                
                    start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
            
                    
                    if (Entry == "DEBIT") {
    
                        FDebit = fileRef.data().Financial_Amount;
    
                        FBalance = parseFloat(FBalance) + parseFloat(FDebit);
                            
    
                       const html = `
                           
                           <tr class="filerow3" >
                           <td>${start}</td>
                           <td  ><a href = "${fileRef.data().File_Link}" >${fileRef.data().Financial_Activity}</td>
                           <td>${parseFloat(fileRef.data().Financial_Amount).toFixed(2)}</td>
                           <td></td>
                           <td>${FBalance.toFixed(2)}</td>
                         
                           </tr>
                           
    
                               `;
                       
                       FileRow3.innerHTML += html;
                        
    
                    }else{
    
                        FCredit = fileRef.data().Financial_Amount;
    
                        FBalance = parseFloat(FBalance)  - parseFloat(FCredit);
    
    
                       const html = `
                           
                           <tr class="filerow" >
                           <td>${start}</td>
                           <td  ><a href = "${fileRef.data().File_Link}" >${fileRef.data().Financial_Activity}</td>
                           <td></td>
                           <td>${parseFloat(fileRef.data().Financial_Amount).toFixed(2)}</td>
                           <td>${FBalance.toFixed(2)}</td>
                          
                           </tr>
                           
    
                               `;
                       
                       FileRow3.innerHTML += html;
    
                    };
    
                    
                        
                        i++;
                });
                
                        
            });
         };

}

function listConference(){
    FileRow4.innerHTML ="";

    var j = document.getElementById("journal-section");
    var f = document.getElementById("finance-section");
    var p = document.getElementById("proceeding-section");
    var c = document.getElementById("copyright-section");
    var cn = document.getElementById("conference-section");
    var i = document.getElementById("innovation-section");
    j.style.display = "none";
    f.style.display = "none";
    p.style.display = "none";
    c.style.display = "none";
    cn.style.display = "block";
    i.style.display = "none";

        console.log(userID);
        i =0;

        if (User) {
				 
            db.collection('Conference/'+'UserID/' + userID ).orderBy('Conference_Date', "desc").get().then(function(doc) {
			
                doc.forEach(function(fileRef){

                    Sdate = new Date(fileRef.data().Conference_Date);
                    Smonth = Sdate.getMonth()+1;
                
                    start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
                    
                    console.log("fileId : " + userID);
                    //console.log("fileId : " + fileRef.id);
                    var RefFile  = fileRef.id;
                    const html = `
                    
                    <tr class="filerow" >
                    <td>${i+1}</td>
                    <td  ><a href = "${fileRef.data().File_Link}" >${fileRef.data().Conference_Name}</td>
                    <td>${fileRef.data().Conference_Location}</td>
                    <td>${start}</td>
                    
                    </tr>
                    
    
                        `;
                        
                        FileRow4.innerHTML += html;
    
                        
                        i++;
                });
                
                        
            });
         };

}

function listInnovation(){
    FileRow5.innerHTML ="";

    var j = document.getElementById("journal-section");
    var f = document.getElementById("finance-section");
    var p = document.getElementById("proceeding-section");
    var c = document.getElementById("copyright-section");
    var cn = document.getElementById("conference-section");
    var i = document.getElementById("innovation-section");
    j.style.display = "none";
    f.style.display = "none";
    p.style.display = "none";
    c.style.display = "none";
    cn.style.display = "none";
    i.style.display = "block";

        console.log(userID);
        i =0;

        if (User) {
				 
            db.collection('Innovation/'+'UserID/' + userID ).orderBy('Innovation_Date', "desc").get().then(function(doc) {
			
                doc.forEach(function(fileRef){

                    Sdate = new Date(fileRef.data().Innovation_Date);
                    Smonth = Sdate.getMonth()+1;
                
                    start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
                    
                    //console.log("fileId : " + fileRef.data().Innovation_Name);
                    //console.log("fileId : " + fileRef.id);
                    var RefFile  = fileRef.id;
                    const html = `
                    
                    <tr class="filerow" >
                    <td>${i+1}</td>
                    <td  ><a href = "${fileRef.data().File_Link}" >${fileRef.data().Innovation_Name}</td>
                    <td>${fileRef.data().Innovation_Exhibition}</td>
                    <td>${fileRef.data().Innovation_Award}</td>
                    <td>${fileRef.data().Innovation_Location}</td>
                    <td>${start}</td>
                    <td>${fileRef.data().Innovation_Status}</td>
                    
                    </tr>
                    
    
                        `;
                        
                        FileRow5.innerHTML += html;
    
                        
                        i++;
                });
                
            });
         };

}

function listCopyright(){
    FileRow6.innerHTML ="";

   var j = document.getElementById("journal-section");
    var f = document.getElementById("finance-section");
    var p = document.getElementById("proceeding-section");
    var c = document.getElementById("copyright-section");
    var cn = document.getElementById("conference-section");
    var i = document.getElementById("innovation-section");
    j.style.display = "none";
    f.style.display = "none";
    p.style.display = "none";
    c.style.display = "block";
    cn.style.display = "none";
    i.style.display = "none";

        console.log(userID);
        i =0;

        if (User) {
				 
            db.collection('Copyright/'+'UserID/' + userID).orderBy('Copyright_Date', "desc").get().then(function(doc) {
			
                doc.forEach(function(fileRef){
                    
                    Sdate = new Date(fileRef.data().Copyright_Date);
                    Smonth = Sdate.getMonth()+1;
                
                    start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();

                    //console.log("fileId : " + fileRef.data().Intelectual_Name);
                    //console.log("fileId : " + fileRef.id);
                    var RefFile  = fileRef.id;
                    const html = `
                    
                    <tr class="filerow" >
                    <td>${i+1}</td>
                    <td  ><a href = "${fileRef.data().File_Link}" >${fileRef.data().Copyright_Title}</td>
                    <td>${fileRef.data().Copyright_Reg}</td>
                    <td>${start}</td>
                   
                    </tr>
                    
    
                        `;
                        
                        FileRow6.innerHTML += html;
    
                        
                        i++;
                });
                
                       
            });
         };

}

function listProceeding(){
    FileRow7.innerHTML ="";

    var j = document.getElementById("journal-section");
    var f = document.getElementById("finance-section");
    var p = document.getElementById("proceeding-section");
    var c = document.getElementById("copyright-section");
    var cn = document.getElementById("conference-section");
    var i = document.getElementById("innovation-section");
    j.style.display = "none";
    f.style.display = "none";
    p.style.display = "block";
    c.style.display = "none";
    cn.style.display = "none";
    i.style.display = "none";

        console.log(userID);
        i =0;

        if (User) {
				 
            db.collection('Proceeding/'+'UserID/' + userID ).orderBy('Proceeding_Date', "desc").get().then(function(doc) {
			
                doc.forEach(function(fileRef){

                    Sdate = new Date(fileRef.data().Proceeding_Date);
                    Smonth = Sdate.getMonth()+1;
                
                    start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();
                    
                    //console.log("fileId : " + fileRef.data().Proceeding_Name);
                    //console.log("fileId : " + fileRef.id);
                    var RefFile  = fileRef.id;
                    const html = `
                    
                    <tr class="filerow" >
                    <td>${i+1}</td>
                    <td style = "word-wrap: break-word;"><a href = "${fileRef.data().File_Link}" >${fileRef.data().Proceeding_Name}</td>
                    <td>${fileRef.data().Author}</td>
                    <td style="white-space:pre ;">${fileRef.data().Co_Author}</td>
                    <td>${fileRef.data().Conference_Name}</td>
                    <td>${fileRef.data().Proceeding_Location}</td>
                    <td>${start}</td>
                    <td>${fileRef.data().Proceeding_Journal}</td>
                   
                    </tr>
                    
    
                        `;
                        
                        FileRow7.innerHTML += html;
    
                        
                        i++;
                });
                
                        
            });
         };

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

					