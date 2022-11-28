import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '@core/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'modcheck',
    loadChildren: () => import('@core/components/app-main/app-main.module').then((m) => m.AppMainModule),
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('@features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: 'modcheck',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
