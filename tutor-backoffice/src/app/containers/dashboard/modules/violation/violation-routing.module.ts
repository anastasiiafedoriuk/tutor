import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViolationComponent} from './violation.component';

const routes: Routes = [{
  path: '',
  component: ViolationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViolationRoutingModule { }
