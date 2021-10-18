import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { UserContext } from "../../context/userContext";
import { NotificationContext } from "../../context/notificationContext";
import Main from "../../layout/Main";
import Popup from "../../components/popup/Popup";
import { Grid, GridItem } from "../../components/grid";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Typography from "../../components/typography/Typography";
import { DELETE_GROUP } from "../../apollo/Mutations/groupMutations";
import { protectedPage } from "../../utils/auth";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../utils/notifications";

const Groups = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);

  const [search, setSearch] = useState("");
  const [userGroups, setUserGroups] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [deleteGroup, { loading }] = useMutation(DELETE_GROUP, {
    onError: (error) => ErrorNotification(setNotification, error),
    onCompleted: ({ deleteGroup }) => {
      setShowPopUp(!showPopUp);
      setUser((prev) => ({
        ...prev,
        groups: prev.groups.filter(
          (userGroup) => userGroup.group._id !== deleteGroup._id
        ),
      }));
      SuccessNotification(
        setNotification,
        `${deleteGroup.title} has been deleted!`
      );
    },
  });

  useEffect(() => {
    setUserGroups(
      user
        ? user.groups.filter(({ group }) =>
            group.title.toLowerCase().startsWith(search.toLowerCase())
          )
        : []
    );
  }, [search, user]);

  const handleDeleteGroup = (_id) => {
    deleteGroup({
      variables: {
        _id,
      },
    });
  };

  return (
    <>
      <Main title="Groups">
        <div className="groups">
          <div className="groups__form">
            <form onSubmit={(e) => e.preventDefault()}>
              <Input
                name="search"
                placeholder="Search"
                label="Search ..."
                type="text"
                handleChange={(e) => setSearch(e.target.value)}
                defaultValue={search}
                icon={({ style }) => <i className={"fa fa-search " + style} />}
                width="25rem"
              />
            </form>
            <Button
              title="Create Group"
              width="20rem"
              handleClick={() => router.push("/groups/create")}
            />
          </div>

          <Grid numberOfcolumns={2} columnGap={50} rowGap={40} padding={30}>
            {userGroups.length ? (
              userGroups.map(({ group }) => (
                <GridItem shadow key={group._id}>
                  <div className="group">
                    <img
                      src={group.imageUrl || "/dog.jpg"}
                      alt="group__image"
                      layout="fixed"
                      width={250}
                      height={250}
                      className="group__img"
                    />
                    <div className="group__details">
                      <Typography title={group.title} />
                      <span className="group__subTitle">
                        {group.members} members
                      </span>
                      <p className="group__description">{group.description}</p>
                      <Button
                        title="View"
                        alignSelf="center"
                        width="20rem"
                        handleClick={() => router.push(`/groups/${group._id}`)}
                      />
                    </div>
                    <i
                      className="fa fa-trash fa-2x  group__icon"
                      onClick={() => {
                        setShowPopUp(!showPopUp);
                      }}
                    />
                    <Popup
                      title="Deleting Group"
                      show={showPopUp}
                      handleShow={() => setShowPopUp(!showPopUp)}
                    >
                      <Typography
                        title={`Are you sure you want to delete '${group.title}' group ?`}
                        fontSize="1.3rem"
                      />
                      <Button
                        title="Delete"
                        width="15rem"
                        backgroundColor="red"
                        float="right"
                        handleClick={() => handleDeleteGroup(group._id)}
                        disabled={loading}
                      />
                    </Popup>
                  </div>
                </GridItem>
              ))
            ) : (
              <h1>No Group found</h1>
            )}
          </Grid>
        </div>
      </Main>
      <style jsx>{`
        .groups {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 0 1rem;
        }
        .groups__form {
          width: 50rem;
          align-self: flex-end;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .group {
          padding: 0.5rem 0.5rem 1rem;
          display: flex;
        }

        .group__img {
          align-self: flex-start;
        }

        .group__details {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 1rem;
        }
        .group__subTitle {
          font-size: 1.5rem;
          font-weight: 600;
          color: grey;
          margin: 0 1rem 2rem;
        }

        .group__description {
          flex: 1;
          font-size: 1.5rem;
          font-weight: 500;
          margin-bottom: 2rem;
        }

        .group__icon {
          color: red;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Groups;

export const getServerSideProps = (ctx) => protectedPage(ctx);
