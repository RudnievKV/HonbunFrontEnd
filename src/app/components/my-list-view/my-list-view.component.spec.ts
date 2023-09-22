import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListViewComponent } from './my-list-view.component';

describe('MyListViewComponent', () => {
  let component: MyListViewComponent;
  let fixture: ComponentFixture<MyListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
