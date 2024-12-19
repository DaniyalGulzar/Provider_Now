"use client";

import AuthWrapper from '@/components/AuthWrapper'
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import TableLayout from '@/components/TableLayout';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { KeyboardEventHandler, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Circles } from 'react-loader-spinner'
import CreatableSelect from 'react-select/creatable';
import withAuth from '@/app/auth/auth/authHOC'

const components = {
	DropdownIndicator: null,
};

interface Option {
	readonly label: string;
	readonly value: string;
}

const createOption = (label: string) => ({
	label,
	value: label,
});

function ReferOther() {
	const [loading, setLoading] = useState(false);
	const [requestsOther, setRequestsOther] = useState([]);
	const [id, setId] = useState([]);
	const { data: session, }: any = useSession(); // Access session data

	const [inputValue, setInputValue] = React.useState('');
	const [value, setValue] = React.useState<readonly Option[]>([]);

	const handleKeyDown: KeyboardEventHandler = (event) => {
		if (!inputValue) return;
		switch (event.key) {
			case 'Enter':
			case 'Tab':
				setValue((prev) => [...prev, createOption(inputValue)]);
				setInputValue('');
				event.preventDefault();
		}
	};

	const handleSendInvitations = async () => {
		try {
			const token = session.token;
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}api/referral/invite`,
				{
					emails: value.map(option => option.value),
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			console.log(response)
			if (response.status === 200) {
				toast.success(response.data.message);
				setValue([]);
			}
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			setLoading(false);
		}
	};

	const columns = [
		{
			header: "Serial No.",
			accessor: "id",
			Cell: ({ value }: { value: string }) => <span>{value}</span>,
		},
		{
			header: "User name",
			accessor: "full_name",
			Cell: ({ value }: { value: string }) => (
				<div className="relative group">
				  <span className="w-44 truncate block">{value}</span>
				  <span className="absolute z-[1] left-[90%] ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
					{value} {/* Tooltip shows the full address */}
				  </span>
				</div>
			),
		},
		{
			header: "Email",
			accessor: "full_address",
			Cell: ({ value }: { value: string }) => (
				<div className="relative group">
				  <span className="w-44 truncate block">{value}</span>
				  <span className="absolute z-[1] left-[90%] ml-2 w-max bg-black text-white text-xs rounded py-2 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
					{value} {/* Tooltip shows the full address */}
				  </span>
				</div>
			),
		},
		{
			header: "Enrollment Date",
			accessor: "created_at",
			Cell: ({ value }: { value: string }) => <span>{moment(value).format('YYYY-MM-DD')}</span>,
		},
		{
			header: "Comission",
			accessor: "comission",
			Cell: ({ value }: { value: string }) => <span>{moment(value).format('YYYY-MM-DD')}</span>,
		},
	];

	const columns1 = [
		{
			header: "Serial No",
			accessor: "requestId",
			Cell: ({ value }: { value: string }) => <span>{value}</span>,
		},
		{
			header: "User name",
			accessor: "profile",
			renderImage: ({
				value,
			}: {
				value: { profilePic: string; name: string };
			}) => (
				<div className="flex items-center space-x-4">
					<img
						src={value.profilePic}
						alt={value.name}
						className="w-10 h-10 rounded-full"
					/>
					<span>{value.name}</span>
				</div>
			),
		},
		{
			header: "E-mail",
			accessor: "specialization",
			Cell: ({ value }: { value: string }) => <span>{value}</span>,
		},
		{
			header: "Enrollement-Date",
			accessor: "date",
			Cell: ({ value }: { value: string }) => <span>{moment(value).format('YYYY-MM-DD')}</span>,
		},
		{
			header: "Comission",
			accessor: "category",
			Cell: ({ value }: { value: string }) => <span>{value}</span>,
		},
	];

	const requests1 = [
		{
			requestId: "#1001",
			profile: {
				profilePic:
					"https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
				name: "John Doe",
			},
			specialization: "New York",
			date: "2024-08-01",
			category: "General",

		},
		{
			requestId: "#1001",
			profile: {
				profilePic: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
				name: "John Doe",
			},
			specialization: "New York",
			date: "2024-08-01",
			category: "General",
			status: "Completed",

		},
		{
			requestId: "#1001",
			profile: {
				profilePic:
					"https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
				name: "John Doe",
			},
			specialization: "New York",
			date: "2024-08-01",
			category: "General",
			status: "Completed",

		},
		{
			requestId: "#1001",
			profile: {
				profilePic: "https://robohash.org/mail@ashallendesign.co.uk",
				name: "John Doe",
			},
			specialization: "New York",
			date: "2024-08-01",
			category: "General",
			status: "Completed",
		},
		{
			requestId: "#1001",
			profile: {
				profilePic: "https://placebeard.it/250/250",
				name: "John Doe",
			},
			specialization: "New York",
			date: "2024-08-01",
			category: "General",
			status: "Rejected",
		},
		{
			requestId: "#1001",
			profile: {
				profilePic: "https://loremflickr.com/250/250/dog",
				name: "John Doe",
			},
			specialization: "New York",
			date: "2024-08-01",
			category: "General",
			status: "Completed",
		},
		{
			requestId: "#1001",
			profile: {
				profilePic: "https://dummyimage.com/400x300/00ff00/000",
				name: "John Doe",
			},
			specialization: "New York",
			date: "2024-08-01",
			category: "General",
			status: "Waiting",
		},
	];

	useEffect(() => {
		if (!session) return;
		setId(session.user.id);
	}, [session]);

	useEffect(() => {
		if (!session) return;

		const fetchData = async () => {
			try {
				const token = session.token;
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}api/referral/list`,
					{
						headers: {
							Authorization: `Bearer ${token}`, // Replace yourToken with the actual token
						},
					}
				);
				setRequestsOther(response.data.result);
			} catch (error) {
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [session]);

	const handleCopy = () => {
		navigator.clipboard.writeText(`https://provider-now.vercel.app/auth/create-member?id=${id}`)
			.then(() => {
				toast.success("Link copied!")
			})
			.catch(err => {
				console.error('Failed to copy text: ', err);
			});
	};

	return (
		<div>
			<AuthWrapper>
				<Circles
					height="80"
					width="80"
					color="#491161"
					ariaLabel="bars-loading"
					wrapperStyle={{}}
					wrapperClass="loading-spinner-overlay"
					visible={loading}
				/>
				<div className="xl:mx-8 lg:mx-8 md:mx-8 mx-3">
					<div className="my-5">
						<h2>Refer Others</h2>
					</div>
					<div className="shadow-[0_4px_15px_rgba(0,0,0,0.1),0_-4px_15px_rgba(0,0,0,0.1)] p-5 rounded-[22px]">
						<form className="">
							<div className='flex justify-center items-center flex-col'>
								<Image src="/myImages/refer-users.svg" alt='refer' height={74} width={74} />
								<span className='text-[24px] sm:text-[20px] font-bold text-[#751A9B] pt-5 text-center'>
									Refer a friend to earn special rewards with ProviderNow!
								</span>
							</div>

							<div className=''>
								<span className='text-lg sm:text-base font-bold'>Invite your friends</span>
								<div className='mt-4 flex flex-col md:flex-row items-center'>
									<div className="flex-1 h-[56px] w-full">
										<CreatableSelect
											components={components}
											inputValue={inputValue}
											isClearable
											isMulti
											menuIsOpen={false}
											onChange={(newValue) => setValue(newValue)}
											onInputChange={(newValue) => setInputValue(newValue)}
											onKeyDown={handleKeyDown}
											placeholder="Type something and press enter..."
											value={value}
										/></div>
									<Button onClick={handleSendInvitations} className='bg-[#751A9B] text-white w-full md:min-w-[220px] md:w-[220px] h-[56px] rounded-md'>
										Send Invitations
									</Button>
								</div>
							</div>

							<div className='mt-4'>
								<span className='text-lg sm:text-base font-bold'>Share the Referral Link</span>
								<div className='mt-3'>
									<span>You can also share your personal referral link by copying and sending it directly</span>
								</div>
								<div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4'>
									<div className='w-full mt-4'>
										<InputField
											type='text'
											labelClassName='text-md'
											value={`https://provider-now.vercel.app/auth/create-member?id=${id}`}
											name='refer'
											id='refer'
											className="flex-1 h-[56px] w-full"
											disabled={true}
										/>
									</div>
									<Button onClick={handleCopy} className='bg-[#751A9B] text-white w-full md:min-w-[220px] md:w-[220px] h-[56px] rounded-md'>
										Copy Link
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>

				{/* <div className='mt-10 '>
					<div className='mx-3 lg:mx-10 mb-5'>
						<h2 className='text-center md:text-left sm:text-left lg:text-left'>Your rewards</h2>
					</div>
					<TableLayout
						isHrVisible={false}
						columns={columns1}
						data={requests1}
						boxShadow={true}
					/>
				</div> */}
				<div>
					<h2 className='text-center md:text-left mt-5 sm:text-left lg:text-left xl:mx-8 lg:mx-8 md:mx-8 mx-3'>Invited Friends</h2>
					<TableLayout
						isHrVisible={false}
						columns={columns}
						data={requestsOther}
						boxShadow={true}
					/>
				</div>

			</AuthWrapper>
		</div>
	)
}

export default withAuth(ReferOther,  ['Provider','Member']);