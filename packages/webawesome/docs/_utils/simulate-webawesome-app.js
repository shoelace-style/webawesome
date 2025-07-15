import nunjucks from 'nunjucks';

/**
 * This function simulates what a server would do running "on top" of eleventy.
 */
export function SimulateWebAwesomeApp(str) {
  return nunjucks.renderString(str, {
    // Stub the server EJS shortcodes.
    currentUser: {
      hasPro: false,
    },
    server: {
      head: '',
      loginOrAvatar: '',
      flashes: '',
    },
  });
}
