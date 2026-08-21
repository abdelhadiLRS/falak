/* js/library.js - Digital Islamic Library Logic */

document.addEventListener('DOMContentLoaded', async function () {
  let books = [];
  try {
    const res = await fetch('data/library.json');
    if (res.ok) {
      books = await res.json();
    }
  } catch (e) {
    console.warn('Could not load library books', e);
  }

  const container = document.getElementById('library-books-container');
  const searchInput = document.getElementById('library-search-input');

  function renderBooks(list) {
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `<div class="card" style="text-align:center;">لم يتم العثور على كتب تطابق البحث</div>`;
      return;
    }

    container.innerHTML = list.map(b => `
      <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <span class="badge badge-gold" style="margin-bottom:0.5rem;">${b.category}</span>
          <h3 style="margin:0.25rem 0 0.5rem 0; font-size:1.2rem;">${b.title}</h3>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">المؤلف: ${b.author}</div>
          <p style="font-size:0.95rem; color:var(--text-secondary); line-height:1.6;">${b.description}</p>
        </div>
        <div style="margin-top:1.25rem; display:flex; gap:0.5rem;">
          <button class="btn btn-primary" style="flex:1;" onclick="openBook('${b.title}')">📖 تصفح الكتاب</button>
          <button class="btn btn-secondary" onclick="window.FalakMain.toggleFavorite('books', {id:'${b.id}', title:'${b.title}'})">⭐</button>
        </div>
      </div>
    `).join('');
  }

  renderBooks(books);

  window.openBook = function (title) {
    window.FalakMain.showToast(`جاري فتح كتاب: ${title}`);
  };

  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      const q = e.target.value.toLowerCase().trim();
      const filtered = books.filter(b =>
        b.title.includes(q) || b.author.includes(q) || b.category.includes(q)
      );
      renderBooks(filtered);
    });
  }
});
