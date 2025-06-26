import { cookies } from 'next/headers';
import LogoutButton from './LogoutButton';

const Navbar = async () => {

    const cookieStore = await cookies();
    const userRaw = cookieStore.get('user_data')?.value;

    const user = userRaw ? JSON.parse(userRaw) : null;

    return (
        <div className='flex justify-between items-center gap-2 w-full p-4 bg-amber-200'>
            <div className='flex items-center gap-2'>
                <div>{user?.username}</div>
                <div className='text-sm'>{`(${user?.role})`}</div>

            </div>
            <LogoutButton />
        </div>
    )
}

export default Navbar