import { Box, Divider, IconButton, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { MdSend } from "react-icons/md";
import AxiosContext from "../contexts/axios.context";

const Comments = ({ comments, post_id, user_id, setComments }) => {
  const { Request } = useContext(AxiosContext);
  const [comment, setComment] = useState("");
  const [_comments, _setComments] = useState(comments);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "1rem",
      }}
      component={"form"}
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await Request(`/api/comments/${post_id}`, "POST", {
          comment_text: comment,
        });
        if (res.status === 201) {
          e.target.reset();
          _setComments([..._comments, res.data.data]);
          setComments((prev) => prev + 1);
        }
      }}
    >
      <Typography
        variant="body1"
        textAlign={"center"}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 2,
        }}
      >
        Comments
      </Typography>
      <Divider />
      {_comments.length !== 0 ? (
        _comments.map((comment, index) => {
          return (
            <Typography key={index} my="5px">
              <b
                style={{
                  color: "grey",
                  marginRight: "10px",
                }}
              >
                {comment.user.name}
              </b>
              {comment.comment_text}
            </Typography>
          );
        })
      ) : (
        <Typography
          sx={{
            textAlign: "center",
            color: "grey.500",
            mt: "1rem",
          }}
        >
          There is no comment yet
        </Typography>
      )}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          zIndex: 2,
        }}
      >
        <TextField
          label="Comment"
          fullWidth
          variant={"standard"}
          name={"comment"}
          onChange={(e) => setComment(e.target.value)}
        />
        <IconButton
          sx={{
            position: "absolute",
            right: 0,
          }}
          type={"submit"}
        >
          <MdSend />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Comments;
