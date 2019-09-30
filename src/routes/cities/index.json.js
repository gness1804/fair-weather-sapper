import cityLinks from './_cityLinks';

const content = cityLinks.map(({ name, slug }) => {
  return {
    name,
    slug,
  };
});

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(JSON.stringify(content));
}
