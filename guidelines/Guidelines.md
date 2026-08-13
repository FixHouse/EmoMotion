# EmoMotion Design Guidelines

Use these rules when changing the EmoMotion site design, UI, UX, accessibility, SEO trust, social previews, or registration flow.

## Brand

- EmoMotion should feel warm, playful, caring, and credible for parents choosing classes for children.
- Use the existing pastel palette: pink, sky blue, yellow, mint, white, and neutral gray.
- Avoid turning the whole interface into one dominant color theme.
- Keep EmoMotion and the class signup path visible in the first viewport.

## UI And UX

- Prefer existing React/Tailwind patterns and components.
- Use lucide icons for interface actions when an icon exists.
- Keep sections scannable: age, location, days, time, price, and CTA should be easy to find.
- Avoid nested cards and decorative card-heavy layouts.
- Keep mobile layouts stable with no overlapping text, hidden controls, or horizontal scroll.
- Use animation to guide attention, not distract from reading or signup.

## Trust And Conversion

- A clicked schedule card should prefill the signup form with the selected location and group.
- Payment copy must never say or imply success unless payment is actually confirmed.
- Form copy should clearly explain what happens next.
- Trust claims should be specific, modest, and verifiable.

## SEO And Sharing

- Preserve title, description, canonical URL, language alternates, Open Graph, and Twitter metadata.
- Use a dedicated 1200x630 social preview image when adding or changing OG image.
- Keep important location and age-group content visible in the DOM.

## Verification

- Run `npm run typecheck`, `npm run lint`, and `npm run build` after code changes.
- For visual changes, check at least one mobile viewport and one desktop viewport when tooling is available.
