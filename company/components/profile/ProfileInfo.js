import { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { UserContext } from "../../context/userContext";
import { NotificationContext } from "../../context/notificationContext";
import ImageUpload from "../upload/ImageUpload";
import Typography from "../typography/Typography";
import { UPDATE_USER } from "../../apollo/Mutations/userMutations";
import {
  ErrorNotification,
  WarningNotification,
} from "../../utils/notifications";
import StyleSheet from "./profile.module.scss";

const ProfileInfo = ({ user }) => {
  const { user: currentUser, setUser } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: ({ updateUser }) =>
      setUser((prev) => ({ ...prev, imageUrl: updateUser.imageUrl })),
    onError: (error) => ErrorNotification(setNotification, error),
  });
  const [image, setImage] = useState("");
  const handleImage = (e) => {
    const file = e.currentTarget.files[0];
    try {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          updateUser({
            variables: {
              _id: currentUser?._id,
              image: file,
            },
          });
          setImage(e.target.result);
        };
      }
    } catch (error) {
      WarningNotification(setNotification, error.message, 1400, true);
    }
  };

  useEffect(() => {
    setImage(user?.imageUrl || "/user.png");
  }, [user, currentUser]);

  return (
    <div className={StyleSheet.profile}>
      {user._id === currentUser?._id ? (
        <ImageUpload
          id="profile_image"
          handleChange={handleImage}
          image={image}
        />
      ) : (
        <img
          src={user.imageUrl || "/dog.jpg"}
          className={StyleSheet.profile__photo}
        />
      )}

      <div className={StyleSheet.profile__details}>
        <Typography title={user?.name} fontSize="1.6rem" padding="0rem" />
        <p className={StyleSheet.profile__descr}>
          lorLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonum azey. eirmod tempor invidunt ut sed diam nonumy eirmod r
          sadipscing elitr,em
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
