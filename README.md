# Items API

API simples com autenticação JWT e CRUD de itens

---

### Tecnologias

- Nestjs
- Prisma ORM
- PostgreSQL
- Docker

---

### Requisitos

- Node v20+
- Docker 27+
- Yarn 1.22+
- NPM 10.8+
- WSL (Windows)
- Git Bash

---

### Como rodar

- Configure seu treminal para rodar com o git bash se estiver no windows. Basta colar o seguinte código nas configurações do VScode
  ```jsx
  "terminal.integrated.profiles.windows": {
      "Git Bash": { "path": "C:\\Program Files\\Git\\bin\\bash.exe" }
    },
    "terminal.integrated.defaultProfile.windows": "Git Bash",
  ```

1. Com o Docker inciado, abra o terminal na pasta do projeto e digite `yarn docker:up && yarn prisma:pm` Para configurar o docker e atualizar as tabelas
2. Digite `yarn start:dev` para iniciar o servidor (Porta 3333)

---

### Documentação

Toda a documentação das rotas está localizada no swagger através da rota `localhost:3333/docs`

---

### Considerações

- Só é possível executar uma rota relacionada à um item se estiver logado e passando o Bearer token.
