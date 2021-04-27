import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruelyticsEmbeddedComponent } from './truelytics-embedded.component';

describe('TruelyticsEmbeddedComponent', () => {
  let component: TruelyticsEmbeddedComponent;
  let fixture: ComponentFixture<TruelyticsEmbeddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruelyticsEmbeddedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruelyticsEmbeddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
