# Site do Cartório — Jekyll + GitHub Pages

## O que este projeto faz

- Home moderna e responsiva.
- Três setores: Registro Civil, Notas e Protesto.
- Cards com glassmorphism e efeito de luz/tilt.
- Carrosséis horizontais de serviços.
- Busca global com aliases e fuzzy search leve em Vanilla JS.
- Páginas individuais de serviços.
- Conteúdo em Markdown + Front Matter.
- Status `active`, `inactive` e `draft` preparados na arquitetura.
- Imagens, vídeos e galerias podem ser adicionados aos conteúdos.
- Estrutura preparada para crescer sem duplicar HTML.

## Adicionar um serviço

Crie um `.md` dentro de `_servicos/civil/`, `_servicos/notas/` ou `_servicos/protesto/`.

Exemplo:

```yaml
---
title: "Novo Serviço"
slug: "novo-servico"
setor: "notas"
icon: "file"
description: "Descrição curta."
aliases:
  - "nome que o usuário pode pesquisar"
  - "outra forma de escrever"
tags:
  - "tag"
featured: false
enabled: true
status: "active"
order: 10
image: ""
---
```

Depois escreva o conteúdo abaixo do segundo `---`.

## Desativar

Use:

```yaml
enabled: false
```

O arquivo continua no projeto, mas não aparece nas listas e na busca.

## Rascunho

Use:

```yaml
status: "draft"
enabled: false
```

## Mídia

Você pode adicionar:

```yaml
image: "/assets/images/minha-imagem.webp"
```

ou:

```yaml
video:
  url: "/assets/videos/meu-video.mp4"
  poster: "/assets/images/poster.webp"
```

## Rodar localmente

Instale Ruby + Bundler e execute:

```bash
bundle install
bundle exec jekyll serve --livereload
```

Abra o endereço informado pelo Jekyll.

## Publicar

O projeto foi pensado para GitHub Pages. Faça push para o repositório e configure Pages para publicar a partir da branch desejada.

## Próximas melhorias recomendadas

- substituir os SVGs abstratos por fotos reais do cartório;
- colocar o nome/logo oficial;
- criar conteúdo jurídico/informativo real para cada serviço;
- adicionar sitemap e dados estruturados;
- adicionar páginas de artigos/guias;
- configurar domínio próprio;
- otimizar imagens reais para AVIF/WebP.


## Arquitetura de manutenção

Os serviços vivem em `_servicos/<setor>/`. Não copie cards para a Home: os templates consultam automaticamente a Collection.

### Exemplo de status

```yaml
enabled: false
status: "inactive"
```

O serviço fica preservado no repositório, mas desaparece dos componentes públicos que usam `enabled: true`.

### Aliases

Aliases funcionam como termos alternativos de busca. A busca normaliza acentos e faz aproximação de texto.

### Mídia

Serviços e artigos podem ter `image`, `video` e `gallery` no Front Matter. O include `media.html` renderiza os componentes sem duplicar HTML.

### Importante antes da publicação real

Os textos e dados de exemplo são placeholders. Revise o conteúdo jurídico, informações de atendimento, logo oficial, domínio, políticas de privacidade e dados estruturados antes de publicar.
