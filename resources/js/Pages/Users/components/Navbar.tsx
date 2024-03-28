import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function Navbar() {
  type LocaleToLanguage = {
    [key: string]: string;
  }

  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()
  const getLanguageName = (locale: string) => {
    const localeToLanguage: LocaleToLanguage = {
      en: 'English(UK)',
      zh: '中文(简体)',
    }

    return localeToLanguage[locale] || locale
  }

  return (
    <>
      <nav className='flex justify-between mt-6 items-center'>
        <p className='font-bold text-[25px]'>{t("nav_dashboard1")}</p>
        <div className="flex">
          <select value={currentLocale()} onChange={(event) => setLocale(event.currentTarget.value)} className='border-transparent'>
            {getLocales().map(locale => (
              <option key={locale} value={locale}>{getLanguageName(locale)}</option>
            ))}
          </select>
          <img src="/images/pp.png" alt="" className='rounded-full w-[50px] ml-4' />
          <div className="ml-3">
            <p className="font-bold text-[16px]">张建伟</p>
            <p className="text-[16px]">zhangjianwei@gmail.com</p>
          </div>
        </div>
      </nav>
    </>
  )
}
