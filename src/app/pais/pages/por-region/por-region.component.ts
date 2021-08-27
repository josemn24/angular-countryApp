import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
    button {
      margin-right: 5px;
    }
    `
  ]
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];

  regionActiva: string = '';

  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  getClaseCSS( region: string ): string {
    return (this.regionActiva === region) ? 'btn btn-primary': 'btn btn-outline-primary';
  }

  activarRegion(region: string) {

    if(region === this.regionActiva) { return; }
    this.paises = [];
    this.regionActiva = region;
    
    this.paisService.buscarRegion(this.regionActiva)
        .subscribe(paisesResp => {
          this.paises = paisesResp;
        }, (err) => {
          this.paises = [];
        });

  }

}
