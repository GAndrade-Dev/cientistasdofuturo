# Quiz Interativo: Cientistas do Futuro (INPE)
Sistema web interativo desenvolvido para a oficina pedagógica do INPE vltada para crianças (5° ao 7°ano). O objetivo é promover o engajamento com a tecnologia e destacar o protagonismo feminino na ciência através de gamificação e comunicação em tempo real.

## Tecnologias Utilizadas
Node.js (Ambiente de execução backend)
Express (Servidor HTTP e rotas estáticas)
Socket.io (Comunicação bidirecional via WebSocket em tempo real)
HTML5 / CSS3 / JavaScript Vanilla (Frontend reponsivo para celular e pojetor)

## Estrutura do Projeto

cientistasdofuturo/
├── public/
│   ├── img/            # Fotos das cientistas em alta resolução
│   ├── index.html      # Interface do celular (Alunos/Crianças)
│   └── projetor.html   # Painel da Palestrante (Projetor/Telão)
├── package.json        # Dependências e scripts do Node.js
├── README.md           # Documentação do repositório
└── server.js           # Servidor backend e lógica de pontuação/WebSocket

## Como executar o rojeto localmente

## Pré-requisitos
Certifique-se de te o [Node.js](https://nodejs.org) instalado em sua maquina.

### Passo a passo

1. Clonar o Repositório: 

git clone [https://githu.com/SEU_USUARIO/cientistasdofuturo.git](https://github.com/SEU_USUARIO/cientistasdofuturo.git)
cd cientistasdofuturo

2. Instalar as dependencias:

npm install

3. Iniciar o servidor: 

node server.js

4. Acessar as aplicações no navegador:

Tela do projetor (Palestrante): http://localhost:3000/projetor.html
Tela do celula (alunos): http://localhost:3000

## Fluxo da oficina

1. Acesso: As crianças acessam a aplicação pelo celular (via IP local ou link).

2. Quiz Gamificado: Respondem a 8 perguntas sobre tecnologia e conectividade do dia a dia.

3. Protagonismo Feminino: A cada pergunta, o projetor revela a trajetória da cientista correspondente em tela única.

4. Mural de Sonhos & Pódio: Ao final, o projetor exibe o pódio (1º, 2º e 3º lugar por acerto/velocidade) e o mural com os sonhos das crianças.

5. Certificado Digital: Cada aluno recebe na tela do celular o Certificado Oficial de Mérito do INPE.