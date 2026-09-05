---
title: 'The bill nobody counts'
date: '2026-09-05'
excerpt: 'Six SaaS subscriptions look affordable on the invoice. The cost that hurts is the one that never appears on it — the integration, the reviews, the renewals, and the engineers holding it all together.'
author: 'The OpsPlane team'
tags: ['platform', 'cost']
---

Add up what a mid-sized engineering organization pays for the layer beneath its product. Feature flags. Incident management. A secrets manager. An API gateway. Something for the AI features. Maybe a workflow engine.

Each one is defensible on its own. Each one was cheaper than building it. And each invoice, taken alone, is a rounding error against payroll.

That is the bill everyone counts. It is not the expensive one.

## What the invoice leaves out

The moment you have six vendors instead of one, you have also bought six of everything else.

**Six integrations.** Not six, actually — closer to one per pair that has to know about the other. Your flag service needs to know who a user is. Your incident tool needs to know which team owns a service. Your gateway needs to enforce the same permissions your app does. None of these vendors designed for each other, so the glue is yours to write and yours to keep working.

**Six security reviews.** Every renewal cycle, someone fills in a questionnaire, chases a SOC 2 report, and re-argues the data processing agreement. That work does not get faster with practice.

**Six failure modes you do not control.** When a vendor has an outage, you find out from their status page, and you wait.

**Six upgrade treadmills.** Deprecated APIs, forced migrations, pricing changes at renewal, and the occasional acquisition that changes everything about a tool you had stopped thinking about.

None of this shows up as a line item. It shows up as engineers who are busy but not building anything you sell.

## The case for one thing

The alternative is not "build it yourself." Building six services from scratch is a worse trade than buying six.

The alternative is one platform that already contains them, where the pieces were designed together from the start. One identity model that every service reads, so there is no glue between them. One deployment, one data boundary, one security review. One thing to upgrade.

That only works if the platform stays small. A consolidated platform that takes a dedicated team to operate has just moved the cost rather than removed it. The test is whether the team already running your infrastructure can run this too, without it becoming their whole job.

## When this is the wrong answer

It is worth being clear about the cases where it is not.

If you use exactly one of these tools and have no plans for the others, a point solution is simpler and you should keep it. If your team has deep investment in a specific vendor's ecosystem, the migration cost is real and may not pay back. And if nobody on your side wants to run infrastructure at all, a self-hosted platform is the wrong shape regardless of the arithmetic.

But if you recognize the list at the top of this post — and the quiet headcount that keeps it stitched together — the consolidation math is worth doing properly. Most teams have never actually done it.
