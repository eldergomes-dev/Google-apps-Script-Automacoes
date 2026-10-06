# ⚙️ Google Apps Script & JavaScript — Automações Corporativas

> Repositório focado no desenvolvimento de automações de processos, soluções corporativas e integrações do Google Workspace (Sheets, Gmail, Docs, Drive, Slides) utilizando **Google Apps Script** e **JavaScript ES6+**.

---

## 🎯 Objetivo do Repositório

Desenvolver soluções automatizadas para dores reais do ambiente corporativo, substituindo tarefas manuais repetitivas por fluxos inteligentes, escaláveis e de alta confiabilidade.

Cada projeto dentro deste repositório adota uma arquitetura modular organizada por camadas:
- **`dados/`**: Leitura, filtros, consolidação e validação de dados (Sheets, APIs).
- **`backend/`**: Regras de negócio, lógica de processamento e chamadas de serviços nativos (`GmailApp`, `DocumentApp`, `DriveApp`).
- **`frontend/`**: Menus customizados na interface do usuário, diálogos e modais HTML.

---

## 🛠️ Tecnologias e Ferramentas

- **Google Apps Script (GAS)** — Modern V8 Runtime
- **JavaScript ES6+** — Manipulação avançada de arrays (`map`, `filter`, `reduce`), funções assíncronas e Arrow Functions
- **Google Workspace APIs** — Gmail API, Google Sheets API, Google Docs API, Google Drive API
- **Git & GitHub** — Versionamento e arquitetura de software

---

## 📥 Como Utilizar os Scripts no Google Workspace

### Para Scripts Vinculados a Planilhas/Docs (Bound Scripts)
1. Abra a planilha ou documento no Google Drive.
2. Acesse o menu **Extensões** > **Apps Script**.
3. Crie os arquivos `.gs` respeitando a separação de pastas (`dados/`, `backend/`, `frontend/`) e cole os códigos.

### Para Scripts Independentes (Standalone Scripts)
1. Acesse **[script.google.com](https://script.google.com)**.
2. Clique em **Novo projeto** e insira os códigos correspondentes.

---

## 📂 Estrutura de Módulos e Projetos

```text
Google-apps-Script-Automacoes/
│
├── .gitignore
├── README.md
│
└── 01_google_workspace_apps_script/
    └── 01_notificador_sla_gmail/
        ├── dados/
        ├── backend/
        └── frontend/

---

## 👤 Autor

**Elder Gomes da Silva Santos**  
*Desenvolvedor & Analista de Automação*  

- **GitHub:** [@eldergomes-dev](https://github.com/eldergomes-dev)
- **Email:** gomesdasilvasantoselder7@gmail.com