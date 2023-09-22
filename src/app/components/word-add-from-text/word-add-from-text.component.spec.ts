import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordAddFromTextComponent } from './word-add-from-text.component';

describe('WordAddFromTextComponent', () => {
  let component: WordAddFromTextComponent;
  let fixture: ComponentFixture<WordAddFromTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordAddFromTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordAddFromTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
