import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from '@core/components/app-main/app-main/app-main.component';
import { IsAuthenticatedGuard } from '../../guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('@features/home/home.module').then((m) => m.HomeModule),
        canActivate: [IsAuthenticatedGuard],
      },
      {
        path: 'chat',
        loadChildren: () => import('@features/chat/chat.module').then((m) => m.ChatModule),
        canActivate: [IsAuthenticatedGuard],
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppMainRoutingModule {}
