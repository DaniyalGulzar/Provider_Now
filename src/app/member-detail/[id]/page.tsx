"use client"

import React from "react";
import AuthWrapper from '@/components/AuthWrapper';
import Detail from '@/components/MemberDetails';
import { useParams } from "next/navigation";
import withAuth from '@/app/auth/auth/authHOC'

function MemberDetail() {
	const param = useParams<any>();
	return (
		<AuthWrapper>
			<Detail
				id={param.id}
			/>
		</AuthWrapper>
	);
}

export default withAuth(MemberDetail,  ['Provider','Member']);
