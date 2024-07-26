import React from 'react';

import { ButtonProps } from '../../type';

const PrimaryButton: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className="bg-[#443EDE] text-white px-6 py-3 rounded-md hover:bg-[#3836c4] font-semibold text-lg">
        {text}
    </button>
  );
}

export default PrimaryButton;
