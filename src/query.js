const githubQuery = {
    query: `
    {
        viewer {
          name
        }
        search(query: "api user:mahela98 sort:updated.desc", type: REPOSITORY, first: 10) {
          nodes {
            ... on Repository {
              name
              id
              url
              description
            }
          }
        }
      }
      
      
    `,
};

export default githubQuery;