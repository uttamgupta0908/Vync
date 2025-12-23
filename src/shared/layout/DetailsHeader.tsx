import Link from 'next/link';
import { ArrowLeft, Bell, Plus } from 'lucide-react';

export default function DetailsHeader() {
    return (
        <header className="sticky top-0 bg-neutral-100/80 backdrop-blur-md border-b border-neutral-300 px-4 py-2 z-40 flex items-center justify-between h-[53px]">
            <div className="flex items-center gap-6">
                <Link href="/" className="p-2 -ml-2 hover:bg-neutral-300 rounded-full transition-colors group">
                    <ArrowLeft className="w-5 h-5 text-neutral-800" />
                </Link>
                <div>
                    <h1 className="text-[17px] font-bold text-neutral-800 leading-tight">Post Details</h1>
                    <p className="text-[13px] text-neutral-600">Design Hub Community</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button className="p-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-300 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                </button>
                <button className="bg-primary-300 text-neutral-100 px-4 py-1.5 rounded-xl text-[15px] font-bold hover:bg-primary-200 transition-colors shadow-md shadow-primary-300/20 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Create Post</span>
                </button>
            </div>
        </header>
    );
}
