"use client"
import Banner from "@/components/Banner/page";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import NavbarOther from "@/components/NavbarOther/page";
import Image from "next/image";
import Link from "next/link";

export default function LMN() {
  return (
    <>
      <NavbarOther />
      <Banner title="About us" />

      <div className="max-w-[85%] mx-auto my-8 md:my-16 lg:my-[80px] flex flex-col lg:flex-row items-center lg:items-start">
        <div className="flex-1 pr-0 lg:pr-[28px] text-center lg:text-left">
          <span className="text-3xl md:text-4xl font-semibold">We’re here to help</span>
          <div className="my-4">
            <span className="text-lg md:text-xl text-FF1F9D font-bold">The ProviderNow Story</span>
          </div>
          <p className="text-sm md:text-base font-normal">
          Today’s consumers don’t buy many things the same way they did 50 years ago. Why should healthcare be any different? At ProviderNow we bring patients and providers into the 21st century with a simple user interface, affordable pricing, and a wealth of choices for their healthcare needs. Our focus on a seamless user experience benefits providers as much as patients, saving administrative time and increasing their capacity to serve patients. 
            <br />
          </p>
          <div className="my-3">
            <span className="text-sm md:text-base font-normal">There’s simply no reason to do things the old, inefficient way anymore. Sign up for ProviderNow and experience healthcare accelerated for the modern world. 
            </span>
          </div>
          <div className="mt-[36px] flex justify-center lg:justify-start w-full">
            <Link href="/auth/login">
              <Button className="h-12 w-[161px] bg-751A9B text-white hover:bg-purple-700 text-sm md:text-base font-semibold rounded-lg">
                Signup Now
              </Button>
            </Link>
          </div>

        </div>

        {/* Right Side: Image */}
        <div className="flex-1 mt-8 lg:mt-0">
          <Image src="/myImages/about-image.png" className="max-w-full  h-auto lg:h-[354px]" width={521} height={354} alt="Healthcare" />
        </div>
      </div>
      <Footer />
    </>
  );
}
