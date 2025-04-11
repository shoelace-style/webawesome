---
layout: blank
---

{#<wa-callout>
  <!-- Look ma, no attributes! -->
  <wa-icon slot="icon"></wa-icon>
  This is a callout.
</wa-callout>

<wa-callout variant="danger">
  <wa-icon slot="icon" name="dumpster-fire" variant="solid"></wa-icon>
  This is a callout with an explicit icon.
</wa-callout>

<wa-callout variant="warning">
  <!-- Look ma, no attributes! -->
  <wa-icon slot="icon"></wa-icon>
  Here be dragons.
  <wa-button id="toggle_icon">Toggle <wa-icon id="poo_icon" name="poo" slot="suffix"></wa-icon></wa-button>
</wa-callout>
#}



<style>
wa-callout {
  --wa-icon-variant: regular;
  --wa-icon-name: info-circle;

  &[variant="warning"] {
    --wa-icon-name: triangle-exclamation;
  }
}

wa-button, button {
  --wa-icon-variant: regular;

  &:hover {
    --wa-icon-variant: solid;
  }
}

.github {
  --wa-icon-name: github;
  --wa-icon-family: brands;

  &:hover {
    --wa-icon-name: arrow-up-right-from-square !important;
    --wa-icon-family: classic !important;
  }
}



</style>
<wa-button id="toggle_icon">Toggle <wa-icon id="poo_icon" name="poo" slot="suffix"></wa-icon></wa-button>
<button>Toggle &nbsp;<wa-icon id="poo_icon" name="poo" slot="suffix"></wa-icon></button>

<wa-button class="github"><wa-icon slot="prefix" fixed-width></wa-icon> GitHub</wa-button>
