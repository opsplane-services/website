import type { Locale } from './i18n';

export interface Dictionary {
  meta: { title: string; description: string };
  nav: { home: string; blog: string; contact: string; menu: string; close: string };
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    primary: string;
  };
  services: {
    eyebrow: string;
    title: string;
    lede: string;
    items: { name: string; port?: string; description: string; points: string[] }[];
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
  cta: { title: string; lede: string; primary: string };
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
    mailtoNote: string;
  };
  footer: { tagline: string; navTitle: string; resourcesTitle: string; rights: string };
}

const en: Dictionary = {
  meta: {
    title: 'OpsPlane Services',
    description:
      'One self-hosted platform for everything around your business logic: identity and secrets, observability, SLOs and incidents, feature flags, an API gateway, an AI stack and durable execution. Fewer vendors, lower cost, small enough to run yourself.',
  },
  nav: {
    home: 'Home',
    blog: 'Blog',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
  },
  hero: {
    eyebrow: 'One self-hosted platform',
    title: 'Everything around your business logic, in one platform.',
    lede:
      'Identity and secrets, observability, SLOs and incidents, feature flags, an API gateway, an AI stack and durable execution — in a single platform you run yourself. Small enough that one team can operate it, broad enough to replace a shelf of SaaS subscriptions. You write the business logic; OpsPlane covers everything around it.',
    primary: 'Get in touch',
  },
  services: {
    eyebrow: 'The platform',
    title: 'One control plane, everything behind it',
    lede:
      'Each service runs independently, with its own database and API. Run all of them, or only the ones you need — they share one identity model, one gateway and one audit trail.',
    items: [
      {
        name: 'Security & Identity',
        port: 'Rust · :8083',
        description:
          'Who someone is and what they can reach, in one place — and one API in front of every secret store you already run.',
        points: [
          'Users, groups, roles and organizations',
          'OAuth and local login, service accounts with scoped API keys',
          'HashiCorp Vault, OpenBao, AWS, GCP and Azure secret backends',
          'RBAC policies by role, group, service account or user',
        ],
      },
      {
        name: 'Observability',
        description:
          'Metrics, logs and traces from your services under one query surface, feeding the same objectives and alerts the incident side runs on.',
        points: [
          'Metrics, logs and traces in one place',
          'OpenTelemetry ingest — no proprietary agent to install',
          'Dashboards per service and per team',
          'Feeds service level objectives and alerting directly',
        ],
      },
      {
        name: 'SLOs & Incident Management',
        port: 'Rust · :8000',
        description:
          'Tracks the service objectives that decide what counts as a problem, and turns the resulting alert noise into a reviewable incident record.',
        points: [
          'Service level objectives with error budgets and burn-rate alerting',
          'Webhook pipeline with deduplication and grouping',
          'Incident state machine and full timeline',
          'Connectors for multiple Grafana instances',
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
        name: 'Gateway',
        port: 'Rust · :8084 / :8085',
        description:
          'A reverse proxy that already knows your platform identity, so authentication is not a plugin you bolt on.',
        points: [
          'Path, host and method routing with weighted load balancing',
          'JWT and API key auth validated by the platform itself',
          'Token-bucket rate limiting per key, user, IP or globally',
          'WASM plugins on request and response phases',
        ],
      },
      {
        name: 'AI Stack',
        description:
          'One chat interface over the whole AI surface — many separate AI components behind a single front end — on the same identity and audit trail as everything else.',
        points: [
          'A single chat interface across model providers',
          'Prompts, retrieval and tool access managed in one place',
          'The same users, roles and audit trail as every other service',
          'Usage visible per team, because it runs on your side',
        ],
      },
      {
        name: 'Durable Execution',
        description:
          'Long-running work that survives restarts, retries and deploys, so you are not hand-writing the bookkeeping around it.',
        points: [
          'Workflows that outlive the process that started them',
          'Retries, timeouts and compensation handled for you',
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
        title: 'One deployment instead of seven subscriptions',
        body:
          'Feature flags, observability, incident management, secret management, a gateway and an AI layer are six or seven vendors at most companies. Here they are one thing you run.',
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
      'A Kubernetes operator watches your custom resources and reconciles them into the services behind them. Users, roles, gateway routes, rate limits and secret connectors all live in your Git repository — not in a UI someone clicked through once.',
    points: [
      {
        title: 'GitOps from day one',
        body:
          'Every platform resource is a custom resource, so changes go through the same review and rollback process as your application code.',
      },
      {
        title: 'Reconciled, not scripted',
        body:
          'The operator syncs resources to each service through create-if-not-exists endpoints. Re-applying is always safe.',
      },
      {
        title: 'A web UI when you want one',
        body:
          'The console covers dashboards, incidents, flags, connectors and settings — with dark mode and full mobile support.',
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
        title: 'One identity, everywhere',
        body:
          'Identity is defined once and every service reads it. No duplicated user tables, no permission model that drifts from service to service.',
      },
      {
        title: 'Self-hosted, not SaaS-shaped',
        body:
          'Runs on your Kubernetes cluster, against your PostgreSQL, behind your network boundary. Your incident data and your prompts never leave your infrastructure.',
      },
      {
        title: 'Open protocols over lock-in',
        body:
          'OFREP for flags, Grafana webhooks for alerts, standard OAuth for login. Swap OpsPlane out and your integrations still make sense.',
      },
    ],
  },
  cta: {
    title: 'Bring your platform under one roof',
    lede:
      'Tell us what your team is paying for today and we will help you work out whether OpsPlane replaces enough of it to be worth the move — or say so plainly if it does not.',
    primary: 'Get in touch',
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
    mailtoNote:
      'The contact form is not configured yet, so this button opens your email client instead.',
  },
  footer: {
    tagline:
      'One self-hosted platform for everything around your business logic. Fewer vendors, less to run.',
    navTitle: 'Site',
    resourcesTitle: 'Contact',
    rights: 'All rights reserved.',
  },
};

const hu: Dictionary = {
  meta: {
    title: 'OpsPlane Services',
    description:
      'Egyetlen, saját üzemeltetésű platform mindenre, ami az üzleti logikád körül kell: azonosítás és titokkezelés, observability, SLO-k és incidensek, feature flagek, API gateway, AI stack és durable execution. Kevesebb szállító, kisebb költség, elég kicsi ahhoz, hogy magad üzemeltesd.',
  },
  nav: {
    home: 'Főoldal',
    blog: 'Blog',
    contact: 'Kapcsolat',
    menu: 'Menü',
    close: 'Bezárás',
  },
  hero: {
    eyebrow: 'Egyetlen, saját üzemeltetésű platform',
    title: 'Minden, ami az üzleti logikád körül kell, egy platformban.',
    lede:
      'Azonosítás és titokkezelés, observability, SLO-k és incidensek, feature flagek, API gateway, AI stack és durable execution — egyetlen platformban, amit magad üzemeltetsz. Elég kicsi ahhoz, hogy egy csapat működtesse, és elég széles ahhoz, hogy kiváltson egy polcnyi SaaS előfizetést. Te az üzleti logikát írod; a körülötte lévő részt az OpsPlane hozza.',
    primary: 'Írj nekünk',
  },
  services: {
    eyebrow: 'A platform',
    title: 'Egy vezérlősík, mögötte minden',
    lede:
      'Minden szolgáltatás önállóan fut, saját adatbázissal és API-val. Futtasd mindet, vagy csak azt, amire szükséged van — közös az azonosítási modell, a gateway és az audit napló.',
    items: [
      {
        name: 'Biztonság és azonosítás',
        port: 'Rust · :8083',
        description:
          'Egy helyen, hogy ki kicsoda és mit érhet el — és egyetlen API a már használt titoktáraid előtt.',
        points: [
          'Felhasználók, csoportok, szerepkörök és szervezetek',
          'OAuth és helyi bejelentkezés, szolgáltatásfiókok hatókörös API kulcsokkal',
          'HashiCorp Vault, OpenBao, AWS, GCP és Azure titoktárak',
          'RBAC szabályok szerepkör, csoport, szolgáltatásfiók vagy felhasználó szerint',
        ],
      },
      {
        name: 'Observability',
        description:
          'Metrikák, logok és trace-ek a szolgáltatásaidból egyetlen lekérdezési felületen, ugyanazokat a célokat és riasztásokat táplálva, amikre az incidensoldal épül.',
        points: [
          'Metrikák, logok és trace-ek egy helyen',
          'OpenTelemetry alapú begyűjtés — nincs telepítendő saját ügynök',
          'Dashboardok szolgáltatásonként és csapatonként',
          'Közvetlenül táplálja az SLO-kat és a riasztásokat',
        ],
      },
      {
        name: 'SLO-k és incidenskezelés',
        port: 'Rust · :8000',
        description:
          'Követi azokat a szolgáltatási célokat, amelyek eldöntik, mi számít problémának, és az ebből adódó riasztászajból átnézhető incidensnyilvántartást csinál.',
        points: [
          'SLO-k hibabüdzsével és burn-rate riasztással',
          'Webhook-feldolgozás deduplikációval és csoportosítással',
          'Incidens-állapotgép és teljes idővonal',
          'Konnektorok több Grafana példányhoz',
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
        name: 'Gateway',
        port: 'Rust · :8084 / :8085',
        description:
          'Reverse proxy, amely eleve ismeri a platform azonosítási rendszerét — az autentikáció itt nem utólag felcsavarozott bővítmény.',
        points: [
          'Útvonal, host és metódus szerinti routing, súlyozott terheléselosztással',
          'JWT és API kulcs alapú hitelesítés, magától a platformtól',
          'Token-bucket rate limit kulcsonként, felhasználónként, IP-nként vagy globálisan',
          'WASM bővítmények kérés és válasz fázisban',
        ],
      },
      {
        name: 'AI stack',
        description:
          'Egyetlen chat felület a teljes AI felület fölött — sok különálló AI komponens egyetlen front end mögött —, ugyanazon az azonosításon és audit naplón, mint minden más.',
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
          'Hosszan futó munka, ami túléli az újraindításokat, az újrapróbálkozásokat és a deployokat — anélkül, hogy neked kellene kézzel megírnod a körülötte lévő könyvelést.',
        points: [
          'Folyamatok, amelyek túlélik az őket indító processzt',
          'Újrapróbálkozás, időtúllépés és kompenzáció helyetted megoldva',
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
        title: 'Egy telepítés hét előfizetés helyett',
        body:
          'A feature flagek, az observability, az incidenskezelés, a titokkezelés, a gateway és az AI réteg a legtöbb cégnél hat-hét szállító. Itt egyetlen dolog, amit futtatsz.',
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
      'Egy Kubernetes operátor figyeli az egyedi erőforrásaidat, és szinkronizálja őket a mögöttes szolgáltatásokba. A felhasználók, szerepkörök, gateway útvonalak, rate limitek és titok-konnektorok mind a te Git repódban élnek — nem egy felületen, ahol valaki egyszer végigkattintotta.',
    points: [
      {
        title: 'GitOps az első naptól',
        body:
          'Minden platform-erőforrás egyedi erőforrás, így a módosítások ugyanazon az átnézési és visszaállítási folyamaton mennek át, mint az alkalmazáskód.',
      },
      {
        title: 'Szinkronizált, nem szkriptelt',
        body:
          'Az operátor create-if-not-exists végpontokon keresztül szinkronizál. Az újbóli alkalmazás mindig biztonságos.',
      },
      {
        title: 'Webes felület, ha kell',
        body:
          'A konzol lefedi a dashboardokat, incidenseket, flageket, konnektorokat és beállításokat — sötét témával és teljes mobiltámogatással.',
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
        title: 'Egy identitás, mindenhol',
        body:
          'Az identitás egyszer van definiálva, és minden szolgáltatás azt olvassa. Nincs duplikált felhasználótábla és nincs szolgáltatásonként szétcsúszó jogosultsági modell.',
      },
      {
        title: 'Saját üzemeltetés, nem SaaS',
        body:
          'A saját Kubernetes klasztereden, a saját PostgreSQL-eden, a saját hálózati határodon belül fut. Az incidensadataid és a promptjaid nem hagyják el az infrastruktúrádat.',
      },
      {
        title: 'Nyílt protokollok bezártság helyett',
        body:
          'OFREP a flagekhez, Grafana webhookok a riasztásokhoz, szabványos OAuth a bejelentkezéshez. Ha lecseréled az OpsPlane-t, az integrációidnak akkor is lesz értelmük.',
      },
    ],
  },
  cta: {
    title: 'Hozd egy fedél alá a platformodat',
    lede:
      'Írd meg, miért fizet ma a csapatod, és segítünk kideríteni, hogy az OpsPlane eleget vált-e ki ahhoz, hogy megérje a váltás — vagy őszintén megmondjuk, ha nem.',
    primary: 'Írj nekünk',
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
    mailtoNote:
      'A kapcsolatfelvételi űrlap még nincs beállítva, ezért ez a gomb az e-mail kliensedet nyitja meg.',
  },
  footer: {
    tagline:
      'Egyetlen, saját üzemeltetésű platform mindenre, ami az üzleti logikád körül kell. Kevesebb szállító, kevesebb üzemeltetnivaló.',
    navTitle: 'Oldal',
    resourcesTitle: 'Kapcsolat',
    rights: 'Minden jog fenntartva.',
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, hu };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
