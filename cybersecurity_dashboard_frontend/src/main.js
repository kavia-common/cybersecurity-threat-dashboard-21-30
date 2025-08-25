import './style.css'

/**
 * Builds a modern, responsive cybersecurity dashboard UI with:
 * - Side navigation (left)
 * - Top header (search, filters, quick actions)
 * - Main area with visualization placeholders (bar/line/pie)
 * - Alerts summary panel with real-time styled alerts
 * - Threat detail modal/popup
 * - Auto light/dark theme using color-scheme
 * This is a static mockup to visualize the layout and styles.
 */

// Root element
const app = document.querySelector('#app')

// PUBLIC_INTERFACE
function buildDashboard() {
  /** Builds the dashboard DOM structure and wires minimal interactivity. */
  app.innerHTML = `
    <div class="cd-app">
      <aside class="cd-sidebar">
        <div class="cd-brand">
          <div class="cd-shield">🛡️</div>
          <div class="cd-brand-text">
            <span class="cd-title">Sentinel</span>
            <span class="cd-subtitle">Cyber Monitor</span>
          </div>
        </div>
        <nav class="cd-nav">
          <a class="cd-nav-item active" href="#"><span>Dashboard</span></a>
          <a class="cd-nav-item" href="#"><span>Incidents</span></a>
          <a class="cd-nav-item" href="#"><span>Assets</span></a>
          <a class="cd-nav-item" href="#"><span>Policies</span></a>
          <a class="cd-nav-item" href="#"><span>Reports</span></a>
          <div class="cd-nav-section">Administration</div>
          <a class="cd-nav-item" href="#"><span>Users</span></a>
          <a class="cd-nav-item" href="#"><span>Settings</span></a>
        </nav>
        <div class="cd-footnote">v0.1 • Mock UI</div>
      </aside>

      <div class="cd-main">
        <header class="cd-topbar">
          <div class="cd-top-left">
            <button class="cd-icon-btn" aria-label="Menu" id="menuToggle">☰</button>
            <h1 class="cd-page-title">Threat Overview</h1>
          </div>
          <div class="cd-top-right">
            <div class="cd-search">
              <input type="text" id="searchInput" placeholder="Search IP, hash, hostname..." aria-label="Search threats"/>
            </div>
            <div class="cd-filters">
              <select id="filterType" aria-label="Filter by type">
                <option value="all">All types</option>
                <option value="malware">Malware</option>
                <option value="phishing">Phishing</option>
                <option value="ransomware">Ransomware</option>
                <option value="bruteforce">Brute Force</option>
              </select>
              <select id="filterSeverity" aria-label="Filter by severity">
                <option value="all">All severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button class="cd-cta" id="applyFilters">Filter</button>
            </div>
            <button class="cd-icon-btn" aria-label="Notifications">🔔</button>
            <button class="cd-icon-btn" aria-label="Profile">👤</button>
          </div>
        </header>

        <section class="cd-content-grid">
          <div class="cd-charts">
            <div class="cd-card">
              <div class="cd-card-header">
                <h2>Threats by Severity</h2>
                <span class="cd-badge">Last 24h</span>
              </div>
              <div class="cd-chart cd-bar"></div>
            </div>

            <div class="cd-card">
              <div class="cd-card-header">
                <h2>Detections Over Time</h2>
                <span class="cd-badge secondary">Live</span>
              </div>
              <div class="cd-chart cd-line"></div>
            </div>

            <div class="cd-card">
              <div class="cd-card-header">
                <h2>Threat Type Distribution</h2>
                <span class="cd-badge muted">Sample</span>
              </div>
              <div class="cd-chart cd-pie"></div>
            </div>
          </div>

          <aside class="cd-alerts">
            <div class="cd-card cd-alerts-card">
              <div class="cd-card-header">
                <h2>Real-time Alerts</h2>
                <button class="cd-cta subtle" id="clearAlerts">Clear</button>
              </div>
              <div class="cd-alert-list" id="alertList">
                ${createAlertItem('Critical', 'Ransomware execution attempt blocked', 'ransomware', '10.0.3.14', 'critical')}
                ${createAlertItem('High', 'Suspicious lateral movement detected', 'bruteforce', '10.0.8.22', 'high')}
                ${createAlertItem('Medium', 'Phishing URL clicked by user', 'phishing', 'corp-laptop-17', 'medium')}
                ${createAlertItem('Low', 'Malware signature matched in cache', 'malware', '10.0.5.77', 'low')}
              </div>
            </div>

            <div class="cd-card cd-summary-card">
              <div class="cd-stat">
                <div class="cd-stat-label">Open Incidents</div>
                <div class="cd-stat-value">27</div>
                <div class="cd-stat-trend up">+3 today</div>
              </div>
              <div class="cd-stat">
                <div class="cd-stat-label">Critical</div>
                <div class="cd-stat-value cd-critical">4</div>
                <div class="cd-stat-trend flat">0 today</div>
              </div>
              <div class="cd-stat">
                <div class="cd-stat-label">MTTD</div>
                <div class="cd-stat-value">4m</div>
                <div class="cd-stat-trend down">-15%</div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>

    <div class="cd-modal" id="threatModal" aria-hidden="true" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDesc">
      <div class="cd-modal-backdrop" data-close-modal></div>
      <div class="cd-modal-content" role="document">
        <div class="cd-modal-header">
          <h3 id="modalTitle">Threat Detail</h3>
          <button class="cd-icon-btn" aria-label="Close" data-close-modal>✖</button>
        </div>
        <div class="cd-modal-body" id="modalDesc">
          <div class="cd-modal-grid">
            <div><strong>Severity:</strong> <span id="modalSeverity" class="cd-sev-tag">High</span></div>
            <div><strong>Type:</strong> <span id="modalType">Malware</span></div>
            <div><strong>Source:</strong> <span id="modalSource">10.0.8.22</span></div>
            <div><strong>Time:</strong> <span id="modalTime">2025-08-25 14:31 UTC</span></div>
          </div>
          <p id="modalMessage" class="cd-modal-message">Suspicious process injection detected on host corp-laptop-17.</p>
          <div class="cd-modal-actions">
            <button class="cd-cta">Isolate Host</button>
            <button class="cd-cta outline">Block IOC</button>
            <button class="cd-cta subtle" data-close-modal>Close</button>
          </div>
        </div>
      </div>
    </div>
  `

  wireInteractions()
}

function createAlertItem(title, message, type, source, severity) {
  const sevClass = `sev-${severity}`
  return `
    <div class="cd-alert ${sevClass}" tabindex="0" role="button" data-open-modal
         data-title="${escapeHtml(title)}"
         data-message="${escapeHtml(message)}"
         data-type="${escapeHtml(type)}"
         data-source="${escapeHtml(source)}"
         data-severity="${escapeHtml(severity)}">
      <div class="cd-alert-header">
        <span class="cd-chip ${sevClass}">${title}</span>
        <span class="cd-alert-time">just now</span>
      </div>
      <div class="cd-alert-body">
        <div class="cd-alert-text">${message}</div>
        <div class="cd-alert-meta">
          <span class="cd-meta">Type: ${type}</span>
          <span class="cd-dot">•</span>
          <span class="cd-meta">Source: ${source}</span>
        </div>
      </div>
    </div>
  `
}

function wireInteractions() {
  // Sidebar toggler (mobile)
  const menuToggle = document.getElementById('menuToggle')
  menuToggle?.addEventListener('click', () => {
    document.querySelector('.cd-sidebar')?.classList.toggle('open')
  })

  // Filter mock
  document.getElementById('applyFilters')?.addEventListener('click', () => {
    const t = document.getElementById('filterType').value
    const s = document.getElementById('filterSeverity').value
    const q = document.getElementById('searchInput').value
    // For mockup, just flash a small effect
    flashBadge(`Filter applied: ${t}/${s}${q ? ` • "${q}"` : ''}`)
  })

  // Clear alerts mock
  document.getElementById('clearAlerts')?.addEventListener('click', () => {
    const list = document.getElementById('alertList')
    list.innerHTML = ''
    flashBadge('Alerts cleared')
  })

  // Modal open/close
  const modal = document.getElementById('threatModal')
  const openers = document.querySelectorAll('[data-open-modal]')
  openers.forEach((el) => {
    el.addEventListener('click', () => openModalFromAlert(el, modal))
    el.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openModalFromAlert(el, modal)
      }
    })
  })
  modal.addEventListener('click', (e) => {
    const target = e.target
    if (target.matches('[data-close-modal]') || target.classList.contains('cd-modal')) {
      closeModal(modal)
    }
  })
}

function openModalFromAlert(srcEl, modal) {
  const severity = srcEl.getAttribute('data-severity') || 'medium'
  const type = srcEl.getAttribute('data-type') || 'unknown'
  const message = srcEl.getAttribute('data-message') || 'N/A'
  const source = srcEl.getAttribute('data-source') || 'N/A'
  const title = srcEl.getAttribute('data-title') || 'Threat Detail'

  modal.querySelector('#modalTitle').textContent = title
  modal.querySelector('#modalMessage').textContent = message
  modal.querySelector('#modalType').textContent = capitalize(type)
  modal.querySelector('#modalSource').textContent = source
  modal.querySelector('#modalSeverity').textContent = capitalize(severity)
  modal.querySelector('#modalSeverity').className = `cd-sev-tag sev-${severity}`

  modal.setAttribute('aria-hidden', 'false')
  modal.classList.add('open')
}

function closeModal(modal) {
  modal.classList.remove('open')
  modal.setAttribute('aria-hidden', 'true')
}

function flashBadge(text) {
  const badge = document.createElement('div')
  badge.className = 'cd-toast'
  badge.textContent = text
  document.body.appendChild(badge)
  setTimeout(() => badge.classList.add('show'), 10)
  setTimeout(() => {
    badge.classList.remove('show')
    setTimeout(() => badge.remove(), 250)
  }, 2000)
}

function capitalize(s) {
  return (s || '').charAt(0).toUpperCase() + (s || '').slice(1)
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

buildDashboard()
