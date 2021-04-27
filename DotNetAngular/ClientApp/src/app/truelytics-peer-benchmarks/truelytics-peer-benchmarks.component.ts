import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-truelytics-peer-benchmarks',
  templateUrl: './truelytics-peer-benchmarks.component.html',
  styleUrls: ['./truelytics-peer-benchmarks.component.css']
})
export class TruelyticsPeerBenchmarksComponent implements OnInit {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) { }

  ngOnInit(): void {
  }

}
