
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.discovod.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      // {
      //   protocol: "https",
      //   hostname: "https://unlined-glacial-luridness.ngrok-free.dev",
      // },

    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              // Default policy
              "default-src 'self'",

              // JavaScript
              // unsafe-inline/eval kept for Next.js/library compatibility
              "script-src 'self' 'unsafe-inline'",

              // Tailwind / Next.js / component inline styles
              "style-src 'self' 'unsafe-inline'",

              // Local images + API/media images
              "img-src 'self' data: blob: https://api.discovod.com",

              // Local fonts
              "font-src 'self' data:",

              // API + Socket.IO polling + WebSocket
              "connect-src 'self' https://api.discovod.com wss://api.discovod.com",

              // Local media + backend media
              "media-src 'self' https://api.discovod.com blob:",

              // PWA / Service Worker / Web Worker
              "worker-src 'self' blob:",

              // Disable plugins
              "object-src 'none'",

              // Prevent malicious base URL injection
              "base-uri 'self'",

              // Restrict form submissions
              "form-action 'self'",

              // Prevent clickjacking
              "frame-ancestors 'self'",

              // Upgrade HTTP resources to HTTPS
              "upgrade-insecure-requests",
            ].join("; "),
          },

          // Prevent MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },

          // Referrer protection
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },

          // Disable unnecessary browser capabilities
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },

          // HTTPS enforcement
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;




// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: "standalone",
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "api.discovod.com",
//       },
//       {
//         protocol: "http",
//         hostname: "localhost",
//       },
//       {
//         protocol: "http",
//         hostname: "[IP_ADDRESS]",
//       },
//     ],
//   },
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ["@svgr/webpack"],
//     });
//     return config;
//   },
//   turbopack: {
//     rules: {
//       "*.svg": {
//         loaders: ["@svgr/webpack"],
//         as: "*.js",
//       },
//     },
//   },
// };

// export default nextConfig;
