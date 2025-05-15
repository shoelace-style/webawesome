---
title: Sign Up & Login
description: 'Verify the identity of a user and ensures that only authorized individuals can access specific content, features, or account data.'
parent: blog-news
tags: blog-news
---

## Sign Up

```html {.example}
<wa-card style="max-width: 45ch; margin: 0 auto">
  <div class="wa-stack">
    <h2 class="wa-heading-m">Sign up with Email</h2>
    <p>Let's get your account started. Enter your email below.</p>
    <wa-input label="Email" type="email"></wa-input>
    <wa-button>Continue</wa-button>
    <p class="wa-caption-s">By clicking continue, you agree to our <a href="#">Terms of Service</a></p>
  </div>
</wa-card>
```

## Login

```html {.example}
<wa-card style="max-width: 45ch; margin: 0 auto">
  <div class="wa-stack">
    <h2 class="wa-heading-m">Login</h2>
    <wa-input label="Email" type="email"></wa-input>
    <wa-input label="Password" type="password"></wa-input>
    <a href="#">Having trouble signing in?</a>
    <wa-button>Sign in</wa-button>
  </div>
</wa-card>
```

## With Third Party Login

```html {.example}
<wa-card style="max-width: 45ch; margin: 0 auto">
  <div class="wa-stack">
    <h2 class="wa-heading-m">Login</h2>
    <wa-input label="Email" type="email"></wa-input>
    <wa-input label="Password" type="password"></wa-input>
    <a href="#">Having trouble signing in?</a>
    <wa-button>Sign in</wa-button>
    <wa-divider></wa-divider>
    <p>Or sign in with:</p>
    <div class="wa-grid" style="--min-column-size: 12ch;">
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="google" family="brands"></wa-icon>
        Google
      </wa-button>
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="apple" family="brands"></wa-icon>
        Apple ID
      </wa-button>
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="facebook" family="brands"></wa-icon>
        Facebook
      </wa-button>
    </div>
    <p>Don't have an account? <a href="#">Create one</a></p>
  </div>
</wa-card>
```
