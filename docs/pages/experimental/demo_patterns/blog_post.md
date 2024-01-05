---
meta:
  title: Blog Post
  description: TODO
toc: false
---

<div class="wa:block-flow:3xl">
  <div class="wa:overflowing_hero">
    <div class="wa:arrange wa:background:brand_spot_gradient" style="border-radius:var(--wa-panel-corners); padding:var(--wa-space-3xl); color:var(--wa-color-brand-text-on-spot);">
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
        <img src="https://images.pexels.com/photos/6550721/pexels-photo-6550721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="">
      </div>
    </div>
  </div>
  <div class="wa:block-flow:3xl" style="font-size:var(--wa-font-size-l); max-inline-size: 60ch; margin-inline: auto;">
    <div class="wa:block-flow:xl">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae sapien non velit feugiat consectetur. Nulla lacinia ante a diam gravida cursus. Quisque fermentum ex a nisi cursus porttitor. Praesent id laoreet mauris, id efficitur sapien. Quisque eget metus velit. Nulla sit amet tristique lectus, tincidunt lobortis velit. Proin vitae facilisis lectus. Nunc vel sapien vitae dui commodo suscipit iaculis eget felis.</p>
      <p>Praesent in erat semper, fringilla tellus non, lacinia felis. Nam eu fringilla nisl. Maecenas id tortor tempus, accumsan nisi eget, bibendum arcu. Pellentesque nec enim non nisl varius iaculis. Phasellus interdum nec ex nec faucibus. Vestibulum et quam auctor massa pellentesque tempor. Sed tincidunt nibh felis, ut euismod ante volutpat aliquam. Etiam varius suscipit ornare.</p>
      <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed a leo tempus, pretium mi ac, pretium ipsum. Curabitur cursus eleifend enim. Pellentesque feugiat euismod tincidunt. Sed semper velit nunc, nec imperdiet eros varius ac. Aenean aliquam augue at venenatis volutpat. Proin a imperdiet leo. Nullam eget aliquet urna.</p>
      <p>Mauris faucibus varius massa vel vulputate. Praesent ac ligula pretium, viverra eros vitae, consequat metus. Morbi commodo vehicula sem, eget scelerisque ipsum rutrum ut. Maecenas cursus dolor mattis risus dapibus pulvinar. Suspendisse ut dolor nec arcu lobortis molestie. Duis pulvinar tellus vitae felis volutpat hendrerit. Vivamus sodales condimentum quam, ut consequat massa viverra sed. Vestibulum laoreet tincidunt lacus nec ullamcorper. Quisque tincidunt turpis et sapien hendrerit, a laoreet massa dictum. Vestibulum dictum posuere lectus. Pellentesque ac lorem sodales, iaculis libero in, eleifend purus. Sed volutpat quam est, ac accumsan dolor viverra a. Duis blandit augue id tortor aliquet tempus. Nulla pharetra nec nisi non placerat. Donec in risus feugiat risus mattis pretium imperdiet a tortor.</p>
      <p>Donec eros felis, dictum non placerat vitae, sodales in risus. Etiam felis lectus, consectetur quis tempor non, porta a metus. Cras finibus nibh a est semper, eget consequat libero pretium. Pellentesque placerat feugiat enim sit amet sodales. Proin convallis dui eu nibh tincidunt, a posuere dolor sagittis. Ut egestas et eros eu convallis. Integer eros elit, blandit at euismod sit amet, blandit sed velit. Donec dapibus nulla in augue commodo, at efficitur orci dictum. Nam id accumsan leo. Proin pellentesque tincidunt neque ornare gravida. Phasellus malesuada, orci vel ultricies fringilla, tortor ipsum cursus magna, non fermentum velit nibh at nunc. Duis purus mauris, ullamcorper eu tempus id, ornare gravida odio. Praesent ultrices accumsan iaculis. Maecenas ut metus a lectus venenatis euismod. Sed auctor, dui efficitur molestie convallis, diam odio faucibus turpis, vitae bibendum ante est non ligula.</p>
      <wa-divider></wa-divider>
      <div class="wa:arrange:flex:justify-space_between" style="font-size:var(--wa-font-size-m);">
        <wa-radio-group name="a">
          <wa-radio-button value="1"><wa-icon name="hands-clapping" label="Applaud"></wa-icon><small style="margin-inline-start:var(--wa-space-xs);">74</small></wa-radio-button>
          <wa-radio-button value="2"><wa-icon name="heart" label="Love"></wa-icon><small style="margin-inline-start:var(--wa-space-xs);">161</small></wa-radio-button>
          <wa-radio-button value="3"><wa-icon name="face-laugh-beam" label="Laugh"></wa-icon><small style="margin-inline-start:var(--wa-space-xs);">9</small></wa-radio-button>
          <wa-radio-button value="4"><wa-icon name="face-sad-tear" label="Cry"></wa-icon><small style="margin-inline-start:var(--wa-space-xs);">1</small></wa-radio-button>
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
    <div class="wa:block-flow:2xl" style="font-size:var(--wa-font-size-m);">
      <h2>Comments</h2>
      <div class="wa:arrange:flex:nowrap:gap-s">
        <wa-avatar label="User avatar"></wa-avatar>
        <wa-textarea class="wa:fill_space" rows="1" placeholder="Add a comment"></wa-textarea>
      </div>
      <div class="wa:arrange:flex:nowrap:align-start:gap-s">
        <wa-avatar image="https://m.media-amazon.com/images/M/MV5BMTBlNDU1NTgtNjY1Zi00ZTU0LTlkN2ItZmM5NDM5NmMyNzk3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg" label="User avatar"></wa-avatar>
        <div class="wa:fill_space">
          <div class="wa:chat_bubble">
            <div class="wa:arrange:flex:justify-space_between">
              <strong>Din Djarin</strong>
              <small>1d</small>
            </div>
            <span>You expect me to search the galaxy for the home of this creature and deliver it to a race of enemy sorcerers?</span>
          </div>
          <div class="wa:arrange:flex:gap-m">
            <div class="wa:arrange:flex:nowrap:gap-3xs">
              <wa-icon-button name="thumbs-up" label="Like" style="color:var(--wa-color-neutral-text-on-surface)"></wa-icon-button>
              <small>(3)</small>
            </div>
            <wa-button variant="text" size="small">Reply</wa-button>
          </div>
          <div class="wa:arrange:flex:nowrap:align-start:gap-s">
            <wa-avatar image="https://cdn.mos.cms.futurecdn.net/zAQrY5fe3HAFvWrTLE6nNi.png" label="User avatar"></wa-avatar>
            <div class="wa:fill_space">
              <div class="wa:chat_bubble">
                <div class="wa:arrange:flex:justify-space_between">
                  <strong>The Armorer</strong>
                  <small>12h</small>
                </div>
                <span>This is the Way.</span>
              </div>
              <div class="wa:arrange:flex:gap-m">
                <div class="wa:arrange:flex:nowrap:gap-3xs">
                  <wa-icon-button name="thumbs-up" label="Like" style="color:var(--wa-color-neutral-text-on-surface)"></wa-icon-button>
                  <small>(21)</small>
                </div>
                <wa-button variant="text" size="small">Reply</wa-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wa:arrange:flex:nowrap:align-start:gap-s">
        <wa-avatar image="https://static1.srcdn.com/wordpress/wp-content/uploads/2021/07/Nick-Nolte-and-Misty-Rosas-as-Kuiil-in-The-Mandalorian.jpg" label="User avatar"></wa-avatar>
        <div class="wa:fill_space">
          <div class="wa:chat_bubble">
            <div class="wa:arrange:flex:justify-space_between">
              <strong>Kuiil</strong>
              <small>2w</small>
            </div>
            <span>I have spoken.</span>
          </div>
          <div class="wa:arrange:flex:gap-m">
            <div class="wa:arrange:flex:nowrap:gap-3xs">
              <wa-icon-button name="thumbs-up" label="Like" style="color:var(--wa-color-neutral-text-on-surface)"></wa-icon-button>
              <small>(1)</small>
            </div>
            <wa-button variant="text" size="small">Reply</wa-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="wa:arrange:gap-m" style="background-color:var(--wa-color-brand-fill-subtle); padding:var(--wa-space-3xl); border-radius:var(--wa-panel-corners); box-shadow:var(--wa-shadow-level-1); margin-top:calc(var(--wa-space-3xl) * 2);">
    <div class="wa:block-flow:s">
      <h2 style="color:var(--wa-color-brand-text-on-fill)"><strong>Don't miss a thing.</strong></h2>
      <p style="color:var(--wa-color-neutral-text-on-fill)">Subscribe to receive the latest posts in your inbox.</p>
    </div>
    <div class="wa:arrange:flex:gap-s">
      <wa-input class="wa:fill_space" type="email" placeholder="your@email.com">
        <wa-icon name="envelope" variant="regular" label="email" slot="prefix"></wa-icon>
      </wa-input>
      <wa-button variant="brand">Subscribe</wa-button>
    </div>
  </div>
  <div style="background-color:var(--wa-color-neutral-fill-subtle); padding:var(--wa-space-3xl); border-radius:var(--wa-panel-corners); box-shadow:var(--wa-shadow-level-1);">
    <div class="wa:block-flow:xl">
      <h2>You may also like</h2>
      <div class="wa:arrange:size-s">
      <div class="wa:block-flow:xs">
        <div class="wa:frame:landscape">
          <img src="https://images.pexels.com/photos/8843689/pexels-photo-8843689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="">
        </div>
        <div>
          <small><wa-format-date date="2023-12-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date></small>
        </div>
        <h4>Headline Dolor Sit Amet</h4>
      </div>
      <div class="wa:block-flow:xs">
        <div class="wa:frame:landscape">
          <img src="https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="">
        </div>
        <div>
          <small><wa-format-date date="2023-12-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date></small>
        </div>
        <h4>Headline Dolor Sit Amet</h4>
      </div>
      <div class="wa:block-flow:xs">
        <div class="wa:frame:landscape">
          <img src="https://images.pexels.com/photos/3184188/pexels-photo-3184188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="">
        </div>
        <div>
          <small><wa-format-date date="2023-12-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date></small>
        </div>
        <h4>Headline Dolor Sit Amet</h4>
      </div>
    </div>
    </div>
  </div>
</div>

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
</style>
