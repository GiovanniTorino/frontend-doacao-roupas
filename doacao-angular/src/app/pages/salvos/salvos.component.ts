import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarrinhoService, CarrinhoItem } from '../../services/carrinho.service';

@Component({
  selector: 'app-salvos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page">
      <div class="topbar">
        <span class="topbar-title">Seu Salvos:</span>
        <img class="avatar" src="https://i.pravatar.cc/80?img=47" />
      </div>
      <div *ngIf="itens.length === 0" class="empty-state">
        <div class="block-icon">
          <div class="block-circle"></div>
          <div class="block-line"></div>
        </div>
        Esquisito...<br/>Parece que você ainda não salvou<br/>nada, parece que realmente você ainda não pode.
      </div>
      <div *ngIf="itens.length > 0" style="padding-top:8px">
        <div *ngFor="let item of itens" class="carrinho-item" [routerLink]="['/detalhe', item.categoria, item.id]" style="cursor:pointer">
          <div class="ci-img">{{ getEmoji(item) }}</div>
          <div class="ci-info"><h4>{{ item.peca }} {{ item.cor }}</h4><p>Tam: {{ item.tamanho }}</p></div>
          <button class="ci-remove" (click)="remover($event, item)">✕</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .block-icon {
      position: relative;
      width: 100px;
      height: 100px;
      margin: 0 auto 16px;
    }
    .block-circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 8px solid #e02020;
      background: white;
      box-sizing: border-box;
    }
    .block-line {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 112px;
      height: 8px;
      background: #e02020;
      border-radius: 4px;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  `]
})
export class SalvosComponent implements OnInit, OnDestroy {
  itens: CarrinhoItem[] = [];
  private sub!: Subscription;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void { this.sub = this.carrinhoService.salvos$.subscribe(s => this.itens = s); }
  ngOnDestroy(): void { this.sub.unsubscribe(); }

  remover(e: Event, item: CarrinhoItem): void { e.stopPropagation(); this.carrinhoService.toggleSalvo(item, item.categoria); }
  getEmoji(item: CarrinhoItem): string {
    const m: Record<string,string> = { camisas:'👕', calcas:'👖', sapatos:'👟', agasalhos:'🧥' };
    return m[item.categoria] ?? '👕';
  }
}
