---
title: "WhatsApp Data Leak: 3.5 Billion Profiles Scraped via Contact Discovery"
description: "Technical analysis of the massive WhatsApp metadata scrape exposing 3.5 billion users. Details on the Contact Discovery vulnerability discovered by University of Vienna and SBA Research."
date: "2025-11-20"
categories:
  - cybersecurity
  - api-design
published: true
author: "Jonas Fröller"
readingTime: "4 min"
tags: ["WhatsApp", "Data Breach", "Contact Discovery", "OSINT", "SBA Research", "University of Vienna", "Metadata", "Cybersecurity", "Privacy", "WhatsMeow"]
---

# Breach of Privacy: 3.5 Billion WhatsApp Profiles Scraped

Researchers from the University of Vienna and SBA Research have demonstrated a massive privacy flaw in WhatsApp, allowing them to harvest the profile data of **3.5 billion users**, which is nearly the entire active user base of the platform.

While end-to-end encryption protected the content of messages, this incident is classified as one of the largest metadata leaks in history. It exposed phone numbers, profile images, and user status texts on a global scale, highlighting the dangers of unrestricted contact discovery.

## The Vulnerability

The researchers exploited WhatsApp's **Contact Discovery** service, which is designed to sync a user's address book with WhatsApp servers. The system failed to implement sufficient "rate limiting", allowing the team to:
* Use a modified version of the open-source tool [WhatsMeow](https://github.com/tulir/whatsmeow).
* Query a generated number space of **63 billion phone numbers** between December 2024 and March 2025.
* Verify **3.54 billion active accounts** across 245 territories using standard university IP addresses without being blocked.

## Exposed Data

The scrape aggregated extensive metadata that is highly susceptible to weaponization for doxxing and surveillance:
* **Phone Numbers:** Validated active accounts linked to real-world identities.
* **Profile Pictures:** 57% of users (approx. 2 billion) had public profile images. Automated facial recognition analysis on a sample set identified human faces in 66% of cases.
* **"About" Text:** 30% of users had public status messages, potentially revealing political views, health data, or illicit services.
* **Device Info:** The data distinguished between Android and iOS clients and the number of linked devices.
* **Public Keys:** Cryptographic data revealed account usage patterns, including shared keys across multiple devices.

## Key Risks

* **State Surveillance:** The researchers identified millions of active users in countries where WhatsApp is officially banned or restricted, including **2.3 million in China**, **1.6 million in Myanmar**, and **5 in North Korea**. These individuals are now at heightened risk of state identification and prosecution.
* **Organized Scams:** Analysis of public keys revealed clusters of identical keys used across multiple devices and numbers. This pattern strongly indicates industrial-scale scam operations (such as crypto fraud or romance scams) operating out of regions like Nigeria, Indonesia, and Myanmar.
* **Doxxing:** The combination of a verified phone number, a current facial image, and personal text facilitates the creation of searchable "doxxing" databases used for harassment and social engineering.

## Meta's Response

The research team notified Meta of the vulnerability in **September 2024**, but the company reportedly delayed significant action until the study was nearing publication.
* **Fixes:** Meta has now implemented machine-learning-based rate limiting to detect mass querying and has removed timestamps from profile pictures to prevent activity tracking.
* **Statement:** Meta acknowledged the findings but emphasized that the data collected was technically "public" information chosen by users, rather than the result of a deeper system intrusion.

## Recommended Action

* **Settings:** For future accounts, change your "Profile Photo" and "About" visibility settings to **"My Contacts"** or **"Nobody"** immediately.
* **Account Hygiene:** If you change your phone number, ensure you fully delete your old WhatsApp account rather than just abandoning it, to remove the data from the public directory.

## Sources

[University of Vienna: Researchers discover security vulnerability in WhatsApp](https://www.univie.ac.at/en/news/detail/forscherinnen-entdecken-grosse-sicherheitsluecke-in-whatsapp)  
[Computing UK: WhatsApp feature enabled stealth scrape of 3.5 billion user profiles](https://www.computing.co.uk/news/2025/security/whatsapp-leak-3-5-billion-profiles)  
