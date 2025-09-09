---
title: "2.5 Billion Downloads Compromised: Inside the NPM 'chalk' & 'debug' Hack"
description: "A breakdown of the sophisticated supply chain attack that compromised 20+ popular NPM packages, including 'chalk' and 'debug'. See how a simple phishing email put millions of projects at risk and what it means for JavaScript security."
date: '2025-09-09'
categories:
  - cybersecurity
published: true
author: 'Jonas Fröller'
readingTime: '5 min'
tags: ['npm', 'supply chain attack', 'cybersecurity', 'javascript']
---

<script>
  import AudioNativePlayer from '$lib/components/AudioNativePlayer.svelte';
</script>

# Anatomy of a Supply Chain Attack

<AudioNativePlayer />

## The Great NPM Heist of September 2025

On September 8, 2025, the JavaScript community was rocked by a significant supply chain attack that compromised at least 20+ popular NPM packages, including the widely-used "chalk" and "debug" libraries. These packages, with a combined total of over 2.5 billion weekly downloads, are fundamental building blocks in countless web applications, making the attack's potential reach enormous.

### How it Happened: A Phishing Expedition

The attack began with a sophisticated phishing campaign targeting the maintainers of these popular packages. Attackers sent out highly convincing emails from a fraudulent domain, `npmjs.help`, urging maintainers to update their two-factor authentication (2FA) credentials. The email created a false sense of urgency, threatening to lock accounts within 48 hours. One prominent developer, known as "Qix", fell victim to this scheme, inadvertently providing the attackers with their NPM account credentials, including their username, password, and a one-time password.

With control of this account, the attackers wasted no time in publishing malicious new versions of the compromised packages. This single point of failure allowed the attack to cascade through the entire JavaScript ecosystem, as developers and automated build systems began to unknowingly pull in the compromised code.

### The Malicious Payload: A Crypto-Clipper with a Twist

The injected code was a particularly insidious type of malware known as a "crypto-clipper" or "drainer," specifically designed to steal cryptocurrency from Web3 users. When a user of an affected website initiated a cryptocurrency transaction, the malware would intercept it and swap the intended recipient's wallet address with one belonging to the attackers.

What made this attack particularly clever was its use of a fuzzy matching algorithm to select an attacker's wallet address that was visually similar to the user's intended destination. This made it much harder for users to spot the fraudulent switch, increasing the likelihood of the theft's success.

### The Aftermath: A Near Miss

The malicious packages were available on the NPM registry for approximately two hours before the community detected the compromise and the packages were removed. In that short window, however, the compromised code was downloaded millions of times, and it is estimated that the malicious payload made its way into about 10% of cloud environments.

Fortunately, the actual financial damage from the attack appears to have been minimal, with reports suggesting that the attackers only managed to steal about $50 worth of Ethereum. The primary impact of the attack was the disruption it caused to the developer community. Teams using the affected packages were forced to scramble to audit their dependencies, purge their build caches, and redeploy their applications to ensure they were not serving malicious code to their users.

### Lessons Learned

This incident serves as a stark reminder of the fragility of the open-source software supply chain. It highlights the importance of:

* **Vigilance against phishing attacks:** Developers and maintainers must be extremely cautious of any emails asking for credentials or security updates, even if they appear to be from a trusted source.
* **Dependency management:** Regularly auditing and updating dependencies is crucial to ensure that you are not using compromised packages.
* **Security best practices:** Implementing security measures like dependency scanning in CI/CD pipelines can help to catch malicious code before it reaches production.

The September 2025 NPM supply chain attack was a wake-up call for the entire JavaScript community. While the direct financial damage was limited, the incident exposed the significant potential for widespread disruption and underscored the need for greater security awareness and more robust security practices in the world of open-source software.

## Affected Packages

```
ansi-regex@6.2.1
ansi-styles@6.2.2
backslash@0.2.1
chalk-template@1.1.1
chalk@5.6.1
color-convert@3.1.1
color-name@2.0.1
color-string@2.1.1
color@5.0.1
@coveops/abi@2.0.1
debug@4.4.2
@duckdb/duckdb-wasm@1.29.2
@duckdb/node-api@1.3.3
@duckdb/node-bindings@1.3.3
duckdb@1.3.3
has-ansi@6.0.1
is-arrayish@0.3.3
prebid@10.9.1
prebid@10.9.2
simple-swizzle@0.2.3
slice-ansi@7.1.1
strip-ansi@7.1.1
supports-color@10.2.1
supports-hyperlinks@4.1.1
wrap-ansi@9.0.1
proto-tinker-wc@0.1.87
...
```

## Sources

[NPM Supply Chain Attack: Massive Compromise of debug, chalk, and 16 Other Packages](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFOCq_gBgeTXm4ocejkS6IdLYcrLLVoXmKCX0-JcsAgBU3hnVkiexOiHGBOgAooLpVlczUwFzGhyC460TPn4AvAtI4pM4DTHzX8LGsMSdMM4t5Wa5UpbJxGNmSsfoCHWGVKdkzp6rNZMUMoQHS9aKShk2cLy0Rn38c0hmRKd5rLYrKIiWIjBLt3iby7QdMfAHham7sg6sLH8QB5Va9fvwD6MGw8eAs=)  
[NPM Debug & Chalk Packages Compromised - CodeAnt AI](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF9L5UIOdiLVxwfa8F4H8Ogaj1ipJMil4WMK6qhxOmmMlPkPD9k3oiODwzFqllLlaCmq6yQXId4IsJYxDNAa6Tf11DqHJwnZNfuW_ytUXpid8zilXJEIc23IxfhvVAyWCm4p3t11k2maBM7YlqwUV1J9Z2hS3_kaSO2Fq8=)  
[Major Supply Chain Attack Compromises Popular npm Packages Including chalk and debug](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHhY04lQuKbyyOoZpH08pd5wDPmX1YqTnHHHevTey7T_dyK2vClK3hinXOAyA3pI6zPFEHXiY8MG6JESz1YKrSSRw7KJUtO_BEJeyvdLc_p0kYq-zG-GMzRIxlmKOmkxS5GiHPl7iown63GSyxRn10DHu45qhlDNb6cO1QDuYE-NsLGGMMxrTkVPogL4QiPWJjzCNrEAHttLEKeuybttgNnBAMJju3Zm3jrEWMh8jtB)  
[Security Alert | chalk, debug and color on npm compromised in new supply chain attack](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEcSlOUhsf82wMke0e_TXT1_X8kFXBvEiRtiXgnzXr5zWGBt0MoyxgcPI-GLaEJ-7twAMdS9Z3LgTTKHkx5BBOfQ0Nl4G34-1PWUnXYU1qSNBEi4sw35WavWSUkQiLlVAGvTZQXpswAsaafBTYAyM5C6PXwHLVTvUHf4ympRN7IKfX-Jwu2LueUjhLeA4rBEvSjfFvJJsnuvrnzWHB3)  
[20 Popular npm Packages With 2 Billion Weekly Downloads Compromised in Supply Chain Attack - The Hacker News](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFbgcUtCq5w7PlYrXIyTwlIkAY9rnleymzdvQmnLm3HaUw2VWzBdmLkBuF-v6GvJdA-9IgMZa06a_dkfEdoKWkT_Wc7vn3pZqrY9XOHhQIIC4VeI_7HWa9WLa_E8W7dfN6tlDIKAii6Gf5zusX4xD49fleB2BwHuYK5lSmiJGflIKyWhzoRiY_z)
