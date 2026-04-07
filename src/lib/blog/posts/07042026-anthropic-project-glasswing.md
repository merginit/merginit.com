---
title: "Anthropic's Project Glasswing is a new AI tool for finding serious software bugs"
description: "Anthropic announced Project Glasswing on April 7, 2026, a restricted security program built around Claude Mythos Preview, an unreleased model for finding and chaining real software vulnerabilities."
date: '2026-04-07'
categories:
  - cybersecurity
  - ai-ml
  - announcement
published: true
author: 'Jonas Fröller'
readingTime: '7 min'
tags:
  [
    'Anthropic',
    'Project Glasswing',
    'Claude Mythos Preview',
    'Cybersecurity',
    'Software Security',
    'Zero Days',
    'Open Source',
    'AI Agents'
  ]
---

# Project Glasswing is not another coding assistant

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/INGOC6-LLv0?si=Lv9XBZ7AFOlgbtVJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Anthropic announced Project Glasswing on April 7, 2026. It is a restricted security program built around an unreleased model called Claude Mythos Preview.

This is security research software. Anthropic says it can find vulnerabilities in production code, including chains of smaller bugs that add up to a real exploit.

If the claims hold up, Glasswing looks less like a scanner and more like handing a patient security researcher a codebase and letting it work for hours.

## Who gets access

Anthropic is not releasing this as a public beta. Glasswing is being rolled out through a restricted partner program. Launch partners include AWS, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorganChase, the Linux Foundation, Microsoft, NVIDIA, and Palo Alto Networks. Anthropic also says more than 40 other organizations that build or maintain critical software have access.

The core model is `Claude Mythos Preview`. Anthropic says it did not train this model specifically for cyber work. It trained it to be very good at code, and the security capability came with it.

According to Anthropic, Glasswing users will apply it to:

- local vulnerability discovery
- black box testing of binaries
- endpoint hardening
- penetration testing
- securing open source dependencies and internal codebases

Anthropic says it is putting up to $100 million in usage credits behind the program, plus $4 million in donations to open source security organizations. It also says it will publish disclosed fixes and lessons from the program within 90 days.

The pricing matters too. Anthropic says the credits cover usage during this research preview. After that, Mythos Preview will cost participants $25 per million input tokens and $125 per million output tokens through the Claude API, Amazon Bedrock, Google Cloud Vertex AI, and Microsoft Foundry.

If you maintain important open source software, the route in seems to be Anthropic's `Claude for Open Source` program.

## What Anthropic says it already found

Anthropic says Mythos Preview is finding old bugs in code that a lot of people already depend on. The examples in the announcement include:

- a 27-year-old OpenBSD bug that could remotely crash servers
- a 16-year-old FFmpeg bug in code hit five million times by automated tests without being caught
- a Linux kernel vulnerability chain that escalated a low-privilege user to full system control

Those are not toy demos. That is infrastructure code.

Anthropic also says the model is good at chaining bugs together. That part matters even more than the single findings. Plenty of ugly compromises come from several minor issues that look harmless on their own. If a model can connect those dots quickly, defenders get a real advantage. Attackers probably do too once similar capabilities spread.

The other thing worth noticing is how restricted the release is. Anthropic says Mythos Preview is not being made generally available right now because the cyber capability is too risky without better safeguards. I would pay attention when a lab draws that line.

## Why this feels different

Security teams already have fuzzers, linters, static analysis, dynamic analysis, and bug bounty programs. Glasswing seems to sit in the gap between those tools.

Anthropic's earlier red team work on LLM-discovered 0-days gives a clue why. The model does not just spray random inputs at a target. It can read commit history, notice patterns in earlier fixes, follow long code paths, and keep working on the same thread long enough to find something useful. That is much closer to how a human researcher works.

The other difference is persistence. Anthropic says Mythos Preview can work autonomously for long stretches. That makes it less like autocomplete for security work and more like a junior researcher who never gets tired or bored.

Anthropic is also aiming this at shared infrastructure first, which is probably the right place to start. Bugs in kernels, browsers, FFmpeg, OpenBSD, and core libraries do not stay local. One flaw can spread across vendors, clouds, governments, and a lot of companies that never even know the dependency is there.

## What to do with this

Most teams are not going to get Glasswing access tomorrow. Even so, the announcement changes the picture a bit.

If you maintain important software, especially open source, it is safer to assume two things:

- defenders can use AI to find deeper bugs faster
- attackers will get similar capabilities soon, if they do not already

That should push teams to shorten patch windows, revisit old "low severity" bugs that could be chained, tighten disclosure workflows, and spend more time on the boring code that everyone relies on and nobody wants to audit.

If you run critical systems, I think the message is pretty simple: the security review process that felt solid in 2023 probably looks thin in 2026.

## One caveat

Most of the biggest claims here still come from Anthropic and its partners. That is not the same as broad independent validation. It is worth keeping that in mind.

Still, this does not read like empty launch fluff. The partner list is serious. The examples are concrete. Anthropic is restricting access instead of pushing a shiny public demo, which usually means the company thinks the capability is real enough to handle carefully.

I would not read Glasswing as "AI replaces security researchers." That is too simplistic. What it does suggest is a shift in the toolchain. Models do more of the discovery work. Humans still validate, patch, coordinate disclosure, and decide what gets fixed first.

That is a big enough shift on its own.

## Sources

[Anthropic: Project Glasswing](https://www.anthropic.com/glasswing)  
[Anthropic Frontier Red Team: Evaluating and mitigating the growing risk of LLM-discovered 0-days](https://red.anthropic.com/2026/zero-days)  
[Anthropic: Claude for Open Source](https://claude.com/contact-sales/claude-for-oss)
