# Qirui Huang — Personal Academic Homepage

Source code for [qrhuang2021.github.io](https://qrhuang2021.github.io/).

## Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Writing a blog post

1. Add the Markdown body at `src/content/blog/<slug>.md`.
2. Add its title, date, summary, and matching slug to `src/content/posts.js`.
3. Run the checks above and preview the article at `/#/blog/<slug>`.

Keep article metadata in `posts.js`; Markdown files contain only the article body.
Optimized article images belong in `public/images/blog/<slug>/` and can be
referenced from Markdown as `/images/blog/<slug>/<file>`.

The site is built with React, Vite, and Tailwind CSS. Pushes to `main` are
automatically deployed to GitHub Pages by GitHub Actions.
