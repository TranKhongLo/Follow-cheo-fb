document.addEventListener('DOMContentLoaded', function() {
    // Hàm lấy bài viết từ kho lưu trữ của trình duyệt
    const getPostsFromStorage = () => {
        const posts = localStorage.getItem('dailyPosts');
        // Nếu có dữ liệu thì chuyển từ chuỗi JSON thành mảng, nếu không thì trả về mảng rỗng
        return posts ? JSON.parse(posts) : [];
    };
    
    // Hàm chuyển đổi URL YouTube thông thường thành URL nhúng (embed)
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        // URL hợp lệ phải có mã video dài 11 ký tự
        if (match && match[2].length === 11) {
            return 'https://www.youtube.com/embed/' + match[2];
        }
        return null;
    };

    const posts = getPostsFromStorage();
    
    // Lấy các phần tử HTML để cập nhật nội dung
    const postTitleElement = document.getElementById('post-title');
    const postContentElement = document.getElementById('post-content');
    const postMediaElement = document.getElementById('post-media');

    // Kiểm tra xem có bài viết nào không
    if (posts.length > 0) {
        const today = new Date();
        const dayOfMonth = today.getDate(); // Lấy ngày trong tháng (1-31)
        
        // Dùng toán tử modulo để chọn một bài viết dựa trên ngày
        const postIndex = (dayOfMonth - 1) % posts.length;
        const todaysPost = posts[postIndex];

        // Cập nhật tiêu đề
        postTitleElement.textContent = todaysPost.title;

        // ===== LOGIC CHO "XEM CHI TIẾT" VÀ "THU GỌN" =====
        const maxLength = 250; // Giới hạn ký tự để hiển thị ban đầu
        const fullContent = todaysPost.content;

        if (fullContent.length > maxLength) {
            // Cắt nội dung và tìm khoảng trắng gần nhất để không cắt giữa chữ
            let shortContent = fullContent.substring(0, maxLength);
            shortContent = shortContent.substring(0, Math.min(shortContent.length, shortContent.lastIndexOf(" ")));

            // Tạo HTML cho phần rút gọn và phần ẩn đi
            postContentElement.innerHTML = `
                <p>${shortContent.replace(/\n/g, '<br>')}...<p>
                <span class="more-content" style="display: none;">${fullContent.substring(shortContent.length).replace(/\n/g, '<br>')}</span>
                <a class="toggle-link">Xem chi tiết</a>
            `;

            // Thêm sự kiện click cho nút "Xem chi tiết / Thu gọn"
            const toggleLink = postContentElement.querySelector('.toggle-link');
            toggleLink.addEventListener('click', function(event) {
                event.preventDefault();
                const moreContentSpan = postContentElement.querySelector('.more-content');

                if (moreContentSpan.style.display === 'none') {
                    moreContentSpan.style.display = 'inline';
                    this.textContent = 'Thu gọn';
                } else {
                    moreContentSpan.style.display = 'none';
                    this.textContent = 'Xem chi tiết';
                }
            });

        } else {
            // Nếu bài viết ngắn, hiển thị toàn bộ
            postContentElement.innerHTML = `<p>${fullContent.replace(/\n/g, '<br>')}</p>`;
        }
        // ===========================================

        // Hiển thị hình ảnh hoặc video (giữ nguyên)
        postMediaElement.innerHTML = '';
        if (todaysPost.imageUrl) {
            postMediaElement.innerHTML = `<img src="${todaysPost.imageUrl}" alt="Hình ảnh bài viết">`;
        } else if (todaysPost.videoUrl) {
            const embedUrl = getYouTubeEmbedUrl(todaysPost.videoUrl);
            if (embedUrl) {
                postMediaElement.innerHTML = `
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                        <iframe src="${embedUrl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe>
                    </div>
                `;
            }
        }
    } else {
        // Hiển thị thông báo nếu chưa có bài viết
        postTitleElement.textContent = "Chưa có bài viết cho hôm nay";
        postContentElement.innerHTML = "<p>Vui lòng vào trang quản lý để thêm bài viết mới.</p>";
    }
});
