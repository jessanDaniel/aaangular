import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionalChartComponent } from './additional-chart/additional-chart.component';
import { ChartComponent } from './chart/chart.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [{path:'',component:WelcomeComponent},
                        {path:'login',component:LoginComponent},
                        {path:'register',component:RegisterComponent},
                        {path:'chart',component:ChartComponent},
                        {path:'additional',component:AdditionalChartComponent},
                        {path:'**',component:ErrorComponent}                                        
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
