window.projectsData = [
  {
    slug: "terraform-aks-gitops-platform",
    title: "Terraform AKS GitOps Platform",
    name: "Terraform AKS GitOps Platform",
    status: "Case Study / Demo",
    category: "Platform Engineering / Kubernetes",
    categories: ["All", "Platform Engineering", "Kubernetes", "Infrastructure as Code", "Case Studies"],
    description:
      "End-to-end AKS platform built with Terraform, ArgoCD, Azure Key Vault integration, monitoring, and GitOps deployment workflows.",
    problemSolved:
      "Shows how teams can deploy applications to Kubernetes using repeatable infrastructure, GitOps workflows, secure secret management, and multi-environment patterns.",
    architecture:
      {
        summary:
          "The platform uses Terraform to provision Azure resources and AKS. Kubernetes workloads are managed through Helm and GitOps workflows with ArgoCD. Secrets are handled through Azure Key Vault integration, while Azure Monitor and Container Insights provide observability for cluster and workload behaviour.",
        components: [
          "Terraform provisions AKS and supporting Azure resources.",
          "ArgoCD handles GitOps deployment reconciliation from Git.",
          "Helm packages Kubernetes workloads for repeatable deployment.",
          "Azure Key Vault supports secret management and secure configuration.",
          "Azure Monitor and Container Insights support operational visibility.",
          "The structure supports dev/test/prod style environment thinking."
        ],
        diagramSrc:
          "https://raw.githubusercontent.com/victornwoke/Terraform-end-to-end-Project-with-AKS-and-GitOps/main/AKS-GitOps-Architecture%20.png",
        diagramAlt: "AKS GitOps architecture diagram showing Terraform, AKS, ArgoCD, Helm, Key Vault, and monitoring components"
      },
    tools: ["Azure AKS", "Terraform", "ArgoCD", "Helm", "Kubernetes", "Azure Key Vault", "Azure Monitor", "Container Insights"],
    toolGroups: [
      { name: "Cloud", tools: ["Azure", "AKS", "Azure Key Vault", "Azure Monitor"] },
      { name: "Infrastructure as Code", tools: ["Terraform"] },
      { name: "Kubernetes / Platform", tools: ["Kubernetes", "Helm", "ArgoCD"] },
      { name: "Operations", tools: ["Container Insights", "Monitoring"] }
    ],
    star: {
      situation:
        "Modern cloud teams need repeatable Kubernetes platforms that can be deployed, configured, and maintained without relying on manual portal changes.",
      task:
        "Build a production-style AKS platform that demonstrates infrastructure as code, GitOps deployment, secret management, and operational monitoring.",
      action:
        "Terraform defines the Azure platform foundation, ArgoCD manages GitOps application delivery, Helm packages workloads, Azure Key Vault supports secret handling, and Azure Monitor / Container Insights provides runtime visibility.",
      result:
        "The project demonstrates a repeatable AKS platform pattern that can be reviewed by recruiters, hiring managers, and technical teams as evidence of platform engineering, Kubernetes, GitOps, and cloud automation capability."
    },
    skillsDemonstrated: [
      {
        name: "Infrastructure as Code",
        evidence: "Terraform is used to define repeatable cloud infrastructure instead of relying on manual portal deployment."
      },
      {
        name: "Azure Kubernetes Service",
        evidence: "AKS is the target platform for demonstrating managed Kubernetes deployment and operating patterns."
      },
      {
        name: "GitOps",
        evidence: "ArgoCD represents the desired-state reconciliation workflow from Git."
      },
      {
        name: "Helm-based deployment",
        evidence: "Helm packages workloads so Kubernetes deployments can be versioned and repeated."
      },
      {
        name: "Secret management",
        evidence: "Azure Key Vault integration shows how sensitive configuration can be handled outside application code."
      },
      {
        name: "Monitoring and observability",
        evidence: "Azure Monitor and Container Insights provide visibility into cluster and workload behaviour."
      },
      {
        name: "Multi-environment platform thinking",
        evidence: "The project is structured as a reference pattern for dev/test/prod style deployment workflows."
      }
    ],
    demonstrates:
      "Platform engineering, GitOps, Kubernetes operations, secret management, and multi-environment deployment.",
    implementationSteps: [
      {
        title: "Provision Azure resource foundation with Terraform",
        description: "Define the repeatable Azure foundation that supports the Kubernetes platform.",
        tools: ["Terraform", "Azure"]
      },
      {
        title: "Create and configure the AKS cluster",
        description: "Build the managed Kubernetes cluster and supporting platform configuration.",
        tools: ["Azure AKS", "Kubernetes"]
      },
      {
        title: "Structure environments for repeatable deployment",
        description: "Organise the project around environment-aware deployment patterns.",
        tools: ["Terraform", "Git"]
      },
      {
        title: "Configure GitOps delivery with ArgoCD",
        description: "Use GitOps reconciliation to keep deployed state aligned with source-controlled desired state.",
        tools: ["ArgoCD", "GitOps"]
      },
      {
        title: "Package workloads with Helm",
        description: "Package Kubernetes workloads for repeatable deployment and configuration.",
        tools: ["Helm", "Kubernetes"]
      },
      {
        title: "Integrate Azure Key Vault for secrets",
        description: "Represent secure secret handling outside application code and deployment manifests.",
        tools: ["Azure Key Vault"]
      },
      {
        title: "Add monitoring with Azure Monitor and Container Insights",
        description: "Expose runtime visibility for cluster and workload behaviour.",
        tools: ["Azure Monitor", "Container Insights"]
      },
      {
        title: "Document deployment flow and operational checks",
        description: "Make the project reviewable for technical audiences and future platform work.",
        tools: ["README", "Architecture notes"]
      }
    ],
    implementationSummary: [
      "This case study builds a production-style AKS platform pattern rather than a one-off cluster. Terraform defines the Azure foundation, AKS provides the managed Kubernetes runtime, and GitOps workflows keep application delivery tied to source-controlled configuration.",
      "ArgoCD and Helm show how workloads can be packaged and reconciled consistently. Azure Key Vault supports secure configuration handling, while Azure Monitor and Container Insights provide the observability layer needed to reason about runtime behaviour.",
      "A reviewer should notice the combination of infrastructure as code, platform deployment, GitOps, secrets, and monitoring. The project is intentionally framed as evidence of platform engineering capability without claiming unmeasured business metrics."
    ],
    screenshots: [
      {
        title: "AKS GitOps Architecture",
        type: "Architecture",
        src: "https://raw.githubusercontent.com/victornwoke/Terraform-end-to-end-Project-with-AKS-and-GitOps/main/AKS-GitOps-Architecture%20.png",
        alt: "Architecture diagram for Terraform AKS GitOps platform",
        caption: "README architecture image showing the AKS GitOps platform structure."
      }
    ],
    projectUrl: "/projects/terraform-aks-gitops-platform/",
    githubUrl: "https://github.com/victornwoke/Terraform-end-to-end-Project-with-AKS-and-GitOps",
    liveDemoUrl: "",
    architectureUrl: "/projects/terraform-aks-gitops-platform/",
    articleUrl: "",
    ctas: [],
    tags: ["Azure", "AKS", "Terraform", "ArgoCD", "GitOps"],
    relatedItems: [
      {
        name: "Cloud-Native AKS Microservices Platform",
        href: "/projects/cloud-native-aks-microservices-platform/",
        type: "Project",
        reason: "Extends the same AKS and microservices platform engineering theme."
      },
      {
        name: "DevSecOps Pipeline Lab",
        href: "/projects/devsecops-pipeline-lab/",
        type: "Project",
        reason: "Connects delivery automation with security checks and release gates."
      },
      {
        name: "Production Observability Stack",
        href: "/projects/production-observability-stack/",
        type: "Project",
        reason: "Complements AKS platform work with monitoring and alerting patterns."
      },
      {
        name: "VibeDeploy",
        href: "/products/vibedeploy/",
        type: "Product",
        reason: "Applies production-readiness thinking to AI-built app launches."
      },
      {
        name: "CloudCost Snapshot",
        href: "/products/cloudcost-snapshot/",
        type: "Product",
        reason: "Connects cloud platform work with cost and operational visibility."
      }
    ],
    featured: true
  },
  {
    slug: "cloudops-goal-tracker",
    title: "CloudOps Goal Tracker",
    name: "CloudOps Goal Tracker",
    status: "Case Study",
    category: "Cloud Engineering / DevOps",
    categories: ["All", "Cloud Engineering", "DevOps", "Case Studies"],
    description:
      "Three-tier cloud application architecture with frontend, backend, and PostgreSQL database layers.",
    problemSolved:
      "Demonstrates how a cloud-hosted application can be structured, containerised, deployed, monitored, and improved using DevOps practices.",
    architecture:
      "A frontend, backend, and PostgreSQL data layer are containerised and supported by infrastructure automation, CI/CD workflows, and operational monitoring.",
    tools: ["Node.js", "Go", "PostgreSQL", "Docker", "Terraform", "Azure", "GitHub Actions"],
    skillsDemonstrated: [
      "Three-Tier Architecture",
      "Cloud Operations",
      "Application Deployment",
      "Infrastructure Automation",
      "DevOps Workflow"
    ],
    demonstrates:
      "Three-tier architecture, cloud operations, application deployment, infrastructure automation, and DevOps workflow.",
    implementationSteps: [
      "Structure the application into frontend, backend, and database layers.",
      "Containerise services and define repeatable infrastructure.",
      "Use CI/CD and monitoring patterns to support cloud operations."
    ],
    projectUrl: "/projects/cloudops-goal-tracker/",
    githubUrl: "https://github.com/victornwoke/CloudOps-Goal-Tracker--Three-Tier-Architecture",
    liveDemoUrl: "",
    architectureUrl: "/projects/cloudops-goal-tracker/",
    articleUrl: "",
    ctas: [],
    tags: ["CloudOps", "Azure", "Docker", "Terraform", "PostgreSQL"],
    relatedItems: [
      { name: "Service Business Management System", href: "/projects/service-business-management-system/", type: "Project" },
      { name: "CloudCost Snapshot", href: "/products/cloudcost-snapshot/", type: "Product" }
    ],
    featured: true
  },
  {
    slug: "azure-vmss-scalable-webapp",
    title: "Azure VMSS Scalable Web App",
    name: "Azure VMSS Scalable Web App",
    status: "Case Study",
    category: "Cloud Engineering / Infrastructure as Code",
    categories: ["All", "Cloud Engineering", "Infrastructure as Code", "Case Studies"],
    description:
      "Production-ready scalable web application infrastructure on Azure using Terraform, VM Scale Sets, Standard Load Balancer, NSG, NAT Gateway, remote backend, and cloud-init provisioning.",
    problemSolved:
      "Shows how to deploy a scalable and repeatable Azure web application environment using infrastructure as code and secure networking patterns.",
    architecture:
      {
        summary:
          "Terraform defines Azure VM Scale Sets behind a Standard Load Balancer, with NSG rules, NAT Gateway egress, remote state, and cloud-init provisioning for repeatable web app deployment.",
        components: [
          "Azure VM Scale Sets provide the scalable compute tier.",
          "Standard Load Balancer distributes traffic across instances.",
          "NSG rules and NAT Gateway represent secure network access and egress patterns.",
          "Terraform remote backend supports repeatable infrastructure state handling.",
          "Cloud-init handles instance bootstrap and provisioning."
        ],
        diagramSrc:
          "https://raw.githubusercontent.com/victornwoke/azure-vmss-load-balanced-scalable-webapp-terraform/main/azure_vmss_architecture.png",
        diagramAlt: "Azure VMSS scalable web app architecture diagram"
      },
    tools: ["Azure VM Scale Sets", "Terraform", "Standard Load Balancer", "NSG", "NAT Gateway", "Cloud-init", "Remote Backend"],
    skillsDemonstrated: [
      "Azure Infrastructure",
      "Infrastructure as Code",
      "Load Balancing",
      "Autoscaling",
      "Network Security",
      "Terraform Automation"
    ],
    demonstrates:
      "Azure infrastructure, infrastructure as code, load balancing, autoscaling, network security, and Terraform automation.",
    implementationSteps: [
      "Create repeatable Azure infrastructure with Terraform and remote state.",
      "Place scalable compute behind a Standard Load Balancer.",
      "Apply secure networking and provisioning patterns with NSGs, NAT Gateway, and cloud-init."
    ],
    screenshots: [
      {
        title: "Azure VMSS Architecture",
        type: "Architecture",
        src: "https://raw.githubusercontent.com/victornwoke/azure-vmss-load-balanced-scalable-webapp-terraform/main/azure_vmss_architecture.png",
        alt: "Azure VMSS scalable web app architecture diagram",
        caption: "README architecture image from the public GitHub repository."
      }
    ],
    projectUrl: "/projects/azure-vmss-scalable-webapp/",
    githubUrl: "https://github.com/victornwoke/azure-vmss-load-balanced-scalable-webapp-terraform",
    liveDemoUrl: "",
    architectureUrl: "/projects/azure-vmss-scalable-webapp/",
    articleUrl: "",
    ctas: [],
    tags: ["Azure", "VMSS", "Terraform", "Load Balancer", "NSG"],
    relatedItems: [
      { name: "Azure Landing Zone Case Study", href: "/projects/azure-landing-zone/", type: "Project" },
      { name: "Automating Azure Infrastructure with Bicep", href: "/projects/automating-azure-infrastructure-bicep/", type: "Project" }
    ],
    featured: true
  },
  {
    slug: "service-business-management-system",
    title: "Service Business Management System",
    name: "Service Business Management System",
    status: "Product Experiment / Case Study",
    category: "Business Automation / Kubernetes",
    categories: ["All", "DevOps", "Platform Engineering", "Kubernetes", "Case Studies"],
    description:
      "Full-stack service business management system for service-based businesses, built with a cloud-native microservices architecture.",
    problemSolved:
      "Explores how tradespeople and service-based businesses could manage work through a scalable full-stack platform while demonstrating Kubernetes, CI/CD, and observability practices.",
    architecture:
      {
        summary:
          "React, Node.js, and Python worker services run as containerised microservices with Kubernetes deployment patterns, GitOps delivery, CI/CD automation, and Prometheus observability.",
        components: [
          "React provides the frontend experience.",
          "Node.js services handle core backend workflows.",
          "Python worker services support background processing.",
          "Docker and Kubernetes represent the cloud-native runtime model.",
          "Prometheus supports monitoring and service visibility."
        ],
        diagramSrc: "https://raw.githubusercontent.com/victornwoke/service-mgr/main/assets/architecture.png",
        diagramAlt: "Service business management system architecture diagram"
      },
    tools: ["React", "Node.js", "Python Worker", "Docker", "Kubernetes", "Prometheus", "GitOps", "CI/CD"],
    skillsDemonstrated: [
      "Full-Stack Engineering",
      "Microservices",
      "Kubernetes",
      "CI/CD",
      "Monitoring",
      "Product Engineering"
    ],
    demonstrates:
      "Full-stack engineering, microservices, Kubernetes, CI/CD, monitoring, and product engineering.",
    implementationSteps: [
      "Model a service business workflow as a full-stack product experience.",
      "Split application responsibilities across containerised services.",
      "Demonstrate delivery and operations with Kubernetes, GitOps, CI/CD, and monitoring."
    ],
    screenshots: [
      {
        title: "Service Manager Architecture",
        type: "Architecture",
        src: "https://raw.githubusercontent.com/victornwoke/service-mgr/main/assets/architecture.png",
        alt: "Service business management system architecture diagram",
        caption: "Architecture image referenced by the public GitHub README."
      },
      {
        title: "Deployment Architecture",
        type: "Deployment",
        src: "https://raw.githubusercontent.com/victornwoke/service-mgr/main/assets/deployment-architecture.png",
        alt: "Service business management system deployment architecture diagram",
        caption: "Deployment architecture image from repository assets."
      }
    ],
    projectUrl: "/projects/service-business-management-system/",
    githubUrl: "https://github.com/victornwoke/service-mgr",
    liveDemoUrl: "",
    architectureUrl: "/projects/service-business-management-system/",
    articleUrl: "",
    ctas: [],
    tags: ["SaaS", "Microservices", "Kubernetes", "Docker", "Prometheus"],
    relatedItems: [
      { name: "CloudOps Goal Tracker", href: "/projects/cloudops-goal-tracker/", type: "Project" },
      { name: "DevOps Handover Pack", href: "/products/devops-handover-pack/", type: "Product" }
    ],
    featured: false
  },
  {
    slug: "cloud-native-aks-microservices-platform",
    title: "Cloud-Native AKS Microservices Platform",
    name: "Cloud-Native AKS Microservices Platform",
    status: "Case Study / Demo",
    category: "Platform Engineering / Kubernetes",
    categories: ["All", "Platform Engineering", "Kubernetes", "CI/CD Automation", "AIOps / Observability", "Case Studies"],
    description:
      "Cloud-native microservices platform deployed on Azure Kubernetes Service with infrastructure as code, CI/CD automation, monitoring, and security controls.",
    problemSolved:
      "Shows how to design and operate a production-style microservices platform on AKS with secure infrastructure and automated delivery.",
    architecture:
      "AKS hosts microservices with CI/CD automation, Key Vault-backed secrets, RBAC boundaries, Private Link patterns, and observability through Azure Monitor, Grafana, and Prometheus.",
    tools: ["Azure AKS", "Kubernetes", "GitHub Actions", "Azure Key Vault", "RBAC", "Private Link", "Azure Monitor", "Grafana", "Prometheus"],
    skillsDemonstrated: [
      "Kubernetes Platform Engineering",
      "Microservices Architecture",
      "CI/CD Automation",
      "Observability",
      "Cloud Security",
      "Azure Operations"
    ],
    demonstrates:
      "Kubernetes platform engineering, microservices architecture, CI/CD automation, observability, cloud security, and Azure operations.",
    implementationSteps: [
      "Design the AKS platform around microservice deployment and runtime operations.",
      "Use CI/CD automation and security controls for delivery.",
      "Add monitoring and observability signals for production-style operations."
    ],
    projectUrl: "/projects/cloud-native-aks-microservices-platform/",
    githubUrl: "https://github.com/victornwoke/Cloud-Native-Microservices-Platform-on-Azure-Kubernetes-Service--AKS-",
    liveDemoUrl: "",
    architectureUrl: "/projects/cloud-native-aks-microservices-platform/",
    articleUrl: "",
    ctas: [],
    tags: ["AKS", "Kubernetes", "Microservices", "CI/CD", "Observability"],
    relatedItems: [
      { name: "Terraform AKS GitOps Platform", href: "/projects/terraform-aks-gitops-platform/", type: "Project" },
      { name: "Production Observability Stack", href: "/projects/production-observability-stack/", type: "Project" }
    ],
    featured: false
  },
  {
    slug: "automating-azure-infrastructure-bicep",
    title: "Automating Azure Infrastructure with Bicep",
    name: "Automating Azure Infrastructure with Bicep",
    status: "Case Study",
    category: "Cloud Engineering / Infrastructure as Code",
    categories: ["All", "Cloud Engineering", "Infrastructure as Code", "CI/CD Automation", "Case Studies"],
    description:
      "Azure infrastructure automation project using Bicep, GitHub Actions, Azure CLI, governance, monitoring, and security controls.",
    problemSolved:
      "Demonstrates how Azure infrastructure can be deployed consistently using infrastructure as code instead of manual portal configuration.",
    architecture:
      {
        summary:
          "Bicep templates define Azure infrastructure, GitHub Actions coordinates deployment, and governance, security, monitoring, and operational checks support consistent delivery.",
        components: [
          "Bicep templates define Azure resources as code.",
          "GitHub Actions coordinates infrastructure deployment workflows.",
          "Azure CLI and PowerShell support operational automation.",
          "Azure Policy and Key Vault represent governance and security controls.",
          "Azure Monitor and Log Analytics provide visibility for deployed infrastructure."
        ],
        diagramSrc:
          "https://raw.githubusercontent.com/victornwoke/Automating-Azure-Infrastructure/main/images/architectural_diagram.png",
        diagramAlt: "Automating Azure Infrastructure with Bicep architecture diagram"
      },
    tools: ["Azure Bicep", "GitHub Actions", "Azure CLI", "PowerShell", "Azure Policy", "Key Vault", "Azure Monitor", "Log Analytics"],
    skillsDemonstrated: [
      "Infrastructure as Code",
      "Azure Automation",
      "CI/CD for Infrastructure",
      "Governance",
      "Monitoring",
      "Security Baseline"
    ],
    demonstrates:
      "Infrastructure as code, Azure automation, CI/CD for infrastructure, governance, monitoring, and security baseline.",
    implementationSteps: [
      "Define Azure infrastructure using Bicep modules and repeatable deployment conventions.",
      "Automate infrastructure delivery through GitHub Actions and Azure CLI.",
      "Apply governance, security, monitoring, and operational controls."
    ],
    screenshots: [
      {
        title: "Bicep Infrastructure Architecture",
        type: "Architecture",
        src: "https://raw.githubusercontent.com/victornwoke/Automating-Azure-Infrastructure/main/images/architectural_diagram.png",
        alt: "Automating Azure Infrastructure with Bicep architecture diagram",
        caption: "Architecture image referenced by the public GitHub README."
      }
    ],
    projectUrl: "/projects/automating-azure-infrastructure-bicep/",
    githubUrl: "https://github.com/victornwoke/Automating-Azure-Infrastructure",
    liveDemoUrl: "",
    architectureUrl: "/projects/automating-azure-infrastructure-bicep/",
    articleUrl: "",
    ctas: [],
    tags: ["Azure", "Bicep", "GitHub Actions", "IaC", "Azure Policy"],
    relatedItems: [
      { name: "Azure VMSS Scalable Web App", href: "/projects/azure-vmss-scalable-webapp/", type: "Project" },
      { name: "Azure Landing Zone Case Study", href: "/projects/azure-landing-zone/", type: "Project" }
    ],
    featured: false
  },
  {
    slug: "azure-landing-zone",
    title: "Azure Landing Zone Case Study",
    name: "Azure Landing Zone Case Study",
    status: "Case Study",
    category: "Cloud Engineering / Infrastructure as Code",
    categories: ["All", "Cloud Engineering", "Infrastructure as Code", "Case Studies"],
    description:
      "A production-style Azure landing zone design covering secure networking, governance, RBAC, naming, tagging, monitoring, and environment structure.",
    problemSolved:
      "Helps teams create a repeatable, governed Azure foundation instead of deploying resources manually without standards.",
    architecture:
      "Hub-and-spoke network patterns, policy guardrails, RBAC scopes, environment naming, tagging, and centralised monitoring.",
    tools: ["Azure", "Terraform/Bicep", "Azure Policy", "RBAC", "VNets", "Log Analytics", "Azure Monitor"],
    skillsDemonstrated: ["Cloud Architecture", "Governance", "Infrastructure as Code", "Security Baseline"],
    demonstrates:
      "Cloud architecture, governance, infrastructure as code, security baseline, and operational readiness.",
    implementationSteps: [
      "Define landing zone standards for networking, identity, governance, and monitoring.",
      "Apply repeatable environment patterns for secure Azure adoption.",
      "Document operational guardrails for future workloads."
    ],
    projectUrl: "/projects/azure-landing-zone/",
    githubUrl: "",
    liveDemoUrl: "",
    architectureUrl: "/projects/azure-landing-zone/",
    articleUrl: "",
    ctas: [],
    tags: ["Azure", "Landing Zone", "IaC", "Governance"],
    relatedItems: [
      { name: "Automating Azure Infrastructure with Bicep", href: "/projects/automating-azure-infrastructure-bicep/", type: "Project" }
    ],
    featured: true
  },
  {
    slug: "aiops-incident-triage",
    title: "AIOps Incident Triage Assistant",
    name: "AIOps Incident Triage Assistant",
    status: "MVP / Experiment",
    category: "AIOps / Observability",
    categories: ["All", "AIOps / Observability", "Case Studies"],
    description:
      "An AI-assisted incident triage concept that turns logs, alerts, and incident notes into root-cause summaries and suggested remediation steps.",
    problemSolved:
      "Helps small teams respond faster to incidents when they do not have a dedicated SRE or operations team.",
    architecture:
      "Alert and log inputs feed a triage workflow that classifies severity, summarises likely causes, and suggests next actions.",
    tools: ["AI Workflow", "Log Analysis", "Alert Summaries", "Incident Reports", "Azure Monitor", "Grafana"],
    skillsDemonstrated: ["AIOps", "Incident Response", "Observability", "Automation", "Operational Support"],
    demonstrates:
      "AIOps thinking, incident response, observability, automation, and operational support.",
    implementationSteps: [
      "Collect alert, log, and incident context.",
      "Summarise likely causes and severity.",
      "Generate practical next actions for response teams."
    ],
    projectUrl: "/projects/aiops-incident-triage/",
    githubUrl: "",
    liveDemoUrl: "",
    architectureUrl: "",
    articleUrl: "",
    ctas: [{ label: "View Workflow", href: "/projects/aiops-incident-triage/", priority: "secondary" }],
    tags: ["AIOps", "Incidents", "Logs", "Operations"],
    relatedItems: [
      { name: "Production Observability Stack", href: "/projects/production-observability-stack/", type: "Project" }
    ],
    featured: true
  },
  {
    slug: "cicd-pipeline-factory",
    title: "CI/CD Pipeline Factory",
    name: "CI/CD Pipeline Factory",
    status: "Demo / Case Study",
    category: "DevOps / CI/CD Automation",
    categories: ["All", "DevOps", "CI/CD Automation", "Case Studies"],
    description:
      "Reusable CI/CD pipeline patterns for building, testing, scanning, and deploying applications across environments.",
    problemSolved:
      "Reduces repeated pipeline work and helps teams standardise deployments with validation, approvals, and release controls.",
    architecture:
      "Reusable workflow templates standardise build, test, scan, approval, and deployment stages across environments.",
    tools: ["GitHub Actions", "Docker", "YAML", "Environments", "Branch Protection", "Deployment Approvals"],
    skillsDemonstrated: ["CI/CD Design", "Automation", "Release Governance", "Docker Builds", "Deployment Reliability"],
    demonstrates:
      "CI/CD design, automation, release governance, Docker builds, and deployment reliability.",
    implementationSteps: [
      "Define reusable workflow templates.",
      "Add build, test, scan, approval, and deployment stages.",
      "Standardise release controls across environments."
    ],
    projectUrl: "/projects/cicd-pipeline-factory/",
    githubUrl: "",
    liveDemoUrl: "",
    architectureUrl: "",
    articleUrl: "",
    ctas: [{ label: "View Pipeline", href: "/projects/cicd-pipeline-factory/", priority: "secondary" }],
    tags: ["CI/CD", "GitHub Actions", "Docker", "Releases"],
    relatedItems: [
      { name: "DevSecOps Pipeline Lab", href: "/projects/devsecops-pipeline-lab/", type: "Project" }
    ],
    featured: false
  },
  {
    slug: "devsecops-pipeline-lab",
    title: "DevSecOps Pipeline Lab",
    name: "DevSecOps Pipeline Lab",
    status: "Case Study",
    category: "DevSecOps",
    categories: ["All", "DevSecOps", "CI/CD Automation", "Case Studies"],
    description:
      "A secure software delivery pipeline with dependency scanning, container scanning, secret checks, IaC validation, and deployment gates.",
    problemSolved:
      "Helps teams catch security issues before deployment instead of discovering them after release.",
    architecture:
      "Security checks run inside CI/CD stages with policy gates before promotion to protected environments.",
    tools: ["GitHub Actions", "Docker", "Trivy", "IaC Validation", "Secret Scanning", "Branch Protection"],
    skillsDemonstrated: ["DevSecOps", "Secure CI/CD", "Vulnerability Management", "Release Controls"],
    demonstrates:
      "DevSecOps, secure CI/CD, vulnerability management, and release controls.",
    implementationSteps: [
      "Run dependency, container, secret, and IaC checks in CI.",
      "Use policy gates before environment promotion.",
      "Document the security flow for delivery teams."
    ],
    projectUrl: "/projects/devsecops-pipeline-lab/",
    githubUrl: "",
    liveDemoUrl: "",
    architectureUrl: "",
    articleUrl: "",
    ctas: [{ label: "View Security Flow", href: "/projects/devsecops-pipeline-lab/", priority: "secondary" }],
    tags: ["DevSecOps", "Scanning", "Security", "Gates"],
    relatedItems: [
      { name: "CI/CD Pipeline Factory", href: "/projects/cicd-pipeline-factory/", type: "Project" }
    ],
    featured: false
  },
  {
    slug: "production-observability-stack",
    title: "Production Observability Stack",
    name: "Production Observability Stack",
    status: "Demo / Case Study",
    category: "AIOps / Observability",
    categories: ["All", "AIOps / Observability", "Case Studies"],
    description:
      "A monitoring and alerting setup for applications and infrastructure using dashboards, metrics, logs, and incident response workflows.",
    problemSolved:
      "Shows how teams can detect failures, investigate issues, and respond faster with proper observability.",
    architecture:
      "Metrics, logs, alert rules, dashboards, and response notes form an operational view of application health.",
    tools: ["Prometheus", "Grafana", "Azure Monitor", "Log Analytics", "Alert Rules", "Dashboards"],
    skillsDemonstrated: ["Monitoring", "Alerting", "Dashboards", "Incident Response", "Operational Readiness"],
    demonstrates:
      "Monitoring, alerting, dashboards, incident response, and operational readiness.",
    implementationSteps: [
      "Define key application and infrastructure signals.",
      "Build dashboards, alert rules, and log views.",
      "Connect alerts to practical incident response notes."
    ],
    projectUrl: "/projects/production-observability-stack/",
    githubUrl: "",
    liveDemoUrl: "",
    architectureUrl: "",
    articleUrl: "",
    ctas: [{ label: "View Dashboard", href: "/projects/production-observability-stack/", priority: "secondary" }],
    tags: ["Observability", "Grafana", "Metrics", "Alerts"],
    relatedItems: [
      { name: "AIOps Incident Triage Assistant", href: "/projects/aiops-incident-triage/", type: "Project" }
    ],
    featured: false
  },
  {
    slug: "internal-developer-platform-blueprint",
    title: "Internal Developer Platform Blueprint",
    name: "Internal Developer Platform Blueprint",
    status: "Coming Soon",
    category: "Platform Engineering",
    categories: ["All", "Platform Engineering", "Coming Soon", "Case Studies"],
    description:
      "A platform engineering blueprint for developer self-service, golden paths, deployment templates, environment provisioning, and operational standards.",
    problemSolved:
      "Helps engineering teams reduce repetitive DevOps work and give developers a safer, standard way to ship applications.",
    architecture:
      "A self-service layer combines templates, CI/CD patterns, provisioning workflows, and operational standards.",
    tools: ["Backstage-style Platform Concept", "Templates", "CI/CD", "Terraform", "Kubernetes", "GitHub Actions"],
    skillsDemonstrated: ["Platform Engineering Strategy", "Developer Experience", "Automation", "Standardisation"],
    demonstrates:
      "Platform engineering strategy, developer experience, automation, and standardisation.",
    implementationSteps: [
      "Map developer golden paths.",
      "Define reusable templates and environment workflows.",
      "Connect platform standards to CI/CD and operations."
    ],
    projectUrl: "/projects/internal-developer-platform-blueprint/",
    githubUrl: "",
    liveDemoUrl: "",
    architectureUrl: "",
    articleUrl: "",
    ctas: [{ label: "View Concept", href: "/projects/internal-developer-platform-blueprint/", priority: "secondary" }],
    tags: ["IDP", "Golden Paths", "Platform", "DevEx"],
    relatedItems: [
      { name: "Terraform AKS GitOps Platform", href: "/projects/terraform-aks-gitops-platform/", type: "Project" }
    ],
    featured: false
  }
];
