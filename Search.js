	
	
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

		db.settings({timestampsInSnapshots : true})
		
        var album;
		const dropzone = document.querySelector('#dropzone');
		var User;
		var Folder;
		var storageRef;						
		var uploadtask ;
		var title1 ="";
		var ConfLocation = "";
		var ConfDate = "";
		var html;
		var file;
		const btnfolder = document.querySelector('.wrapper');
        const search = document.getElementById("searchbtn");
		const FileRow = document.querySelector('.filerow');
        const FileReminder = document.querySelector('.title');
       

		

		function List(){
			var i=0;   
			var a =0;		
			var b = 0;	 
			var c = 0;
			db.collection('Lecturer_ID/').get().then(function(doc) {
            
            
				doc.forEach(function(fileRef){
				  var lect = fileRef.data().Lecturer_UID.toString();
					
	
			
				
	
					db.collection('FinalReport/'+'UserID/' + lect  ).get().then(function(doc) {
						
					   // console.log(lect);
						doc.forEach(function(fileRef2){
							
			
							const html = `
							
							<tr class="filerow" >
							<td>${i+1}</td>
							<td width="100px">${fileRef2.data().Title_Grant}</td>
							<td>${fileRef2.data().Grant_Reference}</td>
							<td>${fileRef2.data().Principal_Name}</td>
							<td>${fileRef2.data().Start_Date} to ${fileRef2.data().End_Date}</td>

									
							 </tr>
									
							
			
								`;
								
								FileRow.innerHTML += html;

								i++;
			
					
						});
					  
					});
	
				});
				
						
			});
		 };

	
		
        
//---------------------------------------Search Account--------------------------------------------------------------------------//
// Get the input field


search.addEventListener('click', function(e) {
    e.preventDefault();
	FileRow.innerHTML = "";
	let SearchResults = [];


    const searchvalue = document.getElementById("search").value.toUpperCase();
    
    db.collection('Lecturer_ID/').get().then(function(doc) {
         var i=0;   
		 var NoResult = 0;
		 
            
        doc.forEach(function(fileRef){
            var lect = fileRef.data().Lecturer_UID.toString();
           
		
		

            db.collection('FinalReport/'+'UserID/' + lect).get().then(function(doc2) {

                doc2.forEach(function(fileRef2){

					SearchResults.push(fileRef2.data());
			
                        

							var name  = fileRef2.data().Principal_Name;
							var title = fileRef2.data().Title_Grant;
							var refer = fileRef2.data().Grant_Reference;
							if(name.includes(searchvalue)){
								const html = `
                                                        
								<tr class="filerow" >
								<td>${i+1}</td>
								<td width="100px">${fileRef2.data().Title_Grant}</td>
								<td>${fileRef2.data().Grant_Reference}</td>
								<td>${fileRef2.data().Principal_Name}</td>
								<td>${fileRef2.data().Start_Date} to ${fileRef2.data().End_Date}</td>

										
								 </tr>
										

								   `;
											
								 FileRow.innerHTML += html;
								 //report progress
								 i++;

							}else if(title.includes(searchvalue)){
								const html = `
                                                        
								<tr class="filerow" >
								<td>${i+1}</td>
								<td width="100px">${fileRef2.data().Title_Grant}</td>
								<td>${fileRef2.data().Grant_Reference}</td>
								<td>${fileRef2.data().Principal_Name}</td>
								<td>${fileRef2.data().Start_Date} to ${fileRef2.data().End_Date}</td>

										
								 </tr>
										

								   `;
											
								 FileRow.innerHTML += html;
								 //report progress
								 i++;

							}else if(refer.includes(searchvalue)){
								const html = `
                                                        
								<tr class="filerow" >
								<td>${i+1}</td>
								<td width="100px">${fileRef2.data().Title_Grant}</td>
								<td>${fileRef2.data().Grant_Reference}</td>
								<td>${fileRef2.data().Principal_Name}</td>
								<td>${fileRef2.data().Start_Date} to ${fileRef2.data().End_Date}</td>

										
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
		
			  

    });
	



function filterList(ListResult) {
	ListResult.Principal_Name.toLowerCase().includes(searchvalue.toLowerCase()) 
  }

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
			<tr class="filerow" >
			<td>${i+1}</td>
			<td  >${character.Title_Grant}</td>
			<td>${character.Grant_Reference}</td>
			<td>${character.Principal_Name}</td>
			<td>${character.Start_Date} to ${character.End_Date}</td>

				   
			</tr>
        `;
        })
        .join('');
    FileRow.innerHTML += htmlString;
};
