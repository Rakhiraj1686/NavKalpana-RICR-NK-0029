import React from "react";
import { FiLogOut } from "react-icons/fi";
import {
  PiSquaresFourBold,
  PiBarbellBold,
  PiGraphBold,
  PiChartLineUpBold,
  PiPulseBold,
} from "react-icons/pi";
import { LuTarget } from "react-icons/lu";
import { MdOutlineContactSupport, MdOutlineArrowBackIos } from "react-icons/md";
import { HiOutlineX } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../config/Api";
import logo from "../../assets/logo.png";

const menuItems = [
  {
    id: "overview",
    label: "Overview",
    icon: <PiSquaresFourBold />,
  },
  {
    id: "plan",
    label: "Workout Plan",
    icon: <PiBarbellBold />,
  },
  {
    id: "progression",
    label: "Progression",
    icon: <PiGraphBold />,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <PiChartLineUpBold />,
  },
  {
    id: "progress",
    label: "Progress",
    icon: <PiPulseBold />,
  },
  {
    id: "goal",
    label: "Goals",
    icon: <LuTarget />,
  },
  {
    id: "support",
    label: "Support",
    icon: <MdOutlineContactSupport />,
  },
];

const UserSidebar = ({
  active,
  setActive,
  isCollapsed,
  setIsCollapsed,
  setMobileOpen,
}) => {
  const { setUser, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);

      sessionStorage.removeItem("HealthUP");
      setUser("");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className=" h-full w-full flex flex-col bg-linear-to-b from-[#030712] via-[#0f172a] to-[#020617] backdrop-blur-3x border-r border-cyan-400/20">
      {/* Sidebar: Header */}
      <div className="flex items-center justify-between px-4 py-3 md:py-2 border-b border-white/10 bg-white/5 backdrop-blur-md">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="cursor-pointer hover:scale-102"
            >
              <img
                src={logo}
                alt="HealthUP"
                className="w-10 h-10 object-contain shrink-0 "
              />
            </button>

            {!isCollapsed && (
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-bold tracking-wider uppercase bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    HealthUP
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
                    FITNESS AI
                  </p>
                </div>

                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="hidden md:block cursor-pointer text-purple-400 hover:text-white/70 transition-colors border rounded-full p-1.5 border-white/20 hover:border-purple-400/40"
                >
                  <MdOutlineArrowBackIos className="transition-transform duration-300" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Buttons - Mobile Close */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-red-500 text-4xl"
            aria-label="Close sidebar"
          >
            <HiOutlineX />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-2 space-y-3">
        {menuItems.map((item) => {
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setMobileOpen(false);
              }}
              aria-current={isActive ? "page" : undefined}
              title={isCollapsed && item.label}
              className={`
                 flex items-center ${isCollapsed ? "justify-center rounded-full" : "justify-start w-full rounded-xl"} gap-4 py-2 px-4 
                transition-all duration-300 group cursor-pointer border
                ${
                  isActive
                    ? "bg-linear-to-r from-purple-500/20 to-cyan-500/20 border-cyan-400/30 shadow-[0_0_5px_rgba(59,130,246,0.4)]"
                    : "border-transparent hover:bg-white/5"
                }
              `}
            >
              <span
                className={`text-2xl ${
                  isActive
                    ? "text-cyan-400"
                    : "text-gray-400 group-hover:text-white"
                }`}
              >
                {item.icon}
              </span>

              {!isCollapsed && (
                <span
                  className={`text-[15px] font-normal uppercase ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}

        <div className="mt-auto pt-4 border-t border-white/5">
          <div
            className={`flex items-center ${
              isCollapsed ? "flex-col gap-6" : "justify-between"
            }`}
          >
            {/* Profile */}
            <button
              onClick={() => {
                setActive("profile");
                setMobileOpen(false);
              }}
              title={isCollapsed ? "Profile" : ""}
              className={`flex items-center ${
                isCollapsed ? "justify-center hover:scale-105" : "gap-3 flex-1 rounded-2xl px-2 py-1 hover:bg-white/5 transition-all duration-300 "
              } overflow-hidden cursor-pointer text-left`}
            >
              <div className="relative shrink-0">
                {user?.photo?.url ? (
                  <img
                    src={user.photo.url}
                    alt={user?.fullName || "User"}
                    className="w-11 h-11 rounded-full object-cover border-2 border-cyan-400/30 shadow-lg"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-linear-to-br from-purple-500 via-cyan-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {user?.fullName?.charAt(0).toUpperCase() || "H"}
                  </div>
                )}

                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#030712]" />
              </div>

              {!isCollapsed && (
                <div className="min-w-0">
                  <h4 className="truncate font-medium text-white hover:text-cyan-400 transition-colors">
                    {user?.fullName || "HealthUP User"}
                  </h4>

                  <p className="truncate text-xs text-gray-400">
                    +91 {user?.mobileNumber || "987654XXXX"}
                  </p>
                </div>
              )}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              title="Logout"
              className={`group flex items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-400/60 hover:text-red-300 transition-all duration-300 cursor-pointer ${
                isCollapsed ? "w-11 h-11" : "ml-3 w-11 h-11 shrink-0"
              }`}
              aria-label="Logout"
            >
              <FiLogOut className="text-lg transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
