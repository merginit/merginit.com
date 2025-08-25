---
title: "Your Data on the Menu: A Cascade of Security Failures at McDonald's and its Partners"
description: "An analysis of the recent data breach affecting millions of McDonald's job applicants, exposing critical security flaws at both the fast-food giant and its AI hiring partner, Paradox.ai."
date: '2025-08-26'
categories:
  - cybersecurity
  - opinion
published: true
author: 'Jonas Fröller'
readingTime: '3 min'
tags:
  [
    'mcdonalds',
    'paradox-ai',
    'data-breach',
    'cybersecurity',
    'password-security',
    'supply-chain-attack',
    'vulnerability'
  ]
---

<script>
  import AudioNativePlayer from '$lib/components/AudioNativePlayer.svelte';
  import ImageWithCaption from '$lib/components/ImageWithCaption.svelte';
</script>

# Your Data on the Menu

<AudioNativePlayer />

## A Cascade of Security Failures at McDonald's and its Partners

<ImageWithCaption 
  src="/blog/26082025-your-data-on-the-menu-mcdonalds-security-failures/mcdonalds-locations-map.png"
  alt="A map illustrating McDonald's global presence. The company's vast scale puts the 64 million breached job applicant records into perspective."
  className="my-4 rounded-lg shadow-lg"
/>

A recent security incident has brought to light alarming vulnerabilities not just within a major fast-food chain, but also within its trusted technology partners. The personal information of an estimated 64 million McDonald's job applicants was exposed due to a series of security blunders, serving as a stark reminder of the fragility of our personal data in an interconnected world.

The initial breach was shockingly simple. Security researchers discovered that McHire, the recruitment platform used by many McDonald's franchisees and developed by AI hiring bot maker Paradox.ai, had an administration account with the username and password set to "123456". This easily guessable password, combined with another vulnerability, allowed researchers to access the personal data of millions of applicants, including names, email addresses, and phone numbers.

While Paradox.ai initially stated this was an isolated incident involving a test account, further investigation revealed a more troubling pattern of poor security practices. A report from Krebs on Security found that a Paradox.ai developer's computer was infected with malware, which stole hundreds of passwords. These included credentials for other Fortune 500 clients of Paradox.ai, as well as the developer's login for the company's single sign-on platform, with a cookie valid for months.

The security issues don't stop with Paradox.ai. Another security researcher detailed a long list of vulnerabilities found directly within McDonald's own systems. These included a marketing hub "protected" by a client-side password, the practice of emailing passwords in plaintext, exposed API keys, and even a system that allowed any crew member to look up any employee in the company, from store managers to the CEO. The researcher also discovered that an internal tool for franchise owners had no authentication at all for administrative functions.

A concerning aspect of this story is the difficulty researchers faced when trying to report these vulnerabilities. One researcher had to resort to cold-calling McDonald's corporate headquarters and guessing employee names after finding the company's security contact information had been removed from their website. In a disheartening turn of events, a McDonald's employee who assisted in identifying some of these security flaws was reportedly fired for "security concerns from corporate".

These incidents underscore a critical issue in modern business: the security of a company is only as strong as its weakest link, which often lies within its supply chain and its own internal practices. For individuals, it's a sobering reminder of how our data is handled. For corporations, it's a loud and clear call to prioritize robust security measures, foster a culture of security, and create clear, accessible channels for security researchers to report vulnerabilities without fear of retribution.

<div id="research-sources">

## Sources

[Would you like an IDOR with that?](https://ian.sh/mcdonalds)  
[Poor Passwords Tattle on AI Hiring Bot Maker Paradox.ai - Krebs on Security](https://krebsonsecurity.com/2025/07/poor-passwords-tattle-on-ai-hiring-bot-maker-paradox-ai)  
[How I Hacked McDonald's (Their Security Contact Was Harder to Find Than Their Secret Sauce Recipe)](https://bobdahacker.com/blog/mcdonalds-security-vulnerabilities)

</div>
