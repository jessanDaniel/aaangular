import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionalChartComponent } from './additional-chart/additional-chart.component';
import { ChartComponent } from './chart/chart.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [{path:'',component:WelcomeComponent},
                        {path:'login',component:LoginComponent},
                        {path:'register',component:RegisterComponent},
                        {path:'chart',component:ChartComponent},
                        {path:'fileUpload',component:FileUploadComponent},
                        {path:'additional',component:AdditionalChartComponent}                                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
