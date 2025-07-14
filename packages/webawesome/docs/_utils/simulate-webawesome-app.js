import nunjucks from 'nunjucks';

export function SimulateWebAwesomeApp (str) {
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
