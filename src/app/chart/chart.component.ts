import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart,registerables } from 'chart.js';
import { map } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  title = 'fileApp';
  file:any;
  filename:any;
  fileform:any;
  extension:string=''
  file_message:string='';
  message_visibility:boolean=true;
  //*response message
  message:string="";
  
  //*user dates
  fromdate:any;
  todate:any;

  //*chart

  chart:any;
  actual_sales:any
  predicted_sales:any
  dates:any
  //*user ip vars
  user_chart:any
  future_user_date:any
  future_sales:any

 

  


  //* stat variables
  accuracy:any;
  rmse:any;
  mape:any;

  div_fromtodate=true;
  div_getchart=true;
  
  
  


  constructor(private http:HttpClient,private router:Router){Chart.register(...registerables)}
  ngOnInit(): void {
  }
 
  onFileSubmit(event:any){
    //this.catcher=event;
    try{
      this.file=event.target.files[0];
      console.log(event);
      if(this.file){
        this.filename=this.file.name;
        this.extension=this.filename.split('.')[1]
        if(this.extension=='csv'){
          this.fileform=new FormData();
          this.fileform.append('file',this.file);
        }else{
          this.file_message='Kindly choose a valid(csv) file';
          this.message_visibility=false;
          setTimeout(()=>{
            this.message_visibility=true;
          },1550)
        }
      }
      
    }
    catch(error){
      console.log('upload a file')
    }

  }

  onUpload(){
    this.div_fromtodate=false;
    if(this.file && this.extension=='csv'){
      let url='http://localhost:5000/file_upload';
    this.http.post(url,this.fileform).subscribe((response:any)=>{
      
      console.log(response.response);
      this.message=response.response;
      if(this.message==""){
        this.div_fromtodate=false;
      }

      
    });
    
    }else{
      this.file_message='You failed to select a valid csv file';
      this.message_visibility=false;
      setTimeout(()=>{
        this.message_visibility=true;
      },1550)
    }
  }

  delete(){
    this.file=null;
    this.filename=null;
    this.fileform=null;
  }
  
  


  generate_chart(){
    let url='http://localhost:5000/user_input';
    this.http.post(url,{'from':this.fromdate,'to':this.todate}).subscribe((response:any)=>{
      this.dates=JSON.parse(response.dates);
      this.actual_sales=JSON.parse(response.actual)
      this.predicted_sales=JSON.parse(response.predicted)
      this.future_user_date=JSON.parse(response.future_user_date)
      this.future_sales=JSON.parse(response.future_sales)

      this.chart=new Chart('canvas',{
        type:'line',
        data:{
          labels:this.dates,
          datasets:[
            {
              label:'Actual Sales',
              data:this.actual_sales,
              borderColor:'#000000',
              fill:false,
              pointBackgroundColor:'#00ffff'
            },
            {
              label:'Predicted Sales',
              data:this.predicted_sales,
              borderColor:'#ff0000',
              fill:false,
              pointBackgroundColor:'#ff00ff'
            }
          ]
        }
      })
      this.user_chart=new Chart('canvas1',{
        type:'line',
        data:{
          labels:this.future_user_date,
          datasets:[
            {
              label:'User Prediction',
              data:this.future_sales,
              borderColor:'#9a6aff',
              fill:false
            }
          ]
        }
      })
    })
    this.div_getchart=false;
  }

  

  //* statistics
  getStats(){
  this.http.get('http://localhost:5000/accuracy_and_error').subscribe((response:any)=>{
    
      this.rmse=response.rmse;
      this.rmse=this.rmse
      this.accuracy=response.accuracy;
      this.mape=response.MAPE ;

    
  }) 
  }

  navigate(){
    this.router.navigateByUrl('/additional');
  }

 
  

}
