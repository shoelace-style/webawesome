export function cdnUrl (location, version) {
  return `https://early.webawesome.com/webawesome@${version}/dist/` + (location || '').replace(/^\//, '')
}
