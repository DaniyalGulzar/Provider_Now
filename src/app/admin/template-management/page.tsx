import React from "react";
import Templates from "@/components/TemplateManagement";
import Button from "@/components/Button";
import { FaEdit } from "react-icons/fa";
import AuthWrapper from "@/components/AuthWrapper";

const rows = [
  { data: "FSA_HRA_Reimbursement_Claim_Form_REVISED-9.6.2022_" },
  { data: "FSAFEDS LOMN" },
  { data: "HealthEquity LOMN " },
  { data: "HealthEquity_RA_LOMN" },
  { data: "HealthEquity_Reimbursement_reqs" },
  { data: "Inspira Financial LMN" },
  { data: "Lively LOMN" },
  { data: "Navia LOMN" },
  { data: "Optum LOMN" },
  { data: "Optum Medical Practitioner Statement of Medical Necessity" },
  { data: "P&A Group LOMN" },
  { data: "Updated PN LMN Template" },
];

const TemplateManagement = () => {
  return (
    <AuthWrapper>
      <Templates
        boxShadow={true}
        title="Templates Management"
        rows={rows}
        button={
          <Button className="bg-[#631681] border border-[#631681] text-white font-semibold px-6 py-2 rounded-md md:w-50">
            <FaEdit className="mr-2" />
            Edit
          </Button>
        }
      />
    </AuthWrapper>
  );
};

export default TemplateManagement;
