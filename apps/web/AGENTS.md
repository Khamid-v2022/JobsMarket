<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Frontend Styling Rules

- Use Tailwind CSS classes first for UI styling in this app.
- Avoid custom CSS when a Tailwind utility or composition can express the same result.
- Do not use inline CSS styles in React components.
- Do not embed custom CSS fragments directly in markup when the same result can be expressed with standard Tailwind utilities.
- If custom styling is genuinely necessary, keep the current structure and use SCSS for that styling.
- Put unavoidable custom styling in a separate SCSS file instead of inside the component.
- Treat existing or new plain CSS as exceptional; prefer SCSS files for non-Tailwind styling.
