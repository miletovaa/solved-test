import { useState } from "react"
import { fetchData } from "./api/baseApi"

function App() {
  const [posts, setPosts] = useState(null)

  const loadPosts = async () => {
    try {
      const result = await fetchData('posts')
      if (!posts) setPosts(result.map(post => ({ ...post, showComments: false })))
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  }

  const loadComments = async (postId) => {
    try {
      // avoiding unnecessary API calls if comments are already loaded
      if (posts.find(post => post.id === postId)?.comments?.length > 0) return

      const comments = await fetchData(`posts/${postId}/comments`)
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId ? { ...post, comments } : post
        )
      )
    } catch (error) {
      console.error('Failed to load comments:', error)
    }
  }

  const toggleComments = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post => 
        post.id === postId ? { ...post, showComments: !post.showComments } : post
      )
    )
  }

  return (
    <>
      <button onClick={loadPosts}>
        Load Posts
      </button>
      {posts && (
        <ul>
          {/* destructed post data for better readability */}
          {/* Post listing */}
          {posts.map(({ id, title, comments, showComments }) => (
            <>
              <li key={id} onClick={() => loadComments(id)}>
                {title}
                <button 
                  onClick={() => { 
                    loadComments(id); 
                    toggleComments(id); 
                  }}
                >
                  {posts.find(post => post.id === id)?.showComments ? '-' : '+'}
                </button>
              </li>
              {(comments && showComments) && comments.map(comment => (
                <ul key={comment.id}>
                  <li>{comment.body}</li>
                </ul>
              ))}
            </>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
