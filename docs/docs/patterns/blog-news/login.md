---
title: Login
description: 'Verifies the identity of a user and ensures that only authorized individuals can access specific content, features, or account data.'
parent: blog-news
tags: blog-news
---

## Login/ Sign Up
```html{.example}
<wa-card style="max-width: 45ch; margin: 0 auto">
    <div class="wa-stack">
        <h2 class="wa-heading-m">Agent Login</h2>
        <wa-input placeholder="email" type="email"></wa-input>
        <wa-input placeholder="password" type="password"></wa-input>
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
        <p>Don't have an account? <a href="#">Request Now</a>
    </div>
</wa-card>
```
## Password Recovery
```html{.example}
<wa-card style="max-width: 45ch; margin: 0 auto">
    <div class="wa-stack wa-gap-l">
        <h2 class="wa-heading-m">Password Recovery</h2>
        <wa-radio-group
            label="Choose your recovery method"
            orientation="horizontal"
            name="recovery-method"
            value="crypto-keys"
        >
            <wa-radio-button value="qr-code">QR Code</wa-radio-button>
            <wa-radio-button value="crypto-keys">Crypto Keys</wa-radio-button>
        </wa-radio-group>
        <p class="wa-caption-m">Store your keys in a password manager to back them up in case you need to restore your account.</p>
        <div class="wa-stack">
            <wa-input label="Public Key" value="dsjfaklsjfkwejrl4wj5646uotue789f7ew8rtuewfsd" disabled></wa-input>
            <wa-input label="Secret Key" value="dfkdfkdfdsofkdsofjs" disabled></wa-input>
        </div>
        <wa-button>Submit</wa-button>
        <wa-button appearance="outlined">Or try to login again</wa-button>
    </div>
</wa-card>
```
## Two Factor Authentication
```html{.example}
<wa-card style="max-width: 45ch; margin: 0 auto">
    <div class="wa-stack wa-gap-l wa-align-items-center">
        <h2 class="wa-heading-m">Set up using an Authenticator app</h2>
         <p class="wa-caption-m">Use an authenticator app to get the authentication codes</p>
        <wa-qr-code value="https://shoelace.style/" label="Scan this code to visit Web Awesome on the web!"></wa-qr-code>
        <p class="wa-caption-m">If you can't scan the QR Code above, enter this text instead</p>
        <wa-input value="dsjfaklsjfkwejrl4wj5646uotue789f7ew8rtuewfsd" disabled></wa-input>
        <h3 class="wa-heading-s">Set up using an Authenticator app</h3>
        <p class="wa-caption-m">After scanning the QR Code image, the app will display a code that you can enter.</p>
        <span class="wa-heading-3xl">123466</span>
    </div>
</wa-card>
```