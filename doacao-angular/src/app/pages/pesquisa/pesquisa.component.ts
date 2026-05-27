import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Peca } from '../../models/peca.model';
import { ProdutoCardComponent } from '../../components/produto-card/produto-card.component';

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [FormsModule, CommonModule, ProdutoCardComponent],
  template: `
    <div class="page">
      <div class="topbar">
        <span class="topbar-title">Buscar</span>
        <img class="avatar" src="https://i.pravatar.cc/80?img=47" alt="Perfil" />
      </div>
      <div class="search-bar">
        <input [(ngModel)]="termo" (keyup.enter)="buscar()" placeholder="Pesquisar peças..." />
        <button (click)="buscar()">🔍</button>
      </div>
      <div *ngIf="carregando" class="loading">Buscando...</div>
      <div *ngIf="!carregando && buscou && items.length === 0" class="empty-state">Nenhum resultado para "{{ termoBuscado }}"</div>
      <div *ngIf="!carregando && items.length > 0" class="items-grid">
        <app-produto-card *ngFor="let item of items" [peca]="item" [categoria]="getCategoria(item)" [emoji]="getEmoji(item)" (adquirido)="mostrarToast($event)" />
      </div>
      <div *ngIf="!buscou && !carregando" class="empty-state" style="padding-top:40px">
        Digite acima para buscar ou escolha uma categoria:<br><br>
        <button class="btn-cat" (click)="ir('/camisas')">👕 Camisas</button><br>
        <button class="btn-cat" (click)="ir('/calcas')">👖 Calças</button><br>
        <button class="btn-cat" (click)="ir('/sapatos')">👟 Sapatos</button><br>
        <button class="btn-cat" (click)="ir('/agasalhos')">🧥 Agasalhos</button>
      </div>
      <div class="toast" *ngIf="toast">✅ {{ toast }}</div>
    </div>
  `,
  styles: [`.btn-cat{background:var(--card-bg);border:1.5px solid #ddd;border-radius:12px;padding:10px 24px;font-size:15px;cursor:pointer;font-family:inherit;margin:4px;}`]
})
export class PesquisaComponent {
  termo = '';
  termoBuscado = '';
  items: Peca[] = [];
  carregando = false;
  buscou = false;
  toast = '';

  constructor(private api: ApiService, private router: Router) {}

  buscar(): void {
    if (!this.termo.trim()) return;
    this.carregando = true; this.buscou = true; this.termoBuscado = this.termo;
    this.api.getTudo().subscribe({
      next: (data) => {
        const t = this.termo.toLowerCase();
        this.items = data.filter(i => i.peca?.toLowerCase().includes(t) || i.cor?.toLowerCase().includes(t) || i.marca?.toLowerCase().includes(t) || i.doador?.toLowerCase().includes(t));
        this.carregando = false;
      },
      error: () => { this.items = []; this.carregando = false; }
    });
  }

  getCategoria(p: Peca): string {
    const v = p.peca?.toLowerCase() ?? '';
    if (v.includes('camisa')) return 'camisas';
    if (v.includes('cal')) return 'calcas';
    if (v.includes('sapato')) return 'sapatos';
    return 'agasalhos';
  }

  getEmoji(p: Peca): string {
    const m: Record<string,string> = { camisas:'👕', calcas:'👖', sapatos:'👟', agasalhos:'🧥' };
    return m[this.getCategoria(p)];
  }

  mostrarToast(p: Peca): void { this.toast = p.peca + ' adicionado!'; setTimeout(() => this.toast = '', 2600); }
  ir(path: string) { this.router.navigate([path]); }
}
