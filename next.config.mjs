/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'khonkaenuniversity.in.th'
            },
            {
                hostname: 'cdn-icons-png.flaticon.com'
            }
        ]
    }
};

export default nextConfig;
