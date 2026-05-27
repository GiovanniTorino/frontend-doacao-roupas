import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { Peca } from '../../models/peca.model';
import { ProdutoCardComponent } from '../../components/produto-card/produto-card.component';

@Component({
  selector: 'app-calcas',
  standalone: true,
  imports: [CommonModule, ProdutoCardComponent],
  template: `
    <div class="page">
      <div class="topbar">
        <button class="menu-btn"><span></span><span></span><span></span></button>
        <img class="avatar" src="https://i.pravatar.cc/80?img=47" alt="Perfil" (click)="ir('/perfil')" />
      </div>
      <div class="cat-banner" style="background:#1565c0">
        <div class="banner-overlay" style="background:#1565c0"></div>
        <h1>Calcas</h1>
        <span class="banner-emoji">👖</span>
      </div>
      <button class="btn-voltar" (click)="ir('/')">← Voltar</button>
      <div *ngIf="carregando" class="loading">Carregando...</div>
      <div *ngIf="erro && !carregando" class="empty-state">
        <p>{{ erro }}</p>
        <p style="font-size:12px;margin-top:8px">Verifique se o Flask está rodando em localhost:5000</p>
      </div>
      <div *ngIf="!carregando && !erro && items.length === 0" class="empty-state">Nenhum item disponível.</div>
      <div *ngIf="!carregando && items.length > 0" class="items-grid">
        <app-produto-card *ngFor="let item of items" [peca]="item" categoria="calcas" emoji="👖" (adquirido)="mostrarToast($event)" />
      </div>
      <div class="toast" *ngIf="toast">✅ {{ toast }}</div>
    </div>
  `
})
export class CalcasComponent implements OnInit {
  items: Peca[] = [];
  carregando = true;
  erro = '';
  toast = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getCalcas().subscribe({
      next: (data) => { this.items = data; this.carregando = false; },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.items = []; this.carregando = false;
        } else {
          this.erro = 'Não foi possível conectar ao servidor.'; this.carregando = false;
        }
      }
    });
  }

  mostrarToast(peca: Peca): void {
    this.toast = peca.peca + ' ' + (peca.cor || '') + ' adicionado!';
    setTimeout(() => this.toast = '', 2600);
  }

  ir(path: string) { this.router.navigate([path]); }
}