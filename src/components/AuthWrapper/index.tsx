import React from "react";
import AuthNavbar from "../AuthNavbar";
import Sidebar from "../Sidebar";

interface AuthWrapperProps {
  children: React.ReactNode; 
  title?: string;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, title }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto h-[100vh]">
        <AuthNavbar welcomeText={title} />
        {children}
      </div>
    </div>
  );
};
export default AuthWrapper;