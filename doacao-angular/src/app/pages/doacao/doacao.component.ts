import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

type Cat = 'camisas' | 'calcas' | 'sapatos' | 'agasalhos';

const TAMANHOS: Record<Cat, string[]> = {
  camisas:   ['PP','P','M','G','GG'],
  calcas:    ['34','35','36','37','38','39','40','41'],
  sapatos:   ['34','35','36','37','38','39','40','41'],
  agasalhos: ['PP','P','M','G','GG']
};

const PECA_VALOR: Record<Cat, string> = {
  camisas:'Camisa', calcas:'Calça', sapatos:'Sapatos', agasalhos:'Agasalho'
};

@Component({
  selector: 'app-doacao',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="page">
      <div class="topbar"><span class="topbar-title">Fazer Doação</span><img class="avatar" src="https://i.pravatar.cc/80?img=47" /></div>
      <div class="doacao-form">
        <h2>Cadastrar Peça</h2>
        <div class="form-group">
          <label>Categoria *</label>
          <select [(ngModel)]="categoria" (ngModelChange)="onCategoriaChange()">
            <option value="">Selecione...</option>
            <option value="camisas">👕 Camisa</option>
            <option value="calcas">👖 Calça</option>
            <option value="sapatos">👟 Sapato</option>
            <option value="agasalhos">🧥 Agasalho</option>
          </select>
        </div>
        <div class="form-group">
          <label>Seu Nome (Doador) *</label>
          <input [(ngModel)]="doador" placeholder="Ex: João Silva" (ngModelChange)="validarCampos()" />
          <span class="field-error" *ngIf="erros.doador">⚠️ {{ erros.doador }}</span>
        </div>
        <div class="form-group">
          <label>Tamanho *</label>
          <select [(ngModel)]="tamanho">
            <option value="">Selecione...</option>
            <option *ngFor="let t of tamanhos" [value]="t">{{ t }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Cor</label>
          <input [(ngModel)]="cor" placeholder="Ex: Azul, Vermelho..." (ngModelChange)="validarCampos()" />
          <span class="field-error" *ngIf="erros.cor">⚠️ {{ erros.cor }}</span>
        </div>
        <div class="form-group">
          <label>Marca</label>
          <input [(ngModel)]="marca" placeholder="Ex: Nike, Adidas..." (ngModelChange)="validarCampos()" />
          <span class="field-error" *ngIf="erros.marca">⚠️ {{ erros.marca }}</span>
        </div>
        <div class="form-group">
          <label>Sexo</label>
          <select [(ngModel)]="sexo">
            <option value="">Não informado</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
        <div class="form-group">
          <label>Qualidade</label>
          <select [(ngModel)]="qualidade">
            <option value="">Não informado</option>
            <option value="6/6">6/6 - Excelente</option>
            <option value="5/6">5/6 - Ótimo</option>
            <option value="4/6">4/6 - Bom</option>
            <option value="3/6">3/6 - Regular</option>
          </select>
        </div>
        <button class="btn-submit" [disabled]="enviando || !podeEnviar()" (click)="enviar()">
          {{ enviando ? 'Enviando...' : '📦 Cadastrar Doação' }}
        </button>
        <div class="success-msg" *ngIf="sucesso">✅ Peça cadastrada com sucesso! Obrigado pela doação!</div>
        <div class="error-msg" *ngIf="erroMsg">{{ erroMsg }}</div>
      </div>
    </div>
  `
})
export class DoacaoComponent {
  categoria: Cat | '' = '';
  doador = ''; tamanho = ''; cor = ''; marca = ''; sexo = ''; qualidade = '';
  tamanhos: string[] = [];
  enviando = false; sucesso = false; erroMsg = '';
  erros: { doador?: string; cor?: string; marca?: string } = {};

  private somenteNumeros(valor: string): boolean {
    return !!valor.trim() && /^\d+$/.test(valor.trim());
  }

  validarCampos(): void {
    this.erros = {};
    if (this.somenteNumeros(this.doador))
      this.erros.doador = 'Doador precisa ser um nome, não um número.';
    if (this.somenteNumeros(this.cor))
      this.erros.cor = 'Cor precisa ser um nome, não um número.';
    if (this.somenteNumeros(this.marca))
      this.erros.marca = 'Marca precisa ser um nome, não um número.';
  }

  constructor(private api: ApiService) {}

  onCategoriaChange(): void {
    this.tamanho = '';
    this.tamanhos = this.categoria ? TAMANHOS[this.categoria] : [];
  }

  podeEnviar(): boolean {
    return !!this.categoria && !!this.doador.trim() && !!this.tamanho
      && !this.erros.doador && !this.erros.cor && !this.erros.marca;
  }

  enviar(): void {
    this.validarCampos();
    if (!this.podeEnviar() || !this.categoria) return;
    this.enviando = true; this.erroMsg = ''; this.sucesso = false;
    const payload: any = { peca: PECA_VALOR[this.categoria], doador: this.doador.trim(), tamanho: this.tamanho };
    if (this.cor) payload.cor = this.cor;
    if (this.marca) payload.marca = this.marca;
    if (this.sexo) payload.sexo = this.sexo;
    if (this.qualidade) payload.qualidade = this.qualidade;

    const obs$ = this.categoria === 'camisas' ? this.api.criarCamisa(payload) :
                 this.categoria === 'calcas'  ? this.api.criarCalca(payload) :
                 this.categoria === 'sapatos' ? this.api.criarSapato(payload) :
                                                this.api.criarAgasalho(payload);
    obs$.subscribe({
      next: () => { this.enviando = false; this.sucesso = true; this.resetForm(); },
      error: (err) => { this.enviando = false; this.erroMsg = err?.error?.mensagem ?? 'Erro ao cadastrar. Verifique os dados.'; }
    });
  }

  private resetForm(): void { this.categoria = ''; this.doador = ''; this.tamanho = ''; this.cor = ''; this.marca = ''; this.sexo = ''; this.qualidade = ''; this.tamanhos = []; this.erros = {}; }
}
