import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-truelytics-connect',
  templateUrl: './truelytics-connect.component.html',
  styleUrls: ['./truelytics-connect.component.css']
})
export class TruelyticsConnectComponent implements OnInit {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) { }

  ngOnInit(): void {
  }

}
