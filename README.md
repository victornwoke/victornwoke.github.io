# Victor Nwoke Portfolio

Personal portfolio website for **Victor Nwoke** - Cloud, DevOps, Azure, CI/CD, and infrastructure automation professional.

Live site:

```text
https://victornwoke.com
```

## Overview

This portfolio showcases my work as a Cloud/DevOps engineer, including Azure infrastructure, CI/CD automation, DevOps projects, cloud architecture, and production-readiness work.

The site is designed to support both:

* recruiters reviewing my technical experience
* clients looking for Azure, DevOps, CI/CD, and cloud infrastructure support

## Portfolio Focus

The portfolio highlights:

* Cloud infrastructure
* DevOps engineering
* CI/CD pipelines
* infrastructure automation
* cloud architecture
* production readiness
* technical project case studies
* VibeDeploy, my AI app production-readiness product

## Featured Product

### VibeDeploy

**AI can build the demo. I make it production-ready.**

VibeDeploy is a DevOps-focused product that helps founders and AI app builders check whether their apps are ready for production across:

* CI/CD
* secrets handling
* environment variables
* deployment setup
* monitoring
* documentation
* backups
* staging and production separation
* launch risk

Live product:

```text
https://vibedeploy.victornwoke.com
```

## Site Structure

The portfolio includes:

```text
Home
About
Skills
Projects
Experience
Featured Product
Contact
```

## Deployment

This portfolio is deployed as a static website using GitHub Pages.

The repository currently contains the built static site files, including:

```text
index.html
assets/
.github/workflows/
README.md
```

The deployment workflow is located at:

```text
.github/workflows/static.yml
```

## Contact Form

The contact form uses Formspree so messages can be sent from static hosting without a custom backend.

Fallback email:

```text
victornwoke147@outlook.com
```

The Formspree form ID is configured in `index.html`:

```html
window.VICTOR_PORTFOLIO_CONFIG = {
  formspreeFormId: "YOUR_FORM_ID"
};
```

If Formspree provides this endpoint:

```text
https://formspree.io/f/abcdwxyz
```

then set:

```html
window.VICTOR_PORTFOLIO_CONFIG = {
  formspreeFormId: "abcdwxyz"
};
```

## Contact Form Behaviour

The contact form should:

* collect name, email, subject, and message
* send messages through Formspree
* show a loading state while sending
* show a success message only after Formspree confirms delivery
* show an error message if submission fails
* keep the fallback email visible
* avoid storing form data in localStorage or sessionStorage
* avoid logging form data to the browser console

## Important Notes

This repository currently contains the deployed static portfolio, not the original React/Vite source project.

There is currently no local build command such as:

```bash
npm run build
npm run lint
npm run check
```

If the original source project is restored later, update the deployment workflow to build from source before publishing.

## Security Notes

Do not commit:

```text
.env
.env.local
API keys
private keys
tokens
passwords
production credentials
```

Only public configuration values, such as a Formspree form ID, should be included in the static site.

## Future Improvements

Planned improvements include:

* improve the VibeDeploy featured product section
* add a dedicated VibeDeploy case study page
* strengthen project cards with problem, tools, outcome, GitHub link, and live demo
* restore the original source project in a separate branch or repository
* add build-time validation if the source project is restored
* improve accessibility and mobile layout where needed

## Owner

Victor Nwoke

```text
Website: https://victornwoke.com
Email: victornwoke147@outlook.com
VibeDeploy: https://vibedeploy.victornwoke.com
```
