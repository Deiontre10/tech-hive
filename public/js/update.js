const updatePost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#titleInput').value;
    const content = document.querySelector('#contentInput').value;
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to update the post.');
    }
};

document.querySelector('#updateBtn').addEventListener('click', updatePost);