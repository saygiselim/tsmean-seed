import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: './pages/auth-page/auth-page.module#AuthPageModule' },
  { path: 'posts', loadChildren: './pages/post-page/post-page.module#PostPageModule' },
  { path: '**', loadChildren: './pages/error-page/error-page.module#ErrorPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
