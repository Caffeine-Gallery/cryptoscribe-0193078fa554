import { Actor, HttpAgent } from '@dfinity/agent';
import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const postsContainer = document.getElementById('posts-container');
    const newPostBtn = document.getElementById('new-post-btn');
    const newPostForm = document.getElementById('new-post-form');
    const postForm = document.getElementById('post-form');
    const cancelBtn = document.getElementById('cancel-btn');

    let quill;

    // Initialize Quill editor
    quill = new Quill('#editor', {
        theme: 'snow'
    });

    // Load and display posts
    async function loadPosts() {
        postsContainer.innerHTML = '';
        const posts = await backend.getPosts();
        posts.reverse(); // Show most recent at the top
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post', 'mb-5');

            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p class="text-muted">By ${post.author}</p>
                <div>${post.body}</div>
                <hr>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    await loadPosts();

    // Show the new post form
    newPostBtn.addEventListener('click', () => {
        newPostForm.style.display = 'block';
        newPostBtn.style.display = 'none';
    });

    // Cancel new post
    cancelBtn.addEventListener('click', () => {
        newPostForm.style.display = 'none';
        newPostBtn.style.display = 'block';
        postForm.reset();
        quill.setContents([]);
    });

    // Handle form submission
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const author = document.getElementById('author').value;
        const title = document.getElementById('title').value;
        const body = quill.root.innerHTML;

        // Call backend to add the post
        await backend.addPost(author, title, body);

        // Reset form and reload posts
        postForm.reset();
        quill.setContents([]);
        newPostForm.style.display = 'none';
        newPostBtn.style.display = 'block';
        await loadPosts();
    });
});
