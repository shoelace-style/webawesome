---
meta:
  title: Blog Post
  description: TODO
toc: false
---

<style>
  :root {
    --docs-content-max-width: 72rem;
  }
  #menu-toggle,
  #sidebar {
    display: none;
  }
  main {
    padding: var(--docs-content-vertical-spacing) var(--docs-content-padding);
    margin: 0;
  }
  .anchor-heading a {
    display: none;
  }
  .preview-container {
    container: preview / inline-size;
  }
</style>

<!-- cSpell:dictionaries lorem-ipsum -->

<div class="preview-container wa:block-flow:3xl">
  <div class="wa:overflowing_hero">
    <div class="wa:arrange wa:background:brand_spot_gradient">
      <div>
        <div class="wa:arrange:flex:justify-space_between:gap-s">
          <small><wa-format-date month="long" year="numeric"></wa-format-date></small>
          <wa-badge variant="neutral">Design</wa-badge>
        </div>
        <h1>Pantone's Color of the Year 2024</h1>
        <p>PANTONE 13-1023 Peach Fuzz has our new year starting off with lots of warm and fuzzies.</p>
        <div class="wa:arrange:flex:gap-s">
          <wa-avatar label="User avatar" style="--size: 2rem;"></wa-avatar>
          <small>Author</small>
        </div>
      </div>
      <div class="wa:frame:square">
        <img src="https://bit.ly/3Irq42Q" alt="Vast, peach-colored desert">
      </div>
    </div>
  </div>
  <div class="wa:blog_post wa:block-flow:3xl">
    <div class="wa:blog_post:body wa:block-flow:xl">
      <p>Morbi vitae sapien non velit feugiat consectetur. Nulla lacinia ante a diam gravida cursus. Quisque fermentum ex a nisi cursus porttitor. Praesent id laoreet mauris, id efficitur sapien. Quisque eget metus velit. Nulla sit amet tristique lectus, tincidunt lobortis velit. Proin vitae facilisis lectus. Nunc vel sapien vitae dui commodo suscipit iaculis eget felis.</p>
      <p>Praesent in erat semper, fringilla tellus non, lacinia felis. Nam eu fringilla nisl. Maecenas id tortor tempus, accumsan nisi eget, bibendum arcu. Pellentesque nec enim non nisl varius iaculis. Phasellus interdum nec ex nec faucibus. Vestibulum et quam auctor massa pellentesque tempor. Sed tincidunt nibh felis, ut euismod ante volutpat aliquam. Etiam varius suscipit ornare.</p>
      <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed a leo tempus, pretium mi ac, pretium ipsum. Curabitur cursus eleifend enim. Pellentesque feugiat euismod tincidunt. Sed semper velit nunc, nec imperdiet eros varius ac. Aenean aliquam augue at venenatis volutpat. Proin a imperdiet leo. Nullam eget aliquet urna.</p>
      <p>Mauris faucibus varius massa vel vulputate. Praesent ac ligula pretium, viverra eros vitae, consequat metus. Morbi commodo vehicula sem, eget scelerisque ipsum rutrum ut. Maecenas cursus dolor mattis risus dapibus pulvinar. Suspendisse ut dolor nec arcu lobortis molestie.</p>
      <p>Donec eros felis, dictum non placerat vitae, sodales in risus. Etiam felis lectus, consectetur quis tempor non, porta a metus. Cras finibus nibh a est semper, eget consequat libero pretium. Pellentesque placerat feugiat enim sit amet sodales. Proin convallis dui eu nibh tincidunt, a posuere dolor sagittis. Ut egestas et eros eu convallis. Integer eros elit, blandit at euismod sit amet, blandit sed velit. Donec dapibus nulla in augue commodo, at efficitur orci dictum. Praesent ultrices accumsan iaculis. Maecenas ut metus a lectus venenatis euismod. Sed auctor, dui efficitur molestie convallis, diam odio faucibus turpis, vitae bibendum ante est non ligula.</p>
      <wa-divider></wa-divider>
      <div class="wa:blog_post:footer wa:arrange:flex:justify-space_between">
        <wa-radio-group name="reactions" class="wa:reaction_group">
          <wa-radio-button value="applaud"><wa-icon name="hands-clapping" label="Applaud"></wa-icon><small class="wa:count">74</small></wa-radio-button>
          <wa-radio-button value="love"><wa-icon name="heart" label="Love"></wa-icon><small class="wa:count">161</small></wa-radio-button>
          <wa-radio-button value="laugh"><wa-icon name="face-laugh-beam" label="Laugh"></wa-icon><small class="wa:count">9</small></wa-radio-button>
          <wa-radio-button value="cry"><wa-icon name="face-sad-tear" label="Cry"></wa-icon><small class="wa:count">1</small></wa-radio-button>
        </wa-radio-group>
        <div class="wa:arrange:flex:nowrap:gap-l">
          <wa-tooltip content="Save">
            <wa-icon-button name="bookmark" label="Save"></wa-icon-button>
          </wa-tooltip>
          <wa-tooltip content="Share">
            <wa-icon-button name="share-from-square" label="Share"></wa-icon-button>
          </wa-tooltip>
        </div>
      </div>
    </div>
    <div class="wa:blog_post:comments wa:block-flow:2xl">
      <h2>Comments</h2>
      <div class="wa:arrange:flex:nowrap:gap-s">
        <wa-avatar label="User avatar"></wa-avatar>
        <wa-textarea class="wa:fill_space" rows="1" placeholder="Add a comment"></wa-textarea>
      </div>
      <div class="wa:comment wa:arrange:flex:nowrap:align-start:gap-s">
        <wa-avatar image="https://bit.ly/3V9kV7a" label="User avatar"></wa-avatar>
        <div class="wa:fill_space">
          <div class="wa:chat_bubble">
            <div class="wa:arrange:flex:justify-space_between">
              <strong>Pedro Pascal</strong>
              <small>1d</small>
            </div>
            <span>You expect me to search the galaxy for the home of this creature and deliver it to a race of enemy sorcerers?</span>
          </div>
          <div class="wa:arrange:flex:gap-m">
            <div class="wa:reaction_single wa:arrange:flex:nowrap:gap-3xs">
              <wa-icon-button name="thumbs-up" label="Like"></wa-icon-button>
              <small>(3)</small>
            </div>
            <wa-button variant="text" size="small">Reply</wa-button>
          </div>
          <div class="wa:comment wa:arrange:flex:nowrap:align-start:gap-s">
            <wa-avatar image="https://bit.ly/3Pb2cUC" label="User avatar"></wa-avatar>
            <div class="wa:fill_space">
              <div class="wa:chat_bubble">
                <div class="wa:arrange:flex:justify-space_between">
                  <strong>Emily Swallow</strong>
                  <small>12h</small>
                </div>
                <span>This is the Way.</span>
              </div>
              <div class="wa:arrange:flex:gap-m">
                <div class="wa:reaction_single wa:arrange:flex:nowrap:gap-3xs">
                  <wa-icon-button name="thumbs-up" label="Like"></wa-icon-button>
                  <small>(21)</small>
                </div>
                <wa-button variant="text" size="small">Reply</wa-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wa:arrange:flex:nowrap:align-start:gap-s">
        <wa-avatar image="https://bit.ly/3Tq9GWr" label="User avatar"></wa-avatar>
        <div class="wa:fill_space">
          <div class="wa:chat_bubble">
            <div class="wa:arrange:flex:justify-space_between">
              <strong>Nick Nolte</strong>
              <small>2w</small>
            </div>
            <span>I have spoken.</span>
          </div>
          <div class="wa:arrange:flex:gap-m">
            <div class="wa:reaction_single wa:arrange:flex:nowrap:gap-3xs">
              <wa-icon-button name="thumbs-up" label="Like"></wa-icon-button>
              <small>(1)</small>
            </div>
            <wa-button variant="text" size="small">Reply</wa-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="wa:blog:recommended">
    <div class="wa:block-flow:xl">
      <h2>You may also like</h2>
      <div class="wa:arrange:size-s">
        <div class="wa:block-flow:xs">
          <div class="wa:frame:landscape">
            <img src="http://bit.ly/49ThK7O" alt="">
          </div>
          <div>
            <small><wa-format-date date="2023-12-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date></small>
          </div>
          <h4>Eget Consequat Libero</h4>
        </div>
        <div class="wa:block-flow:xs">
          <div class="wa:frame:landscape">
            <img src="https://bit.ly/3wHdFFp" alt="">
          </div>
          <div>
            <small><wa-format-date date="2023-12-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date></small>
          </div>
          <h4>Sed a Leo Tempus</h4>
        </div>
        <div class="wa:block-flow:xs">
          <div class="wa:frame:landscape">
            <img src="https://bit.ly/49LxbPx" alt="">
          </div>
          <div>
            <small><wa-format-date date="2023-12-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date></small>
          </div>
          <h4>Ultrices Posuere Cubilia Curae</h4>
        </div>
      </div>
    </div>
  </div>
</div>
