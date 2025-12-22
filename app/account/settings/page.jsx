"use client";

const Settings = () => {
    const deleteAcc = async () => {
        await fetch("/api/deleteAcc", { method: "POST" });
        // router.replace("/");
    };
    return (
        <div>
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