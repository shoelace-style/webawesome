export default {
  eleventyComputed: {
    children(data) {
      let mainTag = data.tags?.[0];
      let collection = data.collections[mainTag] ?? [];

      return collection.filter(item => item.data.parent === data.page.fileSlug);
    },
  },
};
