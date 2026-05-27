import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Peca } from '../models/peca.model';

export interface CarrinhoItem extends Peca { categoria: string; }

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private _carrinho = new BehaviorSubject<CarrinhoItem[]>([]);
  private _salvos   = new BehaviorSubject<CarrinhoItem[]>([]);

  carrinho$ = this._carrinho.asObservable();
  salvos$   = this._salvos.asObservable();

  get carrinho() { return this._carrinho.value; }
  get salvos()   { return this._salvos.value; }

  adicionarCarrinho(peca: Peca, categoria: string): void {
    if (!this.estaNoCarrinho(peca.id, categoria))
      this._carrinho.next([...this.carrinho, { ...peca, categoria }]);
  }

  removerCarrinho(id: number | undefined, categoria: string): void {
    this._carrinho.next(this.carrinho.filter(i => !(i.id === id && i.categoria === categoria)));
  }

  estaNoCarrinho(id: number | undefined, categoria: string): boolean {
    return this.carrinho.some(i => i.id === id && i.categoria === categoria);
  }

  toggleSalvo(peca: Peca, categoria: string): void {
    if (this.estaSalvo(peca.id, categoria))
      this._salvos.next(this.salvos.filter(i => !(i.id === peca.id && i.categoria === categoria)));
    else
      this._salvos.next([...this.salvos, { ...peca, categoria }]);
  }

  estaSalvo(id: number | undefined, categoria: string): boolean {
    return this.salvos.some(i => i.id === id && i.categoria === categoria);
  }

  limparCarrinho(): void { this._carrinho.next([]); }
}
