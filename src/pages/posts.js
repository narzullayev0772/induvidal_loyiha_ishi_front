import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import RecipeReviewCard from "../components/post";
import AxiosContext from "../contexts/axios.context";

const Posts = () => {
  const { Request } = useContext(AxiosContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await Request("/api/posts", "GET");
      setPosts(res.data.data);
    };
    getPosts();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "2rem",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {posts.map((post, index) => (
        <RecipeReviewCard key={index} post={post} />
      ))}
    </Box>
  );
};

export default Posts;
