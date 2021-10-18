import StyleSheet from "./list.module.scss";

const ListItem = ({ text, image, title, children, ...rest }) => {
  return (
    <div
      className={[
        StyleSheet.list__item,
        title && StyleSheet.list__item__title,
      ].join(" ")}
      style={{ ...rest }}
    >
      {image && <img src={image} className={StyleSheet.list__img} />}
      {text}
      {children}
    </div>
  );
};

export default ListItem;
