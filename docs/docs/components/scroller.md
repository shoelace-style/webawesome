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

### Orientation

Set the `orientation` attribute to `vertical` and provide a height to create a vertical scroller.

```html {.example}
<wa-scroller orientation="vertical" style="max-height: 300px;">
  <p>The Appalachian Mist Trail offers hikers a serene 4-mile journey through the lush forests of the Great Smoky Mountains. Much like Misty Ridge Path, this moderate difficulty trail is known for its morning fog that creates an ethereal atmosphere perfect for photography enthusiasts. The path gradually climbs to several scenic overlooks where hikers can pause to admire panoramic views of the surrounding valleys.</p>
  <p>Desert Canyon Traverse cuts a challenging 5.8-mile path through the rugged terrain of the Southwest, reminiscent of Eagle's Perch in its difficulty level and rewarding vistas. This trail features sections of scrambling over red rock formations and navigates through narrow slot canyons where the walls rise dramatically on either side. The highest point offers breathtaking views across three different desert ecosystems.</p>
  <p>Coastal Redwood Walk provides an easy 2.5-mile stroll through ancient groves of towering trees, similar to the gentle experience of Whispering Pines. This family-friendly trail features a soft path covered in redwood sorrel and ferns, creating a naturally soundproofed environment where visitors can escape the noise of everyday life. Small wooden bridges cross bubbling streams, adding to the enchanting atmosphere of this accessible nature sanctuary.</p>
</wa-scroller>
```

### Second Example

TODO




