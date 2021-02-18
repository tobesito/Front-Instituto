import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Planilla } from 'src/app/Models/planilla.model';
import { PlanillasService } from 'src/app/Services/planillas.service';

@Component({
  selector: 'app-planillas-detalle',
  templateUrl: './planillas-detalle.component.html',
  styleUrls: ['./planillas-detalle.component.scss']
})
export class PlanillasDetalleComponent implements OnInit {

  loading = true;
  tomarAsistencia: boolean = true;
  planilla: Planilla;

  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private planillasService: PlanillasService) { }

  ngOnInit(): void {
    const planilla_id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    this.obtenerPlanilla(planilla_id);
  }

  obtenerPlanilla(planilla_id): void {
    this.planillasService.getPlanilla(planilla_id).subscribe(data => {
      this.planilla = data;
      this.loading = false;
    })
  }

}
