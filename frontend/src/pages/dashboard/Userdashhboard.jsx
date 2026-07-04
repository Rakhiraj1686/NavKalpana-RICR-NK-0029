import React, { useState, useEffect } from "react";
import UserSidebar from "../../components/userdashboard/UserSidebar";
import UserOverview from "../../components/userdashboard/UserOverview";
import UserSupport from "../../components/userdashboard/UserSupport";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserProgress from "../../components/userdashboard/UserProgress";
import UserProfile from "../../components/userdashboard/UserProfile";
import UserGoal from "../../components/userdashboard/UserGoal";
import UserPlan from "../../components/userdashboard/UserPlan";
import { HiOutlineBars3 } from "react-icons/hi2";
import { HiSparkles } from "react-icons/hi2";
import ProgressionPlan from "../../components/ProgressionPlan";
import AdvancedAnalytics from "../../components/AdvancedAnalytics";
import DashboardDisclaimer from "../../components/userdashboard/DashboardDisclaimer";

const UserDashboard = () => {
  const { isLogin, user } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sectionTitles = {
    overview: "Overview",
    plan: "Plan",
    progression: "Progression",
    analytics: "Analytics",
    progress: "Progress",
    profile: "Profile",
    goal: "Goal",
  };

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };

    // Prevent background scroll when the mobile drawer is open.
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileOpen]);

  const handleOpenMobileMenu = () => {
    setIsCollapsed(false);
    setMobileOpen(true);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 dashboard-scroll flex overflow-hidden bg-linear-to-br from-[#020617] to-[#0f172a] text-white md:gap-4">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 md:hidden z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[72vw] max-w-65 md:static md:h-auto md:max-w-none ${isCollapsed ? "md:w-20" : "md:w-62"} bg-[#020617] border-r border-white/10 transform transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 overflow-hidden shrink-0`}
      >
        <UserSidebar
          active={active}
          setActive={setActive}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          setMobileOpen={setMobileOpen}
        />
      </aside>

      {/* Main Content :- Mobile Topbar */}

      <main className="flex-1 overflow-y-auto md:pl-1">
        <div className="md:hidden sticky top-0 z-30 border-b border-white/10 bg-[#020617]/80 backdrop-blur-2xl">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Menu Button */}
            <button
              onClick={handleOpenMobileMenu}
              aria-label="Open sidebar"
              className="cursor-pointer p-1 active:scale-95 transition-transform duration-150"
            >
              <HiOutlineBars3 className="text-3xl text-purple-400" />
            </button>

            {/* Page Title */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.35em] text-gray-500">
                Dashboard
              </span>

              <h1 className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-lg font-bold text-transparent">
                {sectionTitles[active] || "Overview"}
              </h1>
            </div>

            {/* Profile */}
            <button
              onClick={() => {
                setActive("profile");
              }}
              className="relative"
            >
              {user?.photo?.url ? (
                <img
                  src={user.photo.url}
                  alt={user.fullName}
                  className="h-11 w-11 rounded-full border border-cyan-400/30 object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 via-cyan-500 to-pink-500 font-bold text-white">
                  {user?.fullName?.charAt(0).toUpperCase() || "H"}
                </div>
              )}

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#020617] bg-green-400" />
            </button>
          </div>
        </div>

        <div
          className={`w-full mx-auto p-4 md:p-6 lg:p-8 transition-all duration-300 ${
            isCollapsed ? "max-w-7xl" : "max-w-6xl"
          }`}
        >
          <DashboardDisclaimer section={active} />
          {active === "overview" && <UserOverview />}
          {active === "plan" && <UserPlan />}
          {active === "progression" && <ProgressionPlan />}
          {active === "analytics" && <AdvancedAnalytics />}
          {active === "progress" && <UserProgress />}
          {active === "profile" && <UserProfile />}
          {active === "goal" && <UserGoal />}
          {active === "support" && <UserSupport />}
        </div>
      </main>

      {/* AI Chat Open Button */}

      <button
        onClick={() => navigate("/user-dashboard/ai-chat")}
        className="fixed bottom-8 md:right-8 right-6 z-50 flex items-center justify-center gap-2 h-14 px-5 rounded-full bg-linear-to-r from-purple-500 to-cyan-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.35)] cursor-pointer active:scale-95 transition-all duration-300"
        aria-label="Chat with AI"
      >
        <HiSparkles className="text-2xl" />
        <span className="text-sm font-medium whitespace-nowrap">
          Chat with AI
        </span>
      </button>
    </div>
  );
};

export default UserDashboard;
