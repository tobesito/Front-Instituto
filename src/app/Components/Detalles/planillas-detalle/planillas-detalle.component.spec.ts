import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillasDetalleComponent } from './planillas-detalle.component';

describe('PlanillasDetalleComponent', () => {
  let component: PlanillasDetalleComponent;
  let fixture: ComponentFixture<PlanillasDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanillasDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
