---
title: 'Your platform belongs in Git, not in a UI someone clicked through once'
date: '2026-07-02'
excerpt: 'Nineteen custom resources, one operator, and the difference between a platform you can rebuild and one you can only hope keeps running.'
author: 'The OpsPlane team'
tags: ['kubernetes', 'gitops', 'operator']
---

Here is a question worth asking about any internal platform: if the cluster disappeared tonight, how much of it could you rebuild from a repository?

For a lot of teams the answer is "the applications, yes — the platform configuration, not really." The routes, the rate limits, the roles, the connector to the secret store: those were configured through a UI, once, by someone who has since moved teams.

## Configuration that only exists in a database

A settings page feels like a feature. It is, right up until it becomes the only record of a decision.

Click-configured state has no diff, so you cannot review it. It has no history, so you cannot see when it changed or why. It has no rollback beyond remembering what it used to say. And it cannot be recreated in a staging environment without a person repeating the same clicks in the same order.

None of that shows up on the day you configure it. All of it shows up during an incident.

## Nineteen CRDs and a reconciler

OpsPlane treats platform configuration the same way Kubernetes treats workloads: as declared resources that a controller reconciles.

A Go operator watches 19 custom resource definitions and syncs them into the services behind them:

- **Identity** — organizations, users, groups, roles, service accounts
- **Gateway** — routes, upstreams, rate limit policies, auth policies, WASM plugins
- **Security** — secret connectors for Vault, OpenBao and the cloud secret managers
- **Incidents** — Grafana connectors

Each of these becomes a YAML file in a repository. Which means every change is a pull request, every change has an author and a reason, and rolling back is `git revert` rather than an archaeology exercise.

## Reconciled, not scripted

There is an important difference between this and a provisioning script.

The operator syncs resources through create-if-not-exists endpoints on each service. Applying the same manifest twice is not an error, and it is not a duplicate — it converges on the declared state. That property is what makes the whole thing safe to run continuously rather than as a one-off migration you are afraid to re-run.

It also means drift is visible. If someone changes a route by hand, the declared state and the actual state disagree, and you can see it.

## The UI still exists

None of this is an argument against a web interface. OpsPlane ships one — dashboards, incidents, flags, connectors, settings, dark mode, the lot.

The distinction is what the UI is *for*. It is excellent for reading state during an incident, for exploring what exists, and for the genuinely interactive work of triaging an alert. It is a poor system of record for configuration that needs to outlive the person who set it.

Use the console to understand your platform. Use the repository to define it.
