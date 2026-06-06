# ODT-HPC-Docs

HPC Docs / User Guide built with Next.js.

## Getting Started

```bash
git clone https://github.com/Krissana-PPY/ODT-HPC-Docs.git
cd ODT-HPC-Docs/hpc-docs
npm ci
npm run dev
```

Open `http://localhost:3000` in your browser.

## Production Build

```bash
npm run build
npm start
```

## Docker

You can also run the project with Docker:

```bash
docker compose up --build
```

## Notes

- `node_modules` and `.next` are intentionally excluded from Git.
- Keep `package-lock.json` committed so installs are reproducible.
