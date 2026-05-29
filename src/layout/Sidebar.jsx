import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  FileText,
  Settings
} from "lucide-react";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo-section">
        <h2>ATS PRO</h2>
        <p>Recruitment Portal</p>
      </div>

      <div className="menu">

        <div className="menu-item active">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>

        <div className="menu-item">
          <Users size={20} />
          <span>Candidates</span>
        </div>

        <div className="menu-item">
          <BriefcaseBusiness size={20} />
          <span>Requirements</span>
        </div>

        <div className="menu-item">
          <FileText size={20} />
          <span>Submissions</span>
        </div>

        <div className="menu-item">
          <Settings size={20} />
          <span>Settings</span>
        </div>

      </div>

    </div>
  );
}

export default Sidebar;