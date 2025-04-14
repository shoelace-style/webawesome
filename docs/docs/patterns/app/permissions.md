---
title: Permissions
description: 'Permission patterns provide or restrict access to users.'
isPro: true
---

## With Form Inputs
```html{.example}
<wa-card with-header style="max-width: 72ch; margin: 0 auto;">
  <div slot="header" class="wa-split">
    <h2 class="wa-heading-m">Invite Team Members</h2>
    <wa-icon name="close"></wa-icon>
  </div>
  <div class="wa-stack wa-gap-2xl">
    <div class="wa-align-items-end wa-flank:end wa-gap-2xs">
      <wa-input label="Email" placeholder="contact@example.com"></wa-input>
      <wa-button variant="success">Send Invite</wa-button>
    </div>

    <div class="wa-stack">
      <span class="wa-heading-s">Project Members</span>
      <div class="wa-stack wa-gap-xl">
        <div class="wa-flank">
          <wa-avatar label="User avatar" image="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
          <div class="wa-split">
            <div class="wa-stack wa-gap-0">
              <span class="wa-heading-xs">Jessica Jones</span>
              <span class="wa-caption-m" style="word-break: break-word">jessica.jones@example.com</span>
            </div>
            <wa-select value="owner">
              <wa-option value="owner">Owner</wa-option>
              <wa-option value="admin">Admin</wa-option>
              <wa-option value="can-edit">Can Edit</wa-option>
              <wa-option value="view-only">View Only</wa-option>
            </wa-select>
          </div>
        </div>
        <div class="wa-flank">
          <wa-avatar label="User avatar" image="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
          <div class="wa-split">
            <div class="wa-stack wa-gap-0">
              <span class="wa-heading-xs">Foggy Nelson</span>
              <span class="wa-caption-m" style="word-break: break-word">foggy.nelson@example.com</span>
            </div>
            <wa-select value="admin">
              <wa-option value="owner">Owner</wa-option>
              <wa-option value="admin">Admin</wa-option>
              <wa-option value="can-edit">Can Edit</wa-option>
              <wa-option value="view-only">View Only</wa-option>
            </wa-select>
          </div>
        </div>
        <div class="wa-flank">
          <wa-avatar label="User avatar" image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
          <div class="wa-split">
            <div class="wa-stack wa-gap-0">
              <span class="wa-heading-xs">Karen Page</span>
              <span class="wa-caption-m" style="word-break: break-word">karen.page@example.com</span>
            </div>
            <wa-select value="can-edit">
              <wa-option value="owner">Owner</wa-option>
              <wa-option value="admin">Admin</wa-option>
              <wa-option value="can-edit">Can Edit</wa-option>
              <wa-option value="view-only">View Only</wa-option>
            </wa-select>
          </div>
        </div>
        <div class="wa-flank">
          <wa-avatar label="User avatar" image="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
          <div class="wa-split">
            <div class="wa-stack wa-gap-0">
              <span class="wa-heading-xs">Matt Murdock</span>
              <span class="wa-caption-m" style="word-break: break-word">matt.murdock@example.com</span>
            </div>
            <wa-select value="view-only">
              <wa-option value="owner">Owner</wa-option>
              <wa-option value="admin">Admin</wa-option>
              <wa-option value="can-edit">Can Edit</wa-option>
              <wa-option value="view-only">View Only</wa-option>
            </wa-select>
          </div>
        </div>
      </div>
    </div>

    <div class="wa-align-items-end wa-flank:end wa-gap-2xs">
      <wa-input label="Share Link" value="https://sharelink3435re.com" disabled></wa-input>
      <wa-button variant="brand" appearance="filled outlined">
        <wa-icon slot="prefix" name="link" variant="solid"></wa-icon>
        Copy Link
      </wa-button>
    </div>
  </div>
</wa-card>
```

## Link Settings
```html {.example}
<wa-card style="max-width: 45ch; margin: 0 auto;">
  <div class="wa-stack">
     <h2 class="wa-heading-m">Manage Link</h2>
    <wa-input label="Expiration Date" type="date"></wa-input>
    <wa-radio-group
      label="Share Limit"
      orientation="horizontal"
      name="share-limit"
      value="0"
    >
      <wa-radio-button value="0">None</wa-radio-button>
      <wa-radio-button value="5">5</wa-radio-button>
      <wa-radio-button value="10">10</wa-radio-button>
      <wa-radio-button value="50">50</wa-radio-button>
      <wa-radio-button value="100">100</wa-radio-button>
    </wa-radio-group>
     <wa-divider></wa-divider>
    <wa-switch hint="Members are removed after logging out." checked>Temporary Access</wa-switch>
    <div class="wa-cluster wa-gap-xs" style="justify-content: flex-end">
    <wa-button size="small" appearance="outlined" pill>Cancel</wa-button>
    <wa-button size="small" variant="brand" pill>Generate</wa-button>
  </div>
  </div>

</wa-card>
```

## Role Settings
```html {.example}
<div style="max-width: 78ch; margin: 0 auto;">
  <h2>Settings</h2>
  <p>Update settings for this server.</p>
  <wa-tab-group>
  <wa-tab panel="general">
    <div class="wa-cluster">
      <wa-icon name="user"></wa-icon>
      <span>User Permissions</span>
    </div>
  </wa-tab>
  <wa-tab-panel name="general">
    <wa-card>
      <div class="wa-flank">
        <wa-avatar image="https://images.unsplash.com/photo-1741289308283-feba56f857cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYXJkfGVufDB8MnwwfHx8Mg%3D%3D" alt="image avatar"></wa-avatar>
        <div class="wa-split">
          <div class="wa-stack wa-gap-xs">
            <span class="wa-heading-s">Kris Kringle</span>
            <span class="wa-caption-m">Admin</span>
          </div>
          <wa-button appearance="plain">
            <wa-icon slot="prefix" name="edit"></wa-icon>
            Edit Profile
          </wa-button>
        </div>
      </div>
    </wa-card>
    <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
         <div class="wa-flank">
            <wa-avatar image="https://images.unsplash.com/photo-1579824894326-77ec5aaf8703?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHJlaW5kZWVyfGVufDB8MnwwfHx8Mg%3D%3D"></wa-avatar>
            <span class="wa-caption-m">Dasher</span>
          </div>
      </td>
      <td>
        <wa-select value="moderator">
          <wa-option value="moderator">Moderator</wa-option>
          <wa-option value="contributor">Contributor</wa-option>
          <wa-option value="reader">Reader</wa-option>
        </wa-select>
      </td>
    </tr>
    <tr>
      <td>
        <div class="wa-flank">
            <wa-avatar image="https://images.unsplash.com/photo-1691065686144-916ff29d1b4f?q=80&w=2666&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
            <span class="wa-caption-m">Dancer</span>
          </div>
      </td>

      <td>
        <wa-select value="moderator">
          <wa-option value="moderator">Moderator</wa-option>
          <wa-option value="contributor">Contributor</wa-option>
          <wa-option value="reader">Reader</wa-option>
        </wa-select>
      </td>
    </tr>
    <tr>
      <td>
        <div class="wa-flank">
            <wa-avatar image="https://images.unsplash.com/photo-1616742618872-9e8a890d90b2?q=80&w=2712&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
            <span class="wa-caption-m">Prancer</span>
          </div>
      </td>
      <td>
        <wa-select value="contributor">
          <wa-option value="moderator">Moderator</wa-option>
          <wa-option value="contributor">Contributor</wa-option>
          <wa-option value="reader">Reader</wa-option>
        </wa-select>
      </td>
    </tr>
    <tr>
      <td>
        <div class="wa-flank">
            <wa-avatar image="https://images.unsplash.com/photo-1728290403857-1b7909db2baa?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
            <span class="wa-caption-m">Vixen</span>
          </div>
      </td>
      <td>
        <wa-select value="reader">
          <wa-option value="moderator">Moderator</wa-option>
          <wa-option value="contributor">Contributor</wa-option>
          <wa-option value="reader">Reader</wa-option>
        </wa-select>
      </td>
    </tr>
  </tbody>
</table>
  </wa-tab-panel>

</wa-tab-group>
</div>
```