---
title: 'Pause Vercel Deployment'
description: "5 different methods to pause your Vercel deployment. From firewall rules to REST API endpoints."
date: '2025-06-09'
categories:
  - web-development
  - devops
published: true
author: 'Jonas Fröller'
readingTime: '5 min'
tags: ['hosting', 'vercel']
---

# How to "Pause" Your Vercel Deployment

Ever found yourself in a situation where you need to temporarily pause your Vercel deployment? Maybe you're testing another hosting provider, or perhaps the Pro plan pricing doesn't fit your current budget. Whatever the reason, you've probably discovered that Vercel doesn't have a simple "pause" button in their dashboard.

Here's the thing: pausing deployments used to be nearly impossible. Back in the day, your only option was to delete the entire project- which was obviously not ideal. Fortunately, Vercel has evolved, and now there are several ways to achieve this.

## Method 1: Delete the Project<br>(The Old School Way)

Back in Vercel's early days, this was the only option available. Despite extensive searching, no alternatives existed. You'd simply go to **Project > Settings > Delete Project** and... well, delete everything. Not great, but it worked. Thankfully, we have better options now.

![delete-vercel-project](/blog/09062025-pause-vercel-deployment/delete-vercel-project.png)

## Method 2: Branch Switching for Maintenance Mode

This approach involves redirecting your production domain to a maintenance branch:

1. Create a new Git branch with a simple "maintenance mode" page
2. Go to **Project > Settings > Domains > Your Domain > Connect to environment > Preview > Branch**
3. Select your maintenance branch

While functional, this method is slow and becomes annoying if you have multiple domains connected to your project.

## Method 3: REST API - The Official Way

Vercel actually provides official API endpoints for pausing projects. Here's how to use them:

```ts
import { Vercel } from "@vercel/sdk";

// https://vercel.com/account/settings/tokens
// https://vercel.com/docs/rest-api/reference#introduction/api-basics/authentication
const vercel = new Vercel({
  bearerToken: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  await vercel.projects.pauseProject({
    projectId: "<id>",
    teamId: "<team_1a2b3c4d5e6f7g8h9i0j1k2l>",
    slug: "<my-team-url-slug>",
  });
}

run();
```

The endpoints are:
- Pause: `https://api.vercel.com/v1/projects/{projectId}/pause`
- Unpause: `https://api.vercel.com/v1/projects/{projectId}/unpause`

### Webhook Implementation

You can create a webhook endpoint to pause your project programmatically:

```ts
// https://vercel.com/guides/pause-your-project
export async function POST(request: Request) {
  let projectId = '<your_project_id>';
  let teamID = '<your_team_id>';
  let route = `${projectId}/pause?teamID=${teamID}`;
 
  await fetch(`https://api.vercel.com/v1/projects/${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    },
  });
 
  return new Response('Project paused', { status: 200 });
}
```

## Method 4: Environment Variable Toggle

You could set up an environment variable that triggers a maintenance component. However, this requires redeployment every time you want to toggle it, making it impractical for quick pausing.  
It also doesn't prevent you from spending more money, if you happen to be under DDoS attack.

## Method 5: Firewall Rules (My Personal <span class="text-accent">Favorite</span>)

![delete-vercel-project](/blog/09062025-pause-vercel-deployment/vercel-custom-firewall-rules.png)

This is hands-down the most convenient method since it can be done directly from the dashboard. It's really puzzling to me that Vercel hasn't implemented their own pause API endpoint in the dashboard after all this time.

Here's how to set it up:

1. Navigate to **Project > Firewall > Configure**
2. Create a new rule and name it "PAUSE" (or whatever you prefer)
3. Set the condition: **If "Request Path" "Contains" "/" Then "Deny"**
4. Save and deploy the firewall rule

![delete-vercel-project](/blog/09062025-pause-vercel-deployment/vercel-custom-firewall-pause-rule.png)

This rule will block all requests, including the root path, and return a "403 Forbidden" status with a clean error page.

![delete-vercel-project](/blog/09062025-pause-vercel-deployment/vercel-403-forbidden.png)

## Bonus: Password Protection (<span class="text-brand">Pro</span> Plan Only)

If you're on the Pro plan, you can also use deployment protection:

Go to **Project > Settings > Deployment Protection** and set a password. While this doesn't technically "pause" the deployment, it requires authentication to access it- which is actually the approach [Lee Robinson](https://x.com/leerob) recommended in a 2022 Stack Overflow post. (see [post](https://stackoverflow.com/a/71316906/17421351))

## The Bottom Line

While Vercel has come a long way from the "delete the project" days, it's still surprising that such a basic feature isn't prominently available in the dashboard. The firewall method remains my go-to solution for its simplicity and immediate effect.

Choose the method that best fits your workflow and technical comfort level.

*Read more about paused deployments here: `DEPLOYMENT_PAUSED` [error code](https://vercel.com/docs/errors/DEPLOYMENT_PAUSED)*
