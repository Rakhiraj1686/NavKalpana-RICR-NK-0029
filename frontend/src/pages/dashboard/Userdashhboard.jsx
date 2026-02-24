import React, { useState, useEffect } from "react";
import UserSidebar from "../../components/userdashboard/UserSidebar";
import UserOverview from "../../components/userdashboard/UserOverview";
import UserSupport from "../../components/userdashboard/UserSupport";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// import UserWorkout from "../../components/userdashboard/UserWorkout";
import UserProgress from "../../components/userdashboard/UserProgress";
import UserProfile from "../../components/userdashboard/UserProfile";
import UserGoal from "../../components/userdashboard/UserGoal";
import UserPlan from "../../components/userdashboard/userPlan";

const UserDashboard = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  const [active, setActive] = useState("overview");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);

  return (
    <div className="fixed top-15 h-screen w-full flex overflow-hidden bg-linear-to-br from-[#020617] to-[#0f172a] text-white">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-50 h-full
          bg-[#020617] border-r border-white/10
          transition-all duration-300
          ${mobileOpen ? "left-0" : "-left-full"}
          md:left-0
          ${isCollapsed ? "w-4/60" : "w-10/60"}
        `}
      >
        <UserSidebar
          active={active}
          setActive={setActive}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          setMobileOpen={setMobileOpen}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Topbar */}
        <div className="md:hidden p-4 border-b border-white/10 flex justify-between">
          <button onClick={() => setMobileOpen(true)}>☰</button>
          <span>User Dashboard</span>
        </div>

        <div className={`mx-auto p-6 ${isCollapsed ? "w-56/60" : "w-50/60"}`}>
          {active === "overview" && <UserOverview />}
          {/* {active === "workout" && <UserWorkout />} */}
          {active === "plan" && <UserPlan/>}
          {active === "progress" && <UserProgress />}
          {active === "profile" && <UserProfile />}
          {active === "goal" && <UserGoal />}
          {active === "support" && <UserSupport />}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
