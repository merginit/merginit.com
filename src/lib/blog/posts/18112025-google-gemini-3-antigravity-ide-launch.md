---
title: "Google Gemini 3 and Antigravity IDE Launch"
description: 'Google launched Gemini 3 AI model and Antigravity IDE on November 18, 2025. Compare features, pricing, and agent capabilities vs Cursor, Windsurf, GitHub Copilot, and Trae.'
date: '2025-11-18'
categories:
  - ai-ml
  - developer-tools
  - comparison
published: true
author: 'Jonas Fröller'
readingTime: '8 min'
tags: ['Gemini 3', 'Antigravity IDE', 'Google AI', 'AI Coding Tools', 'Cursor Alternative', 'Windsurf', 'GitHub Copilot', 'AI Agents', 'Code Generation', 'Developer Productivity', 'Trae']
---

<script>
  import ImageWithCaption from '$lib/components/ImageWithCaption.svelte';
</script>

# Google Dropped Gemini 3 and a New Coding IDE Called Antigravity Today

It's November 18, 2025, and Google just went live with their big AI announcement that everyone's been buzzing about for weeks. After all the cryptic tweets from Sundar Pichai and Demis Hassabis, plus those Polymarket bets hitting crazy odds, we finally have **Gemini 3**, their latest flagship model, rolling out right now in the Gemini app, Search, and developer tools. But the real surprise? They also launched **Antigravity**, a brand-new "agent-first" IDE that's basically built for AI agents to take over more of the coding.

I've been tracking the leaks and speculation, and this launch feels like Google's most aggressive move yet to compete with OpenAI and Anthropic in the agentic AI space. No flashy keynote, just documentation and immediate rollout. Here's what we know from the official announcements and initial coverage.

- **Gemini 3 is live today**: Stronger reasoning, better coding, multimodal smarts, and it's already powering parts of Search and the Gemini app.
- **Antigravity is a free preview IDE**: Designed for autonomous agents that can edit code, run terminals, and even control browsers, while showing you verifiable "artifacts" (plans, screenshots, recordings) so you can trust what it's doing.
- This combo targets developer productivity head-on, entering a crowded market where Cursor, Windsurf, and ByteDance's Trae have already established strong positions.

The announcement is generating buzz, though questions remain about whether this represents genuine innovation or simply well-packaged marketing, especially given Google's past missteps with AI Overviews producing hallucinated results. The benchmark numbers look strong, at least on paper.

## Quick Look at Gemini 3

![AI circle jerk](/blog/18112025-google-gemini-3-antigravity-ide-launch/ai-circle-jerk.png)

From Google's blogs and coverage, Gemini 3 Pro is the first out the gate (more variants coming soon). It tops charts on stuff like LMArena (human preference) and sets records on tough reasoning tests. Key upgrades:

- Better at understanding intent with fewer prompts.
- "Generative UI" for fancier, interactive responses (like magazine-style layouts in Search).
- State-of-the-art "vibe coding", turning loose ideas into working code.
- A new "Deep Think" mode coming soon for even harder problems.

It's available now in limited form for free users, with fuller access for paid tiers. Knowledge cutoff is January 2025, so it won't know recent events without you telling it or using "search".

![Gemini 3 AI Benchmark](/blog/18112025-google-gemini-3-antigravity-ide-launch/gemini-3-table-final-benchmark.gif)
![Gemini 3 AI Eval](/blog/18112025-google-gemini-3-antigravity-ide-launch/gemini-3-eval-charts.webp)

## Antigravity: Google's Entry Into the IDE Wars

The more surprising announcement is Antigravity. Unlike typical VS Code extensions, this is a standalone application (Mac, Windows, Linux) where AI agents operate through a dedicated "manager view" to handle multiple concurrent tasks. Core capabilities include:

- Write and edit code.
- Run commands.
- Browse the web to test or scrape.
- Producing "artifacts" (plans, diffs, screenshots, recordings) for verification, addressing the trust gap in autonomous coding tools.

Notably, Antigravity supports not just Gemini 3, but also Claude Sonnet 4.5 and OpenAI's GPT-OSS. The tool is free during the preview period with rate limits.

---

# Market Positioning: How Antigravity Compares

The AI coding tool market has become intensely competitive. Here's how Antigravity stacks up against established players, based on official specifications and initial developer feedback:

| Tool               | Company                    | Type         | Agent Autonomy                                 | Verification/Trust Features                       | Model Support                                    | Pricing (as of Nov 2025)    | User Base / Vibe                                                       |
| ------------------ | -------------------------- | ------------ | ---------------------------------------------- | ------------------------------------------------- | ------------------------------------------------ | --------------------------- | ---------------------------------------------------------------------- |
| **Antigravity**    | Google                     | VS Code fork | High (multi-agent, browser/terminal access)    | Artifacts (plans, diffs, screenshots, recordings) | Gemini 3 + Claude 4.5 + GPT-OSS                  | Free preview (rate-limited) | Brand new; Google scale could explode adoption, but feels experimental |
| **Cursor**         | Anysphere (ex-MIT folks)   | VS Code fork | High (Composer, Agent mode)                    | Diff previews, manual approval                    | OpenAI, Anthropic, own fine-tunes                | $20–$40/mo                  | Power-user favorite; huge growth, $29B valuation rumors                |
| **Windsurf**       | Codeium                    | VS Code fork | Very high (Cascade, real-time)                 | Live previews, memories/rules                     | Multiple incl. proprietary                       | Free tier + team plans      | Loved for "flow state"; strong enterprise push                         |
| **Trae**           | ByteDance                  | VS Code fork | Very high (SOLO mode: end-to-end, multi-agent) | Diff View, live previews, planning steps          | Gemini 2.5 Pro, Kimi K2-0905, GPT-5, DeepSeek V3.1, Grok 4 | Free tier + $10/mo Pro      | Growing community; devs shifting from Cursor, agentic and polished     |
| **GitHub Copilot** | Microsoft/GitHub           | Extension    | Medium (Chat, Workspace)                       | Basic logs                                        | Mostly OpenAI                                    | ~$10/mo individual          | The default for most devs; 15M+ users, deeply integrated               |
| **Continue**       | Open-source (Continue.dev) | Extension    | Medium-High (custom agents)                    | Configurable, local support                       | Any (local or API)                               | Free                        | Privacy nerds & tinkerers; super customizable                          |

Antigravity's artifact system provides better transparency for trust compared to Cursor's diff previews or Copilot's black-box approach. Being free during preview and supporting multiple models, including competitors Claude and GPT-OSS, is a bold move that positions Google as model-agnostic. Trae's SOLO mode delivers similar end-to-end autonomy to Windsurf's Cascade and Cursor's "Agents", with agents managing everything from requirements to deployment and backend integration.

The caveat? This is preview software from Google, a company with a mixed track record on product longevity. Expect some rough edges compared to the refined experience of Trae or Windsurf.

Developer reaction has been mixed. Some are calling Antigravity a potential "Cursor killer" thanks to its agent manager view, while skeptics point out that Gemini still struggles with hallucinations on complex codebases. Meanwhile, Trae has built a reputation for reliability, with users describing it as a "10x AI engineer."

<ImageWithCaption 
  src="/blog/18112025-google-gemini-3-antigravity-ide-launch/antigravity.png"
  alt="Antigravity onboarding spinner"
  className="my-6"
/>

I wish I could try it out, but sign-up is currently broken for EU users (the form spins forever). Switching to a US VPN let me in, yet capacity is already overflown.

## Why Antigravity sign up / app might not work for you

- **Regional rollout quirks:** Google's compliance gating currently blocks most EU sign-ups, so the wait spinner never finishes unless you tunnel through a supported region (US).
- **Preview capacity ceilings:** Even after getting past the form, the preview servers are throttled and frequently reject new workspaces with a "capacity reached" toast.
- **Google Workspace policies:** Managed corporate accounts can have Gemini access disabled by admins, which prevents sign-in entirely until the org explicitly flips the switch.

## Worth Noting: ByteDance's Trae

ByteDance's Trae has gained significant traction since launching earlier this year. The VS Code fork offers standard IDE assistance plus SOLO mode (now publicly available; expensive, but solid), where agents autonomously manage projects from requirements to deployment. Trae topped the SWE-bench Verified leaderboard in July by solving 500 real GitHub issues. At $10/month for Pro (with a free tier), developers cite its polish and value compared to pricier alternatives. Trae's current model picker can switch among:

- Gemini 2.5 Pro
- Kimi K2-0905
- GPT-5 medium (beta)
- GPT-5 high (beta)
- GPT-4.1
- GPT-4o
- o3 (beta)
- DeepSeek V3.1
- Grok 4 (beta)

Claude Sonnet has been removed for now due to ongoing capacity constraints, but the remaining roster keeps Trae model-agnostic.

> **Affiliate:** Use this invite link: [Unlock Unlimited SOLO Access](https://www.trae.ai/s/yEancU) and unlock unlimited SOLO access when upgrading Trae to Pro for $10/month. Free through 2025-12-10 once your plan is active.

# The Bottom Line

Google needed this win. After a year of playing catch-up in AI, launching Gemini 3 and Antigravity simultaneously sends a clear signal. With immediate integration into Google Search (2 billion+ users) and the Gemini app (650 million monthly active users), the distribution advantage is undeniable. If the autonomous agent features deliver on their promises, this could pull developers away from paid alternatives.

However, the AI coding space evolves rapidly. OpenAI has unreleased projects in development, Anthropic continues expanding enterprise partnerships, and tools like Trae demonstrate that innovation isn't limited to tech giants. Testing Antigravity on real projects will reveal whether it's a legitimate competitor or another Google product that fails to gain traction.

The critical question: Can Antigravity match Trae's polish, Cursor's power-user features, and Windsurf's enterprise appeal? Or will it become another ambitious launch that doesn't survive Google's product roadmap?

The answer will emerge through hands-on use over the coming weeks.

## Sources

[Official Gemini 3 Announcement](https://blog.google/products/gemini/gemini-3)  
[Antigravity Download](https://antigravity.google/download)  
[Gemini 3 for Developers (Antigravity details)](https://blog.google/technology/developers/gemini-3-developers)  
[Ars Technica Coverage](https://arstechnica.com/google/2025/11/google-unveils-gemini-3-ai-model-and-ai-first-ide-called-antigravity)  
[The Verge on Antigravity](https://www.theverge.com/news/822833/google-antigravity-ide-coding-agent-gemini-3-pro)  
[TechCrunch Launch Report](https://techcrunch.com/2025/11/18/google-launches-gemini-3-with-new-coding-app-and-record-benchmark-scores)  
[9to5Google Summary](https://9to5google.com/2025/11/18/gemini-3-launch)  
[TRAE - Collaborate with Intelligence](https://www.trae.ai/)  
[Trae AI: A Guide With Practical Examples - DataCamp](https://www.datacamp.com/tutorial/trae-ai)
