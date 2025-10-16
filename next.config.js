/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const nextConfig = {
  webpack: (config, { isServer }) => {
    // 在服务器端渲染时不需要这个 polyfill，只在客户端（浏览器）需要
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback, // 保留现有的 fallback 配置
        events: require.resolve('events/'), // 为 'events' 模块提供 polyfill
        util: require.resolve('util/'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert/'),
        process: require.resolve('process/browser'),
        buffer: require.resolve("buffer/"),
      };
      config.plugins.push(
          new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
          })
      );
      config.resolve.alias = {
        events: require.resolve('events/'),
        crypto: require.resolve('crypto-browserify'),
      };
    }
    return config;
  },
  experimental: {
    //esmExternals: 'loose', // 启用对 ESM 外部模块的支持
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version,Authorization, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
}

module.exports = nextConfig
