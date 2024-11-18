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
      this.innerHTML = '';
  
      articles.forEach(article => {
        const articleContent = document.importNode(template.content, true);
        articleContent.querySelector('.title').textContent = article.headline;
        articleContent.querySelector('.author').textContent = article.author;
        articleContent.querySelector('.description').innerHTML = article.body;
        
       
        articleContent.querySelector('.view-article').addEventListener('click', () => {
          localStorage.setItem('selectedArticle', JSON.stringify(article));
          window.location.href = 'article.html';
        });
  
        this.appendChild(articleContent);
      });
    }
  }
  
 
  customElements.define('news-viewer', NewsViewer);
  document.addEventListener("DOMContentLoaded", () => {
    const categoryButton = document.getElementById("category-button");
    const categoryPopover = document.getElementById("category-popover");
  
    
    categoryButton.addEventListener("click", () => {
      const isHidden = categoryPopover.classList.contains("hidden");
      if (isHidden) {
        categoryPopover.classList.remove("hidden");
        categoryPopover.style.display = "block";
      } else {
        categoryPopover.classList.add("hidden");
        categoryPopover.style.display = "none";
      }
    });
  
   
    document.addEventListener("click", (event) => {
      if (!categoryPopover.contains(event.target) && event.target !== categoryButton) {
        categoryPopover.classList.add("hidden");
        categoryPopover.style.display = "none";
      }
    });
  });
  
  
