---
title: "The Open-Source King Stumbles: Why Meta's AI Struggles Are Pushing Them Toward a Hardware Revolution"
description: "Meta's Llama 4 flopped with fudged benchmarks and delayed flagships, but $125 billion in 2026 capex and 7.4 million Ray-Ban smart glasses tell a different story: Zuckerberg is building a hardware platform to escape Apple and Google's grip."
date: '2026-03-11'
categories:
  - ai-ml
published: true
author: 'Jonas Fröller'
readingTime: '5 min'
tags: ['meta', 'llama', 'open-source', 'smart-glasses', 'hardware', 'ai-infrastructure']
---

<script>
  import Tweet from '$lib/components/Tweet.svelte';
</script>

# Meta estimates annual capex for 2026 at between 115 and 135 billion US dollars.

<Tweet id="2031090764642660850" minHeight="249px" />

Meta just casually announced they'll spend up to $135 billion this year on infrastructure. That's nearly double what they burned through in 2025, and roughly the GDP of Hungary. Most of it goes toward gigawatt-scale data centers, AMD Instinct GPUs, NVIDIA Blackwell chips, and custom silicon. Zuckerberg calls it "front-loading compute capacity" for superintelligence. Wall Street calls it a bet-the-farm move.

But the spending only makes sense once you understand where Meta actually stands right now, because their AI story in 2025 was far from glorious.

## Llama 2 and 3 Built Real Trust

For a while, Meta genuinely earned the open-source crown. While OpenAI and Google locked everything behind APIs and subscriptions, Meta dropped the Llama series for free. Llama 3 ran well on consumer hardware, held its own against proprietary models on coding and reasoning, and earned massive community goodwill. Researchers, startups, and hobbyists built entire ecosystems around it. It was the rare case of a trillion-dollar corporation actually giving something back.

## Then Llama 4 Happened

In April 2025, Meta rolled out Llama 4 Scout and Maverick, both using a Mixture-of-Experts architecture. The reception was brutal.

Developers found the models struggled badly with coding tasks and long-context comprehension. Scout advertised a 10-million-token context window, but fell apart on complex long-form work. Maverick wasn't much better.

Then came the benchmark scandal. Meta submitted a specially tuned "experimental" variant of Maverick to LMArena, the popular AI leaderboard, where it placed second behind Google's Gemini 2.5 Pro. The publicly released version? Nowhere close. LMArena called Meta out for not disclosing that the submitted model was a custom build. Maverick's ranking cratered from 2nd to 32nd once real-world usage data poured in. Scout dropped out of the top 100 entirely.

It got worse in January 2026 when Yann LeCun, Meta's outgoing chief AI scientist, admitted on record that Llama 4's benchmark results were "fudged a little bit", with different model variants cherry-picked for different benchmarks. An anonymous whistleblower from Meta's AI team claimed leadership had suggested blending benchmark test data into the post-training process to produce "presentable" scores after the model failed to meet state-of-the-art thresholds internally.

Meanwhile, the flagship Behemoth model, a 2-trillion parameter beast, never shipped to the public at all. It remains an internal "teacher model" for the smaller variants, stuck in delay limbo because it couldn't meet expectations.

## The Real Play: Escaping Apple and Google

So Meta's pure software AI play stumbled. But $125 billion in capex doesn't scream retreat, it screams pivot.

Here's the context people miss: Meta has always been an app company trapped inside someone else's operating system. Facebook, Instagram, WhatsApp, they all live on iOS and Android. Apple's ATT privacy update in 2021 alone cost Meta an estimated $10 billion in annual ad revenue. Every policy change, every App Store rule, every privacy toggle sits between Meta and its users. Zuckerberg has been trying to claw his way out of this dependency for a decade.

The Ray-Ban Meta smart glasses are his current escape route, and they're working. In 2025, Meta shipped 7.4 million units and captured 85% of the global smart glasses market. The second-generation models launched in September drove shipments up 139% year-over-year in the second half of the year. Meta and EssilorLuxottica are reportedly planning to double annual production to nearly 20 million units by the end of 2026.

These aren't fashion accessories anymore. The Gen 2 glasses shoot 3K video, run real-time translation, and feed your surroundings straight into Meta's multimodal AI for contextual answers on the fly. Meta's next models, codenamed "Aperol" and "Bellini," will run the AI continuously in the background, proactively reminding you about forgotten keys or items on your shopping list. A premium HUD-equipped pair codenamed "Hypernova" is coming at $1000+. True AR glasses, "Artemis," are slated for 2027.

Zuckerberg's term for all of this is "Personal Superintelligence": an AI that lives on your face, sees what you see, and gradually becomes your ambient assistant. It's the anti-ChatGPT play. Instead of you going to the AI, the AI is just always there.

## Platform Company or Bust

The $135 billion capex, the AMD and NVIDIA mega-deals, the custom chip development, the aggressive glasses roadmap: it all points in one direction. Meta wants to be a **platform company**. Not an app living inside Apple's walled garden, but the company that owns the next computing paradigm.

If the glasses scale to the tens of millions Zuckerberg is targeting, Meta finally controls the hardware, the OS, the AI stack, and the user relationship end-to-end. No more middlemen. No more App Store tax. No more privacy policy disruptions tanking their ad business overnight.

Whether this works depends on execution. The Llama 4 debacle shows Meta can fumble hard when credibility matters. But the hardware numbers don't lie, 7.4 million units in a product category that barely existed two years ago is serious traction. And $125 billion buys a lot of second chances.

## Sources

[Meta boosts annual capex sharply on superintelligence push - Reuters](https://www.reuters.com/business/meta-expects-annual-capital-expenditures-rise-superintelligence-push-2026-01-28)  
[Meta's Llama 4 herd controversy and AI contamination, explained - ZDNet](https://www.zdnet.com/article/metas-llama-4-herd-controversy-and-ai-contamination-explained)  
[Yann LeCun: Meta "fudged a little bit" when benchmark-testing Llama 4 - Fast Company](https://www.fastcompany.com/91469583/yann-lecun-meta-llama-4-model-zuckerberg)  
[Global AI glasses shipments reach 8.7 million units - Omdia](https://omdia.tech.informa.com/pr/2026/mar/global-ai-glasses-shipments-reach-8point7-million-units-with-mainland-china-emerging-as-the-fastest-growing-market)  
[Meta mulls doubling output of Ray-Ban glasses by year end - Reuters](https://www.reuters.com/business/meta-mulls-doubling-output-ray-ban-glasses-by-year-end-bloomberg-news-reports-2026-01-13)  
[Meta HUD Glasses Price, Features & Input Device Reportedly Revealed - UploadVR](https://www.uploadvr.com/meta-hud-glasses-price-features-input-device-reportedly-revealed)  
[AMD and Meta Announce Expanded Strategic Partnership to Deploy 6 Gigawatts of AMD GPUs - AMD](https://www.amd.com/en/newsroom/press-releases/2026-2-24-amd-and-meta-announce-expanded-strategic-partnersh.html)  
[Personal Superintelligence for Everyone - Meta](https://about.fb.com/news/2025/07/personal-superintelligence-for-everyone)
