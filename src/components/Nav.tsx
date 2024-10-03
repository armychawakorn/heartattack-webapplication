import React from 'react'
import Image from 'next/image'

export default function Nav() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center md:justify-items-stretch bg-white shadow-2xl'>
            <div className="flex items-center">
                <Image src={`https://khonkaenuniversity.in.th/wp-content/uploads/2022/01/1.-official-logo-2022-26-500x465.png`} width={64} height={64} alt="logo" />
                <p className='text-2xl'>Khon Kaen University</p>
            </div>
            <div className='flex justify-end items-center px-3'>
                <div className="grid grid-rows-2 text-center">
                    <p className='text-xl'>โปรเจคนี้เป็นส่วนหนึ่งของรายวิชา</p>
                    <p className='text-xl'>Artificial Intelligence</p>
                </div>
            </div>
        </div>
    )
}
