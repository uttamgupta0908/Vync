import Link from 'next/link';
import { ArrowLeft, Bell, Plus } from 'lucide-react';

export default function DetailsHeader() {
    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-2 z-40 flex items-center justify-between h-[53px]">
            <div className="flex items-center gap-6">
                <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors group">
                    <ArrowLeft className="w-5 h-5 text-gray-900" />
                </Link>
                <div>
                    <h1 className="text-[17px] font-bold text-gray-900 leading-tight">Post Details</h1>
                    <p className="text-[13px] text-gray-500">Design Hub Community</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                </button>
                <button className="bg-[#8B5CF6] text-white px-4 py-1.5 rounded-full text-[15px] font-bold hover:bg-[#7C3AED] transition-colors shadow-md shadow-indigo-200 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Create Post</span>
                </button>
            </div>
        </header>
    );
}
