import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherListViewComponent } from './other-list-view.component';

describe('OtherListViewComponent', () => {
  let component: OtherListViewComponent;
  let fixture: ComponentFixture<OtherListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
