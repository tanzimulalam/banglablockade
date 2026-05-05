const useProjectBasePath = process.env.GITHUB_ACTIONS && process.env.CUSTOM_DOMAIN !== "true";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: useProjectBasePath ? "/banglablockade" : "",
  assetPrefix: useProjectBasePath ? "/banglablockade/" : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
