import React, { useState, useEffect, useMemo } from "react";

import {
  FaCamera,
  FaHeartbeat,
  FaRulerVertical,
  FaOilCan,
  FaWeight ,
} from "react-icons/fa";
import { FaDumbbell, FaUser } from "react-icons/fa6";
import {
  FiActivity,
  FiCalendar,
  FiClock,
  FiCpu,
  FiDownload,
  FiEdit,
  FiHeart,
  FiLogOut,
  FiMail,
  FiPhone,
  FiRefreshCw,
  FiTrendingUp,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import { HiOutlineBadgeCheck, HiSparkles } from "react-icons/hi";
import { MdLocalFireDepartment, MdOutlinePendingActions } from "react-icons/md";
import { GiMeat, GiProgression } from "react-icons/gi";
import { LuCalendarDays, LuUtensilsCrossed } from "react-icons/lu";
import { PiBreadBold } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";
import { RiResetLeftLine } from "react-icons/ri";

import { useAuth } from "../../context/AuthContext";
import UserImage from "../../assets/userImage.jpg";
import api from "../../config/Api";
import toast from "react-hot-toast";
import ResetPasswordModal from "./modals/ResetPasswordModal";
import UpdateProfileModal from "./modals/UpdateProfileModal";

const UserProfile = () => {
  const { user, setUser } = useAuth();

  const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] =
    useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [tickets, setTickets] = useState([]);
  const [preview, setPreview] = useState("");
  const [progressData, setProgressData] = useState([]);

  const changePhoto = async (photo) => {
    const form_Data = new FormData();
    form_Data.append("image", photo);

    console.log(form_Data);

    try {
      const res = await api.patch("/user/changePhoto", form_Data);
      toast.success(res.data.message);
      setUser(res.data.data);
      sessionStorage.setItem("HealthUP", JSON.stringify(res.data.data));
      setPreview("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotoURL = URL.createObjectURL(file);
      setPreview(newPhotoURL);
      setTimeout(() => {
        changePhoto(file);
      }, 1000);
    }
  };

  const profileCompletion = user?.profileCompleted ? 100 : 60;

  const getTicketId = useMemo(() => {
    return (ticketId) => {
      if (!ticketId) return "#0000";
      const suffix = ticketId.slice(-6);
      const numeric = Number.parseInt(suffix, 16);
      if (Number.isNaN(numeric)) return `#${ticketId.slice(-4).toUpperCase()}`;
      return `#${String(numeric).slice(-4).padStart(4, "0")}`;
    };
  }, []);

  const handleRegenerate = async () => {
    try {
      const res = await api.post("/user/generateplan");

      toast.success(res.data.message);

      setUser({
        ...user,
        aiPlan: res.data.aiPlan,
      });

      sessionStorage.setItem(
        "HealthUP",
        JSON.stringify({
          ...user,
          aiPlan: res.data.aiPlan,
        }),
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get("/user/mytickets");
        console.log("Tickets: ", res.data);
        setTickets(res.data.tickets);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTickets();

    const intervalId = setInterval(() => {
      fetchTickets();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* Porfile Overview : - Completed */}
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
        <div className="bg-linear-to-r from-purple-500/10 via-cyan-500/10 to-blue-500/10 p-4">
          <div className="flex flex-col lg:px-4 lg:flex-row lg:items-center lg:h-48">
            {/* User information */}

            <div className="lg:w-4/7 flex flex-col lg:flex-row gap-10 lg:items-center justify-between ">
              {/* User Profile photo */}

              <div className="flex flex-col items-center lg:w-3/11 h-full">
                <div className="relative">
                  <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-purple-500 sm:h-36 sm:w-36">
                    <img
                      src={preview || user?.photo?.url || UserImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <label
                    htmlFor="imageUpload"
                    className="absolute bottom-1 right-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-blue-500 shadow-lg transition hover:scale-110"
                  >
                    <FaCamera size={17} />
                  </label>

                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>

                <p className="mt-3 text-center text-xs text-gray-500">
                  Click camera to change photo
                </p>
              </div>

              {/* User Details */}
              <div className="flex-1 py-3">
                <div className="flex flex-col items-start gap-2 ">
                  <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-start">
                    <h1 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                      {user?.fullName}
                    </h1>
                    <HiOutlineBadgeCheck className="text-xl text-cyan-400" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-start gap-2 text-gray-300  break-all">
                      <FiMail className="shrink-0 text-cyan-400" />
                      <span>{user?.email}</span>
                    </div>

                    <div className="flex items-center justify-start gap-2 text-gray-300 ">
                      <FiPhone className="shrink-0 text-cyan-400" />
                      <span>+91 {user?.mobileNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 lg:w-54">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Profile Completion :
                    </span>

                    <span className="font-semibold text-cyan-400">
                      {profileCompletion}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-purple-500 to-cyan-500 transition-all duration-700"
                      style={{ width: `${profileCompletion}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Membership */}
            {user?.profileCompleted ? (
              <>
                <div className="lg:w-3/7 px-2 py-3 h-full">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Membership Details
                  </h3>

                  <div className="space-y-2 xl:w-3/5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-gray-400">Member Since :</span>

                      <span className="text-right text-xs font-medium text-white">
                        {new Date(user?.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-gray-400">User Type :</span>

                      <span className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-0.5 text-xs font-medium capitalize text-green-400">
                        <FaUser size={10} /> {user?.role}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-gray-400">AI Plan :</span>

                      <span className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-0.5 text-xs font-medium text-green-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-gray-400">Account Status :</span>

                      <span className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-0.5 text-xs font-medium text-cyan-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="lg:w-3/7 px-2 py-3 h-full">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Edit your details to access Dashboard
                  </h3>
                  <div className="flex flex-col gap-3 mt-6">
                    <button
                      onClick={() => setIsUpdateProfileModalOpen(true)}
                      className="bg-linear-to-r from-purple-500 to-blue-500 py-2 rounded-xl hover:scale-105 transition cursor-pointer"
                    >
                      Edit Profile
                    </button>

                    <button
                      onClick={() => setIsResetPasswordModalOpen(true)}
                      className="bg-gray-600 py-2 rounded-xl hover:bg-gray-700 transition cursor-pointer"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {user?.profileCompleted ? (
        <>
          {/* Health Information */}

          <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <FiHeart className="text-2xl text-red-400" />
              <h2 className="text-2xl font-bold text-white">
                Health Information
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-xl border border-white/10 bg-[#111827]/60 p-5">
                <FiCalendar className="text-purple-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Age
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  {user?.age}{" "}
                  <span className="text-sm text-gray-400">Years</span>
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <FiUser className="text-cyan-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Gender
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white capitalize">
                  {user?.biologicalSex}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <FaRulerVertical className="text-blue-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Height
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  {user?.height}
                  <span className="text-sm text-gray-400 ml-1">cm</span>
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <FaWeight className="text-green-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Weight
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  {user?.weight}
                  <span className="text-sm text-gray-400 ml-1">kg</span>
                </h3>
              </div>

              <div
                className={`rounded-2xl p-5 bg-[#111827]/60 ${
                  user?.bmi < 18.5
                    ? "border border-red-500/40"
                    : user?.bmi >= 18.5 && user?.bmi <= 24.9
                      ? "border border-green-500/20"
                      : user?.bmi >= 25 && user?.bmi <= 29.9
                        ? "border border-yellow-500/20"
                        : "border border-red-500/40"
                }`}
              >
                <FiActivity className="text-pink-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  BMI
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  {user?.bmi}{" "}
                  <span className="text-sm text-gray-400 ml-1">Kg/m²</span>
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <MdLocalFireDepartment className="text-orange-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  BMR
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  {user?.bmr}
                  <span className="text-sm text-gray-400 ml-1">kcal</span>
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <FiTrendingUp className="text-emerald-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Activity Level
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white capitalize">
                  {user?.activityLevel}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <LuUtensilsCrossed className="text-green-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Food Preference
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white capitalize">
                  {user?.foodPreference}
                </h3>
              </div>
            </div>
          </section>

          {/* Workout & Nutritions Prefernces */}

          <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <FaHeartbeat className="text-2xl text-green-400" />
              <h2 className="text-2xl font-bold text-white">
                Workout & Nutritions Preferences
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <FaDumbbell className="text-purple-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Workout Style
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white capitalize">
                  {user?.workoutPreference?.replaceAll("_", " ")}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <GiProgression className="text-cyan-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Workout Level
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white capitalize">
                  {user?.aiPlan?.workoutLevel}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <TbTargetArrow className="text-pink-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Experience
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white capitalize">
                  {user?.experienceLevel}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <LuCalendarDays className="text-orange-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Weekly Sessions
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  {user?.workoutsPerWeek}
                  <span className="text-sm text-gray-400 ml-1">Days</span>
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <MdLocalFireDepartment className="text-orange-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Daily Calories
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  {user?.aiPlan?.calories}
                  <span className="text-sm text-gray-400 ml-1">kcal</span>
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <GiMeat className="text-red-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Protein
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  {user?.aiPlan?.macros?.protein}
                  <span className="text-sm text-gray-400 ml-1">g</span>
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <PiBreadBold className="text-yellow-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Carbohydrates
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  {user?.aiPlan?.macros?.carbs}
                  <span className="text-sm text-gray-400 ml-1">g</span>
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <FaOilCan className="text-cyan-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Healthy Fats
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  {user?.aiPlan?.macros?.fats}
                  <span className="text-sm text-gray-400 ml-1">g</span>
                </h3>
              </div>
            </div>
          </section>

          {/* AI Coach */}

          <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <HiSparkles className="text-2xl text-purple-400" />
              <h2 className="text-2xl font-bold text-white">AI Coach</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <FiCpu className="text-cyan-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  AI Provider
                </p>

                <h3 className="mt-2 text-lg font-semibold text-white capitalize">
                  {user?.aiPlan?.aiSource}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <HiSparkles className="text-purple-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Plan Mode
                </p>

                <h3 className="mt-2 text-lg font-semibold text-white capitalize">
                  {user?.aiPlan?.progressInsights?.planMode?.replaceAll(
                    "_",
                    " ",
                  )}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <FiClock className="text-orange-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Generated
                </p>

                <h3 className="mt-2 text-sm font-semibold text-white">
                  {new Date(user?.aiPlan?.generatedAt).toLocaleDateString()}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827]/60 p-5">
                <HiOutlineBadgeCheck className="text-green-400 text-xl mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Plan Status
                </p>

                <h3 className="mt-2 text-lg font-semibold text-green-400">
                  Active
                </h3>
              </div>
            </div>

            <div className="mt-6">
              <button className="flex items-center gap-2 rounded-xl bg-linear-to-r from-purple-500 to-cyan-500 px-5 py-3 text-white font-medium hover:shadow-[0_0_10px_rgba(59,130,246,0.35)] hover:shadow-purple-500/30 transition-all duration-300 cursor-pointer">
                <FiRefreshCw />
                Regenerate AI Plan
              </button>
            </div>
          </section>

          {/* Support Tickets */}
          <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
            <h2 className="text-xl font-bold mb-6 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              My Support Tickets
            </h2>

            {tickets.length === 0 ? (
              <p className="text-gray-400 text-sm">No tickets raised yet.</p>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="bg-white/10 p-4 rounded-xl mb-4 flex flex-col gap-3 border border-white/5 hover:border-purple-500/40 transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-white">
                          {ticket.type}
                        </p>
                        <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/40">
                          {getTicketId(ticket._id)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        {ticket.description}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        ticket.status === "Open"
                          ? "bg-green-500/20 text-green-400 border border-green-500/40"
                          : ticket.status === "In Progress"
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                      }`}
                    >
                      🔘 {ticket.status}
                    </span>
                  </div>

                  {ticket.solution && (
                    <div className="bg-white/5 p-3 rounded-lg border-l-2 border-blue-500">
                      <p className="text-xs text-blue-300 font-semibold mb-1">
                        ✓ Solution:
                      </p>
                      <p className="text-sm text-gray-300">{ticket.solution}</p>
                    </div>
                  )}

                  {ticket.resolvedAt && (
                    <p className="text-xs text-gray-500">
                      Resolved:{" "}
                      {new Date(ticket.resolvedAt).toLocaleDateString("en-IN")}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Quick Actions */}

          <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <MdOutlinePendingActions className="text-2xl text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Edit Profile */}

              <button
                onClick={() => setIsUpdateProfileModalOpen(true)}
                className="group rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5 hover:bg-cyan-500/20 transition-all duration-300 cursor-pointer"
              >
                <div className=" flex items-baseline gap-3">
                  <FiEdit className="text-xl text-cyan-400 mb-2 transition-transform duration-300 group-hover:scale-105" />
                  <h3 className="text-lg font-semibold text-white">
                    Edit Profile
                  </h3>
                </div>

                <p className="flex-1 mt-1 text-xs text-start text-gray-400">
                  Update your personal information and preferences.
                </p>
              </button>

              {/* Reset password */}

              <button
                onClick={() => setIsResetPasswordModalOpen(true)}
                className="group cursor-pointer rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5 transition-all duration-300 hover:bg-amber-500/20"
              >
                <div className="flex items-baseline gap-3">
                  <RiResetLeftLine className="mb-2 text-xl text-amber-400 transition-transform duration-300 group-hover:rotate-180" />

                  <h3 className="text-lg font-semibold text-white">
                    Reset Password
                  </h3>
                </div>

                <p className="mt-1 text-start text-xs text-gray-400">
                  Change your password to keep your profile secure.
                </p>
              </button>

              {/* Download Report */}

              <button className="group rounded-2xl border-green-500/20 bg-green-500/10 p-5 hover:bg-green-500/20 transition-all duration-300 cursor-pointer">
                <div className=" flex items-baseline gap-3">
                  <FiDownload className="text-xl text-green-400 mb-2 transition-transform duration-300 group-hover:scale-105" />
                  <h3 className="text-lg font-semibold text-white">
                    {" "}
                    Download Report
                  </h3>
                </div>

                <p className="flex-1 mt-1 text-start  text-xs text-gray-400">
                  Export your health summary.
                </p>
              </button>

              {/* Logout */}

              <button
                //onClick={() => handleLogout}
                className="group rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5 hover:bg-orange-500/20 transition-all duration-300 cursor-pointer"
              >
                <div className=" flex items-baseline gap-3">
                  <FiLogOut className="text-xl text-orange-400 mb-2 transition-transform duration-300 group-hover:scale-105" />
                  <h3 className="text-lg font-semibold text-white">Logout</h3>
                </div>

                <p className="flex-1 mt-1 text-xs text-start text-gray-400">
                  Sign out of your account.
                </p>
              </button>

              {/* Delete Account */}

              <button
                //onClick={() => handleAccountDelete}
                className="group rounded-2xl border  border-red-500/20 bg-red-500/10 p-5 hover:bg-red-500/20 transition-all duration-300 cursor-pointer"
              >
                <div className=" flex items-baseline gap-3">
                  <FiTrash2 className="text-xl text-red-400 mb-2 transition-transform duration-300 group-hover:scale-105" />
                  <h3 className="text-lg font-semibold text-white">
                    Delete Account
                  </h3>
                </div>

                <p className="flex-1 mt-1 text-xs text-start text-gray-400">
                  Permanently remove your account.
                </p>
              </button>
            </div>
          </section>

          <div className="text-center text-gray-400 mt-10">
            Your profile is ready. AI plans and insights are fully enabled.
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 my-10">
          Complete your health details to unlock adaptive AI workout and diet
          plans.
        </div>
      )}

      {isUpdateProfileModalOpen && (
        <UpdateProfileModal
          onClose={() => setIsUpdateProfileModalOpen(false)}
        />
      )}

      {isResetPasswordModalOpen && (
        <ResetPasswordModal
          onClose={() => setIsResetPasswordModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserProfile;
