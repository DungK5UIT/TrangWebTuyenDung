document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".search-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Ngăn form gửi dữ liệu đi

        // Lấy giá trị địa điểm được chọn
        const selectedLocation = document.querySelector("select").value;

        // Chuyển hướng đến trang tương ứng
        if (selectedLocation === "Thành Phố Hồ Chí Minh") {
            window.location.href = "hochiminh.html";
        } else if (selectedLocation === "Đà Nẵng") {
            window.location.href = "danang.html";
        }
        else if (selectedLocation === "Hà Nội") {
            window.location.href = "hanoi.html";
        }
        
    });
});



    
