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

  function buttonMarkup(ctas, limit = 2) {
    return ctas
      .slice(0, limit)
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
            ${item.reason ? `<p>${item.reason}</p>` : ""}
          </a>
        `
      )
      .join("");
  }

  function projectLinksPanel(item) {
    const links = itemCtas(item, "project");
    if (!links.length) return "<p>Links will be added as public assets become available.</p>";
    return `<div class="link-row">${buttonMarkup(links, 5)}</div>`;
  }

  function contentMarkup(body) {
    if (Array.isArray(body)) return listMarkup(body);
    if (typeof body === "string" && body.startsWith("<")) return body;
    return `<p>${body}</p>`;
  }

  function textOf(value) {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") return value.name || value.title || value.description || "";
    return "";
  }

  function projectStar(item) {
    const star = item.star || {};
    return {
      situation:
        star.situation ||
        `Modern teams need ${item.category.toLowerCase()} patterns that are repeatable, reviewable, and not dependent on manual portal changes.`,
      task:
        star.task ||
        `Design a production-style reference project that demonstrates ${arrayFrom(item.skillsDemonstrated).map(textOf).slice(0, 3).join(", ").toLowerCase() || "cloud engineering capability"}.`,
      action:
        star.action ||
        `${item.architecture && typeof item.architecture === "string" ? item.architecture : item.description}`,
      result:
        star.result ||
        "Provides a recruiter-friendly case study of practical cloud, DevOps, and platform engineering capability without claiming unmeasured production metrics."
    };
  }

  function architectureData(item) {
    if (item.architecture && typeof item.architecture === "object") {
      return {
        summary: item.architecture.summary || item.description,
        components: arrayFrom(item.architecture.components),
        diagramSrc: item.architecture.diagramSrc || "",
        diagramAlt: item.architecture.diagramAlt || `${titleOf(item)} architecture diagram`
      };
    }
    return {
      summary: item.architecture || item.description,
      components: arrayFrom(item.tools).slice(0, 6),
      diagramSrc: "",
      diagramAlt: `${titleOf(item)} architecture diagram`
    };
  }

  function inferToolGroups(item) {
    if (Array.isArray(item.toolGroups) && item.toolGroups.length) return item.toolGroups;

    const groups = [
      { name: "Cloud", tools: [] },
      { name: "Infrastructure as Code", tools: [] },
      { name: "Kubernetes / Platform", tools: [] },
      { name: "Operations", tools: [] },
      { name: "Application", tools: [] }
    ];
    const assigned = new Set();

    arrayFrom(item.tools).forEach((tool) => {
      const label = String(tool);
      const lower = label.toLowerCase();
      let group = "Application";
      if (/azure|aks|key vault|monitor|log analytics|vm scale|load balancer|nsg|nat gateway|private link|rbac|vnet/.test(lower)) group = "Cloud";
      if (/terraform|bicep|cloud-init|remote backend|policy|iac/.test(lower)) group = "Infrastructure as Code";
      if (/kubernetes|helm|argocd|docker|microservices|backstage/.test(lower)) group = "Kubernetes / Platform";
      if (/github actions|grafana|prometheus|container insights|monitoring|alert|dashboard|ci\/cd|trivy|secret|deployment|branch protection/.test(lower)) group = "Operations";
      const target = groups.find((entry) => entry.name === group);
      if (target && !assigned.has(label)) {
        target.tools.push(label);
        assigned.add(label);
      }
    });

    return groups.filter((group) => group.tools.length);
  }

  function skillEvidence(skill, item) {
    const name = textOf(skill);
    if (skill && typeof skill === "object" && skill.evidence) return skill.evidence;
    const lower = name.toLowerCase();
    if (lower.includes("infrastructure as code")) return "Infrastructure is described as repeatable code rather than manual portal configuration.";
    if (lower.includes("gitops")) return "GitOps workflows show desired state being reconciled from version-controlled configuration.";
    if (lower.includes("kubernetes") || lower.includes("aks")) return "AKS, Kubernetes, and platform tooling demonstrate container platform operating patterns.";
    if (lower.includes("secret")) return "Secret handling is represented through Key Vault or secure configuration practices where available.";
    if (lower.includes("observability") || lower.includes("monitoring")) return "Monitoring, dashboards, logs, or runtime visibility are part of the operating model.";
    if (lower.includes("ci/cd") || lower.includes("automation")) return "Delivery automation is represented through repeatable workflows and deployment steps.";
    return `Shows practical evidence of ${name.toLowerCase()} within the ${titleOf(item)} case study.`;
  }

  function projectSkillCards(item) {
    return arrayFrom(item.skillsDemonstrated)
      .map((skill) => {
        const name = textOf(skill);
        return `<article class="skill-card"><h3>${name}</h3><p>${skillEvidence(skill, item)}</p></article>`;
      })
      .join("");
  }

  function implementationSteps(item) {
    return arrayFrom(item.implementationSteps).map((step, index) => {
      if (step && typeof step === "object") {
        return {
          title: step.title || `Step ${index + 1}`,
          description: step.description || "",
          tools: arrayFrom(step.tools)
        };
      }
      return {
        title: String(step).replace(/\.$/, ""),
        description: "Part of the repeatable project implementation flow.",
        tools: []
      };
    });
  }

  function screenshotsFor(item) {
    return arrayFrom(item.screenshots).filter((shot) => shot && typeof shot === "object");
  }

  function projectCaseStudyPage(item) {
    const star = projectStar(item);
    const architecture = architectureData(item);
    const heroCtas = itemCtas(item, "project");
    const tools = arrayFrom(item.tools);
    const relatedItems = arrayFrom(item.relatedItems, [
      { name: "Engineering Projects", href: "/projects/", type: "Project", reason: "Explore the broader project portfolio." },
      { name: "Products", href: "/products/", type: "Product", reason: "See product experiments connected to the engineering work." }
    ]);
    const shots = screenshotsFor(item);
    const summaryParagraphs = arrayFrom(item.implementationSummary, [
      `${titleOf(item)} packages the project into a reviewable technical case study with architecture, implementation steps, and operational evidence.`,
      "The focus is on production-style thinking: repeatable delivery, clear component boundaries, and practical cloud/platform engineering patterns."
    ]);
    const repoLinks = itemCtas(item, "project").filter((cta) => cta.label !== "View Case Study");

    return `
      <section class="hero project-hero">
        <div class="project-hero-grid">
          <div class="project-hero-copy">
            <span class="kicker">Engineering Case Study</span>
            <h1>${titleOf(item)}</h1>
            <p class="hero-copy">${item.description}</p>
            <div class="status-row">
              <span class="pill ${statusClass(item.status)}">${item.status}</span>
              <span class="pill">${item.category}</span>
              ${tools.slice(0, 4).map((tool) => `<span class="pill">${tool}</span>`).join("")}
            </div>
            <div class="hero-actions">
              ${buttonMarkup(heroCtas, 2).replaceAll("text-link", "button")}
              <a class="button" href="/projects/">Back to Projects</a>
            </div>
          </div>
          <aside class="project-summary-card" aria-label="${titleOf(item)} project summary">
            <span class="summary-eyebrow">Project Snapshot</span>
            <dl>
              <div><dt>Status</dt><dd>${item.status}</dd></div>
              <div><dt>Category</dt><dd>${item.category}</dd></div>
              <div><dt>Main tools</dt><dd>${shortList(tools, 5)}</dd></div>
              <div><dt>Project type</dt><dd>Engineering case study</dd></div>
              ${validLink(item.githubUrl) ? `<div><dt>Repository</dt><dd><a href="${item.githubUrl}">Available on GitHub</a></dd></div>` : ""}
              ${item.lastUpdated ? `<div><dt>Last updated</dt><dd>${item.lastUpdated}</dd></div>` : ""}
            </dl>
          </aside>
        </div>
      </section>

      <article class="container case-study">
        <div class="case-study-layout">
          <aside class="case-sidebar">
            <div class="sidebar-panel">
              <span class="summary-eyebrow">At a Glance</span>
              <dl>
                <div><dt>Status</dt><dd>${item.status}</dd></div>
                <div><dt>Category</dt><dd>${item.category}</dd></div>
                <div><dt>Skills</dt><dd>${arrayFrom(item.skillsDemonstrated).map(textOf).slice(0, 5).join(", ")}</dd></div>
                ${validLink(item.githubUrl) ? `<div><dt>GitHub</dt><dd><a href="${item.githubUrl}">Repository available</a></dd></div>` : ""}
              </dl>
            </div>
          </aside>

          <div class="case-main">
            <section class="case-section star-section">
              <div class="case-section-head">
                <span class="kicker">STAR Narrative</span>
                <h2>Case Study Story</h2>
                <p>A recruiter-ready view of the engineering context, task, implementation, and honest result.</p>
              </div>
              <div class="star-grid">
                ${[
                  ["Situation", star.situation],
                  ["Task", star.task],
                  ["Action", star.action],
                  ["Result", star.result]
                ]
                  .map(
                    ([title, body]) => `
                      <article class="star-card">
                        <span>${title}</span>
                        <p>${body}</p>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </section>

            <section class="case-section architecture-section">
              <div class="case-section-head">
                <span class="kicker">Architecture</span>
                <h2>Architecture Overview</h2>
                <p>${architecture.summary}</p>
              </div>
              <div class="architecture-grid">
                <div class="architecture-copy">
                  <h3>How the pieces connect</h3>
                  <ul class="check-list">${architecture.components.map((component) => `<li>${component}</li>`).join("")}</ul>
                </div>
                <figure class="architecture-visual">
                  ${
                    validLink(architecture.diagramSrc)
                      ? `<img src="${architecture.diagramSrc}" alt="${architecture.diagramAlt}" loading="lazy" />`
                      : `<div class="diagram-placeholder"><strong>Architecture diagram coming soon</strong><span>Add image path in projectsData.architecture.diagramSrc</span></div>`
                  }
                  <figcaption>${validLink(architecture.diagramSrc) ? architecture.diagramAlt : "Architecture visual placeholder"}</figcaption>
                </figure>
              </div>
            </section>

            <section class="case-section">
              <div class="case-section-head">
                <span class="kicker">Tooling</span>
                <h2>Tools Used</h2>
                <p>Grouped by the role each tool plays in the project architecture and delivery workflow.</p>
              </div>
              <div class="tool-group-grid">
                ${inferToolGroups(item)
                  .map(
                    (group) => `
                      <article class="tool-group-card">
                        <h3>${group.name}</h3>
                        <div class="tool-chip-row">${arrayFrom(group.tools).map((tool) => `<span class="tool-chip">${tool}</span>`).join("")}</div>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </section>

            <section class="case-section">
              <div class="case-section-head">
                <span class="kicker">Implementation</span>
                <h2>Implementation Steps</h2>
                <p>A concise process view of how the platform, infrastructure, or workflow is assembled.</p>
              </div>
              <ol class="process-timeline">
                ${implementationSteps(item)
                  .map(
                    (step, index) => `
                      <li>
                        <div class="step-number">${String(index + 1).padStart(2, "0")}</div>
                        <div>
                          <h3>${step.title}</h3>
                          <p>${step.description}</p>
                          ${step.tools.length ? `<div class="tool-chip-row">${step.tools.map((tool) => `<span class="tool-chip">${tool}</span>`).join("")}</div>` : ""}
                        </div>
                      </li>
                    `
                  )
                  .join("")}
              </ol>
            </section>

            <section class="case-section summary-section">
              <div class="case-section-head">
                <span class="kicker">Review Notes</span>
                <h2>Implementation Summary</h2>
              </div>
              <div class="summary-copy">${summaryParagraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}</div>
            </section>

            <section class="case-section">
              <div class="case-section-head">
                <span class="kicker">Evidence</span>
                <h2>Production Skills Demonstrated</h2>
                <p>Each card connects a skill to visible project evidence without inventing unmeasured metrics.</p>
              </div>
              <div class="skill-grid">${projectSkillCards(item)}</div>
            </section>

            <section class="case-section">
              <div class="case-section-head">
                <span class="kicker">Visual Evidence</span>
                <h2>Screenshots / Diagrams</h2>
                <p>Architecture diagrams, deployment evidence, pipeline views, and dashboards can be added directly from project assets.</p>
              </div>
              <div class="screenshot-grid">
                ${
                  shots.length
                    ? shots
                        .map(
                          (shot) => {
                            const content = `
                              ${validLink(shot.src) ? `<img src="${shot.src}" alt="${shot.alt || shot.title}" loading="lazy" />` : `<div class="shot-placeholder"><strong>${shot.title}</strong><span>${shot.caption || "Image path coming soon."}</span></div>`}
                              <div><span class="pill">${shot.type || "Screenshot"}</span><h3>${shot.title}</h3><p>${shot.caption || ""}</p></div>
                            `;
                            return validLink(shot.src)
                              ? `<a class="screenshot-card" href="${shot.src}">${content}</a>`
                              : `<article class="screenshot-card placeholder">${content}</article>`;
                          }
                        )
                        .join("")
                    : ["Architecture diagram", "Pipeline screenshot", "Monitoring dashboard"]
                        .map(
                          (title) => `
                            <article class="screenshot-card placeholder">
                              <div class="shot-placeholder"><strong>${title} placeholder</strong><span>Add image path in projectsData.screenshots</span></div>
                            </article>
                          `
                        )
                        .join("")
                }
              </div>
            </section>

            <section class="case-section links-section">
              <div class="case-section-head">
                <span class="kicker">Links</span>
                <h2>GitHub / Links</h2>
                <p>Only real public links are shown here. Empty, private, or missing links are suppressed.</p>
              </div>
              <div class="links-grid">
                ${
                  validLink(item.githubUrl)
                    ? `<article class="repo-card"><span class="pill live">Repository available</span><h3>Source code / IaC / deployment files</h3><p>The public repository is available for reviewing project structure, infrastructure code, documentation, and deployment evidence.</p><a class="text-link primary" href="${item.githubUrl}">View GitHub</a></article>`
                    : `<article class="repo-card"><span class="pill soon">Repository not public</span><h3>Public repository coming soon</h3><p>No private or missing repository links are exposed.</p></article>`
                }
                <article class="repo-card">
                  <span class="pill">Project links</span>
                  <h3>Supporting assets</h3>
                  <div class="link-row">${buttonMarkup(repoLinks, 5) || `<span class="tag">No extra public links yet</span>`}</div>
                </article>
              </div>
            </section>

            <section class="case-section related-section">
              <div class="case-section-head">
                <span class="kicker">Related Work</span>
                <h2>Related Projects and Products</h2>
                <p>Adjacent case studies and tools connected to the same cloud, platform, DevOps, or product-readiness themes.</p>
              </div>
              <div class="related-grid case-related-grid">${relatedCards(relatedItems)}</div>
            </section>

            <section class="final-cta case-final-cta">
              <h2>Need cloud, DevOps, or platform engineering support?</h2>
              <p>Explore more Azure, Kubernetes, CI/CD, infrastructure as code, observability, and platform engineering case studies.</p>
              <div class="link-row">
                <a class="text-link primary" href="/projects/">View All Projects</a>
                <a class="text-link" href="/#contact">Contact Victor</a>
              </div>
            </section>
          </div>
        </div>
      </article>
    `;
  }

  function productDetailPage(item) {
    const targetUsers = arrayFrom(item.targetUsers, [item.targetUser]);
    const problemPoints = arrayFrom(item.problemPoints, [item.description]);
    const whatItDoes = arrayFrom(item.whatItDoes, item.features);
    const mvpFeatures = arrayFrom(item.features);
    const monetizationOptions = arrayFrom(item.monetizationOptions, [item.monetization]);
    const roadmap = arrayFrom(item.roadmap, [`Current: ${item.status}`]);
    const productCtas = itemCtas(item, "product");
    const relatedItems = arrayFrom(item.relatedItems, [
      { name: "Engineering Projects", href: "/projects/", type: "Project" },
      { name: "Products", href: "/products/", type: "Product" }
    ]);
    const productStory = item.story || {
      problem: problemPoints[0] || item.description,
      audience: item.targetUser,
      offer: item.valueProposition || item.description,
      outcome:
        "Gives the target user a clearer, more practical way to assess readiness, document a workflow, or decide the next operational action."
    };
    const liveLinks = productCtas.filter((cta) => cta.label !== "View Product" && cta.label !== "Open Product Page");

    return `
      <section class="hero project-hero product-case-hero">
        <div class="project-hero-grid">
          <div class="project-hero-copy">
            <span class="kicker">Product Lab</span>
            <h1>${titleOf(item)}</h1>
            <p class="hero-copy">${item.valueProposition || item.description}</p>
            <div class="status-row">
              <span class="pill ${statusClass(item.status)}">${item.status}</span>
              <span class="pill">${item.category}</span>
              ${arrayFrom(item.tags).slice(0, 4).map((tag) => `<span class="pill">${tag}</span>`).join("")}
            </div>
            <div class="hero-actions">
              ${buttonMarkup(productCtas, 2).replaceAll("text-link", "button")}
              <a class="button" href="/products/">Back to Products</a>
            </div>
          </div>
          <aside class="project-summary-card" aria-label="${titleOf(item)} product summary">
            <span class="summary-eyebrow">Product Snapshot</span>
            <dl>
              <div><dt>Status</dt><dd>${item.status}</dd></div>
              <div><dt>Category</dt><dd>${item.category}</dd></div>
              <div><dt>Target user</dt><dd>${item.targetUser}</dd></div>
              <div><dt>Monetization</dt><dd>${item.monetization}</dd></div>
              ${validLink(item.liveUrl) ? `<div><dt>Live app</dt><dd><a href="${item.liveUrl}">Available online</a></dd></div>` : ""}
            </dl>
          </aside>
        </div>
      </section>

      <article class="container case-study product-case-study">
        <div class="case-study-layout">
          <aside class="case-sidebar">
            <div class="sidebar-panel">
              <span class="summary-eyebrow">At a Glance</span>
              <dl>
                <div><dt>Status</dt><dd>${item.status}</dd></div>
                <div><dt>Category</dt><dd>${item.category}</dd></div>
                <div><dt>Audience</dt><dd>${shortList(targetUsers, 4)}</dd></div>
                <div><dt>Business model</dt><dd>${item.monetization}</dd></div>
              </dl>
            </div>
          </aside>

          <div class="case-main">
            <section class="case-section star-section">
              <div class="case-section-head">
                <span class="kicker">Product Narrative</span>
                <h2>Product Story</h2>
                <p>A concise view of the customer pain, audience, offer, and practical outcome.</p>
              </div>
              <div class="star-grid">
                ${[
                  ["Problem", productStory.problem],
                  ["Audience", productStory.audience],
                  ["Offer", productStory.offer],
                  ["Outcome", productStory.outcome]
                ]
                  .map(
                    ([title, body]) => `
                      <article class="star-card">
                        <span>${title}</span>
                        <p>${body}</p>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </section>

            <section class="case-section">
              <div class="case-section-head">
                <span class="kicker">Customer Pain</span>
                <h2>Problem This Product Addresses</h2>
                <p>The product is framed around a clear operational, readiness, documentation, or business workflow gap.</p>
              </div>
              <ul class="check-list">${problemPoints.map((point) => `<li>${point}</li>`).join("")}</ul>
            </section>

            <section class="case-section">
              <div class="case-section-head">
                <span class="kicker">Users</span>
                <h2>Target Users</h2>
                <p>The first audience segments this product is designed to help.</p>
              </div>
              <div class="skill-grid">${targetUsers.map((user) => `<article class="skill-card"><h3>${user}</h3><p>Primary audience segment for ${titleOf(item)}.</p></article>`).join("")}</div>
            </section>

            <section class="case-section">
              <div class="case-section-head">
                <span class="kicker">Workflow</span>
                <h2>What the Product Does</h2>
                <p>Core product capabilities kept practical, focused, and easy to evaluate.</p>
              </div>
              <div class="tool-group-grid">
                ${whatItDoes
                  .map(
                    (feature) => `
                      <article class="tool-group-card">
                        <h3>${feature}</h3>
                        <p>Included in the product workflow or planned readiness experience.</p>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            </section>

            <section class="case-section">
              <div class="case-section-head">
                <span class="kicker">MVP</span>
                <h2>MVP Features</h2>
                <p>The current or planned feature set for the first useful version.</p>
              </div>
              <div class="skill-grid">${mvpFeatures.map((feature) => `<article class="skill-card"><h3>${feature}</h3><p>Part of the MVP scope or near-term product validation path.</p></article>`).join("")}</div>
            </section>

            <section class="case-section">
              <div class="case-section-head">
                <span class="kicker">Business Model</span>
                <h2>Monetization Model</h2>
                <p>${item.monetization}</p>
              </div>
              <div class="tool-group-grid">${monetizationOptions.map((option) => `<article class="tool-group-card"><h3>${option}</h3><p>Potential route for packaging product value into a paid offer.</p></article>`).join("")}</div>
            </section>

            <section class="case-section">
              <div class="case-section-head">
                <span class="kicker">Roadmap</span>
                <h2>Status / Roadmap</h2>
                <p>The roadmap stays practical: validate the pain, improve the product experience, and deepen the useful output.</p>
              </div>
              <ol class="process-timeline">
                ${roadmap
                  .map(
                    (step, index) => `
                      <li>
                        <div class="step-number">${String(index + 1).padStart(2, "0")}</div>
                        <div><h3>${step.replace(/^[^:]+:\\s*/, "")}</h3><p>${step}</p></div>
                      </li>
                    `
                  )
                  .join("")}
              </ol>
            </section>

            <section class="case-section links-section">
              <div class="case-section-head">
                <span class="kicker">Links</span>
                <h2>Product Links</h2>
                <p>Only real available links are shown here. Empty, private, or missing links are suppressed.</p>
              </div>
              <div class="links-grid">
                <article class="repo-card">
                  <span class="pill ${validLink(item.liveUrl) ? "live" : "soon"}">${validLink(item.liveUrl) ? "Live product available" : "Product link coming soon"}</span>
                  <h3>${validLink(item.liveUrl) ? "Open the live product" : "Public product experience not live yet"}</h3>
                  <p>${validLink(item.liveUrl) ? "The live product can be opened directly from this page." : "This product is still being validated, packaged, or prepared for public access."}</p>
                  <div class="link-row">${buttonMarkup(liveLinks, 5) || `<span class="tag">No extra public links yet</span>`}</div>
                </article>
                <article class="repo-card">
                  <span class="pill">Product context</span>
                  <h3>Why it belongs in the Product Lab</h3>
                  <p>${item.revenueExperiment ? "This is being treated as a revenue experiment with buyer pain and monetization validation." : "This is part of the product portfolio because it packages a practical workflow into a reusable tool or offer."}</p>
                </article>
              </div>
            </section>

            <section class="case-section related-section">
              <div class="case-section-head">
                <span class="kicker">Related Work</span>
                <h2>Related Products and Projects</h2>
                <p>Connected products and engineering case studies that support the same readiness, cloud, DevOps, security, or automation themes.</p>
              </div>
              <div class="related-grid case-related-grid">${relatedCards(relatedItems)}</div>
            </section>

            <section class="final-cta case-final-cta">
              <h2>Need a product or app readiness review?</h2>
              <p>If you are building an AI app, SaaS product, cloud-hosted system, or business automation tool, request a practical product audit before launch.</p>
              <div class="link-row">
                <a class="text-link primary" href="/#contact">Request Product Audit</a>
                <a class="text-link" href="/products/">View All Products</a>
              </div>
            </section>
          </div>
        </div>
      </article>
    `;
  }

  function detailPage(item, type) {
    const isProduct = type === "product";
    if (isProduct) return productDetailPage(item);
    return projectCaseStudyPage(item);
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
