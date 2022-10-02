import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from './chart/chart.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChartComponent } from './chart/chart.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AdditionalChartComponent } from './additional-chart/additional-chart.component';

@NgModule({
  declarations: [
    AppComponent,LoginComponent,RegisterComponent,ChartComponent, FileUploadComponent, AdditionalChartComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ChartModule,LoginModule,RegisterModule,FormsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
