// src/app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Button from "@/components/Button";
import ColorBar from "@/components/ColorBar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VideoModal from "@/components/VideoModal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { FaMinus, FaPlus } from "react-icons/fa";

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "spanish">("english");

  const videoSources = {
    english: process.env.NEXT_PUBLIC_LANDING_PAGE_VIDEO_URL,
    spanish: process.env.NEXT_PUBLIC_LANDING_PAGE_VIDEO_URL_SPANISH,
  };

  const handleLanguageChange = (language:any) => {
    setSelectedLanguage(prev => (prev === "english" ? "spanish" : "english"));
  };

  const toggleFAQ = (index: any) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const router = useRouter();

  const handleSignUpClick = () => {
    router.push('/auth/login');
  };

  const handleLMN = () => {
    router.push('/LMN');
  };

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleImageClick = () => {
    setIsVideoPlaying(true);
  };

  const faqs = [
    {
      question: "Can I still obtain/use LMNs if I don’t have an FSA/HSA?",
      answer: "Strategies include regular exercise, healthy eating, adequate sleep, relaxation techniques like deep breathing or meditation, seeking social support, and limiting exposure to stressors."
    },
    {
      question: "What is an FSA/HSA?",
      answer: "Maintaining a healthy weight involves a balanced diet, regular physical activity, monitoring calorie intake, and seeking advice from healthcare professionals if needed."
    },
    {
      question: "What is the cost for an LMN?",
      answer: "The recommended schedule for childhood vaccinations varies by country and health organization. Consult your healthcare provider or local health department for the most accurate information."
    },
    {
      question: "Are all sales final?",
      answer: "Risk factors for heart disease include high blood pressure, high cholesterol, smoking, obesity, physical inactivity, and a family history of heart disease."
    },
    {
      question: "Will all providers/insurers accept an LMN from ProviderNow?",
      answer: "Preventative measures include regular hand washing, wearing masks, maintaining social distancing, getting vaccinated, and following public health guidelines."
    },
    {
      question: "What if my claim is denied after obtaining an LMN? ",
      answer: "Preventative measures include regular hand washing, wearing masks, maintaining social distancing, getting vaccinated, and following public health guidelines."
    },
    {
      question: "What is the cost for a Virtual Consultation? ",
      answer: "Preventative measures include regular hand washing, wearing masks, maintaining social distancing, getting vaccinated, and following public health guidelines."
    },
    {
      question: "Are Virtual Consultations available on mobile? ",
      answer: "Preventative measures include regular hand washing, wearing masks, maintaining social distancing, getting vaccinated, and following public health guidelines."
    },
    {
      question: "How many Virtual Consultations are included with a subscription plan? ",
      answer: "Preventative measures include regular hand washing, wearing masks, maintaining social distancing, getting vaccinated, and following public health guidelines."
    },
  ];
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <>
      <Navbar />
      <div className="w-full flex mt-[-50px] md:flex-row flex-col">
        <div className='md:w-1/2 w-full'>
          <Image 
            src="/myImages/providerNow-doctor-high-res.png" 
            className='w-full h-[480px] object-cover' 
            height={480}
            width={800} 
            alt='Doctor' 
            priority 
          />
        </div>

        <div className="md:w-1/2 w-full bg-[#988c9e] md:pt-12 pt-0">
          <div className="relative w-full h-auto md:h-[430px] group">
            {!isVideoPlaying ? (
              <>
                <img
                  src="myImages/video-img.png"
                  alt="Placeholder"
                  className="w-full h-full object-cover"
                />
                <img
                  onClick={handleImageClick}
                  src="myImages/img 3.png"
                  alt="Play Button"
                  className="absolute top-1/2 left-1/2 cursor-pointer hover:scale-110 transition-all transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 z-10"
                />
              </>
            ) : (
              <>
                <video
                  className="w-full h-auto md:h-[430px] object-cover"
                  src={videoSources[selectedLanguage]}
                  controls
                  autoPlay
                >
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                  <button
                    className="py-2 px-4 rounded bg-[#751A9B] text-white cursor-pointer transition-colors duration-200 hover:bg-purple-700 pointer-events-auto"
                    onClick={() => {
                      handleLanguageChange(selectedLanguage === "english" ? "spanish" : "english");
                      setIsVideoPlaying(true);
                    }}
                  >
                    {selectedLanguage === "english" ? "Switch to Spanish Version" : "Switch to English Version"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <ColorBar type={1} />

      <div className="p-4 py-[80px] max-w-[1000px] mx-auto">
        <span className="block text-md my-4 text-base">
        {"ProviderNow is a platform connecting patients to licensed medical professionals including on-demand telehealth and easy letter of necessity requests. We also offer access to a curated healthcare hub where you can discover products and services tailored to your needs. (add the 3 points below as bullets under the this)"}
        </span>
        <div className='block text-md my-4 text-base'>
          <ul>
            <li>No insurance required</li>
            <li>Low cost options—pay as needed or select annual subscriptions</li>
            <li>We never share your data with third parties</li>
          </ul>
        </div>
        <span className="block text-md my-4 text-base">
        Create space for a quote to the right of the light education above
        </span>
        <div>
          <ul>
            <li>
            {`"Providernow is my one stop shop for routine care, finding cool healthcare products, and learning more about my overall health" - Karen`}
            </li>
          </ul>
        </div>
      </div>

      {/* New Content Section */}
      {/* <div className="p-4 py-[80px]"> */}
        {/* <span className="block text-3xl md:text-4xl lg:text-[40px] font-semibold mb-8 text-center">Turbo charge your HSA / FSA</span> */}
        {/* <div className="flex flex-wrap justify-center gap-20">
          <div className="flex flex-col items-center">
            <div>
              <Image src="/myImages/c1.jpg.png" className="h-[306px] w-[306px]" width={306} height={306} alt="Request letters of medical necessity" />
            </div>
            <Link href='/LMN' >
              <p className="text-lg cursor-pointer md:text-xl lg:text-2xl font-medium underline mt-4 text-center text-4B0082">Request letters of medical <br />necessity</p>
            </Link>
          </div>
          <div className="circle flex flex-col items-center">
            <div>
              <Image src="/myImages/c2.jpg.png" className="h-[306px] w-[306px]" width={1000} height={600} alt="Schedule immediate virtual consultations" />
            </div>
            <Link href='/auth/login' >
              <p className="text-lg cursor-pointer	 md:text-xl lg:text-2xl font-medium underline mt-4 text-center text-4B0082">Schedule immediate virtual <br />consultations</p>
            </Link>
          </div>
          <div className="circle flex flex-col items-center">
            <div>
              <Image src="/myImages/c3.jpg.png" className="h-[306px] w-[306px]" width={1000} height={600} alt="Purchase from our network of healthcare retailers" />
            </div>
            <Link href='/auth/login' >
              <p className="text-lg cursor-pointer	 md:text-xl lg:text-2xl font-medium underline mt-4 text-center text-4B0082">Purchase from our network <br />of healthcare retailers</p>
            </Link>
          </div>
        </div>
      </div> */}


      {/* Additional Content Section */}
      <div className="text-white flex flex-col lg:flex-row media-apply">
        <div className="content-side lg:w-1/2 py-12 lg:py-[71px] px-6 md:px-10 lg:pl-[80px] lg:pr-[70px] h-auto lg:h-[630px]">
          <div className="text-left mb-4">
            <span className="text-2xl md:text-3xl lg:text-[40px] font-semibold">Letter of Medical Necessity</span>
          </div>
          <p className="text-justify my-3 text-sm md:text-base font-normal">
            {" Did you know that you can use your HSA/FSA funds for preventive care with a Letter of Medical Necessity? Preventive care is one of the most effective ways to keep small health issues from becoming big ones. Our streamlined process for requesting Letters of Medical Necessity puts you back in charge of your healthcare journey and lets you use your HSA/FSA pre-tax dollars for things like nutritional supplements, exercise equipment, gym memberships, and even healthier food options that may have seemed out of reach before. Quick and easy steps below! "}
          </p>
          <ul className="text-justify space-y-[24px] p-0">
            <li className="text-base md:text-xl font-medium flex items-center">
              <Image src="/myImages/log-in.png" width={23} height={23} alt="Login/Signup" />
              <span className="ml-3">Login/Signup</span>
            </li>
            <li className="text-base md:text-xl font-medium flex items-center">
              <Image src="/myImages/ppc.png" width={23} height={23} alt="Complete Survey" />
              <span className="ml-3">Complete Quick Form</span>
            </li>
            <li className="text-base md:text-xl font-medium flex items-center">
              <Image src="/myImages/group-user.png" width={23} height={23} alt="Submit Payment" />
              <span className="ml-3">Submit Payment</span>
            </li>
            <li className="text-base md:text-xl font-medium flex items-center">
              <Image src="/myImages/calendar.png" width={23} height={23} alt="Verification" />
              <span className="ml-3">Licensed Medical Professional Review
              </span>
            </li>
          </ul>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Button
              className="text-[#751A9B] bg-white h-[48px] w-[161px] font-semibold text-base py-2 px-4 rounded-md hover:bg-purple-700 hover:text-white"
              onClick={handleSignUpClick}
            >
              Sign Up Now
            </Button>
            <Link href="/LMN">
              <Button
                className="bg-transparent text-white border-2 border-white h-[48px] w-[161px] font-semibold text-base py-2 px-4 rounded-md hover:bg-white hover:text-[#751A9B]"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="image-side lg:w-1/2">
          <div className="h-auto lg:h-[630px] min-h-[300px]">
            <Image
              src="/myImages/Laptop 1.png"
              className="rounded-none h-full w-full object-cover"
              alt="Next Steps"
              height={600}
              width={1000}
            />
          </div>
        </div>
      </div>


      {/* Addittional Content Section 2 */}
      <div className="flex flex-col lg:flex-row bg-white py-20 lg:py-[80px] px-6 md:px-10 lg:px-[110px]">
        <div className="lg:w-1/2 w-full h-auto lg:pr-[50px]">
          <Image
            src="/myImages/section-img.png"
            className="mx-auto rounded-[22px] h-[300px] md:h-[400px] lg:h-[467px] w-full object-cover"
            alt="section-img"
            height={500}
            width={600}
          />
        </div>
        <div className="lg:w-1/2 w-full h-auto mt-8 lg:mt-0">
          <div className="text-left mb-4">
            <span className="text-2xl md:text-3xl lg:text-[40px] font-semibold">Virtual Consultations</span>
          </div>
          <p className="text-justify my-3 text-sm md:text-base font-normal">
            {"Need to skip the line for a doctor's appointment or help family or a friend access care? ProviderNow allows patients to request on-demand virtual consultations with a licensed healthcare professional immediately, without scheduling an appointment. We understand today’s patients need flexibility to accommodate an on-the-go lifestyle. Affordable access is also essential, so we offer low rates whether you pay by the visit or select an Individual or Friends and Family subscription plan. Uninsured or underinsured? We’ve got you covered."}
          </p>
          <ul className="text-justify space-y-[24px] p-0">
            <li className="text-base md:text-xl font-medium flex items-center">
              <Image src="/myImages/log-in.png" width={23} height={23} alt="Login/Signup" />
              <span className="ml-3">Login/Signup</span>
            </li>
            <li className="text-base md:text-xl font-medium flex items-center">
              <Image src="/myImages/ppc.png" width={23} height={23} alt="Complete Survey" />
              <span className="ml-3">Choose Payment Option</span>
            </li>
            <li className="text-base md:text-xl font-medium flex items-center">
              <Image src="/myImages/group-user.png" width={23} height={23} alt="Submit Payment" />
              <span className="ml-3">Tell Us Your Reason For The Visit
              </span>
            </li>
            <li className="text-base md:text-xl font-medium flex items-center">
              <Image src="/myImages/calendar.png" width={23} height={23} alt="Verification" />
              <span className="ml-3">Request a ProviderNow</span>
            </li>
          </ul>
          <div className="flex flex-col md:flex-row gap-4 mt-[36px]">
            <Link href="/auth/login">
              <Button className="bg-[#751A9B] text-white h-12 font-semibold hover:bg-purple-700 text-base w-44 py-2 px-4 rounded-md">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/RP">
              <Button
                className="bg-transparent text-[#751A9B] border-2 hover:bg-[#751A9B] hover:text-white border-[#751A9B] h-12 font-semibold text-base w-44 py-2 px-4 rounded-md"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="text-white flex flex-col lg:flex-row media-apply">
        <div className="content-side lg:w-1/2 py-12 lg:py-[71px] px-6 md:px-10 lg:pl-[80px] lg:pr-[70px] h-auto lg:h-[630px]">
          <div className="text-left mb-4">
            <span className="text-2xl md:text-3xl lg:text-[40px] font-semibold">Healthcare Retailers</span>
          </div>
          <p className="text-justify my-3 text-sm md:text-base font-normal">
          ProviderNow gives consumers the power to shop for healthcare products and services the same way they shop for any other product online. Our curated list of healthcare retail partners is extensive, and growing every day. Get the products and services you need today!
          </p>
          <ul className="text-justify space-y-[24px] p-0">
            <li className="text-base md:text-xl font-medium flex items-center">
              <Image src="/myImages/log-in.png" width={23} height={23} alt="Login/Signup" />
              <span className="ml-3">Login/Signup</span>
            </li>
            <li className="text-base md:text-xl font-medium flex items-center">
              <Image src="/myImages/checkout.png" width={23} height={23} alt="Complete Survey" />
              <span className="ml-3">Shop</span>
            </li>
          </ul>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
           <Button
              className="text-[#751A9B] bg-white h-[48px] w-[161px] font-semibold text-base py-2 px-4 rounded-md hover:bg-purple-700 hover:text-white"
              onClick={handleSignUpClick}
            >
              Sign Up Now
            </Button>
            <Button
              className="bg-transparent text-white border-2 border-white h-[48px] w-[161px] font-semibold text-base py-2 px-4 rounded-md hover:bg-white hover:text-[#751A9B]"
              onClick={() => router.push("provider-retail-shop")}
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="image-side lg:w-1/2">
          <div className="h-auto lg:h-[630px] min-h-[300px]">
            <Image
              src="/myImages/Laptop 1.png"
              className="rounded-none h-full w-full object-cover"
              alt="Next Steps"
              height={600}
              width={1000}
            />
          </div>
        </div>
      </div>

      {/* Medical retailer */}
      {/* <div className="bg-gradient text-white">
        <div className="container mx-auto py-[70px] sm:pt-20 sm:pb-20 px-4 max-w-[1020px]">
          <span className="text-3xl md:text-4xl max-w-3xl mx-auto font-semibold text-left mb-6 md:mb-8 block">Shop</span>
          <p className="mb-8 mx-auto max-w-3xl text-base font-normal">
            ProviderNow gives consumers the power to shop for healthcare products and services the same way they shop for any other product online. Our curated list of healthcare retail partners is extensive, and growing every day. Get the products and services you need today!
          </p>
       
          <div className="flex md:flex-row flex-col gap-6 justify-center">
            <div></div>
            <div className="bg-white rounded-xl h-[161px] w-[250px] shadow-md text-center flex flex-col justify-center">
              <div className="mb-3 flex justify-center">
              <Image src="/myImages/log-in.png" alt="..." width={40} height={40} />
              </div>
              <h2 className="text-lg md:text-xl font-medium text-black">Login/Signup</h2>
            </div>
           
            <div className="bg-white rounded-xl h-[161px] w-[250px] shadow-md text-center flex flex-col justify-center">
              <div className="mb-3 flex justify-center">
                <Image src="/myImages/checkout.png" alt="..." width={40} height={40} />
              </div>
              <h2 className="text-lg md:text-xl font-medium text-black">Shop</h2>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 mt-8 sm:mt-12 md:items-center md:flex-row md:justify-center">
            <Button
              className="text-[#751A9B] bg-white h-[48px] w-[161px] font-semibold text-base py-2 px-4 rounded-md hover:bg-purple-700 hover:text-white"
              onClick={handleSignUpClick}
            >
              Sign Up Now
            </Button>
            <Button
              className="bg-transparent text-white border-2 border-white h-[48px] w-[161px] font-semibold text-base py-2 px-4 rounded-md hover:bg-white hover:text-[#751A9B]"
              onClick={() => router.push("provider-retail-shop")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div> */}
      {/* FAQ Section */}
      <div className="bg-white py-[80px] mx-3">
        <div className="container mx-auto max-w-[1020px]">
          <h3 className="text-[40px] font-bold mb-[48px] text-center">Frequently Asked Questions</h3>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="flex justify-center my-4">
                <div
                  className="faq-card shadow-lg p-8 text-left cursor-pointer font-bold w-full"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <span>{faq.question}</span>
                    <span className="ml-4">
                      {openFAQ === index ? <FaMinus /> : <FaPlus />}
                    </span>
                  </div>
                  {openFAQ === index && (
                    <div className="mt-2 text-left md:text-justify text-base font-normal w-[80%]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
