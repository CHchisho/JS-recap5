async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);

    // Check if the response is successful (status 2xx)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    // Return JSON data
    return await response.json();
  } catch (error) {
    // Re-throw the error for processing in the calling code
    throw error;
  }
}

// Example of using the function
async function main() {
  try {
    const user = {
      name: 'John Doe',
      job: 'Developer'
    };

    const url = 'https://reqres.in/api/users';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: JSON.stringify(user)
    };

    const userData = await fetchData(url, options);
    console.log('User created successfully:', userData);

    // Additional example - getting a list of users
    const getUsersUrl = 'https://reqres.in/api/users?page=1';
    const getUsersOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    };

    const usersList = await fetchData(getUsersUrl, getUsersOptions);
    console.log('Users list:', usersList);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();

