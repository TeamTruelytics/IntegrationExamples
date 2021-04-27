import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruelyticsConnectComponent } from './truelytics-connect.component';

describe('TruelyticsConnectComponent', () => {
  let component: TruelyticsConnectComponent;
  let fixture: ComponentFixture<TruelyticsConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruelyticsConnectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruelyticsConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
