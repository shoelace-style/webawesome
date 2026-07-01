1. Landing page — Foundry (embedded CI/CD)

Using Web Awesome, build a marketing landing page for Foundry — a CI/CD platform for embedded systems engineers (firmware, RTOS, automotive, medical devices). Founded by two ex-Tesla firmware leads who got tired of duct-taping Jenkins to bench rigs. Audience is staff engineers and engineering directors at hardware companies who have heard every "deploy faster" pitch and are skeptical of anything that sounds web-first. Tone is dry, technical, confident. Think Tailscale or Linear's "we just ship things that work" voice, not Vercel's playfulness. Never the word "magic." Never the phrase "developer experience."

Header: nav (Product, Pricing, Docs, Changelog), small "Status: All systems operational" indicator on the right with a green dot, mobile drawer. Hero: headline ("Stop waiting on builds. Ship firmware faster."), one short supporting paragraph (two sentences), primary "Start free — no credit card" and secondary "Watch 2-minute demo." Below the hero: a small row of three real-feeling logos (use text placeholders like "ACME ROBOTICS," "VOLTAGE LABS," "MIDDLE-OUT MOTORS"). Then a three-feature row: "Cross-compilation matrix" (build for 14 targets in parallel), "Hardware-in-the-loop tests" (real boards, real I/O), "OTA staging" (canary releases, rollback in 30 seconds). A short pricing teaser ("Free for teams under 5. Paid tiers from $99/mo per project."). Footer with three columns and a small "SOC 2 Type II compliant" badge.

Save the complete HTML to /Users/brian/Projects/shoelace-style/webawesome-app/webawesome/packages/webawesome/scripts/design-skill/test-prompts/outputs/scratch/landing.html

2. App shell — Cinder (anti-budget personal finance)

Using Web Awesome, build the dashboard view of Cinder, a personal finance app for people who hate budgeting apps. No envelopes, no categories, no gamification. Just: "is your number going up?" Built by a former Google PM who lost three weekends to YNAB and decided there had to be a less anxious way. Audience is design-minded professionals 30-45 who already know how to budget and want a quiet weekly check-in, not a daily fight. Tone is calm, confident, low-saturation. Like Stripe Atlas or Linear, not Mint. Never "smart," never "powerful," never "all-in-one."

Wa-page app shell. Left sidebar nav: Net worth (active), Accounts, Trends, Settings. Top bar: page title "Net worth," current month dropdown (June 2026), user avatar with initials "AL" (Ada Lovelace). Main area: three summary cards in a grid — "Net worth" ($142,308, +2.1% this month, with a tiny sparkline placeholder), "Liquid" ($18,420, "covers 4.4 months of burn"), "Burn rate" ($4,210/mo, "down from $4,560 in May"). Below the cards: an "Accounts" section with a clean list of five accounts (Schwab Brokerage, Ally Savings, Chase Checking, Vanguard 401k, Wealthfront) — each row shows institution, account type tag, last-4, balance, and a small "Synced 2 hours ago" timestamp. Below that, an empty-state-ish section titled "Net worth over time" with a placeholder chart area and a quiet note: "12 months of history once your accounts have been connected long enough." The interface should feel almost too quiet — that's the brand.

Save the complete HTML to /Users/brian/Projects/shoelace-style/webawesome-app/webawesome/packages/webawesome/scripts/design-skill/test-prompts/outputs/scratch/app-shell.html

3. Pricing — Marshfield (thoughtful podcast hosting)

Using Web Awesome, build a three-tier pricing page for Marshfield, an indie podcast hosting service founded in 2022 in Marshfield, Vermont (population 1,500). The company is six people, profitable, and proud of it. They compete with Buzzsprout and Transistor by being more thoughtful and less salesy — the founder is on record saying "we don't want to host a million podcasts, we want to host the right ones." Audience: serious independent podcasters (journalists, essayists, designers running side projects) who would rather pay $29 for something well-made than get gouged later on a "free" tier. Tone is warm, plainspoken, occasionally dry. Like Are.na's pricing page, not Squarespace's. Never "unleash," never "supercharge," never use the word "creators" as a category.

Header: small wordmark, nav (Why Marshfield, Pricing, Help, Sign in), no flashy CTA. A short page lede above the pricing grid: one or two sentences about how they price honestly and don't run lifetime deals.

Three tier cards. (1) "Solo" — $9/mo — "For your first show." One show, basic analytics, 10GB storage, email support. CTA: "Start with Solo." (2) "Studio" — $29/mo — marked as Most Popular via a small badge in the card header (not an absolute-positioned ribbon). "For shows that are starting to take off." Three shows, monetization tools, automatic transcript generation (en + es), 50GB, priority support. CTA: "Start with Studio." (3) "Network" — $89/mo — "For producers running a small network." Unlimited shows, custom domains, team seats, dedicated CSM, 250GB, SLA. CTA: "Talk to us."

Below the grid: a small "What's not on the list" section with three plain-language bullets (no annual commitments, no ads in your feed ever, no surprise overage charges). Then a quiet FAQ section with five real questions (Can I switch tiers anytime, what counts as a "show", what happens if I exceed storage, do you have a free trial, what's your refund policy).

Save the complete HTML to /Users/brian/Projects/shoelace-style/webawesome-app/webawesome/packages/webawesome/scripts/design-skill/test-prompts/outputs/scratch/pricing.html

4. Empty state — Riverwidth (freelance invoicing, day-one user)

Using Web Awesome, build the empty-state screen a brand-new Riverwidth user sees the first time they open the Invoices area. Riverwidth is a freelance invoicing tool built by a former freelance designer (Hanna Riverwidth, based in Stockholm) who got tired of FreshBooks and Wave being either too small or too enterprise. The brand wants to feel like an indie tool made by someone who actually knows the pain — friendly without being twee, professional without being cold. Voice: think Tito (the conference tool) or HEY's onboarding. Never "amazing," never "let's get started!", never use exclamation points more than once on the screen.

This is a moment of trust: the user just signed up, finished onboarding, and clicked Invoices in the sidebar. The screen should make them feel like they're in the right place, not lost. Centered empty state in a contained column: a generously sized icon (an invoice / scroll / paper-style glyph), a heading "Your invoices live here," one supporting line "Send your first one and watch this space fill up. Most freelancers get paid 23% faster when invoices look this good." A primary CTA "Create your first invoice" and a small text link below it "or import from FreshBooks." Below the empty state, a small secondary band — visually quieter — with three one-line tips paired with small icons: "Use a draft to test the look," "Templates remember your branding," "Reminders go out automatically — you control the cadence."

Save the complete HTML to /Users/brian/Projects/shoelace-style/webawesome-app/webawesome/packages/webawesome/scripts/design-skill/test-prompts/outputs/scratch/empty-state.html

5. Docs — Halftone (print-on-demand CSS framework)

Using Web Awesome, build the Typography section page of the documentation for Halftone, a small open-source CSS framework for print-on-demand zine layouts. Halftone was created by Alex Halftone (Brooklyn-based art director, ran a screenprint shop in the 2010s before moving into web type). The framework's whole identity is rebelling against web typography's mediocrity: tight kerning, real ligatures, intentional line lengths, hyphenation rules, generous baselines. Audience: designers and design-engineers who care about typography enough to install a CSS framework just for it. Tone is opinionated, slightly snobby in a charming way, occasionally funny. Voice: think Practical Typography (Matthew Butterick) or Robin Rendle's blog. Never "elegant," never "beautiful" as a generic compliment, never the word "stunning."

Wa-page docs layout. Left sidebar nav: Getting started, Layout, Typography (active), Color, Print bleed, Recipes, Changelog. Subheader with breadcrumb (Home › Guide › Typography) and a small mobile-only menu toggle. Main column: page heading "Typography," a one-paragraph lede that establishes Halftone's stance on type, then three subsections with proper h2's: (1) "Type scale" — a paragraph or two on why Halftone uses a modular scale of 1.125, a small "scale at a glance" inline mini-table showing six steps with sizes and use cases, and an `info` callout explaining how to override the scale. (2) "Vertical rhythm" — paragraphs on baseline grid, a code-block example, and a `warning` callout about the most common pitfall (forgetting to set `line-height` on headings). (3) "Print-safe fonts" — a paragraph, a `danger` callout about web-only fonts that don't embed well in PDF, and a small two-column list of "Safe choices" / "Avoid for print." Right aside: "On this page" sticky table-of-contents with the three subsection headings. Footer: previous/next page navigation ("← Layout" / "Color →").

Save the complete HTML to /Users/brian/Projects/shoelace-style/webawesome-app/webawesome/packages/webawesome/scripts/design-skill/test-prompts/outputs/scratch/docs.html

6. Team — Glasshouse (natural-history museum)

Using Web Awesome, build a "The team behind the catalog" page for Glasshouse, the small in-house digital team at a mid-sized natural history museum in a major US city. The museum has existed since 1897; the digital team was spun up in 2021 to modernize the public-facing collection catalog (think the Met's or AMNH's online collection, but smaller and weirder). The page lives inside the museum's public website. Brand: institutional, considered, never trendy. Voice: think the V&A or Cooper Hewitt's editorial copy. Never "passionate," never "rockstar," never use the word "love" to describe job duties.

Page contents: a top bar with the museum logo placeholder and museum-site nav (Visit, Collection, Exhibitions, Learn, About), nothing app-shell. Below: a page heading "The team behind the catalog," a lede paragraph (3-4 sentences) explaining who the digital team is, what they're responsible for (the online catalog of ~280,000 specimens), and why the museum decided to build it in-house instead of contracting it out. Below the lede: a responsive grid of six team members. Each is a wa-flank media object with a real headshot placeholder on the left (use wa-frame:square with a token-based placeholder, no broken image src) and on the right: name, role title, a one-line bio (where they came from, what they specialize in), and 2-3 skill/interest tags. Use real-feeling, diverse names (skip "John Doe" placeholders — pick names that suggest different backgrounds, e.g. Wei Chen, Adaeze Okonkwo, Felipe Souza, Ingrid Lindqvist, Tomás Vargas, Priya Raghunathan). Roles: Director of Digital Programs, Senior Cataloguer, Frontend Engineer, Conservation Photographer, Digital Archivist, UX Researcher. After the grid: a quiet "Want to work with us?" section at the bottom — one sentence + a "See open roles" text link, not a button.

Save the complete HTML to /Users/brian/Projects/shoelace-style/webawesome-app/webawesome/packages/webawesome/scripts/design-skill/test-prompts/outputs/scratch/team.html

---
7. Stress test — Quadrant (multi-tenant SaaS admin console)

Using Web Awesome, build the workspace-admin page of Quadrant — a multi-tenant project management SaaS used by mid-market design and engineering agencies (50-500 employees). The signed-in user is an account admin at "Brightside Studio," a 142-person product design agency in Toronto. Quadrant's brand: utilitarian-but-considered, like Linear or Vercel's dashboard pages but with more density (it's an admin tool, not a marketing site). The user is here to manage their team's seats, billing, integrations, and security settings — they have a real job to do, not be delighted. Voice in copy: terse, professional, unfussy. Never "easily," never "simply." If something is destructive, the copy says so plainly.

This is the stress test. The page needs the full app shell PLUS dense data composition, so the skill's full surface gets exercised:

Wa-page with: a top header bar showing the Quadrant wordmark, the current workspace name "Brightside Studio" with a small "switch workspace" dropdown trigger beside it, a global search input in the middle of the header, a notification bell with a "3" badge, and the user's avatar (initials "MK"). A left navigation sidebar with sections grouped under headings — "Workspace" (Members, Teams, Billing, Integrations, Security — Security is active), "Personal" (Profile, Notifications, API tokens) — and a footer block in the navigation-footer slot with the workspace plan badge ("Business plan — $1,990/mo") and a small "Upgrade options" link.

Main content: subheader with breadcrumb ("Workspace › Security") and a primary action button on the right ("Export audit log"). Below: a tab group with four tabs: "Authentication" (active), "Audit log," "Sessions," "Compliance." Active tab content is a stack of grouped sections:

1. "Single sign-on" — a section card with a status badge ("Enabled — Okta SAML"), a small label-value list (Identity provider, Login URL last 30 chars, Certificate thumbprint, Last verified date), and three buttons (Edit configuration, Test connection, Disable). One inline warning callout: "Disabling SSO will require all 142 members to re-establish password authentication."

2. "Two-factor enforcement" — a switch row showing 2FA is required workspace-wide, plus a small data row showing "138 of 142 members enrolled" with a "View 4 unenrolled" link.

3. "Allowed email domains" — a section with a tags row showing 3 domains (@brightside.studio, @brightside.contractors, @parent-co.com) — each tag has a remove control. Below the tags, a small input + add button to add a new domain.

4. "IP allowlist" — a table with 7 rows: CIDR range, label (Office HQ, Office NYC, Founder home offices, etc.), added by, added date, and a row-action menu (... button). Above the table, a small toolbar with a "Search" input on the left and "Add range" button on the right.

5. "API access" — a card showing "12 active personal access tokens" with a "Manage" link, and below it a sub-card listing 3 service tokens (name, last-used timestamp, scopes shown as small tags, rotate/revoke actions).

6. Danger zone, visually separated with a top border or tinted band: "Reset workspace encryption keys" with a clear destructive button that opens a confirm dialog requiring the user to type the workspace name to confirm.

Right aside (wa-page aside slot) on desktop only: a small "Security score" card showing 87/100 with a tiny progress bar, a stacked list of "Things to improve" with three checklist items, and a "Last audited" timestamp.

Color and density requirements: use the brand color (default brand is fine), use semantic surface tokens correctly so the sub-cards sit on a slightly lowered surface than the page, and apply the "spacing between groups beats within them" principle — sections are loosely spaced; rows inside a section are tightly spaced.

Save the complete HTML to /Users/brian/Projects/shoelace-style/webawesome-app/webawesome/packages/webawesome/scripts/design-skill/test-prompts/outputs/scratch/admin-console.html

8. Fiddly form — Pasture (USDA-compliant livestock import application)

Using Web Awesome, build a single-page government form: the "Imported livestock declaration" submission form for Pasture, a small civic-tech firm hired by a state department of agriculture to modernize their paper forms. Audience: ranch owners and import brokers filling this out themselves on a laptop (sometimes a phone in a barn). Brand: official, trustworthy, plain. Voice: not warm, not cold — useful. Like the IRS's better online forms (Free File Fillable) or California's MyShake disaster app. Never "let's," never any contraction in error messages, never an exclamation point.

This isn't a stress test of breadth — it's a stress test of depth on one screen: form composition, field validation, accessibility, conditional logic, and copy.

Page structure: a thin header bar with the State Department of Agriculture seal placeholder and a small "Session expires in 28:14" indicator on the right (live countdown styling, but no actual JS needed). Below: a contained main column (not full-bleed) with a heading ("Imported livestock declaration"), a one-paragraph lede explaining what the form is for and that it must be filed within 72 hours of crossing state lines, and a small alert callout reminding the user that knowingly false declarations are a federal offense. Then the form, organized into five fieldsets with proper `<legend>` semantics:

1. "Importer information" — Legal name (required, text), Business name (optional, text), USDA Premises ID (required, text with helper "7-digit alphanumeric, e.g. NY12345A"), Phone (required, tel), Email (required, email). Show one field — Premises ID — in a real validation error state with a specific message ("The format is 2-letter state code + 5 digits + 1 letter. Example: NY12345A.").

2. "Animals being imported" — a select for Species (Cattle / Swine / Sheep / Goats / Poultry / Other), Count (number input, min 1), Total estimated value (currency input). If "Other" were selected, a conditional text field "Specify species" should appear (build the conditional show/hide logic with CSS-only via :has() or a small inline script — pick one and make it work).

3. "Origin and route" — Origin state/country (select), Date of crossing (date input), Port of entry (select — populate with 8 real-feeling crossings, e.g. "Niagara Falls Bridge — Buffalo, NY"), Transporter company (text), USDA-accredited veterinarian on file (radio: Yes / No / Pending).

4. "Health certificates" — A file-upload area for the Certificate of Veterinary Inspection (CVI). Below the upload, an editable list of vaccination records — start with three pre-filled rows (each row: Disease, Date administered, Lot number, Vet license #) with a "Remove" button per row, plus an "Add another vaccination" button below the list. The list should grow/shrink visibly via a small inline script if needed, but the markup pattern matters more than the JS — show how Web Awesome wants this composed.

5. "Attestation" — Three checkboxes (each with a specific full-sentence legal statement, not just labels), then a signature field (text input labeled "Type your full legal name as signature") and a date field (auto-filled to today). At the bottom of the fieldset, a "Save draft" button (plain) and a primary "Submit declaration" button.

After the form: a quiet aside with "What happens next" — three numbered steps (review in 1-2 business days, possible follow-up call, approval notice via email).

Accessibility constraints: every input must have a visible label, helper text uses the documented input pattern (not a separate `<small>` underneath), the error state on Premises ID uses the input's documented error API (not a hand-rolled red div), required fields are visibly indicated (asterisk or "(required)"), and the form's tab order makes sense top-to-bottom.

Save the complete HTML to /Users/brian/Projects/shoelace-style/webawesome-app/webawesome/packages/webawesome/scripts/design-skill/test-prompts/outputs/scratch/livestock-form.html
