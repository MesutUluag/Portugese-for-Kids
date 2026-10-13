// ─────────────────────────────────────────────────────────────────────────────
// Adverb use-case data — grouped by semantic category
// Each entry covers exactly one word from the Adverbs category in words.ts
// ─────────────────────────────────────────────────────────────────────────────

export interface AdverbExample {
  pt: string;
  en: string;
  tr: string;
}

export interface AdverbEntry {
  word: string;
  emoji: string;
  /** Short use-case badge label */
  useCaseEn: string;
  useCaseTr: string;
  /** One-line meaning reminder */
  meaningEn: string;
  meaningTr: string;
  examples: AdverbExample[];
}

export interface AdverbGroup {
  labelEn: string;
  labelTr: string;
  emoji: string;
  adverbs: AdverbEntry[];
}

export const adverbGroups: AdverbGroup[] = [

  // ── Time ──────────────────────────────────────────────────────────────────
  {
    labelEn: 'Time',
    labelTr: 'Zaman',
    emoji: '⏰',
    adverbs: [
      {
        word: 'agora',
        emoji: '⏱️',
        useCaseEn: 'Right now',
        useCaseTr: 'Şu an',
        meaningEn: 'now',
        meaningTr: 'şimdi',
        examples: [
          { pt: 'Agora estou a comer.', en: 'I am eating now.', tr: 'Şu an yiyorum.' },
          { pt: 'Podes vir agora?', en: 'Can you come now?', tr: 'Şimdi gelebilir misin?' },
          { pt: 'Não! Agora não!', en: 'No! Not now!', tr: 'Hayır! Şimdi değil!' },
        ],
      },
      {
        word: 'antes',
        emoji: '⬅️',
        useCaseEn: 'Before / Earlier',
        useCaseTr: 'Önce / Daha Önce',
        meaningEn: 'before / earlier',
        meaningTr: 'önce / daha önce',
        examples: [
          { pt: 'Come antes de sair.', en: 'Eat before you go out.', tr: 'Çıkmadan önce ye.' },
          { pt: 'Eu nunca vi isso antes.', en: 'I never saw that before.', tr: 'Bunu daha önce hiç görmedim.' },
          { pt: 'Ela lavou as mãos antes de comer.', en: 'She washed her hands before eating.', tr: 'Yemekten önce ellerini yıkadı.' },
        ],
      },
      {
        word: 'depois',
        emoji: '⏩',
        useCaseEn: 'After / Then',
        useCaseTr: 'Sonra',
        meaningEn: 'after / then',
        meaningTr: 'sonra / daha sonra',
        examples: [
          { pt: 'Primeiro como, depois estudo.', en: 'First I eat, then I study.', tr: 'Önce yerim, sonra çalışırım.' },
          { pt: 'Depois da escola vou ao parque.', en: 'After school I go to the park.', tr: 'Okuldan sonra parka gidiyorum.' },
          { pt: 'Falamos depois, está bem?', en: "We'll talk later, okay?", tr: 'Sonra konuşuruz, tamam mı?' },
        ],
      },
      {
        word: 'ainda',
        emoji: '⏳',
        useCaseEn: 'Still / Yet',
        useCaseTr: 'Hâlâ / Henüz',
        meaningEn: 'still / yet',
        meaningTr: 'hâlâ / henüz',
        examples: [
          { pt: 'Ainda não comi.', en: "I haven't eaten yet.", tr: 'Henüz yemedim.' },
          { pt: 'Ela ainda está em casa.', en: 'She is still at home.', tr: 'O hâlâ evde.' },
          { pt: 'Ainda tens o meu livro?', en: 'Do you still have my book?', tr: 'Kitabım hâlâ sende mi?' },
        ],
      },
      {
        word: 'cedo',
        emoji: '🌅',
        useCaseEn: 'Early',
        useCaseTr: 'Erken',
        meaningEn: 'early',
        meaningTr: 'erken',
        examples: [
          { pt: 'O João acorda cedo.', en: 'João wakes up early.', tr: 'João erken uyanır.' },
          { pt: 'Chegámos cedo à escola.', en: 'We arrived at school early.', tr: 'Okula erken geldik.' },
          { pt: 'Vou dormir cedo hoje.', en: "I'm going to sleep early today.", tr: 'Bugün erken uyuyacağım.' },
        ],
      },
      {
        word: 'atrasado',
        emoji: '⌛',
        useCaseEn: 'Late / Delayed',
        useCaseTr: 'Geç / Gecikmiş',
        meaningEn: 'late / delayed',
        meaningTr: 'geç / gecikmiş',
        examples: [
          { pt: 'Desculpa, estou atrasado!', en: 'Sorry, I am late!', tr: 'Özür dilerim, geç kaldım!' },
          { pt: 'O autocarro está atrasado.', en: 'The bus is late.', tr: 'Otobüs geç kalıyor.' },
          { pt: 'Ele chegou atrasado à escola.', en: 'He arrived at school late.', tr: 'Okula geç geldi.' },
        ],
      },
      {
        word: 'adiante',
        emoji: '⏭️',
        useCaseEn: 'Ahead / Further on',
        useCaseTr: 'İlerde / Daha Sonra',
        meaningEn: 'ahead / further on',
        meaningTr: 'ilerde / ileride',
        examples: [
          { pt: 'A escola fica um pouco mais adiante.', en: 'The school is a little further ahead.', tr: 'Okul biraz daha ileride.' },
          { pt: 'Continua em frente, está mais adiante.', en: 'Keep going, it is further ahead.', tr: 'Devam et, daha ileride.' },
          { pt: 'O parque fica logo ali adiante.', en: 'The park is just up ahead.', tr: 'Park hemen orada ileride.' },
        ],
      },
      {
        word: 'há',
        emoji: '⌛',
        useCaseEn: 'There is / Ago',
        useCaseTr: 'Var / Önce',
        meaningEn: 'there is / for (time ago)',
        meaningTr: 'var / -dır / önce',
        examples: [
          { pt: 'Há leite no frigorífico.', en: 'There is milk in the fridge.', tr: 'Buzdolabında süt var.' },
          { pt: 'Há um gato no jardim.', en: 'There is a cat in the garden.', tr: 'Bahçede bir kedi var.' },
          { pt: 'Ele chegou há uma hora.', en: 'He arrived one hour ago.', tr: 'Bir saat önce geldi.' },
        ],
      },
    ],
  },

  // ── Frequency ─────────────────────────────────────────────────────────────
  {
    labelEn: 'Frequency',
    labelTr: 'Sıklık',
    emoji: '🔁',
    adverbs: [
      {
        word: 'sempre',
        emoji: '♾️',
        useCaseEn: 'Always',
        useCaseTr: 'Her Zaman',
        meaningEn: 'always',
        meaningTr: 'her zaman',
        examples: [
          { pt: 'Eu sempre como ao pequeno-almoço.', en: 'I always eat breakfast.', tr: 'Her zaman kahvaltı yaparım.' },
          { pt: 'Ela sempre bebe água depois de correr.', en: 'She always drinks water after running.', tr: 'Koştuktan sonra her zaman su içer.' },
          { pt: 'O meu pai sempre lê o jornal.', en: 'My father always reads the newspaper.', tr: 'Babam her zaman gazete okur.' },
        ],
      },
      {
        word: 'nunca',
        emoji: '🚫',
        useCaseEn: 'Never',
        useCaseTr: 'Hiçbir Zaman',
        meaningEn: 'never',
        meaningTr: 'hiçbir zaman / asla',
        examples: [
          { pt: 'Eu nunca como peixe.', en: 'I never eat fish.', tr: 'Hiç balık yemem.' },
          { pt: 'Ele nunca chega tarde.', en: 'He never arrives late.', tr: 'O hiç geç kalmaz.' },
          { pt: 'Nunca fui a Espanha.', en: 'I have never been to Spain.', tr: "İspanya'ya hiç gitmedim." },
        ],
      },
      {
        word: 'jamais',
        emoji: '⛔',
        useCaseEn: 'Never ever (emphatic)',
        useCaseTr: 'Asla (güçlü)',
        meaningEn: 'never ever (stronger than nunca)',
        meaningTr: 'asla / hiçbir zaman (nunca\'dan daha güçlü)',
        examples: [
          { pt: 'Jamais vou esquecer este dia.', en: 'I will never forget this day.', tr: 'Bu günü asla unutmayacağım.' },
          { pt: 'Não faço isso jamais!', en: 'I will never do that!', tr: 'Bunu asla yapmam!' },
          { pt: 'Ela jamais mente.', en: 'She never lies.', tr: 'O asla yalan söylemez.' },
        ],
      },
      {
        word: 'quase',
        emoji: '🔜',
        useCaseEn: 'Almost / Nearly',
        useCaseTr: 'Neredeyse',
        meaningEn: 'almost / nearly',
        meaningTr: 'neredeyse',
        examples: [
          { pt: 'O jantar está quase pronto.', en: 'Dinner is almost ready.', tr: 'Akşam yemeği neredeyse hazır.' },
          { pt: 'Quase perdi o autocarro.', en: 'I almost missed the bus.', tr: 'Otobüsü neredeyse kaçırdım.' },
          { pt: 'Já são quase oito horas.', en: 'It is almost eight o\'clock.', tr: 'Neredeyse saat sekiz.' },
        ],
      },
      {
        word: 'vezes',
        emoji: '🔁',
        useCaseEn: 'Times / Occasions',
        useCaseTr: 'Kez / Bazen',
        meaningEn: 'times / sometimes (às vezes)',
        meaningTr: 'kez / bazen (às vezes)',
        examples: [
          { pt: 'Às vezes como pizza ao jantar.', en: 'Sometimes I eat pizza for dinner.', tr: 'Bazen akşam yemeğinde pizza yerim.' },
          { pt: 'Fui ao cinema duas vezes.', en: 'I went to the cinema twice.', tr: 'Sinemaya iki kez gittim.' },
          { pt: 'Às vezes chove muito aqui.', en: 'Sometimes it rains a lot here.', tr: 'Bazen burada çok yağmur yağar.' },
        ],
      },
    ],
  },

  // ── Place ──────────────────────────────────────────────────────────────────
  {
    labelEn: 'Place',
    labelTr: 'Yer',
    emoji: '📍',
    adverbs: [
      {
        word: 'aqui',
        emoji: '📍',
        useCaseEn: 'Here (near speaker)',
        useCaseTr: 'Burada (konuşanın yanında)',
        meaningEn: 'here',
        meaningTr: 'burada / buraya',
        examples: [
          { pt: 'Fica aqui, já volto.', en: 'Stay here, I will be right back.', tr: 'Burada kal, hemen dönerim.' },
          { pt: 'Eu moro aqui.', en: 'I live here.', tr: 'Ben burada yaşıyorum.' },
          { pt: 'Põe o livro aqui.', en: 'Put the book here.', tr: 'Kitabı buraya koy.' },
        ],
      },
      {
        word: 'daqui',
        emoji: '🗺️',
        useCaseEn: 'From here',
        useCaseTr: 'Buradan',
        meaningEn: 'from here',
        meaningTr: 'buradan',
        examples: [
          { pt: 'A escola fica longe daqui.', en: 'The school is far from here.', tr: 'Okul buradan uzakta.' },
          { pt: 'Daqui vejo o mar.', en: 'From here I can see the sea.', tr: 'Buradan denizi görüyorum.' },
          { pt: 'Saio daqui às três.', en: 'I leave from here at three.', tr: 'Buradan üçte ayrılıyorum.' },
        ],
      },
      {
        word: 'fora',
        emoji: '🌳',
        useCaseEn: 'Outside',
        useCaseTr: 'Dışarıda',
        meaningEn: 'outside / out',
        meaningTr: 'dışarı / dışarıda',
        examples: [
          { pt: 'As crianças brincam lá fora.', en: 'The children play outside.', tr: 'Çocuklar dışarıda oynuyor.' },
          { pt: 'Está frio lá fora.', en: 'It is cold outside.', tr: 'Dışarısı soğuk.' },
          { pt: 'O cão está fora.', en: 'The dog is outside.', tr: 'Köpek dışarıda.' },
        ],
      },
      {
        word: 'embora',
        emoji: '🚶',
        useCaseEn: 'Away (ir embora)',
        useCaseTr: 'Gitmek (ir embora)',
        meaningEn: 'away — used in "ir embora" (to leave)',
        meaningTr: '"ir embora" (ayrılmak) ifadesinde kullanılır',
        examples: [
          { pt: 'Vou embora agora.', en: 'I am leaving now.', tr: 'Şimdi gidiyorum.' },
          { pt: 'O João foi embora.', en: 'João has left.', tr: 'João gitti.' },
          { pt: 'Ela foi embora cedo.', en: 'She left early.', tr: 'Erken gitti.' },
        ],
      },
      {
        word: 'longe',
        emoji: '🌌',
        useCaseEn: 'Far away',
        useCaseTr: 'Uzakta',
        meaningEn: 'far / far away',
        meaningTr: 'uzak / uzakta',
        examples: [
          { pt: 'A minha escola fica longe.', en: 'My school is far.', tr: 'Okulım uzakta.' },
          { pt: 'Os avós dela vivem longe.', en: 'Her grandparents live far away.', tr: 'Büyükannesiler uzakta yaşıyor.' },
          { pt: 'Não fiques longe!', en: "Don't go far!", tr: 'Uzaklaşma!' },
        ],
      },
      {
        word: 'perto',
        emoji: '🏘️',
        useCaseEn: 'Near / Nearby',
        useCaseTr: 'Yakın / Yakında',
        meaningEn: 'near / close',
        meaningTr: 'yakın / yakında',
        examples: [
          { pt: 'O supermercado fica perto.', en: 'The supermarket is nearby.', tr: 'Süpermarket yakında.' },
          { pt: 'Senta-te perto de mim.', en: 'Sit near me.', tr: 'Yanıma otur.' },
          { pt: 'Eu moro perto da escola.', en: 'I live near the school.', tr: 'Okula yakın yaşıyorum.' },
        ],
      },
      {
        word: 'cima',
        emoji: '⬆️',
        useCaseEn: 'Above / On top',
        useCaseTr: 'Üstte / Yukarıda',
        meaningEn: 'on top / above (em cima = on top)',
        meaningTr: 'üstte / yukarıda (em cima = üstünde)',
        examples: [
          { pt: 'O gato está em cima da mesa.', en: 'The cat is on top of the table.', tr: 'Kedi masanın üstünde.' },
          { pt: 'O livro está em cima da cama.', en: 'The book is on top of the bed.', tr: 'Kitap yatağın üstünde.' },
          { pt: 'O avião está lá em cima.', en: 'The plane is up there.', tr: 'Uçak orada yukarıda.' },
        ],
      },
    ],
  },

  // ── Degree / Intensity ────────────────────────────────────────────────────
  {
    labelEn: 'Degree',
    labelTr: 'Derece',
    emoji: '📊',
    adverbs: [
      {
        word: 'muito',
        emoji: '💪',
        useCaseEn: 'Very / A lot',
        useCaseTr: 'Çok',
        meaningEn: 'very / a lot / much',
        meaningTr: 'çok / çok fazla',
        examples: [
          { pt: 'Ela é muito simpática.', en: 'She is very nice.', tr: 'O çok kibar.' },
          { pt: 'Tenho muito fome!', en: 'I am very hungry!', tr: 'Çok açım!' },
          { pt: 'Obrigado, gostei muito!', en: 'Thank you, I liked it a lot!', tr: 'Teşekkürler, çok beğendim!' },
        ],
      },
      {
        word: 'mais',
        emoji: '➕',
        useCaseEn: 'More / Most',
        useCaseTr: 'Daha Fazla',
        meaningEn: 'more',
        meaningTr: 'daha fazla',
        examples: [
          { pt: 'Quero mais água, por favor.', en: 'I want more water, please.', tr: 'Daha fazla su istiyorum, lütfen.' },
          { pt: 'Ele come mais do que eu.', en: 'He eats more than me.', tr: 'O benden daha fazla yer.' },
          { pt: 'Estuda mais!', en: 'Study more!', tr: 'Daha fazla çalış!' },
        ],
      },
      {
        word: 'menos',
        emoji: '➖',
        useCaseEn: 'Less / Fewer',
        useCaseTr: 'Daha Az',
        meaningEn: 'less / fewer',
        meaningTr: 'daha az',
        examples: [
          { pt: 'Fala menos, por favor.', en: 'Talk less, please.', tr: 'Lütfen daha az konuş.' },
          { pt: 'Ela come menos do que ele.', en: 'She eats less than him.', tr: 'O ondan daha az yer.' },
          { pt: 'Quero menos açúcar no café.', en: 'I want less sugar in the coffee.', tr: 'Kahvede daha az şeker istiyorum.' },
        ],
      },
      {
        word: 'tão',
        emoji: '😲',
        useCaseEn: 'So / As … as',
        useCaseTr: 'O Kadar / Çok',
        meaningEn: 'so / as … as',
        meaningTr: 'o kadar / çok',
        examples: [
          { pt: 'Estou tão cansado!', en: 'I am so tired!', tr: 'Çok yorgunum!' },
          { pt: 'O bolo está tão bom!', en: 'The cake is so good!', tr: 'Pasta çok güzel!' },
          { pt: 'Ele é tão alto!', en: 'He is so tall!', tr: 'O çok uzun!' },
        ],
      },
      {
        word: 'apenas',
        emoji: '1️⃣',
        useCaseEn: 'Only / Just',
        useCaseTr: 'Sadece / Yalnızca',
        meaningEn: 'only / just',
        meaningTr: 'sadece / yalnızca',
        examples: [
          { pt: 'Tenho apenas um irmão.', en: 'I only have one brother.', tr: 'Sadece bir erkek kardeşim var.' },
          { pt: 'Quero apenas água.', en: 'I only want water.', tr: 'Sadece su istiyorum.' },
          { pt: 'Ela tem apenas cinco anos.', en: 'She is only five years old.', tr: 'O sadece beş yaşında.' },
        ],
      },
      {
        word: 'pouco',
        emoji: '🤏',
        useCaseEn: 'A little / Not much',
        useCaseTr: 'Biraz / Az',
        meaningEn: 'a little / a bit / few',
        meaningTr: 'az / biraz',
        examples: [
          { pt: 'Comi um pouco de pão.', en: 'I ate a little bread.', tr: 'Biraz ekmek yedim.' },
          { pt: 'Fala um pouco mais devagar.', en: 'Speak a little more slowly.', tr: 'Biraz daha yavaş konuş.' },
          { pt: 'Tenho um pouco de frio.', en: 'I am a little cold.', tr: 'Biraz üşüyorum.' },
        ],
      },
      {
        word: 'algum',
        emoji: '🫙',
        useCaseEn: 'Some / Any',
        useCaseTr: 'Biraz / Bazı',
        meaningEn: 'some / any',
        meaningTr: 'biraz / bazı / herhangi bir',
        examples: [
          { pt: 'Tens algum dinheiro?', en: 'Do you have any money?', tr: 'Hiç paran var mı?' },
          { pt: 'Há algum problema?', en: 'Is there any problem?', tr: 'Herhangi bir sorun var mı?' },
          { pt: 'Queres alguma coisa?', en: 'Do you want anything?', tr: 'Bir şey ister misin?' },
        ],
      },
      {
        word: 'só',
        emoji: '🧍',
        useCaseEn: 'Only / Just',
        useCaseTr: 'Sadece / Yalnız',
        meaningEn: 'only / just / alone',
        meaningTr: 'sadece / yalnız',
        examples: [
          { pt: 'Só quero água.', en: 'I only want water.', tr: 'Sadece su istiyorum.' },
          { pt: 'Ele foi só ao parque.', en: 'He went to the park alone.', tr: 'Parka yalnız gitti.' },
          { pt: 'Tenho só um gato.', en: 'I only have one cat.', tr: 'Sadece bir kedim var.' },
        ],
      },
      {
        word: 'até',
        emoji: '🎯',
        useCaseEn: 'Even / Until',
        useCaseTr: 'Bile / -e Kadar',
        meaningEn: 'even / until',
        meaningTr: 'bile / -e kadar',
        examples: [
          { pt: 'Até o meu cão sabe sentar!', en: 'Even my dog knows how to sit!', tr: 'Köpeğim bile oturmayı biliyor!' },
          { pt: 'Estudei até às dez.', en: 'I studied until ten.', tr: 'Ona kadar çalıştım.' },
          { pt: 'Até a minha mãe gosta desta música.', en: 'Even my mother likes this music.', tr: 'Annem bile bu müziği seviyor.' },
        ],
      },
    ],
  },

  // ── Manner ────────────────────────────────────────────────────────────────
  {
    labelEn: 'Manner',
    labelTr: 'Tarz',
    emoji: '🎭',
    adverbs: [
      {
        word: 'depressa',
        emoji: '⚡',
        useCaseEn: 'Quickly / Fast',
        useCaseTr: 'Hızlıca',
        meaningEn: 'quickly / fast',
        meaningTr: 'hızlıca / çabucak',
        examples: [
          { pt: 'Corre depressa!', en: 'Run fast!', tr: 'Hızlı koş!' },
          { pt: 'Ela come muito depressa.', en: 'She eats very fast.', tr: 'O çok hızlı yer.' },
          { pt: 'Fala mais depressa!', en: 'Speak faster!', tr: 'Daha hızlı konuş!' },
        ],
      },
      {
        word: 'realmente',
        emoji: '💯',
        useCaseEn: 'Really / Indeed',
        useCaseTr: 'Gerçekten',
        meaningEn: 'really / indeed',
        meaningTr: 'gerçekten / hakikaten',
        examples: [
          { pt: 'Isto é realmente bom!', en: 'This is really good!', tr: 'Bu gerçekten iyi!' },
          { pt: 'Ela é realmente bonita.', en: 'She is really beautiful.', tr: 'O gerçekten güzel.' },
          { pt: 'Realmente não sei.', en: 'I really do not know.', tr: 'Gerçekten bilmiyorum.' },
        ],
      },
      {
        word: 'certamente',
        emoji: '🎯',
        useCaseEn: 'Certainly / Surely',
        useCaseTr: 'Kesinlikle',
        meaningEn: 'certainly / surely',
        meaningTr: 'kesinlikle / elbette',
        examples: [
          { pt: 'Certamente vou à festa.', en: 'I will certainly go to the party.', tr: 'Partiye kesinlikle gideceğim.' },
          { pt: 'Ela certamente sabe a resposta.', en: 'She certainly knows the answer.', tr: 'O kesinlikle cevabı biliyor.' },
          { pt: 'Isso é certamente verdade.', en: 'That is certainly true.', tr: 'Bu kesinlikle doğru.' },
        ],
      },
      {
        word: 'sobre',
        emoji: '💬',
        useCaseEn: 'About / Regarding',
        useCaseTr: 'Hakkında / Üzerinde',
        meaningEn: 'about / on / over',
        meaningTr: 'hakkında / üzerinde',
        examples: [
          { pt: 'Vamos falar sobre a escola.', en: 'Let\'s talk about school.', tr: 'Okul hakkında konuşalım.' },
          { pt: 'Li um livro sobre animais.', en: 'I read a book about animals.', tr: 'Hayvanlar hakkında bir kitap okudum.' },
          { pt: 'O filme é sobre um cão.', en: 'The film is about a dog.', tr: 'Film bir köpek hakkında.' },
        ],
      },
      {
        word: 'por',
        emoji: '🔄',
        useCaseEn: 'By / Through / Per',
        useCaseTr: 'Tarafından / Boyunca / Her',
        meaningEn: 'by / through / for / per',
        meaningTr: 'tarafından / için / başına',
        examples: [
          { pt: 'Passei por casa da Ana.', en: "I passed by Ana's house.", tr: "Ana'nın evinin önünden geçtim." },
          { pt: 'Obrigado por tudo!', en: 'Thank you for everything!', tr: 'Her şey için teşekkürler!' },
          { pt: 'Ela foi por aqui.', en: 'She went this way.', tr: 'O bu yoldan gitti.' },
        ],
      },
    ],
  },

  // ── Probability ───────────────────────────────────────────────────────────
  {
    labelEn: 'Probability',
    labelTr: 'Olasılık',
    emoji: '🤷',
    adverbs: [
      {
        word: 'se calhar',
        emoji: '🤷',
        useCaseEn: 'Maybe / Perhaps',
        useCaseTr: 'Belki',
        meaningEn: 'maybe / perhaps (informal)',
        meaningTr: 'belki (günlük dil)',
        examples: [
          { pt: 'Se calhar vou à praia.', en: 'Maybe I will go to the beach.', tr: 'Belki plaja giderim.' },
          { pt: 'Se calhar ele está em casa.', en: 'Maybe he is at home.', tr: 'Belki evdedir.' },
          { pt: 'Se calhar chove amanhã.', en: 'Maybe it will rain tomorrow.', tr: 'Belki yarın yağmur yağar.' },
        ],
      },
      {
        word: 'provavelmente',
        emoji: '🤔',
        useCaseEn: 'Probably',
        useCaseTr: 'Muhtemelen',
        meaningEn: 'probably',
        meaningTr: 'muhtemelen',
        examples: [
          { pt: 'Provavelmente vai chover amanhã.', en: 'It will probably rain tomorrow.', tr: 'Yarın muhtemelen yağmur yağacak.' },
          { pt: 'Ele está provavelmente em casa.', en: 'He is probably at home.', tr: 'Muhtemelen evdedir.' },
          { pt: 'Provavelmente vou comer pizza.', en: 'I will probably eat pizza.', tr: 'Muhtemelen pizza yiyeceğim.' },
        ],
      },
    ],
  },

  // ── Addition & Contrast ───────────────────────────────────────────────────
  {
    labelEn: 'Addition & Contrast',
    labelTr: 'Ekleme & Karşıtlık',
    emoji: '🔄',
    adverbs: [
      {
        word: 'também',
        emoji: '➕',
        useCaseEn: 'Also / Too',
        useCaseTr: 'De / Da / Ayrıca',
        meaningEn: 'also / too / as well',
        meaningTr: 'de / da / ayrıca',
        examples: [
          { pt: 'Eu também quero ir!', en: 'I also want to go!', tr: 'Ben de gitmek istiyorum!' },
          { pt: 'Ele fala inglês e também português.', en: 'He speaks English and also Portuguese.', tr: 'O İngilizce ve ayrıca Portekizce konuşuyor.' },
          { pt: 'A minha irmã também tem um gato.', en: 'My sister also has a cat.', tr: 'Kız kardeşimin de bir kedisi var.' },
        ],
      },
      {
        word: 'apesar',
        emoji: '🔄',
        useCaseEn: 'Despite / In spite of',
        useCaseTr: 'Rağmen / Karşın',
        meaningEn: 'despite / in spite of (apesar de)',
        meaningTr: 'rağmen / karşın (apesar de)',
        examples: [
          { pt: 'Fui à escola apesar da chuva.', en: 'I went to school despite the rain.', tr: 'Yağmura rağmen okula gittim.' },
          { pt: 'Ela comeu apesar de não ter fome.', en: 'She ate despite not being hungry.', tr: 'Aç olmadığı hâlde yedi.' },
          { pt: 'Apesar do frio, saí de casa.', en: 'Despite the cold, I went outside.', tr: 'Soğuğa rağmen dışarı çıktım.' },
        ],
      },
    ],
  },
];

/** Flat map of word → AdverbEntry for quick lookup */
export const adverbByWord: Record<string, AdverbEntry> = Object.fromEntries(
  adverbGroups.flatMap((g) => g.adverbs.map((a) => [a.word, a]))
);
