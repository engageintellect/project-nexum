# project-nexum

## Technologies
- SvelteKit
- PocketBase
- OpenAI
- Zod
- TailwindCSS
- DaisyUI
- TinyMCE
- Read Time
- Svelte French Toast

## Getting Started

```bash
# create a new project in the current directory
git clone <REPO>

cd <REPO>

# create a new project in my-app
pnpm install
```

# Environment Variables

**Note:** You'll need to replace the values with your own environment variables.

```bash
# cp .env.example .env
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open

# you can also host your dev session on your local network, allowing you to test on other devices. Use --host to specify the host you want to use:

pnpm run dev --host
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
