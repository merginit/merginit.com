---
title: "TOON: Efficient Data Format for LLMs"
description: 'TOON is a compact, token-efficient alternative to JSON for LLM prompts, reducing tokens by 30-60% while maintaining readability and structure.'
date: '2025-11-16'
categories:
  - ai-ml
  - developer-tools
  - comparison
published: true
author: 'Jonas Fröller'
readingTime: '2 min'
tags: ['TOON', 'JSON', 'Serialization', 'LLM Prompts', 'AI Efficiency']
---

# TOON: Efficient Data Format for LLMs

TOON (Token-Oriented Object Notation) is a compact, human-readable serialization of JSON for LLM prompts. It minimizes tokens while maintaining structure.

## Key Features

- 30-60% fewer tokens than JSON for uniform arrays.
- Explicit lengths and fields for LLM validation.
- Indentation-based, no braces/brackets.
- Tabular arrays: Headers once, rows as data.
- Optional dotted paths for nested keys.

## Syntax Basics

- Objects: `key: value` (indented nesting).
- Arrays: `[N]` for length, `{fields}` for headers.
- Values: Unquoted unless needed.
- Example:
```
users[2]{id,name,role}: 1,Alice,admin
2,Bob,user
```

## Comparisons

- **JSON**: Verbose; TOON saves 30-60% tokens on arrays.
- **YAML**: Less efficient than TOON for tabular data.
- **XML**: Far more verbose.
- **Protobuf**: Binary, not human-readable; TOON is text-based.
- **CSV**: Compact for flat tables but unstructured; TOON adds 5-10% overhead for reliability.

> TOON excels in AI workflows by reducing costs and errors.

## Sources

[toon-format](https://raw.githubusercontent.com/toon-format/toon/refs/heads/main/README.md)
