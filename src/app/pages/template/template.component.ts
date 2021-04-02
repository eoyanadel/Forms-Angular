import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';



@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Esteban',
    apellido: 'Oyanadel',
    correo: 'eoyanadel@gmail.com',
    pais: 'CHL',
    genero: 'M'
  };

  paises: any[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {

    this.paisService.getPaises()
        .subscribe(paises => {

          this.paises = paises;

          /* Ingresar opciòn por defecto al inicio del arreglo */
          this.paises.unshift({ nombre: '[Seleccione país]', codigo: '' });

          /* console.log(this.paises); */

        });
  }


  guardar(forma: NgForm): void {
    console.log(forma.value);

    if (forma.invalid) {

      Object.values(forma.controls).forEach(control => {
        control.markAllAsTouched();
      });

      return;
    }
  }

}
