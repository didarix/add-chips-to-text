import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChipsComponent } from './add-chips.component';

describe('AddChipsComponent', () => {
  let component: AddChipsComponent;
  let fixture: ComponentFixture<AddChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
