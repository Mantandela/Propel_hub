import { FaIdCard } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";

export const TenantSidebarData = [
  {
    title: "Tenant View",
    path: "/tenantview",
    icon: <GrOverview />,
    cName: "nav-text",
  },
  {
    title: "My Properties",
    path: "/tenantcard",
    icon: <FaIdCard />,
    cName: "nav-text",
  },
];
