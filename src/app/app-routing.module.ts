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
import { BlankPageComponent } from './blank-page/blank-page.component';
import { PregledComponent } from './pregled/pregled.component';
import { AuthGuard } from './auth.guard';
import { DetailsReviewComponent } from './details/details-review/details-review.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  {
    path: 'odobravanje',
    component: OdobravanjeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ucitavanje',
    component: UcitavanjeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'storniranje',
    component: StorniranjeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginFormComponent },
  { path: 'users', component: UserTableComponent, canActivate: [AuthGuard] },
  {
    path: 'user/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'storniranje',
    component: StorniranjeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'overavanje',
    component: OveravanjeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'blank', component: BlankPageComponent, canActivate: [AuthGuard] },
  { path: 'pregled', component: PregledComponent, canActivate: [AuthGuard] },
  {
    path: 'details',
    component: DetailsReviewComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
