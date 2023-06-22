# Topiker

## Documentação da API backend

A parte do backend do projeto, foi utlizado:

- Node.js 18.15.0
- TypeScript
- Zod 3.21.4
- Prisma 4.15.0
- bcrypt 5.1.0
- Express 4.18.2

## Documentação do frontend
Na parte da interface, no frontend foi utilizado:

- JavaScritp
- CSS
- HTML

## Instalação e configuração na sua máquina

- Faça o clone deste repositório: `git clone`
- Certifique-se de ter o Node.js 18.5 instalados em sua máquina.
- Após subir o banco de dados com sucesso, execute `npx prisma migrate dev` para preparar o banco de dados.
- Por fim, execute `npm run start:dev` para subir a aplicação em modo de desenvolvimento.

## Endpoints

Alguns dos endpoints oferecidos pela API

## Autenticação

A API utiliza autenticação por token. Para acessar os endpoints que requerem autenticação, é necessário enviar um token de acesso válido no header Authorization da requisição. O token pode ser obtido através do endpoint /sessions.

## Licença

Esse projeto é licenciado pela licença MIT.
