import Navbar from "@/components/Navbar";

export default async function DashboardLayout({ children }) {


    return (
        <main className="w-full">
            <Navbar />
            <div className="px-4">{children}</div>
        </main>

    );
}
