// Simulated admin check (in reality, you'd use server-side authentication)
const isAdmin = true; // Change to false for non-admins

// Show the admin upload section if the user is an admin
if (isAdmin) {
    document.getElementById('admin-upload').style.display = 'block';
}

// Handle image upload (dummy function, you would handle this server-side in a real app)
document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('image-upload');
    const titleInput = document.getElementById('gallery-title');
    const galleryContainer = document.getElementById('gallery-container');

    if (fileInput.files.length > 0 && titleInput.value) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            // Create an image element and add it to the gallery
            const imgElement = document.createElement('img');
            imgElement.src = event.target.result;
            imgElement.alt = titleInput.value;

            // Add the image to the gallery
            galleryContainer.appendChild(imgElement);

            // Clear the form
            fileInput.value = '';
            titleInput.value = '';
        };

        reader.readAsDataURL(file);
    }
});


//News

document.addEventListener("DOMContentLoaded", function() {
    const newsContainer = document.getElementById('news-container');
  
    // NASA RSS feed converted to JSON using RSS2JSON API
    const rssUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.nasa.gov/rss/dyn/breaking_news.rss';
  
    fetch(rssUrl)
      .then(response => response.json())
      .then(data => {
        newsContainer.innerHTML = ''; // Clear the "Loading" message
        const items = data.items;
  
        items.forEach(item => {
          // Create a news item element
          const newsItem = document.createElement('div');
          newsItem.classList.add('news-item');
  
          // News title
          const newsTitle = document.createElement('h2');
          newsTitle.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>`;
          newsItem.appendChild(newsTitle);
  
          // News description
          const newsDescription = document.createElement('p');
          newsDescription.textContent = item.description;
          newsItem.appendChild(newsDescription);
  
          // Append to the news container
          newsContainer.appendChild(newsItem);
        });
      })
      .catch(error => {
        newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
        console.error('Error fetching news:', error);
      });
  });
  