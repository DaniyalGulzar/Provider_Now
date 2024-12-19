import React from "react";
import AuthWrapper from "@/components/AuthWrapper";
import Paymentoption from "@/components/Paymentoption";

const RequestProvider = () => {
  return (
    <>
      <AuthWrapper>
        <Paymentoption/>
      </AuthWrapper>
    </>
  );
};

export default RequestProvider;
