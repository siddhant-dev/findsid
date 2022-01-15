import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {

  constructor(private app: AppService) { }

  apps!: Card[];

  ngOnInit(): void {
    this.app.getApps().subscribe(data => {
      this.apps = data;
    });
  }

}
