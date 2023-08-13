"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { SignInOutButton } from "@/components/signin-out-button";

export function NavBarDropDown() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" variant="light">
        <DropdownItem key="signin-out" className="hover:bg-none">
          <SignInOutButton className="w-full" />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
