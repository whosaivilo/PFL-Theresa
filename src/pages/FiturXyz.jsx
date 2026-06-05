
import { Button } from "@/components/ui/button";
import PageHeader from "../components/PageHeader";
import Card from "@/components/Card";

export default function FiturXyz() {
    return (
        <div id="fitur-xyz" className="min-h-screen bg-slate-50 pb-10">
      
            <div className="p-5">
                <PageHeader title="Fitur XYZ" breadcrumb="Fitur XYZ / Fitur XYZ List" />
                <p>Ini halaman fitur xyz</p>
                <Button>TES</Button>
                <Button variant="link">Button Link</Button>
                

                <Card>Ini contoh card</Card>
            </div>
        </div> 
    );
}