describe('Query:Sockets', () => {
  it('should return the default page of sockets when no pagination arguments are provided', async () => {
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query Sockets {
            sockets {
              totalCount
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              edges {
                cursor
                node {
                  identifier
                  serial
                  uuid
                }
              }
            }
          }
        `,
        variables: {},
      }),
    });
    expect(response.status).toBe(200);
    const responseJson = await response.json();
    expect(responseJson.data.sockets.totalCount).toBe(11);
    expect(responseJson.data.sockets.edges.length).toBe(10);
    expect(responseJson.data.sockets.pageInfo.hasNextPage).toBe(false);
    expect(responseJson.data.sockets.pageInfo.hasPreviousPage).toBe(false);
  });

  it('should return the first page of sockets', async () => {
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query Sockets($first: Int) {
            sockets(first: $first) {
              totalCount
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              edges {
                cursor
                node {
                  identifier
                  serial
                  uuid
                }
              }
            }
          }
        `,
        variables: { first: 5 },
      }),
    });
    expect(response.status).toBe(200);
    const responseJson = await response.json();
    expect(responseJson.data.sockets.totalCount).toBe(11);
    expect(responseJson.data.sockets.edges.length).toBe(5);
    expect(responseJson.data.sockets.pageInfo.hasNextPage).toBe(true);
    expect(responseJson.data.sockets.pageInfo.hasPreviousPage).toBe(false);
  });

  it('should return the last page of sockets', async () => {
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query Sockets($last: Int) {
            sockets(last: $last) {
              totalCount
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              edges {
                cursor
                node {
                  identifier
                  serial
                  uuid
                }
              }
            }
          }
        `,
        variables: { last: 5 },
      }),
    });
    expect(response.status).toBe(200);
    const responseJson = await response.json();
    expect(responseJson.data.sockets.totalCount).toBe(11);
    expect(responseJson.data.sockets.edges.length).toBe(5);
    expect(responseJson.data.sockets.pageInfo.hasNextPage).toBe(false);
    expect(responseJson.data.sockets.pageInfo.hasPreviousPage).toBe(true);
  });

  it('should return sockets after the specified cursor', async () => {
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query Sockets($after: String!, $first: Int) {
            sockets(after: $after, first: $first) {
              totalCount
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              edges {
                cursor
                node {
                  identifier
                  serial
                  uuid
                }
              }
            }
          }
        `,
        variables: { after: '6491d40a66373ff02b91cb67', first: 2 },
      }),
    });
    expect(response.status).toBe(200);
    const responseJson = await response.json();
    expect(responseJson.data.sockets.totalCount).toBe(10);
    expect(responseJson.data.sockets.edges.length).toBe(2);
    expect(responseJson.data.sockets.pageInfo.hasNextPage).toBe(true);
    expect(responseJson.data.sockets.pageInfo.hasPreviousPage).toBe(false);
  });

  it('should return sockets before the specified cursor', async () => {
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query Sockets($first: Int, $before: String!) {
            sockets(first: $first, before: $before) {
              totalCount
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              edges {
                cursor
                node {
                  identifier
                  serial
                  uuid
                }
              }
            }
          }
        `,
        variables: { first: 2, before: '6491d40a66373ff02b91cb6e' },
      }),
    });
    expect(response.status).toBe(200);
    const responseJson = await response.json();
    expect(responseJson.data.sockets.totalCount).toBe(2);
    expect(responseJson.data.sockets.edges.length).toBe(2);
    expect(responseJson.data.sockets.pageInfo.hasNextPage).toBe(false);
    expect(responseJson.data.sockets.pageInfo.hasPreviousPage).toBe(false);
  });

  it('should handle when there are no sockets', async () => {
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query Sockets($before: String!) {
            sockets(before: $before) {
              totalCount
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              edges {
                cursor
                node {
                  identifier
                  serial
                  uuid
                }
              }
            }
          }
        `,
        variables: { before: '6491d40a66373ff02b91cb67' },
      }),
    });
    expect(response.status).toBe(200);
    const responseJson = await response.json();
    expect(responseJson.data.sockets.totalCount).toBe(0);
    expect(responseJson.data.sockets.edges.length).toBe(0);
    expect(responseJson.data.sockets.pageInfo.hasNextPage).toBe(false);
    expect(responseJson.data.sockets.pageInfo.hasPreviousPage).toBe(false);
  });
});
