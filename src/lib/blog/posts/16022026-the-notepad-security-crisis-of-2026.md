---
title: "The Notepad Security Crisis: Exploits in Notepad++ and Microsoft Notepad"
description: "A technical analysis of the recent security breaches affecting the world's most popular text editors: from the Lotus Blossom supply chain attack on Notepad++ to the Markdown RCE in Windows 11."
date: '2026-02-16'
categories:
  - cybersecurity
  - developer-tools
published: true
author: 'Jonas Fröller'
readingTime: '6 min'
tags: ['supply-chain', 'RCE', 'Notepad++', 'Windows-11', 'Lotus-Blossom', 'infosec']
---

# The Notepad Security Crisis: Exploits in Notepad++ and Microsoft Notepad

## Supply Chain Hijack: How State-Sponsored Actors Poisoned Notepad++ Updates

The inherent trust between developers and their open-source tools was exploited in a sophisticated infrastructure-level breach targeting Notepad++. From mid-2025 through early 2026, a suspected state-sponsored threat actor maintained access to the distribution servers of the popular text editor. This access allowed for a surgical supply-chain attack that delivered a custom backdoor to targeted users.

The operation, attributed with medium confidence to the Chinese-linked APT group Lotus Blossom (also known as Billbug or Thrip), avoided modifying the application's source code directly. Instead, the attackers compromised the hosting infrastructure to manipulate the update mechanism itself.

### The GUP Infrastructure Compromise

The breach centered on the GUP (Generic Update Program) mechanism utilized by Notepad++. Researchers discovered that the threat actors gained access to the shared hosting provider used by `notepad-plus-plus.org`. By compromising the server that serves update manifests, the attackers were able to selectively redirect update traffic.

When a targeted user's client checked for updates, the server returned a malicious XML manifest. This manifest pointed the client toward a rogue server, which then pushed a poisoned NSIS installer (`update.exe`) to the victim's machine. Because the initial request originated from a trusted domain, the malicious file was successfully downloaded to the `%TEMP%` folder and executed without raising initial suspicion.

### Inside the Chrysalis Backdoor

Technical analysis by security firms, including Rapid7, revealed a highly evasive multi-stage infection chain. The poisoned installer did not contain the final malware: instead, it served as a loader for a previously undocumented custom backdoor dubbed Chrysalis.

To evade Endpoint Detection and Response (EDR) solutions, the malware utilized a technique known as DLL Sideloading. The attackers dropped a legitimate, signed binary (a renamed Bitdefender utility) alongside a malicious file named `log.dll`. When the trusted Bitdefender executable ran, it automatically loaded the malicious DLL into memory.

Once active, Chrysalis provided the attackers with interactive shell access and encrypted C2 communication. The backdoor communicated with `api.skycloudcenter[.]com` over HTTPS, masquerading as DeepSeek AI chat sessions to blend in with legitimate network traffic.

### A Targeted Hands-on-Keyboard Operation

Forensic evidence suggests this was not an opportunistic campaign aimed at the general public. Instead, it was a high-detail operation targeting specific organizations with interests in East Asia. 

Security researcher Kevin Beaumont noted that once the backdoor was established, the threat actors engaged in hands-on-keyboard reconnaissance. Attackers manually executed commands such as `netstat -ano`, `tasklist`, and `whoami` to map the network and determine privilege levels before exfiltrating data via `temp[.]sh`.

## Feature Bloat as an Attack Vector: Microsoft's Notepad RCE

While Notepad++ was battling infrastructure hijacks, Microsoft's own version of the iconic text editor fell victim to a different kind of vulnerability: feature bloat. In February 2026, a critical remote code execution (RCE) flaw was disclosed in the modern Windows 11 Notepad app. This flaw stemmed directly from the editor's newly added support for Markdown rendering.

The vulnerability, tracked as CVE-2026-20841, highlights the risks inherent in transforming a historically simple utility into a feature-rich application capable of handling complex network-aware protocols.

### The Markdown Silent Execution Flaw

The flaw resides in how the modern Notepad app, distributed via the Microsoft Store, handles hyperlinks within Markdown (`.md`) files. In its attempt to modernize the editor, Microsoft introduced rich-text features that allow Notepad to render clickable links. 

Security researchers discovered that the application failed to properly sanitize or restrict protocol handlers. An attacker could craft a Markdown file containing links using dangerous protocols such as `file://` or `ms-appinstaller://`. If a user opened the file in Notepad and performed a standard Ctrl+click on the link, the application would silently launch the unverified protocol.

This bypass allowed for the execution of local or remote programs, such as a malicious batch script or a remote executable, directly within the security context of the logged-in user. If the victim possessed administrative privileges, the attacker gained full control over the machine.

### The Problem with Protocol Handling

The core of the issue is a failure in threat modeling. Traditionally, users do not associate Markdown files with execution risks. By allowing Notepad to invoke local system commands via protocol handlers, Microsoft opened an attack surface that many users were unprepared to defend.

Critics have noted that this is the logical conclusion of the feature-bloat-to-vulnerability pipeline. For nearly 30 years, Notepad was the gold standard for a simple, isolated utility. With the integration of Markdown rendering and AI features like Copilot, the application now requires complex parsing logic and network awareness, making it a viable target for social engineering and command injection.

### Remediation and Patching

Microsoft addressed the flaw in its February 10, 2026 Patch Tuesday release. The fix involves implementing a warning prompt that alerts users when they attempt to click on links using non-standard protocols. 

While this provides a layer of defense, security experts warn that the risk remains for users who ignore safety warnings. Because the modern Notepad is a Microsoft Store app, most users will receive the update automatically. Administrators are encouraged to verify that systems are running version 11.2510 or higher to mitigate the threat.

## Sources

### Notepad++

[Nation-State Actors Exploit Notepad++ Supply Chain - Unit 42](https://unit42.paloaltonetworks.com/notepad-infrastructure-compromise)  
[Notepad++ Hosting Breach Attributed to China-Linked Lotus Blossom Hacking Group - The Hacker News](https://thehackernews.com/2026/02/notepad-hosting-breach-attributed-to.html)

### Microsoft Notepad

[Windows 11 Notepad flaw let files execute silently via Markdown links - Bleeping Computer](https://www.bleepingcomputer.com/news/microsoft/windows-11-notepad-flaw-let-files-execute-silently-via-markdown-links)  
[Microsoft patches critical Notepad vulnerability allowing code execution - SC Media](https://www.scworld.com/news/microsoft-patches-critical-notepad-vulnerability-allowing-code-execution)  
[Notepad's new Markdown powers served with a side of remote code execution - The Register](https://www.theregister.com/2026/02/11/notepad_rce_flaw)  
[Windows Notepad Markdown feature opens door to RCE (CVE-2026-20841) - Help Net Security](https://www.helpnetsecurity.com/2026/02/12/windows-notepad-markdown-feature-opens-door-to-rce-cve-2026-20841)
