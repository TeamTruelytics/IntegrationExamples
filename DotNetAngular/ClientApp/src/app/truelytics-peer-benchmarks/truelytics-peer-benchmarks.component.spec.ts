import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruelyticsPeerBenchmarksComponent } from './truelytics-peer-benchmarks.component';

describe('TruelyticsPeerBenchmarksComponent', () => {
  let component: TruelyticsPeerBenchmarksComponent;
  let fixture: ComponentFixture<TruelyticsPeerBenchmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruelyticsPeerBenchmarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruelyticsPeerBenchmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
