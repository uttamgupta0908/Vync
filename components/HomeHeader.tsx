import { Search, Bell, Plus } from 'lucide-react';
import { currentUser } from '@/data/mock';

export default function HomeHeader() {
    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 z-40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
                <div className="sm:hidden">
                    <div className="w-8 h-8 bg-[#8B5CF6] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">V</span>
                    </div>
                </div>
                <h1 className="text-xl font-bold text-gray-900 hidden sm:block">H</h1>
                <div className="flex-1 max-w-md hidden sm:block">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Vync..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 focus:bg-white transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
                <button className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <button className="hidden sm:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                    <Plus className="w-4 h-4 text-gray-600" />
                </button>
                <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200 object-cover border border-gray-200"
                />
            </div>
        </header>
    );
}
