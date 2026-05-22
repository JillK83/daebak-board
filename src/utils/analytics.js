export function track(eventName, payload = {}) {
  console.log('[analytics]', eventName, payload);
}
