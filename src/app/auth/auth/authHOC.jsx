"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(Component, allowedRoles = []) {
  return function AuthenticatedComponent(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading

      // If no session, redirect to sign-in
      if (!session) {
        signIn();
        return 
      }
      // Check if the user's role is allowed to access this route
      if (session?.user?.role && !allowedRoles.includes(session.user.role)) {
        router.push("/unauthorized"); // Redirect to an unauthorized page if role is not allowed
      }
    }, [session, status, router]);

    if (status === "loading") {
      return <div>Loading...</div>; // Display a loading state while checking authentication
    }

    // If the session is null or the role is not allowed, render nothing
    if (!session || (session?.user?.role && !allowedRoles.includes(session.user.role))) {
      return null;
    }

    // Render the child component if authenticated and role is allowed
    return <Component {...props} />;
  };
}
