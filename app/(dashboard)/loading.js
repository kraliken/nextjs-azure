import Image from "next/image";
import loader from '@/assets/loader.gif';

const TodosLoading = () => {
    return <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <Image src={loader} height={55} width={55} alt='Loading...' />
    </div>;
};

export default TodosLoading;
