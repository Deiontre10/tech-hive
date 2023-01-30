const createPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#titleInput').value;
    const content = document.querySelector('#contentInput').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to create a post.');
    }
};

document.querySelector('#newPostForm').addEventListener('submit', createPost);