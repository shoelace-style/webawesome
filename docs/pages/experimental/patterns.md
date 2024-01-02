---
meta:
  title: Patterns
  description: TBD
---

<!-- cSpell:dictionaries lorem-ipsum -->

# Patterns

## Full demos

- [Ecommerce: Product Page](/experimental/demo_patterns/ecommerce_product_page)
- [Blog: Listing Page](/experimental/demo_patterns/blog_listing)

## Sections

### Product Overview

```html:preview
<div class="wa:container wa:product-overview">
  <div class="wa:grid:1-2">
    <div class="wa:product-overview:hero">
      <img src="https://images.pexels.com/photos/1021386/pexels-photo-1021386.jpeg" alt="">
    </div>
    <div class="wa:product-overview:description wa:block-flow:2xl">
      <div class="wa:product-overview:summary wa:block-flow:s">
        <wa-badge>20% Off</wa-badge>
        <h1>Jupiter Moth Orchid</h1>
        <p class="wa:product-overview:price"><s>$35</s> $28</p>
        <div class="wa:product-overview:rating wa:inline-flow:s">
          <wa-rating label="average stars" readonly precision="0.1" value="4.7"></wa-rating>
          <a href="#product-reviews"><small>419 reviews</small></a>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div class="wa:product-overview:actions wa:inline-flow:s">
        <wa-input type="number" value="1" min="1" max="10" style="max-inline-size: 5rem;"></wa-input>
        <wa-button variant="brand">Add to cart</wa-button>
      </div>
      <div class="wa:product-overview:details wa:block-flow:s">
        <wa-details summary="Details">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </wa-details>
        <wa-details summary="Care instructions">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </wa-details>
      </div>
    </div>
  </div>
</div>
```

### Reviews

```html:preview
<div class="wa:container wa:product-reviews" id="product-reviews">
    <wa-tab-group>
      <wa-tab slot="nav" panel="reviews">Reviews</wa-tab>
      <wa-tab slot="nav" panel="questions">Questions</wa-tab>
      <wa-tab-panel name="reviews" style="margin-top:var(--wa-space-s);">
        <div class="wa:grid:aside-start">
          <div class="wa:product-reviews:overview wa:block-flow:2xl">
            <h2>Ratings and reviews</h2>
            <div class="wa:block-flow:s">
              <div class="wa:product-reviews:summary wa:inline-flow:s">
                <h3 class="wa:inline-flow:s">
                  4.7
                  <wa-rating label="average stars" readonly precision="0.1" value="4.7"></wa-rating>
                </h3>
                <small>Based on 419 reviews</small>
              </div>
              <div class="wa:product-reviews:breakdown">
                <ol>
                  <li class="wa:inline-flow:s">
                    <span>5</span>
                    <wa-icon name="star"></wa-icon>
                    <wa-progress-bar value="82"></wa-progress-bar>
                    <span>340</span>
                  </li>
                  <li class="wa:inline-flow:s">
                    <span>4</span>
                    <wa-icon name="star"></wa-icon>
                    <wa-progress-bar value="12"></wa-progress-bar>
                    <span>53</span>
                  </li>
                  <li class="wa:inline-flow:s">
                    <span>3</span>
                    <wa-icon name="star"></wa-icon>
                    <wa-progress-bar value="6"></wa-progress-bar>
                    <span>24</span>
                  </li>
                  <li class="wa:inline-flow:s">
                    <span>2</span>
                    <wa-icon name="star"></wa-icon>
                    <wa-progress-bar value="0"></wa-progress-bar>
                    <span>0</span>
                  </li>
                  <li class="wa:inline-flow:s">
                    <span>1</span>
                    <wa-icon name="star"></wa-icon>
                    <wa-progress-bar value="1"></wa-progress-bar>
                    <span>2</span>
                  </li>
                </ol>
              </div>
            </div>
            <wa-divider></wa-divider>
            <div class="wa:block-flow:s">
              <h3>Happy with your purchase?</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <wa-button outline size="small" style="width: 100%;">Write a review</wa-button>
            </div>
          </div>
          <div class="wa:product-reviews:list wa:block-flow:2xl">
            <div class="wa:product-reviews:review wa:block-flow:s">
              <div class="wa:inline-flow:s">
                <wa-avatar label="User avatar"></wa-avatar>
                <div class="wa:product-reviews:attribution">
                  <div class="wa:inline-flow:s">
                    <strong>Cory L.</strong> <wa-tag variant="success" size="small"><wa-icon name="check" style="margin-inline-end:var(--wa-space-2xs);"></wa-icon>Verified</wa-tag>
                  </div>
                  <small><wa-format-date month="long" day="numeric" year="numeric"></wa-format-date></small>
                </div>
              </div>
              <wa-rating label="Rating" readonly value="5"></wa-rating>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div class="wa:product-reviews:review wa:block-flow:s">
              <div class="wa:inline-flow:s">
                <wa-avatar label="User avatar"></wa-avatar>
                <div class="wa:product-reviews:attribution">
                  <div class="wa:inline-flow:s">
                    <strong>Konnor R.</strong> <wa-tag variant="success" size="small"><wa-icon name="check" style="margin-inline-end:var(--wa-space-2xs);"></wa-icon>Verified</wa-tag>
                  </div>
                  <small><wa-format-date date="2023-11-16T09:17:00-04:00" month="long" day="numeric" year="numeric"></wa-format-date></small>
                </div>
              </div>
              <wa-rating label="Rating" readonly value="4"></wa-rating>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div class="wa:product-reviews:review wa:block-flow:s">
              <div class="wa:inline-flow:s">
                <wa-avatar label="User avatar"></wa-avatar>
                <div class="wa:product-reviews:attribution">
                  <div class="wa:inline-flow:s">
                    <strong>Kelsey J.</strong> <wa-tag variant="success" size="small"><wa-icon name="check" style="margin-inline-end:var(--wa-space-2xs);"></wa-icon>Verified</wa-tag>
                  </div>
                  <small><wa-format-date date="2023-10-31T09:17:00-04:00" month="long" day="numeric" year="numeric"></wa-format-date></small>
                </div>
              </div>
              <wa-rating label="Rating" readonly value="5"></wa-rating>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div class="wa:product-reviews:review wa:block-flow:s">
              <div class="wa:inline-flow:s">
                <wa-avatar label="User avatar"></wa-avatar>
                <div class="wa:product-reviews:attribution">
                  <div class="wa:inline-flow:s">
                    <strong>Lindsay M.</strong>
                  </div>
                  <small><wa-format-date date="2023-07-03T09:17:00-04:00" month="long" day="numeric" year="numeric"></wa-format-date></small>
                </div>
              </div>
              <wa-rating label="Rating" readonly value="5"></wa-rating>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <wa-button outline size="small" style="width: 100%;">Load more reviews</wa-button>
          </div>
        </div>
      </wa-tab-panel>
      <wa-tab-panel name="questions">
        questions
      </wa-tab-panel>
    </wa-tab-group>
  </div>
```

### Similar Products

```html:preview
  <div class="wa:container wa:product-list-simple">
    <h2>You may also like</h2>
    <div class="wa:product-list-simple:items wa:grid:items-s wa:grid:min2">
      <wa-card>
        <img src="https://images.pexels.com/photos/4076594/pexels-photo-4076594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" slot="image">
        Triumph Tulip<br>
        <strong>$14</strong><br>
      </wa-card>
      <wa-card>
        <img src="https://images.pexels.com/photos/4994350/pexels-photo-4994350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" slot="image">
        White Doll's Daisy<br>
        <strong>$18</strong>
      </wa-card>
      <wa-card>
        <img src="https://images.pexels.com/photos/2223890/pexels-photo-2223890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" slot="image">
        Common Poppy<br>
        <strong>$32</strong>
      </wa-card>
      <wa-card>
        <img src="https://images.pexels.com/photos/1179026/pexels-photo-1179026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" slot="image">
        Stargazer Lily<br>
        <strong>$39</strong>
      </wa-card>
    </div>
  </div>
```
