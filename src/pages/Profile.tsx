import Navbar from "../components/Navbar";
import { useQuery, gql } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import { UseData } from "../types/Types";
import { useEffect } from "react";
import ComingSoon from "../components/ComingSoon";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const GET_DATA = gql`
  {
    company {
      name
      ceo
      cto
    }
  }
`;

const Profile = () => {
  const { loading, data, error } = useQuery<UseData>(GET_DATA);
  const navigate = useNavigate();

  const { loggedInState } = useAuth();

  useEffect(() => {
    // Redirect to the login page if not logged in
    if (!loggedInState) {
      navigate("/");
    }
  }, [loggedInState, navigate]);

  if (error) {
    toast.error("Something went wrong");
  }

  return (
    <>
      {loggedInState && (
        <div className="h-ful relative">
          <Toaster position="top-right" reverseOrder={false} />
          <Navbar />
          <div className="max-w-7xl my-4 mx-auto h-ful ">
            <div className="flex lg:gap-10 md:gap-8 gap-4 m-4 flex-wrap ">
              <div className=" flex-[2] border border-solid border-[#DDE1E3] px-16 py-8 rounded-lg">
                <div className="flex flex-col lg:flex-row md:flex-row lg:gap-5 md:gap-3 gap-1 h-24 items-center">
                  <div className="border border-solid border-[#FCB6C0] rounded-[100%]  p-[3px] relative">
                    <div className="bg-[#FEE7EA] p-3 text-[#1CC578] lg:text-2xl md:text-lg text-sm rounded-full ">
                      <p className="w-8 text-center h-8">
                        {data?.company.name
                          .split(" ")
                          .map(([firstLetter]) => firstLetter)
                          .join("")}
                      </p>
                    </div>
                  </div>
                  <h2 className=" font-semibold lg:text-2xl md:text-lg text-sm">
                    {loading ? "Loading..." : data?.company.name}
                  </h2>
                </div>
                <div className="mt-5">
                  <div className=" md:mb-6">
                    <p className="fonrt-normal text-xs text-[#858585] leading-5 md:text-left text-center">
                      CEO
                    </p>
                    <h3 className="font-normal text-base text-[#1A1A1A] leading-6 md:text-left text-center">
                      {loading ? "Loading..." : data?.company.ceo.toUpperCase()}
                    </h3>
                  </div>
                  <div>
                    <p className="fonrt-normal text-xs text-[#858585] leading-5 md:text-left text-center">
                      CTO
                    </p>
                    <h3 className="font-normal text-base text-[#1A1A1A] leading-6 md:text-left text-center">
                      {loading ? "Loading..." : data?.company.cto.toUpperCase()}
                    </h3>
                  </div>
                </div>
              </div>
              <ComingSoon />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
