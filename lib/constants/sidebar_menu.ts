import {
  IdCard,
  LucideIcon,
  Users,
  TicketsPlane,
  ArrowLeftRight,
  IdCardLanyard,
  BriefcaseMedicalIcon,
  ClipboardList,
  LayoutGrid,
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
    isActive: false,
    items: [
      { title: 'Create', url: '/customer/create' },
      { title: 'List', url: '/customer/list' },
    ],
  },
  {
    title: 'Transactions',
    url: '#',
    icon: ArrowLeftRight,
    isActive: false,
    items: [
      { title: 'Create', url: '/transaction/create' },
      { title: 'List', url: '/transaction/list' },
    ],
  },
  {
    title: 'Medical Status',
    url: '/medical-status',
    icon: BriefcaseMedicalIcon,
    isActive: false,
    items: [
      { title: 'Create', url: '/medical-status/create' },
      { title: 'List', url: '/medical-status/list' },
    ],
  },
  {
    title: 'Medical Payment',
    url: '/medical-payment',
    icon: IdCardLanyard,
    isActive: false,
    items: [
      { title: 'Create', url: '/medical-payment/create' },
      { title: 'List', url: '/medical-payment/list' },
    ],
  },
  {
    title: 'Visa Details',
    url: '#',
    icon: IdCard,
    isActive: false,
    items: [
      { title: 'Create', url: '/visa-details/create' },
      { title: 'List', url: '/visa-details/list' },
    ],
  },
  {
    title: 'Trade Certificate',
    url: '/trade-certificate',
    icon: LayoutGrid,
    isActive: false,
    items: [
      { title: 'Create', url: '/trade-certificate/create' },
      { title: 'List', url: '/trade-certificate/list' },
    ],
  },
  {
    title: 'VFS',
    url: '/vfs',
    icon: ClipboardList,
    isActive: false,
    items: [
      { title: 'Create', url: '/vfs/create' },
      { title: 'List', url: '/vfs/list' },
    ],
  },
  {
    title: 'Passport Posission',
    url: '/passport-possession',
    icon: IdCardLanyard,
    items: [
      { title: 'Create', url: '/passport-possession/create' },
      { title: 'List', url: '/passport-possession/list' },
    ],
    // TODO: undo comment if color needed for sidebar menu
    // className:'bg-cyan-500 dark:bg-cyan-700 text-white'
  },
  {
    title: 'Agency Payment',
    url: '/agency-payment',
    icon: IdCardLanyard,
    isActive: false,
    items: [
      { title: 'Create', url: '/agency-payment/create' },
      { title: 'List', url: '/agency-payment/list' },
    ],
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
    title: 'KSA Status',
    url: '/ksa-status',
    icon: ClipboardList,
    isActive: false,
    items: [
      { title: 'Create', url: '/ksa-status/create' },
      { title: 'List', url: '/ksa-status/list' },
    ],
  },
];
