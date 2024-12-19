import React from 'react';
import ColorBar from '../ColorBar';

interface BannerProps {
    title: string;
}

const Banner: React.FC<BannerProps> = ({ title }) => {
    return (
        <>
            <div className="background-image h-[250px] justify-center flex mt-[-35px] items-center	">
                <div className="flex text-white text-2xl mt-4 sm:text-3xl md:text-4xl lg:text-[41px] xl:text-[55px] font-bold w-[85%] m-2">
                    {title}
                </div>
            </div>
            <ColorBar type={1} />
        </>
    );
};

export default Banner;
