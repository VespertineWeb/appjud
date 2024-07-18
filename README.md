Para atualizar o arquivo `README.md` do seu projeto, aqui está um exemplo detalhado que inclui todas as etapas necessárias para configurar e executar o projeto, bem como informações sobre as dependências e as variáveis de ambiente necessárias.

```markdown
# AppJud

AppJud é uma aplicação para gerenciamento de processos judiciais, com cadastro de clientes e advogados, e verificação automática de atualizações nos processos em diversos tribunais brasileiros.

## Requisitos

- Node.js (versão 14 ou superior)
- MongoDB
- Conta no SendPulse para envio de notificações via WhatsApp

## Configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/afchristiann/appjud.git
cd appjud
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```env
MONGODB_URI=your_mongodb_uri
SENDPULSE_USER_ID=your_sendpulse_user_id
SENDPULSE_SECRET=your_sendpulse_secret
SENDPULSE_TOKEN_STORAGE=your_sendpulse_token_storage
```

### 4. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

```
/models
  - Client.js
  - Process.js
  - Advocate.js
/pages
  /api
    - check-processes.js
/utils
  - dbConnect.js
  - sendNotification.js
  - checkUpdates.js
  - endpoints.js
```

## Configuração no Vercel

### 1. Configurar variáveis de ambiente no Vercel

Certifique-se de adicionar as mesmas variáveis de ambiente configuradas no `.env.local` no painel de configuração do seu projeto no Vercel:

- `MONGODB_URI`
- `SENDPULSE_USER_ID`
- `SENDPULSE_SECRET`
- `SENDPULSE_TOKEN_STORAGE`

### 2. Fazer deploy

Após configurar as variáveis de ambiente, você pode fazer o deploy do projeto no Vercel.

## Endpoints da API

### Cadastro de Clientes

- **URL:** `/api/clients`
- **Método:** `POST`
- **Dados do Corpo:** `{ name: String, phone: String, caseNumber: String }`

### Cadastro de Advogados

- **URL:** `/api/advocates`
- **Método:** `POST`
- **Dados do Corpo:** `{ name: String, phone: String, clients: Array }`

### Verificação de Processos

- **URL:** `/api/check-processes`
- **Método:** `GET`

## Lógica de Verificação de Processos

A lógica de verificação de processos está implementada em `utils/checkUpdates.js`. Este arquivo verifica atualizações nos processos em vários tribunais utilizando as APIs listadas em `utils/endpoints.js`.

## Envio de Notificações

As notificações são enviadas via WhatsApp utilizando a API do SendPulse. A lógica de envio está implementada em `utils/sendNotification.js`.

## Licença

Este projeto está licenciado sob os termos da licença MIT.
```

Este `README.md` fornece um guia completo para configurar e executar o seu projeto, incluindo a configuração de variáveis de ambiente, estrutura do projeto, endpoints da API, e lógica de verificação de processos e envio de notificações. Certifique-se de substituir os placeholders pelas suas informações reais.