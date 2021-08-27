import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];
  mostrarSugerencias :boolean = false;

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    
    this.paisService.buscarCapital(this.termino)
        .subscribe(paisesResp => {
          this.paises = paisesResp;
        }, (err) => {
          this.hayError = true;
          this.paises = [];
        });

  }

  sugerencias( termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    
    this.paisService.buscarCapital(termino)
      .subscribe( paises => this.paisesSugeridos = paises.splice(0,5),
                  (err) => this.paisesSugeridos = []
      );

  }

  buscarSugerido( termino: string ) {
    this.buscar( termino );

  }

}
