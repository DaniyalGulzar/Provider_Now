import React from 'react';

interface ColorProps {
    type: number;
}

const ColorBar: React.FC<ColorProps> = ({ type }) => {
    return (
        <>
            {type === 1 ? <div className='bg-gradient-to-r from-[#491161] via-[#DE3092] to-[#F7C51E] h-5 w-full'></div> : <div className='bg-gradient-to-r from-[#491161] via-[#751A9B] to-[#13C1E8] h-5 w-full'></div>}
        </>
    );
};

export default ColorBar;
