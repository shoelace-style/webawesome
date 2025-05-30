import { sample } from '../../scripts/util/array.js';
import { capitalize } from '../../scripts/util/string.js';
import PageCard from './page-card.js';
import { iconLibraries } from '/assets/data/icons.js';

const iconNames = [
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
const TOTAL_ICONS = ICON_GRID.columns * ICON_GRID.rows;

const template = `
	<page-card class="icons-card" :class="'icons-' + type + '-card'" :pro="$slots.default ? false : iconsMeta.isPro" :info="iconsMeta">
    <template #icon>
      <div slot="header" class="icons-icon" :class="'icons-' + type + '-icon'" :style="{ '--columns': ICON_GRID.columns }">
        <template v-for="icon of icons">
          <wa-icon v-bind="icon"></wa-icon>
        </template>
      </div>
    </template>
    <slot></slot>
	</page-card>
`;

const defaultDefaults = {
  library: 'default',
  family: 'classic',
  style: 'solid',
};

export default {
  props: {
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
    vary: {
      type: [Array, String],
      validate(value) {
        if (Array.isArray(value)) {
          return value.every(v => ['family', 'style'].includes(v));
        }

        return ['family', 'style'].includes(value);
      },
      default() {
        return [];
      },
    },
  },

  data() {
    return {};
  },

  created() {
    Object.assign(this, { iconNames, brands, ICON_GRID });
  },

  computed: {
    computedLibrary() {
      return this.library ?? 'default';
    },

    libraryMeta() {
      return iconLibraries[this.computedLibrary] ?? {};
    },

    defaultTitle() {
      let titles = {};
      for (let key in this.computed) {
        let value = this.computed[key];

        if (key === 'library') {
          titles[key] = iconLibraries[value]?.title;
        }

        titles[key] ??= capitalize(value);
      }

      if (this.type) {
        return titles[this.type];
      } else {
        return titles.library + ' ' + titles.family + ' • ' + titles.style;
      }
    },

    icons() {
      let { family, style } = this.computed;
      let library = this.libraryMeta;
      let vary = Array.isArray(this.vary) ? this.vary : [this.vary];

      let ret = [];

      if (vary.length > 0) {
        for (let param of vary) {
          let allValues = library[param];
          if (!allValues) return;
          let random = (allValues.random ??= []);

          while (random.length < TOTAL_ICONS) {
            random.push(sample(allValues));
          }
        }
      }

      while (ret.length < TOTAL_ICONS) {
        ret.push(
          ...iconNames.map((name, i) => {
            let index = ret.length + i;

            return {
              library: this.computedLibrary,
              name,
              family: !this.family && vary.includes('family') ? library.family.random[index] : family,
              variant: !this.style && vary.includes('style') ? library.style.random[index] : style,
            };
          }),
        );
      }

      return ret.slice(0, TOTAL_ICONS);
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
      return { title: this.defaultTitle };
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
