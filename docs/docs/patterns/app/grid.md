---
title: Grid
description: TODO
parent: app
tags: app
---

```html {.example}
  <div>
    <ul class="grid-list">
      <li>
        <wa-card>
          <div class="card-top">
            <div>
              <strong>John Carpenter</strong>
              <wa-badge pill>Admin</wa-badge>
              <p>Master of Horror</p>
            </div>
          <div>
            <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"label="Avatar of a gray tabby kitten looking down">
            </wa-avatar>
          </div>
          </div>
          <div class="contact-info">
            <div>
              <wa-icon name="envelope" style="color: var(--wa-color-brand-spot);"></wa-icon>
              Email
            </div>
            <div>
              <wa-icon name="phone" style="color: var(--wa-color-brand-spot);">
              </wa-icon>
              Phone
            </div>
          </div>
        </wa-card>
      </li>
      <li>
        <wa-card>
          <div class="card-top">
            <div>
              <strong>Tobe Hooper</strong>
              <wa-badge pill>Admin</wa-badge>
              <p>Master of Horror</p>
            </div>
          <div>
            <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" label="Avatar of a gray tabby kitten looking down"></wa-avatar>
            </div>
          </div>
          <div class="contact-info">
            <div><wa-icon name="envelope" style="color: var(--wa-color-brand-spot);"></wa-icon> Email</div>
            <div><wa-icon name="phone" style="color: var(--wa-color-brand-spot);"></wa-icon> Phone</div>
          </div>
        </wa-card>
      </li>
      <li>
        <wa-card>
          <div class="card-top">
            <div>
              <strong>George A. Romero</strong>
              <wa-badge pill>Admin</wa-badge>
              <p>Master of Horror</p>
              </div>
          <div><wa-avatar
  image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  label="Avatar of a gray tabby kitten looking down"
></wa-avatar>
</div>
          </div>
          <div class="contact-info">
            <div><wa-icon name="envelope" style="color: var(--wa-color-brand-spot);"></wa-icon> Email</div>
            <div><wa-icon name="phone" style="color: var(--wa-color-brand-spot);"></wa-icon> Phone</div>
          </div>
        </wa-card>
      </li>
      <li>
        <wa-card>
          <div class="card-top">
            <div>
              <strong>Alfred Hitchcock</strong>
              <wa-badge pill>Admin</wa-badge>
              <p>Master of Horror</p>
              </div>
          <div>
            <wa-avatar
  image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  label="Avatar of a gray tabby kitten looking down"
></wa-avatar>
</div>
          </div>

          <div class="contact-info">
            <div><wa-icon name="envelope" style="color: var(--wa-color-brand-spot);"></wa-icon> Email</div>
            <div><wa-icon name="phone" style="color: var(--wa-color-brand-spot);"></wa-icon> Phone</div>
          </div>
        </wa-card>
      </li>
      <li>
        <wa-card>
          <div class="card-top">
            <div>
              <strong>Sam Raimi</strong>
              <wa-badge pill>Admin</wa-badge>
              <p>Master of Horror</p>
            </div>
            <div>
              <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" label="Avatar of a gray tabby kitten looking down"></wa-avatar>
            </div>
          </div>
          <div class="contact-info">
            <div><wa-icon name="envelope" style="color: var(--wa-color-brand-spot);"></wa-icon> Email</div>
            <div><wa-icon name="phone" style="color: var(--wa-color-brand-spot);"></wa-icon> Phone</div>
          </div>
        </wa-card>
      </li>
      <li>
        <wa-card>
          <div class="card-top">
            <div>
              <strong>Wes Craven</strong>
              <wa-badge pill>Admin</wa-badge>
              <p>Master of Horror</p>
            </div>
          <div>
            <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" label="Avatar of a gray tabby kitten looking down"></wa-avatar>
            </div>
          </div>
          <div class="contact-info">
            <div><wa-icon name="envelope" style="color: var(--wa-color-brand-spot);"></wa-icon> Email</div>
            <div><wa-icon name="phone" style="color: var(--wa-color-brand-spot);"></wa-icon> Phone</div>
          </div>
        </wa-card>
      </li>
    </ul>
  </div>
  <style>
    .grid-list {
      wa-card {
        display: flex;
        flex-direction: column;
      }
      wa-card::part(body) {
        padding: 0;
      }

      .card-top {
        padding: var(--wa-space-xl);
        border-bottom: 1px solid var(--wa-color-surface-border);
        display: flex;
        justify-content: space-between;
      }

      .contact-info {
        div {
          width: 50%;
          padding: var(--wa-space-xl);
          display: flex;
          align-items: center;
          wa-icon {
            margin-right: .5rem;
          }
        }

        div:first-of-type {
          border-right: .25px solid var(--wa-color-surface-border);
        }
        div:last-of-type {
          border-left: .25px solid var(--wa-color-surface-border);
        }
        display: flex;
      }
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
      list-style-type: none;
      margin: 0;
    }
  </style>
```