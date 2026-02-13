---
title: "Paragon Graphite Spyware: Leak Exposes Global Surveillance Operations"
description: "A deep dive into the Paragon Solutions Graphite spyware leak, its use against journalists, and the global controversy surrounding zero-click surveillance tools."
date: '2026-02-13'
categories:
  - cybersecurity
published: true
author: 'Jonas Fröller'
readingTime: '6 min'
tags: ['paragon-solutions', 'graphite-spyware', 'cybersecurity', 'surveillance', 'zero-click-exploit', 'privacy-rights']
---

# Israeli Spyware Leak Exposes Global Surveillance

## TL;DR

> In February 2026, Israeli spyware firm Paragon Solutions accidentally exposed a screenshot of its Graphite surveillance dashboard on LinkedIn, revealing active monitoring operations and raising operational security concerns. The spyware has been linked to targeting journalists, activists, and critics, particularly in Italy, though Paragon claims to sell only to vetted democracies with abuse safeguards. Evidence suggests U.S. agencies including ICE contracted Paragon for Graphite through a $2 million deal reactivated in September 2025 after corporate restructuring, despite executive restrictions. Research indicates Graphite has been deployed globally, including in Canada and Australia, highlighting proliferation challenges and intensifying debates between civil society groups calling for bans and proponents citing legitimate law enforcement needs.

## The Exposure Incident

On February 11, 2026, a LinkedIn post by Paragon's general counsel included a screenshot of the Graphite control panel, showing elements like a Czech phone number labeled "Valentina" and interception logs from the previous day. The post was deleted shortly after, but cybersecurity experts quickly captured and shared it, labeling it an "epic OPSEC fail." This glimpse into the dashboard confirmed Graphite's capabilities for monitoring encrypted apps via zero-click exploits, without user interaction.

## Links to Targeting Journalists and Critics

Investigations by organizations like Citizen Lab and Meta (WhatsApp's parent) have connected Graphite to surveillance campaigns. In January 2025, WhatsApp notified around 90 individuals—many journalists and civil society members—about attempted hacks. Confirmed cases include Italian targets critical of migration policies, such as journalists Francesco Cancellato and Ciro Pellegrino, and humanitarian workers Luca Casarini and Giuseppe Caccia. These incidents suggest misuse even in democratic contexts, though Paragon has denied direct involvement, attributing any abuses to clients.

## U.S. Government Involvement

U.S. agencies have engaged with Paragon, including a reported 2022 use by the DEA. ICE's $2 million contract, initially paused in 2024 for review under Executive Order 14093 (which restricts foreign-controlled spyware), was reactivated in September 2025 following Paragon's acquisition by U.S. firm AE Industrial Partners and merger with REDLattice. This restructuring appears to bypass the order's intent, allowing access to Graphite for potential immigration enforcement. Paragon has also claimed U.S. government and allied clients more broadly.

## Broader Concerns

While Paragon positions Graphite as a "cleaner" alternative to tools like NSO Group's Pegasus, emphasizing human rights compliance, evidence of targeting in Europe has fueled calls for accountability. Groups like EFF warn of risks to privacy and free expression, especially if deployed domestically. The exposure highlights vulnerabilities in the spyware sector, where even vendors handling sensitive tools can falter on basic security.

---

Paragon Solutions, founded in Israel in 2019 by figures including former Prime Minister Ehud Barak and ex-Unit 8200 commander Ehud Schneorson, has emerged as a key player in the commercial spyware market. Its flagship product, Graphite, is designed to access instant messaging apps like WhatsApp and Signal on targeted devices, extracting stored data and live communications via zero-click exploits that require no user action. Unlike more invasive spyware such as Pegasus from NSO Group, Graphite reportedly avoids full device control, focusing on encrypted communications. The company has marketed itself as an ethical alternative, claiming to sell only to governments in democracies that adhere to international norms and human rights standards, with built-in safeguards to prevent misuse. However, investigations reveal a more complex picture, with Graphite implicated in surveillance of civil society in ways that challenge these assertions.

The accidental exposure of Graphite's control panel occurred on February 11, 2026, when Paragon's general counsel shared a screenshot on LinkedIn. The image depicted an active dashboard with a Czech phone number labeled "Valentina," logs of interceptions dated February 10, 2026, and interfaces for real-time monitoring of encrypted platforms. Cybersecurity researcher Jurre van Bergen first spotted the post, which was promptly deleted, but not before it circulated widely online. John Scott-Railton of Citizen Lab described it as an "epic OPSEC fail," emphasizing how such a lapse undermines trust in an industry reliant on secrecy. This incident provided a rare public view into Graphite's operational interface, confirming its capabilities for remote, undetectable surveillance. While Paragon has not issued a direct response, the exposure aligns with broader patterns of operational vulnerabilities in spyware firms, where human error can reveal sensitive tools intended for covert use.

Graphite's documented uses have raised alarms, particularly in Europe. In January 2025, WhatsApp disrupted a hacking campaign attributed to Paragon, notifying approximately 90 targets across two dozen countries, many of whom were journalists, activists, and civil society members. Forensic analysis by Citizen Lab confirmed Graphite infections on several devices, marking the first verified cases on Apple iOS products. In Italy, under Prime Minister Giorgia Meloni's government, Graphite targeted individuals critical of migration policies. Confirmed victims include Francesco Cancellato, editor of Fanpage.it, known for investigative reporting on politics; Ciro Pellegrino, another Fanpage journalist; Luca Casarini, founder of Mediterranea Saving Humans, involved in Mediterranean refugee rescues; and Giuseppe Caccia, a scholar and co-founder of the same organization. Artifacts like "BIGPRETZEL" on Android devices and "SMALLPRETZEL" anomalies on iOS pointed to Graphite, with infections traced to late 2024 and early 2025. Additional targets include Libyan activist Husam El Gomati in Sweden and a prominent unnamed European journalist. These cases suggest Graphite was used to monitor critics of Italy-Libya migration pacts, potentially violating privacy and free speech rights. In response, Paragon terminated its contracts with two Italian agencies—a law enforcement body and an intelligence service—in February 2025, citing violations of its ethical framework. Italy's government denied targeting the individuals but suspended deployments amid public outcry.

Beyond Italy, Citizen Lab's infrastructure analysis, based on server fingerprints from self-signed TLS certificates, identified suspected Graphite deployments in multiple countries. Tier 1 servers, often cloud-hosted for command and control, and Tier 2 endpoints on local telecom IPs, revealed codenames like "cap" for Canada (linked to Ontario Provincial Police headquarters), "astra" for Australia, "cag" for Cyprus, "drt" for Denmark, "muki" for Israel, and "sht" for Singapore. These suggest widespread adoption by law enforcement and intelligence entities. In Canada, Graphite's presence in Ontario raises human rights concerns, given prior spyware use by agencies like the RCMP in investigations from 2017 to 2022. Civil rights groups have documented deployments targeting activists, amplifying calls for oversight.

In the United States, Paragon's ties to government agencies add another layer of controversy. A 2022 New York Times report indicated DEA use of Graphite. More recently, ICE reactivated a $2 million contract in September 2025, initially signed in late 2024 but paused for compliance with Executive Order 14093, which prohibits U.S. agencies from using spyware posing national security or human rights risks, especially if foreign-controlled. The reactivation followed Paragon's acquisition by U.S. private equity firm AE Industrial Partners in December 2024 and merger with Virginia-based REDLattice, effectively domesticating the company and circumventing the order. EFF's Cooper Quintin criticized this as ignoring the executive order's spirit, warning of misuse risks similar to Italy's, including surveillance of journalists, humanitarian workers, or personal targets by insiders. Paragon's U.S. subsidiary, established in 2021 with CIA-linked leadership, has lobbied for alignment with American interests, claiming U.S. government and allied clients. Lawmakers, including Reps. Summer Lee, Shontel Brown, and Yassamin Ansari, have demanded DHS details on safeguards, citing potential First and Fourth Amendment violations. Access Now and other groups argue Graphite's intrusive nature makes it incompatible with human rights, urging a ban.

The proliferation of Graphite exemplifies challenges in regulating mercenary spyware. While Paragon insists on vetting clients and preventing abuses, evidence from democratic nations like Italy shows safeguards can fail. Counterarguments from industry proponents highlight spyware's role in legitimate investigations, such as countering crime or terrorism, but critics counter that zero-click tools enable unchecked surveillance without independent audits. The LinkedIn exposure, combined with forensic confirmations, has intensified scrutiny, with Amnesty International calling it part of Europe's "growing spyware crisis." Broader implications include eroded public trust in digital privacy, potential chilling effects on journalism and activism, and calls for global bans on such tools. As deployments expand, ongoing research by groups like Citizen Lab underscores the need for transparency, judicial oversight, and international norms to curb misuse.

| Country       | Suspected Customer/Deployment           | Key Details                                                                                                             |
| ------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Italy         | Law Enforcement & Intelligence Agencies | Contracts terminated in Feb 2025 after targeting journalists and activists; confirmed infections via WhatsApp exploits. |
| Canada        | Ontario Provincial Police (OPP)         | Infrastructure linked to OPP headquarters; potential use in investigations, raising concerns for activist surveillance. |
| United States | ICE, DEA                                | ICE $2M contract reactivated Sep 2025; DEA reported use in 2022; merger with REDLattice enables domestic access.        |
| Australia     | Unspecified Government                  | Codenamed "astra"; local telecom IPs suggest law enforcement deployment.                                                |
| Denmark       | Unspecified Government                  | Codenamed "drt"; infrastructure indicates active use.                                                                   |
| Cyprus        | Unspecified Government                  | Codenamed "cag"; part of broader European operations.                                                                   |
| Israel        | Unspecified (Likely Intelligence)       | Founding country; codenamed "muki"; core infrastructure.                                                                |
| Singapore     | Unspecified Government                  | Codenamed "sht/stg"; telecom-linked servers.                                                                            |

| Confirmed Target            | Role/Affiliation                       | Location | Infection Details                                                     |
| --------------------------- | -------------------------------------- | -------- | --------------------------------------------------------------------- |
| Francesco Cancellato        | Editor, Fanpage.it                     | Italy    | Android infection confirmed Dec 2024–Jan 2025; "BIGPRETZEL" artifact. |
| Ciro Pellegrino             | Journalist, Fanpage.it                 | Italy    | iOS infection; first confirmed Graphite on Apple device.              |
| Luca Casarini               | Founder, Mediterranea Saving Humans    | Italy    | Android infection; targeted for migrant rescue work.                  |
| Giuseppe Caccia             | Co-founder, Mediterranea Saving Humans | Italy    | Android infection; scholar and activist.                              |
| Husam El Gomati             | Activist on Italy-Libya migration      | Sweden   | Suspected targeting via WhatsApp.                                     |
| Unnamed European Journalist | Prominent journalist                   | Europe   | iOS infection confirmed.                                              |
| David Yambio                | Migrant rights advocate                | Italy    | iOS anomalies ("SMALLPRETZEL"); contextual links to Graphite.         |

## Sources

[Israeli Spyware Firm Exposes Paragon Spyware Control Panel on LinkedIn](https://cybersecuritynews.com/paragon-spyware-control-panel-on-linkedin)  
[Virtue or Vice? A First Look at Paragon’s Proliferating Spyware Operations](https://citizenlab.ca/research/a-first-look-at-paragons-proliferating-spyware-operations)  
[EFF Statement on ICE Use of Paragon Solutions Malware](https://www.eff.org/deeplinks/2025/09/eff-statement-ice-use-paragon-solutions-malware)  
[Another person targeted by Paragon spyware comes forward](https://techcrunch.com/2025/02/11/another-person-targeted-by-paragon-spyware-comes-forward)  
[Paragon spyware allegedly found on more European journalists' devices amid growing scandal](https://www.business-humanrights.org/en/latest-news/paragon-spyware-allegedly-found-on-more-european-journalists-devices-amid-growing-scandal)  
[Ice obtains access to Israeli-made spyware that can hack phones and encrypted apps](https://www.theguardian.com/us-news/2025/sep/02/trump-immigration-ice-israeli-spyware)  
[The U.S. has reactivated its Paragon contract — and it should alarm everyone](https://www.accessnow.org/paragon-contract-spyware)  
