import * as yup from 'yup'
import trans from '../translations/trans'

export const registerValidationSchema = (language: 'en' | 'ar' = 'en') => {
  const t = trans[language].validation

  return yup.object({
    firstName: yup
      .string()
      .required(t.firstNameRequired)
      .min(2, t.firstNameMin)
      .max(50, t.firstNameMax),

    lastName: yup
      .string()
      .required(t.lastNameRequired)
      .min(2, t.lastNameMin)
      .max(50, t.lastNameMax),
    username: yup
      .string()
      .required(t.usernameRequired)
      .min(2, t.usernameMin)
      .max(50, t.usernameMax),

    dateOfBirth: yup
      .string()
      .required(t.dateOfBirthRequired)
      .test('is-adult', t.mustBeAdult, function (value) {
        if (!value) return false
        const birthDate = new Date(value)
        const today = new Date()
        const age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          return age - 1 >= 18
        }
        return age >= 18
      }),

    email: yup
      .string()
      .required(t.emailRequired)
      .test('is-email-or-phone', t.emailInvalid, value => {
        if (!value) return false

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex =
          /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/

        return (
          emailRegex.test(value) || phoneRegex.test(value.replace(/\s/g, ''))
        )
      }),
    gender: yup
      .string()
      .required(t.genderRequired)
      .oneOf(['male', 'female'], t.genderInvalid),

    password: yup
      .string()
      .required(t.passwordRequired)
      .min(8, t.passwordMin)
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, t.passwordComplexity),

    confirmPassword: yup
      .string()
      .required(t.confirmPasswordRequired)
      .oneOf([yup.ref('password')], t.passwordsMatch),

    // referral: yup
    //   .string()
    //   .optional()
    //   .default(''),

    acceptTerms: yup
      .boolean()
      .oneOf([true], t.acceptTermsRequired)
      .required(t.acceptTermsRequired)
  })
}
