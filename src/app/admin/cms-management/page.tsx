"use client";
import React, { useEffect, useState } from "react";
import Cms from "@/components/Cms";
import Button from "@/components/Button";
import { FaEdit } from "react-icons/fa";
import AuthWrapper from "@/components/AuthWrapper";
import { useSession } from "next-auth/react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";

const CMSManagement = () => {
  return (
    <AuthWrapper>
      <Cms title="CMS Management" />
    </AuthWrapper>
  );
};

export default CMSManagement;
