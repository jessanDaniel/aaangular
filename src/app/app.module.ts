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

import { AdditionalChartComponent } from './additional-chart/additional-chart.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,LoginComponent,RegisterComponent,ChartComponent, AdditionalChartComponent, ErrorComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ChartModule,LoginModule,RegisterModule,FormsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
