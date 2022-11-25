import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HomeGuard } from './home.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard]},
  { path: 'management', component: HomeComponent, canActivate: [HomeGuard]},
  { path: 'statistics', component: HomeComponent, canActivate: [HomeGuard]},
  { path: 'info', component: HomeComponent, canActivate: [HomeGuard]},
  { path: 'employees', component: HomeComponent, canActivate: [HomeGuard]},
  //Will handle all bad url requiests
  { path: '**', pathMatch: 'full', 
        component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
