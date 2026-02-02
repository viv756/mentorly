import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AccountManagement = () => {
  return (
    <Card className="max-w-3xl rounded-2xl border bg-muted ">
      <CardContent className="p-8 ">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Account Management</h1>
          <p className="">Manage your account settings and session</p>
        </div>

        {/* Logout Section */}
        <Card className="border border-gray-200 mb-6">
          <CardContent className="px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <LogOut className="w-6 h-6 mt-1" />
                <div>
                  <h2 className="text-md  font-semibold mb-1">Logout</h2>
                  <p className="text-gray-600">Sign out of your Topmate account</p>
                </div>
              </div>
              <Button variant="outline" className="border-gray-300">
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Delete Account Section */}
        <Card className="border-2 border-red-300 bg-red-50/30">
          <CardContent className="">
            <h2 className="text-lg font-semibold text-red-600 mb-1">Delete Account</h2>
            <p className="mb-6">
              Once you delete your account, there is no going back. This will permanently delete
              your profile, services, and all associated data.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white">Delete my account</Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default AccountManagement;
