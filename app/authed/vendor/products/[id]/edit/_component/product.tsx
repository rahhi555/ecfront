import { Image } from "@nextui-org/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { MdShoppingCart } from "react-icons/md";
import { Button } from "@nextui-org/button";
import { serverApi } from "@/hooks/useApi";

export async function Product({ id }: { id: number }) {
  const { data } = await serverApi().GET("/products/{id}", {
    params: { path: { id } },
  });

  return (
    <div className="flex">
      <div className="w-1/2 flex-shrink-0">
        <Image
          height={500}
          width={600}
          alt="商品サムネイル"
          src={data?.thumbnailUrl}
          fallbackSrc="/noimage.png"
        />
      </div>

      <Card className="mx-8 w-full" shadow="none">
        <CardHeader>
          <div className="flex justify-between text-xl font-bold">
            <p>{data?.name}</p>
            <p>{data?.price}円</p>
          </div>
        </CardHeader>

        <CardBody>
          <p>{data?.description}</p>
        </CardBody>

        <CardFooter className="flex justify-around">
          <Chip startContent={<MdShoppingCart />} className="px-2" size="lg">
            残 {data?.stock}
          </Chip>

          <Button>
            <p>編集</p>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
