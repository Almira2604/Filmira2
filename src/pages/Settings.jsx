import React, { useState } from 'react';

function Settings() {
    const [darkMode, setDarkMode] = useState(true);
    const [language, setLanguage] = useState('English');

    return (
        <div className="p-4 sm:p-6 md:p-8 text-white">
            <h2 className="text-[20px] font-bold mb-6">Settings</h2>

            <div className="space-y-6 max-w-md">
                {/* Account Section */}
                <div>
                    <h3 className="font-semibold mb-2">Account</h3>
                    <div className="space-y-2">
                        <input type="text" placeholder="Username" className="w-full p-2 rounded bg-gray-800" />
                        <input type="email" placeholder="Email" className="w-full p-2 rounded bg-gray-800" />
                        <input type="password" placeholder="Password" className="w-full p-2 rounded bg-gray-800" />
                    </div>
                </div>

                {/* Preferences */}
                <div>
                    <h3 className="font-semibold mb-2">Preferences</h3>
                    <div className="flex items-center justify-between">
                        <span>Dark Mode</span>
                        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} className="cursor-pointer" />
                    </div>
                    <div className="mt-2">
                        <label className="block mb-1">Language</label>
                        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-2 rounded bg-gray-800">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                        </select>
                    </div>
                </div>

                {/* Save Button */}
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
                    Save Settings
                </button>
            </div>
        </div>
    );
}

export default Settings;
