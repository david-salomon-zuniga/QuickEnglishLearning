import Link from "next/link";

export default function ProfileButton() {
    return (
        <Link
            href="/dashboard/profile"
            className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center hover:bg-gray-300 transition"
            title="Profile"
        >
            <span className="text-gray-600 font-medium text-sm">👤</span>
        </Link>
    );
}