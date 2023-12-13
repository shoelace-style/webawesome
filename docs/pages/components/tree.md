---
meta:
  title: Tree
  description: Trees allow you to display a hierarchical list of selectable tree items. Items with children can be expanded and collapsed as desired by the user.
layout: component
---

```html:preview
<wa-tree>
  <wa-tree-item>
    Deciduous
    <wa-tree-item>Birch</wa-tree-item>
    <wa-tree-item>
      Maple
      <wa-tree-item>Field maple</wa-tree-item>
      <wa-tree-item>Red maple</wa-tree-item>
      <wa-tree-item>Sugar maple</wa-tree-item>
    </wa-tree-item>
    <wa-tree-item>Oak</wa-tree-item>
  </wa-tree-item>

  <wa-tree-item>
    Coniferous
    <wa-tree-item>Cedar</wa-tree-item>
    <wa-tree-item>Pine</wa-tree-item>
    <wa-tree-item>Spruce</wa-tree-item>
  </wa-tree-item>

  <wa-tree-item>
    Non-trees
    <wa-tree-item>Bamboo</wa-tree-item>
    <wa-tree-item>Cactus</wa-tree-item>
    <wa-tree-item>Fern</wa-tree-item>
  </wa-tree-item>
</wa-tree>
```

<!-- prettier-ignore -->
```jsx:react
import WaTree from '@shoelace-style/shoelace/dist/react/tree';
import WaTreeItem from '@shoelace-style/shoelace/dist/react/tree-item';

const App = () => (
  <WaTree>
    <WaTreeItem>
      Deciduous
      <WaTreeItem>Birch</WaTreeItem>
      <WaTreeItem>
        Maple
        <WaTreeItem>Field maple</WaTreeItem>
        <WaTreeItem>Red maple</WaTreeItem>
        <WaTreeItem>Sugar maple</WaTreeItem>
      </WaTreeItem>
      <WaTreeItem>Oak</WaTreeItem>
    </WaTreeItem>

    <WaTreeItem>
      Coniferous
      <WaTreeItem>Cedar</WaTreeItem>
      <WaTreeItem>Pine</WaTreeItem>
      <WaTreeItem>Spruce</WaTreeItem>
    </WaTreeItem>

    <WaTreeItem>
      Non-trees
      <WaTreeItem>Bamboo</WaTreeItem>
      <WaTreeItem>Cactus</WaTreeItem>
      <WaTreeItem>Fern</WaTreeItem>
    </WaTreeItem>
  </WaTree>
);
```

## Examples

### Selection Modes

The `selection` attribute lets you change the selection behavior of the tree.

- Use `single` to allow the selection of a single item (default).
- Use `multiple` to allow the selection of multiple items.
- Use `leaf` to only allow leaf nodes to be selected.

```html:preview
<wa-select id="selection-mode" value="single" label="Selection">
  <wa-option value="single">Single</wa-option>
  <wa-option value="multiple">Multiple</wa-option>
  <wa-option value="leaf">Leaf</wa-option>
</wa-select>

<br />

<wa-tree class="tree-selectable">
  <wa-tree-item>
    Item 1
    <wa-tree-item>
      Item A
      <wa-tree-item>Item Z</wa-tree-item>
      <wa-tree-item>Item Y</wa-tree-item>
      <wa-tree-item>Item X</wa-tree-item>
    </wa-tree-item>
    <wa-tree-item>Item B</wa-tree-item>
    <wa-tree-item>Item C</wa-tree-item>
  </wa-tree-item>
  <wa-tree-item>Item 2</wa-tree-item>
  <wa-tree-item>Item 3</wa-tree-item>
</wa-tree>

<script>
  const selectionMode = document.querySelector('#selection-mode');
  const tree = document.querySelector('.tree-selectable');

  selectionMode.addEventListener('wa-change', () => {
    tree.querySelectorAll('wa-tree-item').forEach(item => (item.selected = false));
    tree.selection = selectionMode.value;
  });
</script>
```

<!-- prettier-ignore -->
```jsx:react
import WaTree from '@shoelace-style/shoelace/dist/react/tree';
import WaTreeItem from '@shoelace-style/shoelace/dist/react/tree-item';

const App = () => {
  const [selection, setSelection] = useState('single');

  return (
    <>
      <WaSelect label="Selection" value={selection} onWaChange={event => setSelection(event.target.value)}>
        <WaMenuItem value="single">single</WaMenuItem>
        <WaMenuItem value="multiple">multiple</WaMenuItem>
        <WaMenuItem value="leaf">leaf</WaMenuItem>
      </WaSelect>

      <br />

      <WaTree selection={selection}>
        <WaTreeItem>
          Item 1
          <WaTreeItem>
            Item A
            <WaTreeItem>Item Z</WaTreeItem>
            <WaTreeItem>Item Y</WaTreeItem>
            <WaTreeItem>Item X</WaTreeItem>
          </WaTreeItem>
          <WaTreeItem>Item B</WaTreeItem>
          <WaTreeItem>Item C</WaTreeItem>
        </WaTreeItem>
        <WaTreeItem>Item 2</WaTreeItem>
        <WaTreeItem>Item 3</WaTreeItem>
      </WaTree>
    </>
  );
};
```

### Showing Indent Guides

Indent guides can be drawn by setting `--indent-guide-width`. You can also change the color, offset, and style, using `--indent-guide-color`, `--indent-guide-style`, and `--indent-guide-offset`, respectively.

```html:preview
<wa-tree class="tree-with-lines">
  <wa-tree-item expanded>
    Deciduous
    <wa-tree-item>Birch</wa-tree-item>
    <wa-tree-item expanded>
      Maple
      <wa-tree-item>Field maple</wa-tree-item>
      <wa-tree-item>Red maple</wa-tree-item>
      <wa-tree-item>Sugar maple</wa-tree-item>
    </wa-tree-item>
    <wa-tree-item>Oak</wa-tree-item>
  </wa-tree-item>

  <wa-tree-item>
    Coniferous
    <wa-tree-item>Cedar</wa-tree-item>
    <wa-tree-item>Pine</wa-tree-item>
    <wa-tree-item>Spruce</wa-tree-item>
  </wa-tree-item>

  <wa-tree-item>
    Non-trees
    <wa-tree-item>Bamboo</wa-tree-item>
    <wa-tree-item>Cactus</wa-tree-item>
    <wa-tree-item>Fern</wa-tree-item>
  </wa-tree-item>
</wa-tree>

<style>
  .tree-with-lines {
    --indent-guide-width: 1px;
  }
</style>
```

{% raw %}

<!-- prettier-ignore -->
```jsx:react
import WaTree from '@shoelace-style/shoelace/dist/react/tree';
import WaTreeItem from '@shoelace-style/shoelace/dist/react/tree-item';

const App = () => (
  <WaTree class="tree-with-lines" style={{ '--indent-guide-width': '1px' }}>
    <WaTreeItem expanded>
      Deciduous
      <WaTreeItem>Birch</WaTreeItem>
      <WaTreeItem expanded>
        Maple
        <WaTreeItem>Field maple</WaTreeItem>
        <WaTreeItem>Red maple</WaTreeItem>
        <WaTreeItem>Sugar maple</WaTreeItem>
      </WaTreeItem>
      <WaTreeItem>Oak</WaTreeItem>
    </WaTreeItem>

    <WaTreeItem>
      Coniferous
      <WaTreeItem>Cedar</WaTreeItem>
      <WaTreeItem>Pine</WaTreeItem>
      <WaTreeItem>Spruce</WaTreeItem>
    </WaTreeItem>

    <WaTreeItem>
      Non-trees
      <WaTreeItem>Bamboo</WaTreeItem>
      <WaTreeItem>Cactus</WaTreeItem>
      <WaTreeItem>Fern</WaTreeItem>
    </WaTreeItem>
  </WaTree>
);
```

{% endraw %}

### Lazy Loading

Use the `lazy` attribute on a tree item to indicate that the content is not yet present and will be loaded later. When the user tries to expand the node, the `loading` state is set to `true` and the `wa-lazy-load` event will be emitted to allow you to load data asynchronously. The item will remain in a loading state until its content is changed.

If you want to disable this behavior after the first load, simply remove the `lazy` attribute and, on the next expand, the existing content will be shown instead.

```html:preview
<wa-tree>
  <wa-tree-item lazy>Available Trees</wa-tree-item>
</wa-tree>

<script type="module">
  const lazyItem = document.querySelector('wa-tree-item[lazy]');

  lazyItem.addEventListener('wa-lazy-load', () => {
    // Simulate asynchronous loading
    setTimeout(() => {
      const subItems = ['Birch', 'Cedar', 'Maple', 'Pine'];

      for (const item of subItems) {
        const treeItem = document.createElement('wa-tree-item');
        treeItem.innerText = item;
        lazyItem.append(treeItem);
      }

      // Disable lazy mode once the content has been loaded
      lazyItem.lazy = false;
    }, 1000);
  });
</script>
```

```jsx:react
import WaTree from '@shoelace-style/shoelace/dist/react/tree';
import WaTreeItem from '@shoelace-style/shoelace/dist/react/tree-item';

const App = () => {
  const [childItems, setChildItems] = useState([]);
  const [lazy, setLazy] = useState(true);

  const handleLazyLoad = () => {
    // Simulate asynchronous loading
    setTimeout(() => {
      setChildItems(['Birch', 'Cedar', 'Maple', 'Pine']);

      // Disable lazy mode once the content has been loaded
      setLazy(false);
    }, 1000);
  };

  return (
    <WaTree>
      <WaTreeItem lazy={lazy} onWaLazyLoad={handleLazyLoad}>
        Available Trees
        {childItems.map(item => (
          <WaTreeItem>{item}</WaTreeItem>
        ))}
      </WaTreeItem>
    </WaTree>
  );
};
```

### Customizing the Expand and Collapse Icons

Use the `expand-icon` and `collapse-icon` slots to change the expand and collapse icons, respectively. To disable the animation, override the `rotate` property on the `expand-button` part as shown below.

```html:preview
<wa-tree class="custom-icons">
  <wa-icon name="square-plus" variant="solid" slot="expand-icon"></wa-icon>
  <wa-icon name="square-minus" variant="solid" slot="collapse-icon"></wa-icon>

  <wa-tree-item>
    Deciduous
    <wa-tree-item>Birch</wa-tree-item>
    <wa-tree-item>
      Maple
      <wa-tree-item>Field maple</wa-tree-item>
      <wa-tree-item>Red maple</wa-tree-item>
      <wa-tree-item>Sugar maple</wa-tree-item>
    </wa-tree-item>
    <wa-tree-item>Oak</wa-tree-item>
  </wa-tree-item>

  <wa-tree-item>
    Coniferous
    <wa-tree-item>Cedar</wa-tree-item>
    <wa-tree-item>Pine</wa-tree-item>
    <wa-tree-item>Spruce</wa-tree-item>
  </wa-tree-item>

  <wa-tree-item>
    Non-trees
    <wa-tree-item>Bamboo</wa-tree-item>
    <wa-tree-item>Cactus</wa-tree-item>
    <wa-tree-item>Fern</wa-tree-item>
  </wa-tree-item>
</wa-tree>

<style>
  .custom-icons wa-tree-item::part(expand-button) {
    /* Disable the expand/collapse animation */
    rotate: none;
  }
</style>
```

<!-- prettier-ignore -->
```jsx:react
import WaTree from '@shoelace-style/shoelace/dist/react/tree';
import WaTreeItem from '@shoelace-style/shoelace/dist/react/tree-item';

const App = () => (
  <WaTree>
    <WaIcon name="square-plus" variant="solid" slot="expand-icon"></WaIcon>
    <WaIcon name="square-minus" variant="solid" slot="collapse-icon"></WaIcon>

    <WaTreeItem>
      Deciduous
      <WaTreeItem>Birch</WaTreeItem>
      <WaTreeItem>
        Maple
        <WaTreeItem>Field maple</WaTreeItem>
        <WaTreeItem>Red maple</WaTreeItem>
        <WaTreeItem>Sugar maple</WaTreeItem>
      </WaTreeItem>
      <WaTreeItem>Oak</WaTreeItem>
    </WaTreeItem>

    <WaTreeItem>
      Coniferous
      <WaTreeItem>Cedar</WaTreeItem>
      <WaTreeItem>Pine</WaTreeItem>
      <WaTreeItem>Spruce</WaTreeItem>
    </WaTreeItem>

    <WaTreeItem>
      Non-trees
      <WaTreeItem>Bamboo</WaTreeItem>
      <WaTreeItem>Cactus</WaTreeItem>
      <WaTreeItem>Fern</WaTreeItem>
    </WaTreeItem>
  </WaTree>
);
```

### With Icons

Decorative icons can be used before labels to provide hints for each node.

```html:preview
<wa-tree class="tree-with-icons">
  <wa-tree-item expanded>
    <wa-icon name="folder" variant="regular"></wa-icon>
    Documents

    <wa-tree-item>
      <wa-icon name="folder" variant="regular"> </wa-icon>
      Photos
      <wa-tree-item>
        <wa-icon name="image" variant="regular"></wa-icon>
        birds.jpg
      </wa-tree-item>
      <wa-tree-item>
        <wa-icon name="image" variant="regular"></wa-icon>
        kitten.jpg
      </wa-tree-item>
      <wa-tree-item>
        <wa-icon name="image" variant="regular"></wa-icon>
        puppy.jpg
      </wa-tree-item>
    </wa-tree-item>

    <wa-tree-item>
      <wa-icon name="folder" variant="regular"></wa-icon>
      Writing
      <wa-tree-item>
        <wa-icon name="file" variant="regular"></wa-icon>
        draft.txt
      </wa-tree-item>
      <wa-tree-item>
        <wa-icon name="file-pdf" variant="regular"></wa-icon>
        final.pdf
      </wa-tree-item>
      <wa-tree-item>
        <wa-icon name="file-lines" variant="regular"></wa-icon>
        sales.xls
      </wa-tree-item>
    </wa-tree-item>
  </wa-tree-item>
</wa-tree>
```

```jsx:react
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';
import WaTree from '@shoelace-style/shoelace/dist/react/tree';
import WaTreeItem from '@shoelace-style/shoelace/dist/react/tree-item';

const App = () => {
  return (
    <WaTree class="tree-with-icons">
      <WaTreeItem expanded>
        <WaIcon name="folder" />
        Root
        <WaTreeItem>
          <WaIcon name="folder" />
          Folder 1<WaTreeItem>
            <WaIcon name="files" />
            File 1 - 1
          </WaTreeItem>
          <WaTreeItem disabled>
            <WaIcon name="files" />
            File 1 - 2
          </WaTreeItem>
          <WaTreeItem>
            <WaIcon name="files" />
            File 1 - 3
          </WaTreeItem>
        </WaTreeItem>
        <WaTreeItem>
          <WaIcon name="files" />
          Folder 2<WaTreeItem>
            <WaIcon name="files" />
            File 2 - 1
          </WaTreeItem>
          <WaTreeItem>
            <WaIcon name="files" />
            File 2 - 2
          </WaTreeItem>
        </WaTreeItem>
        <WaTreeItem>
          <WaIcon name="files" />
          File 1
        </WaTreeItem>
      </WaTreeItem>
    </WaTree>
  );
};
```
