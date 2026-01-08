import {
  IdCard,
  LucideIcon,
  Users,
  TicketsPlane,
  ArrowLeftRight,
  IdCardLanyard,
} from 'lucide-react';

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
      { title: 'Create', url: '/customer/create' },
      { title: 'List', url: '/customer/list' },
    ],
  },
  {
    title: 'Transactions',
    url: '#',
    icon: ArrowLeftRight,
    isActive: true,
    items: [
      { title: 'Create', url: '/transaction/create' },
      { title: 'List', url: '/transaction/list' },
    ],
  },
  {
    title: 'Visa Details',
    url: '/visa-details',
    icon: IdCard,
    isActive: true,
  },
  {
    title: 'Tickets',
    url: '/ticket',
    icon: TicketsPlane,
    isActive: false,
    items: [
      { title: 'Create', url: '/ticket/create' },
      { title: 'List', url: '/ticket/list' },
    ],
  },
  {
    title: 'Passport Possition',
    url: '/passport-possession',
    icon: IdCardLanyard,
    items: [
      { title: 'Create', url: '/passport-possession/create' },
      { title: 'List', url: '/passport-possession/list' },
    ],
    // TODO: undo comment if color needed for sidebar menu
    // className:'bg-cyan-500 dark:bg-cyan-700 text-white'
  },
];
