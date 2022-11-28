import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () => import('./components/sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: 'goodbye',
    loadChildren: () => import('./components/remove-account/remove-account.module').then((m) => m.RemoveAccountModule),
  },
  {
    path: 'error',
    loadChildren: () => import('./components/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: 'callback',
    loadChildren: () => import('./components/callback/callback.module').then((m) => m.CallbackModule),
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
