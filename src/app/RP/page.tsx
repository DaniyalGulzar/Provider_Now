"use client";
import Footer from "@/components/Footer";
import Image from "next/image";
import Button from "@/components/Button";
import NavbarOther from "@/components/NavbarOther/page";
import Banner from "@/components/Banner/page";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function RP() {
  const router = useRouter();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<
    "english" | "spanish"
  >("english");

  const videoSources = {
    english: process.env.NEXT_PUBLIC_VC_VIDEO_URL,
    spanish: process.env.NEXT_PUBLIC_VC_VIDEO_URL_SPANISH,
  };

  const handleLanguageChange = (language: any) => {
    setSelectedLanguage(selectedLanguage === "english" ? "spanish" : "english");
    setIsVideoPlaying(false);
  };

  const handleImageClick = () => {
    setIsVideoPlaying(true);
  };

  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    // {
    //     question: "Can I still obtain/use LMNs if I don’t have an FSA/HSA?",
    //     answer: "Strategies include regular exercise, healthy eating, adequate sleep, relaxation techniques like deep breathing or meditation, seeking social support, and limiting exposure to stressors."
    // },
    // {
    //     question: "What is an FSA/HSA?",
    //     answer: "Maintaining a healthy weight involves a balanced diet, regular physical activity, monitoring calorie intake, and seeking advice from healthcare professionals if needed."
    // },
    // {
    //     question: "What is the cost for an LMN?",
    //     answer: "The recommended schedule for childhood vaccinations varies by country and health organization. Consult your healthcare provider or local health department for the most accurate information."
    // },
    // {
    //     question: "Are all sales final?",
    //     answer: "Risk factors for heart disease include high blood pressure, high cholesterol, smoking, obesity, physical inactivity, and a family history of heart disease."
    // },
    // {
    //     question: "Will all providers/insurers accept an LMN from ProviderNow?",
    //     answer: "Preventative measures include regular hand washing, wearing masks, maintaining social distancing, getting vaccinated, and following public health guidelines."
    // },
    // {
    //     question: "What if my claim is denied after obtaining an LMN? ",
    //     answer: "Preventative measures include regular hand washing, wearing masks, maintaining social distancing, getting vaccinated, and following public health guidelines."
    // },
    {
      question: "What is the cost for a Virtual Consultation? ",
      answer:
        "Preventative measures include regular hand washing, wearing masks, maintaining social distancing, getting vaccinated, and following public health guidelines.",
    },
    {
      question: "Are Virtual Consultations available on mobile? ",
      answer:
        "Preventative measures include regular hand washing, wearing masks, maintaining social distancing, getting vaccinated, and following public health guidelines.",
    },
    {
      question:
        "How many Virtual Consultations are included with a subscription plan? ",
      answer:
        "Preventative measures include regular hand washing, wearing masks, maintaining social distancing, getting vaccinated, and following public health guidelines.",
    },
  ];

  const handleRoute = () => {
    router.push("/auth/login");
  };
  return (
    <div>
      <NavbarOther />
      <Banner title="Request a ProviderNow" />

      <div className="my-8 md:mt-16 lg:mt-[60px] mb-7 text-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 mb-10 gap-4 max-w-[90%] mx-auto px-4">
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
              Virtual Consultation
            </span>
            <div className="my-4">
              <span className="text-2xl md:text-3xl text-gray-500 font-bold">
                HSA/FSA eligible
              </span>
            </div>
            <div>
              <p className="text-sm md:text-base font-normal">
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

      <div className="max-w-[90%] mx-auto px-4">
        <div className="p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white text-center shadow-[0_4px_15px_rgba(0,0,0,0.1)] p-6 rounded-lg transition-all duration-300 ease-in-out hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
              <span className="text-2xl font-bold text-[#751A9B] hover:text-[#5a1378] transition-colors duration-300">
                Annual Friends & Family
              </span>

              {/* Price */}
              <div className="text-sm text-[#751A9B] mt-6 flex flex-col justify-center items-center">
                <div className="flex items-baseline my-2">
                  <span className="text-[24px] font-semibold">$</span>
                  <span className="text-[64px] font-extrabold leading-none">
                    0
                  </span>
                  <span className="text-lg ml-1">/month</span>
                </div>
                <p className="text-gray-500 mt-1">Billed Annually</p>
                <span className="text-gray-500 mt-1">HSA/FSA eligible</span>
              </div>

              {/* Divider */}
              <hr className="border-t border-gray-300 my-6" />

              {/* Features */}
              <div className="text-[#751A9B] mt-4">
                <p className="text-lg font-semibold">What’s included:</p>
                <ul className="list-disc list-outside pl-5 text-left mt-4 space-y-2">
                  <li className="text-sm">Unlimited access to on-demand virtual consults for up to 5 individuals
                  </li>
                  <li className="text-sm">
                  24/7 availability
                  </li>
                  <li className="text-sm">Real time customer support</li>
                </ul>
              </div>
            </div>
            <div className="bg-white text-center shadow-[0_4px_15px_rgba(0,0,0,0.1)] p-6 rounded-lg transition-all duration-300 ease-in-out hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
              <span className="text-2xl font-bold text-[#751A9B] hover:text-[#5a1378] transition-colors duration-300">
                Annual Individual
              </span>

              {/* Price */}
              <div className="text-sm text-[#751A9B] mt-6 flex flex-col justify-center items-center">
                <div className="flex items-baseline my-2">
                  <span className="text-[24px] font-semibold">$</span>
                  <span className="text-[64px] font-extrabold leading-none">
                    0
                  </span>
                  <span className="text-lg ml-1">/year</span>
                </div>
                <p className="text-gray-500 mt-1">Billed Annually</p>
                <span className="text-gray-500 mt-1">HSA/FSA eligible</span>
              </div>

              {/* Divider */}
              <hr className="border-t border-gray-300 my-6" />

              {/* Features */}
              <div className="text-[#751A9B] mt-4">
                <p className="text-lg font-semibold">What’s included:</p>
                <ul className="list-disc list-outside pl-5 text-left mt-4 space-y-2">
                  <li className="text-sm">Unlimited access to on-demand virtual consults
                  </li>
                  <li className="text-sm">
                  24/7 availability
                  </li>
                  <li className="text-sm">Real time customer support
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white text-center shadow-[0_4px_15px_rgba(0,0,0,0.1)] p-6 rounded-lg transition-all duration-300 ease-in-out hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
              <span className="text-2xl font-bold text-[#751A9B] hover:text-[#5a1378] transition-colors duration-300">
                Pay Per Visit
              </span>

              {/* Price */}
              <div className="text-sm text-[#751A9B] mt-6 flex flex-col justify-center items-center">
                <div className="flex items-baseline my-2">
                  <span className="text-[24px] font-semibold">$</span>
                  <span className="text-[64px] font-extrabold leading-none">
                    0
                  </span>
                  <span className="text-lg ml-1">/per visit</span>
                </div>
                <p className="text-gray-500 mt-1">Billed Per Visit</p>
                <span className="text-gray-500 mt-1">HSA/FSA eligible</span>
              </div>

              {/* Divider */}
              <hr className="border-t border-gray-300 my-6" />

              {/* Features */}
              <div className="text-[#751A9B] mt-4">
                <p className="text-lg font-semibold">What’s included:</p>
                <ul className="list-disc list-outside pl-5 text-left mt-4 space-y-2">
                  <li className="text-sm">
                  24/7 availability
                  </li>
                  <li className="text-sm">Real time customer support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <Button
          onClick={handleRoute}
          className="h-12 w-[140px] md:w-[161px] bg-751A9B hover:bg-purple-700 text-white text-sm md:text-base font-semibold rounded-lg"
        >
          Get Started Now
        </Button>
      </div>
      {/* <div className="text-white py-6 px-4 bg-gradient flex flex-col items-center">
                <div className="max-w-[1220px] mx-auto py-6 md:py-12 lg:py-[80px] px-4">
                    <span className="text-2xl md:text-3xl lg:text-[40px] font-semibold text-center block">
                        {"Here's how it works"}
                    </span>
                    <div className="flex flex-col md:flex-row md:items-start items-center w-full pt-6 md:pt-8">
                        <div className="section-content flex-1 md:pr-[30px] lg:pr-[50px]">
                            <span className="text-lg md:text-xl font-bold text-[#ff99d6] block">Step 1</span>
                            <div className="my-4">
                                <span className="text-xl md:text-2xl lg:text-[30px] font-semibold block">
                                    Login or signup
                                </span>
                            </div>
                            <p className="text-sm md:text-base lg:text-lg">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam rem itaque, nobis nisi doloremque facere est a, id possimus hic quas ipsam asperiores perferendis dolore pariatur aliquid dicta sapiente nesciunt maxime? Veritatis molestiae quo vitae perspiciatis non debitis quam, vel modi, quos ea eligendi adipisci illum ex sapiente delectus, illo quae natus minima nobis optio eum itaque placeat quis fuga?
                                <br /><br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda doloribus expedita repellendus. Ut quis voluptatum ipsa maxime porro facere labore iste consequatur deleniti. Consectetur, iusto esse. Deserunt consectetur facilis deleniti?
                            </p>
                        </div>
                        <div className="section-image flex-1 mt-6 md:mt-0">
                            <Image
                                src="/myImages/authentication.png"
                                alt="Medical Necessity"
                                className="rounded-2xl w-full max-w-[500px] object-cover h-auto"
                                height={467}
                                width={600}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="max-w-[1220px] mx-auto py-8 md:py-16 lg:py-[80px] px-4">
                    <div className="flex flex-col md:flex-row md:items-start items-center w-full">
                        <div className="section-image flex-1 md:pr-[30px] lg:pr-[50px]">
                            <Image src="/myImages/laptop.jpg" alt="Medical Necessity" className="rounded-2xl w-[600px] object-cover h-[467px]" height={467} width={600} />
                        </div>
                        <div className="section-content flex-1 mt-8 md:mt-0">
                            <span className="text-xl md:text-2xl font-bold text-[#ff99d6] block">Step 2</span>
                            <div className="my-4">
                                <span className="text-2xl md:text-3xl lg:text-[40px] font-semibold block">Quick intake</span>
                            </div>
                            <p className="text-base md:text-lg lg:text-base">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam rem itaque, nobis nisi doloremque facere est a, id possimus hic quas ipsam asperiores perferendis dolore pariatur aliquid dicta sapiente nesciunt maxime? Veritatis molestiae quo vitae perspiciatis non debitis quam, vel modi, quos ea eligendi adipisci illum ex sapiente delectus, illo quae natus minima nobis optio eum itaque placeat quis fuga?
                                <br /><br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda doloribus expedita repellendus. Ut quis voluptatum ipsa maxime porro facere labore iste consequatur deleniti. Consectetur, iusto esse. Deserunt consectetur facilis deleniti?
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-white py-10 px-5 bg-gradient flex flex-col items-center">
                <div className="max-w-[1220px] mx-auto py-8 md:py-16 lg:py-[80px] px-4">
                    <div className="flex flex-col md:flex-row md:items-start items-center w-full">
                        <div className="section-content flex-1 md:pr-[30px] lg:pr-[50px]">
                            <span className="text-xl md:text-2xl font-bold text-[#ff99d6] block">Step 3</span>
                            <div className="my-4">
                                <span className="text-2xl md:text-3xl lg:text-[40px] font-semibold block">Choose subscription</span>
                            </div>
                            <p className="text-base md:text-lg lg:text-base">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam rem itaque, nobis nisi doloremque facere est a, id possimus hic quas ipsam asperiores perferendis dolore pariatur aliquid dicta sapiente nesciunt maxime? Veritatis molestiae quo vitae perspiciatis non debitis quam, vel modi, quos ea eligendi adipisci illum ex sapiente delectus, illo quae natus minima nobis optio eum itaque placeat quis fuga?
                                <br /><br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda doloribus expedita repellendus. Ut quis voluptatum ipsa maxime porro facere labore iste consequatur deleniti. Consectetur, iusto esse. Deserunt consectetur facilis deleniti?
                            </p>
                        </div>
                        <div className="section-image flex-1 mt-8 md:mt-0">
                            <Image src="/myImages/choose.png" alt="Medical Necessity" className="rounded-2xl w-[600px] object-cover h-[467px]" height={467} width={600} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="max-w-[1220px] mx-auto py-8 md:py-16 lg:py-[80px] px-4">
                    <div className="flex flex-col md:flex-row md:items-start items-center w-full">
                        <div className="section-image flex-1 md:pr-[30px] lg:pr-[50px]">
                            <Image src="/myImages/doctor-choosing-electronic-card.png" alt="Medical Necessity" className="rounded-2xl object-cover w-[600px] h-[467px]" height={467} width={600} />
                        </div>
                        <div className="section-content flex-1 mt-8 md:mt-0">
                            <span className="text-xl md:text-2xl font-bold text-[#ff99d6] block">Step 4</span>
                            <div className="my-4">
                                <span className="text-2xl md:text-3xl lg:text-[40px] font-semibold block">Select the provider</span>
                            </div>
                            <p className="text-base md:text-lg lg:text-base">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam rem itaque, nobis nisi doloremque facere est a, id possimus hic quas ipsam asperiores perferendis dolore pariatur aliquid dicta sapiente nesciunt maxime? Veritatis molestiae quo vitae perspiciatis non debitis quam, vel modi, quos ea eligendi adipisci illum ex sapiente delectus, illo quae natus minima nobis optio eum itaque placeat quis fuga?
                                <br /><br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda doloribus expedita repellendus. Ut quis voluptatum ipsa maxime porro facere labore iste consequatur deleniti. Consectetur, iusto esse. Deserunt consectetur facilis deleniti?
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient py-8 md:py-[70px]">
                <div className="section-content flex flex-col justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                    <span className="text-white text-2xl mb-10 sm:text-3xl md:text-4xl lg:text-[31px] xl:text-[40px] font-bold text-center">
                        Request a ProviderNow
                    </span>
                    <div className="flex justify-center w-full md:w-auto">
                        <Button className="text-[#751A9B] bg-white hover:bg-purple-700 hover:text-white h-12 font-semibold text-base md:text-lg w-44 py-2 px-4 rounded-md" onClick={handleRoute}>
                            Get Started Now
                        </Button>
                    </div>
                </div>
            </div> */}

      <div className="bg-white pt-7 pb-[80px] mx-3">
        <div className="container mx-auto max-w-[1020px]">
          <h3 className="text-[40px] font-bold mb-[48px] text-center">
            Frequently Asked Questions
          </h3>
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
    </div>
  );
}
