import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthInitResult, TruelyticsUserDetails } from "../../models/truelytics-models";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-truelytics-connect',
  templateUrl: './truelytics-connect.component.html',
  styleUrls: ['./truelytics-connect.component.css']
})
export class TruelyticsConnectComponent implements OnInit {
  params: Params;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router, private route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      this.params = params;

      http.get<TruelyticsUserDetails>(baseUrl + 'api/truelytics/user-details').subscribe(result => {
        console.debug('truelytics user details', result);

        if (result.truelyticsApiKey && result.truelyticsUserId) {
          if (this.params["redirect"])
            this.router.navigateByUrl(this.params["redirect"]);
          else
            this.router.navigate(['truelytics', 'peer-benchmarks']);
        }
      }, error => console.error(error));
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    const redirect = this.baseUrl + 'truelytics/connect?redirect=' + encodeURIComponent(this.params["redirect"] || '');

    this.http.get<AuthInitResult>(this.baseUrl + 'api/truelytics/auth/init?redirect=' + encodeURIComponent(redirect)).subscribe(result => {
      console.debug('truelytics auth init', result);

      window.location.href = result.loginUrl;
    }, error => console.error(error));
  }

  register(): void {
    const redirect = this.baseUrl + 'truelytics/connect?redirect=' + encodeURIComponent(this.params["redirect"] || '');

    this.http.get<AuthInitResult>(this.baseUrl + 'api/truelytics/auth/init?redirect=' + encodeURIComponent(redirect)).subscribe(result => {
      console.debug('truelytics auth init', result);

      window.location.href = result.registerUrl;
    }, error => console.error(error));
  }

}
