---
title: "Cloudflare Outage 2025: Technical Post-Mortem"
description: "Technical analysis of the November 18 Cloudflare outage, identifying Turnstile failures and config rollbacks as key factors."
date: "2025-11-19"
categories:
  - cloud-computing
  - devops
  - cybersecurity
published: true
author: "Jonas Fröller"
readingTime: "8 min"
tags: ["Cloudflare", "Turnstile", "Workers KV", "SRE", "Web Infrastructure", "DDoS Protection", "System Administration", "Outage", "DevOps"]
---

# Incident Report: Cloudflare Global Service Disruption (Nov 18, 2025)

On November 18, 2025, the global internet infrastructure experienced a critical seizure. Cloudflare, the dominant Content Delivery Network (CDN) and security provider responsible for proxying approximately 20% of all web traffic, suffered a widespread internal failure. The event resulted in massive availability issues for major platforms including X (formerly Twitter), OpenAI, and Spotify, exposing the fragility of the modern web's centralized architecture.

The following is a factual breakdown of the root cause, the timeline of events, and the technical implications observed during the incident.

![Cloudflare Error Page](/blog/19112025-cloudflare-outage-november-18-2025-technical-analysis/cloudflare-error-page.webp)

### Root Cause Analysis

Contrary to initial speculation regarding state-sponsored cyber attacks or complex DDoS campaigns, Cloudflare has confirmed the issue was **internal**.

The failure originated in the provisioning of a **threat traffic management configuration file**. According to the post-incident analysis:

1. A routine automated process generated a configuration file intended for threat mitigation.
2. This file **exceeded the size parameters** expected by the underlying software stack.
3. When the traffic-handling systems attempted to load this oversized configuration, they crashed.
4. This triggered a boot-loop scenario where edge services would restart, attempt to load the config, and crash again, causing widespread packet drops and generic **HTTP 500 errors**.

Cloudflare explicitly stated there is **no evidence of malicious activity**.

### Operational Impact

The outage exhibited a complex failure pattern across Cloudflare's product suite. It was not a total blackout of the control plane, but rather a cascading failure of dependency services like **Turnstile** and **Access**.

* **Core CDN & Security:** Users globally encountered **HTTP 5xx status codes** as the edge proxy failed to process requests.
* **Dashboard & Control Plane:** Crucially, the **Cloudflare Dashboard remained mostly operational**. However, system administrators were effectively locked out because **Turnstile** (the CAPTCHA/verification widget) failed to load on the login page, making authentication impossible.
* **Workers KV:** The distributed key-value store returned significantly elevated HTTP 5xx errors because the "front end" gateway relied on the failing core proxy.
* **Cloudflare Access:** Widespread authentication failures occurred for users trying to reach protected internal applications. This persisted until a specific rollback was initiated.
* **Email Security:** Processing remained active, but the service temporarily lost access to an IP reputation source, reducing spam-detection accuracy.

**Affected Services:** High-availability dependencies failed across the board, impacting X (formerly Twitter), Anthropic's Claude, OpenAI's ChatGPT, Spotify, Discord, and Shopify.

![The Outage](/blog/19112025-cloudflare-outage-november-18-2025-technical-analysis/the-outage.webp)

### Incident Timeline

The following timeline details the progression of the outage on November 18, 2025 (All times UTC).

| Time (UTC) | Event Phase                | Technical Detail                                                                                                                                  |
| :--------- | :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| **11:28**  | **Incident Onset**         | Monitoring systems detect a massive spike in HTTP 500 errors; traffic routing begins to fail globally due to config crash loops.                  |
| **11:32**  | **Acknowledgment**         | Cloudflare status page officially confirms "internal service degradation."                                                                        |
| **12:00**  | **Peak Impact**            | Downdetector reports exceed 11,000. Economic impact estimated at **$5B–$15B/hour** due to halted global commerce.                                 |
| **13:05**  | **Access Rollback**        | **Critical Fix:** A rollback is initiated specifically for Cloudflare Access, stopping the widespread authentication failures for protected apps. |
| **14:30**  | **Data Plane Restoration** | Engineers apply a fix to the configuration handling. **Traffic routing is restored**; websites begin to load for end-users.                       |
| **14:34**  | **Dashboard Restoration**  | Fix deployed to restore the **Turnstile** service functionality, allowing administrators to finally log in to the dashboard.                      |
| **14:42**  | **Verification**           | Broad application services remediated; global monitoring for regression begins.                                                                   |
| **16:55**  | **Support Recovery**       | Full access to the support portal and case management is restored.                                                                                |
| **17:06**  | **Resolution**             | Incident officially closed. All systems (Logs, Analytics, APIs) confirmed stable.                                                                 |

### Observer Analysis

This event highlights the hidden risks of "soft" dependencies in centralized infrastructure. While the Dashboard backend was technically surviving the outage, it was rendered useless because a single frontend component (**Turnstile**) failed.

In a typical disaster recovery scenario, a Site Reliability Engineer (SRE) would log in to redirect traffic via DNS. On November 18, that door was bolted shut not because the server was down, but because the key (Turnstile) was broken. The incident serves as a definitive case study for the necessity of **"break-glass" authentication mechanisms** that do not rely on the same edge services they are meant to control.

## Sources

[Cloudflare Official Post-Mortem](https://blog.cloudflare.com/18-november-2025-outage)  
[Dane Knecht](https://x.com/dok2001/status/1990827571089428580)  
[Cloudflare](https://x.com/Cloudflare/status/1990848789045792937)  
[Cloudflare Status](https://www.cloudflarestatus.com)
