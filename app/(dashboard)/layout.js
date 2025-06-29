export const metadata = {
    title: "Dashboard",
};

import { cookies } from 'next/headers';
import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({ children }) {

    const cookieStore = await cookies();
    const userRaw = cookieStore.get('user_data')?.value;

    const user = userRaw ? JSON.parse(userRaw) : null

    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <main className="w-full">
                <Navbar />
                <div className="px-4">{children}</div>
            </main>
        </SidebarProvider>

    );
}
