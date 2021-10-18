export const createValidation = ({ title, image }) => {
  const errors = {
    title: "",
    image: "",
    valid: true,
  };
  if (!title) {
    errors.title = "Title is required!";
    errors.valid = false;
  }
  if (!image) {
    errors.image = "Insert an Image please!";
    errors.valid = false;
  }
  return errors;
};
