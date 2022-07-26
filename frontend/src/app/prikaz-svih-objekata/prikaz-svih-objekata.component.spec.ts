import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazSvihObjekataComponent } from './prikaz-svih-objekata.component';

describe('PrikazSvihObjekataComponent', () => {
  let component: PrikazSvihObjekataComponent;
  let fixture: ComponentFixture<PrikazSvihObjekataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazSvihObjekataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazSvihObjekataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
