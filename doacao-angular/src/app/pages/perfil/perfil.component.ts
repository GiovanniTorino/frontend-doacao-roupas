import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Peca } from '../../models/peca.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="topbar" style="justify-content:flex-end"><img class="avatar" src="https://i.pravatar.cc/80?img=47" /></div>
      <img src="https://i.pravatar.cc/300?img=47" style="width:130px;height:130px;border-radius:20px;object-fit:cover;display:block;margin:24px auto 16px;box-shadow:0 4px 16px rgba(0,0,0,0.12)" />
      <hr style="border:none;border-top:1px solid #ddd;margin:0 16px" />
      <h2 style="text-align:center;font-size:22px;font-weight:700;padding:12px 16px">Olá, Regina Seixas</h2>
      <hr style="border:none;border-top:1px solid #ddd;margin:0 16px 8px" />
      <div style="padding:0 16px 8px"><p style="font-size:14px;color:#888">Alguns itens doados:</p></div>
      <div *ngFor="let item of itens" class="carrinho-item">
        <div class="ci-img">{{ getEmoji(item) }}</div>
        <div class="ci-info"><h4>{{ item.peca }} {{ item.cor }}</h4><p>Tam {{ item.tamanho }}</p></div>
      </div>
      <div style="padding:20px 16px;display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;align-items:center;gap:12px;font-size:15px;color:#888"><span>📞</span><span>(432) 9 1234-5678</span></div>
        <div style="display:flex;align-items:center;gap:12px;font-size:15px;color:#888"><span>📘</span><span>doador.insano</span></div>
        <div style="display:flex;align-items:center;gap:12px;font-size:15px;color:#888"><span>📷</span><span>@insanosdoacoes</span></div>
      </div>
    </div>
  `
})
export class PerfilComponent implements OnInit {
  itens: Peca[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCamisas().subscribe({ next: (d) => this.itens = d.slice(0, 3), error: () => {} });
  }

  getEmoji(item: Peca): string {
    const p = item.peca?.toLowerCase() ?? '';
    if (p.includes('camisa')) return '👕';
    if (p.includes('cal')) return '👖';
    if (p.includes('sapato')) return '👟';
    return '🧥';
  }
}
