const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/home', changefreq: 'daily', priority: 0.8 },
  { url: '/login', changefreq: 'monthly', priority: 0.5 },
  { url: '/pricing', changefreq: 'monthly', priority: 0.5 },
  { url: '/products', changefreq: 'monthly', priority: 0.5 },
  { url: '/resources', changefreq: 'monthly', priority: 0.5 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
  { url: '/builder', changefreq: 'monthly', priority: 0.5 },
  { url: '/templates', changefreq: 'monthly', priority: 0.5 },
  { url: '/templatestep', changefreq: 'monthly', priority: 0.5 },
  { url: '/dashboard', changefreq: 'monthly', priority: 0.5 },
  { url: '/IntegrationTODO', changefreq: 'monthly', priority: 0.5 },
  { url: '/terms', changefreq: 'yearly', priority: 0.3 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { url: '/get-started-mobile', changefreq: 'monthly', priority: 0.5 },
  { url: '/3s-agency', changefreq: 'monthly', priority: 0.5 },
  { url: '/3s-builder', changefreq: 'monthly', priority: 0.5 },
  { url: '/3s-academy', changefreq: 'monthly', priority: 0.5 },
  { url: '/about', changefreq: 'yearly', priority: 0.3 },
  { url: '/builder/:templateName', changefreq: 'monthly', priority: 0.5 },
  { url: '/template-preview/:templateName', changefreq: 'monthly', priority: 0.5 },
  { url: '/share/:projectName', changefreq: 'monthly', priority: 0.5 },
  { url: '*', changefreq: 'monthly', priority: 0.5 }
];

const generateSitemap = async () => {
  const sitemap = new SitemapStream({ hostname: 'https://www.3rd-space.io' });

  const writeStream = createWriteStream(path.resolve(__dirname, './public/sitemap.xml'));

  sitemap.pipe(writeStream);

  routes.forEach(route => {
    sitemap.write(route);
  });

  sitemap.end();

  await streamToPromise(sitemap);

  console.log('Sitemap generated successfully');
};

generateSitemap().catch(console.error);
