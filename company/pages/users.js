import { Fragment, useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { NotificationContext } from "../context/notificationContext";
import Main from "../layout/Main";
import Loading from "../components/loading/Loading";
import { List, ListItem } from "../components/list";
import Popup from "../components/popup/Popup";
import Input from "../components/input/Input";
import TextArea from "../components/textarea/TextArea";
import Button from "../components/button/Button";
import { INVITATIONS } from "../apollo/Queries/invitationQueries";
import { CREATE_INVITATION } from "../apollo/Mutations/invitationMutations";
import { inviteValidation } from "../validations/inviteValidation";
import { ErrorNotification } from "../utils/notifications";
import { formatDates } from "../utils/dates";
import { protectedPage } from "../utils/auth";

const Users = () => {
  const { setNotification } = useContext(NotificationContext);

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [errors, setErrors] = useState({});
  const [invitation, setInvitation] = useState({
    emails: "",
    description: "",
  });

  const [invite] = useMutation(CREATE_INVITATION, {
    onCompleted: () => setShow(false),
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const { loading, data } = useQuery(INVITATIONS, {
    variables: { accepted },
    onCompleted: ({ invitations }) => setInvitations(invitations),
    onError: (error) => ErrorNotification(setNotification, error),
  });

  const handleInviteInputs = (name, value) => {
    setInvitation((presState) => ({ ...presState, [name]: value }));
    if (name === "emails") setErrors({ email: "" });
  };

  const handleInvite = (e) => {
    e.preventDefault();
    const emails = invitation.emails.replace(/\s+/g, " ").trim().split(" ");
    const errors = inviteValidation(emails);
    if (!errors.valid) return setErrors(errors);

    invite({
      variables: {
        emails,
        description: invitation.description,
      },
    });
  };

  useEffect(() => {
    if (data) {
      setInvitations(
        data.invitations.filter(({ email }) =>
          email.toLowerCase().startsWith(search.toLowerCase())
        )
      );
    }
  }, [search]);

  return (
    <>
      <Main title="Users">
        <div className="users__btn">
          <Input
            width="30rem"
            label="Search"
            placeholder="search"
            name="search"
            type="text"
            float="right"
            handleChange={(e) => setSearch(e.target.value)}
          />
          <Button
            title="Invite users"
            handleClick={() => setShow(!show)}
            width="20rem"
          />
        </div>
        <div className="invitations__request">
          <div
            className="invitation__request"
            style={{ background: !accepted && "#b8c8d7" }}
            onClick={() => setAccepted(true)}
          >
            Accpeted
          </div>
          <div
            className="invitation__request"
            style={{ background: accepted && "#b8c8d7" }}
            onClick={() => setAccepted(false)}
          >
            Pending
          </div>
        </div>
        {!loading ? (
          <List titles={["Email", "date"]}>
            {invitations.map((invi) => (
              <Fragment key={invi._id}>
                <ListItem text={invi.email} />
                <ListItem text={formatDates(invi.invitationDate)} />
              </Fragment>
            ))}
          </List>
        ) : (
          <Loading loadingPage text="Loading users" />
        )}

        <Popup
          show={show}
          title="Invite people"
          handleShow={() => setShow(false)}
        >
          <p
            style={{
              color: "#43425D",
              fontSize: "1.9rem",
              padding: "1rem 2rem 0rem",
            }}
          >
            People you add will get an email that gives them access to this
            platform and to view all your groups and events.
          </p>
          <form className="invite__form" onSubmit={handleInvite}>
            <Input
              label="Email(s)"
              placeholder="email"
              name="search"
              type="text"
              handleChange={(e) => handleInviteInputs("emails", e.target.value)}
              error={errors.email}
            />
            <TextArea
              border
              placeholder="Add a message here"
              padding="1rem"
              handleChange={(e) =>
                handleInviteInputs("description", e.target.value)
              }
            />
            <Button
              title="invite"
              float="right"
              width="20rem"
              marginTop="1rem"
            />
          </form>
        </Popup>
      </Main>

      <style jsx>
        {`
          .users__btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .invitations__request {
            display: flex;
            align-items: center;
          }

          .invitation__request {
            flex: 1;
            background: #fff;
            text-align: center;
            padding: 1.5rem 0rem;
            font-size: 1.7rem;
            cursor: pointer;
            font-weight: 500;
          }
          .invitation__request:not(:last-child) {
            border-right: 1px solid rgba(0, 0, 0, 0.2);
            border-top-right-radius: 10px;
          }

          .invite__form {
            padding: 2rem;
          }
        `}
      </style>
    </>
  );
};

export default Users;

export const getServerSideProps = (ctx) => protectedPage(ctx);
