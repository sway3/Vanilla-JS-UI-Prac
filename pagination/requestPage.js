const url =
  'https://newsapi.org/v2/everything?' +
  'q=Apple&' +
  'from=2023-10-02&' +
  'sortBy=popularity&' +
  'apiKey=30298bd01b7d42ca9805e76b7aaa3c2b';

async function newsRequest() {
  const response = await fetch(url);
  const data = await response.json();
  return data.articles;
}

function showItems(items, currentPage, itemsPerPage) {
  const pageContainer = document.querySelector('.page-inner-container');
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pageItems = items.slice(startIndex, endIndex);

  pageContainer.innerHTML = '';

  pageItems.forEach((article) => {
    const newsContainer = document.createElement('div');
    newsContainer.classList.add('news-container');
    pageContainer.appendChild(newsContainer);

    const title = document.createElement('h3');
    const author = document.createElement('p');
    const source = document.createElement('p');
    const url = document.createElement('a');
    const date = document.createElement('p');

    title.textContent = article.title;
    author.textContent = article.author;
    source.textContent = article.source.name;
    url.textContent = article.url;
    date.textContent = article.publishedAt;

    newsContainer.appendChild(title);
    newsContainer.appendChild(source);
    newsContainer.appendChild(author);
    newsContainer.appendChild(date);
    newsContainer.appendChild(url);
  });
}

function setPagination(items, totalItems, currentPage, itemsPerPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const link = document.createElement('a');
    link.classList.add('pagination-button');
    link.href = '#';
    link.innerText = i;

    if (i === currentPage) {
      link.classList.add('active');
    }

    link.addEventListener('click', (event) => {
      event.preventDefault();
      showItems(items, i, itemsPerPage);
      setPagination(items, totalItems, i, itemsPerPage);
    });

    pagination.appendChild(link);
  }
}

async function init() {
  const itemPerPage = 5;
  let currentPage = 1;

  const articles = await newsRequest();
  showItems(articles, currentPage, itemPerPage);
  setPagination(articles, articles.length, currentPage, itemPerPage);
}

init();
