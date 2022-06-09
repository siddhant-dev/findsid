import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeModuleRoutingModule } from './resume-module-routing.module';
import { ResumeComponent } from './resume/resume.component';
import { FeatherIconsModule } from '../feather-icons/feather-icons.module';


@NgModule({
  declarations: [
    ResumeComponent
  ],
  imports: [
    CommonModule,
    ResumeModuleRoutingModule,
    FeatherIconsModule

  ]
})
export class ResumeModuleModule { }
