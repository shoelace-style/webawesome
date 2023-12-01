---
meta:
  title: Patterns
  description: TODO
toc: false
---

<div class="wa:container">
  <div class="wa:product-overview">
    <div class="wa:product-overview:breadcrumb">
      <wa-breadcrumb>
        <wa-breadcrumb-item>Plants</wa-breadcrumb-item>
        <wa-breadcrumb-item>Indoor Plants</wa-breadcrumb-item>
        <wa-breadcrumb-item>Orchids</wa-breadcrumb-item>
        <wa-breadcrumb-item>Jupiter Moth Orchid</wa-breadcrumb-item>
      </wa-breadcrumb>
    </div>
    <div class="wa:product-overview:hero">
      <img src="https://images.pexels.com/photos/1021386/pexels-photo-1021386.jpeg" alt="" style="position:sticky; top:var(--wa-space-2xl);border-radius:var(--wa-panel-corners);">
    </div>
    <div class="wa:product-overview:description">
      <div class="wa:product-overview:summary">
        <wa-badge>20% Off</wa-badge>
        <h1>Jupiter Moth Orchid</h1>
        <p class="wa:product-overview:price"><s>$35</s> $28</p>
        <div class="wa:product-overview:rating">
          <wa-rating label="Rating" readonly precision="0.1" value="4.7"></wa-rating>
          <a href="#"><small>419 reviews</small></a>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div class="wa:product-overview:actions">
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
<div class="wa:container">
  <div class="wa:product-list-simple">
    <h2>You may also like</h2>
    <div class="wa:product-list-simple:items">
      <wa-card>
        <img src="https://images.pexels.com/photos/4076594/pexels-photo-4076594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" slot="image">
        Triumph Tulips<br>
        <strong>$20</strong><br>
      </wa-card>
      <wa-card>
        <img src="https://images.pexels.com/photos/4994350/pexels-photo-4994350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" slot="image">
        White Doll's Daisy<br>
        <strong>$20</strong>
      </wa-card>
      <wa-card>
        <img src="https://images.pexels.com/photos/2223890/pexels-photo-2223890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" slot="image">
        Authentic Fireflowers<br>
        <strong>$20</strong>
      </wa-card>
      <wa-card>
        <img src="https://images.pexels.com/photos/1179026/pexels-photo-1179026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" slot="image">
        Stargazer Lily<br>
        <strong>$20</strong>
      </wa-card>
    </div>
  </div>
</div>

<style>
  .wa\:container {
    container-type: inline-size;
  }

  .wa\:product-overview {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, auto);
    grid-template-areas: 
      'breadcrumb'
      'hero'
      'description';
    gap: var(--wa-space-2xl);
    margin-bottom: var(--wa-space-2xl);

    & .wa\:product-overview\:breadcrumb {
      grid-area: breadcrumb;
    }

    & .wa\:product-overview\:hero {
      grid-area: hero;
    }

    & .wa\:product-overview\:description {
      grid-area: description;

      & > * {
        display: block;
        margin-bottom: var(--wa-space-2xl);
      }

      & > * > * {
        margin-bottom: var(--wa-space-s);
        margin-top: 0;
      }
    }

    & .wa\:product-overview\:actions {
      display: flex;
      align-items: center;
      gap: var(--wa-space-s);

      & > * {
        flex: 1 1 auto;
        margin: 0;
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
      display: flex;
      align-items: center;
      gap: var(--wa-space-s);

      & > * {
        flex: 0 1 auto;
        margin: 0;
      }
    }

    & .wa\:product-overview\:reviews {
      grid-area: reviews;
    }
  }
    @container (width > 40rem) {
      .wa\:product-overview {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, auto);
        grid-template-areas: 
          'breadcrumb breadcrumb'
          'hero description';
      }
  }
    @container (width > 60rem) {
    .wa\:product-overview {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, auto);
      grid-template-areas: 
        'breadcrumb breadcrumb breadcrumb'
        'hero hero description';
    }
  }

  .wa\:product-list-simple\:items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--wa-space-2xl);

    & wa-card::part(base) {
      height: 100%;
    }

    & wa-card [slot="image"] {
      height: 50cqw;
      object-fit: cover;
    }
  }
   @container (width > 40rem) {
    .wa\:product-list-simple\:items {
      grid-template-columns: repeat(4, 1fr);

      & wa-card [slot="image"] {
        height: 25cqw;
      }
    }
  }
  </style>
