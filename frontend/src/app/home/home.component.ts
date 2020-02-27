import { Component, OnInit } from '@angular/core';
import { ApimessageService } from '../message/apimessage/apimessage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private apimessageService : ApimessageService,
  ) { }
  ngOnInit() {
    document.getElementById('apiMessageBlock').style.display = 'none';
    this.apimessageService.clear();
  }
}
