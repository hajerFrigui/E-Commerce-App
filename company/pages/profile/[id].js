import { useQuery } from "@apollo/client";
import Main from "../../layout/Main";
import { Grid, GridItem } from "../../components/grid";
import Post from "../../components/post/Post";
import ProfileInfo from "../../components/profile/ProfileInfo";
import Typography from "../../components/typography/Typography";
import Loading from "../../components/loading/Loading";
import { USER_POSTS } from "../../apollo/Queries/postQueries";
import { protectedPage } from "../../utils/auth";

const Profile = ({ id }) => {
  const { data, loading } = useQuery(USER_POSTS, {
    skip: !id,
    variables: { user: id },
  });

  return !loading && data ? (
    <>
      <Main title="Profile">
        <div className="profile">
          <Grid padding=" 2rem 1rem" minWidth="65%" rowGap={20}>
            {
              <GridItem
                shadow
                padding="2rem 4rem"
                position="sticky"
                top={5}
                zIndex={4}
                overflow="auto"
              >
                <ProfileInfo user={data?.userPosts.user} />
              </GridItem>
            }
            <Typography
              title="Posts"
              fontSize="1.7rem"
              borderBottom="1px solid gray"
            />

            {data.userPosts.posts.length ? (
              data.userPosts.posts.map((post) => (
                <GridItem shadow padding={20} key={post._id}>
                  <Post post={post} />
                </GridItem>
              ))
            ) : (
              <Typography
                title="You didn't post yet in any group"
                fontSize="1.6rem"
              />
            )}
          </Grid>
          <Grid padding=" 2rem 1rem" minWidth="35%">
            <GridItem padding="2rem" shadow>
              <Typography title="info" color="gray" fontSize="2rem" />
            </GridItem>
          </Grid>
        </div>
      </Main>
      <style jsx>{`
        .profile {
          display: flex;
          align-items: flex-start;
        }
      `}</style>
    </>
  ) : (
    <Loading loadingPage text="Loading user" font={1.5} />
  );
};

export default Profile;

export const getServerSideProps = (ctx) => protectedPage(ctx);
