export interface Peca {
  id?: number;
  peca: string;
  sexo?: string;
  qualidade?: string;
  tamanho: string;
  cor?: string;
  marca?: string;
  doador: string;
}

export type CategoriaTipo = 'camisas' | 'calcas' | 'sapatos' | 'agasalhos';

export const CATEGORIA_CONFIG: Record<CategoriaTipo, {
  label: string; cor: string; emoji: string; tamanhos: string[]; pecaValor: string;
}> = {
  camisas:   { label: 'Camisas',   cor: '#43a047', emoji: '👕', tamanhos: ['PP','P','M','G','GG'],                    pecaValor: 'Camisa' },
  calcas:    { label: 'Calças',    cor: '#1976d2', emoji: '👖', tamanhos: ['34','35','36','37','38','39','40','41'],    pecaValor: 'Calça' },
  sapatos:   { label: 'Sapatos',   cor: '#e65100', emoji: '👟', tamanhos: ['34','35','36','37','38','39','40','41'],    pecaValor: 'Sapatos' },
  agasalhos: { label: 'Agasalhos', cor: '#5e35b1', emoji: '🧥', tamanhos: ['PP','P','M','G','GG'],                    pecaValor: 'Agasalho' }
};
