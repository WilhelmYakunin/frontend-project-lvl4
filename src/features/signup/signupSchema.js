import * as yup from 'yup';

const signupSchema = yup.object().shape({
  username: yup.string()
    .min(3, 'signup.usernameConstraints')
    .max(20, 'signup.usernameConstraints')
    .required('signup.required'),
  password: yup.string()
    .min(6, 'signup.passMin')
    .required('signup.required'),
  confirmPassword: yup.string()
    .min(6, 'signup.passMin')
    .oneOf([yup.ref('password'), null], 'signup.mustMatch'),
});

export default signupSchema;
