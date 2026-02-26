🚀 Como rodar o projeto localmente
1️⃣ Pré-requisitos

Node.js >= 20

npm ou yarn

Docker e Docker Compose

2️⃣ Clonar o repositório

```bash
git clone <url-do-repositorio>
```

3️⃣ Configurar variáveis de ambiente do frontend e backend

Crie um arquivo:

.env

Baseie-se no template abaixo (ver seção "Variáveis de Ambiente").

4️⃣ Rodar com Docker (recomendado)

```bash
docker compose up --build -d
```

O front-end ficará disponível em:

http://localhost:3001

A API ficará disponível em:

http://localhost:3000

---

🧪 Rodar testes
Testes unitários e integração

```bash
npm run test
```

Testes de integração

```bash
npm run test:int
```

---

### Variáveis de Ambiente

##### Backend

```bash
# App
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=nestdb

# Gemini
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

##### Frontend

```bash
# App
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

#### Arquitetura da aplicação

A aplicação segue o padrão arquitetura modular do NestJS, com separação clara entre camadas:

```bash
Controller → Responsável por receber requisições HTTP.

Service → Contém a lógica de negócio.

Repository (TypeORM) → Responsável pela persistência no banco.

AI Service (Gemini) → Serviço isolado responsável por integração com a API da IA.
```

Fluxo simplificado:

Client → ReportsController → ReportsService → TypeORM Repository | PostgreSQL → GeminiService | Google Gemini API

---

##### Principais decisões arquiteturais

- Uso de TypeORM para abstração de persistência.

- Separação do serviço de IA em módulo próprio (baixo acoplamento).

- Tratamento resiliente de falhas da IA (relatório é salvo mesmo se a análise falhar).

- Testes unitários para lógica isolada.

- Testes de integração com SQLite in-memory para validação de persistência.
