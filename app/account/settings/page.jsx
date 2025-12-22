"use client";

import Header from "@/components/Header";

const Settings = ({ session }) => {
    const deleteAcc = async () => {
        await fetch("/api/deleteAcc", { method: "POST" });
        // router.replace("/");
    };
    return (
        <div>
            <Header session={session}/>
            Settings
            <button
                onClick={deleteAcc}
                className="p-2 bg-indigo-500 rounded-2xl cursor-pointer"
            >
                Delete Account
            </button>
        </div>
    )
}

export default Settings