import Link from 'next/link';
import { Search, Bell, Plus } from 'lucide-react';
import { currentUser } from '@/src/shared/data/mock';
import { Avatar } from '@/src/shared/ui';

export default function HomeHeader() {
    return (
        <header className="sticky top-0 bg-neutral-100 border-b border-neutral-300 z-50">
            <div className="max-w-[1265px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Left: Logo & Nav */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-300 rounded-lg flex items-center justify-center">
                            <span className="text-neutral-100 font-bold text-lg">V</span>
                        </div>
                        <span className="text-xl font-bold text-neutral-800 hidden sm:block">Vync</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors">Home</Link>
                        <Link href="/communities" className="text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors">Communities</Link>
                        <Link href="/live" className="text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors">Live</Link>
                        <Link href="/messages" className="text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors">Messages</Link>
                    </nav>
                </div>

                {/* Center: Search */}
                <div className="flex-1 max-w-md hidden sm:block mx-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <input
                            type="text"
                            placeholder="Search Vync..."
                            className="w-full pl-10 pr-4 py-2 bg-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300/20 focus:bg-neutral-100 transition-all"
                        />
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <button className="relative p-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-300 rounded-full transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-angry-500 rounded-full border-2 border-neutral-100"></span>
                    </button>
                    <button className="hidden sm:flex items-center gap-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-300 p-2 rounded-full transition-colors">
                        <Plus className="w-5 h-5" />
                    </button>
                    <Avatar
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-8 h-8 sm:w-9 sm:h-9 border border-neutral-300 cursor-pointer"
                    />
                </div>
            </div>
        </header>
    );
}
