import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDialog } from './journal-new-resource.dialog';

describe('JournalNewResourceDialogComponent', () => {
  let component: ResourceDialog;
  let fixture: ComponentFixture<ResourceDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
