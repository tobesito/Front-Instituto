import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresDetalleComponent } from './profesores-detalle.component';

describe('ProfesoresDetalleComponent', () => {
  let component: ProfesoresDetalleComponent;
  let fixture: ComponentFixture<ProfesoresDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesoresDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesoresDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
