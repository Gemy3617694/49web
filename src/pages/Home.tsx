import logo from '../assets/logo2.svg'
import langIcon from '../assets/lang.png'
import trans from '../translations/trans'
import { useNavigate, useSearchParams } from 'react-router-dom'
import emailIcon from '../assets/login-email.svg'
import googleIcon from '../assets/google.svg'

const Home = ({
  handleChange,
  lang
}: {
  handleChange: () => void
  lang: string
}) => {
  const [searchParams] = useSearchParams()
const code = searchParams.get('code') // '52456'


console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",code);

  const navigate = useNavigate()

  const handleRegisterClick = () => {
    navigate('/register')
  }

  if(code){
    localStorage.setItem('code', code)
  }

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      {/* ===== Top Section ===== */}
      <div className='p-4 max-w-full flex flex-col items-center gap-2 flex-1 overflow-y-auto min-h-0'>
        <div dir='ltr' className='w-full flex items-center justify-end'>
          <button
            onClick={handleChange}
            className='flex items-center justify-end gap-3 bg-gray-800 px-2 py-1 rounded-3xl'
          >
            <img src={langIcon} alt='logo' className='w-6 h-6' />
            <span className='text-md text-white'>
              {lang === 'en' ? 'العربية' : 'English'}
            </span>
          </button>
        </div>

        <img src={logo} alt='logo' className='w-40 h-40' />

        <h1 className='italic text-2xl text-white text-center font-bold'>
          {trans[lang as 'en' | 'ar'].title}
        </h1>

        <p className='text-xl text-[#F33D49] tracking-[3px]'>
          {trans[lang as 'en' | 'ar'].subTitle}
        </p>

        <p className='text-md text-center text-white'>
          {trans[lang as 'en' | 'ar'].disc}
        </p>
      </div>

      {/* ===== Bottom Section (Fixed Height) ===== */}
      <div className='font-bold h-[240px] bg-white rounded-t-3xl p-7 flex flex-col items-center justify-between'>
        <button className='w-full flex items-center gap-2 bg-white border-2 border-main hover:bg-main hover:text-white rounded-3xl p-3'>
          <img src={emailIcon} alt='logo' className='w-6 h-6' />
          <span>{trans[lang as 'en' | 'ar'].loginEmail}</span>
        </button>

        <button
          onClick={handleRegisterClick}
          className='w-full bg-white border-2 border-main hover:bg-main hover:text-white rounded-3xl p-3'
        >
          {trans[lang as 'en' | 'ar'].signup}
        </button>

        <button className='w-full flex items-center gap-2 bg-white border-2 border-main hover:bg-main hover:text-white rounded-3xl p-3'>
          <img src={googleIcon} alt='logo' className='w-6 h-6' />
          <span>{trans[lang as 'en' | 'ar'].loginGoogle}</span>
        </button>
      </div>
    </div>
  )
}

export default Home













// import logo from '../assets/logo2.svg'
// import langIcon from '../assets/lang.png'
// import trans from "../translations/trans"
// import { useNavigate } from 'react-router-dom'
// import emailIcon from '../assets/login-email.svg'
// import googleIcon from '../assets/google.svg'

// const Home = ({handleChange , lang} : {handleChange: () => void , lang: string}) => {
//   const navigate = useNavigate()

//   const handleRegisterClick = () => {
//     navigate('/register')
//   }
//   return (
//       <>
//         <div className=' p-4 max-w-full flex flex-col  items-center gap-2 h-[calc(100%-240px)]'>
//           <div dir='ltr' className='w-full flex items-center justify-end'>
//             <button  onClick={handleChange} className='flex items-center justify-end gap-3 bg-gray-800 px-2 py-1 rounded-3xl'>
//               <img src={langIcon} alt='logo' className='w-6 h-6' />
//               <span className='text-md text-white'>{lang === 'en' ? 'العربية' : 'English'}</span>
//             </button>
//           </div>
//           <img src={logo} alt='logo' className='w-40 h-40' />
//           <h1 className={`italic ${lang === 'en' ? 'text-2xl' : 'text-2xl'} text-white text-center font-bold`}>
//             {trans[lang as 'en' | 'ar'].title}
//           </h1>
//           <p className='text-xl text-[#F33D49] tracking-[3px]'>{trans[lang as 'en' | 'ar'].subTitle}</p>
//           <p className='text-md text-center text-white'>
//             {' '}
//             {trans[lang as 'en' | 'ar'].disc}
//           </p>
//         </div>
//         <div className=' font-bold absolute bottom-0 left-0 right-0 rounded-t-3xl p-7 h-[240px] bg-white flex flex-col items-center justify-between '>
//           <button className=' w-full flex items-center gap-2 bg-white border-2 border-main   hover:bg-main hover:text-white  rounded-3xl p-3'>
//             <img src={emailIcon} alt='logo' className='w-6 h-6' />
//             <span className='font-bold'>{trans[lang as 'en' | 'ar'].loginEmail}</span>
//           </button>
//           <button onClick={handleRegisterClick} className='  w-full bg-white border-2 border-main   hover:bg-main hover:text-white rounded-3xl p-3'>
//             {trans[lang as 'en' | 'ar'].signup}
//           </button>
//           <button className=' w-full flex items-center gap-2 bg-white border-2 border-main   hover:bg-main hover:text-white  rounded-3xl p-3'>
//             <img src={googleIcon} alt='logo' className='w-6 h-6' />
//             <span>{trans[lang as 'en' | 'ar'].loginGoogle}</span>
//           </button>
//         </div>
//      </>
//   )
// }

// export default Home
