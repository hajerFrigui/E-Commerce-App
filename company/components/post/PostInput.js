import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { UserContext } from "../../context/userContext";
import { NotificationContext } from "../../context/notificationContext";
import { Grid, GridItem } from "../grid";
import TextArea from "../textarea/TextArea";
import FileUpload from "../upload/FileUpload";
import Button from "../button/Button";
import { CREATE_POST } from "../../apollo/Mutations/postMutations";
import {
  ErrorNotification,
  WarningNotification,
} from "../../utils/notifications";
import StyleSheet from "./post.module.scss";

const PostInput = ({ groupId }) => {
  const { user } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const [post, setPost] = useState({ text: "", files: [] });
  const [createPost] = useMutation(CREATE_POST, {
    onCompleted: () => {
      setPost({ files: [], text: "" });
    },
    fetchPolicy: "no-cache",
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const handleImage = (files) => {
    try {
      if (!!files.length) {
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            setPost((prevstate) => ({
              ...prevstate,
              files: [
                ...prevstate.files,
                {
                  imageCoder: e.target.result,
                  image: file,
                },
              ],
            }));
          };
        }
      }
    } catch (error) {
      WarningNotification(setNotification, error.message, 1400, true);
    }
  };

  const removePhoto = (file) => {
    setPost((prev) => ({
      ...prev,
      files: prev.files.filter((f) => f !== file),
    }));
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (post.text || post.files) {
      createPost({
        variables: {
          text: post.text,
          files: post.files.map((file) => file.image),
          group: groupId,
          user: user?._id,
        },
      });
    }
  };

  return (
    <form className={StyleSheet.postInput} onSubmit={handlePost}>
      <img
        src={user?.imageUrl || "/user.png"}
        layout="intrinsic"
        className={StyleSheet.postInput__img}
      />
      <div style={{ width: "90%" }}>
        <TextArea
          placeholder="Write something ...."
          minHeight={70}
          padding="1rem 1rem 0"
          handleChange={(e) =>
            setPost((prevState) => ({
              ...prevState,
              text: e.target.value,
            }))
          }
          value={post.text}
        />
        {!!post.files.length && (
          <Grid
            padding="0 0 1rem"
            columnGap={5}
            rowGap={2}
            numberOfcolumns="auto-fill"
            jusifyItems="center"
            alignItems="start"
          >
            {post.files.map((file) => (
              <GridItem minHeight="10rem" minWidth="10rem" key={file._id}>
                <img
                  src={file.imageCoder}
                  className={StyleSheet.postInput__file}
                  onClick={() => removePhoto(file)}
                />
              </GridItem>
            ))}
          </Grid>
        )}
        <FileUpload
          id="photos"
          title="Photos"
          type="image"
          handleChange={(e) => handleImage(e.target.files)}
        />
        {/*<FileUpload id="files" title="Files" />*/}
      </div>
      <Button title="Post Now" width="15rem" marginTop={20} fontSize="1.6rem" />
    </form>
  );
};

export default PostInput;
