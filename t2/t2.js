async function main() {
  try {
    const userData = {
      name: 'John Doe',
      job: 'Software Engineer'
    };

    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

main();
