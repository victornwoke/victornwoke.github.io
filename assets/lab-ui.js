(function () {
  const themeToggle = document.querySelector("#theme-toggle");
  const themeToggleLabel = document.querySelector("#theme-toggle-label");
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector("#site-nav");

  function currentTheme() {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    if (themeToggle && themeToggleLabel) {
      const nextTheme = theme === "dark" ? "light" : "dark";
      themeToggleLabel.textContent = nextTheme === "dark" ? "Dark" : "Light";
      themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    }
  }

  applyTheme(currentTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      localStorage.setItem("victor-theme", nextTheme);
    });
  }

  function setActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll("[data-nav]").forEach((link) => {
      const key = link.dataset.nav;
      const isActive =
        (key === "products" && path.startsWith("/products/") && !path.startsWith("/products/vibedeploy/")) ||
        (key === "projects" && path.startsWith("/projects/") && !path.startsWith("/projects/vibedeploy/")) ||
        (key === "vibedeploy" && path.includes("/vibedeploy/"));
      link.classList.toggle("is-active", isActive);
    });
  }

  setActiveNav();

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    siteNav.addEventListener("click", (event) => {
      if (!event.target.closest("a")) return;
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    });
  }

  function statusClass(status) {
    if (status.includes("Live")) return "live";
    if (status.includes("Coming") || status.includes("Planned")) return "soon";
    if (status.includes("MVP") || status.includes("Demo") || status.includes("Experiment")) return "beta";
    return "";
  }

  function tagsMarkup(tags) {
    return arrayFrom(tags).map((tag) => `<span class="tag">${tag}</span>`).join("");
  }

  function titleOf(item) {
    return item.title || item.name;
  }

  function validLink(url) {
    if (!url || typeof url !== "string") return false;
    const value = url.trim().toLowerCase();
    return value && value !== "private" && value !== "null" && value !== "#";
  }

  function isPrivateLink(url) {
    return typeof url === "string" && url.trim().toLowerCase() === "private";
  }

  function buttonMarkup(ctas) {
    return ctas
      .slice(0, 2)
      .map(
        (cta, index) =>
          `<a class="text-link ${cta.priority === "primary" || index === 0 ? "primary" : ""}" href="${cta.href}">${cta.label}</a>`
      )
      .join("");
  }

  function shortList(items, maxItems = 4) {
    const values = arrayFrom(items);
    if (!values.length) return "";
    const visible = values.slice(0, maxItems).join(", ");
    const remaining = values.length - maxItems;
    return remaining > 0 ? `${visible} +${remaining} more` : visible;
  }

  function itemCtas(item, type) {
    const ctas = [];

    if (type === "product") {
      if (validLink(item.productUrl)) {
        ctas.push({ label: item.slug === "vibedeploy" ? "Open Product Page" : "View Product", href: item.productUrl, priority: "primary" });
      }
      if (validLink(item.liveUrl)) ctas.push({ label: "Open Live App", href: item.liveUrl, priority: "secondary" });
      if (validLink(item.githubUrl)) ctas.push({ label: "View GitHub", href: item.githubUrl, priority: "secondary" });
      if (isPrivateLink(item.githubUrl) && item.githubAccess === "request") {
        ctas.push({ label: "Request Access", href: "/#contact", priority: "secondary" });
      }
      if (validLink(item.demoUrl)) ctas.push({ label: "View Demo", href: item.demoUrl, priority: "secondary" });
      if (validLink(item.docsUrl)) ctas.push({ label: "View Docs", href: item.docsUrl, priority: "secondary" });
    } else {
      if (validLink(item.projectUrl)) ctas.push({ label: "View Case Study", href: item.projectUrl, priority: "primary" });
      if (validLink(item.githubUrl)) ctas.push({ label: "View GitHub", href: item.githubUrl, priority: "secondary" });
      if (isPrivateLink(item.githubUrl) && item.githubAccess === "request") {
        ctas.push({ label: "Request Access", href: "/#contact", priority: "secondary" });
      }
      if (validLink(item.architectureUrl)) ctas.push({ label: "View Architecture", href: item.architectureUrl, priority: "secondary" });
      if (validLink(item.liveDemoUrl)) ctas.push({ label: "View Demo", href: item.liveDemoUrl, priority: "secondary" });
      if (validLink(item.articleUrl)) ctas.push({ label: "Read Article", href: item.articleUrl, priority: "secondary" });
    }

    arrayFrom(item.ctas).forEach((cta) => {
      if (validLink(cta.href)) ctas.push(cta);
    });

    const seen = new Set();
    return ctas.filter((cta) => {
      const key = `${cta.label}|${cta.href}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function card(item, type) {
    const isProduct = type === "product";
    const details = isProduct
      ? `
        <div class="detail">
          <span class="mini-label">Target User</span>
          <p>${item.targetUser}</p>
        </div>
        <div class="detail">
          <span class="mini-label">Monetization</span>
          <p>${item.monetization}</p>
        </div>
      `
      : `
        <div class="detail">
          <span class="mini-label">Problem Solved</span>
          <p>${item.problemSolved}</p>
        </div>
        <div class="detail">
          <span class="mini-label">Tools</span>
          <p>${shortList(item.tools)}</p>
        </div>
      `;

    return `
      <article class="card ${isProduct ? "" : "engineering"}">
        <div class="card-body">
          <div class="meta-row">
            <span class="pill ${statusClass(item.status)}">${item.status}</span>
            <span class="pill">${item.category}</span>
          </div>
          <h3>${titleOf(item)}</h3>
          <p>${item.description}</p>
          <div class="product-details">${details}</div>
          <div class="tags">${tagsMarkup(item.tags)}</div>
          <div class="link-row">${buttonMarkup(itemCtas(item, type))}</div>
        </div>
      </article>
    `;
  }

  function renderFilters(filters, activeFilter) {
    const filtersEl = document.querySelector("#filters");
    if (!filtersEl) return;
    filtersEl.innerHTML = filters
      .map(
        (filter) => `
          <button
            class="filter-button"
            type="button"
            aria-pressed="${filter === activeFilter ? "true" : "false"}"
            data-filter="${filter}"
          >
            ${filter}
          </button>
        `
      )
      .join("");
  }

  function setGrid(grid, items, type) {
    if (!grid) return;
    grid.dataset.count = String(Math.min(items.length, 3));
    grid.innerHTML = items.map((item) => card(item, type)).join("");
  }

  function renderHub(config) {
    const items = config.items;
    const filters = config.filters;
    const grid = document.querySelector("#hub-grid");
    const emptyState = document.querySelector("#empty-state");

    function render(filter = "All") {
      const visible = filter === "All" ? items : items.filter((item) => item.categories.includes(filter));
      renderFilters(filters, filter);
      setGrid(grid, visible, config.type);
      if (emptyState) emptyState.style.display = visible.length ? "none" : "block";
    }

    setGrid(
      document.querySelector("#featured-grid"),
      items.filter((item) => item.featured),
      config.type
    );

    if (config.secondaryGridId && config.secondaryFilter) {
      setGrid(
        document.querySelector(config.secondaryGridId),
        items.filter((item) => item.categories.includes(config.secondaryFilter)),
        config.type
      );
    }

    render("All");

    const filtersEl = document.querySelector("#filters");
    if (filtersEl) {
      filtersEl.addEventListener("click", (event) => {
        const button = event.target.closest("[data-filter]");
        if (!button) return;
        render(button.dataset.filter);
      });
    }
  }

  function listMarkup(items) {
    return `<ul>${arrayFrom(items).map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }

  function arrayFrom(value, fallback = []) {
    if (Array.isArray(value) && value.length) return value;
    if (typeof value === "string" && value.trim()) return [value];
    return fallback;
  }

  function simpleCards(items) {
    return items.map((item) => `<article class="mini-card"><h3>${item}</h3></article>`).join("");
  }

  function featureCards(items) {
    return items.map((item) => `<article class="mini-card"><h3>${item}</h3><p>Included in the product readiness workflow.</p></article>`).join("");
  }

  function relatedCards(items) {
    return items
      .map(
        (item) => `
          <a class="mini-card" href="${item.href}">
            <span class="pill">${item.type}</span>
            <h3>${item.name}</h3>
          </a>
        `
      )
      .join("");
  }

  function projectLinksPanel(item) {
    const links = itemCtas(item, "project");
    if (!links.length) return "<p>Links will be added as public assets become available.</p>";
    return `<div class="link-row">${buttonMarkup(links)}</div>`;
  }

  function contentMarkup(body) {
    if (Array.isArray(body)) return listMarkup(body);
    if (typeof body === "string" && body.startsWith("<")) return body;
    return `<p>${body}</p>`;
  }

  function productDetailPage(item) {
    const targetUsers = arrayFrom(item.targetUsers, [item.targetUser]);
    const problemPoints = arrayFrom(item.problemPoints, [item.description]);
    const whatItDoes = arrayFrom(item.whatItDoes, item.features);
    const mvpFeatures = arrayFrom(item.features);
    const monetizationOptions = arrayFrom(item.monetizationOptions, [item.monetization]);
    const roadmap = arrayFrom(item.roadmap, [`Current: ${item.status}`]);
    const relatedItems = arrayFrom(item.relatedItems, [
      { name: "Engineering Projects", href: "/projects/", type: "Project" },
      { name: "Products", href: "/products/", type: "Product" }
    ]);

    return `
      <section class="hero detail-hero">
        <div class="detail-hero-grid">
          <div class="detail-hero-content">
            <span class="kicker">Product</span>
            <h1>${titleOf(item)}</h1>
            <p class="hero-copy">${item.valueProposition || item.description}</p>
            <div class="status-row">
              <span class="pill ${statusClass(item.status)}">${item.status}</span>
              <span class="pill">${item.category}</span>
              <span class="pill">Production Readiness</span>
            </div>
            <div class="hero-actions">
              <a class="button primary" href="/#contact">Request Product Audit</a>
              <a class="button" href="/products/">Back to Products</a>
            </div>
          </div>
          <aside class="product-visual-card" aria-label="${titleOf(item)} product preview">
            <div class="visual-score">MVP</div>
            <div class="visual-list">
              ${whatItDoes.slice(0, 5).map((feature) => `<span>${feature}</span>`).join("")}
            </div>
          </aside>
        </div>
      </section>

      <article class="container detail-article">
        <section class="split-section">
          <div>
            <span class="kicker">Problem</span>
            <h2>The launch gap this product addresses</h2>
            <p class="section-copy">${item.description}</p>
          </div>
          <ul class="check-list">${problemPoints.map((point) => `<li>${point}</li>`).join("")}</ul>
        </section>

        <section>
          <div class="section-head">
            <h2>Target Users</h2>
            <p>The people this product is designed to help first.</p>
          </div>
          <div class="compact-grid">${simpleCards(targetUsers)}</div>
        </section>

        <section>
          <div class="section-head">
            <h2>What the Product Does</h2>
            <p>Core capabilities kept practical, audit-focused, and easy to understand.</p>
          </div>
          <div class="feature-grid">${featureCards(whatItDoes)}</div>
        </section>

        <section>
          <div class="section-head">
            <h2>MVP Features</h2>
            <p>The current or planned feature set for the first useful product version.</p>
          </div>
          <div class="feature-grid">${featureCards(mvpFeatures)}</div>
        </section>

        <section class="business-model">
          <div>
            <span class="kicker">Business Model</span>
            <h2>Monetization Model</h2>
            <p class="section-copy">${item.monetization}</p>
          </div>
          <ul class="check-list">${monetizationOptions.map((option) => `<li>${option}</li>`).join("")}</ul>
        </section>

        <section class="split-section">
          <div>
            <span class="kicker">Status</span>
            <h2>Status / Roadmap</h2>
            <p class="section-copy">The product roadmap stays intentionally practical: validate the pain, improve the report, and deepen the readiness checks.</p>
          </div>
          <ol class="timeline-list">${roadmap.map((step) => `<li>${step}</li>`).join("")}</ol>
        </section>

        <section>
          <div class="section-head">
            <h2>Related Products and Projects</h2>
            <p>Connected products and engineering case studies that support the same readiness, DevOps, and cloud operations themes.</p>
          </div>
          <div class="related-grid">${relatedCards(relatedItems)}</div>
        </section>

        <section class="final-cta">
          <h2>Need a production-readiness review before launch?</h2>
          <p>If you are building an AI app, SaaS product, or cloud-hosted system, request a practical readiness audit before going live.</p>
          <div class="cta-actions">
            <a class="text-link primary" href="/#contact">Request Product Audit</a>
            <a class="text-link" href="/products/">View Products</a>
          </div>
        </section>
      </article>
    `;
  }

  function detailPage(item, type) {
    const isProduct = type === "product";
    if (isProduct) return productDetailPage(item);
    const related = isProduct
      ? `<a class="text-link" href="/projects/">View Engineering Projects</a>`
      : `<a class="text-link" href="/products/">View Products</a>`;
    const sections = isProduct
      ? [
          ["Problem", item.description],
          ["Target User", item.targetUser],
          ["What the Product Does", `It helps ${item.targetUser.toLowerCase()} move from uncertainty to a clearer readiness, documentation, or workflow decision.`],
          ["MVP Features", listMarkup(item.features)],
          ["Monetization Model", item.monetization],
          ["Status", item.status]
        ]
      : [
          ["Problem Solved", item.problemSolved],
          ["Architecture Overview", item.architecture],
          ["Tools Used", listMarkup(item.tools)],
          ["Implementation Steps", listMarkup(item.implementationSteps)],
          ["Implementation Summary", item.description],
          ["Production Skills Demonstrated", listMarkup(item.skillsDemonstrated || item.demonstrates)],
          ["Screenshots / Diagrams", "Architecture diagrams, dashboard screenshots, pipeline screenshots, and deployment walkthroughs can be attached here as the project evidence grows."],
          ["GitHub / Links", projectLinksPanel(item)]
        ];
    const heroCtas = itemCtas(item, type);
    const relatedItems = arrayFrom(item.relatedItems, [
      { name: "Engineering Projects", href: "/projects/", type: "Project" },
      { name: "Products", href: "/products/", type: "Product" }
    ]);

    return `
      <section class="container hero">
        <span class="kicker">${isProduct ? "Product" : "Engineering Case Study"}</span>
        <h1>${titleOf(item)}</h1>
        <p class="hero-copy">${item.description}</p>
        <div class="status-row">
          <span class="pill ${statusClass(item.status)}">${item.status}</span>
          <span class="pill">${item.category}</span>
        </div>
        <div class="hero-actions">
          ${buttonMarkup(heroCtas).replaceAll("text-link", "button")}
          <a class="button" href="${isProduct ? "/products/" : "/projects/"}">${isProduct ? "Back to Products" : "Back to Projects"}</a>
        </div>
      </section>
      <article class="container detail-article">
        ${sections
          .map(
            ([title, body]) => `
              <section class="card detail-panel">
                <h2>${title}</h2>
                ${contentMarkup(body)}
              </section>
            `
          )
          .join("")}
        <section class="final-cta">
          <h2>${isProduct ? "Related Products and Projects" : "Related Projects and Products"}</h2>
          <p>${isProduct ? "This product connects to my engineering work around cloud readiness, DevOps, security, and operational maturity." : "This case study connects to my product work around audits, readiness tools, automation, and practical delivery."}</p>
          <div class="related-grid">${relatedCards(relatedItems)}</div>
          <div class="link-row">${related}<a class="text-link primary" href="/#contact">Contact Victor</a></div>
        </section>
      </article>
    `;
  }

  window.renderProductsHub = function () {
    renderHub({
      type: "product",
      items: window.productsData,
      filters: [
        "All",
        "Live Products",
        "AI App Tools",
        "Cloud / DevOps Tools",
        "Cyber Readiness",
        "Business Automation",
        "Revenue Experiments",
        "Coming Soon"
      ],
      secondaryGridId: "#revenue-grid",
      secondaryFilter: "Revenue Experiments"
    });
  };

  window.renderProjectsHub = function () {
    renderHub({
      type: "project",
      items: window.projectsData,
      filters: [
        "All",
        "Cloud Engineering",
        "DevOps",
        "Platform Engineering",
        "Kubernetes",
        "Infrastructure as Code",
        "CI/CD Automation",
        "AIOps / Observability",
        "DevSecOps",
        "Case Studies"
      ]
    });
  };

  window.renderDetailFromPath = function (type) {
    const slug = window.location.pathname.split("/").filter(Boolean).pop();
    const data = type === "product" ? window.productsData : window.projectsData;
    const item = data.find((entry) => entry.slug === slug);
    const root = document.querySelector("#detail-root");
    if (!root) return;
    root.innerHTML = item
      ? detailPage(item, type)
      : `<section class="container hero"><h1>Page coming soon</h1><p class="hero-copy">This detail page is being prepared.</p></section>`;
    document.title = item ? `${titleOf(item)} | Victor Nwoke` : document.title;
  };
})();
