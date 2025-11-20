---
title: Video
description: Videos embed a media player that supports multiple sources and adds functionality beyond that of a native video element
layout: component
---

```html {.example}
<wa-video>
  >
  <source />
  <track kind="captions" srclang="en" label="English" src="/assets/video/captions.vtt" default />
</wa-video>
```

## Playlist

If there's more than one video detected, a playlist will generate

<wa-video-player>
  <wa-video-item slot="playlist" title="Video 1" thumbnail="thumb1.jpg">
    <source src="video1.mp4" type="video/mp4" />
  </wa-video-item>
  <wa-video-item slot="playlist" title="Video 2" thumbnail="thumb2.jpg">
    <source src="video2.mp4" type="video/mp4" />
    <source src="video2.ogg" type="video/ogg" />
  </wa-video-item>
</wa-video-player>

### Placement

## Captions

if text tracks are detected

## Controls

A variable way to show which controls you want
