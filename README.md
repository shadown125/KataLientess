![license](https://img.shields.io/github/license/shadown125/Katalientess)
![codeSize](https://img.shields.io/github/languages/code-size/shadown125/Katalientess?logo=GitHub)
![securityHeaders](https://img.shields.io/security-headers?color=%09%2332CD32&url=https%3A%2F%2Fwww.katalientess.com%2F)
![lastCommit](https://img.shields.io/github/last-commit/shadown125/katalientess?logo=GitHub)
<a href="https://www.katalientess.com/" target="_blank" rel="external noopener"><img alt="KataLientesS App" src="/src/pics/website.svg"></a>

## Getting Started

Hello, :)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the command for install npm packages:

```bash
npm install
# or
yarn install
```

After that set up your <b>Local Environments</b>.

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You will find all pages under `pages/` folder, so you can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

Styles are under `src/styles` folder. Styles are written in Dart Sass and every folder represents module which is styled.
If you want to change styles you need to run Sass watcher:

```bash
npm run watch
```
For Production, you need to run the build script for styles:
```bash
npm run stylebuild
```

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/](http://localhost:3000/api/). These endpoints can be edited in `pages/api/`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Setup Local Environment

You need to setup a few API keys for this project to be setup correctly otherwise you won't run this Project properly.

- [MongoDB](https://docs.mongodb.com/)
- [Cloudinary](https://cloudinary.com/documentation)

For that, you need to create a .env.local file in your project as [shown in docs](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables) that will look like this:

```
NEXTAUTH_URL=<REPLACE THIS(it will be mostly: http://localhost:3000)>
SECRET=<REPLACE THIS>
NEXT_PUBLIC_IMAGE_CLOUD_NAME=<REPLACE THIS>
NEXT_PUBLIC_IMAGE_CLOUD_URL=<REPLACE THIS>
MONGODB_DEV_USERNAME=<REPLACE THIS>
MONGODB_DEV_PASSWORD=<REPLACE THIS>
MONGODB_DEV_CLUSTERNAME=<REPLACE THIS>
MONGODB_DEV_CLUSTER_IDENTIFIER=<REPLACE THIS>
MONGODB_DEV_DATABASE=<REPLACE THIS>
MONGODB_PROD_USERNAME<REPLACE THIS>
MONGODB_PROD_PASSWORD<REPLACE THIS>
MONGODB_PROD_CLUSTERNAME<REPLACE THIS>
MONGODB_PROD_CLUSTER_IDENTIFIER<REPLACE THIS>
MONGODB_PROD_DATABASE<REPLACE THIS>
```

If you only want to use Dev server then you can use same MongoDB data for PROD env's.

You can retrieve the above environment values by referring their docs linked above and once retrieved, paste above accordingly.

<h3 style="color:orange;">Note!! This App is in build progress which does not reflect the final state.</h3>
