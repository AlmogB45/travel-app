import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDocumentsComponent } from './trip-documents.component';

describe('TripDocumentsComponent', () => {
  let component: TripDocumentsComponent;
  let fixture: ComponentFixture<TripDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
