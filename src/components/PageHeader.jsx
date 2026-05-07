
export default function PageHeader({ title, breadcrumb, buttonText }) {
    return (
        <div id="#pageheader-container" className="flex items-center justify-between p-4">
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold">
                    {/* Menggunakan prop title */}
                    {title || "Dashboard"}
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    <span id="breadcrumb-current" className="text-gray-500">
                        {/* Menggunakan prop breadcrumb */}
                        {breadcrumb || "Home / Dashboard"}
                    </span>
                </div>
            </div>
            <div id="action-button">
                <button id="add-button" className="bg-[#00b67a] text-white px-4 py-2 rounded-lg transition-hover hover:bg-[#00a36d]">
                    {/* Menggunakan prop buttonText */}
                    {buttonText || "Add Button"}
                </button>
            </div>
        </div>
    );
}