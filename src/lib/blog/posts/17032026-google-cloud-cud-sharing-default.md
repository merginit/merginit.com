---
title: 'Google Cloud CUD Sharing Enabled by Default Starting June 2026'
description: "Google Cloud is changing the default for resource-based Commitment Use Discount (CUD) sharing from disabled to enabled on June 16, 2026. Here's what changes, who's affected, and how to manage it."
date: '2026-03-17'
categories:
  - cloud-computing
  - announcement
published: true
author: 'Jonas Fröller'
readingTime: '2 min'
tags: ['Google Cloud', 'CUD', 'Cloud Billing', 'Cost Optimization', 'GCP']
---

# Google Cloud Is Turning On CUD Sharing by Default

Starting **June 16, 2026**, Google Cloud is flipping a switch: resource-based Commitment Use Discount (CUD) sharing will be **enabled by default** on billing accounts. Until now, this setting has been off unless you turned it on yourself. The goal is straightforward: stop discounts from going to waste when they're locked to a single project.

## What Actually Changes

With CUD sharing enabled, any resource-based commitment you purchase can be applied to eligible resources across **all projects** linked to your billing account, not just the project it was originally tied to. This prevents "stranded" discounts sitting unused on one project while another project pays full price.

Here's the breakdown of who's affected:

- **New billing accounts** created on or after June 16, 2026 will have CUD sharing enabled by default.
- **Existing accounts without active resource-based CUDs** will also have the default flipped to enabled.
- **Existing accounts with at least one active resource-based CUD** will keep their current settings untouched.

## What You Need to Do

Nothing, if you're fine with sharing. No immediate action is required.

If you prefer to keep discounts isolated to specific projects, Google is providing a **self-serve toggle** in the Cloud Billing console. You can disable (or re-enable) CUD sharing at any time, and the management tools will be available before the June 16 deadline so you can adjust ahead of time.

## Sources

Google Cloud Newsletter (March 2026)
