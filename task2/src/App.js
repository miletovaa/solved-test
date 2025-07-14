import { useState } from "react"
import { fetchData } from "./api/baseApi"
import { CssVarsProvider } from "@mui/joy/styles"
import Sheet from '@mui/joy/Sheet'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import Button from '@mui/joy/Button'
import Typography from '@mui/joy/Typography'
import Box from '@mui/joy/Box'
import CircularProgress from '@mui/joy/CircularProgress'

function App() {
  const [posts, setPosts] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadPosts = async () => {
    try {
      // avoiding unnecessary API calls if posts are already loaded
      if (posts) return
      setIsLoading(true)
      const result = await fetchData('posts')
      if (!posts) setPosts(result.map(post => ({ ...post, showComments: false })))
      setIsLoading(false)
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
    <CssVarsProvider>
      <Sheet>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          textAlign: 'center', 
          gap: 3, 
          px: { xs: 2, sm: 6, md: 24 },
          py: { xs: 4, md: 6 },
        }}>
          <Typography level="h1" component="h1">
            Posts and Comments
          </Typography>
          <Typography level="h2" component="h2">
            Click the button below to load posts!
          </Typography>
          <Button onClick={loadPosts}>
            Load Posts
          </Button>
        </Box>
        {(posts && !isLoading) && (
          <List>
            {/* destructed post data for better readability */}
            {/* Post listing */}
            {posts.map(({ id, title, comments, showComments }) => (
              <ListItem key={id} sx={{
                display: 'flex',
                flexDirection: 'column',
                mb: 2,
                mx: 2,
                borderRadius: 8,
                p: { xs: 2, sm: 3 },
                bgcolor: 'background.level1' ,
              }}>
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', width: '100%' }}>
                  <Button
                    variant="soft"
                    size="sm"
                    color={showComments ? 'danger' : 'primary'}
                    onClick={() => {
                      loadComments(id);
                      toggleComments(id);
                    }}
                    >
                    {posts.find(post => post.id === id)?.showComments ? '-' : '+'}
                  </Button>
                  <Typography level="h4" component="h4">
                    {title}
                  </Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                  {(comments && showComments) && (
                    <List sx={{ width: '100%', bgcolor: 'background.level1', borderRadius: 4, p: 2 }}>
                      {comments.map(comment => (
                        <ListItem key={`${id}${comment.id}`}>
                          <li>{comment.body}</li>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        )}
        {isLoading && (
          <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }}/>
        )}
      </Sheet>
    </CssVarsProvider>
  );
}

export default App;
