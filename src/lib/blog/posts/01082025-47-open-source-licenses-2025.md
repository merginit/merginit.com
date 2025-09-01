---
title: '47 Open Source Licenses: Complete Guide (2025)'
description: 'Compare all 47 open source licenses with MIT, GPL, Apache and BSD summaries, plus when to use each. Choose the right license for your project in 2025.'
date: '2025-08-01'
categories:
  - open-source
  - comparison
published: true
author: 'Jonas Fröller'
readingTime: '25 min'
tags:
  [
    'open-source-licenses',
    'MIT-license',
    'GPL-license',
    'Apache-license',
    'BSD-license',
    'copyleft',
    'permissive-licenses',
    'software-licensing',
    'GitHub',
    'developer-guide'
  ]
---

# 47 Open Source Licenses

## A Developer's Guide to Open Source Licenses: Understanding Your Options and When to Use Them

Open source software powers much of the modern tech world, from small tools to massive platforms. But to make your code truly "open source," you need a license. Without one, your code is just publicly viewable—not legally usable.

**This guide is structured in two main parts:**

1. **Introduction and Overview**: We'll first cover what open source licenses are, the major types, and provide a comprehensive table of all 47 licenses from ChooseALicense.com
2. **Detailed License Information**: Then we'll dive deep into each license with specific descriptions, use cases, and links to full license texts

Let's start with the fundamentals, then move to the complete breakdown of every license available.

### What Are Open Source Licenses and Why Do They Matter?

An open source license is a legal agreement that lets others use, modify, and distribute your code under defined terms. When you write software, you automatically hold the copyright, meaning no one else can legally touch it without your permission. A license changes that by granting specific rights to others.

Without a license, your code isn't open source—it's just visible. For example, if you push code to GitHub without a license, others can look at it or fork it (per GitHub's Terms of Service), but they can't use it in their projects without risking legal trouble. A good license also protects you by limiting liability if something goes wrong with your code.

The [Open Source Initiative (OSI)](https://opensource.org/osd) defines open source as software that:

- Allows free redistribution
- Provides source code access
- Permits modifications and derivative works
- Doesn't restrict who can use it or for what purpose

This goes beyond "code you can see"—it's about enabling collaboration and reuse.

### Types of Open Source Licenses

There's a wide range of open source licenses, each with unique rules. Here's a breakdown of the main categories and examples, including their full text placeholders from [ChooseALicense.com](https://github.com/github/choosealicense.com/tree/gh-pages/_licenses).

#### **Copyleft Licenses**

These "viral" licenses require derivative works to use the same or a compatible license, ensuring the code stays open source.

- **GNU General Public License (GPL)**

  - Ensures derivatives remain open source and freely available.
  - _When to use_: Ideal if you want to guarantee your code and its modifications stay in the open source community.
  - License text: [GPLv3](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/gpl-3.0.txt)

- **Affero GNU Public License (AGPL)**

  - Like GPL, but extends to software accessed over a network (e.g., web apps).
  - _When to use_: Perfect for server-side software where you want users to access the source code.
  - License text: [AGPLv3](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/agpl-3.0.txt)

- **Lesser GNU Public License (LGPL)**
  - A milder copyleft that allows linking to the software without forcing the whole project to be open source.
  - _When to use_: Great for libraries you want others to use freely without strict requirements.
  - License text: [LGPLv3](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/lgpl-3.0.txt)

#### **Permissive Licenses**

These give users freedom to use your code however they want, including in proprietary projects, with minimal obligations.

- **MIT License**

  - Simple and flexible, only requiring attribution.
  - _When to use_: Use this if you want your code to spread widely with no restrictions. It's the most popular on GitHub (44.69% of licensed projects).
  - License text: [MIT](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/mit.txt)

- **Apache License**

  - Includes patent protection and requires documenting changes.
  - _When to use_: Good for projects where you want to encourage adoption and protect against patent disputes.
  - License text: [Apache-2.0](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/apache-2.0.txt)

- **BSD Licenses (2-Clause and 3-Clause)**
  - Similar to MIT, with slight variations (e.g., 3-Clause adds a non-endorsement clause).
  - _When to use_: Choose this for simplicity and flexibility, especially if MIT feels too basic.
  - License text: [BSD-2-Clause](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/bsd-2-clause.txt), [BSD-3-Clause](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/bsd-3-clause.txt)

#### **Creative Commons Licenses**

Primarily for non-software works (e.g., docs, media), these mix-and-match terms like attribution (BY), share-alike (SA), no commercial use (NC), or no derivatives (ND).

- **CC0 (Public Domain Dedication)**

  - Waives all copyright claims.
  - _When to use_: Use if you want no restrictions, but note it lacks a warranty waiver.
  - License text: [CC0-1.0](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cc0-1.0.txt)

- **CC BY and CC BY-SA**
  - BY requires attribution; SA adds a copyleft-like requirement.
  - _When to use_: Great for documentation or datasets, not software (per Creative Commons' advice).
  - License text: [CC-BY-4.0](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cc-by-4.0.txt), [CC-BY-SA-4.0](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cc-by-sa-4.0.txt)

_Note_: NC and ND variants aren't open source because they limit use or modifications.

#### **Public Domain and Similar**

These aim to release code with no restrictions.

- **Unlicense**
  - Waives copyright but includes a warranty disclaimer.
  - _When to use_: Use this over raw public domain for liability protection.
  - License text: [Unlicense](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/unlicense.txt)

#### **Specialized Licenses**

For specific use cases like fonts or hardware:

- **SIL Open Font License (OFL)**

  - Keeps fonts open and usable.
  - _When to use_: Perfect for font projects.
  - License text: [OFL-1.1](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/ofl-1.1.txt)

- **CERN Open Hardware Licenses**
  - Covers hardware designs (permissive, weakly reciprocal, or strongly reciprocal).
  - _When to use_: Use for open hardware projects like furniture or electronics.
  - License text: [CERN-OHL-P-2.0](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cern-ohl-p-2.0.txt), [CERN-OHL-W-2.0](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cern-ohl-w-2.0.txt), [CERN-OHL-S-2.0](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cern-ohl-s-2.0.txt)

### When to Use Which License

Choosing a license depends on your project's goals and dependencies.

#### **Standalone Projects**

- **Copyleft (e.g., GPL, AGPL)**: Pick this if you want to enforce openness in all derivatives—ideal for ideological projects or tools you want to stay free.
- **Permissive (e.g., MIT, Apache)**: Go this route if you want maximum adoption, including in commercial products, with minimal rules.
- **Specialized (e.g., OFL, CERN)**: Use these for non-software works like fonts or hardware.

Check what similar projects use for inspiration. [ChooseALicense.com](https://choosealicense.com) can help narrow it down.

#### **Projects with Dependencies**

Your license must be compatible with the licenses of code you build on:

- **GPL-licensed dependencies**: You'll likely need to use GPL too due to its viral nature.
- **Mixed projects**: Use multiple licenses (e.g., MIT for code, CC BY-SA for docs), but clarify what applies where.

#### **Key Considerations**

- **Understand it**: Read the license. Changing it later is tough, especially with contributors, as you'd need everyone's permission.
- **Liability**: Most licenses (except raw public domain) limit your liability—don't skip this protection.

### How to Add a License

1. Pick a license from [ChooseALicense.com](https://choosealicense.com) or the list above.
2. Add a `LICENSE.txt` file with the full text to your project root.
3. Mention it in your README.
4. Optionally, add a license header to source files.

GitHub will detect it and display a summary.

### Final Thoughts

Open source licenses aren't just legal boilerplate—they shape how your project lives in the world. Whether you choose a restrictive copyleft license or a free-for-all permissive one, make sure it fits your vision. And don't forget: no license means no sharing.

## Overview: All 47 Open Source Licenses at a Glance

Before diving into the detailed descriptions, here's a comprehensive table of all 47 open source licenses from ChooseALicense.com, organized by category:

| License                     | Category        | Key Characteristics                             | Best For                                                |
| --------------------------- | --------------- | ----------------------------------------------- | ------------------------------------------------------- |
| **Permissive Licenses**     |                 |                                                 |                                                         |
| 0BSD                        | Permissive      | No attribution required, liability disclaimer   | Maximum reuse, no strings attached                      |
| AFL-3.0                     | Permissive      | Patent protection, notice preservation          | Academic/research projects                              |
| Apache-2.0                  | Permissive      | Patent grants, attribution required             | Commercial adoption, patent protection                  |
| Artistic-2.0                | Permissive      | Balanced permissions with modification rules    | Perl-related projects                                   |
| BlueOak-1.0.0               | Permissive      | Modern plain-language, patent/trademark clauses | Readable permissive licensing                           |
| BSD-2-Clause                | Permissive      | Attribution + non-endorsement clause            | Lightweight, widely compatible                          |
| BSD-2-Clause-Patent         | Permissive      | BSD-2 with explicit patent grant                | BSD simplicity + patent protection                      |
| BSD-3-Clause                | Permissive      | BSD-2 + additional non-endorsement clause       | Formal permissive licensing                             |
| BSD-3-Clause-Clear          | Permissive      | Clearer wording version of BSD-3                | Polished BSD variant                                    |
| BSD-4-Clause                | Permissive      | Original BSD with advertising clause            | Legacy projects (rarely used)                           |
| BSL-1.0                     | Permissive      | Concise, minimal restrictions                   | C++ libraries, minimal restrictions                     |
| ISC                         | Permissive      | Simplified BSD, networking focus                | Infrastructure projects                                 |
| MIT                         | Permissive      | Simple, only requires attribution               | Ultimate flexibility, web/JS projects                   |
| MIT-0                       | Permissive      | MIT without attribution requirement             | MIT simplicity, no credit needed                        |
| MS-PL                       | Permissive      | Patent clause, Microsoft ecosystem              | Microsoft projects with patent coverage                 |
| NCSA                        | Permissive      | BSD + MIT with patent grant                     | Academic software, copyright + patent                   |
| PostgreSQL                  | Permissive      | MIT-like, database focus                        | Database projects, PostgreSQL alignment                 |
| UPL-1.0                     | Permissive      | Explicit patent grant, Java focus               | Java libraries, patent-sensitive projects               |
| Zlib                        | Permissive      | Short with non-endorsement clause               | Small tools/libraries                                   |
| **Copyleft Licenses**       |                 |                                                 |                                                         |
| AGPL-3.0                    | Strong Copyleft | GPL + network clause, source sharing required   | Web apps, remote access scenarios                       |
| CECILL-2.1                  | Copyleft        | French copyleft, GPL-compatible                 | French projects, legal alignment                        |
| ECL-2.0                     | Copyleft        | Apache-based copyleft for education             | Academic projects enforcing openness                    |
| EPL-1.0                     | Copyleft        | Patent clauses, Eclipse ecosystem               | Eclipse-related work                                    |
| EPL-2.0                     | Copyleft        | Updated EPL, better GPL compatibility           | Modern Eclipse projects                                 |
| EUPL-1.1                    | Copyleft        | Multilingual, EU focus                          | EU-based projects                                       |
| EUPL-1.2                    | Copyleft        | Updated EUPL, improved compatibility            | Modern EU projects                                      |
| GFDL-1.3                    | Copyleft        | Documentation-specific, pairs with GPL          | Manuals/docs for GPL software                           |
| GPL-2.0                     | Strong Copyleft | Classic strong copyleft                         | Older projects, robust openness                         |
| GPL-3.0                     | Strong Copyleft | Modern GPL, patent + hardware protections       | New projects, strong copyleft                           |
| LGPL-2.1                    | Weak Copyleft   | Library-focused, allows proprietary linking     | Libraries in proprietary software                       |
| LGPL-3.0                    | Weak Copyleft   | Modern LGPL, GPL-3 compatible                   | Modern libraries, balanced approach                     |
| MPL-2.0                     | Weak Copyleft   | File-based copyleft, allows mixing              | Partial copyleft with flexibility                       |
| MS-RL                       | Copyleft        | Microsoft reciprocal license                    | Microsoft ecosystems, balanced copyleft                 |
| MulanPSL-2.0                | Weak Copyleft   | Permissive with weak copyleft, China focus      | Chinese market projects                                 |
| OSL-3.0                     | Copyleft        | Network use clause like AGPL                    | Network software, source disclosure                     |
| **Public Domain & Similar** |                 |                                                 |                                                         |
| CC0-1.0                     | Public Domain   | Waives all rights                               | Maximum freedom, some regions lack liability protection |
| Unlicense                   | Public Domain   | Public domain + warranty disclaimer             | Simple, legally safer public domain                     |
| WTFPL                       | Public Domain   | Ultra-permissive, no conditions                 | Bold freedom statement, limited legal weight            |
| **Specialized Licenses**    |                 |                                                 |                                                         |
| CC-BY-4.0                   | Specialized     | Attribution for non-software works              | Documentation, datasets, media                          |
| CC-BY-SA-4.0                | Specialized     | CC-BY + copyleft clause                         | Non-software with derivative openness                   |
| CERN-OHL-P-2.0              | Specialized     | Permissive hardware license                     | Hardware projects, broad use                            |
| CERN-OHL-S-2.0              | Specialized     | Strong copyleft for hardware                    | Hardware requiring full openness                        |
| CERN-OHL-W-2.0              | Specialized     | Weak copyleft for hardware                      | Hardware balancing openness/flexibility                 |
| LPPL-1.3c                   | Specialized     | LaTeX-specific with distribution rules          | LaTeX packages/documentation                            |
| ODbL-1.0                    | Specialized     | Database copyleft, share-alike required         | Open data projects                                      |
| OFL-1.1                     | Specialized     | Font-specific, allows embedding                 | Font projects                                           |
| Vim                         | Specialized     | Charityware encouraging donations               | Charity support (rare outside Vim)                      |

### **1. Permissive Licenses**

These licenses let others use your code freely, even in proprietary projects, usually just requiring attribution.

- **0BSD (BSD Zero Clause License)**

  - _Description_: A super-simple BSD variant with no attribution requirement—basically public domain with a liability disclaimer.
  - _When to Use_: Perfect if you want no strings attached, not even credit, for maximum reuse.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/0bsd.txt)

- **AFL-3.0 (Academic Free License v3.0)**

  - _Description_: Offers broad permissions with patent protection and a notice preservation clause.
  - _When to Use_: Great for academic or research projects needing patent clarity.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/afl-3.0.txt)

- **Apache-2.0 (Apache License 2.0)**

  - _Description_: A popular choice with patent grants and attribution requirements.
  - _When to Use_: Ideal for encouraging wide adoption, especially in commercial settings, with patent protection.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/apache-2.0.txt)

- **Artistic-2.0 (Artistic License 2.0)**

  - _Description_: Balances permissiveness with some rules on modifications; tied to the Perl community.
  - _When to Use_: Use for Perl-related projects or if you want a permissive license with a slight protective twist.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/artistic-2.0.txt)

- **BlueOak-1.0.0 (Blue Oak Model License 1.0.0)**

  - _Description_: A modern, plain-language permissive license with patent and trademark clauses.
  - _When to Use_: Pick this for readability and simplicity in permissive licensing.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/blueoak-1.0.0.txt)

- **BSD-2-Clause (BSD 2-Clause "Simplified" License)**

  - _Description_: A minimal permissive license requiring attribution and a non-endorsement clause.
  - _When to Use_: Go for this if you want a lightweight, widely compatible option like MIT.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/bsd-2-clause.txt)

- **BSD-2-Clause-Patent (BSD 2-Clause Plus Patent License)**

  - _Description_: BSD-2-Clause with an explicit patent grant.
  - _When to Use_: Use when you want BSD simplicity plus patent protection.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/bsd-2-clause-patent.txt)

- **BSD-3-Clause (BSD 3-Clause "New" License)**

  - _Description_: Adds a non-endorsement clause to BSD-2-Clause.
  - _When to Use_: A solid choice for permissive licensing with a bit more formality than MIT.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/bsd-3-clause.txt)

- **BSD-3-Clause-Clear (BSD 3-Clause Clear License)**

  - _Description_: A variant of BSD-3-Clause with clearer wording.
  - _When to Use_: Opt for this if you prefer a polished version of BSD-3-Clause.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/bsd-3-clause-clear.txt)

- **BSD-4-Clause (BSD 4-Clause "Original" License)**

  - _Description_: An older BSD license with an advertising clause.
  - _When to Use_: Rarely used now due to complexity; stick to newer BSD options unless required.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/bsd-4-clause.txt)

- **BSL-1.0 (Boost Software License 1.0)**

  - _Description_: A concise permissive license, popular for C++ libraries like Boost.
  - _When to Use_: Excellent for libraries or tools needing minimal restrictions.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/bsl-1.0.txt)

- **ISC (Internet Systems Consortium License)**

  - _Description_: A simplified BSD license, common in networking software.
  - _When to Use_: Use for infrastructure projects wanting a short, permissive license.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/isc.txt)

- **MIT (MIT License)**

  - _Description_: The go-to permissive license, requiring only attribution.
  - _When to Use_: Choose this for ultimate flexibility—perfect for web or JavaScript projects.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/mit.txt)

- **MIT-0 (MIT No Attribution License)**

  - _Description_: MIT without the attribution requirement.
  - _When to Use_: Use when you want MIT's simplicity but no credit needed.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/mit-0.txt)

- **MS-PL (Microsoft Public License)**

  - _Description_: Permissive with a patent clause, used in Microsoft projects.
  - _When to Use_: Good for Microsoft ecosystem projects needing patent coverage.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/ms-pl.txt)

- **NCSA (NCSA Open Source License)**

  - _Description_: Combines BSD and MIT with a patent grant.
  - _When to Use_: Ideal for academic software needing both copyright and patent protection.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/ncsa.txt)

- **PostgreSQL (PostgreSQL License)**

  - _Description_: A MIT-like license used by PostgreSQL.
  - _When to Use_: Use for database projects or to align with PostgreSQL's community.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/postgresql.txt)

- **UPL-1.0 (Universal Permissive License 1.0)**

  - _Description_: Permissive with an explicit patent grant, often for Java projects.
  - _When to Use_: Pick this for Java libraries or patent-sensitive projects.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/upl-1.0.txt)

- **Zlib (Zlib License)**
  - _Description_: A short permissive license with a non-endorsement clause.
  - _When to Use_: Great for small tools or libraries needing minimal obligations.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/zlib.txt)

---

### **2. Copyleft Licenses**

Copyleft licenses ensure derivatives stay open source, perfect for protecting project openness.

- **AGPL-3.0 (GNU Affero General Public License v3.0)**

  - _Description_: GPL with a network clause—source must be shared if accessed online.
  - _When to Use_: Use for web apps where you want all changes shared, even remotely.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/agpl-3.0.txt)

- **CECILL-2.1 (CeCILL License v2.1)**

  - _Description_: A French copyleft license, GPL-compatible.
  - _When to Use_: Choose for projects in France or needing French legal alignment.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cecill-2.1.txt)

- **ECL-2.0 (Educational Community License v2.0)**

  - _Description_: Apache-based copyleft for educational use.
  - _When to Use_: Good for academic projects wanting to enforce openness.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/ecl-2.0.txt)

- **EPL-1.0 (Eclipse Public License 1.0)**

  - _Description_: Copyleft with patent clauses, used by Eclipse projects.
  - _When to Use_: Use for Eclipse-related work or patent-sensitive projects.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/epl-1.0.txt)

- **EPL-2.0 (Eclipse Public License 2.0)**

  - _Description_: Updated EPL with better GPL compatibility.
  - _When to Use_: Pick this for newer Eclipse projects or GPL-friendly needs.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/epl-2.0.txt)

- **EUPL-1.1 (European Union Public License 1.1)**

  - _Description_: Multilingual copyleft for EU projects.
  - _When to Use_: Use for EU-based or multilingual projects needing copyleft.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/eupl-1.1.txt)

- **EUPL-1.2 (European Union Public License 1.2)**

  - _Description_: Updated EUPL with improved compatibility.
  - _When to Use_: Go for this in modern EU projects needing copyleft clarity.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/eupl-1.2.txt)

- **GFDL-1.3 (GNU Free Documentation License v1.3)**

  - _Description_: Copyleft for documentation, often paired with GPL.
  - _When to Use_: Use for manuals or docs tied to GPL software.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/gfdl-1.3.txt)

- **GPL-2.0 (GNU General Public License v2.0)**

  - _Description_: Strong copyleft requiring derivatives to stay open.
  - _When to Use_: Pick for older projects wanting robust openness guarantees.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/gpl-2.0.txt)

- **GPL-3.0 (GNU General Public License v3.0)**

  - _Description_: Updated GPL with patent and hardware protections.
  - _When to Use_: Use for new projects needing strong, modern copyleft.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/gpl-3.0.txt)

- **LGPL-2.1 (GNU Lesser General Public License v2.1)**

  - _Description_: Weaker copyleft allowing linking to proprietary code.
  - _When to Use_: Ideal for libraries used in proprietary software.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/lgpl-2.1.txt)

- **LGPL-3.0 (GNU Lesser General Public License v3.0)**

  - _Description_: Updated LGPL with GPL-3.0 compatibility.
  - _When to Use_: Use for modern libraries balancing openness and flexibility.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/lgpl-3.0.txt)

- **MPL-2.0 (Mozilla Public License 2.0)**

  - _Description_: File-based copyleft allowing proprietary mixing.
  - _When to Use_: Good for projects wanting partial copyleft with flexibility.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/mpl-2.0.txt)

- **MS-RL (Microsoft Reciprocal License)**

  - _Description_: Copyleft requiring same-license derivatives if original code is used.
  - _When to Use_: Use in Microsoft ecosystems needing balanced copyleft.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/ms-rl.txt)

- **MulanPSL-2.0 (Mulan Permissive Software License v2)**

  - _Description_: Permissive with weak copyleft, aimed at China's market.
  - _When to Use_: Choose for projects targeting China with some protection.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/mulanpsl-2.0.txt)

- **OSL-3.0 (Open Software License 3.0)**
  - _Description_: Copyleft with a network use clause like AGPL.
  - _When to Use_: Use for network software needing source disclosure.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/osl-3.0.txt)

---

### **3. Public Domain and Similar**

These waive most restrictions, aiming for maximum freedom.

- **CC0-1.0 (Creative Commons Zero v1.0 Universal)**

  - _Description_: A public domain dedication waiving all rights.
  - _When to Use_: Use to give up all control, but note no liability disclaimer in some regions.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cc0-1.0.txt)

- **Unlicense**

  - _Description_: Public domain dedication with a warranty disclaimer.
  - _When to Use_: Pick this for a simple, legally safer public domain option.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/unlicense.txt)

- **WTFPL (Do What The F\*ck You Want To Public License)**
  - _Description_: Ultra-permissive with no conditions or protections.
  - _When to Use_: Use for a bold freedom statement, but it lacks legal weight.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/wtfpl.txt)

---

### **4. Specialized Licenses**

Tailored for specific content like fonts, hardware, or documentation.

- **CC-BY-4.0 (Creative Commons Attribution 4.0)**

  - _Description_: Requires attribution for non-software works.
  - _When to Use_: Use for docs, datasets, or media needing credit.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cc-by-4.0.txt)

- **CC-BY-SA-4.0 (Creative Commons Attribution-ShareAlike 4.0)**

  - _Description_: CC-BY-4.0 with a copyleft clause.
  - _When to Use_: Pick for non-software where derivatives must stay open.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cc-by-sa-4.0.txt)

- **CERN-OHL-P-2.0 (CERN Open Hardware License v2.0 Permissive)**

  - _Description_: Permissive for hardware designs.
  - _When to Use_: Use for hardware projects wanting broad use.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cern-ohl-p-2.0.txt)

- **CERN-OHL-S-2.0 (CERN Open Hardware License v2.0 Strongly Reciprocal)**

  - _Description_: Strong copyleft for hardware.
  - _When to Use_: Choose for hardware needing full openness.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cern-ohl-s-2.0.txt)

- **CERN-OHL-W-2.0 (CERN Open Hardware License v2.0 Weakly Reciprocal)**

  - _Description_: Weak copyleft for hardware, allowing some proprietary use.
  - _When to Use_: Use for hardware balancing openness and flexibility.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/cern-ohl-w-2.0.txt)

- **LPPL-1.3c (LaTeX Project Public License v1.3c)**

  - _Description_: For LaTeX projects with distribution rules.
  - _When to Use_: Pick for LaTeX packages or docs in that ecosystem.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/lppl-1.3c.txt)

- **ODbL-1.0 (Open Database License v1.0)**

  - _Description_: Copyleft for databases, requiring share-alike.
  - _When to Use_: Use for open data projects needing derivative openness.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/odbl-1.0.txt)

- **OFL-1.1 (SIL Open Font License v1.1)**

  - _Description_: For fonts, allows embedding but not standalone sales.
  - _When to Use_: Choose for font projects keeping them open.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/ofl-1.1.txt)

- **Vim (Vim License)**
  - _Description_: Charityware encouraging donations, used by Vim.
  - _When to Use_: Use to support charity, though rare outside Vim.
  - [Full Text](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/vim.txt)

---

### **Choosing Your License**

With 47 options, here's how to narrow it down:

- **Permissive**: MIT, Apache-2.0, BSD-2-Clause for max adoption.
- **Copyleft**: GPL-3.0, AGPL-3.0, MPL-2.0 for openness enforcement.
- **Public Domain**: Unlicense or CC0-1.0 for no restrictions.
- **Specialized**: CC-BY-4.0, OFL-1.1, CERN-OHL for docs, fonts, or hardware.

## Sources

[A Developer's Guide to Open Source Software Licensing](https://github.com/readme/guides/open-source-licensing)  
[Open Source License Usage on GitHub.com](https://github.blog/open-source/open-source-license-usage-on-github-com)  
[List of Open Source Licenses](https://github.com/github/choosealicense.com/tree/gh-pages/_licenses)  
[Choose an Open Source License](https://choosealicense.com)
