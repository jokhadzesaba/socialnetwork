import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegistrateComponent } from './login-registrate.component';

describe('LoginRegistrateComponent', () => {
  let component: LoginRegistrateComponent;
  let fixture: ComponentFixture<LoginRegistrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegistrateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegistrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
