	
	
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
        var User;

      

var reportID = sessionStorage.getItem("FinalReportID");
var userID = sessionStorage.getItem("userIDF");
var LogOut = document.getElementById("LogOut");

       // Get the button that opens the modal
       var approvebtn = document.getElementById("approve");

window.onload = function () {
const repPdf = document.querySelector('.row');
auth.onAuthStateChanged(user => {
	if (user) {
   // console.log(user.uid);
   // console.log(reportID);
		
			
	 db.collection('FinalReport/'+'UserID/' + userID ).doc(reportID).get().then(function(doc) {
            Sdate = new Date(doc.data().Start_Date);
            Smonth = Sdate.getMonth()+1;

            start = Sdate.getDate() + '/'+ Smonth+ '/'+ Sdate.getFullYear();

            Edate = new Date(doc.data().End_Date);
            Emonth = Edate.getMonth()+1;

            end = Edate.getDate() + '/'+ Emonth+ '/'+ Edate.getFullYear();

            xdate = new Date(doc.data().Extension_Date);
            xmonth = xdate.getMonth()+1;

            ext = xdate.getDate() + '/'+ xmonth+ '/'+ xdate.getFullYear();

            date = new Date(doc.data().Report_Date);
            rmonth = date.getMonth()+1;

            rdate = date.getDate() + '/'+ rmonth+ '/'+ date.getFullYear();

            rmcdate = new Date(doc.data().RMC_AppDate);
            rmcmonth = rmcdate.getMonth()+1;

            RMCdate = rmcdate.getDate() + '/'+ rmcmonth+ '/'+ rmcdate.getFullYear();

            cdate = new Date(doc.data().RMC_AppDate);
            cmonth = cdate.getMonth()+1;

            comp = rmcdate.getDate() + '/'+ cmonth+ '/'+ cdate.getFullYear();
			
                        const html = `
                            
                            
                        <div class="row">
                  
                    
                        
                        <div class="col-md-12"id="invoice"style="padding-top:30px; ">
                          
                            <div class="card" >
                              <div class=" bg-transparent header-elements-inline">
                                <div> <img style="height: 60px; padding-left: 35px;" src="data:image/png;base64,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" style="width:160px; "></div>
                                <h6 style="padding: 10px; text-align: center; font-size: 16px;" class="card-title ">LAPORAN AKHIR PENYELIDIKAN DALAMAN URG / 
                                GERAN SEPADAN URG INTERNAL RESEARCH / MATCHING GRANT FINAL REPORT
                                    </h6>
                                    
                            </div>
                            
                            <div class="card-header bg-transparent ">
                               
                                <h6 style=" font-size: 16px;" class="card-title ">PANDUAN / GUIDELINE: </h6>
                                   <h6 style=" font-size: 12px;" >
                                    1.	Laporan kemajuan perlu dihantar pada setiap Jun dan Disember, dan apabila membuat.tuntutan perbelanjaan penyelidikan.
                                    Progress report must be submitted every June and December, and when claim research expense.
                                    </h6>
                                    <h6 style=" font-size: 12px;" >
                                    2.	Bagi tujuan tuntutan, PI perlu melampirkan borang BHEA.TT.12.RMC.01-01 bersama laporan kemajuan.
                                    For the purpose of claim, PI must attach BHEA.TT.12.RMC.01-01 form together with the progress report.
                                    </h6>
                                    
                            </div>
                            <div class="card-header " style="background-color:#bbb; padding: .4rem 1rem;">
                               
                                <h6 style=" font-size: 16px;" class="card-title ">A. MAKLUMAT PROJEK / PROJECT INFORMATION </h6>
                                  
                            </div>
            
                            <div class="card-header bg-transparent  header-elements-inline " >
                               
                                <h6 style=" font-size: 13px;" class="card-title ">Tajuk Projek / Project Title</h6>
                                
                                <div style="right: 10px; border-left: 1px solid rgba(0,0,0,.125);" class=" col-md-8 bg-transparent  header-elements-inline " >
                               
                                    <h6 style=" font-size: 13px;" class="card-title ">${doc.data().Title_Grant}</h6>
                                      
                                </div>
                                
                               </div>
                            <div class="card-header bg-transparent  header-elements-inline " >
                               
                                <h6 style=" font-size: 13px;" class="card-title ">Rujukan Geran / Grant Reference</h6>
                                
                                <div style="right: 10px; border-left: 1px solid rgba(0,0,0,.125);" class=" col-md-8 bg-transparent  header-elements-inline " >
                               
                                    <h6 style=" font-size: 13px;" class="card-title ">${doc.data().Grant_Reference}</h6>
                                      
                                </div>
                                
                            </div>
                            
                            <div class="card-header bg-transparent  header-elements-inline " >
                               
                                <h6 style=" font-size: 13px;" class="card-title ">Tempoh Projek (Bulan) / Project Duration (Month)</h6>
                                
                                <div style="right: 10px; border-left: 1px solid rgba(0,0,0,.125);" class=" col-md-8 bg-transparent  header-elements-inline " >
                               
                                    <h6 style=" font-size: 13px;" class="card-title ">${doc.data().Duration}</h6>
                                      
                                </div>
                                
                            </div>
            
                            <div class="card-header bg-transparent  header-elements-inline " >
                               
                                <h6 style=" font-size: 13px;" class="card-title ">Jumlah Geran diluluskan (RM) / Approved Grant (RM)</h6>
                                
                                <div style="right: 10px; border-left: 1px solid rgba(0,0,0,.125);" class=" col-md-8 bg-transparent  header-elements-inline " >
                               
                                    <h6 style=" font-size: 13px;" class="card-title ">RM ${parseFloat(doc.data().Total_Input).toFixed(2)}</h6>
                                      
                                </div>
                                
                            </div>
            
                            <div class="card-header bg-transparent  header-elements-inline " >
                               
                                <h6 style=" font-size: 13px;" class="card-title ">Tarikh Mula & Tamat </br> Start & End Date</h6>
                               
                                
                                <div style="right: 10px; border-left: 1px solid rgba(0,0,0,.125);" class=" col-md-8 bg-transparent  header-elements-inline " >
                               
                                    <h6 style=" font-size: 13px;" class="card-title ">${start + " to "+ end}</h6>
                                      
                                </div>
                                
                            </div>
                            <div class="card-header bg-transparent  header-elements-inline " >
                               
                                <h6 style=" font-size: 13px;" class="card-title ">Tarikh Lanjutan diluluskan </br>Approved Extension Date</h6>
                                
                                <div style="right: 10px; border-left: 1px solid rgba(0,0,0,.125);" class=" col-md-8 bg-transparent  header-elements-inline " >
                               
                                    <h6 style=" font-size: 13px;" class="card-title ">${ext}</h6>
                                      
                                </div>
                                
                            </div>

                            <div class="card-header bg-transparent  header-elements-inline " >
                               
                                <h6 style=" font-size: 13px;" class="card-title ">Tarikh Selesai </br>Completion Date</h6>
                                
                                <div style="right: 10px; border-left: 1px solid rgba(0,0,0,.125);" class=" col-md-8 bg-transparent  header-elements-inline " >
                               
                                    <h6 style=" font-size: 13px;" class="card-title ">${comp}</h6>
                                      
                                </div>
                                
                            </div>
            
                            <div class="card-header bg-transparent  header-elements-inline " >
                               
                                <h6 style=" font-size: 13px;" class="card-title ">Status Projek / Project Status</h6>
                                
                                <div style="right: 10px; border-left: 1px solid rgba(0,0,0,.125);" class=" col-md-8 bg-transparent  header-elements-inline " >
                               
                                    <h6 style=" font-size: 13px;" class="card-title ">${doc.data().Status}</h6>
                                      
                                </div>
                                
                            </div>
                            <div class="card-header bg-transparent  header-elements-inline " >
                               
                                <h6 style=" font-size: 13px;" class="card-title ">Bilangan Penghantaran Laporan / Number of Report Submission </h6>
                                
                                <div style="right: 10px; border-left: 1px solid rgba(0,0,0,.125);" class=" col-md-8 bg-transparent  header-elements-inline " >
                               
                                    <h6 style=" font-size: 13px;" class="card-title ">${doc.data().Number_Report}</h6>
                                      
                                </div>
                                
                            </div>
                            </div> <div class="html2pdf__page-break"  ></div>  <p><br>
                            <div class="card">

            
                            <div class="card-header bg-transparent  header-elements-inline " >
                               
                                <h6 style=" font-size: 13px;" class="card-title ">Nama Ketua Penyelidik & Nombor Kakitangan / Name of Principal Investigator & Staff ID </h6>
                                
                                <div style="right: 10px; border-left: 1px solid rgba(0,0,0,.125);" class=" col-md-8 bg-transparent  header-elements-inline " >
                               
                                <h6 style=" font-size:13px;" class="card-title ">${doc.data().Principal_Name}</h6>
                                <h6 style=" font-size:13px;" class="card-title ">${doc.data().Principal_ID}</h6>

                                </div>
                                
                            </div>
            
                            <div class="card-header bg-transparent  header-elements-inline " >
                               
                                <h6 style=" font-size: 13px;" class="card-title ">Ahli Projek / Project Members</h6>
                                
                                <div style="right: 10px; border-left: 1px solid rgba(0,0,0,.125);" class=" col-md-8 bg-transparent  header-elements-inline " >
                                    
                                    <h6 style=" font-size: 13px;" class="card-title ">${doc.data().Project_Member}</h6>
                                      
                                </div>
                                
                            </div>
                            </div> <div class="html2pdf__page-break"  ></div>
                            <p><br>
                            <div class="card">
            
                           
            
                              <div class="card-header " style="background-color:#bbb; padding: .4rem 1rem;">
                               
                                <h6 style=" font-size: 16px;" class="card-title ">B. LAPORAN AKHIR / FINAL REPORT </h6>
                                  
                            </div>
            
                            <div class="card-header bg-transparent " >
                               
                              <h6 style=" font-size: 13px;" class="card-title ">1.	Nyatakan penemuan penyelidikan: </br>State the research findings:</h6>
                              
                              <div >
                                  
                                    <h6 style=" font-size: 13px;" >${doc.data().Research} </h6>
                                      
                              </div>
                              
                           </div>
            
                               
                            <div class="card-header bg-transparent " >
                               
                              <h6 style=" font-size: 13px;" class="card-title ">2.	Senaraikan hasil dan sumbangan penyelidikan (cth: artikel jurnal, artikel persidangan, harta intelek) - sila lampirkan bukti: </br>List down the output / deliverables, and contributions of research (e.g. journal article, conference article, intellectual property) - please attach evidences:</h6>
                              
                              <div >
                                  
                                    <h6 style=" font-size: 13px;" >${doc.data().Deliverables}</h6>
                                      
                              </div>
                              
                            </div>
            
                            <div class="card-header bg-transparent " >
                               
                              <h6 style=" font-size: 13px;" class="card-title ">3.	Terangkan pengurusan risiko penyelidikan: Senaraikan faktor yang dikenalpasti mengganggu penyelidikan (jika ada) dan cara-cara mengatasinya.</br>Describe the research risk management: List factors that affect the progress of research (if any) and course of actions to overcome them.</h6>
                              
                              <div >
                                  
                                    <h6 style=" font-size: 13px;" >${doc.data().RiskManagement}</h6>
                                      
                              </div>
                              
                             </div>
            
                             <div class="card-header bg-transparent " >
                               
                              <h6 style=" font-size: 13px;" class="card-title ">4.	Cadangkan hala tuju / penambahbaikan bagi penyelidikan tersebut:</br>Recommend the future direction of the research: </h6>
                              
                              <div >
                                  
                                    <h6 style=" font-size: 13px;" >${doc.data().Future}</h6>
                                      
                              </div>
                              
                             </div>
            
                             <div class="card-header bg-transparent  header-elements-inline " >
                                            
                              <h6 style=" font-size: 13px;" class="card-title ">5.	Secara keseluruhan, adakah hasil dan sumbangan penyelidikan adalah seperti yang disyorkan?  </br> Overall, are the output and contributions of the research as recommended? </br></br>  Jika tidak, kenapa? </br>  If no, why?</h6>
            
                              <div style="left: 15px; min-height:150px; height: auto; border-left: 1px solid rgba(0,0,0,.125);" class=" col-md-8 bg-transparent  header-elements-inline " >
                                  
                                  <div class="mb-4 pull-right">
            
                                      <ul class="list list-unstyled mb-0 text-left">
                                          <li><input type="checkbox"  checked  onclick="return false;" onkeydown="e = e || window.event; if(e.keyCode !== 9) return false;"> &nbsp;${doc.data().Recommend}</br>${doc.data().Reason}</li>
                                          
                                      </ul>
                                  </div>
                                      
                              </div>
                              
                          </div>
                          </div>

                          <div class="html2pdf__page-break"  ></div>
                          <p><br>
                          <div class="card">
            
                                <div class="card-header " style="background-color:#bbb; padding: .4rem 1rem;">
                               
                                  <h6 style=" font-size: 16px;" class="card-title ">C.  LAPORAN KEWANGAN / FINANCIAL REPORT</h6>
                                  <h6 style=" font-size: 12px;" class="card-title ">Lampirkan dokumen sokongan yang berkaitan. Sila nyatakan dokumen yang pernah dihantar bersama laporan kemajuan terdahulu.</br>
                                    Attach the original relevant documents. Please state the documents that were given together with the previous progress reports)
                                    </h6>
                                </div>
            
            
                                <div  class="card-header bg-transparent  header-elements-inline "  >
                                  
                                  <div style="right: 10px; " class=" col-md-13 bg-transparent  header-elements-inline " >
                                      
                                    <table style="  border: 1px solid rgba(0,0,0,.125);" class="table table-lg">
                                          <tr>
                                              <td  style ="width :3000px;">
                                                  <h6 style="  font-size: 16px;" class="mb-0"><b>Skop Pembiayaan / Scope of Funding</b></h6> 
                                              </td>
            
                                              <td style="text-align: center; border-left: 1px solid #dee2e6; width :3000px;"><b>Peruntukan / Allocation (RM)</b> </td>
                                              <td style="text-align: center; border-left: 1px solid #dee2e6;width :3000px;"><b>Amaun Perbelanjaan / Amount Spent (RM)</b></td>
                                            
                                          </tr>
            
                                          <tr>
                                            <td>
                                              <h6 style="  font-size: 13px;" class="mb-0">Persidangan, pameran/pertandingan inovasi dan latihan </br> Conferences, innovation exhibition/competition, and training </h6> 
                                          </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding1Allocation).toFixed(2)} </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding1Spent).toFixed(2)} </td>
                                            
                                          </tr>
                                          <tr>
                                            <td>
                                              <h6 style="  font-size: 13px;" class="mb-0">Perjalanan, pengangkutan dan penginapan (termasuk insuran jika perlu) </br> Travelling, transportation, and accommodation (including insurance if relevant) </h6> 
                                          </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding2Allocation).toFixed(2)} </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding2Spent).toFixed(2)} </td>
            
                                          </tr>
            
                                          <tr>
                                            <td>
                                              <h6 style="font-size: 13px;  " class="mb-0">Bahan-bahan penyelidikan, perisian dan buku </br> Research materials, software, and books</h6> 
                                          </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding3Allocation).toFixed(2)} </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding3Spent).toFixed(2)} </td>
                                          </tr>
            
                                          <tr>
                                            <td>
                                              <h6 style="font-size: 13px;  " class="mb-0">Penyelenggaraan dan perkhidmatan pembaikan kecil </br> Maintenance, and minor repair services  </h6> 
                                          </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding4Allocation).toFixed(2)} </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding4Spent).toFixed(2)} </td>
                                          </tr>
            
                                          <tr>
                                            <td>
                                              <h6 style="font-size: 13px;  " class="mb-0">Perkhidmatan dan penerbitan</br>Services and publications</h6> 
                                          </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding5Allocation).toFixed(2)} </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding5Spent).toFixed(2)} </td>
                                          </tr>
            
                                          <tr>
                                            <td>
                                              <h6 style="font-size: 13px;  " class="mb-0">Peralatan dan aksesori khas</br>Special equipment and accessories</h6> 
                                          </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding6Allocation).toFixed(2)} </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding6Spent).toFixed(2)} </td>
                                          </tr>
                                          </table>
                                          </div>
                                          </div>
                                          </div>

                                          <div class="html2pdf__page-break"  ></div> <p><br>
                                          
                                          <div class="card">
                                          
                                <div  class="card-header bg-transparent  header-elements-inline "  >
                                  
                                <div style="right: 10px; " class=" col-md-13 bg-transparent  header-elements-inline " >
                                    
                                  <table style=" border: 1px solid rgba(0,0,0,.125);" class="table table-lg">

             
                                     <tr>
                                              <td  style ="width :3500px;">
                                                  <h6 style="  font-size: 16px;" class="mb-0"><b>Skop Pembiayaan / Scope of Funding</b></h6> 
                                              </td>
            
                                              <td style="text-align: center; border-left: 1px solid #dee2e6; width :3000px;"><b>Peruntukan / Allocation (RM)</b> </td>
                                              <td style="text-align: center; border-left: 1px solid #dee2e6;width :3000px;"><b>Amaun Perbelanjaan / Amount Spent (RM)</b></td>
                                            
                                          </tr>
                                          <tr>
                                            <td>
                                              <h6 style="font-size: 13px;  " class="mb-0">Sewa </br>Rentals</h6> 
                                          </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding7Allocation).toFixed(2)} </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding7Spent).toFixed(2)} </td>
                                          </tr>
            
                                          
                                          <tr>
                                            <td>
                                              <h6 style="font-size: 13px;  " class="mb-0">Lain-lain </br>Others</h6> 
                                          </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding8Allocation).toFixed(2)} </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().Funding8Spent).toFixed(2)} </td>
                                          </tr>
            
                                          <tr style=" width :425px;">
                                            <td>
                                             <h6 style="font-size: 13px; text-align: right; left: 15px;" class="mb-0">Jumlah </br>  Total</h6> 
                                            </td>
                                            <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().FundingAllocation).toFixed(2)} </td>
                                          <td style="border-left: 1px solid #dee2e6;">RM ${parseFloat(doc.data().FundingSpent).toFixed(2)} </td>
                                          </tr>
            
                                          <tr style=" width :425px;"  >
                                            <td>
                                             <h6 style="font-size: 13px; text-align: right; left: 15px;" class="mb-0">Jumlah diterima </br> Total received </h6> 
                                            </td>
                                            <td style="border-left: 1px solid #dee2e6;border-right: 1px solid #dee2e6; text-align: center;" colspan="2" >RM ${parseFloat(doc.data().TotalReceived).toFixed(2)} </td>
                                           

                                          
                                          </tr>
            
                                          <tr style=" width :425px;">
                                            <td>
                                             <h6 style="font-size: 13px; text-align: right; left: 15px;" class="mb-0">Amaun yang perlu dipulangkan </br> Returned amount</h6> 
                                            </td>
                                            <td style="border-left: 1px solid #dee2e6;border-right: 1px solid #dee2e6; text-align: center;" colspan="2" >RM ${parseFloat(doc.data().TotalReturn).toFixed(2)} </td>

                                          </tr>
            
                                          <tr style=" width :425px;">
                                            <td>
                                             <h6 style="font-size: 13px; text-align: right; left: 15px;" class="mb-0">Peratusan Perbelanjaan</br>  Percentage Spent</h6> 
                                            </td>
                                            <td style="border-left: 1px solid #dee2e6;border-right: 1px solid #dee2e6; text-align: center;" colspan="2" >${parseFloat(doc.data().PercentageSpent).toFixed(2)} %</td>

                                          </tr>
            
            
                                      </tbody>
                                  </table>
                                        
                                  </div>
                                  
                                </div>
            
                                    
                            </div>
                            <div class="html2pdf__page-break"  ></div>  <p><br>
                            
                                <div  style="background-color:rgb(255, 255, 255); padding: .4rem 1rem;">
                               
                                  <h6 style=" font-size: 16px;" class="card-title ">AKUAN KETUA PENYELIDIK / DECLARATION OF THE PRINCIPAL INVESTIGATOR</h6>
                                    
                                </div>
              
                               
                                   <h6 style=" font-size: 13px; padding: .4rem 1rem;" class="card-title ">
                                    Saya mengaku bahawa semua maklumat yang diberikan di atas adalah betul dan benar.</br>I declare that all information given above is correct and true.
            
                                    </h6><br>
                                    <h6 style=" font-size: 13px; padding: .4rem 1rem;"class="card-title " >
                                      Tandatangan & Cop Rasmi	:
                                      <br>
                                      Signature & Official Stamp of Principal Investigator :
                                      <br>  <br>  <br>
                                      <div> <img style="height: 100px;" src=" ${(doc.data().SignURL)}"></div> <br>
                                      <div> <img style="height: 100px;" src=" ${(doc.data().StampURL)}"></div>

                                      </h6><br><br>
                                    <h6 style=" font-size: 13px; padding: .4rem 1rem;"class="card-title " >
                                      Tarikh	: ${(rdate)}
                                     
                                      
                                      </h6>
                                      <h6 style=" font-size: 13px; padding: .4rem 1rem;" class="card-title " >
                                        Date : ${(rdate)}
                                        </h6>
                                    
                           
            
                            
            
                               
                           
            
                            <div class="html2pdf__page-break"></div>  <p><br>
            
                            <div  class=" card-headerr  bg-transparent " style="padding: 15px;"  >
                               
                              <h6 style="border: none;" class="card-title ">NOTA RMC / NOTE BY RMC  </h6><br>
                              <h6 style=" font-size: 13px; text-decoration-line: underline;padding: 10px;" >${(doc.data().RMC_Note)}<br><br>
                                  <h6 style=" font-size: 15px;" >
                                    Tandatangan & Cop Rasmi RMC	:
                              
                                    
                                  </h6>
                                  <h6 style=" font-size: 15px;" >
                                    Signature & Official Stamp of RMC :
                                    <br><br>
                                    <div> <img style="height: 100px;" src=" ${(doc.data().RMCSignURL)}"></div><br>
                                    <div> <img style="height: 100px;" src=" ${(doc.data().RMCStampURL)}"></div>
                                
                                    </h6><br><br>
                                  <h6 style=" font-size: 15px;" >
                                    Tarikh	: ${(RMCdate)}
                                   
                                    
                                    </h6>
                                    <h6 style=" font-size: 15px;" >
                                      Date :${(RMCdate)}
                                      </h6>
                                  
                          </div>
            
                              
                        </div>

                        <div class="col-md-12 text-right mb-3">
                        <button class="btn btn-primary" id="download"> Download PDF</button>
                       
                      
                        <button class="btn btn-primary" id="approve"> Approve Document</button>
                        </div>
                    </div>
                                                                                                
                                                                                    
                            
                                                                                            `;
                                                repPdf.innerHTML = html;


                            
                           

                            document.getElementById("download")
                                .addEventListener("click", () => {
                                    const report = this.document.getElementById("invoice");
                                   // console.log(report);
                                  //  console.log(window);
                                    
                                   
                                         
                                    var gen = {
                                        margin:       10,
                                        filename:     'Final Report.pdf',
                                        image:        { type: 'jpeg', quality: 0.98 },
                                        html2canvas:  { scale: 2, logging: true, dpi: 192, letterRendering: true },
                                        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
                                        
                                        
                                        
                                         
                                    };

                                    html2pdf().from(report).set(gen).toPdf().get('pdf').then(function (pdf) {
                                        var totalPages = pdf.internal.getNumberOfPages();
                                      
                                        for (i = 1; i <= totalPages; i++) {
                                          pdf.setPage(i);
                                          pdf.setFontSize(10);
                                          pdf.setTextColor(150);
                                          pdf.text('BHEASB.TT.11.RMC.03-01' + i , pdf.internal.pageSize.getWidth() - 60, pdf.internal.pageSize.getHeight() - 285);

                                          pdf.text('' + i , pdf.internal.pageSize.getWidth() - 105, pdf.internal.pageSize.getHeight() - 10);
                                          pdf.text('Effective Date : 1 Disember 2020'  , pdf.internal.pageSize.getWidth() - 67, pdf.internal.pageSize.getHeight() - 5);
                                        } 
                                      }).save();
                                      

                                    

                                  
                                 
                                    
                                });

                                document.getElementById("approve")
                                .addEventListener("click", () => {
                                    window.location.href = "rmcApprovalFinal.html"



                                });
    
          });

	}else{
		console.log('user logged out');
	}
});



    
  
        
       
    }




   


//---------------------------------------Auth state Changed--------------------------------------------------------------------------//
auth.onAuthStateChanged(user => {
	if (user) {
		
		User = user;	
	

	}else{
		console.log('user logged out');
	}
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