import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { UcitavanjeComponent } from './ucitavanje/ucitavanje.component';
import { StorniranjeComponent } from './storniranje/storniranje.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { OdobravanjeComponent } from './odobravanje/odobravanje.component';
import { OveravanjeComponent } from './overavanje/overavanje.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'odobravanje', component: OdobravanjeComponent },
  { path: 'ucitavanje', component: UcitavanjeComponent },
  { path: 'storniranje', component: StorniranjeComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'users', component: UserTableComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'storniranje', component: StorniranjeComponent },
  { path: 'overavanje', component: OveravanjeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
