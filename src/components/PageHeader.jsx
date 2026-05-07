
export default function PageHeader({ title, breadcrumb, children }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm mb-6 rounded-xl">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900">
          {title} <b className="text-hijau">.</b>
        </h1>
        <div className="flex items-center text-sm font-medium text-gray-400 mt-1">
         
          {Array.isArray(breadcrumb) 
            ? breadcrumb.join(" / ") 
            : breadcrumb || "Home / Dashboard"}
        </div>
      </div>
      
      
      <div className="flex items-center space-x-3">
        {children}
      </div>
    </div>
  );
}