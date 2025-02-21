function validation(values) {
  let errors = {};
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.password === "") {
    errors.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    errors.password = "Password didn't match";
  } else {
    errors.password = " ";
  }
  return errors;
}

export default validation;
