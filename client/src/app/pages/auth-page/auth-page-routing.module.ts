import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPageComponent } from './auth-page.component';
import { SignInPageComponent } from './pages/signin-page/signin-page.component';
import { SignUpPageComponent } from './pages/signup-page/signup-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    {
        path: '', component: AuthPageComponent, children: [
            { path: 'signin', component: SignInPageComponent },
            { path: 'signup', component: SignUpPageComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthPageRoutingModule { }
