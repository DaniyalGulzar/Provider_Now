import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface LetterProps {
	data: {
		id: string;
		createdAt: string;
		letter: string;
		letter_signature: string;
	};
}

const Letter: React.FC<LetterProps> = ({ data }) => {
	const { data: session }: any = useSession(); // Access session data

	return (
		<div className="p-4 sm:p-6 md:p-8">
			<h2 className="text-2xl mx-2 font-bold mb-4 sm:mb-6">Letter Of Medical Necessity</h2>

			<div className="rounded-md bg-gray-200 p-4 sm:p-6">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
					<div className="mb-4 sm:mb-0">
						<Image
							src="/myImages/logo-purple.svg"
							alt="Profile"
							width={45}
							height={45}
							className="h-[45px] w-[230px]"
						/>
					</div>
					{/* Data */}
					{session &&
						<div className="flex flex-col items-start my-5 mr-[50px]">
							<div className="space-y-2">
								<div className="flex flex-row">
									<span className="font-bold text-black">Name: </span>
									<span className="text-gray-500"> {session.user.first_name} {session.user.middle_name}</span>
								</div>
								<div className="flex flex-row">
									<span className="font-bold text-black">Email: </span>
									<span className="text-gray-500"> {session.user.email}</span>
								</div>
							</div>
						</div>
					}
				</div>
			</div>

			<div className="mt-6 rounded-md bg-gray-200">
				<div className="my-4 p-6">
					<div dangerouslySetInnerHTML={{ __html: data?.letter }} />
				</div>
				<div className="flex flex-col sm:flex-row justify-between items-center mt-20 mb-10 p-6">
					<div className="text-sm">
						<span className="font-semibold">Date:</span>
						<span> {data?.createdAt}</span>
					</div>
					<div className="text-sm mt-4 sm:mt-0">
						<span className="font-semibold ml-2">Signature:</span>
						{!(data?.letter_signature == '' || data?.letter_signature == null || data?.letter_signature == undefined) ?
							<img
								src={data?.letter_signature}
								alt={'Signature'}
								className="max-w-[150px]"
							/>
							: null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Letter;
