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

        // Cập nhật tiêu đề và nội dung
        postTitleElement.textContent = todaysPost.title;
        postContentElement.innerHTML = todaysPost.content.replace(/\n/g, '<br>'); // Thay ký tự xuống dòng bằng thẻ <br>

        // Hiển thị hình ảnh hoặc video nếu có
        postMediaElement.innerHTML = ''; // Xóa media cũ
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
        postContentElement.textContent = "Vui lòng vào trang quản lý để thêm bài viết mới.";
    }
});
