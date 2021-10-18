import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { NotificationContext } from "../../context/notificationContext";
import Typography from "../typography/Typography";
import { CREATE_COMMENT } from "../../apollo/Mutations/commentMutations";
import StyleSheet from "./comment.module.scss";
import { ErrorNotification } from "../../utils/notifications";

const CommentInput = ({ post, user }) => {
  const { setNotification } = useContext(NotificationContext);
  const [text, setText] = useState("");
  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted: () => setText(""),
    onError: (error) => ErrorNotification(setNotification, error),
    fetchPolicy: "no-cache",
  });

  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      createComment({
        variables: {
          post,
          user: user._id,
          text,
        },
      });
    }
  };

  return (
    <div className={StyleSheet.commentInput}>
      <div className={StyleSheet.commentInput__user}>
        <img src={user?.imageUrl || "/user.png"} />{" "}
        <Typography title={user?.name} fontSize="1.4rem" />
      </div>
      <form className={StyleSheet.commentInput__form} onSubmit={handleComment}>
        <input
          className={StyleSheet.commentInput__field}
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default CommentInput;
