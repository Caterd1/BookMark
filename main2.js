// Save Bookmark
const saveBookmark = e => {
    // Prevent from page reloading;
    e.preventDefault();
    // Get site name and url
    const siteName = document.querySelector('#siteName').value;
    const siteUrl = document.querySelector('#siteUrl').value;
    // create a bookmark object
    const bookmark = {
      name: siteName,
      url: siteUrl
    };
    // Store bookmark
    let bookmarks = [];
    // check if the local storage is not empty
    if (localStorage.getItem('bookmarks') !== null) {
      // Get bookmarks from local storage
      bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    // adding new bookmark
    bookmarks.push(bookmark);
    // Update bookmarks in local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // fetch bookmarks
    fetchBookmarks();
    // empty the inputs
    document.querySelector('form').reset();
  };
  // Fetch bookmarks
  const fetchBookmarks = () => {
    // Get bookmarks from local storage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Select the output bookmarks div
    const output = document.querySelector('#bookmarks');
    // Reset the bookmarks div
    output.innerHTML = '';
    // Loop over bookmarks
    for (let bookmark of bookmarks) {
      // Create div
      const div = document.createElement('div');
      // Create h3 with bookmark name as content
      const h3 = document.createElement('h3');
      h3.textContent = bookmark.name;
      // Create visit link
      const a = document.createElement('a');
      a.href = bookmark.url;
      a.className = 'btn btn-success';
      a.textContent = 'Visit';
      // Create delete button
      const button = document.createElement('button');
      button.className = 'btn btn-danger';
      button.textContent = 'Delete';
      // Add event listener to delete button
      button.addEventListener('click', e => {
        const name = e.target.parentElement.children[0].textContent;
        deleteBookmark(name);
      });
      // Append h3, a, button into div
      div.appendChild(h3);
      div.appendChild(a);
      div.appendChild(button);
      // append div into output
      output.appendChild(div);
    }
  };
  // Delete bookmark
  const deleteBookmark = name => {
    // Get bookmarks from local storage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop over bookmarks
    for (let i in bookmarks) {
      // looking up bookmark with given name, then delete it
      if (bookmarks[i].name === name) {
        bookmarks.splice(i, 1);
        break;
      }
    }
    // Update localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // re-fetch bookmarks output
    fetchBookmarks();
  };
  // Select filter input
  const filter = document.querySelector('#filter');
  // Filter bookmarks
  const filterBookmarks = () => {
    // Select all bookmarks name
    const bookmarks = document.querySelectorAll('#bookmarks div h3');
    // loop over bookmarks
    for (bookmark of bookmarks) {
      if (
        bookmark.textContent.toUpperCase().includes(filter.value.toUpperCase())
      ) {
        bookmark.parentNode.style.display = 'block';
      } else {
        bookmark.parentNode.style.display = 'none';
      }
    }
  };
  // Adding event listener to submit button
  document.querySelector('form').addEventListener('submit', saveBookmark);
  // Adding event listener for page loading
  window.addEventListener('load', fetchBookmarks);
  // Adding event listener for filter input
  filter.addEventListener('input', filterBookmarks);
  