"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/components/Footer";
import NavbarOther from "@/components/NavbarOther/page";
import Banner from "@/components/Banner/page";
import { Circles } from "react-loader-spinner";

interface PolicyData {
    result: {
        content: string;
    };
}

export default function Policy() {
    const [data, setData] = useState<PolicyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<PolicyData>(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/cms-page/show/Privacy%20Policy`);
                console.log(response.data.result.content)
                setData(response.data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <NavbarOther />
            <Banner title="Privacy policy" />
            {loading && <Circles
                height="80"
                width="80"
                color="#491161"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass="loading-spinner-overlay"
                visible={loading}
            />}
            {error && <p>Error: {error}</p>}
            {data && (
                <div className="max-w-[85%] mx-auto my-10 flex">
                    <div dangerouslySetInnerHTML={{ __html: data.result.content }} />
                </div>
            )}
            <Footer />
        </div>
    );
}
