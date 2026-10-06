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

export interface SpecialUse {
  formula: string;          // e.g. "saber + Infinitivo"
  descEn: string;           // e.g. "to know how to do something"
  descTr: string;           // e.g. "bir şeyi nasıl yapacağını bilmek"
  examples: {
    pt: string;
    en: string;
    tr: string;
  }[];
}

export interface VerbConjugation {
  a1: {
    presente: ConjugationRow[];
    exPresente: string;       // e.g. "Eu nado no mar."
    exFuturo: string;         // e.g. "Eu vou nadar amanhã."
    exContinua: string;       // e.g. "Eu estou a nadar agora."
    exPresenteEn: string;
    exFuturoEn: string;
    exContinuaEn: string;
    exPresenteTr: string;
    exFuturoTr: string;
    exContinuaTr: string;
    specialUse?: SpecialUse;
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
      exContinua: 'Eu estou a ser simpático.',
      exPresenteEn: 'I am a student.',
      exFuturoEn:   'I am going to be a doctor.',
      exContinuaEn: 'I am being kind.',
      exPresenteTr: 'Ben öğrenciyim.',
      exFuturoTr:   'Doktor olacağım.',
      exContinuaTr: 'Nazik davranıyorum.',
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
      exContinua: 'Eu estou a descansar.',
      exPresenteEn: 'I am at home.',
      exFuturoEn:   'I am going to be here.',
      exContinuaEn: 'I am resting.',
      exPresenteTr: 'Evdeyim.',
      exFuturoTr:   'Burada olacağım.',
      exContinuaTr: 'Dinleniyorum.',
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
      exPresenteEn: 'I have a book.',
      exFuturoEn:   'I am going to have classes tomorrow.',
      exContinuaEn: 'I am having problems.',
      exPresenteTr: 'Bir kitabım var.',
      exFuturoTr:   'Yarın derslerim olacak.',
      exContinuaTr: 'Sorun yaşıyorum.',
      specialUse: {
        formula: 'ter + de/que + Infinitivo',
        descEn: 'to have to do something (obligation)',
        descTr: 'bir şeyi yapmak zorunda olmak (zorunluluk)',
        examples: [
          { pt: 'Eu tenho de estudar.',              en: 'I have to study.',                   tr: 'Çalışmam gerekiyor.' },
          { pt: 'Ela tem de ir à escola.',           en: 'She has to go to school.',           tr: 'Okula gitmesi gerekiyor.' },
          { pt: 'Temos de comer agora.',             en: 'We have to eat now.',                tr: 'Şimdi yememiz gerekiyor.' },
          { pt: 'Tu tens de fazer os trabalhos de casa.', en: 'You have to do your homework.', tr: 'Ev ödevini yapman gerekiyor.' },
        ],
      },
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
      exPresenteEn: 'I go to school.',
      exFuturoEn:   'I am going to go to the park.',
      exContinuaEn: 'I am going home.',
      exPresenteTr: 'Okula gidiyorum.',
      exFuturoTr:   'Parka gideceğim.',
      exContinuaTr: 'Eve gidiyorum.',
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
      exPresenteEn: 'I come from Portugal.',
      exFuturoEn:   'I am going to come tomorrow.',
      exContinuaEn: 'I am coming to class.',
      exPresenteTr: 'Portekiz\'den geliyorum.',
      exFuturoTr:   'Yarın geleceğim.',
      exContinuaTr: 'Derse geliyorum.',
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
      exPresenteEn: 'I do my homework.',
      exFuturoEn:   'I am going to make dinner.',
      exContinuaEn: 'I am making a cake.',
      exPresenteTr: 'Ev ödevimi yapıyorum.',
      exFuturoTr:   'Akşam yemeği yapacağım.',
      exContinuaTr: 'Pasta yapıyorum.',
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
      exPresenteEn: 'I speak Portuguese.',
      exFuturoEn:   'I am going to talk to the teacher.',
      exContinuaEn: 'I am talking on the phone.',
      exPresenteTr: 'Portekizce konuşuyorum.',
      exFuturoTr:   'Öğretmenle konuşacağım.',
      exContinuaTr: 'Telefonda konuşuyorum.',
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
      exPresenteEn: 'I tell the truth.',
      exFuturoEn:   'I am going to say something.',
      exContinuaEn: 'I am saying goodbye.',
      exPresenteTr: 'Gerçeği söylüyorum.',
      exFuturoTr:   'Bir şey söyleyeceğim.',
      exContinuaTr: 'Hoşça kal diyorum.',
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
      exPresenteEn: 'I eat fruit every day.',
      exFuturoEn:   'I am going to eat pizza.',
      exContinuaEn: 'I am eating now.',
      exPresenteTr: 'Her gün meyve yiyorum.',
      exFuturoTr:   'Pizza yiyeceğim.',
      exContinuaTr: 'Şu an yiyorum.',
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
      exPresenteEn: 'I drink water.',
      exFuturoEn:   'I am going to drink juice.',
      exContinuaEn: 'I am drinking milk.',
      exPresenteTr: 'Su içiyorum.',
      exFuturoTr:   'Meyve suyu içeceğim.',
      exContinuaTr: 'Süt içiyorum.',
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
      exPresenteEn: 'I sleep early.',
      exFuturoEn:   'I am going to sleep late today.',
      exContinuaEn: 'I am sleeping badly.',
      exPresenteTr: 'Erken uyurum.',
      exFuturoTr:   'Bugün geç uyuyacağım.',
      exContinuaTr: 'Kötü uyuyorum.',
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
      exPresenteEn: 'I wake up at seven.',
      exFuturoEn:   'I am going to wake up early.',
      exContinuaEn: 'I am waking up now.',
      exPresenteTr: 'Yedide uyanıyorum.',
      exFuturoTr:   'Erken uyanacağım.',
      exContinuaTr: 'Şu an uyanıyorum.',
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
      exPresenteEn: 'I watch a film.',
      exFuturoEn:   'I am going to watch TV.',
      exContinuaEn: 'I am watching the sea.',
      exPresenteTr: 'Bir film izliyorum.',
      exFuturoTr:   'Televizyon izleyeceğim.',
      exContinuaTr: 'Denizi izliyorum.',
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
      exPresenteEn: 'I listen to music.',
      exFuturoEn:   'I am going to listen to the radio.',
      exContinuaEn: 'I am listening to a song.',
      exPresenteTr: 'Müzik dinliyorum.',
      exFuturoTr:   'Radyo dinleyeceğim.',
      exContinuaTr: 'Bir şarkı dinliyorum.',
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
      exPresenteEn: 'I read a book.',
      exFuturoEn:   'I am going to read the story.',
      exContinuaEn: 'I am reading now.',
      exPresenteTr: 'Bir kitap okuyorum.',
      exFuturoTr:   'Hikayeyi okuyacağım.',
      exContinuaTr: 'Şu an okuyorum.',
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
      exPresenteEn: 'I write a letter.',
      exFuturoEn:   'I am going to write an e-mail.',
      exContinuaEn: 'I am writing in the notebook.',
      exPresenteTr: 'Bir mektup yazıyorum.',
      exFuturoTr:   'E-posta yazacağım.',
      exContinuaTr: 'Deftere yazıyorum.',
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
      exPresenteEn: 'I study every day.',
      exFuturoEn:   'I am going to study for the test.',
      exContinuaEn: 'I am studying Portuguese.',
      exPresenteTr: 'Her gün ders çalışıyorum.',
      exFuturoTr:   'Sınav için çalışacağım.',
      exContinuaTr: 'Portekizce öğreniyorum.',
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
      exPresenteEn: 'I work at a school.',
      exFuturoEn:   'I am going to work tomorrow.',
      exContinuaEn: 'I am working now.',
      exPresenteTr: 'Bir okulda çalışıyorum.',
      exFuturoTr:   'Yarın çalışacağım.',
      exContinuaTr: 'Şu an çalışıyorum.',
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
      exPresenteEn: 'I play in the garden.',
      exFuturoEn:   'I am going to play with friends.',
      exContinuaEn: 'I am playing with the ball.',
      exPresenteTr: 'Bahçede oynuyorum.',
      exFuturoTr:   'Arkadaşlarımla oynayacağım.',
      exContinuaTr: 'Topla oynuyorum.',
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
      exPresenteEn: 'I run every day.',
      exFuturoEn:   'I am going to run in the park.',
      exContinuaEn: 'I am running a lot.',
      exPresenteTr: 'Her gün koşuyorum.',
      exFuturoTr:   'Parkta koşacağım.',
      exContinuaTr: 'Çok koşuyorum.',
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
      exPresenteEn: 'I ride a bicycle.',
      exFuturoEn:   'I am going to walk.',
      exContinuaEn: 'I am walking fast.',
      exPresenteTr: 'Bisiklete biniyorum.',
      exFuturoTr:   'Yürüyeceğim.',
      exContinuaTr: 'Hızlı yürüyorum.',
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
      exPresenteEn: 'I swim in the sea.',
      exFuturoEn:   'I am going to swim tomorrow.',
      exContinuaEn: 'I am swimming in the pool.',
      exPresenteTr: 'Denizde yüzüyorum.',
      exFuturoTr:   'Yarın yüzeceğim.',
      exContinuaTr: 'Havuzda yüzüyorum.',
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
      exPresenteEn: 'I sing a song.',
      exFuturoEn:   'I am going to sing at the concert.',
      exContinuaEn: 'I am singing out loud.',
      exPresenteTr: 'Bir şarkı söylüyorum.',
      exFuturoTr:   'Konserde şarkı söyleyeceğim.',
      exContinuaTr: 'Yüksek sesle şarkı söylüyorum.',
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
      exPresenteEn: 'I dance very well.',
      exFuturoEn:   'I am going to dance at the party.',
      exContinuaEn: 'I am dancing now.',
      exPresenteTr: 'Çok iyi dans ediyorum.',
      exFuturoTr:   'Partide dans edeceğim.',
      exContinuaTr: 'Şu an dans ediyorum.',
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
      exPresenteEn: 'I draw a cat.',
      exFuturoEn:   'I am going to draw a house.',
      exContinuaEn: 'I am drawing now.',
      exPresenteTr: 'Bir kedi çiziyorum.',
      exFuturoTr:   'Bir ev çizeceğim.',
      exContinuaTr: 'Şu an çiziyorum.',
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
      exPresenteEn: 'I buy bread at the bakery.',
      exFuturoEn:   'I am going to buy a gift.',
      exContinuaEn: 'I am buying vegetables.',
      exPresenteTr: 'Fırından ekmek alıyorum.',
      exFuturoTr:   'Hediye alacağım.',
      exContinuaTr: 'Sebze satın alıyorum.',
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
      exPresenteEn: 'I give a gift.',
      exFuturoEn:   'I am going to throw a party.',
      exContinuaEn: 'I am giving classes.',
      exPresenteTr: 'Hediye veriyorum.',
      exFuturoTr:   'Parti düzenleyeceğim.',
      exContinuaTr: 'Ders veriyorum.',
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
      exPresenteEn: 'I help my mum.',
      exFuturoEn:   'I am going to help the teacher.',
      exContinuaEn: 'I am helping a friend.',
      exPresenteTr: 'Anneme yardım ediyorum.',
      exFuturoTr:   'Öğretmene yardım edeceğim.',
      exContinuaTr: 'Bir arkadaşıma yardım ediyorum.',
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
      exFuturo:   'Eu vou gostar deste filme.',
      exContinua: 'Eu estou a gostar muito.',
      exPresenteEn: 'I like music.',
      exFuturoEn:   'I am going to like this film.',
      exContinuaEn: 'I am really enjoying it.',
      exPresenteTr: 'Müzikten hoşlanıyorum.',
      exFuturoTr:   'Bu filmden hoşlanacağım.',
      exContinuaTr: 'Çok beğeniyorum.',
      specialUse: {
        formula: 'gostar + de + substantivo/infinitivo',
        descEn: 'always needs "de" — to like something / doing something',
        descTr: 'her zaman "de" ister — bir şeyden/yapmaktan hoşlanmak',
        examples: [
          { pt: 'Eu gosto de chocolate.',        en: 'I like chocolate.',             tr: 'Çikolatayı severim.' },
          { pt: 'Ela gosta de nadar.',           en: 'She likes swimming.',           tr: 'Yüzmeyi seviyor.' },
          { pt: 'Gostamos de música.',           en: 'We like music.',                tr: 'Müzikten hoşlanıyoruz.' },
          { pt: 'Gostas de correr?',             en: 'Do you like running?',          tr: 'Koşmayı sever misin?' },
        ],
      },
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
      exPresenteEn: 'I want an ice cream.',
      exFuturoEn:   'I am going to want more.',
      exContinuaEn: 'I want to go out.',
      exPresenteTr: 'Dondurma istiyorum.',
      exFuturoTr:   'Daha fazlasını isteyeceğim.',
      exContinuaTr: 'Dışarı çıkmak istiyorum.',
      specialUse: {
        formula: 'querer + Infinitivo',
        descEn: 'to want to do something',
        descTr: 'bir şey yapmak istemek',
        examples: [
          { pt: 'Eu quero comer pizza.',         en: 'I want to eat pizza.',          tr: 'Pizza yemek istiyorum.' },
          { pt: 'Ela quer dormir.',              en: 'She wants to sleep.',           tr: 'Uyumak istiyor.' },
          { pt: 'Eles querem brincar.',          en: 'They want to play.',            tr: 'Oynamak istiyorlar.' },
          { pt: 'Queres beber água?',            en: 'Do you want to drink water?',   tr: 'Su içmek ister misin?' },
        ],
      },
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
      exContinua: 'Eu estou a conseguir estudar.',
      exPresenteEn: 'I can help.',
      exFuturoEn:   'I will be able to go tomorrow.',
      exContinuaEn: 'I am managing to study.',
      exPresenteTr: 'Yardım edebilirim.',
      exFuturoTr:   'Yarın gidebileceğim.',
      exContinuaTr: 'Çalışmayı başarıyorum.',
      specialUse: {
        formula: 'poder + Infinitivo',
        descEn: 'can / to be able to do something',
        descTr: 'bir şeyi yapabilmek (yetenek / izin)',
        examples: [
          { pt: 'Posso entrar?',                en: 'Can I come in?',                tr: 'Girebilir miyim?' },
          { pt: 'Ela pode falar inglês.',        en: 'She can speak English.',        tr: 'İngilizce konuşabiliyor.' },
          { pt: 'Não posso sair hoje.',          en: 'I can\'t go out today.',        tr: 'Bugün çıkamıyorum.' },
          { pt: 'Podemos ajudar?',              en: 'Can we help?',                  tr: 'Yardım edebilir miyiz?' },
        ],
      },
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
      exContinua: 'Eu estou a aprender mais.',
      exPresenteEn: 'I know the answer.',
      exFuturoEn:   'I am going to find out the result.',
      exContinuaEn: 'I am learning more.',
      exPresenteTr: 'Cevabı biliyorum.',
      exFuturoTr:   'Sonucu öğreneceğim.',
      exContinuaTr: 'Daha çok öğreniyorum.',
      specialUse: {
        formula: 'saber + Infinitivo',
        descEn: 'to know how to do something',
        descTr: 'bir şeyi nasıl yapacağını bilmek',
        examples: [
          { pt: 'Ele sabe nadar.',              en: 'He knows how to swim.',          tr: 'Yüzmeyi biliyor.' },
          { pt: 'Eles sabem correr rápido.',    en: 'They know how to run fast.',     tr: 'Hızlı koşmayı biliyorlar.' },
          { pt: 'Eu não sei cozinhar.',         en: 'I don\'t know how to cook.',     tr: 'Yemek yapmayı bilmiyorum.' },
          { pt: 'O menino sabe escrever.',      en: 'The boy knows how to write.',    tr: 'Çocuk yazmayı biliyor.' },
          { pt: 'Sabes ler em português?',      en: 'Do you know how to read in Portuguese?', tr: 'Portekizce okuyabiliyor musun?' },
        ],
      },
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
      exPresenteEn: 'I open the window.',
      exFuturoEn:   'I am going to open the door.',
      exContinuaEn: 'I am opening the book.',
      exPresenteTr: 'Pencereyi açıyorum.',
      exFuturoTr:   'Kapıyı açacağım.',
      exContinuaTr: 'Kitabı açıyorum.',
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
      exPresenteEn: 'I close the door.',
      exFuturoEn:   'I am going to close the window.',
      exContinuaEn: 'I am closing the notebook.',
      exPresenteTr: 'Kapıyı kapatıyorum.',
      exFuturoTr:   'Pencereyi kapatacağım.',
      exContinuaTr: 'Defteri kapatıyorum.',
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
      exPresenteEn: 'I start at nine.',
      exFuturoEn:   'I am going to start now.',
      exContinuaEn: 'I am starting to read.',
      exPresenteTr: 'Dokuzda başlıyorum.',
      exFuturoTr:   'Şimdi başlayacağım.',
      exContinuaTr: 'Okumaya başlıyorum.',
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
      exPresenteEn: 'I finish the work.',
      exFuturoEn:   'I am going to finish early.',
      exContinuaEn: 'I am finishing the book.',
      exPresenteTr: 'İşi bitiriyorum.',
      exFuturoTr:   'Erken bitireceğim.',
      exContinuaTr: 'Kitabı bitiriyorum.',
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
      exPresenteEn: 'I arrive at eight.',
      exFuturoEn:   'I am going to arrive late.',
      exContinuaEn: 'I am arriving at school.',
      exPresenteTr: 'Sekizde geliyorum.',
      exFuturoTr:   'Geç geleceğim.',
      exContinuaTr: 'Okula geliyorum.',
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
      exPresenteEn: 'I leave the house.',
      exFuturoEn:   'I am going to leave later.',
      exContinuaEn: 'I am leaving now.',
      exPresenteTr: 'Evden çıkıyorum.',
      exFuturoTr:   'Daha sonra çıkacağım.',
      exContinuaTr: 'Şu an çıkıyorum.',
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
      exPresenteEn: 'I enter the room.',
      exFuturoEn:   'I am going to enter the school.',
      exContinuaEn: 'I am entering now.',
      exPresenteTr: 'Odaya giriyorum.',
      exFuturoTr:   'Okula gireceğim.',
      exContinuaTr: 'Şu an giriyorum.',
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
      exPresenteEn: 'I sit on the chair.',
      exFuturoEn:   'I am going to sit here.',
      exContinuaEn: 'I am sitting down now.',
      exPresenteTr: 'Sandalyeye oturuyorum.',
      exFuturoTr:   'Buraya oturacağım.',
      exContinuaTr: 'Şu an oturuyorum.',
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
      exPresenteEn: 'I ask the teacher.',
      exFuturoEn:   'I am going to ask tomorrow.',
      exContinuaEn: 'I am asking now.',
      exPresenteTr: 'Öğretmene soruyorum.',
      exFuturoTr:   'Yarın soracağım.',
      exContinuaTr: 'Şu an soruyorum.',
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
      exPresenteEn: 'I answer the question.',
      exFuturoEn:   'I am going to reply to the e-mail.',
      exContinuaEn: 'I am answering now.',
      exPresenteTr: 'Soruyu cevaplıyorum.',
      exFuturoTr:   'E-postayı cevaplayacağım.',
      exContinuaTr: 'Şu an cevaplıyorum.',
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
      exPresenteEn: 'I think a lot.',
      exFuturoEn:   'I am going to think about it.',
      exContinuaEn: 'I am thinking about you.',
      exPresenteTr: 'Çok düşünüyorum.',
      exFuturoTr:   'Bunu düşüneceğim.',
      exContinuaTr: 'Seni düşünüyorum.',
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
      exPresenteEn: 'I bring the book.',
      exFuturoEn:   'I am going to bring food.',
      exContinuaEn: 'I am bringing the backpack.',
      exPresenteTr: 'Kitabı getiriyorum.',
      exFuturoTr:   'Yemek getireceğim.',
      exContinuaTr: 'Sırt çantasını getiriyorum.',
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
      exPresenteEn: 'I stay at home.',
      exFuturoEn:   'I am going to stay here.',
      exContinuaEn: 'I am getting tired.',
      exPresenteTr: 'Evde kalıyorum.',
      exFuturoTr:   'Burada kalacağım.',
      exContinuaTr: 'Yorulmaya başlıyorum.',
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
      exPresenteEn: 'I return in the afternoon.',
      exFuturoEn:   'I am going to come back tomorrow.',
      exContinuaEn: 'I am heading back home.',
      exPresenteTr: 'Öğleden sonra dönüyorum.',
      exFuturoTr:   'Yarın geri döneceğim.',
      exContinuaTr: 'Eve dönüyorum.',
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
      exPresenteEn: 'I have dinner at eight.',
      exFuturoEn:   'I am going to have dinner out.',
      exContinuaEn: 'I am having dinner now.',
      exPresenteTr: 'Sekizde akşam yemeği yiyorum.',
      exFuturoTr:   'Dışarıda akşam yemeği yiyeceğim.',
      exContinuaTr: 'Şu an akşam yemeği yiyorum.',
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
      exPresenteEn: 'I bother my brother.',
      exFuturoEn:   'I am going to bother less.',
      exContinuaEn: 'I am bothering now.',
      exPresenteTr: 'Kardeşimi rahatsız ediyorum.',
      exFuturoTr:   'Daha az rahatsız edeceğim.',
      exContinuaTr: 'Şu an rahatsız ediyorum.',
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
      exFuturo:   'Eu vou medir a cozinha.',
      exContinua: 'Eu estou a medir tudo.',
      exPresenteEn: 'I measure the room.',
      exFuturoEn:   'I am going to measure the kitchen.',
      exContinuaEn: 'I am measuring everything.',
      exPresenteTr: 'Odayı ölçüyorum.',
      exFuturoTr:   'Mutfağı ölçeceğim.',
      exContinuaTr: 'Her şeyi ölçüyorum.',
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
      exPresenteEn: 'I hate traffic.',
      exFuturoEn:   'I am going to hate that.',
      exContinuaEn: 'I am hating waiting.',
      exPresenteTr: 'Trafikten nefret ediyorum.',
      exFuturoTr:   'Bundan nefret edeceğim.',
      exContinuaTr: 'Beklemekten nefret ediyorum.',
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
      exPresenteEn: 'I paint the wall.',
      exFuturoEn:   'I am going to paint a picture.',
      exContinuaEn: 'I am painting now.',
      exPresenteTr: 'Duvarı boyuyorum.',
      exFuturoTr:   'Bir tablo boyayacağım.',
      exContinuaTr: 'Şu an boyuyorum.',
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
      exPresenteEn: 'I play football.',
      exFuturoEn:   'I am going to play tomorrow.',
      exContinuaEn: 'I am playing now.',
      exPresenteTr: 'Futbol oynuyorum.',
      exFuturoTr:   'Yarın oynayacağım.',
      exContinuaTr: 'Şu an oynuyorum.',
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
      exPresenteEn: 'I go up the stairs.',
      exFuturoEn:   'I am going to climb to the top.',
      exContinuaEn: 'I am going up now.',
      exPresenteTr: 'Merdiveni çıkıyorum.',
      exFuturoTr:   'Tepeye çıkacağım.',
      exContinuaTr: 'Şu an çıkıyorum.',
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
      exContinua: 'A mochila está a caber na mala.',
      exPresenteEn: 'I fit in the chair.',
      exFuturoEn:   'I am going to fit here.',
      exContinuaEn: 'The backpack is fitting in the bag.',
      exPresenteTr: 'Sandalyeye sığıyorum.',
      exFuturoTr:   'Buraya sığacağım.',
      exContinuaTr: 'Sırt çantası bavula sığıyor.',
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
      exPresenteEn: 'The plane lands now.',
      exFuturoEn:   'The plane is going to land soon.',
      exContinuaEn: 'The plane is landing.',
      exPresenteTr: 'Uçak şimdi iniyor.',
      exFuturoTr:   'Uçak yakında inecek.',
      exContinuaTr: 'Uçak iniş yapıyor.',
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
      exPresenteEn: 'I stop at the traffic light.',
      exFuturoEn:   'I am going to stop here.',
      exContinuaEn: 'I am stopping now.',
      exPresenteTr: 'Trafik ışığında duruyorum.',
      exFuturoTr:   'Burada duracağım.',
      exContinuaTr: 'Şu an duruyorum.',
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
      exPresenteEn: 'I cry with joy.',
      exFuturoEn:   'I am going to cry at the film.',
      exContinuaEn: 'I am crying now.',
      exPresenteTr: 'Sevinçten ağlıyorum.',
      exFuturoTr:   'Filmde ağlayacağım.',
      exContinuaTr: 'Şu an ağlıyorum.',
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
      exPresenteEn: 'I forget my keys.',
      exFuturoEn:   'I am going to forget that.',
      exContinuaEn: 'I am forgetting everything.',
      exPresenteTr: 'Anahtarlarımı unutuyorum.',
      exFuturoTr:   'Bunu unutacağım.',
      exContinuaTr: 'Her şeyi unutuyorum.',
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
      exPresenteEn: 'I get up early.',
      exFuturoEn:   'I am going to get up at seven.',
      exContinuaEn: 'I am getting up now.',
      exPresenteTr: 'Erken kalkarım.',
      exFuturoTr:   'Yedide kalkacağım.',
      exContinuaTr: 'Şu an kalkıyorum.',
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
      exPresenteEn: 'I look tired.',
      exFuturoEn:   'I am going to look better.',
      exContinuaEn: 'I am looking well.',
      exPresenteTr: 'Yorgun görünüyorum.',
      exFuturoTr:   'Daha iyi görüneceğim.',
      exContinuaTr: 'İyi görünüyorum.',
    },
    a2: {
      preteritoPerfeito:   rows('pareceu',  'pareceste',  'pareceu',   'parecemos',  'pareceram'),
      preteritoImperfeito: rows('parecia',  'parecias',   'parecia',   'parecíamos', 'pareciam'),
      participioPassado: 'parecido',
    },
  },
};
