import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UcitavanjeComponent } from './ucitavanje/ucitavanje.component';
import { StorniranjeComponent } from './storniranje/storniranje.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UserTableComponent } from './user-table/user-table.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserDetailsComponent } from './user-details/user-details.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { TokenService } from './services/token.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PaginationUsersComponent } from './pagination-users/pagination-users.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    UcitavanjeComponent,
    StorniranjeComponent,
    LoginFormComponent,
    NavigationComponent,
    UserTableComponent,
    EditUserComponent,
    UserDetailsComponent,
    PaginationUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzTableModule,
    NzDividerModule,
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzButtonModule,
    NzPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US },
    TokenService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
