import { LoginForm } from "@/components/LoginForm";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

export default function Login() {
  return (
    <div className="flex justify-center">
      <Card className="lg:w-3/4">
        <CardHeader className="flex justify-center">
          <h1 className="text-xl font-bold">Login</h1>
        </CardHeader>

        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </div>
  );
}
