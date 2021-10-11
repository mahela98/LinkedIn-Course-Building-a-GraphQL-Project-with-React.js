const githubQuery = {
    query: `
    {
        viewer {
          name
        }
        search(query: " user:Paradox2405 sort:updated.desc", type: REPOSITORY, first: 20) {
          nodes {
            ... on Repository {
              name
              id
              url
              description
              viewerSubscription
              licenseInfo{
                spdxId
              }
            }
          }
        }
      }
      
      
    `,
};

export default githubQuery;