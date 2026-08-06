const nextTranslate = require('next-translate-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // منع حزم المكتبات الثقيلة داخل الدالة السحابية للـ Serverless
  experimental: {
    serverComponentsExternalPackages: [
      '@milkdown/kit',
      '@milkdown/core',
      '@milkdown/react',
      '@sentry/nextjs',
      '@sentry/node',
      '@sentry/opentelemetry',
      '@prisma/client',
      'prisma',
    ],
  },

  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        child_process: false,
      };
    }

    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextTranslate(nextConfig);
