import type { Node } from './types.js';

function transformNode(node: Node) {
  if (!node.value) return;

  const regex = /\B\[(#\d+)\]\B/g;

  if (!node.value.match(regex)) {
    return;
  }

  node.type = 'html';
  node.value = node.value.replace(
    regex,
    `<a href="https://github.com/shoelace-style/shoelace/issues/$1)">
    $1
  </a>`
  );
}

/**
 * A function to turn Github Issues into that looks like this: `[#1550]` into proper links.
 */
export default function GithubAutolink() {
  return function visit(node: Node) {
    if (!node) return;

    transformNode(node);

    if (!node.children?.length) return;

    for (const childNode of node.children) {
      transformNode(childNode);

      if (childNode.children?.length) {
        visit(childNode);
      }
    }
  };
}
