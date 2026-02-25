'use strict';

(function () {
  const tabs   = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  function activateTab(targetId) {
    tabs.forEach(function (tab) {
      const isActive = tab.dataset.tab === targetId;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach(function (panel) {
      panel.classList.toggle('active', panel.id === targetId);
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activateTab(tab.dataset.tab);
    });

    // Keyboard navigation: arrow keys move between tabs
    tab.addEventListener('keydown', function (e) {
      const tabList = Array.from(tabs);
      const index   = tabList.indexOf(tab);
      if (e.key === 'ArrowRight') {
        tabList[(index + 1) % tabList.length].focus();
      } else if (e.key === 'ArrowLeft') {
        tabList[(index - 1 + tabList.length) % tabList.length].focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        activateTab(tab.dataset.tab);
      }
    });
  });
}());
