export default ({url, hasSw, manifest}) => ({
  'Served over HTTPS': isSecureDomain(url),
  'Has a Service Worker': hasSw,
  'Has a <code>name</code>': Boolean(manifest.name),
  'Has a <code>short_name</code>': Boolean(manifest.short_name),
  'Has a <code>start_url</code> that loads': Boolean(manifest.start_url),
  'Has a PNG icon of 192x192 or larger': true
})

function isSecureDomain (url) {
  try {
    const urlObj = new URL(url)
    if (urlObj.protocol === 'https:') {
      return true
    }
    if (urlObj.hostname === 'localhost') {
      return true
    }
  } catch (e) {}
  return false
}
