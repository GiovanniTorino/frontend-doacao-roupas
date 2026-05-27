import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Peca } from '../../models/peca.model';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-produto-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="item-card" [routerLink]="['/detalhe', categoria, peca.id]">
      <div class="stars">☆☆☆</div>
      <button class="save-btn" (click)="onToggleSalvo($event)" [title]="estaSalvo ? 'Remover dos salvos' : 'Salvar'">
        {{ estaSalvo ? '🩷' : '🛍️' }}
      </button>
      <div class="card-img-wrap">{{ emoji }}</div>
      <div class="card-sep"></div>
      <div class="card-name">{{ peca.peca }} {{ peca.cor }}</div>
      <div class="card-footer">
        <button class="btn-adquirir" (click)="onAdquirir($event)">Adquirir</button>
      </div>
    </div>
  `
})
export class ProdutoCardComponent {
  @Input() peca!: Peca;
  @Input() categoria!: string;
  @Input() emoji = '👕';
  @Output() adquirido = new EventEmitter<Peca>();

  constructor(private carrinhoService: CarrinhoService) {}

  get estaSalvo(): boolean { return this.carrinhoService.estaSalvo(this.peca.id, this.categoria); }

  onToggleSalvo(e: Event): void { e.stopPropagation(); this.carrinhoService.toggleSalvo(this.peca, this.categoria); }

  onAdquirir(e: Event): void {
    e.stopPropagation();
    this.carrinhoService.adicionarCarrinho(this.peca, this.categoria);
    this.adquirido.emit(this.peca);
  }
}
