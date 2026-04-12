# Dev Log

## 2026-04-12

### O que mudou
- Foi implementado o modo telao com fullscreen, bola atual ampliada e destaque para os ultimos 5 sorteios.
- Foi adicionado suporte para modos de jogo com 60, 75 e 90 bolas.
- Foi criado um painel com contagem de bolas restantes por letra e no total.
- A interface principal foi simplificada e os controles secundarios foram movidos para um menu hamburguer mobile-first.

### Decisoes
- O modo telao ficou focado em leitura a distancia, com menos densidade visual.
- O estado do jogo passou a ser salvo por modo no localStorage para evitar conflito entre rodadas de 60, 75 e 90 bolas.
- O layout principal foi mantido centrado no fluxo de sorteio, enquanto configuracoes e status foram para o drawer lateral.

### Observacoes
- O modo de 90 bolas ainda usa a logica visual baseada em letras BINGO, nao o formato tradicional de bingo 90.
- Fullscreen depende da permissao e do suporte do navegador.

### Proximo passo sugerido
- Implementar desfazer ultimo sorteio.

## Template

### YYYY-MM-DD

#### O que mudou
- 

#### Decisoes
- 

#### Problemas encontrados
- 

#### Proximo passo
- 
