export const metadata = {
    title: "Sign In",
};

export default function AuthLayout({ children }) {
    return (
        <div className='flex items-center justify-center min-h-screen w-full px-6'>
            {children}
        </div>
    );
}
