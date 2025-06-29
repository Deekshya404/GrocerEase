import { useState } from "react";
import { assets } from "../assets/assets";

// Reusable Input Field component
const InputField = ({ type = "text", placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-[#4fbf8b] transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    zipcode: "",
    province: "",
    country: "",
    street: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitted Address:", address);
    // You can make an API call here to send address data to a backend
  };

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-[#4fbf8b]">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="firstName" placeholder="First Name" />
              <InputField handleChange={handleChange} address={address} name="lastName" placeholder="Last Name" />
            </div>

            <InputField handleChange={handleChange} address={address} name="email" placeholder="Email Address" type="email" />

            <InputField handleChange={handleChange} address={address} name="phone" placeholder="Phone Number" type="tel" />

            <InputField handleChange={handleChange} address={address} name="street" placeholder="Street Address" />
            
            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="city" placeholder="City" />
              <InputField handleChange={handleChange} address={address} name="zipcode" placeholder="Zip Code" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="province" placeholder="Province/State" />
              <InputField handleChange={handleChange} address={address} name="country" placeholder="Country" />
            </div>

            <button
              type="submit"
              className="mt-5 w-full bg-[#4fbf8b] text-white py-2 rounded hover:bg-[#3ba478] transition"
            >
              Save Address
            </button>
          </form>
        </div>

        <img
          className="md:mr-16 mb-16 mt-0 w-full max-w-sm"
          src={assets.add_address_iamge}
          alt="Add Address Illustration"
        />
      </div>
    </div>
  );
};

export default AddAddress;
