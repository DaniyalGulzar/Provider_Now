import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";

interface ModalProps {
  modalIsOpen: boolean;
  modalTitle: string;
  closeModal: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formData: FormData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordToggle: () => void;
}

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  socialSecurityNumber: string;
  telephoneNumber: string;
  emailAddress: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
}

const Modal = ({
  modalIsOpen,
  modalTitle,
  closeModal,
  handleSubmit,
  formData,
  handleChange,
  handlePasswordToggle,
}: ModalProps) => {
  if (!modalIsOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-60 backdrop-blur-sm overflow-auto">
      <div className="bg-white rounded-3xl shadow-xl max-w-full sm:max-w-5xl  w-full h-[70%] md:h-[80%] sm:h-[100%] mt-5 overflow-auto mx-5 p-4 sm:p-8 mt-5 relative mb-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 ">
          {modalTitle}
        </h2>
        <button
          className="p-3 absolute top-2 right-2 text-gray-600"
          onClick={closeModal}
        >
          <FaTimes size={20} />
        </button>
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label
                htmlFor="firstName"
                className="mb-3 text-base sm:text-lg font-semibold"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="border p-3 w-full mt-2 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="middleName"
                className="mb-3 text-base sm:text-lg font-semibold"
              >
                &nbsp;
              </label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Middle name"
                className="border p-3 w-full mt-2 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-3 text-base sm:text-lg font-semibold"
              >
                &nbsp;
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="border p-3 w-full mt-2 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="dateOfBirth"
                className="mb-3 text-base sm:text-lg font-semibold"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="border p-3 w-full mt-2 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="socialSecurityNumber"
                className="mb-3 text-base sm:text-lg font-semibold"
              >
                Social Security Number
              </label>
              <input
                type="text"
                id="socialSecurityNumber"
                name="socialSecurityNumber"
                value={formData.socialSecurityNumber}
                onChange={handleChange}
                className="border p-3 w-full mt-2 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="telephoneNumber"
                className="mb-3 text-base sm:text-lg font-semibold"
              >
                Telephone Number
              </label>
              <input
                type="tel"
                id="telephoneNumber"
                name="telephoneNumber"
                value={formData.telephoneNumber}
                onChange={handleChange}
                className="border p-3 w-full mt-2 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="emailAddress"
                className="mb-3 text-base sm:text-lg font-semibold"
              >
                Email Address
              </label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                className="border p-3 w-full mt-2 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="address"
                className="mb-3 text-base sm:text-lg font-semibold"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border p-3 w-full mt-2 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="mb-3 text-base sm:text-lg font-semibold"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="border p-3 w-full mt-2 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="state"
                className="mb-3 text-base sm:text-lg font-semibold"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="border p-3 w-full mt-2 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="zipcode"
                className="mb-3 text-base sm:text-lg font-semibold"
              >
                Zipcode
              </label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="border p-3 w-full mt-2 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="password"
                className="mb-3 text-base sm:text-lg font-semibold"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={formData.showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border p-3 w-full mt-2 rounded-md"
                />
                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                >
                  {formData.showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-3 text-base sm:text-lg font-semibold"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={formData.showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border p-3 w-full mt-2 rounded-md"
                />
                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                >
                  {formData.showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 text-md rounded-lg w-full sm:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
