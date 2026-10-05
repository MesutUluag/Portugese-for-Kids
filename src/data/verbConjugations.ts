/**
 * Portuguese A1/A2 verb conjugation data.
 *
 * Structure per verb:
 *   a1.presente          — Presente do Indicativo (5 rows)
 *   a2.preteritoPerfeito — Pretérito Perfeito do Indicativo (5 rows)
 *   a2.preteritoImperfeito — Pretérito Imperfeito do Indicativo (5 rows)
 *   a2.participioPassado — Particípio Passado (single form)
 *
 * Futuro Próximo (vou/vais/vai/vamos/vão + inf) and
 * Ação Contínua (estou a / estás a / … + inf) are computed
 * at render time — no storage needed.
 *
 * Keyed by the Portuguese infinitive as it appears in words.ts.
 */

export interface ConjugationRow {
  pronoun: string;
  form: string;
}

export interface VerbConjugation {
  a1: {
    presente: ConjugationRow[];
    exPresente: string;       // e.g. "Eu nado no mar."
    exFuturo: string;         // e.g. "Eu vou nadar amanhã."
    exContinua: string;       // e.g. "Eu estou a nadar agora."
  };
  a2: {
    preteritoPerfeito: ConjugationRow[];
    preteritoImperfeito: ConjugationRow[];
    participioPassado: string;
  };
}

// Fixed pronoun labels used by every table
const P = ['Eu', 'Tu', 'Ele/Ela/Você', 'Nós', 'Eles/Elas/Vocês'] as const;

/** Helper: zip pronoun labels with conjugated forms into ConjugationRow[] */
function rows(eu: string, tu: string, ele: string, nos: string, eles: string): ConjugationRow[] {
  return [
    { pronoun: P[0], form: eu },
    { pronoun: P[1], form: tu },
    { pronoun: P[2], form: ele },
    { pronoun: P[3], form: nos },
    { pronoun: P[4], form: eles },
  ];
}

export const verbConjugations: Record<string, VerbConjugation> = {

  // ── ser ──────────────────────────────────────────────────────────────────
  ser: {
    a1: {
      presente: rows('sou', 'és', 'é', 'somos', 'são'),
      exPresente: 'Eu sou estudante.',
      exFuturo:   'Eu vou ser médico.',
      exContinua: 'Eu estou a ser honesto.',
    },
    a2: {
      preteritoPerfeito:   rows('fui',   'foste',  'foi',   'fomos',  'foram'),
      preteritoImperfeito: rows('era',   'eras',   'era',   'éramos', 'eram'),
      participioPassado: 'sido',
    },
  },

  // ── estar ─────────────────────────────────────────────────────────────────
  estar: {
    a1: {
      presente: rows('estou', 'estás', 'está', 'estamos', 'estão'),
      exPresente: 'Eu estou em casa.',
      exFuturo:   'Eu vou estar aqui.',
      exContinua: 'Eu estou a estar com amigos.',
    },
    a2: {
      preteritoPerfeito:   rows('estive',  'estiveste', 'esteve',  'estivemos', 'estiveram'),
      preteritoImperfeito: rows('estava',  'estavas',   'estava',  'estávamos', 'estavam'),
      participioPassado: 'estado',
    },
  },

  // ── ter ───────────────────────────────────────────────────────────────────
  ter: {
    a1: {
      presente: rows('tenho', 'tens', 'tem', 'temos', 'têm'),
      exPresente: 'Eu tenho um livro.',
      exFuturo:   'Eu vou ter aulas amanhã.',
      exContinua: 'Eu estou a ter problemas.',
    },
    a2: {
      preteritoPerfeito:   rows('tive',   'tiveste',  'teve',   'tivemos',  'tiveram'),
      preteritoImperfeito: rows('tinha',  'tinhas',   'tinha',  'tínhamos', 'tinham'),
      participioPassado: 'tido',
    },
  },

  // ── ir ────────────────────────────────────────────────────────────────────
  ir: {
    a1: {
      presente: rows('vou', 'vais', 'vai', 'vamos', 'vão'),
      exPresente: 'Eu vou à escola.',
      exFuturo:   'Eu vou ir ao parque.',
      exContinua: 'Eu estou a ir para casa.',
    },
    a2: {
      preteritoPerfeito:   rows('fui',   'foste',  'foi',   'fomos',  'foram'),
      preteritoImperfeito: rows('ia',    'ias',    'ia',    'íamos',  'iam'),
      participioPassado: 'ido',
    },
  },

  // ── vir ───────────────────────────────────────────────────────────────────
  vir: {
    a1: {
      presente: rows('venho', 'vens', 'vem', 'vimos', 'vêm'),
      exPresente: 'Eu venho de Portugal.',
      exFuturo:   'Eu vou vir amanhã.',
      exContinua: 'Eu estou a vir para a aula.',
    },
    a2: {
      preteritoPerfeito:   rows('vim',    'vieste',  'veio',   'viemos',  'vieram'),
      preteritoImperfeito: rows('vinha',  'vinhas',  'vinha',  'vínhamos','vinham'),
      participioPassado: 'vindo',
    },
  },

  // ── fazer ─────────────────────────────────────────────────────────────────
  fazer: {
    a1: {
      presente: rows('faço', 'fazes', 'faz', 'fazemos', 'fazem'),
      exPresente: 'Eu faço os trabalhos de casa.',
      exFuturo:   'Eu vou fazer o jantar.',
      exContinua: 'Eu estou a fazer um bolo.',
    },
    a2: {
      preteritoPerfeito:   rows('fiz',    'fizeste',  'fez',    'fizemos',  'fizeram'),
      preteritoImperfeito: rows('fazia',  'fazias',   'fazia',  'fazíamos', 'faziam'),
      participioPassado: 'feito',
    },
  },

  // ── falar ─────────────────────────────────────────────────────────────────
  falar: {
    a1: {
      presente: rows('falo', 'falas', 'fala', 'falamos', 'falam'),
      exPresente: 'Eu falo português.',
      exFuturo:   'Eu vou falar com o professor.',
      exContinua: 'Eu estou a falar ao telefone.',
    },
    a2: {
      preteritoPerfeito:   rows('falei',   'falaste',  'falou',   'falámos',  'falaram'),
      preteritoImperfeito: rows('falava',  'falavas',  'falava',  'falávamos','falavam'),
      participioPassado: 'falado',
    },
  },

  // ── dizer ─────────────────────────────────────────────────────────────────
  dizer: {
    a1: {
      presente: rows('digo', 'dizes', 'diz', 'dizemos', 'dizem'),
      exPresente: 'Eu digo a verdade.',
      exFuturo:   'Eu vou dizer uma coisa.',
      exContinua: 'Eu estou a dizer adeus.',
    },
    a2: {
      preteritoPerfeito:   rows('disse',  'disseste', 'disse',  'dissemos', 'disseram'),
      preteritoImperfeito: rows('dizia',  'dizias',   'dizia',  'dizíamos', 'diziam'),
      participioPassado: 'dito',
    },
  },

  // ── comer ─────────────────────────────────────────────────────────────────
  comer: {
    a1: {
      presente: rows('como', 'comes', 'come', 'comemos', 'comem'),
      exPresente: 'Eu como fruta todos os dias.',
      exFuturo:   'Eu vou comer pizza.',
      exContinua: 'Eu estou a comer agora.',
    },
    a2: {
      preteritoPerfeito:   rows('comi',   'comeste',  'comeu',   'comemos',  'comeram'),
      preteritoImperfeito: rows('comia',  'comias',   'comia',   'comíamos', 'comiam'),
      participioPassado: 'comido',
    },
  },

  // ── beber ─────────────────────────────────────────────────────────────────
  beber: {
    a1: {
      presente: rows('bebo', 'bebes', 'bebe', 'bebemos', 'bebem'),
      exPresente: 'Eu bebo água.',
      exFuturo:   'Eu vou beber sumo.',
      exContinua: 'Eu estou a beber leite.',
    },
    a2: {
      preteritoPerfeito:   rows('bebi',   'bebeste',  'bebeu',   'bebemos',  'beberam'),
      preteritoImperfeito: rows('bebia',  'bebias',   'bebia',   'bebíamos', 'bebiam'),
      participioPassado: 'bebido',
    },
  },

  // ── dormir ────────────────────────────────────────────────────────────────
  dormir: {
    a1: {
      presente: rows('durmo', 'dormes', 'dorme', 'dormimos', 'dormem'),
      exPresente: 'Eu durmo cedo.',
      exFuturo:   'Eu vou dormir tarde hoje.',
      exContinua: 'Eu estou a dormir mal.',
    },
    a2: {
      preteritoPerfeito:   rows('dormi',   'dormiste',  'dormiu',   'dormimos',  'dormiram'),
      preteritoImperfeito: rows('dormia',  'dormias',   'dormia',   'dormíamos', 'dormiam'),
      participioPassado: 'dormido',
    },
  },

  // ── acordar ───────────────────────────────────────────────────────────────
  acordar: {
    a1: {
      presente: rows('acordo', 'acordas', 'acorda', 'acordamos', 'acordam'),
      exPresente: 'Eu acordo às sete.',
      exFuturo:   'Eu vou acordar cedo.',
      exContinua: 'Eu estou a acordar agora.',
    },
    a2: {
      preteritoPerfeito:   rows('acordei',   'acordaste',  'acordou',   'acordámos',  'acordaram'),
      preteritoImperfeito: rows('acordava',  'acordavas',  'acordava',  'acordávamos','acordavam'),
      participioPassado: 'acordado',
    },
  },

  // ── ver ───────────────────────────────────────────────────────────────────
  ver: {
    a1: {
      presente: rows('vejo', 'vês', 'vê', 'vemos', 'veem'),
      exPresente: 'Eu vejo um filme.',
      exFuturo:   'Eu vou ver televisão.',
      exContinua: 'Eu estou a ver o mar.',
    },
    a2: {
      preteritoPerfeito:   rows('vi',    'viste',  'viu',   'vimos',  'viram'),
      preteritoImperfeito: rows('via',   'vias',   'via',   'víamos', 'viam'),
      participioPassado: 'visto',
    },
  },

  // ── ouvir ─────────────────────────────────────────────────────────────────
  ouvir: {
    a1: {
      presente: rows('ouço', 'ouves', 'ouve', 'ouvimos', 'ouvem'),
      exPresente: 'Eu ouço música.',
      exFuturo:   'Eu vou ouvir a rádio.',
      exContinua: 'Eu estou a ouvir uma canção.',
    },
    a2: {
      preteritoPerfeito:   rows('ouvi',   'ouviste',  'ouviu',   'ouvimos',  'ouviram'),
      preteritoImperfeito: rows('ouvia',  'ouvias',   'ouvia',   'ouvíamos', 'ouviam'),
      participioPassado: 'ouvido',
    },
  },

  // ── ler ───────────────────────────────────────────────────────────────────
  ler: {
    a1: {
      presente: rows('leio', 'lês', 'lê', 'lemos', 'leem'),
      exPresente: 'Eu leio um livro.',
      exFuturo:   'Eu vou ler a história.',
      exContinua: 'Eu estou a ler agora.',
    },
    a2: {
      preteritoPerfeito:   rows('li',    'leste',  'leu',   'lemos',  'leram'),
      preteritoImperfeito: rows('lia',   'lias',   'lia',   'líamos', 'liam'),
      participioPassado: 'lido',
    },
  },

  // ── escrever ──────────────────────────────────────────────────────────────
  escrever: {
    a1: {
      presente: rows('escrevo', 'escreves', 'escreve', 'escrevemos', 'escrevem'),
      exPresente: 'Eu escrevo uma carta.',
      exFuturo:   'Eu vou escrever um e-mail.',
      exContinua: 'Eu estou a escrever no caderno.',
    },
    a2: {
      preteritoPerfeito:   rows('escrevi',   'escreveste',  'escreveu',   'escrevemos',  'escreveram'),
      preteritoImperfeito: rows('escrevia',  'escrevias',   'escrevia',   'escrevíamos', 'escreviam'),
      participioPassado: 'escrito',
    },
  },

  // ── estudar ───────────────────────────────────────────────────────────────
  estudar: {
    a1: {
      presente: rows('estudo', 'estudas', 'estuda', 'estudamos', 'estudam'),
      exPresente: 'Eu estudo todos os dias.',
      exFuturo:   'Eu vou estudar para o teste.',
      exContinua: 'Eu estou a estudar português.',
    },
    a2: {
      preteritoPerfeito:   rows('estudei',   'estudaste',  'estudou',   'estudámos',  'estudaram'),
      preteritoImperfeito: rows('estudava',  'estudavas',  'estudava',  'estudávamos','estudavam'),
      participioPassado: 'estudado',
    },
  },

  // ── trabalhar ─────────────────────────────────────────────────────────────
  trabalhar: {
    a1: {
      presente: rows('trabalho', 'trabalhas', 'trabalha', 'trabalhamos', 'trabalham'),
      exPresente: 'Eu trabalho numa escola.',
      exFuturo:   'Eu vou trabalhar amanhã.',
      exContinua: 'Eu estou a trabalhar agora.',
    },
    a2: {
      preteritoPerfeito:   rows('trabalhei',   'trabalhaste',  'trabalhou',   'trabalhámos',  'trabalharam'),
      preteritoImperfeito: rows('trabalhava',  'trabalhavas',  'trabalhava',  'trabalhávamos','trabalhavam'),
      participioPassado: 'trabalhado',
    },
  },

  // ── brincar ───────────────────────────────────────────────────────────────
  brincar: {
    a1: {
      presente: rows('brinco', 'brincas', 'brinca', 'brincamos', 'brincam'),
      exPresente: 'Eu brinco no jardim.',
      exFuturo:   'Eu vou brincar com os amigos.',
      exContinua: 'Eu estou a brincar com a bola.',
    },
    a2: {
      preteritoPerfeito:   rows('brinquei',  'brincaste',  'brincou',   'brincámos',  'brincaram'),
      preteritoImperfeito: rows('brincava',  'brincavas',  'brincava',  'brincávamos','brincavam'),
      participioPassado: 'brincado',
    },
  },

  // ── correr ────────────────────────────────────────────────────────────────
  correr: {
    a1: {
      presente: rows('corro', 'corres', 'corre', 'corremos', 'correm'),
      exPresente: 'Eu corro todos os dias.',
      exFuturo:   'Eu vou correr no parque.',
      exContinua: 'Eu estou a correr muito.',
    },
    a2: {
      preteritoPerfeito:   rows('corri',   'correste',  'correu',   'corremos',  'correram'),
      preteritoImperfeito: rows('corria',  'corrias',   'corria',   'corríamos', 'corriam'),
      participioPassado: 'corrido',
    },
  },

  // ── andar ─────────────────────────────────────────────────────────────────
  andar: {
    a1: {
      presente: rows('ando', 'andas', 'anda', 'andamos', 'andam'),
      exPresente: 'Eu ando de bicicleta.',
      exFuturo:   'Eu vou andar a pé.',
      exContinua: 'Eu estou a andar depressa.',
    },
    a2: {
      preteritoPerfeito:   rows('andei',   'andaste',  'andou',   'andámos',  'andaram'),
      preteritoImperfeito: rows('andava',  'andavas',  'andava',  'andávamos','andavam'),
      participioPassado: 'andado',
    },
  },

  // ── nadar ─────────────────────────────────────────────────────────────────
  nadar: {
    a1: {
      presente: rows('nado', 'nadas', 'nada', 'nadamos', 'nadam'),
      exPresente: 'Eu nado no mar.',
      exFuturo:   'Eu vou nadar amanhã.',
      exContinua: 'Eu estou a nadar na piscina.',
    },
    a2: {
      preteritoPerfeito:   rows('nadei',   'nadaste',  'nadou',   'nadámos',  'nadaram'),
      preteritoImperfeito: rows('nadava',  'nadavas',  'nadava',  'nadávamos','nadavam'),
      participioPassado: 'nadado',
    },
  },

  // ── cantar ────────────────────────────────────────────────────────────────
  cantar: {
    a1: {
      presente: rows('canto', 'cantas', 'canta', 'cantamos', 'cantam'),
      exPresente: 'Eu canto uma música.',
      exFuturo:   'Eu vou cantar no concerto.',
      exContinua: 'Eu estou a cantar em voz alta.',
    },
    a2: {
      preteritoPerfeito:   rows('cantei',   'cantaste',  'cantou',   'cantámos',  'cantaram'),
      preteritoImperfeito: rows('cantava',  'cantavas',  'cantava',  'cantávamos','cantavam'),
      participioPassado: 'cantado',
    },
  },

  // ── dançar ────────────────────────────────────────────────────────────────
  dançar: {
    a1: {
      presente: rows('danço', 'danças', 'dança', 'dançamos', 'dançam'),
      exPresente: 'Eu danço muito bem.',
      exFuturo:   'Eu vou dançar na festa.',
      exContinua: 'Eu estou a dançar agora.',
    },
    a2: {
      preteritoPerfeito:   rows('dancei',   'dançaste',  'dançou',   'dançámos',  'dançaram'),
      preteritoImperfeito: rows('dançava',  'dançavas',  'dançava',  'dançávamos','dançavam'),
      participioPassado: 'dançado',
    },
  },

  // ── desenhar ──────────────────────────────────────────────────────────────
  desenhar: {
    a1: {
      presente: rows('desenho', 'desenhas', 'desenha', 'desenhamos', 'desenham'),
      exPresente: 'Eu desenho um gato.',
      exFuturo:   'Eu vou desenhar uma casa.',
      exContinua: 'Eu estou a desenhar agora.',
    },
    a2: {
      preteritoPerfeito:   rows('desenhei',   'desenhaste',  'desenhou',   'desenhámos',  'desenharam'),
      preteritoImperfeito: rows('desenhava',  'desenhavas',  'desenhava',  'desenhávamos','desenhavam'),
      participioPassado: 'desenhado',
    },
  },

  // ── comprar ───────────────────────────────────────────────────────────────
  comprar: {
    a1: {
      presente: rows('compro', 'compras', 'compra', 'compramos', 'compram'),
      exPresente: 'Eu compro pão na padaria.',
      exFuturo:   'Eu vou comprar um presente.',
      exContinua: 'Eu estou a comprar legumes.',
    },
    a2: {
      preteritoPerfeito:   rows('comprei',   'compraste',  'comprou',   'comprámos',  'compraram'),
      preteritoImperfeito: rows('comprava',  'compravas',  'comprava',  'comprávamos','compravam'),
      participioPassado: 'comprado',
    },
  },

  // ── dar ───────────────────────────────────────────────────────────────────
  dar: {
    a1: {
      presente: rows('dou', 'dás', 'dá', 'damos', 'dão'),
      exPresente: 'Eu dou um presente.',
      exFuturo:   'Eu vou dar uma festa.',
      exContinua: 'Eu estou a dar aulas.',
    },
    a2: {
      preteritoPerfeito:   rows('dei',   'deste',  'deu',   'demos',  'deram'),
      preteritoImperfeito: rows('dava',  'davas',  'dava',  'dávamos','davam'),
      participioPassado: 'dado',
    },
  },

  // ── ajudar ────────────────────────────────────────────────────────────────
  ajudar: {
    a1: {
      presente: rows('ajudo', 'ajudas', 'ajuda', 'ajudamos', 'ajudam'),
      exPresente: 'Eu ajudo a minha mãe.',
      exFuturo:   'Eu vou ajudar o professor.',
      exContinua: 'Eu estou a ajudar um amigo.',
    },
    a2: {
      preteritoPerfeito:   rows('ajudei',   'ajudaste',  'ajudou',   'ajudámos',  'ajudaram'),
      preteritoImperfeito: rows('ajudava',  'ajudavas',  'ajudava',  'ajudávamos','ajudavam'),
      participioPassado: 'ajudado',
    },
  },

  // ── gostar ────────────────────────────────────────────────────────────────
  gostar: {
    a1: {
      presente: rows('gosto', 'gostas', 'gosta', 'gostamos', 'gostam'),
      exPresente: 'Eu gosto de música.',
      exFuturo:   'Eu vou gostar desta aula.',
      exContinua: 'Eu estou a gostar muito.',
    },
    a2: {
      preteritoPerfeito:   rows('gostei',   'gostaste',  'gostou',   'gostámos',  'gostaram'),
      preteritoImperfeito: rows('gostava',  'gostavas',  'gostava',  'gostávamos','gostavam'),
      participioPassado: 'gostado',
    },
  },

  // ── querer ────────────────────────────────────────────────────────────────
  querer: {
    a1: {
      presente: rows('quero', 'queres', 'quer', 'queremos', 'querem'),
      exPresente: 'Eu quero um gelado.',
      exFuturo:   'Eu vou querer mais.',
      exContinua: 'Eu estou a querer sair.',
    },
    a2: {
      preteritoPerfeito:   rows('quis',    'quiseste',  'quis',    'quisemos',  'quiseram'),
      preteritoImperfeito: rows('queria',  'querias',   'queria',  'queríamos', 'queriam'),
      participioPassado: 'querido',
    },
  },

  // ── poder ─────────────────────────────────────────────────────────────────
  poder: {
    a1: {
      presente: rows('posso', 'podes', 'pode', 'podemos', 'podem'),
      exPresente: 'Eu posso ajudar.',
      exFuturo:   'Eu vou poder ir amanhã.',
      exContinua: 'Eu estou a poder estudar.',
    },
    a2: {
      preteritoPerfeito:   rows('pude',    'pudeste',  'pôde',    'pudemos',  'puderam'),
      preteritoImperfeito: rows('podia',   'podias',   'podia',   'podíamos', 'podiam'),
      participioPassado: 'podido',
    },
  },

  // ── saber ─────────────────────────────────────────────────────────────────
  saber: {
    a1: {
      presente: rows('sei', 'sabes', 'sabe', 'sabemos', 'sabem'),
      exPresente: 'Eu sei a resposta.',
      exFuturo:   'Eu vou saber o resultado.',
      exContinua: 'Eu estou a saber mais.',
    },
    a2: {
      preteritoPerfeito:   rows('soube',   'soubeste',  'soube',   'soubemos',  'souberam'),
      preteritoImperfeito: rows('sabia',   'sabias',    'sabia',   'sabíamos',  'sabiam'),
      participioPassado: 'sabido',
    },
  },

  // ── abrir ─────────────────────────────────────────────────────────────────
  abrir: {
    a1: {
      presente: rows('abro', 'abres', 'abre', 'abrimos', 'abrem'),
      exPresente: 'Eu abro a janela.',
      exFuturo:   'Eu vou abrir a porta.',
      exContinua: 'Eu estou a abrir o livro.',
    },
    a2: {
      preteritoPerfeito:   rows('abri',   'abriste',  'abriu',   'abrimos',  'abriram'),
      preteritoImperfeito: rows('abria',  'abrias',   'abria',   'abríamos', 'abriam'),
      participioPassado: 'aberto',
    },
  },

  // ── fechar ────────────────────────────────────────────────────────────────
  fechar: {
    a1: {
      presente: rows('fecho', 'fechas', 'fecha', 'fechamos', 'fecham'),
      exPresente: 'Eu fecho a porta.',
      exFuturo:   'Eu vou fechar a janela.',
      exContinua: 'Eu estou a fechar o caderno.',
    },
    a2: {
      preteritoPerfeito:   rows('fechei',   'fechaste',  'fechou',   'fechámos',  'fecharam'),
      preteritoImperfeito: rows('fechava',  'fechavas',  'fechava',  'fechávamos','fechavam'),
      participioPassado: 'fechado',
    },
  },

  // ── começar ───────────────────────────────────────────────────────────────
  começar: {
    a1: {
      presente: rows('começo', 'começas', 'começa', 'começamos', 'começam'),
      exPresente: 'Eu começo às nove.',
      exFuturo:   'Eu vou começar agora.',
      exContinua: 'Eu estou a começar a ler.',
    },
    a2: {
      preteritoPerfeito:   rows('comecei',   'começaste',  'começou',   'começámos',  'começaram'),
      preteritoImperfeito: rows('começava',  'começavas',  'começava',  'começávamos','começavam'),
      participioPassado: 'começado',
    },
  },

  // ── acabar ────────────────────────────────────────────────────────────────
  acabar: {
    a1: {
      presente: rows('acabo', 'acabas', 'acaba', 'acabamos', 'acabam'),
      exPresente: 'Eu acabo o trabalho.',
      exFuturo:   'Eu vou acabar cedo.',
      exContinua: 'Eu estou a acabar o livro.',
    },
    a2: {
      preteritoPerfeito:   rows('acabei',   'acabaste',  'acabou',   'acabámos',  'acabaram'),
      preteritoImperfeito: rows('acabava',  'acabavas',  'acabava',  'acabávamos','acabavam'),
      participioPassado: 'acabado',
    },
  },

  // ── chegar ────────────────────────────────────────────────────────────────
  chegar: {
    a1: {
      presente: rows('chego', 'chegas', 'chega', 'chegamos', 'chegam'),
      exPresente: 'Eu chego às oito.',
      exFuturo:   'Eu vou chegar tarde.',
      exContinua: 'Eu estou a chegar à escola.',
    },
    a2: {
      preteritoPerfeito:   rows('cheguei',  'chegaste',  'chegou',   'chegámos',  'chegaram'),
      preteritoImperfeito: rows('chegava',  'chegavas',  'chegava',  'chegávamos','chegavam'),
      participioPassado: 'chegado',
    },
  },

  // ── sair ──────────────────────────────────────────────────────────────────
  sair: {
    a1: {
      presente: rows('saio', 'sais', 'sai', 'saímos', 'saem'),
      exPresente: 'Eu saio de casa.',
      exFuturo:   'Eu vou sair mais tarde.',
      exContinua: 'Eu estou a sair agora.',
    },
    a2: {
      preteritoPerfeito:   rows('saí',    'saíste',  'saiu',   'saímos',  'saíram'),
      preteritoImperfeito: rows('saía',   'saías',   'saía',   'saíamos', 'saíam'),
      participioPassado: 'saído',
    },
  },

  // ── entrar ────────────────────────────────────────────────────────────────
  entrar: {
    a1: {
      presente: rows('entro', 'entras', 'entra', 'entramos', 'entram'),
      exPresente: 'Eu entro na sala.',
      exFuturo:   'Eu vou entrar na escola.',
      exContinua: 'Eu estou a entrar agora.',
    },
    a2: {
      preteritoPerfeito:   rows('entrei',   'entraste',  'entrou',   'entrámos',  'entraram'),
      preteritoImperfeito: rows('entrava',  'entravas',  'entrava',  'entrávamos','entravam'),
      participioPassado: 'entrado',
    },
  },

  // ── sentar ────────────────────────────────────────────────────────────────
  sentar: {
    a1: {
      presente: rows('sento', 'sentas', 'senta', 'sentamos', 'sentam'),
      exPresente: 'Eu sento na cadeira.',
      exFuturo:   'Eu vou sentar aqui.',
      exContinua: 'Eu estou a sentar agora.',
    },
    a2: {
      preteritoPerfeito:   rows('sentei',   'sentaste',  'sentou',   'sentámos',  'sentaram'),
      preteritoImperfeito: rows('sentava',  'sentavas',  'sentava',  'sentávamos','sentavam'),
      participioPassado: 'sentado',
    },
  },

  // ── perguntar ─────────────────────────────────────────────────────────────
  perguntar: {
    a1: {
      presente: rows('pergunto', 'perguntas', 'pergunta', 'perguntamos', 'perguntam'),
      exPresente: 'Eu pergunto ao professor.',
      exFuturo:   'Eu vou perguntar amanhã.',
      exContinua: 'Eu estou a perguntar agora.',
    },
    a2: {
      preteritoPerfeito:   rows('perguntei',   'perguntaste',  'perguntou',   'perguntámos',  'perguntaram'),
      preteritoImperfeito: rows('perguntava',  'perguntavas',  'perguntava',  'perguntávamos','perguntavam'),
      participioPassado: 'perguntado',
    },
  },

  // ── responder ─────────────────────────────────────────────────────────────
  responder: {
    a1: {
      presente: rows('respondo', 'respondes', 'responde', 'respondemos', 'respondem'),
      exPresente: 'Eu respondo à pergunta.',
      exFuturo:   'Eu vou responder ao e-mail.',
      exContinua: 'Eu estou a responder agora.',
    },
    a2: {
      preteritoPerfeito:   rows('respondi',   'respondeste',  'respondeu',   'respondemos',  'responderam'),
      preteritoImperfeito: rows('respondia',  'respondias',   'respondia',   'respondíamos', 'respondiam'),
      participioPassado: 'respondido',
    },
  },

  // ── pensar ────────────────────────────────────────────────────────────────
  pensar: {
    a1: {
      presente: rows('penso', 'pensas', 'pensa', 'pensamos', 'pensam'),
      exPresente: 'Eu penso muito.',
      exFuturo:   'Eu vou pensar nisso.',
      exContinua: 'Eu estou a pensar em ti.',
    },
    a2: {
      preteritoPerfeito:   rows('pensei',   'pensaste',  'pensou',   'pensámos',  'pensaram'),
      preteritoImperfeito: rows('pensava',  'pensavas',  'pensava',  'pensávamos','pensavam'),
      participioPassado: 'pensado',
    },
  },

  // ── trazer ────────────────────────────────────────────────────────────────
  trazer: {
    a1: {
      presente: rows('trago', 'trazes', 'traz', 'trazemos', 'trazem'),
      exPresente: 'Eu trago o livro.',
      exFuturo:   'Eu vou trazer comida.',
      exContinua: 'Eu estou a trazer a mochila.',
    },
    a2: {
      preteritoPerfeito:   rows('trouxe',  'trouxeste', 'trouxe',  'trouxemos', 'trouxeram'),
      preteritoImperfeito: rows('trazia',  'trazias',   'trazia',  'trazíamos', 'traziam'),
      participioPassado: 'trazido',
    },
  },

  // ── ficar ─────────────────────────────────────────────────────────────────
  ficar: {
    a1: {
      presente: rows('fico', 'ficas', 'fica', 'ficamos', 'ficam'),
      exPresente: 'Eu fico em casa.',
      exFuturo:   'Eu vou ficar aqui.',
      exContinua: 'Eu estou a ficar cansado.',
    },
    a2: {
      preteritoPerfeito:   rows('fiquei',  'ficaste',  'ficou',   'ficámos',  'ficaram'),
      preteritoImperfeito: rows('ficava',  'ficavas',  'ficava',  'ficávamos','ficavam'),
      participioPassado: 'ficado',
    },
  },

  // ── voltar ────────────────────────────────────────────────────────────────
  voltar: {
    a1: {
      presente: rows('volto', 'voltas', 'volta', 'voltamos', 'voltam'),
      exPresente: 'Eu volto à tarde.',
      exFuturo:   'Eu vou voltar amanhã.',
      exContinua: 'Eu estou a voltar para casa.',
    },
    a2: {
      preteritoPerfeito:   rows('voltei',   'voltaste',  'voltou',   'voltámos',  'voltaram'),
      preteritoImperfeito: rows('voltava',  'voltavas',  'voltava',  'voltávamos','voltavam'),
      participioPassado: 'voltado',
    },
  },

  // ── jantar ────────────────────────────────────────────────────────────────
  jantar: {
    a1: {
      presente: rows('janto', 'jantas', 'janta', 'jantamos', 'jantam'),
      exPresente: 'Eu janto às oito.',
      exFuturo:   'Eu vou jantar fora.',
      exContinua: 'Eu estou a jantar agora.',
    },
    a2: {
      preteritoPerfeito:   rows('jantei',   'jantaste',  'jantou',   'jantámos',  'jantaram'),
      preteritoImperfeito: rows('jantava',  'jantavas',  'jantava',  'jantávamos','jantavam'),
      participioPassado: 'jantado',
    },
  },

  // ── incomodar ─────────────────────────────────────────────────────────────
  incomodar: {
    a1: {
      presente: rows('incomodo', 'incomodas', 'incomoda', 'incomodamos', 'incomodam'),
      exPresente: 'Eu incomodo o irmão.',
      exFuturo:   'Eu vou incomodar menos.',
      exContinua: 'Eu estou a incomodar agora.',
    },
    a2: {
      preteritoPerfeito:   rows('incomodei',   'incomodaste',  'incomodou',   'incomodámos',  'incomodaram'),
      preteritoImperfeito: rows('incomodava',  'incomodavas',  'incomodava',  'incomodávamos','incomodavam'),
      participioPassado: 'incomodado',
    },
  },

  // ── medir ─────────────────────────────────────────────────────────────────
  medir: {
    a1: {
      presente: rows('meço', 'medes', 'mede', 'medimos', 'medem'),
      exPresente: 'Eu meço a sala.',
      exFuturo:   'Eu vou medir o livro.',
      exContinua: 'Eu estou a medir tudo.',
    },
    a2: {
      preteritoPerfeito:   rows('medi',   'mediste',  'mediu',   'medimos',  'mediram'),
      preteritoImperfeito: rows('media',  'medias',   'media',   'medíamos', 'mediam'),
      participioPassado: 'medido',
    },
  },

  // ── odiar ─────────────────────────────────────────────────────────────────
  odiar: {
    a1: {
      presente: rows('odeio', 'odeias', 'odeia', 'odiamos', 'odeiam'),
      exPresente: 'Eu odeio o trânsito.',
      exFuturo:   'Eu vou odiar isso.',
      exContinua: 'Eu estou a odiar esperar.',
    },
    a2: {
      preteritoPerfeito:   rows('odiei',   'odiaste',  'odiou',   'odiámos',  'odiaram'),
      preteritoImperfeito: rows('odiava',  'odiavas',  'odiava',  'odiávamos','odiavam'),
      participioPassado: 'odiado',
    },
  },

  // ── pintar ────────────────────────────────────────────────────────────────
  pintar: {
    a1: {
      presente: rows('pinto', 'pintas', 'pinta', 'pintamos', 'pintam'),
      exPresente: 'Eu pinto a parede.',
      exFuturo:   'Eu vou pintar um quadro.',
      exContinua: 'Eu estou a pintar agora.',
    },
    a2: {
      preteritoPerfeito:   rows('pintei',   'pintaste',  'pintou',   'pintámos',  'pintaram'),
      preteritoImperfeito: rows('pintava',  'pintavas',  'pintava',  'pintávamos','pintavam'),
      participioPassado: 'pintado',
    },
  },

  // ── jogar ─────────────────────────────────────────────────────────────────
  jogar: {
    a1: {
      presente: rows('jogo', 'jogas', 'joga', 'jogamos', 'jogam'),
      exPresente: 'Eu jogo futebol.',
      exFuturo:   'Eu vou jogar amanhã.',
      exContinua: 'Eu estou a jogar agora.',
    },
    a2: {
      preteritoPerfeito:   rows('joguei',  'jogaste',  'jogou',   'jogámos',  'jogaram'),
      preteritoImperfeito: rows('jogava',  'jogavas',  'jogava',  'jogávamos','jogavam'),
      participioPassado: 'jogado',
    },
  },

  // ── subir ─────────────────────────────────────────────────────────────────
  subir: {
    a1: {
      presente: rows('subo', 'sobes', 'sobe', 'subimos', 'sobem'),
      exPresente: 'Eu subo as escadas.',
      exFuturo:   'Eu vou subir ao topo.',
      exContinua: 'Eu estou a subir agora.',
    },
    a2: {
      preteritoPerfeito:   rows('subi',   'subiste',  'subiu',   'subimos',  'subiram'),
      preteritoImperfeito: rows('subia',  'subias',   'subia',   'subíamos', 'subiam'),
      participioPassado: 'subido',
    },
  },

  // ── caber ─────────────────────────────────────────────────────────────────
  caber: {
    a1: {
      presente: rows('caibo', 'cabes', 'cabe', 'cabemos', 'cabem'),
      exPresente: 'Eu caibo na cadeira.',
      exFuturo:   'Eu vou caber aqui.',
      exContinua: 'Eu estou a caber bem.',
    },
    a2: {
      preteritoPerfeito:   rows('coube',   'coubeste',  'coube',   'coubemos',  'couberam'),
      preteritoImperfeito: rows('cabia',   'cabias',    'cabia',   'cabíamos',  'cabiam'),
      participioPassado: 'cabido',
    },
  },

  // ── aterrar ───────────────────────────────────────────────────────────────
  aterrar: {
    a1: {
      presente: rows('aterro', 'aterras', 'aterra', 'aterramos', 'aterram'),
      exPresente: 'O avião aterra agora.',
      exFuturo:   'O avião vai aterrar em breve.',
      exContinua: 'O avião está a aterrar.',
    },
    a2: {
      preteritoPerfeito:   rows('aterrei',   'aterraste',  'aterrou',   'aterrámos',  'aterraram'),
      preteritoImperfeito: rows('aterrava',  'aterravas',  'aterrava',  'aterrávamos','aterravam'),
      participioPassado: 'aterrado',
    },
  },

  // ── parar ─────────────────────────────────────────────────────────────────
  parar: {
    a1: {
      presente: rows('paro', 'paras', 'para', 'paramos', 'param'),
      exPresente: 'Eu paro no sinal.',
      exFuturo:   'Eu vou parar aqui.',
      exContinua: 'Eu estou a parar agora.',
    },
    a2: {
      preteritoPerfeito:   rows('parei',   'paraste',  'parou',   'parámos',  'pararam'),
      preteritoImperfeito: rows('parava',  'paravas',  'parava',  'parávamos','paravam'),
      participioPassado: 'parado',
    },
  },

  // ── chorar ────────────────────────────────────────────────────────────────
  chorar: {
    a1: {
      presente: rows('choro', 'choras', 'chora', 'choramos', 'choram'),
      exPresente: 'Eu choro de alegria.',
      exFuturo:   'Eu vou chorar no filme.',
      exContinua: 'Eu estou a chorar agora.',
    },
    a2: {
      preteritoPerfeito:   rows('chorei',   'choraste',  'chorou',   'chorámos',  'choraram'),
      preteritoImperfeito: rows('chorava',  'choravas',  'chorava',  'chorávamos','choravam'),
      participioPassado: 'chorado',
    },
  },

  // ── esquecer ──────────────────────────────────────────────────────────────
  esquecer: {
    a1: {
      presente: rows('esqueço', 'esqueces', 'esquece', 'esquecemos', 'esquecem'),
      exPresente: 'Eu esqueço as chaves.',
      exFuturo:   'Eu vou esquecer isso.',
      exContinua: 'Eu estou a esquecer tudo.',
    },
    a2: {
      preteritoPerfeito:   rows('esqueci',   'esqueceste',  'esqueceu',   'esquecemos',  'esqueceram'),
      preteritoImperfeito: rows('esquecia',  'esquecias',   'esquecia',   'esquecíamos', 'esqueciam'),
      participioPassado: 'esquecido',
    },
  },

  // ── levantar-me ───────────────────────────────────────────────────────────
  // Stored under the hyphenated key as it appears in words.ts
  'levantar-me': {
    a1: {
      presente: rows('levanto-me', 'levantas-te', 'levanta-se', 'levantamo-nos', 'levantam-se'),
      exPresente: 'Eu levanto-me cedo.',
      exFuturo:   'Eu vou levantar-me às sete.',
      exContinua: 'Eu estou a levantar-me agora.',
    },
    a2: {
      preteritoPerfeito:   rows('levantei-me',   'levantaste-te',  'levantou-se',   'levantámo-nos',  'levantaram-se'),
      preteritoImperfeito: rows('levantava-me',  'levantavas-te',  'levantava-se',  'levantávamo-nos','levantavam-se'),
      participioPassado: 'levantado',
    },
  },

  // ── parecer ───────────────────────────────────────────────────────────────
  parecer: {
    a1: {
      presente: rows('pareço', 'pareces', 'parece', 'parecemos', 'parecem'),
      exPresente: 'Eu pareço cansado.',
      exFuturo:   'Eu vou parecer melhor.',
      exContinua: 'Eu estou a parecer bem.',
    },
    a2: {
      preteritoPerfeito:   rows('pareceu',  'pareceste',  'pareceu',   'parecemos',  'pareceram'),
      preteritoImperfeito: rows('parecia',  'parecias',   'parecia',   'parecíamos', 'pareciam'),
      participioPassado: 'parecido',
    },
  },
};
