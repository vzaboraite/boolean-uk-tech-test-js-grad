/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */
const fetch = require('node-fetch');

module.exports = async function oldestPackageName() {
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

  const oldestPackage = givenPackages.reduce((prev, curr) =>
    curr.date < prev.date ? curr : prev,
  );

  const name = oldestPackage.name;

  return name;
};
