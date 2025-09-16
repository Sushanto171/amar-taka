import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router";

export default function UnAuthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-3">
            <ShieldAlert className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold ">
            Access Denied
          </CardTitle>
          <CardDescription className="">
            You don’t have permission to view this page.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm ">
            If you think this is a mistake, please contact the administrator.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button onClick={() => navigate("/")} className="rounded-xl">
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
