const useProjectBasePath = process.env.GITHUB_ACTIONS && process.env.CUSTOM_DOMAIN !== "true";

// GitHub Pages needs a full static export (`out/`). Enable it only for production
// builds (`next build`). Leaving `output: "export"` enabled during `next dev` causes
// Next.js to reject dynamic App Router pages with a misleading error about
// `generateStaticParams()` even when it exists (internal fallback mode is not "static").
const shouldExportStaticHtml = process.env.NODE_ENV === "production";

const nextConfig = {
  ...(shouldExportStaticHtml ? { output: "export" } : {}),
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
