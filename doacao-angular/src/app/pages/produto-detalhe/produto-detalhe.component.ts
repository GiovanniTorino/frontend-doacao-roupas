import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { Peca, CATEGORIA_CONFIG, CategoriaTipo } from '../../models/peca.model';

@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="cat-header" [style.background]="config?.cor ?? '#C41654'">
        <span style="opacity:0.6">// </span>{{ config?.label?.toUpperCase() }}<span style="opacity:0.6"> //</span>
      </div>
      <button class="btn-voltar" (click)="voltar()">← Voltar</button>

      <div *ngIf="carregando" class="loading">Carregando...</div>
      <div *ngIf="erro" class="empty-state">{{ erro }}</div>

      <ng-container *ngIf="peca && !carregando">
        <div class="detalhe-img-box">{{ config?.emoji }}</div>
        <div class="detalhe-info">
          <div class="info-header">
            <h2>{{ peca.peca }} {{ peca.cor }}</h2>
            <button class="btn-adquirir" (click)="adquirir()">Adquirir</button>
            <button class="save-icon-btn" [class.saved]="estaSalvo()" (click)="toggleSalvo()">
              {{ estaSalvo() ? '🩷' : '🛍️' }}
            </button>
          </div>
          <p class="info-sub">Tamanho: {{ peca.tamanho }}</p>
          <p class="info-sub">Qualidade: {{ peca.qualidade }}</p>
          <p class="info-sub">Marca: {{ peca.marca }}</p>
          <p class="info-sub">Sexo: {{ peca.sexo }}</p>
          <p class="info-sub">Doador: {{ peca.doador }}</p>
          <hr />
          <h3>Descrição:</h3>
          <p>Peça em bom estado, disponível para doação. Tamanho {{ peca.tamanho }}, cor {{ peca.cor }}.</p>
          <div class="entrega-icons"><span>🏠</span><span>🚚</span></div>
        </div>
      </ng-container>

      <div class="toast" *ngIf="toast">✅ {{ toast }}</div>
    </div>
  `,
  styles: [`.cat-header { display:flex;align-items:center;justify-content:center;padding:14px;color:white;font-size:20px;font-weight:800;letter-spacing:2px; }`]
})
export class ProdutoDetalheComponent implements OnInit {
  peca: Peca | null = null;
  carregando = true;
  erro = '';
  toast = '';
  categoria = '';
  config: typeof CATEGORIA_CONFIG[CategoriaTipo] | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.categoria = this.route.snapshot.paramMap.get('categoria') ?? '';
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.config = CATEGORIA_CONFIG[this.categoria as CategoriaTipo] ?? null;

    const obs$ =
      this.categoria === 'camisas'   ? this.api.getCamisaById(id) :
      this.categoria === 'calcas'    ? this.api.getCalcaById(id) :
      this.categoria === 'sapatos'   ? this.api.getSapatoById(id) :
                                       this.api.getAgasalhoById(id);

    obs$.subscribe({
      next: (data) => { this.peca = data; this.carregando = false; },
      error: () => { this.erro = 'Peça não encontrada.'; this.carregando = false; }
    });
  }

  estaSalvo(): boolean { return this.peca ? this.carrinhoService.estaSalvo(this.peca.id, this.categoria) : false; }
  toggleSalvo(): void { if (this.peca) this.carrinhoService.toggleSalvo(this.peca, this.categoria); }

  adquirir(): void {
    if (!this.peca) return;
    this.carrinhoService.adicionarCarrinho(this.peca, this.categoria);
    this.toast = 'Adicionado ao carrinho!';
    setTimeout(() => this.toast = '', 2600);
  }

  voltar(): void { this.router.navigate(['/' + this.categoria]); }
}
