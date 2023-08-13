import { LoginForm } from "./_components/login-form";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

export default function LoginPage() {
  return (
    <div className="flex justify-center">
      <Card className="w-full lg:w-3/4">
        <CardHeader className="flex justify-center">
          <h1 className="text-xl font-bold">SignIn</h1>
        </CardHeader>

        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </div>
  );
}
