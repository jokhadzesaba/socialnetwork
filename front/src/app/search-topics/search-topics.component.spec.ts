import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTopicsComponent } from './search-topics.component';

describe('SearchTopicsComponent', () => {
  let component: SearchTopicsComponent;
  let fixture: ComponentFixture<SearchTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTopicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
