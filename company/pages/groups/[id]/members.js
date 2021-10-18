import { Fragment, useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { UserContext } from "../../../context/userContext";
import { NotificationContext } from "../../../context/notificationContext";
import Main from "../../../layout/Main";
import Loading from "../../../components/loading/Loading";
import { List, ListItem } from "../../../components/list";
import Input from "../../../components/input/Input";
import Typography from "../../../components/typography/Typography";
import Button from "../../../components/button/Button";
import { GROUP_USERS } from "../../../apollo/Queries/userGroupQueries";
import {
  DELETE_USERGROUP,
  UPDATE_USERGROUP,
} from "../../../apollo/Mutations/userGroupMutations";
import { ErrorNotification } from "../../../utils/notifications";
import { protectedPage } from "../../../utils/auth";
import { formatDates } from "../../../utils/dates";
import { ROLES } from "../../../constants/enums";

const Members = ({ id }) => {
  const { setNotification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);
  const [accepted, setAccepted] = useState(true);
  const [search, setSearch] = useState("");
  const [groupsUsers, setGroupsUsers] = useState([]);
  const { data, loading } = useQuery(GROUP_USERS, {
    skip: !id,
    variables: { group: id, accepted },
    onCompleted: ({ groupUsers }) => setGroupsUsers(groupUsers),
    onError: (error) => ErrorNotification(setNotification, error),
    fetchPolicy: "network-only",
  });
  const [deleteUserGroup] = useMutation(DELETE_USERGROUP, {
    onCompleted: ({ deleteUserGroup }) =>
      setGroupsUsers((prev) =>
        prev.filter((ug) => ug._id !== deleteUserGroup._id)
      ),
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const [updateUserGroup] = useMutation(UPDATE_USERGROUP, {
    onCompleted: ({ updateUserGroup }) =>
      setGroupsUsers((prev) =>
        prev.filter((ug) => ug._id !== updateUserGroup._id)
      ),
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const deleteUserFromGroup = (_id) => {
    deleteUserGroup({
      variables: {
        _id,
      },
    });
  };
  const acceptUserToGroup = (_id) => {
    updateUserGroup({
      variables: {
        _id,
        accepted: true,
        role: ROLES.USER,
        joinDate: Date.now(),
      },
    });
  };

  useEffect(() => {
    if (data) {
      setGroupsUsers(
        data.groupUsers.filter(
          ({ user }) =>
            user.name.toLowerCase().startsWith(search.toLowerCase()) ||
            user.email.toLowerCase().startsWith(search.toLowerCase())
        )
      );
    }
  }, [search]);

  const titles = accepted
    ? ["Name", "Email", "Number of posts", "Join date", "Role", "Action"]
    : ["Name", "Email", "Request Date", "Action"];

  return !loading ? (
    <>
      <Main
        title={`Groups/${
          user?.groups.find((userGroup) => userGroup.group._id === id).group
            .title
        }/members`}
      >
        <Input
          width="25%"
          label="Search"
          placeholder="search"
          name="search"
          type="text"
          float="right"
          handleChange={(e) => setSearch(e.target.value)}
        />
        <div className="members__request">
          <div
            className="member__request"
            style={{ background: !accepted && "#b8c8d7" }}
            onClick={() => setAccepted(true)}
          >
            Accpeted
          </div>
          <div
            className="member__request"
            style={{ background: accepted && "#b8c8d7" }}
            onClick={() => setAccepted(false)}
          >
            Pending
          </div>
        </div>
        <List titles={titles}>
          {groupsUsers.length !== 0 ? (
            groupsUsers.map(
              ({ user, date, role, _id, postNumbers, joinDate }) => (
                <Fragment key={_id}>
                  <ListItem
                    image={user.imageUrl}
                    text={user.name}
                    padding="0 1rem"
                  />
                  <ListItem text={user.email} />
                  {accepted && (
                    <ListItem text={postNumbers} justifyContent="center" />
                  )}
                  <ListItem
                    text={formatDates(joinDate || date)}
                    justifyContent="center"
                  />
                  {accepted && <ListItem text={role} justifyContent="center" />}

                  <ListItem justifyContent="space-evenly">
                    {!user.isAdmin && (
                      <Button
                        width="5rem"
                        background="red"
                        handleClick={() => deleteUserFromGroup(_id)}
                      >
                        <i className="fa fa-trash" />
                      </Button>
                    )}
                    {!accepted && (
                      <Button
                        width="5rem"
                        handleClick={() => acceptUserToGroup(_id)}
                      >
                        <i className="fa fa-check" />
                      </Button>
                    )}
                  </ListItem>
                </Fragment>
              )
            )
          ) : (
            <Typography title="List is empty" />
          )}
        </List>
      </Main>
      <style jsx>{`
        .members__request {
          display: flex;
          align-items: center;
        }

        .member__request {
          flex: 1;
          background: #fff;
          text-align: center;
          padding: 1.5rem 0rem;
          font-size: 1.7rem;
          cursor: pointer;
          font-weight: 500;
        }
        .member__request:not(:last-child) {
          border-right: 1px solid rgba(0, 0, 0, 0.2);
          border-top-right-radius: 10px;
        }
      `}</style>
    </>
  ) : (
    <Loading text="Loading members" loadingPage font={1.5} />
  );
};

export default Members;

export const getServerSideProps = (ctx) => protectedPage(ctx);
