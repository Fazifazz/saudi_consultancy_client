import {
    LucideIcon,
    Users
} from "lucide-react"

export type SidebarMenuItem = {
    title: string;
    url: string;
    icon: LucideIcon;
    items?: {
        title: string;
        url: string;
    }[];
    isActive?: boolean;
}

export const SIDEBAR_MENU: SidebarMenuItem[] = [
    {
        title: "Customer",
        url: "/customer",
        icon: Users,
        isActive: true,
    },
]
