document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử từ form và modal
    const postForm = document.getElementById('post-form');
    const titleInput = document.getElementById('title-input');
    const contentInput = document.getElementById('content-input');
    const imageUrlInput = document.getElementById('image-url-input');
    const videoUrlInput = document.getElementById('video-url-input');
    const postIndexInput = document.getElementById('post-index');
    const postsListDiv = document.getElementById('posts-list');
    const cancelEditBtn = document.getElementById('cancel-edit');
    const previewBtn = document.getElementById('preview-btn');
    const previewModal = document.getElementById('preview-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const previewArticle = document.getElementById('preview-article');

    // Hàm lấy bài viết từ localStorage
    const getPosts = () => {
        const posts = localStorage.getItem('dailyPosts');
        return posts ? JSON.parse(posts) : [];
    };

    // Hàm lưu bài viết vào localStorage
    const savePosts = (posts) => {
        localStorage.setItem('dailyPosts', JSON.stringify(posts));
    };

    // Hàm chuyển đổi URL YouTube
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return 'https://www.youtube.com/embed/' + match[2];
        }
        return null;
    };
    
    // Hàm hiển thị danh sách bài viết trong trang quản lý
    const renderPosts = () => {
        postsListDiv.innerHTML = '';
        const posts = getPosts();
        if (posts.length === 0) {
            postsListDiv.innerHTML = '<p>Chưa có bài viết nào. Hãy thêm một bài viết mới!</p>';
            return;
        }

        posts.forEach((post, index) => {
            const postItem = document.createElement('div');
            postItem.className = 'post-item';
            postItem.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.content.substring(0, 100)}...</p>
                <div class="post-item-actions">
                    <button onclick="editPost(${index})">Sửa</button>
                    <button onclick="deletePost(${index})">Xóa</button>
                </div>
            `;
            postsListDiv.appendChild(postItem);
        });
    };

    // Xử lý khi form được submit (Lưu hoặc Cập nhật)
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const posts = getPosts();
        const postIndex = parseInt(postIndexInput.value, 10);
        
        const postData = {
            title: titleInput.value,
            content: contentInput.value,
            imageUrl: imageUrlInput.value,
            videoUrl: videoUrlInput.value
        };

        if (postIndex === -1) { // Thêm mới
            posts.push(postData);
        } else { // Cập nhật
            posts[postIndex] = postData;
        }

        savePosts(posts);
        resetForm();
        renderPosts();
    });

    // Hàm đưa thông tin bài viết lên form để sửa
    window.editPost = (index) => {
        const posts = getPosts();
        const post = posts[index];
        titleInput.value = post.title;
        contentInput.value = post.content;
        imageUrlInput.value = post.imageUrl || '';
        videoUrlInput.value = post.videoUrl || '';
        postIndexInput.value = index;
        cancelEditBtn.style.display = 'inline-block';
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };

    // Hàm xóa bài viết
    window.deletePost = (index) => {
        if (confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
            let posts = getPosts();
            posts.splice(index, 1);
            savePosts(posts);
            renderPosts();
        }
    };
    
    // Hàm reset form
    const resetForm = () => {
        postForm.reset();
        postIndexInput.value = -1;
        cancelEditBtn.style.display = 'none';
    };

    cancelEditBtn.addEventListener('click', resetForm);

    // ---- LOGIC CHO PREVIEW MODAL ----
    const generatePostHTML = (post) => {
        let mediaHTML = '';
        if (post.imageUrl) {
            mediaHTML = `<img src="${post.imageUrl}" alt="Hình ảnh bài viết">`;
        } else if (post.videoUrl) {
            const embedUrl = getYouTubeEmbedUrl(post.videoUrl);
            if (embedUrl) {
                mediaHTML = `
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                        <iframe src="${embedUrl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe>
                    </div>
                `;
            }
        }
        
        return `
            <h3>${post.title || 'Tiêu đề bài viết'}</h3>
            ${mediaHTML}
            <p>${post.content ? post.content.replace(/\n/g, '<br>') : 'Nội dung bài viết...'}</p>
        `;
    };

    previewBtn.addEventListener('click', () => {
        const currentPostData = {
            title: titleInput.value,
            content: contentInput.value,
            imageUrl: imageUrlInput.value,
            videoUrl: videoUrlInput.value
        };
        previewArticle.innerHTML = generatePostHTML(currentPostData);
        previewModal.style.display = 'block';
    });

    const closeModal = () => {
        previewModal.style.display = 'none';
        previewArticle.innerHTML = '';
    };

    closeModalBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target == previewModal) {
            closeModal();
        }
    });

    // Hiển thị danh sách bài viết khi tải trang
    renderPosts();
});
