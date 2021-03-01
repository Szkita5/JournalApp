import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewResourceDialog } from './journal-new-resource.dialog';

describe('JournalNewResourceDialogComponent', () => {
  let component: NewResourceDialog;
  let fixture: ComponentFixture<NewResourceDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewResourceDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewResourceDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
