import PageHeader from "../components/PageHeader";

export default function Customers() {
  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <PageHeader
        title="Customer"
        breadcrumb="Dashboard / Customer List"
        buttonText="Add New Customer"
      />

      <div className="p-5">
        <div className="bg-white rounded-xl shadow-md p-8 border border-slate-100">
         
        </div>
      </div>
    </div>
  );
}
