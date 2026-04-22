const STORAGE_KEY = 'wa-install-tab';
const KNOWN_PANELS = ['cdn', 'npm', 'self-hosted', 'hosted', 'react'];
const FALLBACKS = { react: 'npm' };

function getGroups() {
  return document.querySelectorAll('wa-tab-group[data-install-tabs]');
}

function groupHasPanel(group, panelName) {
  return group.querySelector(`wa-tab[panel="${panelName}"]`) !== null;
}

function resolvePanelForGroup(group, panelName) {
  if (groupHasPanel(group, panelName)) return panelName;
  const fallback = FALLBACKS[panelName];
  if (fallback && groupHasPanel(group, fallback)) return fallback;
  return null;
}

const suppressed = new WeakMap();

function setGroupActive(group, panelName) {
  if (group.active === panelName) return;
  suppressed.set(group, panelName);
  group.active = panelName;
}

function applyStoredPreference() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored || !KNOWN_PANELS.includes(stored)) return;

  getGroups().forEach(group => {
    const resolved = resolvePanelForGroup(group, stored);
    if (resolved) setGroupActive(group, resolved);
  });
}

function handleTabShow(event) {
  const panelName = event.detail?.name;
  if (!panelName || !KNOWN_PANELS.includes(panelName)) return;

  const group = event.currentTarget;
  if (suppressed.get(group) === panelName) {
    suppressed.delete(group);
    return;
  }
  suppressed.delete(group);

  localStorage.setItem(STORAGE_KEY, panelName);

  getGroups().forEach(other => {
    if (other === group) return;
    const resolved = resolvePanelForGroup(other, panelName);
    if (resolved) setGroupActive(other, resolved);
  });
}

function bindGroups() {
  getGroups().forEach(group => {
    if (group.__installTabsBound) return;
    group.__installTabsBound = true;
    group.addEventListener('wa-tab-show', handleTabShow);
  });
}

function init() {
  applyStoredPreference();
  bindGroups();
}

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('turbo:load', init);
