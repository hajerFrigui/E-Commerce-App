import { useContext } from "react";
import { useSubscription } from "@apollo/client";
import { useRouter } from "next/router";
import { UserContext } from "../../context/userContext";
import Link from "next/link";
import { Grid, GridItem } from "../grid";
import { Comment, CommentInput } from "../comment";
import Typography from "../typography/Typography";
import { COMMENT_SUBSCRIPTION } from "../../apollo/Subscriptions/commentSubs";
import { relativeDate } from "../../utils/dates";
import { handleCommentSubscriptions } from "../../apollo/Subscriptions/subscriptions";
import StyleSheet from "./post.module.scss";

const Post = ({ post, handleDelete, groupDisplay }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  useSubscription(COMMENT_SUBSCRIPTION, {
    variables: { postId: post._id },
    skip: !post,
    onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) =>
      handleCommentSubscriptions(cache, data, post._id),
    fetchPolicy: "cache-first",
    shouldResubscribe: false,
  });

  return (
    <div className={StyleSheet.post}>
      <div className={StyleSheet.post__user}>
        <img
          className={StyleSheet.post__user__img}
          src={post.user.imageUrl || "/user.png"}
        />
        <div className={StyleSheet.post__user__info}>
          <div className={StyleSheet.post__user__title}>
            <Typography
              title={post.user.name}
              fontSize="1.6rem"
              handleClick={() => router.push("/profile/" + post.user._id)}
            />
            {!groupDisplay && (
              <>
                <i
                  className={[
                    "fa fa-caret-right",
                    StyleSheet.post__user__icon,
                  ].join(" ")}
                />
                <Link href={`/groups/${post.group._id}`}>
                  <a className={StyleSheet.post__user__link}>
                    <Typography title={post.group.title} fontSize="1.6rem" />
                  </a>
                </Link>
              </>
            )}
          </div>
          <span className={StyleSheet.post__user__date}>
            {relativeDate(post.date)}
          </span>
        </div>
        {handleDelete && (
          <i
            className={["fa fa-trash", StyleSheet.post__icon].join(" ")}
            onClick={handleDelete}
          />
        )}
      </div>

      <p className={StyleSheet.post__text}>{post.text}</p>
      {post.filesUrls && (
        <div className={StyleSheet.post__photos}>
          <Grid sizeOfColumn={"auto-fit"} columnGap={5} padding="1rem 0">
            {post.filesUrls.map((url, index) => (
              <GridItem key={index} minWidth="5rem" minHeight="5rem">
                <img src={url} className={StyleSheet.post__photo} />
              </GridItem>
            ))}
          </Grid>
        </div>
      )}

      <ul className={StyleSheet.post__commentIcons}>
        <li className={StyleSheet.post__commentIcon}>
          <i className="fa fa-comment">
            <span>{post.numberOfComments} </span>
          </i>
          <span>Comments</span>
        </li>
      </ul>
      <div className={StyleSheet.post__comments}>
        {post.comments.map((comment) => (
          <Comment
            key={comment._id}
            _id={comment._id}
            text={comment.text}
            date={comment.date}
            user={comment.user}
            currentUser={user?._id}
            postId={post._id}
          />
        ))}
      </div>
      <CommentInput post={post._id} user={user} />
    </div>
  );
};

export default Post;
