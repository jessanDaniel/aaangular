import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { map } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  title = 'fileApp';
  
  
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

  //*custom_date
  custom_date:any;
  predicted_value:any;

  


  //* stat variables
  accuracy:any;
  rmse:any;
  mape:any;
  
  


  constructor(private http:HttpClient){Chart.register(...registerables)}
  ngOnInit(): void {
  }
  catcher:any;
  
  


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
              borderColor:'#3cba9f',
              fill:false
            },
            {
              label:'Predicted Sales',
              data:this.predicted_sales,
              borderColor:'#ffcc00',
              fill:false
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
              borderColor:'#ffcc00',
              fill:false
            }
          ]
        }
      })
    })
  }

  get_predicted_value(){
    this.http.post('http://localhost:5000/custom_value',{'custom_date':this.custom_date}).subscribe((response:any)=>{
      this.predicted_value=JSON.parse(response.custom_value)
    });
  }

  //* statistics
  getStats(){
  this.http.get('http://localhost:5000/accuracy_and_error').subscribe((response:any)=>{
    
      this.rmse=response.rmse;
      this.accuracy=response.accuracy;
      this.mape=response.MAPE ;

    
  }) 
  }



  

}
