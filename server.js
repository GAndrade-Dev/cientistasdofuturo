const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

// BANCO DE DADOS EXPANDIDO (8 PERGUNTAS COM PROTAGONISMO FEMININO)
const quizData = [
  {
    id: 1,
    pergunta: "Quando a família usa o GPS para ir à praia ou ao shopping, como o celular sabe exatamente onde a gente está?",
    opcoes: {
      A: "O celular adivinha pelo Wi-Fi da rua.",
      B: "Ele conversa com satélites no espaço que calculam a posição.",
      C: "Tem uma pessoa digitando o mapa ao vivo.",
      D: "Ele segue a luz do sol para saber o caminho."
    },
    correta: "B",
    explicacao: "O GPS recebe sinais invisíveis emitidos por satélites em órbita ao redor da Terra para calcular sua localização exata em segundos!",
    cientista: {
      nome: "Gladys West",
      cargo: "Matemática e Programadora de Satélites",
      foto: "/img/gladys.jpg",
      conquista: "Desenvolveu os modelos matemáticos do formato da Terra que tornaram a tecnologia do GPS possível!",
      historia: "Gladys cresceu em uma área rural e trabalhou duro para conseguir uma bolsa de estudos em matemática. Ela programou os supercomputadores da Marinha dos EUA para modelar o planeta Terra com precisão milimétrica!"
    }
  },
  {
    id: 2,
    pergunta: "Quem foi a primeira pessoa na história da humanidade a escrever um código de computador?",
    opcoes: {
      A: "Albert Einstein.",
      B: "Ada Lovelace, uma mulher matemática no século XIX.",
      C: "Os criadores do aplicativo TikTok.",
      D: "Um robô construído no Japão."
    },
    correta: "B",
    explicacao: "Antes mesmo de existirem computadores elétricos, Ada escreveu o primeiro programa em 1843!",
    cientista: {
      nome: "Ada Lovelace",
      cargo: "A Primeira Programadora da História",
      foto: "/img/ada.jpg",
      conquista: "Criou o primeiro algoritmo que podia ser processado por uma máquina mecânica.",
      historia: "Ada era apaixonada por matemática e poesia. Ela percebeu que as máquinas do futuro não serviriam só para fazer contas, mas também para criar música, arte e processar qualquer tipo de informação!"
    }
  },
  {
    id: 3,
    pergunta: "Quando você assiste a um vídeo no YouTube ou TikTok, como ele chega tão rápido na sua tela?",
    opcoes: {
      A: "O vídeo vem voando pelo ar direto das estrelas.",
      B: "É quebrado em pedacinhos de dados e viaja por cabos e antenas.",
      C: "O celular já guarda todos os vídeos gravados.",
      D: "Viaja nas ondas de rádio dos carros."
    },
    correta: "B",
    explicacao: "Tudo na internet vira código binário (0 e 1) e viaja por redes de computadores em milissegundos!",
    cientista: {
      nome: "Radia Perlman",
      cargo: "Engenheira de Redes de Computadores",
      foto: "/img/radia.jpg",
      conquista: "Inventou o algoritmo Spanning Tree Protocol (STP), essencial para o funcionamento da Internet.",
      historia: "Conhecida como a 'Mãe da Internet', Radia criou as regras que permitem que bilhões de computadores se conectem sem que a rede fique congestionada ou caia!"
    }
  },
  {
    id: 4,
    pergunta: "Como os cientistas do INPE conseguem avisar que vai chover forte antes mesmo das nuvens chegarem?",
    opcoes: {
      A: "Chacoalhando um copo de água.",
      B: "Satélites tiram fotos do clima e supercomputadores analisam.",
      C: "Usando um aplicativo de adivinhação.",
      D: "Aviões avisam pelo rádio ao ver nuvens."
    },
    correta: "B",
    explicacao: "Satélites ambientais fotografam a Terra continuamente e supercomputadores do INPE analisam os dados em tempo real!",
    cientista: {
      nome: "Cientistas e Pesquisadoras do INPE",
      cargo: "Engenheiras de Software, Dados e Ciências Espaciais",
      foto: "/img/inpe.jpg",
      conquista: "Desenvolvem softwares e analisam imagens de satélite para proteger florestas, rios e prever o tempo no Brasil.",
      historia: "No INPE (Instituto Nacional de Pesquisas Espaciais), muitas mulheres trabalham todos os dias desenvolvendo código, analisando a Amazônia e operando satélites para ajudar a cuidar do nosso país!"
    }
  },
  {
    id: 5,
    pergunta: "O que uma pessoa precisa ter para conseguir criar aplicativos e jogos de computador?",
    opcoes: {
      A: "Ser um gênio super-raro de matemática.",
      B: "Ter um computador banhado a ouro.",
      C: "Curiosidade, vontade de resolver problemas e praticar lógica.",
      D: "Ser homem e adulto com mais de 30 anos."
    },
    correta: "C",
    explicacao: "Programar é sobre gostar de criar coisas, ser curioso(a) e praticar a lógica como em um jogo de quebra-cabeça!",
    cientista: {
      nome: "Margaret Hamilton",
      cargo: "Diretora de Engenharia de Software da NASA",
      foto: "/img/margaret.jpg",
      conquista: "Liderou a equipe que desenvolveu o código de bordo da missão Apollo 11, que levou o homem à Lua!",
      historia: "Margaret criou o próprio termo 'Engenharia de Software'. O programa que ela escreveu era tão bem feito que salvou a nave espacial Apollo de um travamento minutos antes de pousar na Lua em 1969!"
    }
  },
  {
    id: 6,
    pergunta: "Quando você joga no celular, videogame ou computador, como a personagem atende exatamente quando você aperta o botão?",
    opcoes: {
      A: "Uma pessoa fica olhando pela câmera e movendo a imagem.",
      B: "É um código de lógica e física digitado por programadores.",
      C: "O jogo lê o pensamento de quem está jogando.",
      D: "O videogame aprende os movimentos olhando para a tela."
    },
    correta: "B",
    explicacao: "O código do jogo calcula os movimentos, gravidade e colisões centenas de vezes por segundo!",
    cientista: {
      nome: "Carol Shaw",
      cargo: "Primeira Designer e Programadora de Jogos",
      foto: "/img/carol.jpg",
      conquista: "Criou jogos clássicos para Atari e abriu caminhos para toda a indústria moderna de videogames!",
      historia: "Carol Shaw adorava matemática e computadores desde criança. Ela se tornou a primeira mulher a programar jogos de videogame profissionais na história!"
    }
  },
  {
    id: 7,
    pergunta: "Como os fones sem fio, controles de videogame e o Wi-Fi da escola enviam dados e música sem nenhum fio conectado?",
    opcoes: {
      A: "Usam pequenos espelhos que refletem a luz do teto.",
      B: "Usam ondas de rádio invisíveis codificadas com matemática.",
      C: "O som viaja pelo vento até o fone.",
      D: "O aparelho guarda a música inteira antes mesmo de ligar."
    },
    correta: "B",
    explicacao: "As informações viajam em ondas eletromagnéticas invisíveis pelo ar e o fone decodifica em som na hora!",
    cientista: {
      nome: "Hedy Lamarr",
      cargo: "Inventora e Atriz",
      foto: "/img/hedy.jpg",
      conquista: "Co-inventou a tecnologia de salto de frequência de rádio, que é a base direta do Wi-Fi e Bluetooth de hoje!",
      historia: "Além de uma famosa atriz de Hollywood, Hedy era uma inventora genial. Sua invenção de comunicação secreta via rádio permitiu a criação das conexões sem fio modernas!"
    }
  },
  {
    id: 8,
    pergunta: "Quando conversamos com assistentes virtuais ou IA e elas respondem como humanos, como elas aprendem a falar?",
    opcoes: {
      A: "Tem um humano escondido no servidor respondendo mensagens.",
      B: "Elas leem dicionários de papel enquanto estamos dormindo.",
      C: "Cientistas treinam algoritmos com milhões de dados e conversas humanas.",
      D: "As assistentes adivinham as palavras por sorteio."
    },
    correta: "C",
    explicacao: "Modelos de Inteligência Artificial aprendem padrões matemáticos analisando enormes conjuntos de dados fornecidos por cientistas!",
    cientista: {
      nome: "Fei-Fei Li",
      cargo: "Cientista de Computação e Especialista em IA",
      foto: "/img/feifei.jpg",
      conquista: "Criou o ImageNet, o maior banco de dados que ensinou os computadores a enxergarem e entenderem imagens!",
      historia: "Fei-Fei Li revolucionou a Inteligência Artificial ao perceber que os computadores precisavam de milhões de exemplos visuais para aprender a reconhecer o mundo como os humanos!"
    }
  }
];

// ESTADO DO JOGO E PONTUAÇÃO
let estadoJogo = {
  jogadores: {}, // { socketId: { apelido: 'Nome', pontos: 0 } }
  perguntaIndice: -1,
  fase: 'LOGIN',
  votos: { A: 0, B: 0, C: 0, D: 0 },
  votosJogadores: {},
  tempoInicioPergunta: 0,
  sonhos: [] // [{ apelido: 'Nome', sonho: 'Texto' }]
};

io.on('connection', (socket) => {
  console.log('⚡ Dispositivo conectado:', socket.id);

  socket.emit('estado_atual', {
    fase: estadoJogo.fase,
    numeroPergunta: estadoJogo.perguntaIndice + 1,
    totalJogadores: Object.keys(estadoJogo.jogadores).length
  });

  socket.on('novo_jogador', (apelido) => {
    estadoJogo.jogadores[socket.id] = {
      apelido: apelido,
      pontos: 0
    };
    console.log(`👤 Jogador registrado: ${apelido}`);
    
    io.emit('atualizar_jogadores', {
      total: Object.keys(estadoJogo.jogadores).length,
      lista: Object.values(estadoJogo.jogadores).map(j => j.apelido)
    });
  });

  socket.on('enviar_resposta', (opcao) => {
    if (estadoJogo.fase === 'PERGUNTA' && !estadoJogo.votosJogadores[socket.id]) {
      estadoJogo.votosJogadores[socket.id] = opcao;
      estadoJogo.votos[opcao] = (estadoJogo.votos[opcao] || 0) + 1;

      // Calcular Pontuação baseada em Acerto + Velocidade (Tempo de resposta)
      const perguntaAtual = quizData[estadoJogo.perguntaIndice];
      if (opcao === perguntaAtual.correta && estadoJogo.jogadores[socket.id]) {
        const tempoGasto = (Date.now() - estadoJogo.tempoInicioPergunta) / 1000;
        const bônusVelocidade = Math.max(0, Math.round(100 - tempoGasto * 5));
        const pontosGanhos = 100 + bônusVelocidade;
        
        estadoJogo.jogadores[socket.id].pontos += pontosGanhos;
      }

      io.emit('atualizar_votos', estadoJogo.votos);
    }
  });

  // Receber os sonhos das crianças no final
  socket.on('enviar_sonho', (textoSonho) => {
    const jogador = estadoJogo.jogadores[socket.id];
    const apelido = jogador ? jogador.apelido : 'Cientista Anônimo';
    
    const novoSonho = { apelido: apelido, sonho: textoSonho };
    estadoJogo.sonhos.push(novoSonho);

    io.emit('novo_sonho_mural', novoSonho);
  });

  socket.on('admin_proxima_pergunta', () => {
    estadoJogo.perguntaIndice++;
    
    // Se passar das 8 perguntas, abre o Mural de Sonhos / Ranking
    if (estadoJogo.perguntaIndice >= quizData.length) {
      estadoJogo.fase = 'MURAL';
      
      // Ordena o Ranking dos 3 primeiros lugares
      const ranking = Object.values(estadoJogo.jogadores)
        .sort((a, b) => b.pontos - a.pontos)
        .slice(0, 3);

      io.emit('abrir_mural_ranking', {
        ranking: ranking,
        sonhos: estadoJogo.sonhos
      });
      return;
    }

    estadoJogo.fase = 'PERGUNTA';
    estadoJogo.votos = { A: 0, B: 0, C: 0, D: 0 };
    estadoJogo.votosJogadores = {};
    estadoJogo.tempoInicioPergunta = Date.now();

    const perguntaAtual = quizData[estadoJogo.perguntaIndice];

    console.log(`▶️ Enviando pergunta ${estadoJogo.perguntaIndice + 1}`);

    io.emit('nova_pergunta', {
      numero: estadoJogo.perguntaIndice + 1,
      totalPerguntas: quizData.length,
      perguntaTexto: perguntaAtual.pergunta,
      opcoes: perguntaAtual.opcoes
    });
  });

  socket.on('admin_revelar_resposta', () => {
    if (estadoJogo.perguntaIndice >= 0 && estadoJogo.perguntaIndice < quizData.length) {
      estadoJogo.fase = 'REVELACAO';
      const p = quizData[estadoJogo.perguntaIndice];
      io.emit('resposta_revelada', {
        correta: p.correta,
        explicacao: p.explicacao,
        cientista: p.cientista
      });
    }
  });

  socket.on('disconnect', () => {
    delete estadoJogo.jogadores[socket.id];
    delete estadoJogo.votosJogadores[socket.id];
    io.emit('atualizar_jogadores', {
      total: Object.keys(estadoJogo.jogadores).length,
      lista: Object.values(estadoJogo.jogadores).map(j => j.apelido)
    });
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});