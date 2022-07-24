import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RekreativacComponent } from './rekreativac.component';

describe('RekreativacComponent', () => {
  let component: RekreativacComponent;
  let fixture: ComponentFixture<RekreativacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RekreativacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RekreativacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
