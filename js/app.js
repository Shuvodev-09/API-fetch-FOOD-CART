// Function to load categories
const loadCatagory = () => {
    // Fetch categories from API
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(res => res.json())
        .then(data => displayCatagories(data.categories)) // Display categories
        .catch(error => showError("Failed to load categories")); // Show error if failed
};

// Function to show error message
const showError = (message) => {
    const errorBox = document.getElementById("error");
    errorBox.textContent = message;
    errorBox.style.display = 'block'; // Show error message
};

// Function to display categories
const displayCatagories = (catagories) => {
    const categoryBox = document.getElementById("catagories");
    categoryBox.innerHTML = ""; // Clear previous content

    // Iterate through categories and display each category
    catagories.map(category => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div onclick="seeFoodDetails('${category.idCategory}')" class="border-2 p-3 rounded">
                <img class="h-56 w-full" src="${category?.strCategoryThumb}" alt="">
                <h5 class="text-xl">ID: ${category.strCategory}</h5>
                <p>${category.strCategoryDescription.slice(0, 80)} ....</p>
            </div>
        `;
        categoryBox.appendChild(div);
    });
};

// Event listener for search button
document.getElementById('search-button').addEventListener("click", () => {
    const input = document.getElementById('search-field');
    const inputText = input.value.trim();

    // If search field is empty, show error
    if (inputText === "") {
        showError("Please enter a search term.");
        return;
    }

    // Fetch food items based on search term
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayFood(data.meals)) // Display food items
        .catch(error => showError("Failed to search for food")); // Show error if failed

    input.value = ""; // Clear search field after search
});

// Function to display food items
const displayFood = (foods) => {
    const errorBox = document.getElementById("error");
    errorBox.style.display = 'none'; // Hide error message if any

    const categoryBox = document.getElementById("catagories");
    categoryBox.innerHTML = ""; // Clear category box

    const allFoodBox = document.getElementById("all-food");
    allFoodBox.innerHTML = ""; // Clear all food box

    // If no food items found, show error
    if (!foods) {
        showError("No results found.");
        return;
    }

    // Iterate through food items and display each item
    foods.map(food => {
        const detailsFoodBox = document.getElementById("details");
        detailsFoodBox.innerHTML = "";
        const div = document.createElement('div');
        div.innerHTML = `
            <div onclick="seeFoodDetails('${food.idMeal}')" class="border-2 p-3 rounded">
                <img class="h-56 w-full" src="${food?.strMealThumb}" alt="">
                <h5 class="text-xl">ID: ${food.idMeal}</h5>
                <h3 class="text-2xl">Name: ${food.strMeal}</h3>
                <h3>Category: ${food.strCategory}</h3>
                <p>${food.strInstructions.slice(0, 150)} ....</p>
            </div>
        `;
        allFoodBox.appendChild(div);
    });
};

// Function to see details of a food item
const seeFoodDetails = (id) => {
    // Fetch details of a specific food item
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => displayDetailsFood(data.meals[0])) // Display details of the food item
        .catch(error => showError("Failed to load food details")); // Show error if failed
};

// Function to display details of a food item
const displayDetailsFood = (food) => {
    const detailsFoodBox = document.getElementById("details");
    detailsFoodBox.textContent = "";
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="border-2 p-3 rounded">
            <img class="w-full" src="${food?.strMealThumb}" alt="food">
            <h5 class="text-xl">ID: ${food.idMeal}</h5>
            <h3 class="text-2xl">Name: ${food.strMeal}</h3>
            <h3>Category: ${food.strCategory}</h3>
            <p>${food.strInstructions} ....</p>
            <a href="${food.strYoutube}" class="my-5 block bg-blue-500 mx-2 py-4 px-3 rounded hover:bg-blue-400 text-white cursor-pointer">Go YouTube</a>
        </div>
    `;
    detailsFoodBox.appendChild(div);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
};

loadCatagory(); // Load categories when the page loads

