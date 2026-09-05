---
title: 'Auth is a platform concern, not a service concern'
date: '2026-08-14'
excerpt: 'Every service that manages its own users eventually disagrees with every other service about who someone is. Here is why OpsPlane puts identity in exactly one place.'
author: 'The OpsPlane team'
tags: ['architecture', 'auth']
---

Most internal platforms start the same way. One team ships an incident tool with its own login. Another ships a feature flag service, and since it needs to know who flipped a flag, it grows a `users` table. A third adds a secret store, and now there are three ideas of what an account is.

None of this is a mistake in isolation. It becomes one in aggregate.

## The failure mode is drift, not breach

The problem is rarely dramatic. It is that someone leaves the company and is removed from two of the three systems. It is that "admin" means something different in the flag service than it does in the incident tool. It is that a service account created for a deploy pipeline outlives the pipeline by two years because nothing owns its lifecycle.

Every one of these is a small operational cut. Together they mean nobody can answer a simple question — *who can currently do what?* — without reading four databases.

## One source of truth, everyone else validates

OpsPlane takes the opposite position: identity lives in exactly one service, and nothing else manages users.

The auth service owns users, groups, roles, organizations, service accounts and API keys. It handles OAuth against GitHub and Google, and local login where that is needed. It issues JWTs.

Every other service — incidents, feature flags, security, gateway — does one thing with identity: it validates a token. They do not have user tables. They do not have their own permission models. When a request arrives, they check the signature, read the claims, and get on with the actual work.

This has a few consequences worth stating plainly:

- **Offboarding is one operation.** Disable the user in the auth service and every service stops honouring their tokens.
- **Permissions have one vocabulary.** A role means the same thing everywhere because there is only one place it is defined.
- **New services are cheap.** Adding a sixth service means adding a middleware that validates JWTs. It does not mean designing another account model.

## Where the gateway fits

Centralising identity only helps if the edge understands it too. This is why the OpsPlane gateway validates JWTs and `opsk_*` API keys against the auth service directly, with a short-lived cache, rather than treating authentication as a plugin bolted on afterwards.

The practical difference is that an auth policy attached to a route is enforced by the same identity system your services trust. There is no second set of credentials at the edge to keep in sync.

## The tradeoff

The honest cost is a hard dependency. If the auth service is down, nothing authenticates. We think that is the right trade — a single well-understood dependency you can make highly available beats five partial implementations you cannot reason about — but it is a real constraint, and it should shape how you deploy it.

What you get back is the ability to answer that simple question. For most platform teams, that is worth more than the independence they gave up.
