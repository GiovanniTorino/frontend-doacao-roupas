import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',           loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'camisas',   loadComponent: () => import('./pages/camisas/camisas.component').then(m => m.CamisasComponent) },
  { path: 'calcas',    loadComponent: () => import('./pages/calcas/calcas.component').then(m => m.CalcasComponent) },
  { path: 'sapatos',   loadComponent: () => import('./pages/sapatos/sapatos.component').then(m => m.SapatosComponent) },
  { path: 'agasalhos', loadComponent: () => import('./pages/agasalhos/agasalhos.component').then(m => m.AgasalhosComponent) },
  { path: 'detalhe/:categoria/:id', loadComponent: () => import('./pages/produto-detalhe/produto-detalhe.component').then(m => m.ProdutoDetalheComponent) },
  { path: 'pesquisa',  loadComponent: () => import('./pages/pesquisa/pesquisa.component').then(m => m.PesquisaComponent) },
  { path: 'carrinho',  loadComponent: () => import('./pages/carrinho/carrinho.component').then(m => m.CarrinhoComponent) },
  { path: 'salvos',    loadComponent: () => import('./pages/salvos/salvos.component').then(m => m.SalvosComponent) },
  { path: 'perfil',    loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent) },
  { path: 'doacao',    loadComponent: () => import('./pages/doacao/doacao.component').then(m => m.DoacaoComponent) },
  { path: '**', redirectTo: '' }
];
