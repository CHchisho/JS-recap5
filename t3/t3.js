async function makeRequest(url, method, data = null) {
  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    // console.log(`\n=== ${method} request to ${url} ===`);
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;

  } catch (error) {
    console.error(`Error fetching data:`, error.message);
    return null;
  }
}

async function main() {
  const baseUrl = 'https://reqres.in/api/unknown/23';
  const testData = {
    name: 'Test User',
    job: 'Developer',
    email: 'test@example.com'
  };

  // GET request (should return 404, since the resource does not exist)
  await makeRequest(baseUrl, 'GET');

  // POST request
  await makeRequest(baseUrl, 'POST', testData);

  // PUT request
  await makeRequest(baseUrl, 'PUT', testData);

  // DELETE request
  await makeRequest(baseUrl, 'DELETE');
}

main();
