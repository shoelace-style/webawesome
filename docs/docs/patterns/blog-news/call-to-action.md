---
title: Call To Action
description: 'Solicits a user to take action.'
parent: blog-news
tags: blog-news
---

## Simple
```html {.example}
<div style="margin-block: 5rem;">
    <h2 style="font-size: 3rem;">Unlock Your Future: <br/>Start Learning Web Development Today!</h2>
    <div class="wa-cluster wa-gap-xs">
        <wa-button>Get Started</wa-button>
        <wa-button appearance="plain">Find out more <wa-icon slot="suffix" name="arrow-right"></wa-icon></wa-button>
    </div>
</div>
```

## Centered
```html {.example}
<div class="wa-stack wa-align-items-center wa-gap-xl" style="margin-block: 5rem;">
    <h2 style="font-size: 3rem; text-align: center">Unlock Your Future: <br/>Start Learning Web Development Today!</h2>
    <div class="wa-cluster wa-gap-xs">
        <wa-button>Get Started</wa-button>
        <wa-button appearance="plain">Find out more <wa-icon slot="suffix" name="arrow-right"></wa-icon></wa-button>
    </div>
</div>
```

## 2 Column
```html {.example}
<div style="margin-block: 5rem;">
    <div class="wa-grid wa-align-items-center">
        <div  class="wa-stack wa-align-items-center wa-gap-3xl">
            <h2 style="font-size: 3rem; text-align: center">Unlock Your Future: <br/>Start Learning Web Development Today!</h2>
            <div class="wa-cluster wa-gap-xs">
                <wa-button>Get Started</wa-button>
                <wa-button appearance="plain">Find out more <wa-icon slot="suffix" name="arrow-right"></wa-icon></wa-button>
            </div>
        </div>
        <div class="wa-frame wa-border-radius-l">
            <img src="https://images.unsplash.com/photo-1586864387634-2f33030dab41?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
         </div>
    </div>
    
</div>
```