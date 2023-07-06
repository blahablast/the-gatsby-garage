const path = require("path");
// Destructuring helpers to create a page.
// actions will dispatch a redux action.
// Create page comes from actions and we destructure that from it.
exports.createPages = async ({ actions, graphql }) => {
  const pageTemplate = path.resolve("src/templates/page.js");
  const { createPage } = actions;

  // this will query a data from graphql then create a page with it.
  const { data } = await graphql(`
    query AllPagesQuery {
      allWpPage {
        nodes {
          databaseId
          blocks
          uri
        }
      }
    }
  `);

  for (let i = 0; i < data.allWpPage.nodes.length; i++) {
    const page = data.allWpPage.nodes[i];
    // Create page needs some help with its structure. First is the path the page will be created at.
    createPage({
      path: page.uri,
      component: pageTemplate,
    });
  }
};
