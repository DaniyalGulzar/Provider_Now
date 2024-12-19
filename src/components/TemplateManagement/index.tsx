import React from "react";
import Button from "../Button";

interface TemplatesProps {
  boxShadow?: boolean;
  title: string;
  rows: Array<{ data: string }>;
  button?: React.ReactNode;
}

const Templates: React.FC<TemplatesProps> = ({
  boxShadow,
  title,
  rows,
  button,
}) => {
  return (
    <div
      className={`p-4 bg-white rounded-lg my-10 max-w-8xl mt-10 mx-10 lg:mx-10 h-auto ${
        boxShadow ? "shadow-lg" : ""
      }`}
    >
      <div className="flex items-center justify-between flex-col md:flex-row mb-2">
        <h2 className="text-center text-xl lg:text-2xl md:text-2xl sm:text-left">
          {title}
        </h2>
      </div>
      <hr className="border-gray-300" />
      <div className="space-y-4 mt-2">
        {rows.map((row, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-center p-2 border-b border-gray-200"
          >
            <span className="text-gray-700 font-semibold pl-3">{row.data}</span>
            {button && <div className="my-3 sm:mt-0">{button}</div>}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center my-8">
        <Button className="bg-[#631681] border border-[#631681] text-white font-semibold px-6 py-2 rounded-md w-1/2 md:w-auto">
          Upload New Template
        </Button>
      </div>
    </div>
  );
};

export default Templates;
