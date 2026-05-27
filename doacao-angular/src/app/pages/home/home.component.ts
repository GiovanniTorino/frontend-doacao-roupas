import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from '../../components/drawer/drawer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DrawerComponent],
  template: `
    <div class="page">

      <app-drawer #drawer></app-drawer>

      <!-- Topbar com hamburguer -->
      <div class="topbar">
        <button class="hamburger-btn" (click)="drawer.abrirMenu()" aria-label="Abrir menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <img class="avatar" src="https://i.pravatar.cc/80?img=47" alt="Perfil" (click)="ir('/perfil')" />
      </div>

      <!-- Promo banner -->
      <div class="home-promo" (click)="ir('/camisas')">
        <div class="promo-inner">
          <h2>NOVAS CAMISAS!!!</h2>
          <p>clique para ver mais</p>
          <div class="promo-emoji">👕 👕 👕 👕 👕</div>
        </div>
      </div>

      <!-- Categorias -->
      <div class="home-cats">
        <h3>Categorias</h3>
        <div class="cats-row">
          <div class="cat-chip" (click)="ir('/calcas')">
            <div class="cat-chip-img" style="background:#1976d2">👖</div>
            <span>Calças</span>
          </div>
          <div class="cat-chip" (click)="ir('/sapatos')">
            <div class="cat-chip-img" style="background:#e65100">👟</div>
            <span>Sapatos</span>
          </div>
          <div class="cat-chip" (click)="ir('/agasalhos')">
            <div class="cat-chip-img" style="background:#5e35b1">🧥</div>
            <span>Agasalhos</span>
          </div>
          <div class="cat-chip" (click)="ir('/camisas')">
            <div class="cat-chip-img" style="background:#43a047">👕</div>
            <span>Camisas</span>
          </div>
        </div>
        <button class="ver-tudo-btn" (click)="ir('/pesquisa')">Ver tudo</button>
      </div>

      <!-- Entrega -->
      <div class="home-entrega">
        <h3>Opções de Entrega</h3>
        <div class="entrega-opts">
          <div class="opt"><span class="icon">🏠</span><p>Recebimento em uma das sedes de sua cidade</p></div>
          <div class="opt"><span class="icon">🚚</span><p>Recebimento em casa (taxa de transporte)</p></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .topbar {
      position: sticky; top: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 16px; background: #C41654; min-height: 62px;
    }

    .hamburger-btn {
      background: #C41654; border: none; border-radius: 10px;
      width: 44px; height: 44px;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 6px; cursor: pointer; padding: 0;
      box-shadow: 0 2px 8px rgba(196,22,84,0.4);
    }
    .hamburger-btn span {
      display: block; width: 22px; height: 2.5px;
      background: white; border-radius: 2px;
    }

    .avatar {
      width: 40px; height: 40px; border-radius: 50%;
      object-fit: cover; cursor: pointer; border: 2px solid #C41654;
    }

    .cat-chip-img {
      width: 100%; height: 80px;
      display: flex; align-items: center; justify-content: center;
      font-size: 36px;
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}
  ir(p: string): void { this.router.navigate([p]); }
}
