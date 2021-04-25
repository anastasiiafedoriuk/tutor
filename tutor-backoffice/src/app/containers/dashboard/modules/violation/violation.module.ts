import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViolationRoutingModule } from './violation-routing.module';
import { ViolationComponent } from './violation.component';
import {ViolationService} from './violation.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [ViolationComponent],
  imports: [
    CommonModule,
    ViolationRoutingModule,
    MatTableModule,
    MatButtonModule
  ],
  providers: [ViolationService]
})
export class ViolationModule { }
