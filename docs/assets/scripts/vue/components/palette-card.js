import PageCard from './page-card.js';
import { hues } from '/assets/scripts/tweak/data.js';
import palettes from '/docs/palettes/data.js';

// TODO import from data.js once available
const allHues = [...hues, 'gray'];

const template = `
	<page-card class="palette-card" :pro="$slots.default ? false : paletteMeta.isPro">
    <template #icon>
      <wa-scoped slot="header" class="palette-icon-host">
        <template>
          <link rel="stylesheet" :href="'/dist/styles/color/' + palette + '.css'">
          <link rel="stylesheet" href="/assets/styles/theme-icons.css">

          <div class="palette-icon" style="--hues: {{ hues|length }}; --suffixes: {{ suffixes|length }}">
            <template v-for="(hue, hueIndex) of hues">
              <div class="swatch" v-for="(suffix, suffixIndex) of suffixes"
                  :data-hue="hue" :data-suffix="suffix"
                  :style="{
                    '--color': 'var(--wa-color-' + hue + suffix + ')',
                    gridColumn: hueIndex + 1,
                    gridRow: suffixIndex + 1
                  }">&nbsp;</div>
            </template>
          </div>
        </template>
      </wa-scoped>
    </template>
    <slot>{{ title || paletteMeta.title }}</slot>
	</page-card>
`;

export default {
  props: {
    title: String,
    palette: String,
  },

  data() {
    return {};
  },

  created() {
    Object.assign(this, { hues: allHues, suffixes: ['-80', '', '-20'] });
  },

  computed: {
    paletteMeta() {
      return palettes[this.palette] ?? {};
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
