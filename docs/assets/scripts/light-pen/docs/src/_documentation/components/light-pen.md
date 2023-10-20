---
title: <light-pen>
permalink: /components/light-pen/
component: light-pen
---

## Typical Usage

<light-pen style="padding: 8px; height: 100%;" resize-position="30" open-languages="js,html,css">
  <template slot="html">
    <light-pen>
      <template slot="html">
        <div>
          This is kind of wild huh? We have a <code>&lt;light-pen&gt;</code>
          component running inside of a <code>&lt;light-pen&gt;</code> component!!
        </div>
      </template>

      <template slot="css">
        code {
          padding: 2px 6px;
          display: inline-block;
          font-size: 0.9em;
          background-color: rgba(0,0,0,0.05);
          border-radius: 4px;
        }
      </template>
    </light-pen>
  </template>

  <template slot="css">
    html, body {
      height: 100%;
      min-height: 100%;
      width: 100%;
      margin: 0;
    }

    light-pen {
      height: 100%;
    }
  </template>

  <template slot="js">
    import LightPen from "<%= find_asset "../exports/light-pen.js" %>";
    LightPen.define()
  </template>
</light-pen>
