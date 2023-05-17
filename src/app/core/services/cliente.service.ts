import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string = ' http://localhost:3000/clientes';
  


  constructor(
    private http: HttpClient
  ) { }

  setCliente(cliente: Cliente): Observable<Cliente> {
     return this.http.post<Cliente>(this.url, cliente);
  }

  getClientes(limit?: number, page?:number,sort?:string, order?: string) : Observable<Cliente> {
    
    if(!limit) limit=5;
    if(!page) page=1;
    if(!sort) sort='nome';
    if(!order) order='asc';


  
    return this.http.get<Cliente>(`${this.url}?&_limit=${limit}&_page=${page}&_sort=${sort}&_order=${order}`);
  }

  getClientePorId(id: number) : Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  deleteCliente(id: number | undefined) : Observable<Cliente> { 
    if(id !== undefined) {
      return this.http.delete<Cliente>(`${this.url}/${id}`);
    } else {
      return throwError('ID do cliente não fornecido');
    }
    
  }

  updateCliente(cliente: Cliente) : Observable<Cliente> {
    const url = `${this.url}/${cliente.id}`;
    return this.http.put<Cliente>(url, cliente);
  }

 
  
}
