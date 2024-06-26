import { useLaravelReactI18n } from 'laravel-react-i18n'

interface NavProps {
  name: string
  email: string
}

export default function Navbar({ name, email }: NavProps) {
  type LocaleToLanguage = {
    [key: string]: string;
  }

  const { t, tChoice, currentLocale, setLocale, getLocales, isLocale, loading } = useLaravelReactI18n()
  const getLanguageName = (locale: string) => {
    const localeToLanguage: LocaleToLanguage = {
      en: 'English(UK)',
      zh: '中文(简体)',
      in: 'हिन्दी',
      ar: 'عربي',
      th: 'ภาษาไทย',
      vi: 'Tiếng Việt',
      ko: '한국어(북한)',
      ru: 'Pyccкий',
      jw: 'Basa Jawa',
      ur: 'اردو',
      my: 'မြန်မာ',
      ph: 'Tagalog',
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
            <p className="font-bold text-[16px]">{name}</p>
            <p className="text-[16px]">{email}</p>
          </div>
        </div>
      </nav>
    </>
  )
}
