# Claude Skills Library

A collection of 36 skills for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — Anthropic's CLI for Claude. These skills extend Claude's capabilities with specialized knowledge for marketing, CRO, development workflows, and more.

**By tyr0nin - AiAiOHHH**

## Quick Install

```bash
# Clone the repo
git clone https://github.com/tyronin/claude-skills-library.git
cd claude-skills-library

# Install all skills
./install.sh

# Or install a single skill
cp -r skills/copywriting ~/.claude/skills/
```

Restart Claude Code after installing to pick up new skills.

## Skills

### Marketing & Copy

| Skill | Description |
|-------|-------------|
| **copywriting** | Write or improve marketing copy for any page — homepage, landing, pricing, features, about |
| **copy-editing** | Systematic approach to editing marketing copy through multiple focused passes |
| **content-strategy** | Plan content strategy, topic clusters, and what to write about |
| **social-content** | Create and optimize social media content for LinkedIn, Twitter/X, Instagram, TikTok |
| **email-sequence** | Design email sequences, drip campaigns, and lifecycle email programs |
| **competitor-alternatives** | Create competitor comparison and alternative pages for SEO and sales |
| **product-marketing-context** | Create reusable product marketing context that other skills reference |

### Conversion Rate Optimization (CRO)

| Skill | Description |
|-------|-------------|
| **page-cro** | Optimize conversions on any marketing page — homepage, landing, pricing, features |
| **signup-flow-cro** | Optimize signup, registration, and trial activation flows |
| **form-cro** | Optimize lead capture, contact, demo request, and checkout forms |
| **popup-cro** | Create and optimize popups, modals, overlays, slide-ins, and banners |
| **onboarding-cro** | Optimize post-signup onboarding, activation, and time-to-value |
| **paywall-upgrade-cro** | Create and optimize in-app paywalls, upgrade screens, and upsell modals |

### Growth & Strategy

| Skill | Description |
|-------|-------------|
| **launch-strategy** | Plan product launches, feature announcements, and go-to-market |
| **pricing-strategy** | Pricing decisions, tier structure, packaging, and monetization |
| **marketing-ideas** | 139 proven marketing approaches organized by category |
| **marketing-psychology** | 70+ mental models and psychological principles for marketing |
| **paid-ads** | Campaign strategy for Google Ads, Meta, LinkedIn, TikTok |
| **referral-program** | Design referral programs, affiliate programs, and viral loops |
| **free-tool-strategy** | Plan free tools for lead generation and SEO (engineering as marketing) |
| **ab-test-setup** | Plan, design, and implement A/B tests and experiments |
| **analytics-tracking** | Set up and audit analytics tracking — GA4, Mixpanel, Segment |

### SEO

| Skill | Description |
|-------|-------------|
| **seo-audit** | Audit and diagnose SEO issues — technical SEO, on-page, meta tags |
| **programmatic-seo** | Create SEO-driven pages at scale using templates and data |
| **schema-markup** | Add and optimize schema markup and structured data (JSON-LD) |

### Development & Engineering

| Skill | Description |
|-------|-------------|
| **brainstorming** | Collaborative design exploration before any creative/feature work |
| **writing-plans** | Create detailed implementation plans from specs and requirements |
| **test-driven-development** | TDD workflow — write failing tests before implementation |
| **systematic-debugging** | Structured debugging approach for any bug or test failure |
| **verification-before-completion** | Verify work is actually done before claiming completion |
| **webapp-testing** | Test web apps using Playwright — screenshots, browser logs, UI verification |

### Creative & Meta

| Skill | Description |
|-------|-------------|
| **flowy** | Visual flowchart and diagram planning — renders interactive diagrams in browser |
| **frontend-design** | Create distinctive, production-grade frontend interfaces with high design quality |
| **mcp-builder** | Guide for creating MCP (Model Context Protocol) servers |
| **skill-creator** | Guide for creating new Claude Code skills |
| **remotion-best-practices** | Best practices for Remotion — video creation in React |

## How Skills Work

Skills are markdown files (`SKILL.md`) placed in `~/.claude/skills/<skill-name>/`. When Claude Code detects a relevant user request, it automatically loads the matching skill to provide specialized knowledge and workflows.

Each skill can be invoked manually with `/<skill-name>` in Claude Code, or triggered automatically based on the task context.

### Skill Structure

```
~/.claude/skills/
  copywriting/
    SKILL.md          # Main skill definition
    references/       # Optional supporting docs
  flowy/
    SKILL.md
    server.js         # Optional bundled tools
    index.html
```

## License

MIT License - see [LICENSE](LICENSE) for details.

Some skills contain derivative works from Apache 2.0 licensed originals (frontend-design, mcp-builder, skill-creator, webapp-testing). See their individual LICENSE.txt files.

---

*By tyr0nin - AiAiOHHH*
