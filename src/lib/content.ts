export interface SiteContent {
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

export const content: SiteContent = {
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
