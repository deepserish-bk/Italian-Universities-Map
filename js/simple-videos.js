// SIMPLE VIDEO CAROUSEL WITH SIDE BUTTONS
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('video-carousel');
  if (!container) return;
  
  fetch('./json/videos.json')
    .then(response => response.json())
    .then(data => {
      const videos = data.videos || [];
      displayVideos(videos);
    })
    .catch(error => {
      console.log('Using fallback video');
      displayVideos([{
        youtube_url: "https://youtu.be/wwhgTS2X3IY",
        title: "How to apply University of Padova 2026?",
        university: "University of Padova"
      }]);
    });
  
  function displayVideos(videos) {
    if (videos.length === 0) return;
    
    if (videos.length === 1) {
      // Single video - no buttons needed
      const video = videos[0];
      const videoId = extractYouTubeId(video.youtube_url);
      
      container.innerHTML = `
        <div class="video-centered">
          <iframe 
            src="https://www.youtube.com/embed/${videoId}?rel=0" 
            title="${video.title || ''}"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `;
    } else {
      // Multiple videos - show carousel with side buttons
      let currentIndex = 0;
      
      const createVideoSlide = (video, index) => {
        const videoId = extractYouTubeId(video.youtube_url);
        return `
          <div class="video-centered" style="display: ${index === 0 ? 'block' : 'none'}">
            <iframe 
              src="https://www.youtube.com/embed/${videoId}?rel=0" 
              title="${video.title || ''}"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        `;
      };
      
      const slidesHTML = videos.map((video, index) => 
        createVideoSlide(video, index)
      ).join('');
      
      // Create dots for navigation
      const dotsHTML = videos.map((_, index) => `
        <button class="carousel-dot ${index === 0 ? 'active' : ''}" 
                data-index="${index}"
                aria-label="Go to video ${index + 1}"></button>
      `).join('');
      
      container.innerHTML = `
        <div class="carousel-container">
          <button class="carousel-btn prev" aria-label="Previous video">‹</button>
          ${slidesHTML}
          <button class="carousel-btn next" aria-label="Next video">›</button>
        </div>
        ${videos.length > 1 ? `<div class="carousel-dots">${dotsHTML}</div>` : ''}
      `;
      
      // Initialize carousel controls
      const slides = container.querySelectorAll('.video-centered');
      const prevBtn = container.querySelector('.prev');
      const nextBtn = container.querySelector('.next');
      const dots = container.querySelectorAll('.carousel-dot');
      
      const showSlide = (index) => {
        slides.forEach(slide => slide.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].style.display = 'block';
        dots[index]?.classList.add('active');
        currentIndex = index;
      };
      
      prevBtn?.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = videos.length - 1;
        showSlide(newIndex);
      });
      
      nextBtn?.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= videos.length) newIndex = 0;
        showSlide(newIndex);
      });
      
      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          const index = parseInt(dot.dataset.index);
          showSlide(index);
        });
      });
    }
  }
  
  function extractYouTubeId(url) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  }
});