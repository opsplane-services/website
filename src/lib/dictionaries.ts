import type { Locale } from './i18n';

export interface Dictionary {
  meta: { title: string; description: string };
  nav: { home: string; blog: string; contact: string; github: string; menu: string; close: string };
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    primary: string;
    secondary: string;
  };
  services: {
    eyebrow: string;
    title: string;
    lede: string;
    items: { name: string; port: string; description: string; points: string[] }[];
  };
  roadmap: {
    eyebrow: string;
    title: string;
    lede: string;
    badge: string;
    items: { name: string; description: string; points: string[] }[];
  };
  value: {
    eyebrow: string;
    title: string;
    lede: string;
    points: { title: string; body: string }[];
  };
  operator: {
    eyebrow: string;
    title: string;
    lede: string;
    points: { title: string; body: string }[];
  };
  principles: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  quickstart: {
    eyebrow: string;
    title: string;
    lede: string;
    note: string;
    cta: string;
  };
  cta: { title: string; lede: string; primary: string; secondary: string };
  blog: {
    title: string;
    lede: string;
    readMore: string;
    back: string;
    empty: string;
    minuteRead: string;
  };
  contact: {
    title: string;
    lede: string;
    name: string;
    email: string;
    company: string;
    subject: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    optional: string;
    directTitle: string;
    directBody: string;
    elsewhere: string;
    mailtoNote: string;
  };
  footer: { tagline: string; navTitle: string; resourcesTitle: string; rights: string; docs: string };
}

const en: Dictionary = {
  meta: {
    title: 'OpsPlane Services',
    description:
      'One self-hosted platform for everything around your business logic: identity, incidents, feature flags, secrets and an API gateway — with a full AI stack and durable execution on the way. Fewer vendors, lower cost, small enough to run yourself.',
  },
  nav: {
    home: 'Home',
    blog: 'Blog',
    contact: 'Contact',
    github: 'GitHub',
    menu: 'Menu',
    close: 'Close',
  },
  hero: {
    eyebrow: 'One self-hosted platform',
    title: 'Everything around your business logic, in one platform.',
    lede:
      'Identity, incident management, feature flags, secrets and an API gateway today — a full AI stack and durable execution next. Small enough that one team can run it, broad enough to replace a shelf of SaaS subscriptions. You write the business logic; OpsPlane covers everything around it.',
    primary: 'Get started',
    secondary: 'View on GitHub',
  },
  services: {
    eyebrow: 'Available today',
    title: 'Five services, one control plane',
    lede:
      'Each service is an independent Rust binary with its own database and API. Run all of them, or just the ones you need — they share one identity model, one gateway and one audit trail.',
    items: [
      {
        name: 'Auth',
        port: 'Rust · :8001',
        description:
          'The single source of truth for identity. Other services validate JWTs; they never manage users themselves.',
        points: [
          'OAuth via GitHub and Google, plus local login',
          'Users, groups, roles and organizations',
          'Service accounts with scoped API keys',
          'JWT issuing and session management',
        ],
      },
      {
        name: 'Incident Management',
        port: 'Rust · :8000',
        description:
          'Turns alert noise into a reviewable incident record, with a state machine that matches how teams actually work.',
        points: [
          'Webhook pipeline with deduplication and grouping',
          'Connectors for multiple Grafana instances',
          'Incident state machine and full timeline',
          'Alert-to-incident correlation',
        ],
      },
      {
        name: 'Feature Flags',
        port: 'Rust · :8082',
        description:
          'A vendor-neutral flag service that speaks OFREP, so any OpenFeature SDK works against it out of the box.',
        points: [
          'OFREP protocol — OpenFeature compatible',
          'Targeting rules and percentage rollouts',
          'Environments for dev, staging and production',
          'Scheduled changes and a full audit log',
        ],
      },
      {
        name: 'Security',
        port: 'Rust · :8083',
        description:
          'One API in front of every secret store you already run, with access control that reuses your platform roles.',
        points: [
          'HashiCorp Vault and OpenBao connectors',
          'AWS Secrets Manager, GCP Secret Manager, Azure Key Vault',
          'RBAC policies by role, group, service account or user',
          'Workload and managed identity support',
        ],
      },
      {
        name: 'Gateway',
        port: 'Rust · :8084 / :8085',
        description:
          'A reverse proxy that already knows about your platform identity, so authentication is not a plugin you bolt on.',
        points: [
          'Path, host and method routing with weighted load balancing',
          'JWT and API key auth validated against the auth service',
          'Token-bucket rate limiting per key, user, IP or globally',
          'WASM plugins on request and response phases',
        ],
      },
    ],
  },
  roadmap: {
    eyebrow: 'On the roadmap',
    title: 'Where the platform is going',
    lede:
      'These are not shipping yet. They are listed so you can judge the direction before committing to it — not so you can plan around a date.',
    badge: 'Planned',
    items: [
      {
        name: 'A full AI stack',
        description:
          'One chat interface over the whole AI surface — in the spirit of LibreChat, where many separate AI components sit behind a single front end — wired into platform identity and audit from the start rather than bolted on later.',
        points: [
          'A single chat interface across model providers',
          'Prompts, retrieval and tool access managed in one place',
          'The same users, roles and audit trail as every other service',
          'Usage visible per team, because it runs on your side',
        ],
      },
      {
        name: 'Durable execution',
        description:
          'Support for durable execution frameworks, so long-running work survives restarts, retries and deploys without you hand-writing the bookkeeping around it.',
        points: [
          'Workflows that outlive the process that started them',
          'Retries, timeouts and compensation handled by the framework',
          'State kept by the platform, not scattered across your tables',
          'Your code stays business logic instead of becoming a state machine',
        ],
      },
    ],
  },
  value: {
    eyebrow: 'The economics',
    title: 'Fewer vendors, lower cost, less to hold together',
    lede:
      'Every service here is something teams normally buy separately. Bought separately, each one also has to be integrated separately, reviewed separately and renewed separately — and that is rarely the bill anyone counts.',
    points: [
      {
        title: 'One deployment instead of six subscriptions',
        body:
          'Feature flags, incident management, secret management, a gateway and an AI layer are five or six vendors at most companies. Here they are one thing you run.',
      },
      {
        title: 'One integration, not one per pair',
        body:
          'The services share identity, gateway and audit trail by design, so you are not writing glue between vendors who never planned for each other.',
      },
      {
        title: 'One security review',
        body:
          'One codebase, one deployment, one data boundary to assess — instead of a fresh questionnaire per vendor, every renewal cycle.',
      },
      {
        title: 'Small enough to actually run',
        body:
          'A handful of Rust binaries and one PostgreSQL. Self-hosting this is not meant to become a platform team’s full-time job.',
      },
    ],
  },
  operator: {
    eyebrow: 'Declarative by default',
    title: 'Your platform, described in YAML',
    lede:
      'A Go operator watches 19 custom resources and reconciles them into the services behind them. Users, roles, gateway routes, rate limits and secret connectors all live in Git — not in a UI someone clicked through once.',
    points: [
      {
        title: 'GitOps from day one',
        body:
          'Every platform resource is a CRD, so changes go through the same review and rollback process as your application code.',
      },
      {
        title: 'Reconciled, not scripted',
        body:
          'The operator syncs custom resources to each service through create-if-not-exists endpoints. Re-applying is always safe.',
      },
      {
        title: 'A web UI when you want one',
        body:
          'The Next.js console covers dashboards, incidents, flags, connectors and settings — with dark mode and full mobile support.',
      },
    ],
  },
  principles: {
    eyebrow: 'Why it is built this way',
    title: 'Opinions worth having',
    items: [
      {
        title: 'You bring the business logic',
        body:
          'Everything a product needs but no product is really about — login, flags, secrets, alerts, long-running work — is the platform’s job. That division is the whole point.',
      },
      {
        title: 'Auth is a platform concern',
        body:
          'Identity lives in exactly one service. Everything else validates a token. No duplicated user tables, no drifting permission models.',
      },
      {
        title: 'Self-hosted, not SaaS-shaped',
        body:
          'Runs on your Kubernetes cluster, against your PostgreSQL, behind your network boundary. Your incident data — and later your prompts — never leave your infrastructure.',
      },
      {
        title: 'Open protocols over lock-in',
        body:
          'OFREP for flags, Grafana webhooks for alerts, standard OAuth for login. Swap OpsPlane out and your integrations still make sense.',
      },
    ],
  },
  quickstart: {
    eyebrow: 'Quickstart',
    title: 'Running locally in a few commands',
    lede:
      'Start PostgreSQL, create the service databases and bring up every service with a single make target.',
    note: 'Then open http://localhost:3000 and sign in with the default admin account.',
    cta: 'Read the full documentation',
  },
  cta: {
    title: 'Bring your platform under one roof',
    lede:
      'Tell us what your team is paying for today and we will help you work out whether OpsPlane replaces enough of it to be worth the move — or say so plainly if it does not.',
    primary: 'Get in touch',
    secondary: 'Browse the source',
  },
  blog: {
    title: 'Blog',
    lede: 'Notes on platform engineering, incident response and building OpsPlane Services.',
    readMore: 'Read more',
    back: 'Back to blog',
    empty: 'No posts published yet. Check back soon.',
    minuteRead: 'min read',
  },
  contact: {
    title: 'Contact',
    lede:
      'Questions about the platform, self-hosting, or working with us? Send a message and we will get back to you.',
    name: 'Name',
    email: 'Email',
    company: 'Company',
    subject: 'Subject',
    message: 'Message',
    send: 'Send message',
    sending: 'Sending…',
    success: 'Thanks — your message is on its way. We will reply by email.',
    error: 'Something went wrong sending your message. Please email us directly instead.',
    optional: 'optional',
    directTitle: 'Prefer email?',
    directBody: 'Write to us directly and we will pick it up from there.',
    elsewhere: 'Elsewhere',
    mailtoNote:
      'The contact form is not configured yet, so this button opens your email client instead.',
  },
  footer: {
    tagline:
      'One self-hosted platform for everything around your business logic. Fewer vendors, less to run.',
    navTitle: 'Site',
    resourcesTitle: 'Resources',
    rights: 'All rights reserved.',
    docs: 'Documentation',
  },
};

const hu: Dictionary = {
  meta: {
    title: 'OpsPlane Services',
    description:
      'Egyetlen, saját üzemeltetésű platform mindenre, ami az üzleti logikád körül kell: azonosítás, incidenskezelés, feature flagek, titokkezelés és API gateway — teljes AI stackkel és durable executionnel a láthatáron. Kevesebb szállító, kisebb költség, elég kicsi ahhoz, hogy magad üzemeltesd.',
  },
  nav: {
    home: 'Főoldal',
    blog: 'Blog',
    contact: 'Kapcsolat',
    github: 'GitHub',
    menu: 'Menü',
    close: 'Bezárás',
  },
  hero: {
    eyebrow: 'Egyetlen, saját üzemeltetésű platform',
    title: 'Minden, ami az üzleti logikád körül kell, egy platformban.',
    lede:
      'Ma azonosítás, incidenskezelés, feature flagek, titokkezelés és API gateway — utána teljes AI stack és durable execution. Elég kicsi ahhoz, hogy egy csapat üzemeltesse, és elég széles ahhoz, hogy kiváltson egy polcnyi SaaS előfizetést. Te az üzleti logikát írod; a körülötte lévő részt az OpsPlane hozza.',
    primary: 'Kezdjük el',
    secondary: 'Megnézem GitHubon',
  },
  services: {
    eyebrow: 'Már elérhető',
    title: 'Öt szolgáltatás, egy vezérlősík',
    lede:
      'Minden szolgáltatás önálló Rust bináris, saját adatbázissal és API-val. Futtasd mindet, vagy csak azt, amire szükséged van — közös az azonosítási modell, a gateway és az audit napló.',
    items: [
      {
        name: 'Auth',
        port: 'Rust · :8001',
        description:
          'Az azonosítás egyetlen forrása. A többi szolgáltatás JWT-t validál, felhasználót soha nem kezel.',
        points: [
          'OAuth GitHubbal és Google-lel, valamint helyi bejelentkezés',
          'Felhasználók, csoportok, szerepkörök és szervezetek',
          'Szolgáltatásfiókok hatókörös API kulcsokkal',
          'JWT kibocsátás és munkamenet-kezelés',
        ],
      },
      {
        name: 'Incidenskezelés',
        port: 'Rust · :8000',
        description:
          'A riasztászajból átnézhető incidensnyilvántartást csinál, olyan állapotgéppel, ami illeszkedik a csapatok tényleges munkájához.',
        points: [
          'Webhook-feldolgozás deduplikációval és csoportosítással',
          'Konnektorok több Grafana példányhoz',
          'Incidens-állapotgép és teljes idővonal',
          'Riasztás–incidens összerendelés',
        ],
      },
      {
        name: 'Feature flagek',
        port: 'Rust · :8082',
        description:
          'Gyártófüggetlen flag-szolgáltatás OFREP protokollal, így bármelyik OpenFeature SDK azonnal működik vele.',
        points: [
          'OFREP protokoll — OpenFeature-kompatibilis',
          'Célzási szabályok és százalékos bevezetés',
          'Környezetek fejlesztéshez, stagingre és élesre',
          'Ütemezett módosítások és teljes audit napló',
        ],
      },
      {
        name: 'Biztonság',
        port: 'Rust · :8083',
        description:
          'Egyetlen API a már használt titoktárak előtt, olyan hozzáférés-kezeléssel, ami a platform szerepköreit használja újra.',
        points: [
          'HashiCorp Vault és OpenBao konnektorok',
          'AWS Secrets Manager, GCP Secret Manager, Azure Key Vault',
          'RBAC szabályok szerepkör, csoport, szolgáltatásfiók vagy felhasználó szerint',
          'Workload és managed identity támogatás',
        ],
      },
      {
        name: 'Gateway',
        port: 'Rust · :8084 / :8085',
        description:
          'Reverse proxy, amely eleve ismeri a platform azonosítási rendszerét — az autentikáció itt nem utólag felcsavarozott bővítmény.',
        points: [
          'Útvonal, host és metódus szerinti routing, súlyozott terheléselosztással',
          'JWT és API kulcs alapú hitelesítés az auth szolgáltatáshoz kötve',
          'Token-bucket rate limit kulcsonként, felhasználónként, IP-nként vagy globálisan',
          'WASM bővítmények kérés és válasz fázisban',
        ],
      },
    ],
  },
  roadmap: {
    eyebrow: 'A roadmapen',
    title: 'Merre tart a platform',
    lede:
      'Ezek még nem elérhetők. Azért soroljuk fel őket, hogy meg tudd ítélni az irányt, mielőtt elköteleződsz — nem azért, hogy dátumra tervezz velük.',
    badge: 'Tervezett',
    items: [
      {
        name: 'Teljes AI stack',
        description:
          'Egyetlen chat felület a teljes AI felület fölött — a LibreChat szellemében, ahol sok különálló AI komponens ül egyetlen front end mögött —, az első pillanattól a platform azonosításába és auditjába kötve, nem utólag ráaggatva.',
        points: [
          'Egyetlen chat felület a modellszolgáltatók fölött',
          'Promptok, retrieval és eszközhozzáférés egy helyen kezelve',
          'Ugyanazok a felhasználók, szerepkörök és audit napló, mint minden más szolgáltatásnál',
          'Csapatonként látható felhasználás, mert nálad fut',
        ],
      },
      {
        name: 'Durable execution',
        description:
          'Durable execution keretrendszerek támogatása, hogy a hosszan futó munka túlélje az újraindításokat, az újrapróbálkozásokat és a deployokat — anélkül, hogy neked kellene kézzel megírnod a körülötte lévő könyvelést.',
        points: [
          'Folyamatok, amelyek túlélik az őket indító processzt',
          'Újrapróbálkozás, időtúllépés és kompenzáció a keretrendszer dolga',
          'Az állapotot a platform tartja, nem a te tábláidban szóródik szét',
          'A kódod üzleti logika marad, nem válik állapotgéppé',
        ],
      },
    ],
  },
  value: {
    eyebrow: 'A számok',
    title: 'Kevesebb szállító, kisebb költség, kevesebb összetartandó darab',
    lede:
      'Itt minden szolgáltatás olyan, amit a csapatok külön szoktak megvenni. Külön megvéve viszont mindet külön is kell integrálni, külön átvilágítani és külön meghosszabbítani — és ezt a számlát ritkán számolja össze bárki.',
    points: [
      {
        title: 'Egy telepítés hat előfizetés helyett',
        body:
          'A feature flagek, az incidenskezelés, a titokkezelés, a gateway és az AI réteg a legtöbb cégnél öt-hat szállító. Itt egyetlen dolog, amit futtatsz.',
      },
      {
        title: 'Egy integráció, nem páronként egy',
        body:
          'A szolgáltatások eleve közös azonosítást, gatewayt és audit naplót használnak, így nem neked kell ragasztókódot írni olyan szállítók közé, akik sosem terveztek egymásra.',
      },
      {
        title: 'Egy biztonsági átvilágítás',
        body:
          'Egy kódbázis, egy telepítés, egy adathatár, amit fel kell mérni — szállítónkénti új kérdőívek helyett, minden hosszabbítási körben.',
      },
      {
        title: 'Elég kicsi ahhoz, hogy tényleg üzemeltesd',
        body:
          'Néhány Rust bináris és egy PostgreSQL. Ennek a saját üzemeltetése nem arra való, hogy egy platformcsapat főállása legyen.',
      },
    ],
  },
  operator: {
    eyebrow: 'Alapból deklaratív',
    title: 'A platformod, YAML-ben leírva',
    lede:
      'Egy Go operátor 19 egyedi erőforrást figyel, és szinkronizálja őket a mögöttes szolgáltatásokba. A felhasználók, szerepkörök, gateway útvonalak, rate limitek és titok-konnektorok mind Gitben élnek — nem egy felületen, ahol valaki egyszer végigkattintotta.',
    points: [
      {
        title: 'GitOps az első naptól',
        body:
          'Minden platform-erőforrás CRD, így a módosítások ugyanazon az átnézési és visszaállítási folyamaton mennek át, mint az alkalmazáskód.',
      },
      {
        title: 'Szinkronizált, nem szkriptelt',
        body:
          'Az operátor create-if-not-exists végpontokon keresztül szinkronizál. Az újbóli alkalmazás mindig biztonságos.',
      },
      {
        title: 'Webes felület, ha kell',
        body:
          'A Next.js konzol lefedi a dashboardokat, incidenseket, flageket, konnektorokat és beállításokat — sötét témával és teljes mobiltámogatással.',
      },
    ],
  },
  principles: {
    eyebrow: 'Miért így épült',
    title: 'Vállalható alapelvek',
    items: [
      {
        title: 'Te hozod az üzleti logikát',
        body:
          'Minden, amire egy terméknek szüksége van, de amiről egyik termék sem szól igazán — bejelentkezés, flagek, titkok, riasztások, hosszan futó munka — a platform dolga. Pontosan ez a felosztás a lényeg.',
      },
      {
        title: 'Az azonosítás platformszintű kérdés',
        body:
          'Az identitás pontosan egy szolgáltatásban él. A többi csak tokent validál. Nincs duplikált felhasználótábla és nincs szétcsúszó jogosultsági modell.',
      },
      {
        title: 'Saját üzemeltetés, nem SaaS',
        body:
          'A saját Kubernetes klasztereden, a saját PostgreSQL-eden, a saját hálózati határodon belül fut. Az incidensadataid — és később a promptjaid — nem hagyják el az infrastruktúrádat.',
      },
      {
        title: 'Nyílt protokollok bezártság helyett',
        body:
          'OFREP a flagekhez, Grafana webhookok a riasztásokhoz, szabványos OAuth a bejelentkezéshez. Ha lecseréled az OpsPlane-t, az integrációidnak akkor is lesz értelmük.',
      },
    ],
  },
  quickstart: {
    eyebrow: 'Gyors kezdés',
    title: 'Helyi futtatás néhány paranccsal',
    lede:
      'Indítsd el a PostgreSQL-t, hozd létre a szolgáltatás-adatbázisokat, majd egyetlen make paranccsal indítsd az összes szolgáltatást.',
    note: 'Ezután nyisd meg a http://localhost:3000 címet, és jelentkezz be az alapértelmezett admin fiókkal.',
    cta: 'Teljes dokumentáció',
  },
  cta: {
    title: 'Hozd egy fedél alá a platformodat',
    lede:
      'Írd meg, miért fizet ma a csapatod, és segítünk kideríteni, hogy az OpsPlane eleget vált-e ki ahhoz, hogy megérje a váltás — vagy őszintén megmondjuk, ha nem.',
    primary: 'Írj nekünk',
    secondary: 'Forráskód megtekintése',
  },
  blog: {
    title: 'Blog',
    lede: 'Jegyzetek a platformmérnökségről, az incidenskezelésről és az OpsPlane Services építéséről.',
    readMore: 'Tovább',
    back: 'Vissza a bloghoz',
    empty: 'Még nincs megjelent bejegyzés. Nézz vissza hamarosan.',
    minuteRead: 'perc olvasás',
  },
  contact: {
    title: 'Kapcsolat',
    lede:
      'Kérdésed van a platformról, a saját üzemeltetésről vagy az együttműködésről? Írj nekünk, és jelentkezünk.',
    name: 'Név',
    email: 'E-mail',
    company: 'Cég',
    subject: 'Tárgy',
    message: 'Üzenet',
    send: 'Üzenet küldése',
    sending: 'Küldés…',
    success: 'Köszönjük — az üzeneted elindult. E-mailben válaszolunk.',
    error: 'Az üzenet küldése nem sikerült. Kérjük, írj közvetlenül e-mailben.',
    optional: 'nem kötelező',
    directTitle: 'Inkább e-mail?',
    directBody: 'Írj közvetlenül, és onnan folytatjuk.',
    elsewhere: 'Máshol',
    mailtoNote:
      'A kapcsolatfelvételi űrlap még nincs beállítva, ezért ez a gomb az e-mail kliensedet nyitja meg.',
  },
  footer: {
    tagline:
      'Egyetlen, saját üzemeltetésű platform mindenre, ami az üzleti logikád körül kell. Kevesebb szállító, kevesebb üzemeltetnivaló.',
    navTitle: 'Oldal',
    resourcesTitle: 'Források',
    rights: 'Minden jog fenntartva.',
    docs: 'Dokumentáció',
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, hu };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
