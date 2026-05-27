import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CarrinhoService, CarrinhoItem } from '../../services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="topbar"><span class="topbar-title">Seu carrinho:</span><img class="avatar" src="https://i.pravatar.cc/80?img=47" /></div>
      <div *ngIf="itens.length === 0" class="empty-state">
        <div style="font-size:48px;margin-bottom:12px">🛒</div>
        Que estranho...<br/>Parece que você ainda não adicionou<br/>nada em seu carrinho, é como se não pudesse.
      </div>
      <div *ngIf="itens.length > 0" style="padding-top:8px">
        <div *ngFor="let item of itens" class="carrinho-item">
          <div class="ci-img">{{ getEmoji(item) }}</div>
          <div class="ci-info"><h4>{{ item.peca }} {{ item.cor }}</h4><p>Tam: {{ item.tamanho }} · {{ item.marca }}</p><p>Doador: {{ item.doador }}</p></div>
          <button class="ci-remove" (click)="remover(item)">✕</button>
        </div>
        <div style="padding:16px"><button class="btn-limpar" (click)="limpar()">Limpar carrinho</button></div>
      </div>
    </div>
  `,
  styles: [`.btn-limpar{width:100%;background:none;border:1.5px solid #E8453C;color:#E8453C;border-radius:14px;padding:12px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;}`]
})
export class CarrinhoComponent implements OnInit, OnDestroy {
  itens: CarrinhoItem[] = [];
  private sub!: Subscription;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void { this.sub = this.carrinhoService.carrinho$.subscribe(c => this.itens = c); }
  ngOnDestroy(): void { this.sub.unsubscribe(); }

  remover(item: CarrinhoItem): void { this.carrinhoService.removerCarrinho(item.id, item.categoria); }
  limpar(): void { this.carrinhoService.limparCarrinho(); }
  getEmoji(item: CarrinhoItem): string {
    const m: Record<string,string> = { camisas:'👕', calcas:'👖', sapatos:'👟', agasalhos:'🧥' };
    return m[item.categoria] ?? '👕';
  }
}
