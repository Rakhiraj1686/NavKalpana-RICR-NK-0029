import React from "react";
import {
  FiHome,
  // FiActivity,
  FiUser,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";
import { MdOutlineContactSupport } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { GiProgression } from "react-icons/gi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../config/Api";

const menuItems = [
  { id: "overview", label: "Overview", icon: <FiHome /> },
  { id: "goal", label: "Goal", icon: <GoGoal /> },
  // { id: "workout", label: "Workout Plan", icon: <FiActivity /> },
  { id: "plan", label: "Plan", icon: <FiBarChart2 /> },
  { id: "progress", label: "Progress", icon: <GiProgression /> },
  { id: "profile", label: "Profile", icon: <FiUser /> },
  {id: "support", label:"Support", icon: <MdOutlineContactSupport/>}
];

const UserSidebar = ({
  active,
  setActive,
  isCollapsed,
  setIsCollapsed,
  setMobileOpen,
}) => {
  const { user, setUser } = useAuth();
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
    <div className="h-full flex flex-col p-5">
      {/* Logo / Username */}
      <div className="flex items-center justify-between mb-5">
        {!isCollapsed && (
          <div className="pt-2">
            <h1 className="text-2xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {user?.fullName || "Dashboard"}
            </h1>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:block text-gray-400 hover:text-white cursor-pointer"
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Menu */}
      <nav>
        <div className="flex flex-col justify-between">
          <div className="flex-1 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl
              transition-all duration-200 cursor-pointer
              ${
                active === item.id
                  ? "bg-linear-to-r from-purple-500/20 to-blue-500/20 text-purple-400 border border-purple-400/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
              >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-4 py-3 mt-3 rounded-xl
            duration-200 cursor-pointer text-red-400 hover:bg-red-500/10 transition  "
      >
        <FiLogOut className="text-lg" />
        {!isCollapsed && "Logout"}
      </button>
    </div>
  );
};

export default UserSidebar;
