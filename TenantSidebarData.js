import * as FaIcons from "react-icons/fa";
import { GrOverview } from "react-icons/gr";

export const TenantSidebarData = [
  {
    title: 'Tenant View',
    path: '/tenantview',
    icon: <GrOverview />,
    cName: 'nav-text'
  },
  {
    title: 'Tenant Card',
    path: '/tenantcard',
    icon: <FaIcons.FaIdCard />,
    cName: 'nav-text'
  }
];
