const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");

const sitemap = async (req, res) => {
  // An array with your links
  const links = [
    { url: "/", changefreq: "daily", priority: 0.7 },
    { url: "/blog", changefreq: "daily", priority: 0.7 },
    { url: "/about", changefreq: "daily", priority: 0.7 },
    { url: "/policy", changefreq: "daily", priority: 0.7 },
    { url: "/Contact", changefreq: "daily", priority: 0.7 },

  ];

  // Create a stream to write to
  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` });

  res.writeHead(200, {
    "Content-Type": "application/xml",
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
};
export default sitemap