import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }


  // tslint:disable-next-line:typedef
  getPaises() {

    /* Con return */
    /* return this.http.get('https://restcountries.eu/rest/v2/lang/es')
                .pipe(
                  map( (resp: any[]) => {
                    return resp.map( pais => {
                      return {
                        nombre: pais.name,
                        codigo: pais.alpha3Code
                      };
                    });
                  })
                ); */


    /* Sin return */
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
    .pipe(
      map( (resp: any[]) =>
        resp.map( pais => ({ nombre: pais.name, codigo: pais.alpha3Code }) )
      )
    );

  }

}
