import StyleSheet from "./upload.module.scss";
const ImageUplaod = ({ id, handleChange, image, error, ...rest }) => {
  return (
    <>
      <input
        id={id}
        name={id}
        type="file"
        onChange={handleChange}
        accept=".png, .jpg, .jpeg"
        directory="true"
        className={StyleSheet.imageUpload__field}
      />
      <label
        className={[
          StyleSheet.imageUpload,
          image && StyleSheet.imageUpload__borderless,
          error && StyleSheet.imageUpload__error,
        ].join(" ")}
        htmlFor={id}
        style={rest}
      >
        <i className={["fa fa-plus", StyleSheet.imageUpload__icon].join(" ")} />
        {image && (
          <img
            alt="img_upload"
            className={StyleSheet.imageUpload__image}
            src={image}
          />
        )}
      </label>
    </>
  );
};

export default ImageUplaod;
