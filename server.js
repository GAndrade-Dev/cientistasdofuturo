const express = require('express');
const http = require('http');nast
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

// ESTRUTURA COMPLETA DAS 6 PERGUNTAS E REVELAÇÕES
const perguntas = [
  {
    numero: 1,
    pergunta: "Antes dos computadores modernos existirem, como a NASA descobria o caminho exato e a hora certa para lançar os foguetes e trazer os astronautas de volta para a Terra?",
    opcoes: {
      a: "A) Os próprios astronautas calculavam tudo de olho durante o voo.",
      b: "B) Uma equipe de matemáticas calculava todas as rotas e equações no papel, à mão.",
      c: "C) Eles usavam tabelas de mapas antigos e faziam apenas um palpite.",
      d: "D) Os foguetes seguiam bússolas mecânicas sem precisar de cálculos antes do lançamento."
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
    numero: 2,
    pergunta: "Os primeiros computadores só entendiam uma linguagem feita de números (0 e 1). O que foi inventado para que os programadores pudessem escrever comandos usando palavras simples e fáceis de entender?",
    opcoes: {
      a: "A) Telas sensíveis ao toque que adivinham o que a gente quer digitar.",
      b: "B) Programas tradutores que transformam palavras em códigos que a máquina entende.",
      c: "C) Robôs que escutam a voz do programador e fazem o trabalho sozinhos.",
      d: "D) Cabos de internet mais rápidos para enviar as informações."
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
    numero: 3,
    pergunta: "Em 1969, a poucos minutos de pousar na Lua, o computador da missão Apollo 11 travou porque recebeu muitas informações ao mesmo tempo. A missão não foi cancelada porque o programa do computador foi feito para:",
    opcoes: {
      a: "A) Apagar todas as fotos antigas para liberar espaço na memória.",
      b: "B) Passar o controle da nave para os astronautas pilotarem sozinhos.",
      c: "C) Focar apenas nas tarefas mais importantes do pouso e ignorar as secundárias.",
      d: "D) Desligar e reiniciar o sistema do zero em poucos segundos."
    },
    correta: "c",
    cientista: {
      nome: "Margaret Hamilton",
      cargo: "Diretora da Divisão de Engenharia de Software do Laboratório de Instrumentação do MIT",
      imagem: "/img/margaret.jpg",
      explicacao: "Liderou a criação do software de bordo da Apollo. Seu conceito inovador de arquitetura assíncrona e priorização de tarefas evitou o travamento do computador e salvou o pouso lunar histórico!"
    }
  },
  {
    numero: 4,
    pergunta: "Como o sinal de rádio demora minutos para ir da Terra até Marte, o que o robô Perseverance faz quando encontra uma pedra no caminho?",
    opcoes: {
      a: "A) Para e espera o sinal do controle na Terra mandando desviar.",
      b: "B) Usa o seu próprio programa de computador para desviar sozinho.",
      c: "C) Dá a ré até achar um sinal de Wi-Fi melhor.",
      d: "D) Tira uma foto da pedra e espera o dia seguinte para andar."
    },
    correta: "b",
    cientista: {
      nome: "Vandi Verma",
      cargo: "Engenheira de Robótica Espacial do JPL / NASA",
      imagem: "/img/vandi.jpg",
      explicacao: "Desenvolve os sistemas de inteligência artificial e navegação autônoma dos rovers de Marte, permitindo que robôs como o Perseverance naveguem e tomem decisões de desvio sozinhos no solo marciano!"
    }
  },
  {
    numero: 5,
    pergunta: "O INPE (Instituto Nacional de Pesquisas Espaciais), no Brasil, usa satélites para observar a Floresta Amazônica lá do espaço. Como esses satélites conseguem descobrir onde está acontecendo um desmatamento ou uma queimada no meio da mata fechada?",
    opcoes: {
      a: "A) Tirando fotos diárias da floresta e usando programas de computador para comparar o que mudou na vegetação.",
      b: "B) Mandando robôs terrestres para andarem no meio da mata procurando fumaça.",
      c: "C) Medindo o calor da floresta usando o sinal de Wi-Fi dos celulares da região.",
      d: "D) Esperando os animais da floresta fazerem barulho para o satélite escutar o som."
    },
    correta: "a",
    cientista: {
      nome: "INPE - Instituto Nacional de Pesquisas Espaciais",
      cargo: "Instituição de Pesquisa do Governo Brasileiro",
      imagem: "/img/inpe.jpg",
      explicacao: "O INPE usa satélites (como o Amazônia 1) que tiram fotos do espaço e softwares de computador para comparar as imagens da vegetação em tempo real. Se o verde da mata sumir ou houver calor, o sistema emite um alerta imediato para proteger a floresta!"
    }
  },
  {
    numero: 6,
    pergunta: "Para descobrir a posição exata de um celular utilizando um sistema chamado GPS (que envolve descobrir a localização real por satélite), o que é preciso levar em consideração:",
    opcoes: {
      a: "A) O formato real e irregular da Terra e as variações da sua gravidade.",
      b: "B) A distância exata entre a Terra e a Lua a cada segundo.",
      c: "C) A quantidade de nuvens no céu no local onde a pessoa está.",
      d: "D) O cansaço do sinal de luz provocado pelo giro do centro da Terra."
    },
    correta: "a",
    cientista: {
      nome: "Gladys West",
      cargo: "Matemática e Programadora da Marinha dos EUA",
      imagem: "/img/gladys.jpg",
      explicacao: "Programou os supercomputadores da Marinha para processar altimetria por satélite, gerando o modelo matemático ultrapreciso do geoide terrestre que é a base dos sistemas de GPS e navegação modernos!"
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

const PORT = process.env.PORT || 3000;

http.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});