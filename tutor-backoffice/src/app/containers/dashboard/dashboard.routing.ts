import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {DashboardGuard} from './dashboard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'camera',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    children: [
      {
        path: 'camera',
        loadChildren: () => import('./modules/camera/camera.module').then(m => m.CameraModule)
      },
      {
        path: 'record',
        loadChildren: () => import('./modules/record/record.module').then(m => m.RecordModule)
      },
      {
        path: 'violation',
        loadChildren: () => import('./modules/violation/violation.module').then(m => m.ViolationModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DashboardRouting {}
