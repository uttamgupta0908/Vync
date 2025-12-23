import React, { useState } from 'react';
import { Plus, Smile, Paperclip, Send } from 'lucide-react';
import { Avatar, Spinner } from '@/src/shared/ui';
import { Message } from '../services';
import { useSendMessage } from '../hooks/useMessages';

interface ChatWindowProps {
    conversationId: string | null;
    messages: Message[];
    isLoading: boolean;
}

export default function ChatWindow({ conversationId, messages, isLoading }: ChatWindowProps) {
    const [inputText, setInputText] = React.useState('');
    const sendMessageMutation = useSendMessage();

    const handleSend = () => {
        if (!conversationId || !inputText.trim() || sendMessageMutation.isPending) return;

        sendMessageMutation.mutate({
            conversationId,
            text: inputText
        });
        setInputText('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!conversationId) {
        return (
            <div className="flex-1 flex items-center justify-center bg-white rounded-2xl">
                <p className="text-neutral-600">Select a conversation to start messaging</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-neutral-100 relative rounded-2xl overflow-hidden">
            {/* Header ... similar to before, but use dynamic user if available ... */}
            <div className="h-[88px] border-b border-neutral-300 flex items-center justify-between px-8 bg-neutral-100/80 backdrop-blur-sm sticky top-0 z-10 rounded-t-2xl">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar src="" alt="User" size="md" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900 text-lg">Conversation</h2>
                        <p className="text-sm font-medium text-green-500">Online</p>
                    </div>
                </div>
                {/* ... existing header icons ... */}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Spinner />
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-4 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                            <Avatar
                                src=""
                                alt={msg.isMe ? 'Me' : 'User'}
                                size="md"
                                className="mt-1"
                            />

                            <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} max-w-[65%]`}>
                                <div className={`
                                    px-6 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm
                                    ${msg.isMe
                                        ? 'bg-primary-300 text-neutral-100 rounded-tr-sm'
                                        : 'bg-neutral-200 text-neutral-800 rounded-tl-sm border border-transparent'
                                    }
                                `}>
                                    {msg.text}
                                </div>

                                <div className="flex items-center gap-1.5 mt-1.5 px-1">
                                    <span className="text-[11px] font-medium text-gray-400">{msg.timestamp}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Input Area */}
            <div className="p-6 pt-2 bg-white sticky bottom-0">
                <div className="flex items-end gap-3 p-2 bg-white border border-neutral-300 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-primary-300/20 focus-within:border-primary-300 transition-all">
                    <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors mb-0.5">
                        <Plus className="w-5 h-5" />
                    </button>

                    <textarea
                        className="flex-1 bg-transparent border-none focus:ring-0 p-3 pl-2 text-gray-900 placeholder:text-gray-400 max-h-32 resize-none text-[15px] leading-[1.5]"
                        placeholder="Type a message..."
                        rows={1}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        style={{ minHeight: '48px', height: '48px' }}
                    />

                    <div className="flex items-center gap-1 mb-1.5 mr-1">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                            <Smile className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={sendMessageMutation.isPending || !inputText.trim()}
                            className="p-2.5 bg-primary-300 hover:bg-primary-200 text-neutral-100 rounded-xl transition-colors shadow-sm ml-1 hover:scale-105 active:scale-95 duration-200 disabled:opacity-50"
                        >
                            {sendMessageMutation.isPending ? <Spinner size="sm" /> : <Send className="w-4 h-4 ml-0.5" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
