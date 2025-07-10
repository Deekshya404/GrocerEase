import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Here, you can validate the email/password or add actual login logic
    if (email && password) {
      setIsSeller(true);
    } else {
      alert("Please fill in both email and password.");
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex justify-center items-center text-sm text-gray-600"
      >
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200 bg-white">
          <p className="text-2xl font-medium m-auto">
            <span className="text-[#4fbf8b]">Seller</span> Login
          </p>

          <div className="w-full">
            <label className="block mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#4fbf8b]"
              required
            />
          </div>

          <div className="w-full">
            <label className="block mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#4fbf8b]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#4fbf8b] text-white py-2 px-4 rounded-md hover:bg-[#3fa57b] transition-all"
          >
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
