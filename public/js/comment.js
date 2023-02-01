const createComment = async (event) => {
    event.preventDefault();

    const bodyEl = document.querySelector('#comment').value;

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        body: bodyEl,
        post_id: postId,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace(`/api/posts/${postId}`);
    } else {
      alert('Failed to create a comment.');
    }
  };
  
  document
    .querySelector('#commentBtn')
    .addEventListener('click', createComment);