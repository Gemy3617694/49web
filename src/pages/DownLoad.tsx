import logo from '../assets/logo2.svg'

import trans from '../translations/trans'
import appelIcon from '../assets/apple.svg'
import googleIcon from '../assets/googleBu.svg'
import appGaIcon from '../assets/appGallery.svg'
import smallLogo from '../assets/49Icon.svg'
import AdvancedStarRating from '../components/StarRating'


const DownLoad = () => {
  const lang = localStorage.getItem('lang')
  const dirInLocal = localStorage.getItem('dir')
  return (
    <div
      dir={dirInLocal || 'ltr'}
      className=' w-full max-w-screen-2xl flex flex-col  items-center gap-2 h-[calc(100%-240px)]'
    >
      <div className='w-full min-h-48 p-4 bg-white flex items-center justify-between'>
        <div className='flex gap-2 items-end'>
          <div className={`w-14 h-14 ${dirInLocal === 'rtl' ? 'pl-2' : 'pr-2'} flex items-center justify-end
           border border-main rounded-lg`}>
            <img src={smallLogo} alt='logo' />
          </div>
          <div className='flex flex-col gap-2 items-center justify-end text-center '>
            <h2 className='font-extrabold text-sm capitalize'>{trans[lang as 'en' | 'ar'].title}</h2>
            <AdvancedStarRating readonly={true} rating={5}/>
          </div>
        </div>
        <button className='w-16 h-14 text-white bg-[#E53564] rounded-xl px-2'>
          Get
        </button>
      </div>
      <div className=' p-4 max-w-full flex flex-col  items-center gap-2'>
        <img src={logo} alt='logo' className='w-40 h-40' />
        <h1
          className={`italic ${
            lang === 'en' ? 'text-2xl' : 'text-2xl'
          } text-white text-center font-bold`}
        >
          {trans[lang as 'en' | 'ar'].title}
        </h1>
        <p className='text-xl font-semibold text-[#F33D49] tracking-[3px]'>
          {trans[lang as 'en' | 'ar'].subTitle}
        </p>
      </div>
      <div className=' p-4 max-w-full flex flex-col  items-center gap-4'>
        <img src={appelIcon} alt='logo' className='w-36 h-10' />
        <img src={googleIcon} alt='logo' className='w-36 h-10 ' />
        <img src={appGaIcon} alt='logo' className=' w-36 h-10' />
       
      </div>
    </div>
  )
}

export default DownLoad
