# GW2 Tools

A collection of small tools for **Guild Wars 2**, including a reset checklist and a Magic Find calculator.

## Features

- **Reset Checklist**: Track daily and weekly tasks, view reset timers, and choose which tasks are displayed.
- **Magic Find Calculator**: Select bonuses and calculate your current Magic Find total, up to the game's 750% cap.
- **External resources**: Find links to community tools for account management, trading, and farming.

## Tech Stack

- SvelteKit and Svelte 5
- TypeScript
- Vite and Tailwind CSS
- Node.js 22 for the Docker image

## Development

Requirements: Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Vite prints the local development URL in the terminal. To check the project or create a production build, run:

```sh
npm run check
npm run lint
npm run build
```

## Docker

The included Compose file runs the published `henahax/gw2-tools:latest` image and makes the app available on port `8080`:

```sh
docker compose up -d
```

View the container logs with `docker compose logs -f gw2-tools` and stop the service with `docker compose down`.
