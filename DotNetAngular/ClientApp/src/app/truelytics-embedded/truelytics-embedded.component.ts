import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-truelytics-embedded',
  templateUrl: './truelytics-embedded.component.html',
  styleUrls: ['./truelytics-embedded.component.css']
})
export class TruelyticsEmbeddedComponent implements OnInit {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) { }

  ngOnInit(): void {
  }

}
