import { useContext } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { NotificationContext } from "../../context/notificationContext";
import Avatar from "../avatar/Avatar";
import { ErrorNotification } from "../../utils/notifications";
import { DELETE_COMMENT } from "../../apollo/Mutations/commentMutations";
import { relativeDate } from "../../utils/dates";
import StyleSheet from "./comment.module.scss";

const Comment = ({ _id, date, text, user, currentUser }) => {
  const { setNotification } = useContext(NotificationContext);
  const router = useRouter();
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const handleDelete = () => {
    deleteComment({ variables: { _id } });
  };

  return (
    <div className={StyleSheet.comment}>
      <div className={StyleSheet.comment__user}>
        <Avatar
          img={user.imageUrl}
          title={user.name}
          radius="35px"
          fontTitle="1.2rem"
          color="#000"
          handleClick={() => router.push("/profile/" + user._id)}
        />
        <span> {relativeDate(date)} </span>
        {currentUser === user._id && (
          <i
            className={["fa fa-trash", StyleSheet.comment__icon].join(" ")}
            onClick={handleDelete}
          />
        )}
      </div>
      <p className={StyleSheet.comment__paragraph}>{text}</p>
    </div>
  );
};

export default Comment;
