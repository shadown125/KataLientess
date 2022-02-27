const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const { createSecureHeaders } = require("next-secure-headers");
const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      images: {
        domains: ['res.cloudinary.com'],
      },
      env: {
        MONGODB_USERNAME: process.env.MONGODB_DEV_USERNAME,
        MONGODB_PASSWORD: process.env.MONGODB_DEV_PASSWORD,
        MONGODB_CLUSTERNAME: process.env.MONGODB_DEV_CLUSTERNAME,
        MONGODB_CLUSTER_IDENTIFIER: process.env.MONGODB_DEV_CLUSTER_IDENTIFIER,
        MONGODB_DATABASE: process.env.MONGODB_DEV_DATABASE,
        NEXT_PUBLIC_API_MOCKING: "enabled",
      }
    }
  }

  return {
    reactStrictMode: true,
    images: {
      domains: ['res.cloudinary.com'],
    },
    env: {
      MONGODB_USERNAME: process.env.MONGODB_PROD_USERNAME,
      MONGODB_PASSWORD: process.env.MONGODB_PROD_PASSWORD,
      MONGODB_CLUSTERNAME: process.env.MONGODB_PROD_CLUSTERNAME,
      MONGODB_CLUSTER_IDENTIFIER: process.env.MONGODB_PROD_CLUSTER_IDENTIFIER,
      MONGODB_DATABASE: process.env.MONGODB_PROD_DATABASE,
      NEXT_PUBLIC_API_MOCKING: "disabled",
    },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: createSecureHeaders({
            contentSecurityPolicy: {
              directives: {
                defaultSrc: [
                  "'self'",
                  "https://api.cloudinary.com/",
                ],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:", "https://res.cloudinary.com/"],
                baseUri: "self",
                formAction: "self",
                frameAncestors: true,
              },
            },
            frameGuard: "deny",
            noopen: "noopen",
            nosniff: "nosniff",
            xssProtection: "sanitize",
            forceHTTPSRedirect: [
              true,
              { maxAge: 60 * 60 * 24 * 360, includeSubDomains: true },
            ],
            referrerPolicy: "same-origin",
          }),
        },
      ];
    },
    webpack(config) {
      config.output.crossOriginLoading = "anonymous";
      config.plugins.push(
          new SubresourceIntegrityPlugin()
      );
      return config;
    }
  }
}
