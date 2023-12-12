---
meta:
  title: Avatar
  description: Avatars are used to represent a person or object.
layout: component
---

By default, a generic icon will be shown. You can personalize avatars by adding custom icons, initials, and images. You should always provide a `label` for assistive devices.

```html:preview
<wa-avatar label="User avatar"></wa-avatar>
```

```jsx:react
import WaAvatar from '@shoelace-style/shoelace/dist/react/avatar';

const App = () => <WaAvatar label="User avatar" />;
```

## Examples

### Images

To use an image for the avatar, set the `image` and `label` attributes. This will take priority and be shown over initials and icons.
Avatar images can be lazily loaded by setting the `loading` attribute to `lazy`.

```html:preview
<wa-avatar
  image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  label="Avatar of a gray tabby kitten looking down"
></wa-avatar>
<wa-avatar
  image="https://images.unsplash.com/photo-1591871937573-74dbba515c4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  label="Avatar of a white and grey kitten on grey textile"
  loading="lazy"
></wa-avatar>
```

```jsx:react
import WaAvatar from '@shoelace-style/shoelace/dist/react/avatar';

const App = () => (
  <WaAvatar
    image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    label="Avatar of a gray tabby kitten looking down"
  />
  <WaAvatar
    image="https://images.unsplash.com/photo-1591871937573-74dbba515c4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    label="Avatar of a white and grey kitten on grey textile"
    loading="lazy"
  />
);
```

### Initials

When you don't have an image to use, you can set the `initials` attribute to show something more personalized than an icon.

```html:preview
<wa-avatar initials="WA" label="Avatar with initials: SL"></wa-avatar>
```

```jsx:react
import WaAvatar from '@shoelace-style/shoelace/dist/react/avatar';

const App = () => <WaAvatar initials="WA" label="Avatar with initials: SL" />;
```

### Custom Icons

When no image or initials are set, an icon will be shown. The default avatar shows a generic "user" icon, but you can customize this with the `icon` slot.

```html:preview
<wa-avatar label="Avatar with an image icon">
  <wa-icon slot="icon" name="image" variant="solid"></wa-icon>
</wa-avatar>

<wa-avatar label="Avatar with an archive icon">
  <wa-icon slot="icon" name="archive" variant="solid"></wa-icon>
</wa-avatar>

<wa-avatar label="Avatar with a briefcase icon">
  <wa-icon slot="icon" name="briefcase" variant="solid"></wa-icon>
</wa-avatar>
```

```jsx:react
import WaAvatar from '@shoelace-style/shoelace/dist/react/avatar';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <>
    <WaAvatar label="Avatar with an image icon">
      <WaIcon slot="icon" name="image" />
    </WaAvatar>

    <WaAvatar label="Avatar with an archive icon">
      <WaIcon slot="icon" name="archive" />
    </WaAvatar>

    <WaAvatar label="Avatar with a briefcase icon">
      <WaIcon slot="icon" name="briefcase" />
    </WaAvatar>
  </>
);
```

### Shapes

Avatars can be shaped using the `shape` attribute.

```html:preview
<wa-avatar shape="square" label="Square avatar"></wa-avatar>
<wa-avatar shape="rounded" label="Rounded avatar"></wa-avatar>
<wa-avatar shape="circle" label="Circle avatar"></wa-avatar>
```

```jsx:react
import WaAvatar from '@shoelace-style/shoelace/dist/react/avatar';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <>
    <WaAvatar shape="square" label="Square avatar" />
    <WaAvatar shape="rounded" label="Rounded avatar" />
    <WaAvatar shape="circle" label="Circle avatar" />
  </>
);
```

### Avatar Groups

You can group avatars with a few lines of CSS.

```html:preview
<div class="avatar-group">
  <wa-avatar
    image="https://images.unsplash.com/photo-1490150028299-bf57d78394e0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80&crop=right"
    label="Avatar 1 of 4"
  ></wa-avatar>

  <wa-avatar
    image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&crop=left&q=80"
    label="Avatar 2 of 4"
  ></wa-avatar>

  <wa-avatar
    image="https://images.unsplash.com/photo-1456439663599-95b042d50252?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&crop=left&q=80"
    label="Avatar 3 of 4"
  ></wa-avatar>

  <wa-avatar
    image="https://images.unsplash.com/flagged/photo-1554078875-e37cb8b0e27d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&crop=top&q=80"
    label="Avatar 4 of 4"
  ></wa-avatar>
</div>

<style>
  .avatar-group wa-avatar:not(:first-of-type) {
    margin-left: calc(-1 * var(--wa-space-m));
  }

  .avatar-group wa-avatar::part(base) {
    border: solid 2px var(--wa-color-surface-default);
  }
</style>
```

```jsx:react
import WaAvatar from '@shoelace-style/shoelace/dist/react/avatar';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const css = `
  .avatar-group wa-avatar:not(:first-of-type) {
    margin-left: calc(-1 * var(--wa-space-m));
  }

  .avatar-group wa-avatar::part(base) {
    border: solid 2px var(--wa-color-surface-default);
  }
`;

const App = () => (
  <>
    <div className="avatar-group">
      <WaAvatar
        image="https://images.unsplash.com/photo-1490150028299-bf57d78394e0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80&crop=right"
        label="Avatar 1 of 4"
      />

      <WaAvatar
        image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&crop=left&q=80"
        label="Avatar 2 of 4"
      />

      <WaAvatar
        image="https://images.unsplash.com/photo-1456439663599-95b042d50252?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&crop=left&q=80"
        label="Avatar 3 of 4"
      />

      <WaAvatar
        image="https://images.unsplash.com/flagged/photo-1554078875-e37cb8b0e27d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&crop=top&q=80"
        label="Avatar 4 of 4"
      />
    </div>

    <style>{css}</style>
  </>
);
```
