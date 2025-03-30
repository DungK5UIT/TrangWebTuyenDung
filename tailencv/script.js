document.addEventListener('DOMContentLoaded', function() {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.item');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    let currentIndex = 0;
    
    // Hàm chuyển slide
    function goToSlide(index) {
        // Kiểm tra index hợp lệ
        if (index < 0 || index >= items.length) return;
        
        // Cập nhật index hiện tại
        currentIndex = index;
        
        // Di chuyển carousel
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Cập nhật trạng thái active
        items.forEach(item => item.classList.remove('active'));
        items[currentIndex].classList.add('active');
        
        indicators.forEach(ind => ind.classList.remove('active'));
        indicators[currentIndex].classList.add('active');
    }
    
    // Xử lý sự kiện click indicator
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            goToSlide(index);
        });
    });
    
    // Tự động chuyển slide (tùy chọn)
    let autoSlide = setInterval(() => {
        const nextIndex = (currentIndex + 1) % items.length;
        goToSlide(nextIndex);
    }, 3000);
    
    // Dừng auto slide khi hover
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carousel.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            const nextIndex = (currentIndex + 1) % items.length;
            goToSlide(nextIndex);
        }, 3000);
    });
});