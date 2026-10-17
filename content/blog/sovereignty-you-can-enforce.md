---
title: 'Sovereignty you can enforce in code'
date: '2026-10-17'
excerpt: 'An "EU region" is a promise about where servers stand. We think sovereignty should be a property of the software: which models it may call, what data leaves the building, and who can change that. Here is how OpsPlane does it.'
author: 'The OpsPlane team'
tags: ['sovereignty', 'ai', 'platform']
---

Most sovereignty claims are about geography. The servers are in Frankfurt, the data
stays in the EU region, the contract says so.

That matters, but it is a promise rather than a property. It does not tell you what the
software does when someone configures a new AI model, pastes a customer's email address
into a chat, or connects a tool that quietly calls an API on another continent.

We wanted the platform itself to answer those questions.

## Policy in the request path

AI Hub is the AI layer of OpsPlane: a chat interface for engineers, an OpenAI-compatible
API for applications, and agents that use the team's runbooks and platform tools. Every
turn passes the same checks, in the same order, before a model is called:

1. **Which model may this agent use?** Every provider is tagged with where it
   processes data: EU, self-hosted, or elsewhere. Under the default `eu_only` policy,
   an agent configured with a provider outside the EU or your own infrastructure is
   refused, with a message saying why. Mistral, the European clouds' model APIs and
   self-hosted models work out of the box.
2. **What is in the message?** Email addresses, phone numbers, IBANs (with the checksum
   verified), card numbers (Luhn-checked) and IP addresses are replaced with
   placeholders *before* the text reaches a model or the database. A guardrail can
   instead refuse such messages outright, or block patterns you define.
3. **Can this person afford it?** Budgets in tokens or euros, per team, per person or
   per agent.
4. **What may the agent do?** Tools that act on the platform, like listing alerts or
   acknowledging one, run with the calling engineer's own credentials. An agent can never
   do more than the person using it.

Everything is written to an audit log: every turn, every tool call, every refusal.

## Configuration you can review

None of this lives only in a settings page. Providers, agents, guardrails, budgets,
knowledge bases and tool servers are Kubernetes resources, like everything else in
OpsPlane:

```yaml
apiVersion: opsplane.io/v1alpha1
kind: AIAgent
metadata:
  name: oncall
spec:
  provider: mistral
  sovereignty: eu_only
  tools: [alerthub_list_alerts, alerthub_get_alert]
  knowledgeBases: [runbooks]
```

Changing the policy is a pull request, reviewed and reverted like any other change. The
operator puts back anything someone edits by hand.

## Small enough to run yourself

Sovereignty is easier when you can run the thing. Every OpsPlane service is a single
Rust binary; all seven together use under 170 MB of memory at idle. That is the
difference between "self-hosting is possible" and "self-hosting is something a small
team actually does".

We are looking for a handful of [design partners](/partners/) to run it with us. If
your team is on call, wants AI without sending data outside the EU, or has to move off
Opsgenie before April 2027, we would like to hear from you.
