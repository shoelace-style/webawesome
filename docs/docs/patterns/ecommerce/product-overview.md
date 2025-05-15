---
title: Product Overview
description: 'Showcase your products with overviews including images, ratings, features, options, and more.'
isPro: true
---

## Split with Image

```html {.example}
<div class="wa-grid wa-gap-2xl">
  <div class="wa-stack wa-gap-2xl">
    <h2>San Ignacio Pache</h2>
    <p>
      A smooth, balanced Arabica varietal, grown and roasted on the Guerrero family's farm. Rich caramel and malt
      flavors blend with bright citrus for a complex brew suitable for drip, pour over, espresso, or however you take
      your coffee.
    </p>
    <div class="wa-stack">
      <wa-select label="Bag Size" value="12oz">
        <wa-option value="12oz">12 oz &ndash; $19.95</wa-option>
        <wa-option value="3lb">3 lb &ndash; $72.00</wa-option>
        <wa-option value="5lb">5 lb &ndash; $99.75</wa-option>
      </wa-select>
      <wa-select label="Bean Type" value="whole">
        <wa-option value="whole">Whole</wa-option>
        <wa-option value="drip">Drip Grind</wa-option>
        <wa-option value="espresso">Espresso Grind</wa-option>
      </wa-select>
    </div>
    <div class="wa-stack">
      <div class="wa-flank">
        <wa-input type="number" aria-label="Quantity" value="1" min="1" style="max-width: 8ch"></wa-input>
        <wa-button variant="brand">
          <wa-icon slot="prefix" name="basket-shopping"></wa-icon>
          Add to Basket
        </wa-button>
      </div>
      <div class="wa-flank wa-caption-m">
        <wa-icon name="truck"></wa-icon>
        <span>Free shipping on orders over $60</span>
      </div>
    </div>
    <dl class="wa-grid">
      <div class="wa-flank">
        <wa-avatar>
          <wa-icon slot="icon" name="coffee-bean"></wa-icon>
        </wa-avatar>
        <div class="wa-stack wa-gap-0">
          <dt>Roast</dt>
          <dd>Medium</dd>
        </div>
      </div>
      <div class="wa-flank">
        <wa-avatar>
          <wa-icon slot="icon" name="earth-americas"></wa-icon>
        </wa-avatar>
        <div class="wa-stack wa-gap-0">
          <dt>Origin</dt>
          <dd>San Ignacio, Peru</dd>
        </div>
      </div>
      <div class="wa-flank">
        <wa-avatar>
          <wa-icon slot="icon" name="sun-haze"></wa-icon>
        </wa-avatar>
        <div class="wa-stack wa-gap-0">
          <dt>Process</dt>
          <dd>Washed</dd>
        </div>
      </div>
      <div class="wa-flank">
        <wa-avatar>
          <wa-icon slot="icon" name="mug-hot"></wa-icon>
        </wa-avatar>
        <div class="wa-stack wa-gap-0">
          <dt>Tasting Notes</dt>
          <dd>Caramel, malt, orange</dd>
        </div>
      </div>
    </dl>
  </div>
  <div class="wa-frame wa-border-radius-m">
    <img
      src="https://images.unsplash.com/photo-1600396538702-d234dbb79139?q=80&w=3833&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Whole roasted coffee beans (Photograph by Jocelyn Morales)"
    />
  </div>
</div>
```

## With Image Grid

```html {.example}
<div class="wa-stack wa-gap-2xl">
  <wa-breadcrumb>
    <wa-breadcrumb-item>Clothing</wa-breadcrumb-item>
    <wa-breadcrumb-item>Women's</wa-breadcrumb-item>
    <wa-breadcrumb-item>Shirts &amp; Tops</wa-breadcrumb-item>
  </wa-breadcrumb>
  <div class="wa-grid wa-gap-xs" style="--min-column-size: 10ch">
    <div class="wa-frame" style="height: 100%; width: 100%">
      <img
        class="wa-border-radius-s"
        src="https://images.unsplash.com/photo-1614792568992-ded1c487c1dd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="(Photograph by Patrick Perkins)"
      />
    </div>
    <div class="wa-grid wa-gap-xs">
      <div class="wa-frame" style="aspect-ratio: 3 / 2">
        <img
          class="wa-border-radius-s"
          src="https://images.unsplash.com/photo-1614725078749-29c421fd0e51?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="(Photograph by Patrick Perkins)"
        />
      </div>
      <div class="wa-frame" style="aspect-ratio: 3 / 2">
        <img
          class="wa-border-radius-s"
          src="https://images.unsplash.com/photo-1614725808713-e6bbe418fc5d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="(Photograph by Patrick Perkins)"
        />
      </div>
    </div>
    <div class="wa-frame" style="height: 100%; width: 100%">
      <img
        class="wa-border-radius-s"
        src="https://images.unsplash.com/photo-1614725078379-9d1330a08c95?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="(Photograph by Patrick Perkins)"
      />
    </div>
  </div>
  <div class="wa-grid wa-gap-xl" style="--min-column-size: 30ch">
    <h2 class="wa-heading-l">Cropped Fitted Tank Top</h2>
    <span class="wa-body-xl">$59</span>
  </div>
  <div class="wa-grid wa-gap-xl" style="--min-column-size: 30ch">
    <div class="wa-stack wa-gap-xl">
      <div class="wa-cluster">
        <wa-rating label="Rating" readonly value="3.5"></wa-rating>
        <a href="">117 Reviews</a>
      </div>
      <p>
        Made with a breathable, stretchy fabric blend for unparalleled comfort and flattering style. Pairs perfectly
        with your favorite high-waisted jeans for lazy summer weekends or lively nights out.
      </p>
      <div class="wa-stack wa-gap-xs">
        <h3 class="wa-heading-xs">Good to Know</h3>
        <p class="wa-body-xs">
          95% cotton, 5% elastane. Our tops are pre-shrunk to ensure a consistent fit with no surprises. Machine wash
          cold. Tumble dry low.
        </p>
      </div>
    </div>
    <div class="wa-stack">
      <wa-radio-group label="Color" name="color" value="black" orientation="horizontal">
        <wa-radio-button id="radio-black" value="black">
          <wa-icon name="square" label="Black" style="color: black;"></wa-icon>
          <wa-tooltip for="radio-black">Black</wa-tooltip>
        </wa-radio-button>
        <wa-radio-button id="radio-gray" value="gray">
          <wa-icon name="square" label="Gray" style="color: gray;"></wa-icon>
          <wa-tooltip for="radio-gray">Gray</wa-tooltip>
        </wa-radio-button>
        <wa-radio-button id="radio-indigo" value="indigo">
          <wa-icon name="square" label="Indigo" style="color: indigo;"></wa-icon>
          <wa-tooltip for="radio-indigo">Indigo</wa-tooltip>
        </wa-radio-button>
        <wa-radio-button id="radio-olive" value="olive">
          <wa-icon name="square" label="Olive" style="color: olive;"></wa-icon>
          <wa-tooltip for="radio-olive">Olive</wa-tooltip>
        </wa-radio-button>
      </wa-radio-group>
      <wa-radio-group label="Size" name="size" value="s" orientation="horizontal">
        <wa-radio-button value="xs">XS</wa-radio-button>
        <wa-radio-button value="s">S</wa-radio-button>
        <wa-radio-button value="m">M</wa-radio-button>
        <wa-radio-button value="l">L</wa-radio-button>
        <wa-radio-button value="xl">XL</wa-radio-button>
      </wa-radio-group>
      <wa-button variant="brand">
        <wa-icon slot="prefix" name="cart-plus" variant="solid"></wa-icon>
        Add to Cart
      </wa-button>
    </div>
  </div>
</div>
```

## With Tiered Images

```html {.example}
<div class="wa-stack wa-gap-2xl">
  <wa-breadcrumb>
    <wa-breadcrumb-item>Clothing</wa-breadcrumb-item>
    <wa-breadcrumb-item>Men's</wa-breadcrumb-item>
    <wa-breadcrumb-item>Shirts &amp; Tops</wa-breadcrumb-item>
  </wa-breadcrumb>
  <div class="wa-grid wa-gap-2xl" style="--min-column-size: 35ch">
    <div class="wa-stack wa-gap-xs">
      <img
        class="wa-border-radius-s"
        src="https://images.unsplash.com/photo-1630643583573-c68623718072?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="(Photograph by Gervyn Louis)"
      />
      <div class="wa-grid wa-gap-xs" style="--min-column-size: 0ch">
        <img
          class="wa-border-radius-s"
          src="https://images.unsplash.com/photo-1571666274590-f8cc87006500?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="(Photograph by Gervyn Louis)"
        />
        <img
          class="wa-border-radius-s"
          src="https://images.unsplash.com/photo-1630643591760-a6ed60ef499f?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="(Photograph by Gervyn Louis)"
        />
      </div>
    </div>
    <div class="wa-stack">
      <div class="wa-split">
        <h2 class="wa-heading-l">Graphic Cutoff Tee</h2>
        <span class="wa-body-xl">$65</span>
      </div>
      <div class="wa-split">
        <div class="wa-cluster">
          <wa-rating label="Rating" readonly value="4.2"></wa-rating>
          <span>4.2</span>
        </div>
        <a href="#">144 Reviews</a>
      </div>
      <wa-radio-group label="Color" name="color" value="black" orientation="horizontal">
        <wa-radio-button value="black">
          <wa-icon slot="prefix" name="shirt" style="color: black;"></wa-icon>
          Vintage Black
        </wa-radio-button>
        <wa-radio-button value="gray">
          <wa-icon slot="prefix" name="shirt" style="color: gray;"></wa-icon>
          Faded Gray
        </wa-radio-button>
      </wa-radio-group>
      <wa-radio-group label="Size" name="size" value="s" orientation="horizontal">
        <wa-radio-button value="xs">XS</wa-radio-button>
        <wa-radio-button value="s">S</wa-radio-button>
        <wa-radio-button value="m">M</wa-radio-button>
        <wa-radio-button value="l">L</wa-radio-button>
        <wa-radio-button value="xl">XL</wa-radio-button>
      </wa-radio-group>
      <wa-button variant="brand">
        <wa-icon slot="prefix" name="bag-shopping" variant="solid"></wa-icon>
        Add to Bag
      </wa-button>
      <wa-divider></wa-divider>
      <h3 class="wa-heading-s">Description</h3>
      <p>
        Stay cool, <em>slay</em> cool. Train hard and recover in style with this ultra-breathable cutoff tee. Made from
        100% organic, quick-drying cotton to keep the air flowing whether you're lifting, sprinting, or crushing HIIT
        sessions.
      </p>
      <wa-divider></wa-divider>
      <h3 class="wa-heading-s">Highlights</h3>
      <div class="wa-grid">
        <wa-card class="wa-span-grid">
          <div class="wa-stack">
            <wa-icon name="hand-holding-heart"></wa-icon>
            <h4 class="wa-heading-s">People and Planet First</h4>
            <p class="wa-caption-m">
              Ethical production, fair wages, and sustainable materials empower every part of our supply chain.
            </p>
          </div>
        </wa-card>
        <wa-card>
          <div class="wa-stack">
            <wa-icon name="earth-americas"></wa-icon>
            <h4 class="wa-heading-s">International Shipping</h4>
            <p class="wa-caption-m">Wherever you are, your order will meet you there.</p>
          </div>
        </wa-card>
        <wa-card>
          <div class="wa-stack">
            <wa-icon name="arrow-right-arrow-left"></wa-icon>
            <h4 class="wa-heading-s">90-day Returns</h4>
            <p class="wa-caption-m">Not happy? Return your item and get a full refund.</p>
          </div>
        </wa-card>
      </div>
    </div>
  </div>
</div>
```

## With Carousel and Collapsible Details

```html {.example}
<div class="wa-stack wa-gap-2xl">
  <wa-carousel pagination navigation loop style="--aspect-ratio: 3 / 2;">
    <wa-carousel-item>
      <img
        src="https://images.unsplash.com/photo-1601379327928-bedfaf9da2d0?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Four folded and stacked knit sweaters in three colors (Photograph by Tijana Drndarski)"
      />
    </wa-carousel-item>
    <wa-carousel-item>
      <img
        src="https://images.unsplash.com/photo-1519804270019-39e929a7afb5?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Knit sweater in sand color full view, showing waffle knit pattern, relaxed fit, and crew neckline (Photograph by Jonathan Zerger)"
      />
    </wa-carousel-item>
    <wa-carousel-item>
      <img
        src="https://images.unsplash.com/photo-1519805614447-6f49142e6697?q=80&w=3633&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Knit sweater in sand color shoulder detail, showing relaxed fit on broader shoulders (Photograph by Jonathan Zerger)"
      />
    </wa-carousel-item>
    <wa-carousel-item>
      <img
        src="https://images.unsplash.com/photo-1522230130022-498e355165c5?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Knit sweater in sand color sleeve detail, showing loose fit around the arms (Photograph by Jonathan Zerger)"
      />
    </wa-carousel-item>
  </wa-carousel>
  <div class="wa-grid wa-gap-2xl" style="--min-column-size: 30ch;">
    <div class="wa-stack">
      <div class="wa-split">
        <h3>Pullover Sweater</h3>
        <span class="wa-body-xl">$140</span>
      </div>
      <wa-rating label="Rating" precision="0.5" value="4.5" readonly></wa-rating>
      <p>
        Wrap yourself in warmth and effortless style with this wool knit Pullover Sweater. Designed for unparalleled
        comfort. The relaxed fit and classic crew neckline make it a versatile staple for layering or wearing solo.
      </p>
      <wa-radio-group label="Color" name="color" value="sand" orientation="horizontal">
        <wa-radio-button value="sand">
          <wa-icon slot="prefix" name="circle" style="color: burlywood;"></wa-icon>
          Sand
        </wa-radio-button>
        <wa-radio-button value="shale">
          <wa-icon slot="prefix" name="circle" style="color: silver;"></wa-icon>
          Shale
        </wa-radio-button>
        <wa-radio-button value="slate">
          <wa-icon slot="prefix" name="circle" style="color: dimgray;"></wa-icon>
          Slate
        </wa-radio-button>
      </wa-radio-group>
      <wa-radio-group label="Size" name="size" value="s" orientation="horizontal">
        <wa-radio-button value="xs">XS</wa-radio-button>
        <wa-radio-button value="s">S</wa-radio-button>
        <wa-radio-button value="m">M</wa-radio-button>
        <wa-radio-button value="l">L</wa-radio-button>
        <wa-radio-button value="xl">XL</wa-radio-button>
      </wa-radio-group>
      <wa-button variant="brand">Add to Cart</wa-button>
    </div>
    <div class="wa-stack">
      <wa-details summary="Size and Fit" open>
        <ul class="wa-body-s">
          <li>True to size with a relaxed fit</li>
          <li>Fits all shoulder shapes, broad to narrow</li>
          <li>No pinching in the arms or irritating seams</li>
          <li>Ribbed cuffs and hem</li>
        </ul>
      </wa-details>
      <wa-details summary="Materials and Care">
        <ul class="wa-body-s">
          <li>Durable Merino and Yak wool blend</li>
          <li>Machine wash cold on delicate cycle</li>
          <li>Lay flat to dry</li>
          <li>Made with <wa-icon name="heart" label="love"></wa-icon> in Bentonville, USA</li>
        </ul>
      </wa-details>
      <wa-details summary="Shipping">
        <ul class="wa-body-s">
          <li>Flat $9 shipping free for orders under $200.</li>
          <li>Free shipping on orders over $200, anywhere in the world.</li>
        </ul>
      </wa-details>
    </div>
  </div>
</div>
```

## With Tabs

```html {.example}
<div class="wa-flank:end wa-align-items-start wa-gap-2xl" style="--flank-size: 30ch">
  <div class="wa-stack">
    <img
      class="wa-border-radius-l"
      src="https://img.fortawesome.com/cfa83f3c/icon-grid-wallpaper.png"
      alt="Sample of 48 line-style icons"
    />
    <wa-tab-group>
      <wa-tab panel="license">License</wa-tab>
      <wa-tab panel="faq">FAQ</wa-tab>
      <wa-tab-panel name="license">
        <p class="wa-body-s">
          Your purchase includes a perpetual Font Awesome Pro License to use Classic Light icons on unlimited projects.
          <a href="">Read the full license terms.</a>
        </p>
      </wa-tab-panel>
      <wa-tab-panel name="faq">
        <dl class="wa-stack wa-body-s">
          <dt>Do I need to renew my subscription to receive fixes?</dt>
          <dd>
            We split up Font Awesome releases into regular updates and bug-fix updates. With a Font Awesome Pro plan
            that has a perpetual license, you'll always be entitled to bug-fix updates for your last version, even after
            your subscription has expired.
          </dd>
          <dt>Can I use Font Awesome Pro in themes, plug-ins, or open source projects?</dt>
          <dd>
            For themes and open source projects, right now it's best to just use Font Awesome Free. We are working a
            better solution, so feel free to get in touch if you have thoughts.
          </dd>
          <dt>Do you offer enterprise licenses for Font Awesome Pro?</dt>
          <dd>
            We don't currently offer Enterprise-level licenses, but we may do so in the future. Get in touch if
            interested.
          </dd>
        </dl>
      </wa-tab-panel>
    </wa-tab-group>
  </div>
  <div class="wa-stack wa-gap-l">
    <wa-badge appearance="filled">Sale</wa-badge>
    <h2>Icon Pack: Classic Light</h2>
    <p class="wa-body-l">Easy, readable icons with a lighter touch.</p>
    <div class="wa-cluster wa-gap-xs wa-body-l">
      <s>$60</s>
      <strong>$49</strong>
    </div>
    <wa-button variant="brand" size="large">
      <wa-icon slot="prefix" name="arrow-down-to-line" variant="solid"></wa-icon>
      Get Icons
    </wa-button>
    <wa-divider></wa-divider>
    <h3 class="wa-heading-m">What's in the Pack</h3>
    <ul class="wa-stack wa-gap-xs">
      <li class="wa-flank">
        <wa-icon name="badge-check"></wa-icon>
        <span>3,323 icons</span>
      </li>
      <li class="wa-flank">
        <wa-icon name="badge-check"></wa-icon>
        <span>Pre-bundled Font Awesome kit</span>
      </li>
      <li class="wa-flank">
        <wa-icon name="badge-check"></wa-icon>
        <span>Ligature-based desktop font files</span>
      </li>
      <li class="wa-flank">
        <wa-icon name="badge-check"></wa-icon>
        <span>Individual SVGs + SVG sprites</span>
      </li>
      <li class="wa-flank">
        <wa-icon name="badge-check"></wa-icon>
        <span>Web fonts + SVG framework</span>
      </li>
      <li class="wa-flank">
        <wa-icon name="badge-check"></wa-icon>
        <span>SCSS/LESS CSS preprocessor files</span>
      </li>
      <li class="wa-flank">
        <wa-icon name="badge-check"></wa-icon>
        <span>Perpetual Pro license</span>
      </li>
    </ul>
  </div>
</div>
```
