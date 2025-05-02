import { capitalize } from '../../util/string.js';
import PageCard from './page-card.js';
import { iconLibraries } from '/assets/data/icons.js';

const icons = [
  'user',
  'paper-plane',
  'face-laugh',
  'pen-to-square',
  'trash',
  'cart-shopping',
  'link',
  'sun',
  'bookmark',
  'sparkles',
  'thumbs-up',
  'gear',
];
const brands = new Set(['web-awesome', 'font-awesome']);
const ICON_GRID = { columns: 6, rows: 2 };

const template = `
	<page-card class="icons-card" :class="'icons-' + type + '-card'" :pro="$slots.default ? false : iconsMeta.isPro">
    <template #icon>
      <div slot="header" class="icons-icon" :class="'icons-' + type + '-icon'" :style="{ '--columns': ICON_GRID.columns }">
        <template v-for="icon of iconsRepeated">
          <wa-icon :library="computed.library" :family="brands.has(icon) ? 'brands' : computed.family" :variant="computed.style" :name="icon"></wa-icon>
        </template>
      </div>
    </template>
    <slot>{{ defaultTitle }}</slot>
	</page-card>
`;

const defaultDefaults = {
  library: 'default',
  family: 'classic',
  style: 'solid',
};

export default {
  props: {
    title: String,
    library: String,
    family: String,
    style: String,
    defaults: Object,
    type: {
      type: String,
      validate(value) {
        return ['library', 'family', 'style'].includes(value);
      },
    },
  },

  data() {
    return {};
  },

  created() {
    Object.assign(this, { icons, brands, ICON_GRID });
  },

  computed: {
    defaultTitle() {
      let titles = {};
      for (let key in this.computed) {
        let value = this.computed[key];

        if (key === 'library') {
          titles[key] = iconLibraries[value].title;
        }

        titles[key] ??= capitalize(value);
      }

      if (this.type) {
        return titles[this.type];
      } else {
        return titles.library + ' ' + titles.family + ' • ' + titles.style;
      }
    },

    iconsRepeated() {
      let total = ICON_GRID.columns * ICON_GRID.rows;
      let ret = [];
      while (ret.length < total) {
        ret.push(...icons);
      }

      return ret.slice(0, total);
    },

    computedDefaults() {
      return Object.assign({}, defaultDefaults, this.defaults);
    },

    computed() {
      let { library, family, style } = this;
      let ret = { library, family, style };

      for (let key in this.computedDefaults) {
        if (!ret[key]) {
          ret[key] = this.computedDefaults[key];
        }
      }

      return ret;
    },
    iconsMeta() {
      // placeholder
      return {};
    },
  },

  methods: {
    capitalize,
  },

  template,
  components: {
    PageCard,
  },
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
