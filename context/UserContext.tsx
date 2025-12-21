"use client";

import { createContext, useContext, ReactNode } from "react";

const UserContext = createContext<any>(null);

export const UserProvider = ({
    user,
    children,
}: {
    user: any;
    children: ReactNode;
}) => {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
