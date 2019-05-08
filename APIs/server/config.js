function setMongoConfig() {
  let config = {};
  if (process.env.NODE_ENV && process.env.NODE_ENV.toUpperCase() === 'LOCAL') {
    config = 'storyspot';
  } else if (process.env.NODE_ENV && process.env.NODE_ENV.toUpperCase() === 'TEST') {
    config = 'storyspot_test';
  } else {
    config = 'storyspot_test';
  }

  return config;
}

module.exports = setMongoConfig();
