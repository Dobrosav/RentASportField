import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserConfirmationComponent } from './user-confirmation/user-confirmation.component';
import { AdminComponent } from './admin/admin.component';
import { RekreativacComponent } from './rekreativac/rekreativac.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';
import { PrikazSvihObjekataComponent } from './prikaz-svih-objekata/prikaz-svih-objekata.component';
import { TerminiComponent } from './termini/termini.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    LoginComponent,
    RegisterComponent,
    UserConfirmationComponent,
    AdminComponent,
    RekreativacComponent,
    VlasnikComponent,
    PrikazSvihObjekataComponent,
    TerminiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
