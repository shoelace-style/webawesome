---
meta:
  title: Patterns
  description: TODO
toc: false
---

<div class="wa:container wa:product-overview">
  <div class="wa:product-overview:breadcrumb">
    <wa-breadcrumb>
      <wa-breadcrumb-item>Plants</wa-breadcrumb-item>
      <wa-breadcrumb-item>Indoor Plants</wa-breadcrumb-item>
      <wa-breadcrumb-item>Orchids</wa-breadcrumb-item>
      <wa-breadcrumb-item>Jupiter Moth Orchid</wa-breadcrumb-item>
    </wa-breadcrumb>
  </div>
  <div class="wa:grid wa:grid:1-2">
    <div class="wa:product-overview:hero">
      <img src="https://images.pexels.com/photos/1021386/pexels-photo-1021386.jpeg" alt="">
    </div>
    <div class="wa:product-overview:description">
      <div class="wa:product-overview:summary">
        <wa-badge>20% Off</wa-badge>
        <h1>Jupiter Moth Orchid</h1>
        <p class="wa:product-overview:price"><s>$35</s> $28</p>
        <div class="wa:flex-align wa:product-overview:rating">
          <wa-rating label="Rating" readonly precision="0.1" value="4.7"></wa-rating>
          <a href="#product-reviews"><small>419 reviews</small></a>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div class="wa:flex-align wa:product-overview:actions">
        <wa-input type="number" value="1" min="1" max="10" style="max-width: 5rem;"></wa-input>
        <wa-button variant="brand">Add to cart</wa-button>
      </div>
      <div class="wa:product-overview:details">
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
<div class="wa:container wa:product-reviews" id="product-reviews">
  <wa-tab-group>
    <wa-tab slot="nav" panel="reviews">Reviews</wa-tab>
    <wa-tab slot="nav" panel="questions">Questions</wa-tab>
    <wa-tab-panel name="reviews">
      <div class="wa:grid wa:grid:1-2_thirds">
        <div class="wa:product-reviews:summary wa:flow-spacing:l">
          <h2>Ratings and reviews</h2>
          <div class="wa:product-reviews:overall wa:flex-align">
            <strong class="wa:product-reviews:average">4.7</strong>
            <wa-rating label="Rating" readonly precision="0.1" value="4.7"></wa-rating>
            <small>Based on 419 reviews</small>
          </div>
          <div class="wa:product-reviews:breakdown">
            <ol>
              <li class="wa:flex-align">
                <small>5</small>
                <wa-icon name="star-fill"></wa-icon>
                <wa-progress-bar value="82"></wa-progress-bar>
                <small>340</small>
              </li>
              <li class="wa:flex-align">
                <small>4</small>
                <wa-icon name="star-fill"></wa-icon>
                <wa-progress-bar value="12"></wa-progress-bar>
                <small>53</small>
              </li>
              <li class="wa:flex-align">
                <small>3</small>
                <wa-icon name="star-fill"></wa-icon>
                <wa-progress-bar value="6"></wa-progress-bar>
                <small>24</small>
              </li>
              <li class="wa:flex-align">
                <small>2</small>
                <wa-icon name="star-fill"></wa-icon>
                <wa-progress-bar value="0"></wa-progress-bar>
                <small>0</small>
              </li>
              <li class="wa:flex-align">
                <small>1</small>
                <wa-icon name="star-fill"></wa-icon>
                <wa-progress-bar value="1"></wa-progress-bar>
                <small>2</small>
              </li>
            </ol>
          </div>
          <wa-divider></wa-divider>
          <div>
            <h3>Like this product?</h3>
            <wa-button outline size="small" style="width: 100%;">Write a review</wa-button>
          </div>
        </div>
        <div class="wa:product-reviews:list wa:flow-spacing:2xl">
          <div class="wa:product-reviews:review wa:flow-spacing:s">
            <div class="wa:flex-align">
              <wa-avatar label="User avatar"></wa-avatar>
              <div class="wa:product-reviews:attribution">
                <div class="wa:flex-align">
                  <strong>Cory L.</strong> <wa-tag variant="success" size="small"><wa-icon name="check-lg" style="margin-right:var(--wa-space-2xs);"></wa-icon>Verified</wa-tag>
                </div>
                <small><wa-format-date month="long" day="numeric" year="numeric"></wa-format-date></small>
              </div>
            </div>
            <wa-rating label="Rating" readonly value="5"></wa-rating>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div class="wa:product-reviews:review wa:flow-spacing:s">
            <div class="wa:flex-align">
              <wa-avatar label="User avatar"></wa-avatar>
              <div class="wa:product-reviews:attribution">
                <div class="wa:flex-align">
                  <strong>Cory L.</strong> <wa-tag variant="success" size="small"><wa-icon name="check-lg" style="margin-right:var(--wa-space-2xs);"></wa-icon>Verified</wa-tag>
                </div>
                <small><wa-format-date month="long" day="numeric" year="numeric"></wa-format-date></small>
              </div>
            </div>
            <wa-rating label="Rating" readonly value="5"></wa-rating>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </div>
    </wa-tab-panel>
    <wa-tab-panel name="questions">
      questions
    </wa-tab-panel>
  </wa-tab-group>
</div>
<div class="wa:container wa:product-list-simple">
  <h2>You may also like</h2>
  <div class="wa:grid wa:grid:2-4">
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

<style>
  :root {
    --docs-content-max-width: 72rem;
  }

  .wa\:container {
    --wa-grid-gap: var(--wa-space-m);
    container-type: inline-size;

    @media (min-width: 32rem) {
      --wa-grid-gap: var(--wa-space-2xl);
    }

    & > * {
      margin-bottom: var(--wa-grid-gap);
    }
  }
  .wa\:grid {
    display: grid;
    gap: var(--wa-grid-gap);
  }
  .wa\:grid\:2-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  @container (width > 40rem) {
    .wa\:grid\:1-2,
    .wa\:grid\:1-2-4 {
      grid-template-columns: repeat(2, 1fr);
    }
    .wa\:grid\:2-4 {
      grid-template-columns: repeat(4, 1fr);
    }
    .wa\:grid\:1-2_thirds {
      grid-template-columns: 1fr 2fr;
    }
  }
  @container (width > 60rem) {
    .wa\:grid\:1-2-4 {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .wa\:flex-align {
    --wa-flex-gap: var(--wa-space-s);
    display: flex;
    align-items: center;
    gap: var(--wa-flex-gap);

    & > * {
      margin: 0;
    }
  }
  .wa\:flow-spacing\:2xl > * {
    margin-bottom: var(--wa-space-2xl);
  }
  .wa\:flow-spacing\:xl > * {
    margin-bottom: var(--wa-space-xl);
  }
  .wa\:flow-spacing\:l > * {
    margin-bottom: var(--wa-space-l);
  }
  .wa\:flow-spacing\:m > * {
    margin-bottom: var(--wa-space-m);
  }
  .wa\:flow-spacing\:s > * {
    margin-bottom: var(--wa-space-s);
  }

  .wa\:product-overview {
    & .wa\:product-overview\:hero {
      justify-self: center;

      & > * {
        border-radius: var(--wa-panel-corners);
        max-height: 66vh;
        position: sticky;
        top: var(--wa-grid-gap);
      }
    }
    & .wa\:product-overview\:description {
      & > * {
        margin-bottom: var(--wa-grid-gap);
      }

      & > * > * {
        margin-bottom: var(--wa-space-s);
        margin-top: 0;
      }
    }

    & .wa\:product-overview\:actions {
      & > * {
        flex: 1 1 auto;
      }
    }

    & .wa\:product-overview\:price {
      font-size: var(--wa-font-size-xl);
      font-weight: var(--wa-font-weight-medium);

      & s {
        color: var(--wa-color-text-quiet);
        font-weight: var(--wa-font-weight-light);
      }
    }

    & .wa\:product-overview\:rating {
      & > * {
        flex: 0 1 auto;
      }
    }
  }

  .wa\:product-reviews {
    & .wa\:product-reviews\:overall {
      & .wa\:product-reviews\:average {
        font-size: var(--wa-font-size-l);
      }

      & > * {
        flex: 0 1 auto;
      }
    }
    & .wa\:product-reviews\:breakdown {
      & ol {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      & wa-icon {
        color: var(--wa-color-yellow-70);
      }

      & :first-child {
        flex: 0 0 1ch;
      }

      & :last-child {
        flex: 0 0 3ch;
        text-align: right;
      }

      & wa-progress-bar {
        --height: var(--wa-font-size-s);
        --indicator-color: var(--wa-color-yellow-70);
        flex: 1 1 auto;
      }
    }

    & .wa\:product-reviews\:attribution {
      line-height: var(--wa-font-line-height-compact);
    }
  }

  .wa\:product-list-simple {
    & wa-card {
      --border-color: transparent;
      --box-shadow: none;
      --padding: var(--wa-space-s);

      &::part(base) {
        height: 100%;
      }

      & [slot="image"] {
        height: calc(50cqw - var(--wa-grid-gap));
        object-fit: cover;

        @container (width > 40rem) {
          height: calc(25cqw - var(--wa-grid-gap));
        }
      }
    }
  }
  </style>
