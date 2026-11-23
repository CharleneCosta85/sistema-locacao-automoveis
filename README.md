# 🚗 Sistema de Locação de Automóveis

Protótipo de um sistema web para gerenciamento de uma locadora de automóveis, desenvolvido como projeto acadêmico da disciplina de **Arquitetura de Software**.

O sistema permite controlar clientes, veículos, reservas, locações, devoluções e pagamentos, seguindo os requisitos funcionais e não funcionais definidos para o projeto.

---

## 👩‍💻 Autora

**Charlene Costa**

**Curso:** Análise e Desenvolvimento de Sistemas (ADS)  
**Instituição:** FAETERJ Paracambi  
**Disciplina:** Arquitetura de Software  
**Professor:** Iran  
**Ano:** 2026

---

## 🎯 Objetivo do Projeto

Desenvolver um protótipo de sistema para uma locadora de automóveis, permitindo organizar as principais operações do processo de locação.

O sistema foi elaborado considerando uma arquitetura em camadas, separação de responsabilidades, segurança, desempenho e possibilidade de integração com serviços externos.

---

## ⚙️ Funcionalidades

O protótipo contempla os seguintes requisitos funcionais:

### RF01 — Gerenciar Clientes

Permite:

- Cadastrar clientes;
- Consultar clientes;
- Identificar clientes Pessoa Física;
- Identificar clientes Pessoa Jurídica;
- Visualizar o status do cliente.

### RF02 — Gerenciar Veículos

Permite:

- Cadastrar veículos;
- Consultar veículos;
- Visualizar categoria;
- Visualizar valor da diária;
- Controlar o status do veículo;
- Consultar quilometragem;
- Visualizar informações de revisão.

Os veículos podem apresentar os seguintes status:

- Disponível;
- Alugado;
- Manutenção.

### RF03 — Realizar Reserva

Permite consultar veículos disponíveis e realizar reservas para clientes.

A reserva considera informações como:

- Cliente;
- Veículo;
- Período;
- Categoria;
- Status da reserva.

### RF04 — Registrar Locação / Retirada

Permite registrar a retirada do veículo pelo cliente.

Durante o processo são registrados:

- Cliente;
- Veículo;
- Reserva;
- Quilometragem inicial;
- Data da retirada;
- Forma de pagamento;
- Status da locação.

### RF05 — Registrar Devolução

Permite registrar a devolução do veículo.

São consideradas informações como:

- Quilometragem final;
- Combustível;
- Avarias;
- Multas;
- Diárias adicionais;
- Valor adicional;
- Status final da locação.

### RF06 — Processar Pagamentos

O protótipo possui uma tela para simulação de pagamentos utilizando:

- Cartão de crédito;
- Cartão de débito;
- PIX.

> **Observação:** nesta versão acadêmica, o pagamento é **simulado**. Não existe uma cobrança financeira real nem integração efetiva com um gateway externo.

---

## 🏗️ Arquitetura

O projeto foi estruturado considerando uma arquitetura em camadas.

### Camadas previstas

```text
┌──────────────────────────────────────┐
│       Interface Web / Mobile         │
│       React / Angular / Flutter      │
└──────────────────┬───────────────────┘
                   │
┌──────────────────▼───────────────────┐
│       API Gateway / Autenticação     │
│          OAuth2 / JWT / REST         │
└──────────────────┬───────────────────┘
                   │
┌──────────────────▼───────────────────┐
│          Camada de Negócio            │
│                                      │
│ Clientes / Autenticação              │
│ Veículos / Frota                     │
│ Reservas / Locações                  │
│ Faturamento / Pagamentos             │
└──────────────────┬───────────────────┘
                   │
┌──────────────────▼───────────────────┐
│          Persistência                 │
│                                      │
│ PostgreSQL + Redis                   │
└──────────────────────────────────────┘
```

A arquitetura foi definida visando facilitar a manutenção, organização e evolução do sistema.

---

## 🛠️ Tecnologias

O protótipo foi desenvolvido utilizando:

- **React**
- **Vite**
- **JavaScript**
- **HTML**
- **CSS**
- **Node.js**
- **npm**

A arquitetura proposta para a solução completa também considera:

- PostgreSQL;
- Redis;
- APIs REST;
- OAuth2;
- JWT;
- Integração com gateway de pagamentos.

---

## 💻 Como executar o projeto

### 1. Pré-requisitos

É necessário possuir instalado:

- Node.js
- npm

Para verificar as instalações:

```bash
node -v
npm -v
```

### 2. Clonar o repositório

```bash
git clone https://github.com/CharleneCosta85/sistema-locacao-automoveis.git
```

### 3. Entrar na pasta

```bash
cd sistema-locacao-automoveis
```

### 4. Instalar as dependências

```bash
npm install
```

### 5. Executar o projeto

```bash
npm run dev
```

### 6. Acessar no navegador

O Vite disponibilizará o sistema em um endereço semelhante a:

```text
http://localhost:5173/
```

---

## 🧪 Funcionalidades testadas

Durante os testes do protótipo foram realizadas operações correspondentes aos requisitos funcionais.

### RF01 — Clientes

Foi realizado teste de cadastro/visualização de cliente.

Exemplo:

```text
Cliente: Mariana Silva
Tipo: Pessoa Física
Status: Ativo
```

### RF02 — Veículos

Foram cadastrados e consultados veículos de diferentes categorias.

Exemplos:

- Toyota Corolla — Sedan
- Jeep Renegade — SUV
- Fiat Argo — Econômico
- Chevrolet Onix — Econômico
- Honda HR-V — SUV

### RF03 — Reservas

Foi realizada uma reserva de veículo para utilização no processo de locação.

### RF04 — Locação

Foi realizado um teste de retirada de veículo.

Exemplo:

```text
Locação: LOC-001
Cliente: Mariana Silva
Veículo: Toyota Corolla
Status: Em andamento
```

### RF05 — Devolução

Foi realizado o processo de devolução da locação.

Resultado do teste:

```text
Devolução LOC-001 registrada.
Total adicional: R$ 0,00.
Status: Finalizada
```

### RF06 — Pagamento

Foi realizada uma simulação de pagamento.

Resultado:

```text
Pagamento simulado com sucesso.
```

---

## 📋 Requisitos Não Funcionais

### RNF01 — Disponibilidade

O sistema deve buscar alta disponibilidade, considerando como requisito uma disponibilidade de **99,9%**.

### RNF02 — Segurança e LGPD

O sistema deve proteger os dados dos usuários e considerar boas práticas relacionadas à segurança da informação e à **Lei Geral de Proteção de Dados (LGPD)**.

### RNF03 — Desempenho

A consulta de veículos deve apresentar resposta inferior a **2 segundos**, considerando a arquitetura e os mecanismos de cache previstos.

---

## 👥 Atores do Sistema

### Cliente

Pode:

- Consultar veículos;
- Realizar reservas;
- Consultar histórico de locações.

### Funcionário / Atendente

Pode:

- Gerenciar clientes;
- Gerenciar veículos;
- Registrar retiradas;
- Registrar devoluções;
- Realizar vistorias;
- Gerenciar operações de locação.

### Sistema de Pagamento

Representa um serviço externo responsável pelo processamento de pagamentos.

No protótipo acadêmico, essa integração é representada por uma **simulação**.

---

## 📐 Modelagem UML

O projeto possui modelagem baseada em UML, incluindo:

- Diagrama de Casos de Uso;
- Diagrama de Classes;
- Identificação dos atores;
- Requisitos funcionais;
- Requisitos não funcionais;
- Fluxos principais do sistema.

---

## 📱 Telas do Protótipo

O protótipo possui telas para:

- Dashboard;
- Consulta de veículos;
- Gerenciamento de veículos;
- Reservas;
- Locações / Retiradas;
- Devoluções;
- Clientes;
- Pagamentos.

---

## 🔐 Segurança

A arquitetura proposta considera mecanismos como:

- Autenticação;
- Autorização;
- JWT;
- OAuth2;
- Controle de acesso;
- Proteção de dados pessoais;
- Princípios da LGPD.

Esses elementos fazem parte da arquitetura proposta para a solução e não significam que todos estejam implementados integralmente no protótipo frontend.

---

## 📁 Estrutura do Projeto

Estrutura simplificada:

```text
sistema-locacao-automoveis/
│
├── public/
│
├── src/
│   ├── main.jsx
│   └── style.css
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

---

## 🎓 Finalidade Acadêmica

Este projeto foi desenvolvido para demonstrar, de forma prática, a aplicação de conceitos de:

- Arquitetura de Software;
- Engenharia de Software;
- Requisitos funcionais e não funcionais;
- UML;
- Desenvolvimento de interfaces;
- Organização de sistemas;
- Segurança;
- Integração entre componentes;
- Modelagem de sistemas.

---

## ⚠️ Observação

Este repositório contém um **protótipo acadêmico**.

O objetivo principal é demonstrar a estrutura, os fluxos e as funcionalidades previstas para o sistema de locação de automóveis.

Algumas funcionalidades de uma aplicação comercial real, como banco de dados persistente, autenticação completa, gateway de pagamento real e infraestrutura de alta disponibilidade, fazem parte da arquitetura proposta e não estão implementadas integralmente neste protótipo.

---

## 👩‍💻 Autora

**Charlene Costa**

Projeto acadêmico — **FAETERJ Paracambi — ADS — 2026**
