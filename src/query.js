const githubQuery = {
    query: `
    {
        viewer {
          login
          repositories(first: 10) {
            nodes {
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