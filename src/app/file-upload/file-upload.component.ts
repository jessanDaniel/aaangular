import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  file:any;
  filename:any;
  fileform:any;
  //*response message
  message:string="";
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
  onFileSubmit(event:any){
    //this.catcher=event;
    try{
      this.file=event.target.files[0];
      console.log(event);
      if(this.file){
        this.filename=this.file.name;
        this.fileform=new FormData();
        this.fileform.append('file',this.file);
      }
      
    }
    catch(error){
      console.log('upload a file')
    }

  }

  onUpload(){
    if(this.file){
      let url='http://localhost:5000/file_upload';
    this.http.post(url,this.fileform).subscribe((response:any)=>{
      
      console.log(response.response);
      this.message=response.response
      
    });
    
    }
  }

  delete(){
    this.file=null;
    this.filename=null;
    this.fileform=null;
  }

  getchart(){
    this.router.navigateByUrl("/chart");
  }


}

