import { Breadcrumb } from "./breadcrumb";
import { Title } from "./title";

type Props = {
  items: { label: string; href: string }[];
  title: string;
};

export function NavbarBottom({ items, title }: Props) {
  return (
    <div className="mb-8">
      <div className="mb-11">
        <Breadcrumb items={items} />
      </div>

      <div>
        <Title title={title} />
      </div>
    </div>
  );
}
