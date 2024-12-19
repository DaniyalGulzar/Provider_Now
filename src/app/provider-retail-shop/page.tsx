"use client";
import React, { useState } from "react";
import RetailNavbar from "./retailNavbar";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaMinus, FaPlus } from "react-icons/fa";
import NavbarOther from "@/components/NavbarOther/page";
import Banner from "@/components/Banner/page";

function RetailHome() {
const router = useRouter();
const [isVideoPlaying, setIsVideoPlaying] = useState(false);
const [selectedLanguage, setSelectedLanguage] = useState<
  "english" | "spanish"
>("english");

const videoSources = {
  english: process.env.NEXT_PUBLIC_SHOP_VIDEO_URL,
  spanish: process.env.NEXT_PUBLIC_SHOP_VIDEO_URL_SPANISH,
};

const handleLanguageChange = (language: any) => {
  setSelectedLanguage(selectedLanguage === "english" ? "spanish" : "english");
  setIsVideoPlaying(false);
};

const handleImageClick = () => {
  setIsVideoPlaying(true);
};
  
  const handleSignUpClick = () => {
    router.push('/auth/login');
  };

  const handleComingSoon = () => {
    router.push('/coming-soon');
  };
  
  const products = [
    {
      id: 1,
      imageSrc: "/myImages/provider-shop-img.svg",
      capsules: "30 CAPSULES",
      rating: 4.5,
      name: "Immune Pulse Chewable Digestive Tablets",
      price: "$150.00",
    },
    {
      id: 2,
      imageSrc: "/myImages/provider-shop-img.svg",
      capsules: "30 CAPSULES",
      rating: 4.5,
      name: "Immune Pulse Chewable Digestive Tablets",
      price: "$150.00",
    },
  ];

  const BestDeals = [
    {
      id: 1,
      imageSrc: "/myImages/provider-shop-img.svg",
      capsules: "30 CAPSULES",
      rating: 4.5,
      name: "Immune Pulse Chewable Digestive Tablets",
      price: "$150.00",
    },
    {
      id: 2,
      imageSrc: "/myImages/provider-shop-img.svg",
      capsules: "30 CAPSULES",
      rating: 4.5,
      name: "Immune Pulse Chewable Digestive Tablets",
      price: "$150.00",
    },
    {
      id: 3,
      imageSrc: "/myImages/provider-shop-img.svg",
      capsules: "30 CAPSULES",
      rating: 4.5,
      name: "Immune Pulse Chewable Digestive Tablets",
      price: "$150.00",
    },
  ];
  
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

  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const testimonials = [
    {
      id: 1,
      imageSrc: "/myImages/multi-stars.svg",
      review: "Using Healup products has been life-changing. From boosting my immunity to clearing up my skin, their products deliver real results. Highly recommend!",
      name: "Amanda Reed",
      role: "MANAGER",
    },
    {
      id: 2,
      imageSrc: "/myImages/multi-stars.svg",
      review: "Using Healup products has been life-changing. From boosting my immunity to clearing up my skin, their products deliver real results. Highly recommend!",
      name: "Amanda Reed",
      role: "MANAGER",
    },
    {
      id: 3,
      imageSrc: "/myImages/multi-stars.svg",
      review: "Using Healup products has been life-changing. From boosting my immunity to clearing up my skin, their products deliver real results. Highly recommend!",
      name: "Amanda Reed",
      role: "MANAGER",
    },
    {
      id: 4,
      imageSrc: "/myImages/multi-stars.svg",
      review: "Using Healup products has been life-changing. From boosting my immunity to clearing up my skin, their products deliver real results. Highly recommend!",
      name: "Amanda Reed",
      role: "MANAGER",
    },
  ];
  

  return (
    <div>
      {/* <RetailNavbar />
      <div className="retail-background h-[720px] w-full flex items-end">
        <div className="max-w-[890px] mb-[80px] pr-4 pl-10 md:pl-20">
          <span className="text-[48px] font-semibold text-white">
            Discover Premium Solutions For A Healthier, Happier You
          </span>
          <Button className="w-[148px] h-[48px] mt-[40px] flex justify-center items-center bg-white hover:text-blue-500 text-[#721A97] text-base font-semibold rounded-lg ">Shop Now</Button>
        </div>
      </div> */}
      <NavbarOther />
      <Banner title="Shop" />
      <div className="max-w-[90%] mx-auto">
        <div className="my-8 md:mt-16 lg:mt-[60px] mb-7 text-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 mb-10 gap-4">
            <div className="md:w-full w-full order-1 md:order-1 lg:order-2">
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

            <div className="text-left order-2 md:order-2 lg:order-1">
              <span className="text-3xl md:text-4xl lg:text-[40px] font-bold">
                Shop a ProviderNow
              </span>
              <div>
                <p className="text-sm md:text-base my-4 font-normal">
                  Need to speak with a healthcare professional ASAP? ProviderNow
                  makes Virtual Consultations with health care professionals
                  available with just a few clicks. Talk to someone who can help
                  within minutes with our on-demand Virtual Consultation platform
                  instead of driving to your local Urgent Care and waiting for
                  someone to see you.
                </p>
                <p className="text-sm md:text-base my-4 font-normal">
                  Flexible pricing plans allow you to pay by the visit, or get an
                  even better rate by signing up for an Individual or Friends and
                  Family subscription. Don’t let antiquated systems stand between
                  you and timely care. Regardless of which you choose, you will
                  get the care you need quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-[80px] mb-[40px]">
          <span className="text-[40px] font-semibold text-[#000000]">Best Seller</span>
          <span className="text-[#751A9B] text-base font-semibold underline">View All</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-[80px]">
          {products.map((product) => (
            <div key={product.id}>
              <div className="bg-[#FAFAFA] rounded-[16px] h-[305px] w-full flex justify-center items-center">
                <Image src={product.imageSrc} alt={product.name} height={237} width={130} />
              </div>
              <div className="flex justify-between items-center my-3">
                <span className="text-[#00000066]">{product.capsules}</span>
                <span className="flex items-center text-sm text-[#00000066] font-normal">
                  <Image src="/myImages/round-star.svg" alt="rating" height={16} width={16} />
                  &nbsp; {`(${product.rating})`}
                </span>
              </div>
              <span className="text-lg text-[#000000] font-medium">{product.name}</span>
              <div className="flex justify-between items-center">
                <Button onClick={()=>router.push('/provider-retail-shop/add-to-cart')} className="border border-[#000000] text-[#000000] mt-3 hover:bg-[#000000] hover:text-white rounded-[24px] w-[118px] h-[36px]">
                  Add To Cart
                </Button>
                <span className="text-sm text-[#721A97] font-medium">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-[80px]">
          <span className="text-[40px] font-semibold text-[#000000]">Today Best Deals For You</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-[80px]">
            {BestDeals.map((product) => (
              <div key={product.id}>
                <div className="bg-[#FAFAFA] rounded-[16px] h-[305px] mt-[40px] w-full flex justify-center items-center">
                  <Image src={product.imageSrc} alt={product.name} height={237} width={130} />
                </div>
                <div className="flex justify-between items-center my-3">
                  <span className="text-[#00000066]">{product.capsules}</span>
                  <span className="flex items-center text-sm text-[#00000066] font-normal">
                    <Image src="/myImages/round-star.svg" alt="rating" height={16} width={16} />
                    &nbsp; {`(${product.rating})`}
                  </span>
                </div>
                <span className="text-lg text-[#000000] font-medium">{product.name}</span>
                <div className="flex justify-between items-center">
                  <Button onClick={()=>router.push('/provider-retail-shop/add-to-cart')} className="border border-[#000000] text-[#000000] mt-3 hover:bg-[#000000] hover:text-white rounded-[24px] w-[118px] h-[36px]">
                    Add To Cart
                  </Button>
                  <span className="text-sm text-[#721A97] font-medium">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gradient text-white">
          <div className="container mx-auto py-[70px] sm:pt-20 sm:pb-20 px-4 max-w-[1020px]">
            <span className="text-3xl md:text-4xl font-semibold text-center mb-6 md:mb-8 block">Medical Retailers</span>
            <p className="text-center mb-8 mx-auto max-w-3xl text-base font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum condimentum pulvinar. Ut a porta sem. Aliquam nec eleifend magna, non semper metus. In nunc purus, scelerisque a magna vitae, semper ultrices turpis. Integer vel massa ipsum. Curabitur a turpis et ligula placerat dictum sed vitae leo. Phasellus a porttitor augue.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl h-[161px] shadow-md text-center flex flex-col justify-center">
                <div className="mb-3 flex justify-center">
                  <Image src="/myImages/product-2.png" alt="..." width={40} height={40} />
                </div>
                <h2 className="text-lg md:text-xl font-medium text-black">Select Product</h2>
              </div>
              <div className="bg-white rounded-xl h-[161px] shadow-md text-center flex flex-col justify-center">
                <div className="mb-3 flex justify-center">
                  <Image src="/myImages/product-1.png" alt="..." width={40} height={40} />
                </div>
                <h2 className="text-lg md:text-xl font-medium text-black">Select Quantity</h2>
              </div>
              <div className="bg-white rounded-xl h-[161px] shadow-md text-center flex flex-col justify-center">
                <div className="mb-3 flex justify-center">
                  <Image src="/myImages/shopping-bag.png" alt="..." width={40} height={40} />
                </div>
                <h2 className="text-lg md:text-xl font-medium text-black">Add Cart</h2>
              </div>
              <div className="bg-white rounded-xl h-[161px] shadow-md text-center flex flex-col justify-center">
                <div className="mb-3 flex justify-center">
                  <Image src="/myImages/checkout.png" alt="..." width={40} height={40} />
                </div>
                <h2 className="text-lg md:text-xl font-medium text-black">Place Order</h2>
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
                onClick={handleComingSoon}
              >
                Learn More
              </Button>
            </div>
          </div>
      </div>
      
      <div>
        <div className="text-[#000000] text-[40px] font-semibold text-center mt-[80px] mb-[40px]">
          What Our Customers Say!
        </div>
        <div className="flex gap-5 overflow-x-auto pl-10 md:pl-20 scrollbar-hide">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white w-[413px] shadow-md rounded-[22px] p-6 min-w-[300px] flex-shrink-0 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <Image src={testimonial.imageSrc} alt="Rating stars" height={22} width={126} />
              <div className="text-[#000000] text-base font-normal my-4">
                {testimonial.review}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[#721A97] text-sm font-medium">{testimonial.name}</span>
                <span className="text-[#000000] text-sm font-normal">{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>      
      {/* <div className="bg-white py-[80px] mx-3">
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
      </div> */}
      <Footer />
    </div>
  );
}

export default RetailHome;
