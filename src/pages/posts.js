import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import RecipeReviewCard from "../components/post";
import AxiosContext from "../contexts/axios.context";

const Posts = () => {
  const { Request } = useContext(AxiosContext);
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const getPosts = async () => {
      const res = await Request("/api/posts", "GET");
      setPosts(res.data.data);
    };
    getPosts();
  }, [reload]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "2rem",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <RecipeReviewCard key={index} post={post} setReload={setReload} />
        ))
      ) : (
        <Typography>Post hozircha mavjud emas</Typography>
      )}
    </Box>
  );
};

export default Posts;
