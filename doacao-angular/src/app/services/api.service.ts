import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Peca } from '../models/peca.model';
import { environment } from '../../environments/environment';

export interface FiltroParams {
  cor?: string; sexo?: string; tamanho?: string; qualidade?: string; marca?: string; peca?: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private buildParams(filtros?: FiltroParams): HttpParams {
    let params = new HttpParams();
    if (!filtros) return params;
    Object.entries(filtros).forEach(([k, v]) => { if (v) params = params.set(k, v); });
    return params;
  }

  getCamisas(f?: FiltroParams): Observable<Peca[]>    { return this.http.get<Peca[]>(`${this.base}/pecas-camisas`,   { params: this.buildParams(f) }); }
  getCalcas(f?: FiltroParams): Observable<Peca[]>     { return this.http.get<Peca[]>(`${this.base}/pecas-calcas`,    { params: this.buildParams(f) }); }
  getSapatos(f?: FiltroParams): Observable<Peca[]>    { return this.http.get<Peca[]>(`${this.base}/pecas-sapatos`,   { params: this.buildParams(f) }); }
  getAgasalhos(f?: FiltroParams): Observable<Peca[]>  { return this.http.get<Peca[]>(`${this.base}/pecas-agasalhos`, { params: this.buildParams(f) }); }
  getTudo(f?: FiltroParams): Observable<Peca[]>       { return this.http.get<Peca[]>(`${this.base}/pecas-tudo`,      { params: this.buildParams(f) }); }

  getCamisaById(id: number): Observable<Peca>    { return this.http.get<Peca>(`${this.base}/pecas-camisas/${id}`); }
  getCalcaById(id: number): Observable<Peca>     { return this.http.get<Peca>(`${this.base}/pecas-calcas/${id}`); }
  getSapatoById(id: number): Observable<Peca>    { return this.http.get<Peca>(`${this.base}/pecas-sapatos/${id}`); }
  getAgasalhoById(id: number): Observable<Peca>  { return this.http.get<Peca>(`${this.base}/pecas-agasalhos/${id}`); }

  criarCamisa(d: any): Observable<any>    { return this.http.post(`${this.base}/pecas-camisas`, d); }
  criarCalca(d: any): Observable<any>     { return this.http.post(`${this.base}/pecas-calcas`, d); }
  criarSapato(d: any): Observable<any>    { return this.http.post(`${this.base}/pecas-sapatos`, d); }
  criarAgasalho(d: any): Observable<any>  { return this.http.post(`${this.base}/pecas-agasalhos`, d); }

  deletarCamisa(id: number): Observable<any>    { return this.http.delete(`${this.base}/pecas-camisas/${id}`); }
  deletarCalca(id: number): Observable<any>     { return this.http.delete(`${this.base}/pecas-calcas/${id}`); }
  deletarSapato(id: number): Observable<any>    { return this.http.delete(`${this.base}/pecas-sapatos/${id}`); }
  deletarAgasalho(id: number): Observable<any>  { return this.http.delete(`${this.base}/pecas-agasalhos/${id}`); }
}
