import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrikazPojedinogSportskogObjektaComponent } from './prikaz-pojedinog-sportskog-objekta/prikaz-pojedinog-sportskog-objekta.component';
import { PrikazSvihObjekataComponent } from './prikaz-svih-objekata/prikaz-svih-objekata.component';
import { RegisterComponent } from './register/register.component';
import { RekreativacComponent } from './rekreativac/rekreativac.component';
import { TerminiComponent } from './termini/termini.component';
import { UserConfirmationComponent } from './user-confirmation/user-confirmation.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';

const routes: Routes = [
  {path:"", component:PocetnaComponent},
  {path:"login", component:LoginComponent},
  {path:"rekreativac/prikaz",component:PrikazPojedinogSportskogObjektaComponent},
  {path:"rekreativac/changePassword", component:ChangePasswordComponent},
  {path:"register", component:RegisterComponent},
  {path:"admin", component:AdminComponent},
  {path:"admin/userConfirmzation", component:UserConfirmationComponent},
  {path:"rekreativac", component:RekreativacComponent},
  {path:"vlasnik", component:VlasnikComponent},
  {path:"vlasnik/termini", component:PrikazSvihObjekataComponent},
  {path:"vlasnik/changePassword", component: ChangePasswordComponent},
  {path:"vlasnik/termini/datumi", component:TerminiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
