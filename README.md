# bookSharing
Projeto de Aplicação Full Stack para compartilhamento de livros.

## Configuração


### Backend

A API da aplicação é configurada por um arquivo dentro de ```/backend/config/``` chamado ```config.json```, com ma seguinte estrutura:

```json
{
  "username": "{USER}",
  "password": "{PASS}",
  "database": "{DB}",
  "host": "{HOST}",
  "dialect": "{DIALECT}",
  "SECRET": "{SECRET}"
}
```

```"{USER}"```: Seu usuário do banco de dados
```"{PASS}"```: Sua senha do banco de dados
```"{DB}"```: Nome da base de dados a ser criada
```"{HOST}"```: Endereço do host onde a base de dados será alocada
```"{DIALECT}"```: Dialeto da base de dados (MySql, SQLite, MSSQL)
```"{SECRET}"```: String aleatória para autenticação JWT
