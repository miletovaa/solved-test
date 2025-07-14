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

  return (
    <>
      <button onClick={loadPosts}>
        Load Posts
      </button>
      {posts && (
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
