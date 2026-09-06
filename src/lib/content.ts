export type ServiceId =
  | 'gateway'
  | 'flags'
  | 'ai'
  | 'durable'
  | 'observability'
  | 'slo'
  | 'security';

export interface SiteContent {
  meta: { title: string; description: string };
  nav: { home: string; about: string; blog: string; contact: string; menu: string; close: string };
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
    items: { id: ServiceId; name: string; description: string }[];
  };
  deployment: {
    eyebrow: string;
    title: string;
    lede: string;
    options: { name: string; description: string }[];
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
  about: {
    eyebrow: string;
    title: string;
    lede: string;
    paragraphs: string[];
    points: { title: string; body: string }[];
    cta: string;
  };
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

export const content: SiteContent = {
  meta: {
    title: 'OpsPlane Services',
    description:
      'One cloud-native platform for everything around your business logic: identity and secrets, observability, SLOs and incidents, feature flags, an API gateway, an AI stack and durable execution. Run it managed, or on any cloud you like. Fewer vendors, lower cost.',
  },
  nav: {
    home: 'Home',
    about: 'About',
    blog: 'Blog',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
  },
  hero: {
    eyebrow: 'Managed or self-hosted',
    title: 'Everything around your business logic, in one platform.',
    lede:
      'Identity and secrets, observability, SLOs and incidents, feature flags, an API gateway, an AI stack and durable execution — in one cloud-native platform, run as a managed service or on your own infrastructure. Broad enough to replace a shelf of SaaS subscriptions, small enough that one team can operate it. You write the business logic; OpsPlane covers everything around it.',
    primary: 'Get in touch',
  },
  services: {
    eyebrow: 'The platform',
    title: 'One control plane, everything behind it',
    lede:
      'Each service runs independently, with its own database and API. Run all of them, or only the ones you need — they share one identity model, one gateway and one audit trail.',
    items: [
      {
        id: 'gateway',
        name: 'Gateway',
        description:
          'A reverse proxy that already knows your platform identity, with routing, load balancing, rate limits and WASM plugins on both the request and the response path.',
      },
      {
        id: 'flags',
        name: 'Feature Flags',
        description:
          'A vendor-neutral flag service that speaks OFREP, so any OpenFeature SDK works against it out of the box.',
      },
      {
        id: 'ai',
        name: 'AI Stack',
        description:
          'One chat interface over the whole AI surface, with many separate AI components behind a single front end and the same identity and audit trail as everything else.',
      },
      {
        id: 'durable',
        name: 'Durable Execution',
        description:
          'Long-running work that survives restarts, retries and deploys, so you are not hand-writing the bookkeeping around it.',
      },
      {
        id: 'observability',
        name: 'Observability',
        description:
          'Metrics, logs and traces from your services under one query surface, feeding the same objectives and alerts the incident side runs on.',
      },
      {
        id: 'slo',
        name: 'SLOs & Incident Management',
        description:
          'Service objectives that decide what counts as a problem, and a reviewable incident record built from the alerts they raise.',
      },
      {
        id: 'security',
        name: 'Security & Identity',
        description:
          'Who someone is and what they can reach, in one place, with a single API in front of every secret store you already run.',
      },
    ],
  },
  deployment: {
    eyebrow: 'How you run it',
    title: 'Managed, or on your own infrastructure',
    lede:
      'It is the same software either way, and it runs on any cloud — so the choice is a deployment decision rather than a commitment. Start managed and bring it in-house later, or the other way round.',
    options: [
      {
        name: 'Managed',
        description:
          'We run the platform for you. Nothing to install, upgrade or keep available, and one bill instead of the shelf of subscriptions it replaces.',
      },
      {
        name: 'Self-hosted',
        description:
          'You run it on your own Kubernetes cluster — on AWS, Google Cloud, Azure or your own hardware — against your own PostgreSQL and inside your own network boundary, so your incident data and your prompts never leave your infrastructure.',
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
          'A handful of services and one PostgreSQL. Self-hosted, it is not meant to become a platform team’s full-time job — and managed, there is nothing to run at all.',
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
        title: 'Cloud native, wherever it runs',
        body:
          'Kubernetes-native from the start, so it runs on any conformant cluster — any cloud, or your own hardware — and the managed service is the same software. Moving is a deployment decision, not a migration, and never a re-platforming.',
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
  about: {
    eyebrow: 'Founded 2022',
    title: 'Built out of the work, not the other way round.',
    lede:
      'OpsPlane Services has spent its first years as an independent consultancy doing platform engineering — building and running the layer underneath other people\u2019s products. The platform came out of that work rather than ahead of it.',
    paragraphs: [
      'The engagements were not alike. Different industries, different stacks, teams of five and teams of fifty. What they had in common was the list they arrived at: somewhere to keep identity, somewhere to keep secrets, a way to ship changes behind a flag, a gateway that understood who was calling, and an honest record of what broke and why.',
      'Every team assembled that list separately — some built, most bought — and every team paid for it twice. Once to make the pieces work together, and again each time a vendor changed something underneath them. The integration was never the interesting part of the job, and it was reliably the part that took the longest.',
      'OpsPlane is the version of that list where the pieces were designed together from the start. It exists because the same gaps kept appearing across teams that had nothing else in common, not because a market analysis said they would.',
    ],
    points: [
      {
        title: 'You talk to the people who build it',
        body:
          'There is nobody between the person you email and the person writing the code. While the company is this size that is a real advantage, and we would rather use it than pretend to be larger.',
      },
      {
        title: 'The scope came from engagements',
        body:
          'Every service in the platform is there because the gap showed up in real work. Nothing is in it to fill out a comparison table.',
      },
      {
        title: 'Small on purpose',
        body:
          'The platform is meant to be small enough for one team to operate. Building it as a small company is what keeps that claim honest.',
      },
    ],
    cta: 'Tell us what you are running',
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
      'One cloud-native platform for everything around your business logic — managed, or on any cloud you run yourself.',
    navTitle: 'Site',
    resourcesTitle: 'Contact',
    rights: 'All rights reserved.',
  },
};
