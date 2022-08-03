import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http'

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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PrikazPojedinogSportskogObjektaComponent } from './prikaz-pojedinog-sportskog-objekta/prikaz-pojedinog-sportskog-objekta.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
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
    TerminiComponent,
    PrikazPojedinogSportskogObjektaComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http:HttpClient): TranslateHttpLoader{
  return new TranslateHttpLoader(http);
}