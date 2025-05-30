---
title: Form Control Validation
description: TODO
layout: page
---

Adding the `wa-valid` or `wa-invalid` class to a form control will change its appearance. This is useful for applying validation styles to server-rendered form controls.

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
  <div>
    <h3>Valid</h3>
    <wa-input class="wa-valid" label="Name" hint="Just a first name is fine" placeholder="Enter your name"></wa-input><br>
    <wa-select class="wa-valid" label="Choose one" hint="Make a choice already">
      <wa-option>There can be only one!</wa-option>
      <wa-option>Well, maybe two is OK</wa-option>
    </wa-select>
    <wa-textarea class="wa-valid" label="Bio" hint="Tell us about yourself" placeholder="Enter a bio"></wa-textarea><br>
    <wa-slider class="wa-valid" value="50" label="Volume" hint="Crank it up"></wa-slider><br>
    <wa-checkbox class="wa-valid" checked>I am awesome</wa-checkbox><br>
    <wa-checkbox class="wa-valid">So am I</wa-checkbox><br><br>
    <wa-switch class="wa-valid" checked>Still awesome</wa-switch><br>
    <wa-switch class="wa-valid">More awesome</wa-switch><br><br>
    <wa-radio-group class="wa-valid" label="Select an option" name="a" value="1">
      <wa-radio value="1">Option 1</wa-radio>
      <wa-radio value="2">Option 2</wa-radio>
      <wa-radio value="3">Option 3</wa-radio>
    </wa-radio-group><br>
    <wa-button variant="brand">Submit Form</wa-button>
  </div>
  <div>
    <h3>Invalid</h3>
    <wa-input class="wa-invalid" label="Name" hint="Just a first name is fine" placeholder="Enter your name"></wa-input><br>
    <wa-select class="wa-invalid" label="Choose one" hint="Make a choice already">
      <wa-option>There can be only one!</wa-option>
      <wa-option>Well, maybe two is OK</wa-option>
    </wa-select>
    <wa-textarea class="wa-invalid" label="Bio" hint="Tell us about yourself" placeholder="Enter a bio"></wa-textarea><br>
    <wa-slider class="wa-invalid" value="50" label="Volume" hint="Crank it up"></wa-slider><br>
    <wa-checkbox class="wa-invalid" checked>I am awesome</wa-checkbox><br>
    <wa-checkbox class="wa-invalid">So am I</wa-checkbox><br><br>
    <wa-switch class="wa-invalid" checked>Still awesome</wa-switch><br>
    <wa-switch class="wa-invalid">More awesome</wa-switch><br><br>
    <wa-radio-group class="wa-invalid" label="Select an option" name="a" value="1">
      <wa-radio value="1">Option 1</wa-radio>
      <wa-radio value="2">Option 2</wa-radio>
      <wa-radio value="3">Option 3</wa-radio>
    </wa-radio-group><br>
    <wa-button variant="brand">Submit Form</wa-button>
  </div>
</div>
