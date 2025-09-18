---
title: 'The Spice Must Flow: Inside the "Shai-Hulud" NPM Worm Attack'
description: 'A sophisticated, self-propagating malware, dubbed "Shai-Hulud," has infiltrated the npm ecosystem, compromising over 180 packages.'
date: '2025-09-18'
categories:
  - cybersecurity
  - open-source
  - web-development
  - devops
published: true
author: 'Jonas Fröller'
readingTime: '5 min'
tags: ['npm', 'cybersecurity', 'supply-chain-attack', 'malware', 'worm', 'shai-hulud', 'crowdstrike']
---

# The Spice Must Flow: Inside the "Shai-Hulud" NPM Worm Attack

A sophisticated, self-propagating malware, dubbed "Shai-Hulud," has infiltrated the npm ecosystem, compromising over 180 packages and creating a significant supply chain security threat. This novel worm is designed to steal credentials and automatically spread to other packages, escalating the potential for widespread damage. The name "Shai-Hulud" is a reference to the giant sandworms in the *Dune* novels, likely because the malware creates public GitHub repositories with "Shai-Hulud" in the name to exfiltrate stolen data.

## A Multi-Stage Attack

The Shai-Hulud worm executes a multi-stage attack that begins when a developer installs a compromised npm package. The attack is believed to be the work of the same threat actors behind the recent S1ngularity/nx attack.

Here's a breakdown of how the attack unfolds:

1. **Initial Compromise**: The attack likely started with a phishing campaign that tricked a package maintainer into giving up their credentials. The first package identified as compromised was `rxnt-authentication`, which was updated with the malicious code on September 14, 2025.
2. **Execution**: The malware is contained in a `bundle.js` script that runs automatically after the compromised package is installed. This script targets Linux and macOS systems.
3. **Credential Theft**: The worm uses `trufflehog`, a legitimate open-source tool, to scan the infected system for sensitive information. It searches for credentials for GitHub, npm, AWS, and GCP.
4. **Data Exfiltration**: Stolen credentials and other sensitive data are then exfiltrated to a public GitHub repository and a webhook.site endpoint. The malware also has the capability to make private GitHub repositories public, further exposing sensitive information.
5. **Self-Propagation**: This is the most alarming aspect of the Shai-Hulud attack. If the worm finds valid npm credentials, it identifies other packages maintained by the compromised developer and injects itself into them. It then publishes new versions of these packages, allowing the worm to spread exponentially throughout the npm ecosystem.

## Widespread Impact, Even on Security Firms

The Shai-Hulud worm has had a significant impact, with over 180 packages compromised so far, and that number is expected to grow. Some of the popular packages affected include `@ctrl/tinycolor`, `angulartics2`, and `ngx-toastr`.

Ironically, even the cybersecurity firm CrowdStrike was not immune to this attack. Over 20 of their npm packages were compromised by the worm. CrowdStrike has since removed the malicious packages and rotated its keys, stating that its Falcon platform and customers were not impacted.

## How to Protect Yourself

This incident is a stark reminder of the importance of supply chain security. Here are some steps you can take to protect yourself from similar attacks:

* **Audit Your Dependencies**: Carefully review the packages you are using and remove any that are no longer necessary.
* **Use Lock Files**: Use a package lock file and pin your dependencies to specific versions to prevent unexpected updates.
* **Scan for Vulnerabilities**: Implement automated dependency scanning and monitoring to detect unauthorized activities.
* **Rotate Credentials**: If you suspect you may have been compromised, rotate all of your credentials immediately.
* **Review Security Logs**: Regularly check your GitHub security logs for any suspicious activity, such as the creation of new repositories.
* **Be Wary of Phishing**: Be cautious of emails or other communications that ask you to update your credentials or perform other sensitive actions.

The Shai-Hulud worm is a serious threat to the npm ecosystem, but by taking proactive security measures, you can help protect yourself and your organization from this and other supply chain attacks.

## Sources

["Shai-Hulud" Worm Compromises npm Ecosystem in Supply Chain Attack - Ox.Security](https://www.ox.security/blog/npm-2-0-hack-40-npm-packages-hit-in-major-supply-chain-attack)  
[S1ngularity/nx attackers strike again - Aikido Security](https://www.aikido.dev/blog/s1ngularity-nx-attackers-strike-again)  
