let restaurants = [
  // {
  //   location: { type: 'Point', coordinates: [25.018456, 60.228982] },
  //   _id: '6470d38ecb12107db6fe24c1',
  //   companyId: 68,
  //   name: 'Ravintola Ladonlukko',
  //   address: 'Latokartanonkaari 9 A',
  //   postalCode: '00790',
  //   city: 'Helsinki',
  //   phone:
  //     '+358 50 4653899 Ravintolan esimies +358 50 435 8072 Kokoustarjoilut /ravintola',
  //   company: 'Sodexo',
  //   __v: 0
  // }
];

function getRestaurants() {
  return fetch('https://media1.edu.metropolia.fi/restaurant/api/v1/restaurants')
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      restaurants = data;
      return data;
    })
    .catch((error) => {
      console.error('Error loading restaurants:', error);
      throw error;
    });
}


function getRestaurantDailyMenu(id) {
  return fetch(`https://media1.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${id}/en`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(`Error loading daily menu for restaurant ${id}:`, error);
      throw error;
    });
}

function getRestaurantWeeklyMenu(id) {
  return fetch(`https://media1.edu.metropolia.fi/restaurant/api/v1/restaurants/weekly/${id}/en`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(`Error loading weekly menu for restaurant ${id}:`, error);
      throw error;
    });
}

// Get DOM elements
const table = document.querySelector('table');
const dialog = document.querySelector('dialog');

// Function to create table row
function createTableRow(restaurant) {
  const row = document.createElement('tr');

  const nameCell = document.createElement('td');
  nameCell.textContent = restaurant.name;
  nameCell.dataset.restaurantId = restaurant._id;

  const addressCell = document.createElement('td');
  addressCell.textContent = restaurant.address;

  row.appendChild(nameCell);
  row.appendChild(addressCell);

  // Add click handler
  row.addEventListener('click', () => {
    // Remove highlight from all rows
    document.querySelectorAll('td').forEach(cell => {
      cell.classList.remove('highlight');
    });

    // Add highlight to selected row
    nameCell.classList.add('highlight');
    addressCell.classList.add('highlight');

    // Display modal window with restaurant information
    showRestaurantModal(restaurant);
  });

  return row;
}

// Function to display modal window
function showRestaurantModal(restaurant) {
  getRestaurantDailyMenu(restaurant._id).then((data) => {
    console.log(data);

    // Create menu table HTML
    let menuTableHTML = '';
    if (data.courses && data.courses.length > 0) {
      menuTableHTML = `
        <div class="menu-section">
          <h3>Daily Menu</h3>
          <table class="menu-table">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Price</th>
                <th>Diets</th>
              </tr>
            </thead>
            <tbody>
              ${data.courses.map(course => `
                <tr>
                  <td>${course.name}</td>
                  <td>${course.price || 'N/A'}</td>
                  <td>${course.diets.join(', ')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else {
      menuTableHTML = `
        <div class="menu-section">
          <h3>Daily Menu</h3>
          <p>No menu available</p>
        </div>
      `;
    }

    dialog.innerHTML = `
    <div class="restaurant-info">
      <h2>${restaurant.name}</h2>
      <p><strong>Address:</strong> ${restaurant.address}</p>
      <p><strong>Postal Code:</strong> ${restaurant.postalCode}</p>
      <p><strong>City:</strong> ${restaurant.city}</p>
      <p><strong>Phone:</strong> ${restaurant.phone}</p>
      <p><strong>Company:</strong> ${restaurant.company}</p>
    </div>
    ${menuTableHTML}
    <button id="closeModalBtn">Close</button>
  `;

    // Add event listener for close button
    const closeBtn = dialog.querySelector('#closeModalBtn');
    closeBtn.addEventListener('click', () => {
      dialog.close();

      document.querySelectorAll('td').forEach(cell => {
        cell.classList.remove('highlight');
      });
    });

    dialog.showModal();
  });
}

// Function to display restaurants in the table
function displayRestaurants() {
  getRestaurants().then(() => {
    // Clear existing table rows
    const existingRows = table.querySelectorAll('tr');
    existingRows.forEach(row => row.remove());

    // Sort restaurants alphabetically
    const sortedRestaurants = restaurants.sort((a, b) => a.name.localeCompare(b.name));

    // Display restaurants in the table
    sortedRestaurants.forEach(restaurant => {
      const row = createTableRow(restaurant);
      table.appendChild(row);
    });
  });
}

displayRestaurants();
