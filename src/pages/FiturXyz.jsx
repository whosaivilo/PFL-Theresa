import { Button } from "@/components/ui/button";
import PageHeader from "../components/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FiturXyz() {
  return (
    <div id="fitur-xyz" className="min-h-screen bg-slate-50 pb-10">
      <div className="p-5">
        <PageHeader title="Fitur XYZ" breadcrumb="Fitur XYZ / Fitur XYZ List" />
        <p className="mb-4">Ini halaman fitur xyz</p>
        
        <div className="flex gap-2 mb-4">
          <Button>TES</Button>
          <Button variant="link">Button Link</Button>
        </div>

        {/* Perbaikan Card Standar */}
        <Card className="p-4 mb-6">
          <CardContent className="p-0">Ini contoh card</CardContent>
        </Card>
      </div>

      {/* Form Login Card */}
      <div className="px-5 flex justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </div>
              {/* Mengganti CardAction dengan Button Link biasa */}
              <Button variant="link" className="p-0 h-auto">Sign Up</Button>
            </div>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-slate-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}