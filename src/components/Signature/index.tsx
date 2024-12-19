"use client";
import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import Button from "../Button";
interface SignatureProps {
	showSignature?: boolean;
	callbackFunction: any
}
const Signature: React.FC<SignatureProps> = ({ showSignature, callbackFunction }) => {
	const [result, setResult] = useState<string | null>(null);
	const signatureRef = useRef<SignatureCanvas | null>(null);
	const clearHandler = () => {
		if (signatureRef.current) {
			signatureRef.current.clear();
			setResult(null);
		}
	};
	const saveHandler = () => {
		if (signatureRef.current) {
			const res = signatureRef.current
				.getTrimmedCanvas().toDataURL("");
			callbackFunction(res);
		}
	};
	return (
		<div>
			{!showSignature && (
				<div className="w-[380px] h-[200px] border border-solid" style={{ marginTop: 20 }}>
					<SignatureCanvas
						ref={signatureRef}
						penColor="black"
						canvasProps={{ width: 380, height: 200, className: "sigCanvas" }}
					/>
				</div>
			)}
			<div className="flex justify-center gap-4" style={{ marginTop: 10 }}>
				<Button className="bg-[#751A9B] text-white h-12 font-semibold w-[161px] hover:bg-purple-700 text-base w-44 py-2 px-4 rounded-md" onClick={saveHandler}>Save</Button>
				<Button className="bg-transparent border border-[#751A9B] text-[#751A9B] h-12 font-semibold w-[161px] hover:bg-purple-700 hover:text-white text-base w-44 py-2 px-4 rounded-md" onClick={clearHandler}>Clear</Button>
			</div>
		</div>
	);
};
export default Signature;