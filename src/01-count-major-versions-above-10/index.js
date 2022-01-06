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

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */

const getPackages = require('../utils/npms-api-axios');

module.exports = async function countMajorVersionsAbove10() {
  const givenPackages = await getPackages();

  const majorVersionsAbove10 = givenPackages.filter(item => {
    const splittedVersionNumbers = item.version.split('.');
    const isMajorVersion = splittedVersionNumbers[0] > 10;
    return isMajorVersion;
  });

  const count = majorVersionsAbove10.length;

  return count;
};
