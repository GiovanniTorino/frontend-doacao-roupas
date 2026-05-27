import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-item">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
        <span>Home</span>
      </a>
      <a routerLink="/doacao" routerLinkActive="active" class="nav-item">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        </svg>
        <span>Doação</span>
      </a>
      <a routerLink="/carrinho" routerLinkActive="active" class="nav-item">
        <span class="icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span class="badge" *ngIf="qtdCarrinho > 0">{{ qtdCarrinho }}</span>
        </span>
        <span>Carrinho</span>
      </a>
      <a routerLink="/salvos" routerLinkActive="active" class="nav-item">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span>Salvos</span>
      </a>
      <a routerLink="/perfil" routerLinkActive="active" class="nav-item">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Perfil</span>
      </a>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
      width: 100%; max-width: 430px; background: #C41654;
      display: flex; align-items: center; justify-content: space-around;
      height: 70px; border-radius: 24px 24px 0 0; z-index: 200; padding: 0 8px;
    }
    .nav-item {
      display: flex; flex-direction: column; align-items: center; gap: 3px;
      color: rgba(255,255,255,0.55); text-decoration: none; font-size: 10px;
      font-weight: 500; padding: 8px 10px; cursor: pointer;
    }
    .nav-item.active { color: white; }
    .icon-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
    .badge {
      position: absolute; top: -6px; right: -8px; background: #E8453C; color: white;
      font-size: 9px; font-weight: 700; border-radius: 10px; min-width: 16px;
      height: 16px; display: flex; align-items: center; justify-content: center; padding: 0 4px;
    }
  `]
})
export class NavbarComponent implements OnInit, OnDestroy {
  qtdCarrinho = 0;
  private sub!: Subscription;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.sub = this.carrinhoService.carrinho$.subscribe(c => this.qtdCarrinho = c.length);
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }
}
