import { css } from "lit"
export const styles = css`
[part~="sandbox-iframe"] {
  width: 100%;
  height: 100%;
  border: 1px solid darkgray;
}

[part~="sandbox"] {
  color:#272727;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, auto) minmax(0, 1fr);
}

[part~="summary"] {
  font-size: .8125rem;
  font-weight: bold;
  padding: 0.4rem 0.6rem;
}

[part~="summary"]:focus {
  outline: 2px solid blue;
}

[part~="sandbox-editor"] {
  display:grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  column-gap: 0;
  row-gap: 0;
  position: relative;
  padding-top: 3px;
  max-height: var(--textarea-height, 33vh);
}

[part~="textarea"] {
  position: relative;
  color: transparent;
  background-color: transparent;
  caret-color: black;
  z-index: 1;
  resize: vertical;
}

[part~="pre"] {
  height: var(--textarea-height, auto);
  width: var(--textarea-width, auto);
}

[part~="pre"],
[part~="textarea"] {
  grid-area:1/1/2/2;
  margin-bottom:0;
  min-height:15em;
  margin: 0;
  padding: 0;
	display: block;
	line-height: 1.5;
  padding: 8px;
  border: none;
  overflow: auto;
  position: relative;

  /* this creates line-wrapping. */
	word-break: break-word;
  white-space: pre-wrap;

  /* No wrapping */
	/* word-break: break-all; */
  /* white-space: pre; */
  tab-size: 2;
}

[part~="details"]:not(:first-child) {
  margin-top: 6px;
}

[part~="pre"],
[part~="code"] {
	color: #272727;
	background-color: #f7f7f7;
}

[part~="base"] {
	word-wrap: break-word;
	color: inherit;
	font-size: 1em;
}


[part~="sandbox"],
[part~="base"] {
  height: 100%;
}

[part~="pre"],
[part~="code"],
[part~="textarea"] {
	font-family: Menlo, Monaco, "Courier New", monospace;
	font-size: 0.875rem;
}

[part~="sandbox-iframe"] {
  aspect-ratio:auto;
  background-color: #fff;
  margin-bottom: 0;
}

[part~="base"],
[part~="pre"],
[part~="code"],
[part~="sandbox-iframe"] {
  border-radius:.25em;
}

[part~='sandbox-header'],
[part~="sandbox-console"],
[part~="sandbox-console-result"] {
  background-color:#343d4d;
  color: #fff;
}

[part~="sandbox-header"] {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8125em;
  border-top-right-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
}

[part~="sandbox-console"],
[part~="sandbox-content"] {
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  background-color: #e5e5e5;
}


[part~='sandbox-controls'] button {
  margin-bottom: 0;
}

[part~="sandbox-console-log"] {
  font-family: Menlo,Monaco,"Courier New",monospace;
  font-size: 0.875em;
  min-height: 1.2em;
}

.log-warn {
  color:#f9d767
}

.log-error {
  color:#f9c8c8
}

[part~="sandbox-header"],
[part~="sandbox-code"],
[part~="sandbox-iframe-wrapper"],
[part~="sandbox-console"],
[part~="sandbox-console-result"] {
  padding: 0.5em;
}

[part~="sandbox-code"] {
  max-height: 100%;
  overflow-y: auto;
}

button:where([part~="panel-resizer"]) {
  height: calc(100% - 0.5em);
  cursor: col-resize;
  background-color: white;
}

button[part~="panel-resizer"]:is(:active, :hover, .is-active) {
  cursor: col-resize;
}

[resizing],
[part~="panel-resizer"].is-active {
  cursor: col-resize;
}

[part~="sandbox-content"] {
  display:grid;
  grid-template-columns: minmax(0,var(--start-panel-width, 1fr)) minmax(0, auto) minmax(0, var(--end-panel-width, 1fr));
  grid-template-rows: minmax(0, 1fr);
}

[part~="sandbox-iframe-wrapper"] {
}

[part~="sandbox-console-result"] {
  border-top:1px solid #1f252f;
  border-bottom-left-radius:0;
}
`
