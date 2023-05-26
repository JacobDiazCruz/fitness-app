/** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//               protocol: 'https',
//               hostname: 'images.unsplash.com',
//               port: '',
//               pathname: '/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
//             },
//         ],
//     }
// }

module.exports = {
  images: {
    remotePatterns: [
      {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png',
      },
    ],
  },
}
