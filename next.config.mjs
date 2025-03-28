/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '89.111.169.139',
                port: '',
                pathname: '/**',
                search: '',
            },
        ],
    }
};

export default nextConfig;
