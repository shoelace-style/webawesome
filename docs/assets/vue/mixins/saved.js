import my from '/assets/scripts/my.js';
import Permalink from '/assets/scripts/permalink.js';

export default {
  data() {
    return {
      uid: undefined,
      saved: null,
      unsavedChanges: false,
      permalink: new Permalink(),
    };
  },

  created() {
    if (this.permalink.has('uid')) {
      this.uid = Number(this.permalink.get('uid'));
      this.saved = this.controller.saved.find(p => p.uid === this.uid);
    }

    this.controller.addEventListener('delete', ({ detail: entity }) => {
      if (entity.uid === this.saved?.uid) {
        this.postDelete();
      }
    });
  },

  mounted() {
    this.$nextTick().then(() => {
      if (!location.search || this.saved) {
        this.unsavedChanges = false;
      }
    });
  },

  computed: {
    controller() {
      return my[this.collection];
    },

    title() {
      if (this.saved) {
        return this.saved.title;
      } else if (this.unsavedChanges) {
        return this.defaultTitle;
      } else {
        return this.originalTitle;
      }
    },
  },

  watch: {
    saved: {
      deep: true,
      handler() {
        this.unsavedChanges = !this.saved;
      },
    },
  },

  methods: {
    async save({ title } = {}) {
      let uid = this.uid;

      this.saved ??= { uid: this.uid };
      this.saved.id = this.id;

      if (title) {
        // Renaming
        this.saved.title = title;
      } else {
        this.saved.title ??= this.defaultTitle;
      }

      this.saved.search = location.search;

      this.saved = this.controller.save(this.saved);

      if (uid !== this.saved.uid) {
        // UID changed (most likely from saving a new entity)
        this.uid = this.saved.uid;
        this.permalink.set('uid', this.uid);
        this.permalink.updateLocation();
        await this.$nextTick();
        this.save(); // Save again to update the search param to include the UID
      }

      this.unsavedChanges = false;
    },

    rename() {
      let newTitle = prompt('Title:', this.saved?.title ?? this.defaultTitle);

      if (newTitle && newTitle !== this.saved?.title) {
        this.save({ title: newTitle });
      }
    },

    // Cannot name this delete() because Vue complains
    deleteSaved() {
      this.controller.delete(this.saved);
    },

    postDelete() {
      this.saved = null;
      this.permalink.delete('uid');
      this.uid = undefined;
      this.permalink.updateLocation();
    },
  },
};
