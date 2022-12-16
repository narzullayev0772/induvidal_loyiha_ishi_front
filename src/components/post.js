import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { CardActions, IconButton } from "@mui/material";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useContext, useState } from "react";
import DialogContext from "../contexts/dialog.context";
import moment from "moment/moment";
import { MdOutlineComment } from "react-icons/md";
import Comments from "./comments";
import AxiosContext from "../contexts/axios.context";

export default function RecipeReviewCard({ post, disabled }) {
  const me = JSON.parse(localStorage.getItem("user"));
  const likedByMe = post.likes?.find((like) => like._id === me?._id);
  const [liked, setLiked] = useState(likedByMe ? true : false);
  const { openDialog } = useContext(DialogContext);
  const [whiteSpace, setWhiteSpace] = useState("nowrap");
  const { Request } = useContext(AxiosContext);
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
        <IconButton
          aria-label="add to favorites"
          disabled={me.role === "guest"}
          onClick={() => {
            if (me.role === "guest") return alert("Please login to comment");
            setLiked(!liked);
            Request(`/api/likes/${post._id}`, "POST", { liked: !liked });
          }}
        >
          {liked ? <HiHeart color="tomato" /> : <HiOutlineHeart />}
        </IconButton>
        <IconButton
          aria-label="go to comments"
          disabled={me.role === "guest"}
          onClick={() => {
            if (me.role === "guest") return alert("Please login to comment");
            openDialog(
              <Comments
                comments={post.comments}
                post_id={post._id}
                user_id={post.user._id}
              />
            );
          }}
        >
          <MdOutlineComment />
        </IconButton>
      </CardActions>
    </Card>
  );
}
