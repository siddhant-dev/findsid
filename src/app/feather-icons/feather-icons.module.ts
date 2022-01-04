import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Github,Twitter,Linkedin, Menu, X } from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  Github,
  Twitter,
  Linkedin,
  Menu,
  X,
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class FeatherIconsModule { }