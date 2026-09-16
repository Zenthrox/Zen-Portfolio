const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.project-card');
const themeToggle = document.querySelector('#themeToggle');
const modal = document.querySelector('#projectModal');
const modalClose = document.querySelector('#modalClose');
const mobileMenuButton = document.querySelector('#mobileMenuButton');

const projectDetails = {
  northstar: {
    type: 'Operations platform / Case study 01',
    title: 'Northstar Console',
    description: 'A calm, real-time command center for distributed logistics teams. I shaped the product model, built the operational UI, and connected it to the team\'s existing data systems.',
    role: 'Lead engineer',
    outcome: '31% faster dispatch',
    tags: ['React', 'Node.js', 'Postgres']
  },
  signal: {
    type: 'Infrastructure / Case study 02',
    title: 'Signal Relay',
    description: 'Event-driven infrastructure that makes critical data feel instant. The system gave the team observable, resilient workflows from deploy to incident recovery.',
    role: 'Platform engineer',
    outcome: '99.99% uptime',
    tags: ['Go', 'AWS', 'Terraform']
  },
  relay: {
    type: 'Internal tooling / Case study 03',
    title: 'Relay Inbox',
    description: 'A smarter triage workflow that gave a support team its time back. I simplified the information architecture and automated the repetitive handoffs.',
    role: 'Product engineer',
    outcome: '12 hrs saved / week',
    tags: ['TypeScript', 'GraphQL', 'Redis']
  }
};

filterTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    filterTabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;

    projectCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.style.display = matches ? '' : 'none';
    });
  });
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀' : '◐';
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.main-nav a').forEach((item) => item.classList.remove('active'));
    if (link.hash) link.classList.add('active');
    document.body.classList.remove('menu-open');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
  });
});

function openProject(projectId) {
  const project = projectDetails[projectId];
  if (!project) return;
  document.querySelector('#modalType').textContent = project.type;
  document.querySelector('#modalTitle').textContent = project.title;
  document.querySelector('#modalDescription').textContent = project.description;
  document.querySelector('#modalRole').textContent = project.role;
  document.querySelector('#modalOutcome').textContent = project.outcome;
  document.querySelector('#modalTags').innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modalClose.focus();
}

function closeProject() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

projectCards.forEach((card) => {
  card.querySelector('.round-arrow').addEventListener('click', (event) => {
    event.preventDefault();
    openProject(card.dataset.project);
  });
});

modalClose.addEventListener('click', closeProject);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeProject();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) closeProject();
});

mobileMenuButton.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-open');
  mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
});
