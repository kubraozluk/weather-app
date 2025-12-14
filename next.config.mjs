/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Bu ayar "Hataları görmezden gel, sadece siteyi yayınla" der.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
