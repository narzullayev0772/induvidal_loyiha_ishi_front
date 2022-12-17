import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { CardActions, IconButton, List, ListItemButton } from "@mui/material";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useContext, useState } from "react";
import DialogContext from "../contexts/dialog.context";
import moment from "moment/moment";
import { MdMoreVert, MdOutlineComment } from "react-icons/md";
import Comments from "./comments";
import AxiosContext from "../contexts/axios.context";
import { Box } from "@mui/system";

export default function RecipeReviewCard({ post, disabled, setReload }) {
  const me = JSON.parse(localStorage.getItem("user"));
  const likedByMe = post.likes?.find((like) => like._id === me?._id);
  const [liked, setLiked] = useState(likedByMe ? true : false);
  const { openDialog, closeDialog } = useContext(DialogContext);
  const [whiteSpace, setWhiteSpace] = useState("nowrap");
  const { Request } = useContext(AxiosContext);
  const [likes, setLikes] = useState(post.likes?.length);
  const [comments, setComments] = useState(post.comments?.length);

  const deletePost = async () => {
    await Request(`/api/posts/${me._id}/${post._id}`, "DELETE");
    closeDialog();
    setReload((prev) => prev++);
  };
  return (
    <Card sx={{ maxWidth: 450, width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.user?.name[0]}
          </Avatar>
        }
        title={post.user?.name}
        subheader={moment(post.createdAt).fromNow()}
        // setting icon

        action={
          <IconButton
            disabled={disabled}
            onClick={() => {
              openDialog(
                <List>
                  <ListItemButton>
                    <Typography>Share</Typography>
                  </ListItemButton>

                  {post.user._id === me._id && (
                    <ListItemButton onClick={deletePost}>
                      <Typography color={"error"}>Delete</Typography>
                    </ListItemButton>
                  )}
                </List>
              );
            }}
          >
            <MdMoreVert />
          </IconButton>
        }
      />
      {post.content && (
        <CardMedia
          component="img"
          height="250"
          image={post.content}
          alt="blob image"
          onClick={() => {
            openDialog(
              <img
                src={post.content}
                style={{ width: "100%", height: "100%" }}
                alt={"new window"}
              />
            );
          }}
        />
      )}
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            whiteSpace: { whiteSpace },
            textOverflow: "ellipsis",
            transition: "all 0.5s ease",
          }}
          onClick={() => {
            setWhiteSpace(whiteSpace === "nowrap" ? "normal" : "nowrap");
          }}
        >
          <b>{post.user.name} </b>
          {post.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="add to favorites"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            disabled={disabled}
            onClick={() => {
              if (me.role === "guest") {
                return (window.location.href = "/register");
              }
              setLiked(!liked);
              setLikes((prev) => (liked ? prev - 1 : prev + 1));
              Request(`/api/likes/${post._id}`, "POST", { liked: !liked });
            }}
          >
            {liked ? <HiHeart color="tomato" /> : <HiOutlineHeart />}
          </IconButton>
          <Typography>{likes}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="go to comments"
            disabled={disabled}
            onClick={() => {
              if (me.role === "guest") {
                return (window.location.href = "/register");
              }
              openDialog(
                <Comments
                  comments={post.comments}
                  post_id={post._id}
                  user_id={post.user._id}
                  setComments={setComments}
                />
              );
            }}
          >
            <MdOutlineComment />
          </IconButton>
          <Typography>{comments}</Typography>
        </Box>
      </CardActions>
    </Card>
  );
}
