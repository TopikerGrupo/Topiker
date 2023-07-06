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
- Bootstrap
- Tailwind
- Jquery 3.5.1
- Animate 4.1.1

## Instalação e configuração na sua máquina

- Faça o clone deste repositório: `git clone`
- Certifique-se de ter o Node.js 18.5 instalados em sua máquina.
- Após subir o banco de dados com sucesso, execute `npx prisma migrate dev` para preparar o banco de dados.
- Por fim, execute `npm run start:dev` para subir a aplicação em modo de desenvolvimento.

## Endpoints

Alguns dos endpoints oferecidos pela API:

54.89.40.174/routes/list Requisição http do tipo get ->Mosta a lista de rotas.

54.89.40.174/routes/show/:id Requisição do tipo get que recebe os parametros do ID ->Mostra os valores de cada coluna no banco de dados.

54.89.40.174/routes/create Requisição do tipo post ->Usada para criar uma nova rota

54.89.40.174/routes/update/:id Requisição do tipo put ->Atualiza um parametro da rota

54.89.40.174/routes/delete Requisição do tipo delete ->Utilizada para apagar uma rota

54.89.40.174/users/list Requisição http do tipo get ->Mosta a lista de usuários.

54.89.40.174/users/show/:id Requisição do tipo get que recebe os parametros do ID->Mostra os valores de cada coluna no banco de dados.

54.89.40.174/users/create Requisição do tipo post ->Usada para criar um novo usuario.

54.89.40.174/users/update/:id Requisição do tipo put ->Atualiza um parametro do usuário.

54.89.40.174/users/delete Requisição do tipo delete ->Utilizado para apagar um usuário.

54.89.40.174/topics/list Requisição http do tipo get ->Mosta a lista de topics.

54.89.40.174/topics/show/:id Requisição do tipo get que recebe os parametros do ID ->Mostra os valores de cada coluna no banco de dados.

54.89.40.174/topics/create Requisição do tipo post ->Usada para criar uma nova topic.

54.89.40.174/topics/update/:id Requisição do tipo put ->Atualiza um parametro da topic.

54.89.40.174/topics/delete Requisição do tipo delete ->Apaga uma topic.

54.89.40.174/viagem Requisição do tipo get ->Usado para calcular o valor da viagem.


## Autenticação

A API utiliza autenticação por token. Para acessar os endpoints que requerem autenticação, é necessário enviar um token de acesso válido no header Authorization da requisição. O token pode ser obtido através do endpoint /sessions.

## Licença

Esse projeto é licenciado pela licença MIT.


