require('dotenv').config({ path: '.env.local' });

const contentfulManagement = require('contentful-management');

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken:
      process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN_TWO,
  });

  return contentfulClient
    .getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
    .then((space) =>
      space.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT),
    );
};
