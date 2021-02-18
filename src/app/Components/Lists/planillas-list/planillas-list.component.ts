import { Component, OnInit } from '@angular/core';
import { Planilla } from 'src/app/Models/planilla.model';
import { PlanillasService } from 'src/app/Services/planillas.service';

@Component({
  selector: 'app-planillas-list',
  templateUrl: './planillas-list.component.html',
  styleUrls: ['./planillas-list.component.scss']
})
export class PlanillasListComponent implements OnInit {

  loading = true;
  planillas: Planilla[];

  constructor(private planillasService: PlanillasService) { }

  ngOnInit(): void {
    this.obtenerPlanillas();
  }

  obtenerPlanillas(): void {
    this.planillasService.getAllPlanillas().subscribe(data => {
      this.planillas = data;
      this.loading = false;
    })
  }

  delete(planilla: Planilla) {
    if (window.confirm('Está seguro que desea eliminar a: ' + planilla.planilla_id + '?')) {
      this.planillasService.deletePlanilla(planilla.planilla_id).subscribe(data => {
        this.obtenerPlanillas();
      });
    }
  }

}
