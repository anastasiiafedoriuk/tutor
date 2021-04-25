import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {DashboardRouting} from './dashboard.routing';
import {RouterModule} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DashboardGuard} from './dashboard.guard';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRouting,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [DashboardGuard]
})
export class DashboardModule { }
