import { useState } from "react"
import { fetchData } from "./api/baseApi"

function App() {
  const [posts, setPosts] = useState(null)

  const loadPosts = async () => {
    try {
      const posts = await fetchData('posts')
      setPosts(posts)
      console.log(posts)
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  }

  const loadComments = async (postId) => {
    try {
      const comments = await fetchData(`posts/${postId}/comments`)
      console.log(comments)
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId ? { ...post, comments } : post
        )
      )
    } catch (error) {
      console.error('Failed to load comments:', error)
    }
  }

  return (
    <>
      <button onClick={loadPosts}>
        Load Posts
      </button>
      {posts && (
        <ul>
          {posts.map(post => (
            <>
              <li key={post.id} onClick={() => loadComments(post.id)}>{post.title}</li>
              {post?.comments && post.comments.map(comment => (
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
