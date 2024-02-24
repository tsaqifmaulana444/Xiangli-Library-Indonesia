export default function Navbar() {
  return (
    <>
      <nav className='flex justify-between mt-6 items-center'>
        <p className='font-bold text-[25px]'>欢迎, 希望你早日致富!</p>
        <div className="flex">
          <img src="/images/pp.png" alt="" className='rounded-full w-[50px]' />
          <div className="ml-3">
            <p className="font-bold text-[16px]">张建伟</p>
            <p className="text-[16px]">zhangjianwei@gmail.com</p>
          </div>
        </div>
      </nav>
    </>
  )
}
