const { default: axios } = require('axios');

module.exports = async function getPackages() {
  const url = 'http://ambush-api.inyourarea.co.uk/ambush/intercept';

  const data = {
    url: 'https://api.npms.io/v2/search/suggestions?q=react',
    method: 'GET',
    return_payload: true,
  };

  try {
    const res = await axios.post(url, data);
    const packagesData = res.data.content.map(item => item.package);

    return packagesData;
  } catch (error) {
    console.error({ error });
  }
};
