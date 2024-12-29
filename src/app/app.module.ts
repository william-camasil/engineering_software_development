import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Importação do RouterModule
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
