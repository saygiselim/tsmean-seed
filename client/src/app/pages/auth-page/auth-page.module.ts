import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPageRoutingModule } from './auth-page-routing.module';
import { AuthPageComponent } from './auth-page.component';
import { SignInPageComponent } from './pages/signin-page/signin-page.component';
import { SignUpPageComponent } from './pages/signup-page/signup-page.component';

@NgModule({
    declarations: [AuthPageComponent, SignInPageComponent, SignUpPageComponent],
    imports: [CommonModule, AuthPageRoutingModule],
    exports: [AuthPageRoutingModule]
})
export class AuthPageModule { }
