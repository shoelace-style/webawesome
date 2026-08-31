---
question: Why are form submissions missing my fields?
order: 30
synonyms: [form data, missing fields, formdata, name attribute, submit]
source: webawesome/docs/docs/form-controls.md (intro); webawesome/docs/docs/resources/migrating-from-shoelace.md ("Native Form Association", "Frequent Gotchas")
---
Check for a missing <code>name</code>. Web Awesome's form controls are form-associated custom elements, so they submit with a <code>&lt;form&gt;</code> the way native controls do: <code>new FormData(form)</code> reads them, <code>form.checkValidity()</code> includes them, <code>form.reset()</code> resets them. That also means the native rule applies: a control without a <code>name</code> attribute never lands in the submitted data. Add one to every <code>&lt;wa-input&gt;</code>, <code>&lt;wa-select&gt;</code>, <code>&lt;wa-checkbox&gt;</code>, and friend you expect to read back. <a href="/docs/form-controls">Form Controls</a> covers the rest, including validation.
