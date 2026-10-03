import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import {
  Codepen,
  Download,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Menu,
  Send,
  Twitter,
  X,
} from 'angular-feather/icons';

const icons = {
  Github,
  Twitter,
  Linkedin,
  Menu,
  X,
  Codepen,
  Download,
  FileText,
  Send,
  ExternalLink,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class FeatherIconsModule {}
