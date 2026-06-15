# FOCUSBOARD - DOCUMENTAÇÃO FUNCIONAL

Versão: 1.0

---

# VISÃO GERAL

FocusBoard é uma plataforma pessoal de produtividade voltada para estudantes e desenvolvedores.

O sistema combina:

* Kanban
* Anotações
* Pomodoro
* Dashboard de produtividade

O objetivo é ajudar usuários a organizar tarefas, manter foco e acompanhar sua evolução diária.

---

# PÚBLICO-ALVO

* Estudantes
* Desenvolvedores
* Freelancers
* Profissionais de tecnologia
* Pessoas que utilizam métodos de produtividade

---

# IDENTIDADE VISUAL

A interface deve transmitir:

* Organização
* Modernidade
* Produtividade
* Clareza
* Simplicidade

Inspirada em:

* Notion
* Trello
* GitHub Projects
* Linear

---

# ESTRUTURA DA APLICAÇÃO

A aplicação possui:

1. Tela de Login
2. Dashboard Principal
3. Módulo de Tarefas
4. Módulo de Anotações
5. Módulo de Pomodoro
6. Módulo de Estatísticas
7. Sistema de Temas

---

# FLUXO DO USUÁRIO

Login

↓

Dashboard

↓

Escolha de módulo

↓

Uso da funcionalidade

↓

Dados atualizados

↓

Retorno ao dashboard

---

# MENU LATERAL

O menu lateral deve permanecer visível durante toda a navegação.

Itens:

📋 Tarefas

📝 Anotações

🍅 Pomodoro

📊 Dashboard

---

# PERFIL

Exibir:

* Avatar
* Nome
* Cargo

Exemplo:

Nome: João Silva

Cargo: Desenvolvedor Full Stack

---

# TELA DE LOGIN

Objetivo:

Permitir entrada do usuário.

Campos:

* Email
* Senha

Botão:

Entrar

Comportamento esperado:

Ao clicar em Entrar, o sistema deverá abrir o dashboard principal.

Nesta versão não existe autenticação real.

---

# MÓDULO DE TAREFAS

Tela principal do sistema.

---

## ESTRUTURA

3 colunas:

### A Fazer

Tarefas ainda não iniciadas.

### Fazendo

Tarefas em andamento.

### Concluído

Tarefas finalizadas.

---

## CARTÃO DE TAREFA

Cada tarefa deve possuir:

* Título
* Descrição
* Data
* Status

Exemplo:

Título:
Criar Landing Page

Descrição:
Desenvolver versão inicial do projeto.

Data:
03/06/2026

---

## AÇÕES FUTURAS

O sistema deverá permitir:

* Criar tarefa
* Editar tarefa
* Excluir tarefa
* Mover tarefa entre colunas

---

## DRAG AND DROP

Requisitos futuros:

O usuário poderá arrastar cartões.

Fluxo:

A Fazer → Fazendo

Fazendo → Concluído

Concluído → Fazendo

A interface deve estar preparada para isso.

---

# BARRA DE PROGRESSO

Localização:

Abaixo do Kanban.

Objetivo:

Mostrar percentual de tarefas concluídas.

Fórmula futura:

(Tarefas concluídas / Total de tarefas) × 100

Exemplo:

8 tarefas

4 concluídas

Resultado:

50%

---

# MÓDULO DE ANOTAÇÕES

Objetivo:

Funcionar como bloco de notas pessoal.

---

## INTERFACE

A tela deve exibir:

* Apenas uma área de texto principal
* Espaço amplo para escrita

Inspirado em:

* Notion
* Obsidian

---

## FUNCIONALIDADES FUTURAS

* Salvar automaticamente
* Recuperar texto salvo
* Contar caracteres
* Contar palavras

---

# MÓDULO POMODORO

Objetivo:

Auxiliar foco e concentração.

---

## MODOS

Foco

25 minutos

Pausa

5 minutos

Pausa longa

15 minutos

---

## CONTROLES

Botões:

* Iniciar
* Pausar
* Reiniciar

---

## FUNCIONALIDADES FUTURAS

* Contagem regressiva
* Som ao finalizar
* Histórico de sessões

---

# DASHBOARD

Objetivo:

Apresentar métricas do usuário.

---

## CARDS

Total de tarefas

Pendentes

Fazendo

Concluídas

---

## RESUMO

Exemplo:

"Você concluiu 8 tarefas hoje."

---

## GRÁFICO

Exibir visualmente:

A Fazer

Fazendo

Concluído

Objetivo:

Permitir rápida leitura da produtividade.

---

# SISTEMA DE TEMAS

A aplicação deve possuir 3 temas.

---

## DARK

Tema padrão.

Inspirado em:

* GitHub Dark
* Linear

Características:

* Fundo escuro
* Contraste elevado
* Visual moderno

---

## LIGHT

Inspirado em:

* Notion
* Google Workspace

Características:

* Fundo claro
* Aparência limpa

---

## RETRO WINDOWS XP

Inspirado em:

* Windows XP
* Office 2003

Características:

* Azul clássico
* Verde clássico
* Botões 3D
* Fonte Tahoma
* Janelas estilo XP

O objetivo é causar nostalgia.

---

# RESPONSIVIDADE

A aplicação deve funcionar em:

* Desktop
* Tablet
* Smartphone

---

# ACESSIBILIDADE

Requisitos:

* Contraste adequado
* Navegação por teclado
* Labels em formulários
* Estrutura semântica

---

# EXPERIÊNCIA DO USUÁRIO

O usuário deve sentir que está utilizando um produto real.

A interface deve transmitir:

* Qualidade
* Organização
* Clareza
* Profissionalismo

Nenhuma área deve parecer um exercício acadêmico simples.

O resultado visual deve ser semelhante a um SaaS moderno pronto para produção.

---

# Ajustes do Projeto (Versão deve ser publicada no dia 15/06/2026)

## Tela de Login

* Implementar funcionalidade de criação de usuários.
* Aplicar persistência de dados utilizando `localStorage`.

## Dashboard

* Atualizar os indicadores e informações do dashboard com base nos dados da tela de Tarefas.
* Aplicar persistência de dados utilizando `localStorage`.

## Tela de Tarefas

* Ajustar a funcionalidade de filtros.
* Aplicar persistência de dados utilizando `localStorage`.
* Corrigir e otimizar o campo de pesquisa.
* Aplicar formatação de texto tachado para tarefas movidas para a raia **"Concluído"**.

### Barra de Progresso

* Ajustar a contabilização e exibição da quantidade de tarefas ao mover itens para a raia **"Concluído"**.

## Menu Lateral

* Incluir opção para ocultar/exibir o menu.
* Ajustar a funcionalidade da opção **"Sair"**.

---

# Implementações Futuras (Não Urgentes)

## Perfil do Usuário

Adicionar uma nova tela de perfil contendo as seguintes funcionalidades:

* Editar avatar.
* Editar nome.
* Editar biografia.
* Editar cargo.
* Visualizar informações do perfil do usuário.

## Gerenciamento de Perfis de Usuário

* Criar diferentes perfis de usuário.
* Disponibilizar a seção **"Perfis de Usuário"** no menu apenas para usuários com perfil **ADMIN**.
* Permitir que usuários ADMIN:

  * Visualizem os perfis cadastrados.
  * Alterem informações dos perfis de usuários.


# OBSERVAÇÃO PARA OS DESENVOLVEDORES

Esta versão é exclusivamente visual.

A implementação de:

* JavaScript
* Manipulação do DOM
* Eventos
* localStorage
* CRUD
* Drag and Drop

será realizada posteriormente pelo estudante como parte do processo de aprendizado.

