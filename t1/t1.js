async function main() {
  try {
    const response = await fetch('https://reqres.in/api/users/1', {
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
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
