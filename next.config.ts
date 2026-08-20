import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    pdfkit reads its Helvetica .afm font-metric files from disk at
    runtime. Bundling it breaks those paths (ENOENT on Helvetica.afm),
    so keep it external — this also makes Vercel trace the data files
    into the deployment.
  */
  serverExternalPackages: ["pdfkit"],
  images: {
    remotePatterns: [
      // Blog cover images uploaded via Cloudinary.
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
