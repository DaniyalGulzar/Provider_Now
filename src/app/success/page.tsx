import AuthWrapper from '@/components/AuthWrapper'
import Button from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function SuccessPage() {
  return (
    <AuthWrapper>
      <div className='p-6 md:p-4 sm:p-2'>
        <span className='text-[32px] md:text-[28px] sm:text-[24px] font-bold'>
          Request for letter of medical necessity
        </span>
        <div className='shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] rounded-[16px] md:rounded-[12px] sm:rounded-[8px] p-6 md:p-4 sm:p-2 mt-6'>
          <div className='max-w-[90%] md:max-w-[75%] sm:max-w-[80%] mx-auto text-center py-[120px] md:py-[120px] sm:py-4'>
            <span className='text-[28px] md:text-[20px] sm:text-[18px] font-bold text-7C2B91 flex justify-center items-center'>
              <Image src="/myImages/checked.svg" alt='check' className='h-8 w-8 mr-3' height={32} width={32} />
              Payment Successful
            </span>
            <div className='flex justify-center my-4'>
              <Image src="/myImages/email.svg" alt='email' height={72} width={72} className='h-[72px] w-[72px]' />
            </div>
            <span className='text-[22px] md:text-[18px] sm:text-[16px] font-bold'>
              Your Request has been received
            </span>
            <div className='mt-3 mb-8'>
              <span className='text-base text-[#484b52] md:text-base sm:text-xs font-bold'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel illum, iusto provident, molestiae recusandae distinctio veniam soluta aliquam.
              </span>
            </div>
            <div className='flex justify-center'>
              <Link href="/list-lmn">
                <Button className='w-[161px] h-[48px] md:w-[140px] md:h-[40px] sm:w-[120px] sm:h-[36px] rounded-md bg-751A9B text-white hover:bg-purple-700 text-base md:text-sm font-semibold'>
                  Finish
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
}

export default SuccessPage