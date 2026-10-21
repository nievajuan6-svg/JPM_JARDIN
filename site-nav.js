(() => {
  const header = document.querySelector('header');
  const logoutButton = document.querySelector('[data-identity-logout]');

  function updateHeader() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 30);
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    }
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', updateHeader);

  const identity = window.netlifyIdentity;
  if (!identity || !logoutButton) return;

  const updateLogoutVisibility = (user) => {
    logoutButton.closest('li').hidden = !user;
  };

  updateLogoutVisibility(identity.currentUser());
  identity.on('init', updateLogoutVisibility);
  identity.on('logout', () => updateLogoutVisibility(null));

  logoutButton.addEventListener('click', () => identity.logout());
})();
