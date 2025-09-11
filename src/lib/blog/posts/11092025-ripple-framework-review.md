---
title: "Ripple Framework Review: New TypeScript UI Library with Native Control Flow"
description: "Hands-on review of Ripple, Dominic Gannaway's new TypeScript UI framework featuring reactive state management, native JavaScript control flow, and component-based architecture from React/Svelte maintainer."
date: '2025-09-11'
categories:
  - web-development
  - developer-tools
published: true
author: 'Jonas Fröller'
readingTime: '4 min'
tags: ['typescript', 'frontend', 'ui-framework', 'reactivity', 'ripple']
---

<script lang="ts">
  import LinkPreviewCard from '$lib/components/LinkPreviewCard.svelte';
  import InfoBox from '$lib/components/InfoBox.svelte';
</script>

# Ripple: TypeScript UI Framework Analysis

<InfoBox title="Caution" variant="warning" className="my-6">
	"Right now, there will be plenty of bugs, things just won't work either and you'll find TODOs everywhere. At this stage, Ripple is more of an early alpha version of something that might be, rather than something you should try and adopt. If anything, maybe some of the ideas can be shared and incubated back into other frameworks. There's also a lot of similarities with Svelte 5, and that's not by accident, that's because of my recent time working on Svelte 5."
</InfoBox>

Ripple is a TypeScript UI framework created by Dominic Gannaway that attempts to synthesize concepts from React, Solid, and Svelte. The framework positions itself as TypeScript-first with built-in reactivity, component-based architecture, and native control flow in templates.

## Architecture Overview

The framework introduces several key concepts that differentiate it from existing solutions. Rather than function or class components, Ripple uses a `component` keyword for defining reusable UI elements. The TypeScript integration is comprehensive, including full type checking and VSCode support with diagnostics and IntelliSense.

## Reactive State Management

The framework implements reactivity through `$` prefixed variables and object properties. This approach mirrors Svelte's reactivity model while extending it to object properties for more complex state scenarios.

```jsx
let $count = 0;
let $user = { name: 'John', age: 30 };

// Both variables and object properties are reactive
$count++; // triggers re-render
$user.age = 31; // also triggers re-render
```

## Component Definition and Props

Components are defined using the `component` keyword with TypeScript interfaces for props. The syntax supports both traditional props and shorthand notation:

```jsx
export component Button(props: { text: string, onClick: () => void }) {
  <button onClick={props.onClick}>
    {props.text}
  </button>
}
```

## Native Control Flow

Ripple allows standard JavaScript control flow (`if`, `for`, `try`) directly in templates without special syntax or helper functions:

```jsx
export component TodoList({ todos }: Props) {
  <ul>
    for (const todo of todos) { // no "key" needed!
      <li>{todo.text}</li>
    }
  </ul>

  if (todos.length === 0) {
    <p>No todos available</p>
  }
}

```

This eliminates the need for array methods like `map()` or special directives like `v-for` or `#each`.

## Scoped Styling and Tooling

Components support scoped CSS through `<style>` elements. The framework includes Prettier support for `.ripple` modules and provides comprehensive VSCode integration with diagnostics and IntelliSense.

```jsx
export component Card({ title, content }: Props) {
  <div class="card">
    <h3>{title}</h3>
    <p>{content}</p>
  </div>

  <style>
    .card {
      border: 1px solid #ccc;
      padding: 1rem;
      border-radius: 4px;
    }
  </style>
}
```

## Performance Considerations

The framework claims fine-grain rendering with optimized performance and memory usage. The reactive system updates only affected DOM elements rather than re-rendering entire component trees.

## Technical Assessment

Ripple combines familiar concepts from established frameworks while introducing native JavaScript control flow in templates. The `$` prefix reactivity system provides clear state management semantics. TypeScript integration appears comprehensive with full type checking support.

> The framework is currently in early development stages. Production readiness and ecosystem maturity remain to be evaluated as the project evolves.

## Full Implementation Example

<LinkPreviewCard url="https://www.ripplejs.com/playground" />

```jsx
import { Button } from './Button.ripple';

export component TodoList({ todos, addTodo }: Props) {
  <div class="container">
    <h2>{'Todo List'}</h2>
    <ul>
      for (const todo of todos) {
        <li>{todo.text}</li>
      }
    </ul>

    if (todos.length > 0) {
      <p>{todos.length} {"items"}</p>
    }

    <Button onClick={addTodo} label={"Add Todo"} />
  </div>

  <style>
    .container {
      text-align: center;
      font-family: "Arial", sans-serif;
    }
  </style>
}

export component Counter() {
  let $count = 0;
  let $doubled = $count * 2;

  <div class='counter'>
    <h2>{'Counter'}</h2>
    <p>{`Count: ${$count}`}</p>
    <p>{`Doubled: ${$doubled}`}</p>
    
    <Button onClick={() => $count++} label={'Increment'} />
    <Button onClick={() => $count = 0} label={'Reset'} /> 
  </div>
}
```

## Sources

[Ripple GitHub Repository](https://github.com/trueadm/ripple)  
[Dominic Gannaway on X](https://x.com/trueadm)
