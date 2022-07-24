import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { RegisterComponent } from './register/register.component';
import { RekreativacComponent } from './rekreativac/rekreativac.component';
import { UserConfirmationComponent } from './user-confirmation/user-confirmation.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';

const routes: Routes = [
  {path:"", component:PocetnaComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"admin", component:AdminComponent},
  {path:"admin/userConfirmzation", component:UserConfirmationComponent},
  {path:"rekreativac", component:RekreativacComponent},
  {path:"vlasnik", component:VlasnikComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
