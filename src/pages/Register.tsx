import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import langIcon from '../assets/logo2.svg'
import CustomInput from '../components/customInput'
import userIcon from '../assets/user2.svg'
import emailIcon from '../assets/email.svg'
import passwordIconClose from '../assets/eye-close.svg'
import passwordIconOpen from '../assets/eye-open.svg'
// import ReferralIcon from '../assets/user.svg';
import CustomCheckbox from '../components/checkInput'
import trans from '../translations/trans'
import CustomDatePicker from '../components/customDate'
import calenderIcon from '../assets/calender.svg'
import usernameIcon from '../assets/username.svg'
import { registerValidationSchema } from '../validations/validationSchema'
import axios from 'axios'
import { fcmToken, registerWithEmail, registerWithPhone } from '../constant'
import { toast } from 'react-toastify'
import { splitErrorMessage } from '../assets/helper/splitError'
import { checkTextTypePhoneOrEmail } from '../assets/helper/checkIfemailOrPhone'
import { useNavigate } from 'react-router-dom'

interface RegisterFormData {
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  gender: string
  password: string
  confirmPassword: string
  username: string
  acceptTerms: boolean
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const dirInLocal = localStorage.getItem('dir') as 'ltr' | 'rtl' | null
  const lang = localStorage.getItem('lang') || 'en'
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerValidationSchema((lang as 'ar') || 'en')),
    mode: 'onChange'
  })

  // Watch gender to handle button styles
  const selectedGender = watch('gender')

  // Calculate min and max dates for birth date
  const today = new Date()
  const minDate = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split('T')[0]
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split('T')[0]

  const onSubmit = async (data: RegisterFormData) => {
    try {
 
      
      const errorPhoneOrEmail = checkTextTypePhoneOrEmail(data.email)
      if (errorPhoneOrEmail === 'unknown') {
        toast.error('Please enter a valid email or phone number')
      }      
      const response: any = await axios.post(
        checkTextTypePhoneOrEmail(data.email) === 'email'
          ? registerWithEmail
          : registerWithPhone,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          birthday: data.dateOfBirth,
          ...(errorPhoneOrEmail=== 'phone' && { phoneNumber: data.email }),
          ...(errorPhoneOrEmail=== 'email' && { email: data.email }),
          gender: data.gender,
          password: data.password,
          confirmPassword: data.confirmPassword,
          username: data.username,
          deviceId: '668e7b04be8cfesdsc5bc0c432afw9',
          ...(errorPhoneOrEmail=== 'phone' && { fcmToken: fcmToken }),
          ...(errorPhoneOrEmail=== 'email' && { fcm: fcmToken }),
        },
        {
          headers: {
            'x-api-key':
              '2c5381952acd7c2d530e6c656d2f6d94142f4f3e84c1c7d2b48dabdd976b0e06'
          }
        }
      )
      if (response.status === 201) {
        localStorage.setItem("isRegistered", 'true')
        toast.success(
          lang === 'en'
            ? 'Registration successful Download the app and enjoy all its features'
            : ' تم التسجيل بنجاح حمل التطبيق واستمتع'
        )
        navigate('/download')

      }
    } catch (error: any) {
      console.error('Registration error:', error?.response.data.error.message)
      toast.error(
        splitErrorMessage(
          error?.response.data.error.message,
          lang as 'en' | 'ar'
        )
      )
    }
  }

  const handleDateChange = (date: string) => {
    setValue('dateOfBirth', date)
    trigger('dateOfBirth') // Trigger validation after date change
  }

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setValue('gender', gender)
    trigger('gender') // Trigger validation after gender change
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }
  if (!lang) {
    return null
  }

  return (
    <div
      dir={dirInLocal || 'ltr'}
      className='p-4 w-screen flex flex-col bg-white h-screen overflow-y-auto'
    >
      <form
        className='w-full flex flex-col gap-3'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className='w-full flex items-center justify-center'>
          <img src={langIcon} alt='logo' className='w-35 h-35 mx-auto' />
        </div>

        {/* First Name & Last Name */}

        <div className='w-full'>
          <CustomInput
            {...register('firstName')}
            placeholder={trans[lang as 'en' | 'ar'].fName}
            icon={userIcon}
            type='text'
            error={errors.firstName?.message}
          />
        </div>
        <div className='w-full'>
          <CustomInput
            {...register('lastName')}
            placeholder={trans[lang as 'en' | 'ar'].lName}
            icon={userIcon}
            type='text'
            error={errors.lastName?.message}
          />
        </div>
        {/* Gender */}
        <div
          dir={dirInLocal || 'ltr'}
          className='w-full flex items-center justify-between'
        >
          <p
            className={`${
              dirInLocal === 'rtl' ? 'pr-6' : 'pl-6'
            } text-lg text-main`}
          >
            {trans[lang as 'en' | 'ar'].gender}
          </p>
          <div className='flex gap-4'>
            <button
              type='button'
              className={`px-2 py-1 rounded-lg transition-colors min-w-16 ${
                selectedGender === 'male'
                  ? 'bg-main text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleGenderSelect('male')}
            >
              {trans[lang as 'en' | 'ar'].male}
            </button>
            <button
              type='button'
              className={`px-2 py-1 rounded-lg transition-colors min-w-16 ${
                selectedGender === 'female'
                  ? 'bg-main text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleGenderSelect('female')}
            >
              {trans[lang as 'en' | 'ar'].female}
            </button>
          </div>
        </div>
        {
  errors.gender && (
    <p className='text-red-500 text-sm mt-0'>{errors.gender.message}</p>
  )
}

        {/* Username */}
        <div className='w-full'>
          <CustomInput
            {...register('username')}
            placeholder={trans[lang as 'en' | 'ar'].username}
            icon={usernameIcon}
            type='text'
            error={errors.username?.message}
          />
        </div>

        {/* Date of Birth */}
        <div>
          <CustomDatePicker
            placeholder={trans[lang as 'en' | 'ar'].dateOfBirth}
            icon={calenderIcon}
            maxDate={maxDate}
            minDate={minDate}
            onChange={handleDateChange}
            error={errors.dateOfBirth?.message}
          />
        </div>

        {/* Email */}
        <div className='w-full'>
          <CustomInput
            {...register('email')}
            placeholder={trans[lang as 'en' | 'ar'].email}
            icon={emailIcon}
            error={errors.email?.message}
          />
        </div>

      

        {/* Password */}
        <div className='w-full'>
          <CustomInput
            {...register('password')}
            placeholder={trans[lang as 'en' | 'ar'].password}
            icon={showPassword ? passwordIconOpen : passwordIconClose}
            type={showPassword ? 'text' : 'password'}
            error={errors.password?.message}
            onIconClick={togglePasswordVisibility}
          />
        </div>

        {/* Confirm Password */}
        <div className='w-full'>
          <CustomInput
            {...register('confirmPassword')}
            placeholder={trans[lang as 'en' | 'ar'].confirmPassword}
            icon={showConfirmPassword ? passwordIconOpen : passwordIconClose}
            type={showConfirmPassword ? 'text' : 'password'}
            error={errors.confirmPassword?.message}
            onIconClick={toggleConfirmPasswordVisibility}
          />
        </div>

        {/* Terms and Conditions */}
        <div className='w-full'>
          <CustomCheckbox
            {...register('acceptTerms')}
            label={trans[lang as 'en' | 'ar'].acceptTerms}
            onChange={checked => setValue('acceptTerms', checked)}
            error={errors.acceptTerms?.message}
          />
        </div>

        {/* Submit Button */}
        <div className='w-full'>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`w-full h-12 text-white py-2 rounded-lg transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-main hover:bg-main/80'
            }`}
          >
            {isSubmitting
              ? 'Registering...'
              : trans[lang as 'en' | 'ar'].register}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
