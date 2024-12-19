"use client"
import Footer from "@/components/Footer";
import Image from "next/image";
import Button from "@/components/Button";
import NavbarOther from "@/components/NavbarOther/page";
import Banner from "@/components/Banner/page";
import Link from "next/link";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";

export default function LMN() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "spanish">("english");

  const videoSources = {
    english: process.env.NEXT_PUBLIC_LMN_VIDEO_URL,
    spanish: process.env.NEXT_PUBLIC_LMN_VIDEO_URL_SPANISH,
  };

  const handleLanguageChange = (language:any) => {
    setSelectedLanguage(selectedLanguage === "english" ? "spanish" : "english");
    setIsVideoPlaying(false);
  };

  const handleImageClick = () => {
    setIsVideoPlaying(true);
  };

  const toggleFAQ = (index: any) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    // {
    //   question: "Can I still obtain/use LMNs if I don’t have an FSA/HSA?",
    //   answer: "Strategies include regular exercise, healthy eating, adequate sleep, relaxation techniques like deep breathing or meditation, seeking social support, and limiting exposure to stressors."
    // },
    // {
    //   question: "What is an FSA/HSA?",
    //   answer: "Maintaining a healthy weight involves a balanced diet, regular physical activity, monitoring calorie intake, and seeking advice from healthcare professionals if needed."
    // },
    {
      question: "What is the cost for an LMN?",
      answer: "The recommended schedule for childhood vaccinations varies by country and health organization. Consult your healthcare provider or local health department for the most accurate information."
    },
    // {
    //   question: "Are all sales final?",
    //   answer: "Risk factors for heart disease include high blood pressure, high cholesterol, smoking, obesity, physical inactivity, and a family history of heart disease."
    // },
    {
      question: "Will all providers/insurers accept an LMN from ProviderNow?",
      answer: "Preventative measures include regular hand washing, wearing masks, maintaining social distancing, getting vaccinated, and following public health guidelines."
    },
    {
      question: "What if my claim is denied after obtaining an LMN? ",
      answer: "Preventative measures include regular hand washing, wearing masks, maintaining social distancing, getting vaccinated, and following public health guidelines."
    },
    // {
    //   question: "What is the cost for a Virtual Consultation? ",
    //   answer: "Preventative measures include regular hand washing, wearing masks, maintaining social distancing, getting vaccinated, and following public health guidelines."
    // },
    // {
    //   question: "Are Virtual Consultations available on mobile? ",
    //   answer: "Preventative measures include regular hand washing, wearing masks, maintaining social distancing, getting vaccinated, and following public health guidelines."
    // },
    // {
    //   question: "How many Virtual Consultations are included with a subscription plan? ",
    //   answer: "Preventative measures include regular hand washing, wearing masks, maintaining social distancing, getting vaccinated, and following public health guidelines."
    // },
  ];

  return (
    <div>
      <NavbarOther />
      <Banner title="Request a Letter of Medical Necessity" />

      <div className="my-8 md:my-16 lg:my-[80px] text-center">
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
              Pay only $40 for a Letter of Medical Necessity Request
            </span>
            <div className="my-4">
              <span className="text-2xl md:text-3xl text-gray-500 font-bold">
                HSA/FSA eligible
              </span>
            </div>
            <div>
              <div className="text-sm md:text-base font-normal">
              {"Did you know that you can use your HSA/FSA funds for preventive care? Certain medical expenses are not reimbursable under a Health Care HSA/FSA unless a licensed health care professional states that the service or product is medically necessary. For example, a vitamin supplement generally would not qualify as reimbursable to a healthy person. However, if you have been diagnosed with a vitamin deficiency or a condition treatable by such a supplement, then that expense would qualify. Similarly, weight-loss treatments and medications would not be covered unless a person suffers from a condition like obesity, as diagnosed by a healthcare professional."}
              </div>
              <div className="text-sm md:text-base my-4 font-normal">
              {"IRS Regulation Section 1.213(d)(1) defines “medical care” to include amounts paid for the diagnosis, cure, mitigation, treatment, or prevention of disease, or for the purpose of affecting any structure or function of the body. To qualify as a medical expenditure, you need documentation from a licensed health care professional and this document is called a Letter of Medical Necessity."}
              </div>
              <p>
                {"ProviderNow helps to maximize your pre-tax dollars with quick access to Letters of Medical Necessity, giving you the healthcare you need. Submit your request for an expedited Letter of Medical Necessity for only $40:"}
              </p>
            </div>
          </div>
        </div>


        <div className="max-w-5xl mx-auto px-4 text-sm md:text-base my-6 font-normal">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl h-[161px] shadow-md text-center flex flex-col justify-center">
              <div className="mb-3 flex justify-center">
                <Image src="/myImages/log-in.png" alt="..." width={40} height={40} />
              </div>
              <h2 className="text-lg md:text-xl font-medium text-black">Login/Signup</h2>
            </div>
            <div className="bg-white rounded-xl h-[161px] shadow-md text-center flex flex-col justify-center">
              <div className="mb-3 flex justify-center">
                <Image src="/myImages/ppc.png" alt="..." width={40} height={40} />
              </div>
              <h2 className="text-lg md:text-xl font-medium text-black">Complete Survey</h2>
            </div>
            <div className="bg-white rounded-xl h-[161px] shadow-md text-center flex flex-col justify-center">
              <div className="mb-3 flex justify-center">
                <Image src="/myImages/group-user.png" alt="..." width={40} height={40} />
              </div>
              <h2 className="text-lg md:text-xl font-medium text-black">Submit Payment</h2>
            </div>
            <div className="bg-white rounded-xl h-[161px] shadow-md text-center flex flex-col justify-center">
              <div className="mb-3 flex justify-center">
                <Image src="/myImages/calendar.png" alt="..." width={40} height={40} />
              </div>
              <h2 className="text-lg md:text-xl font-medium text-black">Licensed Medical Professional Review</h2>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/auth/login">
            <Button className="h-12 w-[140px] md:w-[161px] bg-751A9B text-white hover:bg-purple-700 text-sm md:text-base font-semibold rounded-lg">Get Started Now</Button>
          </Link>
        </div>
      </div>

      {/* Step 1 */}
      {/* <div className="text-white py-6 px-4 bg-gradient flex flex-col items-center">
        <div className="max-w-[1220px] mx-auto py-6 md:py-16 lg:py-[80px] px-4">
          <span className="text-2xl md:text-3xl lg:text-[40px] font-semibold text-center block">
            {"Here's how it works"}
          </span>
          <div className="flex flex-col md:flex-row md:items-start items-center w-full pt-6 md:pt-8">
            <div className="section-content flex-1 md:pr-[30px] lg:pr-[50px]">
              <span className="text-lg md:text-xl font-bold text-[#ff99d6] block">Step 1</span>
              <div className="my-4">
                <span className="text-xl md:text-2xl lg:text-[40px] font-semibold block">
                  Login to your account
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
              <Image src="/myImages/survey.png" alt="Medical Necessity" className="rounded-2xl w-[600px] h-[467px] object-cover" height={467} width={600} />
            </div>
            <div className="section-content flex-1 mt-8 md:mt-0">
              <span className="text-xl md:text-2xl font-bold text-[#ff99d6] block">Step 2</span>
              <div className="my-4">
                <span className="text-2xl md:text-3xl lg:text-[40px] font-semibold block">Complete survey</span>
              </div>
              <p className="text-base md:text-lg lg:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam rem itaque, nobis nisi doloremque facere est a, id possimus hic quas ipsam asperiores perferendis dolore pariatur aliquid dicta sapiente nesciunt maxime? Veritatis molestiae quo vitae perspiciatis non debitis quam, vel modi, quos ea eligendi adipisci illum ex sapiente delectus, illo quae natus minima nobis optio eum itaque placeat quis fuga?
                <br /><br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda doloribus expedita repellendus. Ut quis voluptatum ipsa maxime porro facere labore iste consequatur deleniti. Consectetur, iusto esse. Deserunt consectetur facilis deleniti?
              </p>
            </div>
          </div>
        </div>
      </div> */}
      {/* Step 3 */}
      {/* <div className="text-white py-10 px-5 bg-gradient flex flex-col items-center">
        <div className="max-w-[1220px] mx-auto py-8 md:py-16 lg:py-[80px] px-4">
          <div className="flex flex-col md:flex-row md:items-start items-center w-full">
            <div className="section-content flex-1 md:pr-[30px] lg:pr-[50px]">
              <span className="text-xl md:text-2xl font-bold text-[#ff99d6] block">Step 3</span>
              <div className="my-4">
                <span className="text-2xl md:text-3xl lg:text-[40px] font-semibold block">Submit payment</span>
              </div>
              <p className="text-base md:text-lg lg:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam rem itaque, nobis nisi doloremque facere est a, id possimus hic quas ipsam asperiores perferendis dolore pariatur aliquid dicta sapiente nesciunt maxime? Veritatis molestiae quo vitae perspiciatis non debitis quam, vel modi, quos ea eligendi adipisci illum ex sapiente delectus, illo quae natus minima nobis optio eum itaque placeat quis fuga?
                <br /><br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda doloribus expedita repellendus. Ut quis voluptatum ipsa maxime porro facere labore iste consequatur deleniti. Consectetur, iusto esse. Deserunt consectetur facilis deleniti?
              </p>
            </div>
            <div className="section-image flex-1 mt-8 md:mt-0">
              <Image src="/myImages/use-laptop.jpg" alt="Medical Necessity" className="rounded-2xl w-[600px] h-[467px] object-cover" height={467} width={600} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="max-w-[1220px] mx-auto py-8 md:py-16 lg:py-[80px] px-4">
          <div className="flex flex-col md:flex-row md:items-start items-center w-full">
            <div className="section-image flex-1 md:pr-[30px] lg:pr-[50px]">
              <Image src="/myImages/verification.png" alt="Medical Necessity" className="rounded-2xl w-[600px] h-[467px] object-cover" height={467} width={600} />
            </div>
            <div className="section-content flex-1 mt-8 md:mt-0">
              <span className="text-xl md:text-2xl font-bold text-[#ff99d6] block">Step 4</span>
              <div className="my-4">
                <span className="text-2xl md:text-3xl lg:text-[40px] font-semibold block">Documents verification</span>
              </div>
              <p className="text-base md:text-lg lg:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam rem itaque, nobis nisi doloremque facere est a, id possimus hic quas ipsam asperiores perferendis dolore pariatur aliquid dicta sapiente nesciunt maxime? Veritatis molestiae quo vitae perspiciatis non debitis quam, vel modi, quos ea eligendi adipisci illum ex sapiente delectus, illo quae natus minima nobis optio eum itaque placeat quis fuga?
                <br /><br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda doloribus expedita repellendus. Ut quis voluptatum ipsa maxime porro facere labore iste consequatur deleniti. Consectetur, iusto esse. Deserunt consectetur facilis deleniti?
              </p>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="bg-gradient py-8 md:py-[70px]">
        <div className="section-content flex flex-col justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <span className="text-white text-2xl mb-10 sm:text-3xl md:text-4xl lg:text-[31px] xl:text-[40px] font-bold text-center">
            Request a Letter of Medical Necessity
          </span>
          <div className="flex justify-center w-full md:w-auto">
            <Link href="/auth/login">
              <Button className="text-[#751A9B] bg-white h-12 hover:bg-purple-700 hover:text-white font-semibold text-base md:text-lg w-44 py-2 px-4 rounded-md">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </div> */}

      {/* FAQ Section */}
      <div className="bg-white pb-[80px] mx-3">
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
    </div>
  );
}
