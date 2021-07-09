import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.interface';


const base_url = environment.base_url; 

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {
  
  constructor(private http: HttpClient) { }

  get token(){
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{
      'x-token': this.token
      }
    }
  }

  private transformarUsuarios(resultado: any[]): Usuario[]{

    return resultado.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    )
  }

  private transformarHospitales(resultado: any[]): Hospital[]{

    return resultado;
  }

  private transformarMedicos(resultado: any[]): Medico[]{

    return resultado;
  }
  busquedaGlobal(termino: string){
    const url = `${base_url}/todo/${termino}`;
    return this.http.get(url, this.headers);
  }

  

  buscar(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino: string
  ){
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
                .pipe(
                  map( (resp: any) => {
                    switch (tipo) {
                      case 'usuarios':
                        return this.transformarUsuarios(resp.data);
                      case 'hospitales': 
                        return this.transformarHospitales(resp.data);
                      case 'medicos':
                        return this.transformarMedicos(resp.data);
                      default:
                        return [];
                    }
                  })
                )
    
  }


}
