import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AccountDetails = () => {
  return (
    <div className="max-w-3xl bg-muted rounded-2xl border border-gray-200 ">
      <CardContent className="p-8">
        <h1 className="text-3xl font-bold mb-6">Account Details</h1>
        <div className="space-y-4">
          {/* Email Address */}
          <Card className="border ">
            <CardContent className="">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Email Address</h2>
                  <p className="text-sm">vrvivekpc@gmail.com</p>
                </div>
                <Button variant="outline" className="border-gray-300">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Number */}
          <Card className="border ">
            <CardContent className="">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className=" font-semibold ">Mobile number</h2>
                </div>
                <Button variant="outline" className="border-gray-300">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Password */}
          <Card className="border">
            <CardContent className="">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className=" font-semibold">Password</h2>
                  <p className="">••••••••</p>
                </div>
                <Button variant="outline" className="border-gray-300">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </div>
  );
};

export default AccountDetails;
