// next.config.mjs

const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { 
            key: 'Access-Control-Allow-Origin', 
            value: 'https://ilearnit.vercel.app' 
          },
          { 
            key: 'Access-Control-Allow-Credentials', 
            value: 'true' 
          },
          { 
            key: 'Access-Control-Allow-Methods', 
            value: 'GET,POST,PUT,DELETE,OPTIONS' 
          },
          { 
            key: 'Access-Control-Allow-Headers', 
            value: 'Content-Type, Authorization' 
          },
        ],
      },
    ]
  },
  images: {
    domains: [
      'picnie-data.s3.ap-south-1.amazonaws.com',
      'www.creativeitinstitute.com',
      'ut.uvt.tn',
      'skillsindia.yourjinnie.com',
      'fiverr-res.cloudinary.com',
      'gatutors.com',
      'cdn.ostad.app',
      'insightiq03.vercel.app',
      'abctrainings.in',
      'nearlearn.com',
      'i.ytimg.com',
      'courses.wscubetech.com',
      'd1csarkz8obe9u.cloudfront.net',
      'img.freepik.com',
      'studykosh.com',
      'i0.wp.com',
      'mandarinmonkey.com',
      'training.premium.edu.et',
      'www.simplilearn.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This allows all HTTPS domains
      },
    ],
  },
};

export default nextConfig;