import { Component, OnInit, Inject, AfterViewInit, ElementRef, ViewChild, ApplicationRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TruelyticsUserDetails } from "../../models/truelytics-models";
import { Router } from "@angular/router";

declare const truelytics: any;

@Component({
  selector: 'app-truelytics-embedded',
  templateUrl: './truelytics-embedded.component.html',
  styleUrls: ['./truelytics-embedded.component.css']
})
export class TruelyticsEmbeddedComponent implements OnInit {
  details: TruelyticsUserDetails;
  @ViewChild('integration') integration: ElementRef;
  public loading = false;
  public url: string;
  public title: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router, private appRef: ApplicationRef) {
    http.get<TruelyticsUserDetails>(baseUrl + 'api/truelytics/user-details').subscribe(result => {
      this.details = result;
      console.debug('truelytics user details', this.details);

      if (!this.details.truelyticsApiKey || !this.details.truelyticsUserId) {
        this.router.navigate(['truelytics', 'connect'], { queryParams: { redirect: '/truelytics/embedded' } });
      }
    }, error => console.error(error));
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loading = true;

    this.http.get(this.baseUrl + 'api/truelytics/auth/token', { responseType: 'text' }).subscribe(token => {
      truelytics.xd.consumer.login(token, results => {
        console.log('login success?', results, this.integration.nativeElement);

        if (results.success) {
          const frame = truelytics.xd.consumer.addFrame('/', this.integration.nativeElement);

          truelytics.xd.consumer.addFrameEventListener(frame, 'pageLoad', ev => {
            this.loading = false;
            this.url = ev.detail.url;
            this.title = (ev.detail.title || '').replace(' | Truelytics', '');

            //console.debug('frame listener pageLoad', this.loading, this.url, this.title);
            this.appRef.tick();
          });

          truelytics.xd.consumer.addFrameEventListener(frame, 'pageUnload', ev => {
            this.loading = true;
            //console.debug('frame listener pageUnload', this.loading, this.url, this.title);
            this.appRef.tick();
          });
        }
        else {
          console.error('unable to use sso token', results);
        }
      });
    }, error => {
      console.error('truelytics auth token error', error);
      //this.router.navigate(['truelytics', 'connect'], { queryParams: { redirect: '/truelytics/embedded' } });
    });
  }
}
