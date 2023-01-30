const createPost = async (event) => {
    event.preventDefault();
    
   document.location.replace('/dashboard/new')
};

document.querySelector('#newPost').addEventListener('click', createPost);