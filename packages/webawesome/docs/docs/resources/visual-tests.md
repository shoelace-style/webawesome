---
title: Visual Tests
description: A page to visually test component styles against native styles.
layout: page
wide: true
---

<style>
  #content {
    p {
      max-width: 90ch;
    }

    tbody {
      & .wa-grid {
        --min-column-size: 5ch;
      }

      & tr th:first-of-type {
        width: 20ch;
      }

      & th {
        vertical-align: middle;
      }

      & tr:hover {
        background-color: color-mix(in oklch, var(--wa-color-fill-quiet), transparent 60%)
      }
    }

    wa-divider {
      --width: var(--wa-border-width-m);
      --spacing: var(--wa-space-3xl);
    }
  }
</style>

With so many ways to build with and use Web Awesome components, visual tests help ensure consistency and prevent broken styles from leaking into production.

These tests can come in handy when creating or customizing your own theme. Look through each test case to make sure that custom styles in your theme cover all of the attributes, utilities, and built-in styles Web Awesome offers.

<wa-tab-group>
  <wa-tab panel="native">Native</wa-tab>
  <wa-tab panel="color">Color</wa-tab>
  <wa-tab panel="size">Size</wa-tab>
  <wa-tab panel="alignment">Alignment</wa-tab>
  <wa-tab panel="harmony">Harmony</wa-tab>

<wa-tab-panel name="alignment">

## Alignment

Alignment tests reveal the top boundary, vertical center, and bottom boundary of components. These help to evaluate how well components align with one another when arranged horizontally.

{% include 'visual-tests/alignment.njk' %}

</wa-tab-panel>

<wa-tab-panel name="color">

## Color

Color tests ensure that both the `variant` attribute and `.wa-[variant]` classes have identical results for components that support them. Developers should be able to use both of these interchangeably to give the component the intended semantic color.

{% include 'visual-tests/color.njk' %}

</wa-tab-panel>

<wa-tab-panel name="harmony">

## Harmony

Harmony tests show how related components look together. These can help validate design choices or reveal where design intervention is needed to get a consistent, harmonious look and feel.

{% include 'visual-tests/harmony.njk' %}

</wa-tab-panel>

<wa-tab-panel name="native">

## Native

Native style tests ensure that supported native elements and utilities look the same as their Web Awesome component counterparts. Native elements may also support the same appearance, color, and size utilities as components.

{% include 'visual-tests/native.njk' %}

</wa-tab-panel>

<wa-tab-panel name="size">

## Size

Size tests ensure that both the `size` attribute and `.wa-size-[s|m|l]` classes have identical results for components that support them. Developers should be able to use both of these interchangeably on components to get the intended size.

{% include 'visual-tests/size.njk' %}

</wa-tab-panel>

</wa-tab-group>
