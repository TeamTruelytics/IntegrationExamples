import { Component, OnInit, Inject, AfterViewInit, ElementRef, ViewChild, ApplicationRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TruelyticsUserDetails } from "../../models/truelytics-models";
import { Router } from "@angular/router";

declare const truelytics: any;

@Component({
  selector: 'app-truelytics-launch',
  templateUrl: './truelytics-launch.component.html',
  styleUrls: ['./truelytics-launch.component.css']
})
export class TruelyticsLaunchComponent implements OnInit {
  details: TruelyticsUserDetails;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router, private appRef: ApplicationRef) {
    http.get<TruelyticsUserDetails>(baseUrl + 'api/truelytics/user-details').subscribe(result => {
      this.details = result;
      console.debug('truelytics user details', this.details);

      if (!this.details.truelyticsApiKey || !this.details.truelyticsUserId) {
        this.router.navigate(['truelytics', 'connect'], { queryParams: { redirect: '/truelytics/launch' } });
      }
    }, error => console.error(error));
  }

  ngOnInit(): void {

  }

  launch() {
    const wnd = (window as any).open('about:blank', '_blank');

    this.http.get(this.baseUrl + 'api/truelytics/auth/token', { responseType: 'text' }).subscribe(token => {
      wnd.location.href = 'https://app.truelytics.com/user/sso?auto=true&id=' + token;
    }, error => {
      console.error('truelytics auth token error', error);
      //this.router.navigate(['truelytics', 'connect'], { queryParams: { redirect: '/truelytics/embedded' } });
    });
  }

}
