import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashlikeComponent } from './dashlike.component';

describe('DashlikeComponent', () => {
  let component: DashlikeComponent;
  let fixture: ComponentFixture<DashlikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashlikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashlikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
