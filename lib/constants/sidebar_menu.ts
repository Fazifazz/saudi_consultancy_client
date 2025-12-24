import { IdCard, LucideIcon, Users } from 'lucide-react';

export type SidebarMenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: {
    title: string;
    url: string;
  }[];
  isActive?: boolean;
  className?: string;
};

export const SIDEBAR_MENU: SidebarMenuItem[] = [
  {
    title: 'Customer',
    url: '#',
    icon: Users,
    isActive: true,
    items: [
      { title: "Create", url: "/customer/create" },
      { title: "List", url: "/customer/list" }
    ]
  },
  {
    title: 'Visa Details',
    url: '/visa-details',
    icon: IdCard,
    isActive: true,
  },
];
