---
title: "Exemplo de Guia"
description: "Modelo de artigo com imagem, vídeo e conteúdo em Markdown."
aliases:
  - exemplo
  - guia de exemplo
tags:
  - guia
enabled: false
status: "draft"
image: "/assets/images/civil.svg"
video:
  url: "/assets/videos/exemplo.mp4"
  poster: "/assets/images/civil.svg"
gallery:
  - "/assets/images/civil.svg"
  - "/assets/images/notas.svg"
---
## Introdução

Escreva aqui o conteúdo do artigo.

### Conteúdo

Você pode usar Markdown normalmente, adicionar listas, links, tabelas e imagens.

O layout cuida do restante.

---

## Exemplos de Callouts

Abaixo estão todos os estilos de bloco de destaque disponíveis.

### Dica (padrão com `>`)

> **Dica:** Você pode autenticar documentos em qualquer cartório de notas, independentemente do local onde o documento foi emitido.

### Dica com classe explícita

<blockquote class="callout callout--dica">
  <strong>Dica:</strong> Para agilizar o atendimento, chegue com todos os documentos originais e cópias já separados.
</blockquote>

### Aviso

<blockquote class="callout callout--aviso">
  <strong>Aviso:</strong> O prazo para reconhecimento de firma em contratos particulares pode variar conforme o tipo de documento. Verifique com antecedência.
</blockquote>

### Atenção

<blockquote class="callout callout--atencao">
  <strong>Atenção:</strong> Documentos rasurados ou com emendas não poderão ser autenticados. Solicite uma nova via ao órgão emissor.
</blockquote>

### Importante

<blockquote class="callout callout--importante">
  <strong>Importante:</strong> A procuração por instrumento público só pode ser lavrada em cartório de notas. Não confunda com o cartório de registro de imóveis.
</blockquote>

### Sucesso

<blockquote class="callout callout--sucesso">
  <strong>Concluído:</strong> Seu documento está pronto para retirada. Lembre-se de apresentar o comprovante de agendamento no balcão.
</blockquote>

### Citação

<blockquote class="callout callout--citacao">
  "O tabelião dá fé pública aos atos e fatos jurídicos, garantindo segurança, eficácia e validade ao conteúdo dos instrumentos por ele lavrados."
  <cite>Lei 8.935/1994 — Lei dos Cartórios</cite>
</blockquote>

---

## Exemplos de Botões

Coloque botões em qualquer ponto do Markdown com `{% raw %}{% include button.html ... %}{% endraw %}`.

### Variantes

{% include button.html text='Falar no WhatsApp' link='https://wa.me/5511999999999' icon='whatsapp' variant='primary' %}
&nbsp;
{% include button.html text='Ver documento' link='#' icon='download' variant='secondary' %}
&nbsp;
{% include button.html text='Saiba mais' link='#' icon='external' variant='ghost' %}
&nbsp;
{% include button.html text='Agendar visita' link='#' icon='calendar' variant='dark' %}

### Mais variantes

{% include button.html text='Confirmar' link='#' icon='check' variant='success' %}
&nbsp;
{% include button.html text='Cancelar' link='#' variant='danger' %}

### Tamanhos

{% include button.html text='Pequeno' link='#' icon='arrow' variant='primary' size='sm' %}
&nbsp;
{% include button.html text='Médio (padrão)' link='#' icon='arrow' variant='primary' size='md' %}
&nbsp;
{% include button.html text='Grande' link='#' icon='arrow' variant='primary' size='lg' %}

### Ícones disponíveis

{% include button.html text='WhatsApp' link='#' icon='whatsapp' variant='ghost' size='sm' %}
{% include button.html text='Telefone' link='#' icon='phone' variant='ghost' size='sm' %}
{% include button.html text='E-mail' link='#' icon='mail' variant='ghost' size='sm' %}
{% include button.html text='Download' link='#' icon='download' variant='ghost' size='sm' %}
{% include button.html text='Mapa' link='#' icon='map' variant='ghost' size='sm' %}
{% include button.html text='Externo' link='#' icon='external' variant='ghost' size='sm' %}
{% include button.html text='Agenda' link='#' icon='calendar' variant='ghost' size='sm' %}
{% include button.html text='Arquivo' link='#' icon='file' variant='ghost' size='sm' %}
{% include button.html text='Seta' link='#' icon='arrow' variant='ghost' size='sm' %}

### Em nova aba

{% include button.html text='Abrir site do cartório' link='https://example.com' icon='external' variant='secondary' target='_blank' %}

### Centralizado com `.btn-block`

<div class="btn-block">
  {% include button.html text='Agendar atendimento' link='#' icon='calendar' variant='primary' size='lg' %}
</div>
