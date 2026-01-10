const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    webpack: (config, { dev }) => {
        if (!dev) {
            config.optimization.minimize = false;
        }
        return config;
    },
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
    },
};

export default nextConfig;
