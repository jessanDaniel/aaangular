import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-additional-chart',
  templateUrl: './additional-chart.component.html',
  styleUrls: ['./additional-chart.component.css']
})
export class AdditionalChartComponent implements OnInit {

  //*chart
  user_chart:any
  future_user_date:any
  future_sales:any
  type:any;
  
 //*custom_date
  custom_date:any;
  predicted_value:any;

 //*days in a quantitative view- variables
  pred_duration=''
  select_value=''
  days=0


  constructor(private http:HttpClient ,private router:Router) {Chart.register(...registerables) }

  ngOnInit(): void {
  }

  onSelect(value:string){
    this.select_value=value;
  }


  
  lettersPresent(str:string) {
    return /[a-zA-Z]/.test(str);
  }

  getChart(){
    if(this.select_value=='' || this.select_value=='Dont'){
      alert("select duration")
    }else if(this.pred_duration=='' || this.lettersPresent(this.pred_duration)==true){
      alert("Type a number")
    }else{
      if(this.select_value=='Months'){
        this.days=+this.pred_duration
        this.days=this.days*30
      }else if(this.select_value=='Days'){
        this.days=+this.pred_duration
      }else if(this.select_value=='Weeks'){
        this.days=+this.pred_duration
        this.days=this.days*7
      }
    }
    if(this.days==0){
      alert("Cannot predict for zero "+this.select_value)
    }else if(this.days>=1){
      this.http.post("http://localhost:5000/additional_days",{'days':this.days}).subscribe((response:any)=>{
      // this.dates=JSON.parse(response.dates);
      // this.actual_sales=JSON.parse(response.actual)
      // this.predicted_sales=JSON.parse(response.predicted)
      this.future_user_date=JSON.parse(response.future_user_date)
      this.future_sales=JSON.parse(response.future_sales)
      // console.log(this.dates[0],this.actual_sales[0],this.predicted_sales, this.future_user_date[0],this.future_sales[0])

      if(this.type==null){
        alert('Select chart type')
      }
      this.user_chart=new Chart('canvas2',{
        type:this.type,
        data:{
          labels:this.future_user_date,
          datasets:[
            {
              tension:0.4,
              label:'User Prediction',
              data:this.future_sales,
              borderColor:'#ffffff',
              backgroundColor:'#ff83cd',
              fill:false,
              pointBackgroundColor:'#ff83cd'
            }
          ]
        },
        options:{
          responsive:true
        }
      })
      })
    }
  }

  onTypeSelect(value:string){
    this.type=value
  }


  get_predicted_value(){
    this.http.post('http://localhost:5000/custom_value',{'custom_date':this.custom_date}).subscribe((response:any)=>{
      this.predicted_value=JSON.parse(response.custom_value);
     
    });
  }

  goback(){
    this.router.navigateByUrl('/chart')
  }
}
