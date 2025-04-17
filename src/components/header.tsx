import Image from 'next/image';
import icon from '../app/icon.png';

export default function Header() {
    return (
        <header className="flex items-center justify-between bg-gradient-to-r from-purple-300 to-purple-700 px-4 py-3 shadow-lg md:px-6 lg:px-8">
            <div className="flex items-center space-x-3">
                <Image src={icon} alt="logo" width={30} height={30}/>
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800">Todolify</span>
            </div>
        </header>
    );
}
