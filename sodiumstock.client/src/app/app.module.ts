import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MainComponent } from './main/main.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { InfoComponent } from './info/info.component';
import { ContentComponent } from './content/content.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntryDialogComponent } from './entry-dialog/entry-dialog.component';
import { CompoundComponent } from './compound/compound.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    AsideComponent,
    InventoryComponent,
    MainComponent,
    StatisticsComponent,
    InfoComponent,
    ContentComponent,
    PagenotfoundComponent,
    EmployeesComponent,
    EmployeeDialogComponent,
    EntryDialogComponent,
    CompoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
