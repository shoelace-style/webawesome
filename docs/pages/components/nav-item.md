---
meta:
  title: Nav Item
  description:
layout: component
---

`wa-nav-item` maps to a `role="listitem"` under the hood and should generally be used as part
of a `<wa-nav-group>` for accessibility purposes.

```html:preview
<wa-nav-group>
  <wa-nav-item href="#">
    <wa-icon name="search" slot="prefix"></wa-icon>
    Search
  </wa-nav-item>

  <wa-nav-item href="#">
    <wa-icon name="bell" slot="prefix"></wa-icon>
    Notifications
  </wa-nav-item>

  <wa-divider></wa-divider>

  <wa-nav-item href="#" active>
    <wa-icon name="house-door" slot="prefix"></wa-icon>
    Home
  </wa-nav-item>

  <wa-nav-item href="#">
    <wa-icon name="music-note-list" slot="prefix"></wa-icon>
    Playlists
  </wa-nav-item>

  <wa-nav-item href="#">
    <wa-icon name="file-earmark-music" slot="prefix"></wa-icon>
    Tracks
  </wa-nav-item>

  <wa-nav-item href="#">
    <wa-icon name="gear" slot="prefix"></wa-icon>
    Settings
  </wa-nav-item>

  <wa-nav-item href="#">
    <wa-icon name="question-circle" slot="prefix"></wa-icon>
    Help
  </wa-nav-item>
</wa-nav-group>
```

## Examples

### Active nav item

```html:preview
<wa-nav-item href="#" active>
  Active Nav Item
</wa-nav-item>
```

### Icon only

```html:preview
<wa-nav-item href="#">
  <wa-icon slot="prefix" name="house-door"></wa-icon>
</wa-nav-item>
```


### Nav items with prefix + suffix

```html:preview
<wa-nav-item href="#">
  <wa-icon slot="prefix" name="link-45deg"></wa-icon>
  Nav Item
  <wa-icon slot="suffix" name="box-arrow-up-right"></wa-icon>
</wa-nav-item>
```

## Stuff
