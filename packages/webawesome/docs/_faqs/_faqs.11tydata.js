export default {
  permalink: false,
  layout: false,
  unlisted: true,
  tags: ['faq'],
  eleventyComputed: {
    topic: data => data.page.filePathStem.split('/').at(-2),
  },
};
