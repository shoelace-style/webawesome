import PageCard from './page-card.js';

const icons = [
  'web-awesome',
  'font-awesome',
  'triangle-exclamation',
  'heart',
  'image',
  'search',
  'star',
  'trash',
  'microphone',
  'sparkles',
  'sliders-simple',
  'bell',
];
const brands = new Set(['web-awesome', 'font-awesome']);
const ICON_GRID = { columns: 8, rows: 3 };

const template = `
	<page-card class="icons-card" :pro="$slots.default ? false : iconsMeta.isPro">
    <template #icon>
      <div slot="header" class="icons-icon" :style="{ '--columns': ICON_GRID.columns }">
        <template v-for="icon of iconsRepeated">
          <wa-icon :library="computed.library" :family="brands.has(icon) ? 'brands' : computed.family" :variant="computed.style" :name="icon"></wa-icon>
        </template>
      </div>
    </template>
    <slot>{{ title || iconsMeta.title }}</slot>
	</page-card>
`;

export default {
  props: {
    title: String,
    library: String,
    family: String,
    style: String,
  },

  data() {
    return {};
  },

  created() {
    Object.assign(this, { icons, brands, ICON_GRID });
  },

  computed: {
    iconsRepeated() {
      let total = ICON_GRID.columns * ICON_GRID.rows;
      let ret = [];
      while (ret.length < total) {
        ret.push(...icons);
      }

      return ret.slice(0, total);
    },

    computed() {
      let { library, family, style } = this;
      let ret = { library, family, style };
      ret.library ||= 'default';
      ret.family ||= 'classic';
      ret.style ||= 'solid';

      return ret;
    },
    iconsMeta() {
      // placeholder
      return {};
    },
  },

  template,
  components: {
    PageCard,
  },
  compilerOptions: {
    isCustomElement: tag => tag.startsWith('wa-'),
  },
};
