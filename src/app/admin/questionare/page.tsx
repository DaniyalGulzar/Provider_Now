import React from "react";
import Questionare from "@/components/Questionare";
import AuthWrapper from "@/components/AuthWrapper";
import Button from "@/components/Button";

const QuestionarePage = () => {
  return (
    <>
      <AuthWrapper>
        <Questionare
          boxShadow={true}
          button={
            <div className="flex flex-col md:flex-row gap-4">
              <Button className="bg-transparent border border-[#631681] text-[#631681] font-semibold px-4 py-2 rounded-md w-full md:w-auto">
                Discard Changes
              </Button>

              <Button className="bg-[#631681] border border-[#631681] text-white font-semibold px-4 py-2 rounded-md w-full md:w-auto">
                Save Changes
              </Button>
            </div>
          }
        />
      </AuthWrapper>
    </>
  );
};

export default QuestionarePage;
