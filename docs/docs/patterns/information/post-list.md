---
title: Post List
description: ''
parent: information
tags: information
---

## Text Based
```html {.example}
<div class="wa-stack wa-gap-2xl" style="max-width: 60ch; margin: 0 auto;">
    <div class="wa-split">
        <h2 class="wa-heading-l">Trending Articles</h2>
        <span class="wa-cluster">
            <wa-icon name="search"></wa-icon>
            <a href="#">See all</a>
        </span>
    </div>
    <article class="wa-stack wa-gap-s">
        <section class="wa-stack wa-gap-xs">
            <h3 class="wa-heading-m"><a href="#" style="text-decoration: none;">Worst Idioms</a></h3>
            <em class="wa-caption-m">by <strong><a href="#">Paisley Darts</a></strong> | 4 min</em>
        </section>
        <p>"You can't have your cake and eat it too"... This on needs to be buried in a shallow grave.</p>
        <a href="#" class="wa-cluster wa-gap-2xs"><span>Read More</span><wa-icon name="angle-right"></wa-icon></a>
        <wa-divider></wa-divider>
    </article>
    <article class="wa-stack wa-gap-s">
        <section class="wa-stack wa-gap-xs">
            <h3 class="wa-heading-m"><a href="#" style="text-decoration: none;">Boost Your Productivity with These 5 Simple Habits</a></h3>
            <em class="wa-caption-m">by <strong><a href="#">Michael Sur</a></strong> | 3 min</em>
        </section>
        <p>Small changes, big results—master the art of productivity in your daily routine.</p>
        <a href="#" class="wa-cluster wa-gap-2xs"><span>Read More</span><wa-icon name="angle-right"></wa-icon></a>
        <wa-divider></wa-divider>
    </article>
    <article class="wa-stack wa-gap-s">
        <section class="wa-stack wa-gap-xs">
            <h3 class="wa-heading-m"><a href="#" style="text-decoration: none;">Why Sustainable Fashion Is the Future of the Industry</a></h3>
            <em class="wa-caption-m">by <strong><a href="#">Stacy Magnolia</a></strong> | 7 min</em>
        </section>
        <p>From eco-friendly materials to ethical brands, sustainability is shaping the way we dress.</p>
        <a href="#" class="wa-cluster wa-gap-2xs"><span>Read More</span><wa-icon name="angle-right"></wa-icon></a>
        <wa-divider></wa-divider>
    </article>
</div>
```
## Single Column with Images
```html {.example}
<div class="wa-stack" style="max-width: 78ch; margin: 0 auto;">
    <div>
        <article class="wa-flank:end wa-align-items-center">
            <div class="wa-stack wa-gap-xs">
                <h3 class="wa-heading-m">Worst Idioms</h3>
                <p class="wa-caption-l">"You can't have your cake and eat it too"... This on needs to be buried in a shallow grave.</p>
            </div>
            <div class="wa-frame wa-border-radius-m" style="width: 10ch;">
                <img src="https://images.unsplash.com/photo-1720170060678-7c30a36937cd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
        </article>
        <wa-divider></wa-divider>
        <article class="wa-flank:end wa-align-items-center">
            <div class="wa-stack wa-gap-xs">
                <h3 class="wa-heading-m">Boost Your Productivity with These 5 Simple Habits</h3>
                <p class="wa-caption-l">"You can't have your cake and eat it too"... This on needs to be buried in a shallow grave.</p>
            </div>
            <div class="wa-frame wa-border-radius-m" style="width: 10ch;">
                <img src="https://images.unsplash.com/photo-1507099985932-87a4520ed1d5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
        </article>
        <wa-divider></wa-divider>
        <article class="wa-flank:end wa-align-items-center">
            <div class="wa-stack wa-gap-xs">
                <h3 class="wa-heading-m">Sustainable Fashion Is the Future of the Industry</h3>
                <p class="wa-caption-l">"You can't have your cake and eat it too"... This on needs to be buried in a shallow grave.</p>
            </div>
            <div class="wa-frame wa-border-radius-m" style="width: 10ch;">
                <img src="https://images.unsplash.com/photo-1631775512414-160ae648c209?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
        </article>
        <wa-divider></wa-divider>
        <article class="wa-flank:end wa-align-items-center">
            <div class="wa-stack wa-gap-xs">
                <h3 class="wa-heading-m">The Power of Mindfulness</h3>
                <p class="wa-caption-l">"You can't have your cake and eat it too"... This on needs to be buried in a shallow grave.</p>
            </div>
            <div class="wa-frame wa-border-radius-m" style="width: 10ch;">
                <img src="https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
        </article>
        <wa-divider></wa-divider>
    </div>
</div>
```
## With Image Card
```html {.example}
<div class="wa-stack wa-align-items-center" style="max-width: 105ch; margin: 0 auto;">
    <h2 class="wa-heading-l">Recent Articles</h2>
    <wa-input placeholder="Search Articles">
        <wa-icon name="search" slot="suffix"></wa-icon>
    </wa-input>
    <div class="wa-grid" style="--min-column-size: 40ch;">
    <a href="#" style="text-decoration: none;">
        <wa-card with-image>
            <img slot="image" src="https://images.unsplash.com/photo-1720170060678-7c30a36937cd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
            <div class="wa-stack">
                <h2 class="wa-heading-m">Worst Idioms</h2>
                <p class="wa-caption-l">"You can't have your cake and eat it too"... This on needs to be buried in a shallow grave.</p>
                <div>
                    <span class="wa-heading-s">Paisley Darts</span> • <span>March 12th 2023</span>
                </div>
            </div>
        </wa-card>
    </a>
     <a href="#" style="text-decoration: none;">
        <wa-card with-image>
            <img slot="image" src="https://images.unsplash.com/photo-1507099985932-87a4520ed1d5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
            <div class="wa-stack">
                <h2 class="wa-heading-m">Boost Your Productivity with These 5 Simple Habits</h2>
                <p class="wa-caption-l">Small changes, big results—master the art of productivity in your daily routine.</p>
                <div>
                    <span class="wa-heading-s">Michael Sur</span> • <span>March 13th 2023</span>
                </div>
            </div>
        </wa-card>
    </a>
     <a href="#" style="text-decoration: none;">
        <wa-card with-image>
            <img slot="image" src="https://images.unsplash.com/photo-1631775512414-160ae648c209?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
            <div class="wa-stack">
                <h2 class="wa-heading-m">Sustainable Fashion Is the Future of the Industry</h2>
                <p class="wa-caption-l">From eco-friendly materials to ethical brands, sustainability is shaping the way we dress.</p>
                <div>
                    <span class="wa-heading-s">Stacy Magnolia</span> • <span>March 14th 2023</span>
                </div>
            </div>
        </wa-card>
    </a>
     <a href="#" style="text-decoration: none;">
        <wa-card with-image>
            <img slot="image" src="https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
            <div class="wa-stack">
                <h2 class="wa-heading-m">The Power of Mindfulness</h2>
                <p class="wa-caption-l">Discover how being present in the moment can lead to lasting mental well being.</p>
                <div>
                    <span class="wa-heading-s">Desean Ivy</span> • <span>March 15th 2023</span>
                </div>
            </div>
        </wa-card>
    </a>
    </div>
    <a href="#" style="text-align: center;">See All</a>
</div>
```