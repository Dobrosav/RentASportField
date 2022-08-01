import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazPojedinogSportskogObjektaComponent } from './prikaz-pojedinog-sportskog-objekta.component';

describe('PrikazPojedinogSportskogObjektaComponent', () => {
  let component: PrikazPojedinogSportskogObjektaComponent;
  let fixture: ComponentFixture<PrikazPojedinogSportskogObjektaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazPojedinogSportskogObjektaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazPojedinogSportskogObjektaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
