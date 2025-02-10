/**
 * Get elements that match a selector within an element’s shadow tree
 * and any parent shadow trees, all the way up to the light DOM
 * @param selector
 * @param node - The node to start the search from
 */
export default function recursiveQSA(selector: string, node: Node) {
  const ret: Element[] = [];

  for (let root = node; root.nodeType !== Node.DOCUMENT_NODE; ) {
    root = root.getRootNode();
    const elements = (root as ShadowRoot | Document).querySelectorAll(selector);

    ret.push(...elements);
  }

  return ret;
}
