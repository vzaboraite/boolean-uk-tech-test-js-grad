const fetch = require('node-fetch');

module.exports = async function getPackages() {
  const fetchUrl = 'http://ambush-api.inyourarea.co.uk/ambush/intercept';

  const fetchBody = {
    url: 'https://api.npms.io/v2/search/suggestions?q=react',
    method: 'GET',
    return_payload: true,
  };

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fetchBody),
  };

  const res = await fetch(fetchUrl, fetchOptions);
  const data = await res.json();
  const contentItems = data.content;
  const givenPackages = contentItems.map(item => item.package);

  return givenPackages;
};
