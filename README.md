*Atividade 01*
Uma organização deseja simplificar o processo de gestão de participantes para seus eventos. Eles precisam de uma solução digital que permita aos participantes se cadastrarem de forma eficiente e segura, além de fornecer métricas importantes sobre o perfil dos participantes.

Desenvolva uma API que possibilite o cadastro de participantes de eventos, onde cada participante deverá fornecer informações como nome, e-mail, senha, idade e cidade onde mora. A API deve oferecer um conjunto completo de operações CRUD (Create, Read, Update, Delete) para gerenciar os participantes.
Além disso, a API deve oferecer as seguintes FUNCIONALIDADES
Selecionar um Único participante: A API deve ser capaz de selecionar um único participante
Contagem de Participantes: A API deve ser capaz de fornecer o número total de participantes cadastrados.
Contagem de Maiores de Idade: A API deve ser capaz de calcular quantos participantes têm idade igual ou superior a 18 anos.
Identificação da Cidade com Maior Número de Participantes: A API deve determinar qual cidade teve o maior número de participantes cadastrados.
Para resolver este problema, o você deverá projetar e implementar uma API

REQUISITOS FUNCIONAIS
Restrição de Idade: A API só permitirá o cadastro de participantes com idade igual ou superior a 16 anos.
Validação: Ao cadastrar ou atualizar o email não pode ser repetido. 
Esses requisitos funcionais adicionais garantem não apenas a segurança dos dados dos participantes, mas também a conformidade com regulamentações de proteção de dados e privacidade.

ROTAS PARA APLICAÇÃO
POST /participants: Rota para cadastrar um novo participante. O corpo da requisição deve incluir as informações do participante (nome, e-mail, senha, idade, cidade).
GET /participants: Rota para obter a lista de todos os participantes cadastrados.
GET /participants/{id}: Rota para obter os detalhes de um participante específico com base no seu ID.
PUT /participants/{id}: Rota para atualizar as informações de um participante específico com base no seu ID. O corpo da requisição deve incluir os dados a serem atualizados.
DELETE /participants/{id}: Rota para excluir um participante específico com base no seu ID.
GET /participants/count: Rota para contar o número total de participantes cadastrados.
GET /participants/count/over18: Rota para contar quantos participantes são maiores de 18 anos.
GET /participants/city/most: Rota para identificar a cidade com o maior número de participantes.

[
 {
  "name": "Carlos Modificado",
  "email": "carlos@wilton.com",
  "password":"123456",
  "idade": 32,
  "city": "Maceió"
 }
]