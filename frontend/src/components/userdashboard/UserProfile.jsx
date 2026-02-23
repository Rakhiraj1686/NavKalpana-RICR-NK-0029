import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
// import EditProfileSetupModal from "./modals/EditProfileModal";
import UserImage from "../../assets/userImage.jpg";
import { FaCamera, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import ResetPasswordModal from "./modals/ResetPasswordModal";

const UserProfile = () => {
  const { user } = useAuth();

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [preview, setPreview] = useState("");

  const profileCompletion = user?.profileCompleted ? 100 : 60;

  return (
    <div className="min-h-screen text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Section */}
        <div className="grid lg:grid-cols-1 gap-8">
          {/* LEFT: Profile Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* LEFT → Profile Image */}
              <div className="relative flex flex-col items-center">
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-purple-500">
                  <img
                    src={preview || user?.photo?.url || UserImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-2 right-2 bg-linear-to-r from-purple-500 to-blue-500 p-3 rounded-full cursor-pointer hover:scale-110 transition"
                >
                  <FaCamera size={16} />
                </label>
                <input type="file" id="imageUpload" className="hidden" />
              </div>

              {/* CENTER → User Details */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold">{user?.fullName}</h1>

                <div className="flex gap-4 items-center">
                  <span className="inline-block mt-2 px-4 py-1 rounded-full text-sm bg-linear-to-r from-purple-500 to-blue-500 text-white">
                    {user?.role}
                  </span>

                  <span
                    className={`mt-2 px-4 py-1  rounded-full text-sm font-semibold ${
                      user?.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user?.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="mt-6 space-y-2 text-sm text-gray-300">
                  <p className="flex items-center gap-2">
                    <strong>
                      <MdOutlineEmail />
                    </strong>
                    {user?.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <strong>
                      <FaPhoneAlt className="text-xs" />
                    </strong>
                    {user?.mobileNumber}
                  </p>
                </div>
              </div>

              {/* RIGHT → Progress + Actions */}
              <div className="w-full md:w-72">
                <div className="flex justify-between text-sm mb-2">
                  <span>Profile Completion</span>
                  <span>{profileCompletion}%</span>
                </div>

                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-linear-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>

                <div className="flex flex-col gap-3 mt-6">
                  <button
                    onClick={() => setIsEditProfileModalOpen(true)}
                    className="bg-linear-to-r from-purple-500 to-blue-500 py-2 rounded-xl hover:scale-105 transition"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={() => setIsResetPasswordModalOpen(true) }
                    className="bg-gray-600 py-2 rounded-xl hover:bg-gray-700 transition"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-bold mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI Fitness Status
            </h2>
            <p className="text-gray-300 text-sm">
              {!user.profileCompleted &&
                "Complete your fitness profile to unlock adaptive AI workout and diet plans."}
            </p>
          </div>
        </div>
      </div>
      
      {/* {isEditProfileModalOpen && (
        <EditProfileSetupModal onClose={() => setIsEditProfileModalOpen(false)} />
      )} */}
      {isResetPasswordModalOpen && (
        <ResetPasswordModal
          onClose={() => setIsResetPasswordModalOpen(false)}
        />
      )}
    </div>
  );
};

// function Stat({ label, value }) {
//   return (
//     <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
//       <p className="text-gray-400 text-xs mb-1">{label}</p>
//       <p className="font-semibold">{value}</p>
//     </div>
//   );
// }

export default UserProfile;
