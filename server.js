const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

// ESTRUTURA COMPLETA DAS 8 PERGUNTAS E REVELAÇÕES
const perguntas = [
  {
    numero: 1,
    pergunta: "Em 1969, a minutos do pouso lunar da Apollo 11, o computador de bordo ficou sobrecarregado por sinais desnecessários de um radar. O software evitou o cancelamento da missão porque foi projetado para:",
    opcoes: {
      a: "A) Desligar o computador e reiniciar em poucos segundos.",
      b: "B) Priorizar as tarefas vitais para o pouso e ignorar os processos secundários.",
      c: "C) Assumir o controle manual da nave automaticamente.",
      d: "D) Transmitir os dados de erro para o controle em terra e aguardar uma atualização de código em tempo real."
    },
    correta: "b",
    cientista: {
      nome: "Margaret Hamilton",
      cargo: "Diretora da Divisão de Engenharia de Software do Laboratório de Instrumentação do MIT",
      imagem: "/img/margaret.jpg",
      explicacao: "Liderou a criação do software de bordo da Apollo. Seu conceito inovador de arquitetura assíncrona e priorização de tarefas evitou o travamento do computador e salvou o pouso lunar histórico!"
    }
  },
  {
    numero: 2,
    pergunta: "Para que os Sistemas Globais de Navegação por Satélite (como o GPS americano ou o Galileo europeu) consigam calcular a posição exata de um receptor na Terra, o que o computador precisa considerar?",
    opcoes: {
      a: "A) O formato geodésico exato da Terra e suas variações gravitacionais.",
      b: "B) A distância entre a Terra e a Lua a cada segundo.",
      c: "C) A quantidade de nuvens na atmosfera sobre o receptor.",
      d: "D) A variação da velocidade da luz provocada pela rotação do núcleo terrestre."
    },
    correta: "a",
    cientista: {
      nome: "Gladys West",
      cargo: "Matemática e Programadora da Marinha dos EUA",
      imagem: "/img/gladys.jpg",
      explicacao: "Programou os supercomputadores da Marinha para processar altimetria por satélite, gerando o modelo matemático ultrapreciso do geoide terrestre que é a base dos sistemas de GPS e navegação modernos!"
    }
  },
  {
    numero: 3,
    pergunta: "Antes do uso generalizado de computadores eletrônicos para navegação em tempo real, como a NASA calculava com precisão as janelas de lançamento e as trajetórias de reentrada das cápsulas espaciais?",
    opcoes: {
      a: "A) Os astronautas calculavam visualmente durante o voo.",
      b: "B) Uma equipe de matemáticas calculava as equações de mecânica celeste manualmente.",
      c: "C) Os cálculos eram estimados por aproximações de tabelas astronômicas antigas.",
      d: "D) A trajetória era corrigida automaticamente por giroscópios mecânicos sem necessidade de cálculo prévio."
    },
    correta: "b",
    cientista: {
      nome: "Katherine Johnson",
      cargo: "Matemática e Física da NASA",
      imagem: "/img/katherine.jpg",
      explicacao: "Seus cálculos manuais de geometria analítica e mecânica orbital determinaram com precisão absoluta as trajetórias das missões Mercury e o encontro orbital entre o Módulo Lunar e o Módulo de Comando na missão Apollo!"
    }
  },
  {
    numero: 4,
    pergunta: "Os primeiros computadores executavam apenas código em linguagem de máquina (instruções numéricas diretas). Qual inovação desenvolvida para facilitar a programação permitiu criar linguagens de alto nível usadas na robótica?",
    opcoes: {
      a: "A) A criação de telas sensíveis ao toque.",
      b: "B) O desenvolvimento do Compilador, que traduz linguagens baseadas em palavras para código de máquina.",
      c: "C) O invento dos circuitos integrados resistentes à radiação.",
      d: "D) A substituição das válvulas por transistores de efeito de campo na memória RAM."
    },
    correta: "b",
    cientista: {
      nome: "Grace Hopper",
      cargo: "Cientista da Computação e Almirante da Marinha dos EUA",
      imagem: "/img/grace.jpg",
      explicacao: "Pioneira na computação, criou o primeiro compilador da história (A-0) e idealizou as linguagens de programação baseadas em palavras (origem do COBOL). Também documentou o primeiro 'bug' físico registrado em 1947!"
    }
  },
  {
    numero: 5,
    pergunta: "Um buraco negro supermassivo não pode ser fotografado diretamente com uma única lente, pois exigiria um telescópio do tamanho da Terra. Como a equipe do Event Horizon Telescope gerou a primeira imagem do buraco negro M87* em 2019?",
    opcoes: {
      a: "A) Enviando uma sonda espacial para fotografá-lo de perto.",
      b: "B) Utilizando um algoritmo para reconstruir imagens a partir de dados combinados de vários radiotelescópios pelo mundo.",
      c: "C) Usando inteligência artificial para gerar uma ilustração baseada em teorias."
    },
    correta: "b",
    cientista: {
      nome: "Katie Bouman",
      cargo: "Professora e Cientista da Computação",
      imagem: "/img/katie.jpg",
      explicacao: "Liderou o desenvolvimento do algoritmo CHIRP (Continuous High-resolution Image Reconstruction from Prompt Transformation), essencial para processar terabytes de dados e reconstruir a histórica primeira imagem de um buraco negro!"
    }
  },
  {
    numero: 6,
    pergunta: "A atmosfera terrestre distorce a luz das estrelas e bloqueia certas frequências de radiação. Qual foi a solução técnica projetada para obter imagens astronômicas nítidas no óptico e ultravioleta?",
    opcoes: {
      a: "A) Construir telescópios dentro de câmaras de vácuo nas montanhas.",
      b: "B) Colocar um observatório óptico em órbita baixa ao redor da Terra, acima da atmosfera.",
      c: "C) Usar lasers gigantes para dissipar a umidade do ar sobre os observatórios."
    },
    correta: "b",
    cientista: {
      nome: "Nancy Grace Roman",
      cargo: "Primeira Executiva-Chefe de Astronomia da NASA",
      imagem: "/img/nancy.jpg",
      explicacao: "Conhecida como a 'Mãe do Hubble', idealizou e estruturou todo o programa do Telescópio Espacial Hubble, convencendo o Congresso americano a financiar a missão que revolucionou a astronomia moderna!"
    }
  },
  {
    numero: 7,
    pergunta: "Para enviar dados entre satélites e estações terrenas sem que o sinal seja interceptado ou sofrer interferência de outras redes, qual princípio de transmissão de rádio é utilizado?",
    opcoes: {
      a: "A) Transmissão por pulsos de luz infravermelha em linha reta contínua.",
      b: "B) Uso de uma única frequência fixa de ondas curtas amadoras.",
      c: "C) Salto de frequência (Frequency Hopping), alternando os canais de transmissão em código sincronizado.",
      d: "D) Amplificação de sinal via cabos submarinos direcionais."
    },
    correta: "c",
    cientista: {
      nome: "Hedy Lamarr",
      cargo: "Inventora e Atriz",
      imagem: "/img/hedy.jpg",
      explicacao: "Co-patenteou o sistema de comunicação por salto de frequência na Segunda Guerra Mundial. Essa invenção serve como base fundamental para as tecnologias Wi-Fi, Bluetooth e redes de satélites criptografadas de hoje!"
    }
  },
  {
    numero: 8,
    pergunta: "Como o sinal de rádio demora minutos para ir da Terra até Marte, o que o robô Perseverance precisa fazer quando encontra uma pedra no caminho?",
    opcoes: {
      a: "A) Esperar a equipe do INPE mandar o comando de desviar.",
      b: "B) Usar o seu próprio programa de computador para desviar sozinho.",
      c: "C) Dar a ré até o sinal de Wi-Fi voltar.",
      d: "D) Buzinar para a pedra sair do caminho."
    },
    correta: "b",
    cientista: {
      nome: "Vandi Verma",
      cargo: "Engenheira de Robótica Espacial do JPL / NASA",
      imagem: "/img/vandi.jpg",
      explicacao: "Desenvolve os sistemas de inteligência artificial e navegação autônoma dos rovers de Marte, permitindo que robôs como o Perseverance naveguem e tomem decisões de desvio sozinhos no solo marciano!"
    }
  }
];

let jogadores = {};
let respostasPerguntaAtual = { a: 0, b: 0, c: 0, d: 0, total: 0 };
let perguntaAtualNum = 1;

io.on('connection', (socket) => {
  io.emit('atualizar_jogadores', Object.keys(jogadores).length);

  socket.on('novo_jogador', (nome) => {
    jogadores[socket.id] = { nome: nome, pontos: 0, sonho: "" };
    io.emit('atualizar_jogadores', Object.keys(jogadores).length);
  });

  socket.on('solicitar_pergunta', (num) => {
    perguntaAtualNum = num;
    respostasPerguntaAtual = { a: 0, b: 0, c: 0, d: 0, total: 0 };
    const p = perguntas[num - 1];
    
    if (p) {
      socket.emit('dados_pergunta', { ...p, totalPerguntas: perguntas.length });
      io.emit('receber_pergunta', {
        numero: p.numero,
        totalPerguntas: perguntas.length
      });
      io.emit('atualizar_votos', respostasPerguntaAtual);
    }
  });

  socket.on('enviar_resposta', (dados) => {
    const resp = dados.resposta.toLowerCase();
    if (respostasPerguntaAtual[resp] !== undefined) {
      respostasPerguntaAtual[resp]++;
      respostasPerguntaAtual.total++;
      
      if (jogadores[socket.id]) {
        const p = perguntas[perguntaAtualNum - 1];
        if (p && resp === p.correta) {
          jogadores[socket.id].pontos += 10;
        }
      }

      io.emit('atualizar_votos', respostasPerguntaAtual);
    }
  });

  socket.on('revelar_resposta_servidor', (num) => {
    const p = perguntas[num - 1];
    if (p) {
      io.emit('mostrar_revelacao', { ...p, totalPerguntas: perguntas.length });
    }
  });

  socket.on('solicitar_ranking', () => {
    const listaJogadores = Object.values(jogadores);
    listaJogadores.sort((a, b) => b.pontos - a.pontos);
    
    io.emit('exibir_ranking_projetor', listaJogadores);
  });

  socket.on('enviar_sonho', (dados) => {
    if (jogadores[socket.id]) {
      jogadores[socket.id].sonho = dados.sonho;
    }
    
    const listaSonhos = Object.values(jogadores)
      .filter(j => j.sonho)
      .map(j => ({ nome: j.nome, sonho: j.sonho }));

    io.emit('atualizar_mural_completo', listaSonhos);
  });

  // DISPARA A TELA DA PRIMEIRA LINHA DE CÓDIGO
  socket.on('iniciar_desafio_codigo', () => {
    io.emit('abrir_tela_codigo');
  });

  // RECEBE O EXECUTAR CÓDIGO DA CRIANÇA E MANDA PRO TERMINAL DO PROJETOR
  socket.on('executou_codigo', (dados) => {
    io.emit('codigo_executado_projetor', dados);
  });

  socket.on('disconnect', () => {
    delete jogadores[socket.id];
    io.emit('atualizar_jogadores', Object.keys(jogadores).length);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});