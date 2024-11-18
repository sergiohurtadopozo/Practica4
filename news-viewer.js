// news-viewer.js
class NewsViewer extends HTMLElement {
    constructor() {
      super();
      this.baseUrl = 'https://news-foniuhqsba-uc.a.run.app';
      this.currentCategory = ''; 
    }
  
    connectedCallback() {
      this.loadArticles();
      document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          this.currentCategory = event.target.dataset.category;
          this.loadArticles();
        });
      });
    }
  
    async loadArticles() {
      try {
        const url = this.currentCategory ? `${this.baseUrl}/${this.currentCategory}` : this.baseUrl;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error al obtener los artículos');
        }
        const articles = await response.json();
        this.renderArticles(articles);
      } catch (error) {
        console.error('Error:', error);
        this.innerHTML = `<p>Error al cargar los artículos. Inténtelo nuevamente más tarde.</p>`;
      }
    }
  
    renderArticles(articles) {
      const template = document.getElementById('article-template');
      this.innerHTML = ''; // Limpiar contenido existente
  
      articles.forEach(article => {
        const articleContent = document.importNode(template.content, true);
        articleContent.querySelector('.title').textContent = article.headline;
        articleContent.querySelector('.author').textContent = article.author;
        articleContent.querySelector('.description').innerHTML = article.body;
        
        // Añadir evento de clic para ver detalles
        articleContent.querySelector('.view-article').addEventListener('click', () => {
          localStorage.setItem('selectedArticle', JSON.stringify(article));
          window.location.href = 'article.html';
        });
  
        this.appendChild(articleContent);
      });
    }
  }
  
 
  customElements.define('news-viewer', NewsViewer);
  