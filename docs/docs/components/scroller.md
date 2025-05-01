---
title: Scroller
description: Description of component.
layout: component
---

```html {.example}
<wa-scroller id="scroller__overview">
  <table>
    <tr>
      <th>Trail Name</th>
      <th>Difficulty</th>
      <th>Length (miles)</th>
      <th>Location</th>
      <th>Trail Description</th>
    </tr>
    <tr>
      <td>Misty Ridge Path</td>
      <td>Moderate</td>
      <td>3.5</td>
      <td>Blue Ridge Mountains</td>
      <td>This fog-shrouded trail offers dramatic overlooks and lush forest scenery. The morning mist creates an ethereal atmosphere that photographers absolutely adore.</td>
    </tr>
    <tr>
      <td>Eagle's Perch</td>
      <td>Difficult</td>
      <td>6.2</td>
      <td>Rocky Mountains</td>
      <td>A challenging ascent with rewarding summit views spanning three states. The final mile includes some scrambling sections that will test even seasoned hikers.</td>
    </tr>
    <tr>
      <td>Whispering Pines</td>
      <td>Easy</td>
      <td>2.8</td>
      <td>Sierra Nevada</td>
      <td>A gentle, family-friendly trail winding through ancient pine groves. The soft needle-covered path dampens sound, creating a peaceful sanctuary from civilization.</td>
    </tr>
    <tr>
      <td>Cascade Junction</td>
      <td>Moderate</td>
      <td>4.7</td>
      <td>Adirondacks</td>
      <td>This trail connects three stunning waterfalls with varying intensities. The middle section features wooden boardwalks that bring you close enough to feel the refreshing mist.</td>
    </tr>
    <tr>
      <td>Sunset Ridge Loop</td>
      <td>Moderate-Hard</td>
      <td>5.3</td>
      <td>Olympic Peninsula</td>
      <td>A diverse trail transitioning from dense forest to exposed ridge with Pacific Ocean views. Time your hike to catch the golden hour when the coastline glows dramatically.</td>
    </tr>
  </table> 
</wa-scroller>

<style>
  #scroller__overview {
    table {
      margin-block: 0;
    }

    th,
    td {
      white-space: nowrap;
    }

    th:nth-child(5),
    td:nth-child(5) {
      min-width: 50ch;
      white-space: wrap;
    }
  }
</style>
```

## Examples

### First Example

TODO

### Second Example

TODO




