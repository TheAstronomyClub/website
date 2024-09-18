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
  