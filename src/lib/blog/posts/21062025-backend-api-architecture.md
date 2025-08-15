---
title: 'Backend API Architecture'
description: "The Great API Debate: Richardson Maturity Model (REST) vs. GraphQL mess."
date: '2025-06-21'
categories:
  - api-design
  - comparison
published: true
author: 'Jonas Fröller'
readingTime: '7 min'
tags: ['backend', 'Richardson Maturity Model', 'REST', 'GraphQL']
---

<script>
  import AudioNativePlayer from '$lib/components/AudioNativePlayer.svelte';
</script>

# Backend API Architecture

<AudioNativePlayer />

## The Great API Debate: Richardson Maturity Model vs. GraphQL

In the ever-evolving landscape of web development, the way we design and build APIs is a topic of constant discussion. Two prominent names that often come up in these conversations are the REST and GraphQL. While they both aim to improve the way we interact with data, they approach the problem from fundamentally different perspectives. This post will dive into what each of these concepts entails, how they compare, and where they stand in the world of modern API development.

### Understanding the Richardson Maturity Model

The Richardson Maturity Model, conceived by Leonard Richardson, is a framework for grading APIs based on their adherence to the principles of REST (Representational State Transfer). It's not a technology itself, but rather a way to measure how "RESTful" an API is. The model consists of four levels, from 0 to 3, with each level building upon the previous one.

* **Level 0: The Swamp of POX (Plain Old XML)**: At this level, an API uses a single URI and a single HTTP method (typically POST) for all operations. This is essentially remote procedure calling (RPC) over HTTP.

* **Level 1: Resources**: This level introduces the concept of individual resources, each with its own URI. Instead of a single endpoint, you have multiple URIs to identify different resources (e.g., `/users`, `/products`).

* **Level 2: HTTP Verbs**: Here, the API starts to use different HTTP methods for different actions on resources, such as GET for retrieving data, POST for creating, and DELETE for removing. This aligns more closely with the intended use of the HTTP protocol.

* **Level 3: Hypermedia Controls (HATEOAS)**: The highest level of REST maturity, HATEOAS (Hypermedia as the Engine of Application State) means that the API responses include links and forms that guide the client on what actions they can take next. This allows clients to navigate the API dynamically without prior knowledge of all endpoints.

### Introducing GraphQL: A Query Language for APIs

Developed by Facebook and released in 2015, GraphQL is a query language for your API and a server-side runtime for executing those queries. It offers a more flexible and efficient alternative to traditional RESTful APIs. With GraphQL, the client specifies exactly what data it needs, and the server responds with only that data, preventing the common problems of over-fetching (receiving more data than needed) and under-fetching (needing to make multiple requests to get all the required data).

GraphQL APIs are organized around a schema that defines the types of data a client can request. This schema acts as a contract between the client and the server, ensuring that clients only ask for what's possible and providing clear errors if they don't. Unlike REST, which uses multiple endpoints, a GraphQL API typically exposes a single endpoint.

### The Clash of Philosophies: Richardson Maturity vs. GraphQL

When we compare the Richardson Maturity Model and GraphQL, it's not a direct, apples-to-apples comparison. The Richardson Maturity Model is a way to evaluate REST APIs, while GraphQL is a completely different architectural style. Most experts agree that a typical GraphQL API aligns with **Level 2** of the Richardson Maturity Model. It uses a single endpoint and the POST method for most operations, which doesn't fully embrace the resource-based, multi-endpoint approach of higher-level REST APIs.

Here's a breakdown of the key differences:

* **Endpoints**: The most significant difference is the number of endpoints. A RESTful API, as it moves up the Richardson Maturity Model, will have many endpoints, each representing a resource. A GraphQL API, on the other hand, has a single endpoint.

* **Data Fetching**: With a REST API, the server determines the structure of the response. In contrast, GraphQL empowers the client to request the specific data it needs, which can lead to more efficient data transfer.

* **HATEOAS**: A key component of a fully mature REST API (Level 3) is HATEOAS, which is absent in GraphQL. GraphQL's schema provides a similar "discoverability" feature, but it's a build-time contract rather than a runtime guide.

* **Protocol Agnostic**: The GraphQL specification itself is protocol-agnostic, meaning it doesn't dictate the use of HTTP. However, in practice, it is almost always implemented over HTTP.

### Can They Coexist?

While they represent different philosophies, the Richardson Maturity Model and GraphQL are not mutually exclusive. In fact, they can complement each other. For example, a GraphQL server can act as a gateway that sits in front of multiple RESTful microservices. This allows a client to use GraphQL's flexible querying capabilities while the underlying services adhere to REST principles.

### The Verdict: Which is Better?

The "better" approach depends on the specific needs of your application. The Richardson Maturity Model provides a clear path to building robust and scalable RESTful APIs that leverage the full power of the HTTP protocol. REST is a well-established standard with excellent support for caching and a deep integration with the web's infrastructure.

GraphQL, on the other hand, offers a more modern and flexible approach that can be particularly beneficial for complex applications with diverse data requirements, such as mobile apps. Its ability to fetch exactly the right data in a single request can lead to significant performance improvements.

Ultimately, the choice between a RESTful architecture and GraphQL is a trade-off. By understanding the principles behind the Richardson Maturity Model and the capabilities of GraphQL, developers can make an informed decision that best suits their project's goals.

<div id="research-sources">

## Sources

[GraphQL vs. REST in the real world](https://www.reddit.com/r/graphql/comments/144esgy/graphql_vs_rest_in_the_real_world)  
[You Might Not Need GraphQL](https://apisyouwonthate.com/blog/you-might-not-need-graphql)  
[The Fusion of GraphQL, REST, JSON-Schema and HTTP2](https://wundergraph.com/blog/the_fusion_of_graphql_rest_json_schema_and_http2)  
["GraphQL is good, but it's not an alternative to 'real' REST services"](https://devm.io/api/graphql-good-no-alternative-rest-services-142814-001)

</div>
