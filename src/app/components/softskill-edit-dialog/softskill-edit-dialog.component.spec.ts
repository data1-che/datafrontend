import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftskillEditDialogComponent } from './softskill-edit-dialog.component';

describe('SoftskillEditDialogComponent', () => {
  let component: SoftskillEditDialogComponent;
  let fixture: ComponentFixture<SoftskillEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoftskillEditDialogComponent]
    });
    fixture = TestBed.createComponent(SoftskillEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
