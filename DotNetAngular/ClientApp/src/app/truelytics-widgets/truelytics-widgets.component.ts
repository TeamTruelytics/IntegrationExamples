import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-truelytics-widgets',
  templateUrl: './truelytics-widgets.component.html',
  styleUrls: ['./truelytics-widgets.component.css']
})
export class TruelyticsWidgetsComponent implements OnInit {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) { }

  ngOnInit(): void {
  }

}
