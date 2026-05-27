import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Overlay dentro do .page -->
    <div class="drawer-overlay" *ngIf="menuAberto" (click)="fecharMenu()"></div>

    <!-- Drawer dentro do .page -->
    <div class="drawer" [class.drawer-open]="menuAberto" role="dialog">
      <button class="drawer-close" (click)="fecharMenu()">✕</button>

      <div class="drawer-header">
        <img src="https://i.pravatar.cc/80?img=47" class="drawer-avatar" alt="Avatar" />
        <span class="drawer-nome">Regina Seixas</span>
      </div>
      <div class="drawer-sep"></div>

      <div class="drawer-item">
        <span class="drawer-icon">📞</span>
        <span>(432) 9 1234-5678</span>
      </div>
      <div class="drawer-item">
        <span class="drawer-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </span>
        <span>doador.insano</span>
      </div>
      <div class="drawer-item">
        <span class="drawer-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </span>
        <span>@insanosdoacoes</span>
      </div>

      <div class="drawer-sep"></div>

      <div class="drawer-item nav-link" (click)="ir('/')">
        <span class="drawer-icon">🏠</span><span>Home</span>
      </div>
      <div class="drawer-item nav-link" (click)="ir('/doacao')">
        <span class="drawer-icon">📦</span><span>Fazer Doação</span>
      </div>
      <div class="drawer-item nav-link" (click)="ir('/salvos')">
        <span class="drawer-icon">❤️</span><span>Salvos</span>
      </div>
      <div class="drawer-item nav-link" (click)="ir('/carrinho')">
        <span class="drawer-icon">🛒</span><span>Carrinho</span>
      </div>
      <div class="drawer-item nav-link" (click)="ir('/perfil')">
        <span class="drawer-icon">👤</span><span>Meu Perfil</span>
      </div>
    </div>
  `,
  styles: [`
    /* Overlay — cobre só o .page (position absolute) */
    .drawer-overlay {
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 300;
      animation: fadeIn 0.2s ease;
    }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

    /* Drawer — desliza dentro do .page */
    .drawer {
      position: absolute; top: 0; left: 0;
      height: 100%; width: 78%; max-width: 300px;
      background: #C41654; z-index: 400;
      transform: translateX(-100%);
      transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
      display: flex; flex-direction: column;
      box-shadow: 4px 0 28px rgba(0,0,0,0.35);
      overflow-y: auto;
    }
    .drawer.drawer-open { transform: translateX(0); }

    .drawer-close {
      position: absolute; top: 14px; right: 14px;
      background: rgba(255,255,255,0.15); border: none;
      border-radius: 50%; width: 32px; height: 32px;
      color: white; font-size: 14px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
    }
    .drawer-close:hover { background: rgba(255,255,255,0.25); }

    .drawer-header {
      display: flex; flex-direction: column; align-items: center;
      padding: 52px 20px 20px; gap: 10px;
    }
    .drawer-avatar {
      width: 72px; height: 72px; border-radius: 50%;
      border: 3px solid rgba(255,255,255,0.4); object-fit: cover;
    }
    .drawer-nome { color: white; font-size: 16px; font-weight: 600; }

    .drawer-sep { height: 1px; background: rgba(255,255,255,0.2); margin: 8px 20px; }

    .drawer-item {
      display: flex; align-items: center; gap: 14px;
      padding: 14px 24px; color: rgba(255,255,255,0.85);
      font-size: 15px; cursor: default;
    }
    .drawer-item.nav-link { cursor: pointer; transition: background 0.15s; }
    .drawer-item.nav-link:active { background: rgba(255,255,255,0.12); }

    .drawer-icon {
      font-size: 20px; width: 24px; text-align: center;
      flex-shrink: 0; display: flex; align-items: center; justify-content: center;
    }
  `]
})
export class DrawerComponent {
  menuAberto = false;

  constructor(private router: Router) {}

  abrirMenu(): void  { this.menuAberto = true; }
  fecharMenu(): void { this.menuAberto = false; }

  ir(path: string): void {
    this.router.navigate([path]);
    this.fecharMenu();
  }

  @HostListener('document:keydown.escape')
  onEsc(): void { this.fecharMenu(); }
}
