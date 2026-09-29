// ─────────────────────────────────────────────────────────────
//  ВСЁ СОДЕРЖИМОЕ САЙТА — В ЭТОМ ФАЙЛЕ.
//  Тексты лежат в двух словарях одного типа: `ru` и `en`.
//  TypeScript проверяет, что в `en` есть все ключи из `ru`:
//  забытый перевод — ошибка сборки, а не пустое место на сайте.
//
//  Всё, что не переводится (имя, контакты, ссылки, картинки), —
//  в `brand` и `images` внизу файла.
// ─────────────────────────────────────────────────────────────

export type Lang = 'ru' | 'en'

/** Поле бренда, которое всё же зависит от языка. В компоненте: `brand.field[lang]`. */
export type Localized = Record<Lang, string>

/** Иконки карточек в центральной плитке — см. ICONS в Panels.jsx. */
export type PanelIcon = 'Dumbbell' | 'Activity' | 'Flame' | 'Trophy'

/** Строки блока контактов. Подпись — в `contacts.details` словаря, значение — в `brand.contacts`. */
export type ContactId = 'phone' | 'telegram' | 'whatsapp' | 'email'

export type Copy = {
  meta: { title: string; description: string }
  nav: {
    /** id — якорь секции: пункт ведёт на `#${id}`. */
    links: { id: string; label: string }[]
    cta: string
    language: string
    openMenu: string
    closeMenu: string
    avatarAlt: string
  }
  hero: {
    /**
     * Заголовок собирается по словам — каждое слово выезжает отдельно.
     * Вложенный массив — строка заголовка. dim: true → приглушённый белый (45%).
     */
    title: { text: string; dim?: boolean }[][]
    subtitle: string
    cta: string
    athleteAlt: string
  }
  panels: {
    intro: { title: string; link: string }
    /** Листаются сами каждые 3.5 сек. color — класс фона кружка. */
    cards: { icon: PanelIcon; color: string; text: string }[]
    /** aria-label переключателя карточек, {n} — номер. */
    cardLabel: string
    counter: { value: string; text: string }
  }
  about: {
    label: string
    title: string
    paragraphs: string[]
    stats: { value: string; caption: string }[]
    credentials: string[]
  }
  programs: {
    label: string
    title: string
    subtitle: string
    cta: string
    items: {
      icon3d: string
      title: string
      desc: string
      points: string[]
      price: string
      unit: string
    }[]
  }
  results: {
    label: string
    title: string
    subtitle: string
    /** Кавычки вокруг отзыва: «…» в русском, “…” в английском. */
    quoteMarks: [open: string, close: string]
    /** quote — необязательный отзыв; без него карточка выводится без цитаты. */
    cases: { name: string; sport: string; metric: string; period: string; quote?: string }[]
    /** Фото с турнира: подписи-стрелки поверх снимка и текст рядом. */
    showcase: {
      eyebrow: string
      title: string
      text: string
      coachTag: string
      mastersTag: string
      mastersNote: string
      alt: string
    }
  }
  faq: {
    title: string
    subtitle: string
    /** {link} заменяется на ссылку с текстом supportLabel. */
    supportText: string
    supportLabel: string
    items: { id: string; question: string; answer: string }[]
  }
  contacts: {
    label: string
    title: string
    subtitle: string
    form: {
      name: string
      namePlaceholder: string
      contact: string
      contactPlaceholder: string
      goal: string
      comment: string
      optional: string
      commentPlaceholder: string
    }
    /** id одинаковый во всех языках — он и уходит в заявку. */
    goals: { id: string; label: string }[]
    submit: string
    successTitle: string
    successText: string
    sendAnother: string
    details: Record<ContactId, string>
  }
  footer: { note: string }
}

// ─────────────────────────────────────────────────────────────
//  РУССКИЙ
// ─────────────────────────────────────────────────────────────
const ru: Copy = {
  meta: {
    title: 'Вадим Лойко — персональный тренер',
    description:
      'Персональные тренировки от мастера спорта международного класса по пауэрлифтингу: сила, пауэрлифтинг, бодибилдинг, кроссфит и воркаут. 14 лет стажа.',
  },

  nav: {
    links: [
      { id: 'about', label: 'Обо мне' },
      { id: 'programs', label: 'Направления' },
      { id: 'results', label: 'Результаты' },
      { id: 'contacts', label: 'Контакты' },
    ],
    cta: 'Записаться',
    language: 'Язык сайта',
    openMenu: 'Меню',
    closeMenu: 'Закрыть меню',
    avatarAlt: 'Тренер',
  },

  hero: {
    title: [
      [{ text: 'Сильнее' }],
      [
        { text: 'с', dim: true },
        { text: 'каждой', dim: true },
      ],
      [{ text: 'тренировкой' }],
    ],
    subtitle:
      'Персональные тренировки от мастера спорта международного класса по пауэрлифтингу: сила, масса, рельеф и подготовка к соревнованиям.',
    cta: 'Записаться',
    athleteAlt: 'Спортсмен на тренировке',
  },

  panels: {
    intro: {
      title: 'Начни свой путь к новой спортивной форме',
      link: 'Бесплатная консультация',
    },
    cards: [
      { icon: 'Dumbbell', color: 'bg-black', text: 'Сила и пауэрлифтинг: присед, жим, становая тяга' },
      { icon: 'Activity', color: 'bg-emerald-800', text: 'Кроссфит и воркаут — в группе и персонально' },
      { icon: 'Flame', color: 'bg-cyan-800', text: 'Бодибилдинг и бикини: подготовка к выступлениям' },
      { icon: 'Trophy', color: 'bg-amber-700', text: 'Программа под вашу цель — от новичка до профи' },
    ],
    cardLabel: 'Карточка {n}',
    counter: {
      value: '23',
      text: 'подопечных стали МС и КМС в шести видах спорта',
    },
  },

  about: {
    label: 'Обо мне',
    title: 'Четырнадцать лет в зале — от чемпионского помоста до ваших первых подходов',
    paragraphs: [
      'Меня зовут Вадим Лойко. Тренирую с 2011 года и за это время провёл больше 10 000 персональных тренировок. Сам выступаю в пауэрлифтинге: мастер спорта международного класса, рекордсмен России, Европы и мира среди юниоров.',
      'Работаю и с профессиональными спортсменами, и с новичками: силовой тренинг, бодибилдинг, кроссфит, воркаут. К каждому клиенту ищу индивидуальный подход — программа строится под цель, уровень подготовки и график.',
      'Сейчас — старший тренер и тренер первой категории в DDX Fitness: руковожу тренерским составом и наставляю молодых тренеров. У клиентов — больше 60 подтверждённых отзывов.',
    ],
    stats: [
      { value: '14 лет', caption: 'тренерского стажа' },
      { value: '10 000+', caption: 'персональных тренировок' },
      { value: '60+', caption: 'подтверждённых отзывов' },
    ],
    credentials: [
      'Мастер спорта международного класса по пауэрлифтингу',
      'Заслуженный мастер спорта (Элита России) по становой тяге',
      'Мастер спорта по боевому самбо',
      'Абсолютный чемпион Европы и мира среди юниоров (AWPC, APL, СПР)',
      'Рекордсмен России, Европы и мира по пауэрлифтингу среди юниоров (AWPC, APL, СПР)',
      'Абсолютный чемпион Беларуси среди юниоров (IPF, 2012)',
      'КМС по бодибилдингу (ФББР)',
      'Высшее образование: бакалавр физической культуры, Воронежский государственный институт физической культуры, 2016',
    ],
  },

  // Цены не указаны — «по запросу». Когда будут, впишите в price / unit в обоих языках.
  programs: {
    label: 'Направления',
    title: 'Четыре направления работы',
    subtitle:
      'На консультации подберём направление и нагрузку под вашу цель, уровень и график. Занятия — персонально или в группе.',
    cta: 'Записаться',
    items: [
      {
        icon3d: '/images/3d/target.webp',
        title: 'Персональные тренировки',
        desc: 'Один на один в зале: сила, масса, рельеф. Для новичков и действующих спортсменов.',
        points: [
          'Постановка техники с первого занятия',
          'Программа под цель и уровень',
          'Контроль каждого подхода',
        ],
        price: 'по запросу',
        unit: 'за занятие',
      },
      {
        icon3d: '/images/3d/chart.webp',
        title: 'Пауэрлифтинг',
        desc: 'Присед, жим лёжа и становая тяга от мастера спорта международного класса.',
        points: ['Техника соревновательных движений', 'Силовая периодизация', 'Подготовка к старту'],
        price: 'по запросу',
        unit: 'за занятие',
      },
      {
        icon3d: '/images/3d/trophy.webp',
        title: 'Бодибилдинг и бикини',
        desc: 'Подготовка к выступлениям — от любительского до профессионального уровня.',
        points: ['Набор формы под выступление', 'Подводка к дате старта', 'От первого старта до профи'],
        price: 'по запросу',
        unit: 'цикл подготовки',
      },
      {
        icon3d: '/images/3d/flash.webp',
        title: 'Кроссфит и воркаут',
        desc: 'Групповые и индивидуальные занятия — от новичка до соревновательного уровня.',
        points: ['Группы и персональные занятия', 'База для новичков', 'Подготовка к соревнованиям'],
        price: 'по запросу',
        unit: 'за занятие',
      },
    ],
  },

  // Разряды, которые подопечные получили под руководством Вадима.
  results: {
    label: 'Результаты',
    title: 'Разряды подопечных',
    subtitle: '6 мастеров спорта и 17 КМС в шести видах спорта — все подготовлены лично.',
    quoteMarks: ['«', '»'],
    cases: [
      {
        name: 'Триатлон',
        sport: '9 спортсменов',
        metric: '2 МС · 7 КМС',
        period: 'мастера и кандидаты в мастера спорта',
      },
      {
        name: 'Жим лёжа',
        sport: '7 спортсменов',
        metric: '2 МС · 5 КМС',
        period: 'мастера и кандидаты в мастера спорта',
      },
      {
        name: 'Воркаут',
        sport: '3 спортсмена',
        metric: '2 МС · 1 КМС',
        period: 'мастера и кандидат в мастера спорта',
      },
      {
        name: 'Бодибилдинг',
        sport: '2 спортсмена',
        metric: '2 КМС',
        period: 'кандидаты в мастера спорта',
      },
      {
        name: 'Бикини-фитнес',
        sport: '1 спортсменка',
        metric: '1 КМС',
        period: 'кандидат в мастера спорта',
      },
      {
        name: 'Подъём на бицепс',
        sport: '1 спортсмен',
        metric: '1 КМС',
        period: 'кандидат в мастера спорта',
      },
    ],
    showcase: {
      eyebrow: 'Открытый турнир · май 2025',
      title: 'Двое подопечных — мастера спорта',
      text: 'Оба спортсмена справа с медалями и дипломами готовились у Вадима лично. Рядом с ними — сам тренер.',
      coachTag: 'Вадим — тренер',
      mastersTag: 'Мастера спорта',
      mastersNote: 'подопечные Вадима',
      alt: 'Вадим Лойко с подопечными на награждении турнира',
    },
  },

  // Ответы проявляются побуквенно при раскрытии пункта.
  faq: {
    title: 'Частые вопросы',
    subtitle: 'Всё, что обычно спрашивают перед первой тренировкой',
    supportText: 'Не нашли свой вопрос? Напишите мне {link} — отвечаю лично.',
    supportLabel: 'в Telegram',
    items: [
      {
        id: 'faq-1',
        question: 'Я новичок. Возьмёте?',
        answer:
          'Да. Беру и тех, кто впервые пришёл в зал, и действующих спортсменов. Первые недели уходят на технику и базовую выносливость — без этого любая программа просто не сработает.',
      },
      {
        id: 'faq-2',
        question: 'Сколько тренировок в неделю нужно?',
        answer:
          'Обычно от двух до четырёх — зависит от цели и вашего графика. Точное количество определяем на консультации: две качественные тренировки дают больше, чем пять на износ.',
      },
      {
        id: 'faq-3',
        question: 'У меня была травма. Это помешает?',
        answer:
          'Нет, но план будет другим. На консультации разбираем, что именно было и как восстанавливались, при необходимости прошу заключение врача. Нагрузку подбираем так, чтобы не трогать проблемную зону.',
      },
      {
        id: 'faq-4',
        question: 'Как проходит онлайн-сопровождение?',
        answer:
          'Вы получаете программу на месяц вперёд, снимаете подходы на видео, я разбираю технику и корректирую нагрузку раз в неделю. Связь в мессенджере — вопросы можно задавать между тренировками.',
      },
      {
        id: 'faq-5',
        question: 'Можно тренироваться в своём зале?',
        answer:
          'Да, для онлайн-формата это норма. Составлю программу под то оборудование, которое реально есть в вашем зале, — подгонять её под идеальные условия смысла нет.',
      },
      {
        id: 'faq-6',
        question: 'Что входит в план питания?',
        answer:
          'Расчёт калорий и белка под вашу цель, режим приёмов пищи вокруг тренировок и список продуктов. Это не жёсткая диета по граммам, а рамка, внутри которой вы едите привычную еду.',
      },
    ],
  },

  // Форма пока никуда не отправляется — см. README.
  contacts: {
    label: 'Контакты',
    title: 'Запишитесь на бесплатную консультацию',
    subtitle:
      'Двадцать минут разговора: разберём цель, текущую форму и подберём формат работы. Без обязательств.',
    form: {
      name: 'Имя',
      namePlaceholder: 'Как к вам обращаться',
      contact: 'Телефон или Telegram',
      contactPlaceholder: '+7 ... или @nickname',
      goal: 'Цель',
      comment: 'Комментарий',
      optional: '— необязательно',
      commentPlaceholder: 'Текущая форма, опыт, травмы, удобное время',
    },
    goals: [
      { id: 'strength', label: 'Набрать силу и массу' },
      { id: 'powerlifting', label: 'Пауэрлифтинг' },
      { id: 'competition', label: 'Подготовка к соревнованиям' },
      { id: 'crossfit', label: 'Кроссфит или воркаут' },
      { id: 'other', label: 'Другое' },
    ],
    submit: 'Отправить заявку',
    successTitle: 'Заявка отправлена',
    successText: 'Свяжусь с вами в течение дня. Если вопрос срочный — пишите в Telegram или WhatsApp.',
    sendAnother: 'Отправить ещё одну',
    details: {
      phone: 'Телефон',
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      email: 'Email',
    },
  },

  footer: {
    note: '© 2026 · Вадим Лойко · Персональные тренировки',
  },
}

// ─────────────────────────────────────────────────────────────
//  ENGLISH
// ─────────────────────────────────────────────────────────────
const en: Copy = {
  meta: {
    title: 'Vadim Loiko — Personal Trainer',
    description:
      'Personal training with an international-class Master of Sport in powerlifting: strength, powerlifting, bodybuilding, CrossFit and calisthenics. 14 years of coaching.',
  },

  nav: {
    links: [
      { id: 'about', label: 'About' },
      { id: 'programs', label: 'Programs' },
      { id: 'results', label: 'Results' },
      { id: 'contacts', label: 'Contact' },
    ],
    cta: 'Book a session',
    language: 'Site language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    avatarAlt: 'Coach',
  },

  hero: {
    title: [
      [{ text: 'Stronger' }],
      [
        { text: 'with', dim: true },
        { text: 'every', dim: true },
      ],
      [{ text: 'workout' }],
    ],
    subtitle:
      'Personal training with an international-class Master of Sport in powerlifting: strength, size, definition and competition prep.',
    cta: 'Book a session',
    athleteAlt: 'Athlete training',
  },

  panels: {
    intro: {
      title: 'Take the first step toward your best shape yet',
      link: 'Free consultation',
    },
    cards: [
      { icon: 'Dumbbell', color: 'bg-black', text: 'Strength and powerlifting: squat, bench, deadlift' },
      { icon: 'Activity', color: 'bg-emerald-800', text: 'CrossFit and calisthenics — in a group or one-on-one' },
      { icon: 'Flame', color: 'bg-cyan-800', text: 'Bodybuilding and bikini: stage prep' },
      { icon: 'Trophy', color: 'bg-amber-700', text: 'A program built around your goal — beginner to pro' },
    ],
    cardLabel: 'Card {n}',
    counter: {
      value: '23',
      text: 'athletes coached to Master of Sport or CMS across six sports',
    },
  },

  about: {
    label: 'About me',
    title: 'Fourteen years in the gym — from the championship platform to your very first sets',
    paragraphs: [
      "My name is Vadim Loiko. I've been coaching since 2011 and have run more than 10,000 personal training sessions. I compete in powerlifting myself: I'm an international-class Master of Sport and a junior record holder in Russia, Europe and the world.",
      'I work with professional athletes and complete beginners alike: strength training, bodybuilding, CrossFit and calisthenics. Every client gets an individual approach — the program is built around your goal, your fitness level and your schedule.',
      "Today I'm a senior coach and first-category trainer at DDX Fitness, where I lead the coaching team and mentor young trainers. Clients have left me more than 60 verified reviews.",
    ],
    stats: [
      { value: '14 years', caption: 'of coaching experience' },
      { value: '10,000+', caption: 'personal training sessions' },
      { value: '60+', caption: 'verified reviews' },
    ],
    credentials: [
      'Master of Sport, International Class, in powerlifting',
      'Honored Master of Sport (Elite of Russia) in the deadlift',
      'Master of Sport in combat sambo',
      'Overall European and World junior champion (AWPC, APL, SPR)',
      'Junior powerlifting record holder in Russia, Europe and the world (AWPC, APL, SPR)',
      'Overall Belarus junior champion (IPF, 2012)',
      'Candidate Master of Sport in bodybuilding (FBBR)',
      "Bachelor's degree in Physical Education, Voronezh State Institute of Physical Culture, 2016",
    ],
  },

  // No prices yet — "on request". Fill in price / unit in both languages when ready.
  programs: {
    label: 'Programs',
    title: 'Four ways to train with me',
    subtitle:
      "In a consultation, we'll pick the right discipline and training load for your goal, level and schedule. Train one-on-one or in a group.",
    cta: 'Sign up',
    items: [
      {
        icon3d: '/images/3d/target.webp',
        title: 'Personal training',
        desc: 'One-on-one in the gym: strength, size and definition. For beginners and competing athletes alike.',
        points: [
          'Solid technique from the first session',
          'A program matched to your goal and level',
          'Every set supervised',
        ],
        price: 'on request',
        unit: 'per session',
      },
      {
        icon3d: '/images/3d/chart.webp',
        title: 'Powerlifting',
        desc: 'Squat, bench press and deadlift, coached by an international-class Master of Sport.',
        points: ['Competition lift technique', 'Strength periodization', 'Meet prep'],
        price: 'on request',
        unit: 'per session',
      },
      {
        icon3d: '/images/3d/trophy.webp',
        title: 'Bodybuilding & bikini',
        desc: 'Contest prep, from amateur to professional level.',
        points: ['Building your stage physique', 'Peaking for show day', 'From your first show to pro'],
        price: 'on request',
        unit: 'per prep cycle',
      },
      {
        icon3d: '/images/3d/flash.webp',
        title: 'CrossFit & calisthenics',
        desc: 'Group and private sessions, from beginner to competition level.',
        points: ['Group and one-on-one sessions', 'Fundamentals for beginners', 'Competition prep'],
        price: 'on request',
        unit: 'per session',
      },
    ],
  },

  // Sports titles Vadim's athletes earned under his coaching.
  results: {
    label: 'Results',
    title: 'Titles my athletes have earned',
    subtitle: '6 Masters of Sport and 17 Candidate Masters across six sports — every one coached personally.',
    quoteMarks: ['“', '”'],
    cases: [
      {
        name: 'Triathlon',
        sport: '9 athletes',
        metric: '2 MS · 7 CMS',
        period: 'Masters and Candidate Masters of Sport',
      },
      {
        name: 'Bench press',
        sport: '7 athletes',
        metric: '2 MS · 5 CMS',
        period: 'Masters and Candidate Masters of Sport',
      },
      {
        name: 'Street workout',
        sport: '3 athletes',
        metric: '2 MS · 1 CMS',
        period: 'Masters and a Candidate Master of Sport',
      },
      {
        name: 'Bodybuilding',
        sport: '2 athletes',
        metric: '2 CMS',
        period: 'Candidate Masters of Sport',
      },
      {
        name: 'Bikini fitness',
        sport: '1 athlete',
        metric: '1 CMS',
        period: 'Candidate Master of Sport',
      },
      {
        name: 'Biceps curl',
        sport: '1 athlete',
        metric: '1 CMS',
        period: 'Candidate Master of Sport',
      },
    ],
    showcase: {
      eyebrow: 'Open tournament · May 2025',
      title: 'Two athletes, two Masters of Sport',
      text: 'Both athletes on the right, with medals and diplomas, trained with Vadim personally. Next to them is the coach himself.',
      coachTag: 'Vadim — coach',
      mastersTag: 'Masters of Sport',
      mastersNote: "Vadim's athletes",
      alt: 'Vadim Loiko with his athletes at the tournament awards',
    },
  },

  faq: {
    title: 'Common questions',
    subtitle: 'Everything people usually ask before their first session',
    supportText: "Can't find your question? Message me {link} — I answer every one myself.",
    supportLabel: 'on Telegram',
    items: [
      {
        id: 'faq-1',
        question: "I'm a beginner. Will you take me on?",
        answer:
          "Yes. I work with people who've never set foot in a gym as well as competing athletes. The first few weeks go into technique and base endurance — skip that, and no program will actually work.",
      },
      {
        id: 'faq-2',
        question: 'How many sessions a week do I need?',
        answer:
          "Usually two to four, depending on your goal and schedule. We'll settle on the exact number during the consultation: two quality sessions do more for you than five that grind you down.",
      },
      {
        id: 'faq-3',
        question: "I've had an injury. Is that a problem?",
        answer:
          "No, but the plan will look different. In the consultation we'll go over exactly what happened and how you recovered, and if needed I'll ask for a doctor's report. We'll set the load so the problem area stays protected.",
      },
      {
        id: 'faq-4',
        question: 'How does online coaching work?',
        answer:
          'You get a program a month ahead and film your sets; I review your technique and adjust the load every week. We stay in touch by messenger, so you can ask questions between sessions.',
      },
      {
        id: 'faq-5',
        question: 'Can I train at my own gym?',
        answer:
          "Yes — that's standard for online coaching. I'll build the program around the equipment your gym actually has; there's no point designing it for ideal conditions.",
      },
      {
        id: 'faq-6',
        question: "What's in the nutrition plan?",
        answer:
          "Calorie and protein targets for your goal, meal timing around your training, and a shopping list. It isn't a strict gram-by-gram diet — it's a framework that lets you keep eating the food you're used to.",
      },
    ],
  },

  // The form doesn't send anywhere yet — see README.
  contacts: {
    label: 'Contact',
    title: 'Book a free consultation',
    subtitle:
      "A twenty-minute call: we'll go over your goal and current fitness and find the right format for you. No strings attached.",
    form: {
      name: 'Name',
      namePlaceholder: 'What should I call you?',
      contact: 'Phone or Telegram',
      contactPlaceholder: 'Phone number or @username',
      goal: 'Goal',
      comment: 'Comments',
      optional: '— optional',
      commentPlaceholder: 'Current fitness, experience, injuries, best time to reach you',
    },
    goals: [
      { id: 'strength', label: 'Build strength and muscle' },
      { id: 'powerlifting', label: 'Powerlifting' },
      { id: 'competition', label: 'Competition prep' },
      { id: 'crossfit', label: 'CrossFit or calisthenics' },
      { id: 'other', label: 'Something else' },
    ],
    submit: 'Send request',
    successTitle: 'Request sent',
    successText: "I'll get back to you within a day. If it's urgent, message me on Telegram or WhatsApp.",
    sendAnother: 'Send another one',
    details: {
      phone: 'Phone',
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      email: 'Email',
    },
  },

  footer: {
    note: '© 2026 · Vadim Loiko · Personal training',
  },
}

export const content: Record<Lang, Copy> = { ru, en }

// ─────────────────────────────────────────────────────────────
//  НЕ ПЕРЕВОДИТСЯ: имя, контакты, ссылки.
//  Поле, которое всё же зависит от языка, пишется как { ru, en }.
// ─────────────────────────────────────────────────────────────
export type Brand = {
  /** Логотип в шапке и подвале. */
  name: string
  /** Полное имя — подпись к фото тренера. */
  fullName: Localized
  /** Порядок строк в блоке контактов. Подписи — в `contacts.details` словаря. */
  contacts: {
    id: ContactId
    icon: 'Phone' | 'Send' | 'MessageCircle' | 'Mail'
    value: string
    href?: string
  }[]
  /** Ссылки в подвале. Подпись — строкой или { ru, en }, если зависит от языка. */
  footerLinks: { label: string | Localized; href: string }[]
}

export const brand: Brand = {
  name: 'VADIM',
  fullName: { ru: 'Вадим Лойко', en: 'Vadim Loiko' },
  contacts: [
    { id: 'phone', icon: 'Phone', value: '+7 (915) 225-22-41', href: 'tel:+79152252241' },
    { id: 'telegram', icon: 'Send', value: '+7 (915) 225-22-41', href: 'https://t.me/+79152252241' },
    { id: 'whatsapp', icon: 'MessageCircle', value: '+7 (915) 225-22-41', href: 'https://wa.me/79152252241' },
    { id: 'email', icon: 'Mail', value: 'dybostepan@gmail.com', href: 'mailto:dybostepan@gmail.com' },
  ],
  footerLinks: [
    { label: 'Telegram', href: 'https://t.me/+79152252241' },
    { label: 'WhatsApp', href: 'https://wa.me/79152252241' },
    {
      label: { ru: 'Отзывы на DDX Fitness', en: 'Reviews on DDX Fitness' },
      href: 'https://ddxfitness.me/employee_detail/5281',
    },
  ],
}

// ─────────────────────────────────────────────────────────────
//  КАРТИНКИ — одни на оба языка.
// ─────────────────────────────────────────────────────────────
export const images = {
  // Фон первого экрана. Заменить на фото зала / тренировки (jpg, ~1920px).
  heroBg: '/images/hero-bg.svg',
  // Крупное фото спортсмена (справа на десктопе, снизу на мобильном). 5:6, вертикальное.
  athlete: '/images/athlete.webp',
  // Аватар тренера в шапке.
  avatar: '/images/vadim-avatar.jpg',
  // Маленькая картинка в строке заголовка.
  accent: '/images/accent.svg',
  // Декор в первой плитке футера.
  panelDecor: '/images/panel-decor.svg',
  // Картинка в третьей (чёрной) плитке футера.
  panelCard: '/images/panel-card.webp',
  // Фото в секции «Обо мне». 3:4, вертикальное.
  coach: '/images/vadim-sea.webp',
  // Фото с турнира в секции «Результаты». Подписи-стрелки привязаны к этому кадру (см. TournamentShot.jsx).
  tournament: '/images/tournament.webp',
  // 3D-иконка в заголовке FAQ.
  faqIcon: '/images/3d/chat-text.webp',
}
