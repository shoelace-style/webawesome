/** Expands leading tabs to spaces, honoring tab stops. Spaces still count toward the next stop. */
function expandLeadingTabs(line: string, tabSize: number): string {
  return line.replace(/^[ \t]+/, whitespace => {
    let column = 0;
    let expanded = '';

    for (const char of whitespace) {
      const width = char === '\t' ? tabSize - (column % tabSize) : 1;
      expanded += ' '.repeat(width);
      column += width;
    }

    return expanded;
  });
}

/**
 * Removes blank lines from the start and end of the text and strips the common leading whitespace from the rest, like
 * Python's textwrap.dedent. The indent is the longest whitespace prefix every non-blank line shares, so tabs survive
 * and lines indented with different characters only lose what they have in common. Blank lines come back empty and
 * line endings are normalized to LF.
 *
 * Set tabSize to expand leading tabs to spaces first, which is what markdown parsers expect.
 */
export function dedent(text: string, options: { tabSize?: number } = {}): string {
  let lines = text.replace(/\r\n?/g, '\n').split('\n');

  if (options.tabSize) {
    lines = lines.map(line => expandLeadingTabs(line, options.tabSize!));
  }

  while (lines.length > 0 && lines[0].trim() === '') lines.shift();
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();

  const codeLines = lines.filter(line => line.trim() !== '');
  let indent = codeLines.length > 0 ? /^[ \t]*/.exec(codeLines[0])![0] : '';

  for (const line of codeLines) {
    let length = 0;
    while (length < indent.length && line[length] === indent[length]) length++;
    indent = indent.slice(0, length);
  }

  return lines.map(line => (line.trim() === '' ? '' : line.slice(indent.length))).join('\n');
}
