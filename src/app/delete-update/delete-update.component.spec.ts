import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUpdateComponent } from './delete-update.component';

describe('DeleteUpdateComponent', () => {
  let component: DeleteUpdateComponent;
  let fixture: ComponentFixture<DeleteUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
