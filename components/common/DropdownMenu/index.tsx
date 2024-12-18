import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu as OriginDropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useId } from "react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  disabled?: boolean;
  items?: MenuItem[];
  onClick?: () => void;
}

interface DropdownMenuProps {
  label?: string;
  menuItemsGroups: MenuItem[][];
  children: React.ReactNode;
  align?: "start" | "center" | "end";
}

const renderItem = (item: MenuItem, dir = "rtl") => {
  const id = useId();
  if (item.items) {
    return (
      <DropdownMenuSub key={id}>
        <DropdownMenuSubTrigger>
          {item.icon}
          <span>{item.label}</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            {item.items.map((subItem) => {
              return renderItem(subItem);
            })}
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    );
  }
  return (
    <DropdownMenuItem
      disabled={item.disabled}
      key={id}
      dir={dir}
      onClick={item.onClick}
    >
      {item.icon}
      <span>{item.label}</span>
      {item.shortcut && (
        <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
      )}
    </DropdownMenuItem>
  );
};

const renderGroup = (group: MenuItem[], needSeparator = false) => {
  const id = useId();
  return (
    <div key={id}>
      <DropdownMenuGroup key={id}>
        {group.map((item) => {
          return renderItem(item);
        })}
      </DropdownMenuGroup>
      {needSeparator && <DropdownMenuSeparator />}
    </div>
  );
};
export function DropdownMenu(props: DropdownMenuProps) {
  const { label, menuItemsGroups, children, align } = props;
  return (
    <OriginDropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>{" "}
            <DropdownMenuSeparator />
          </>
        )}

        {menuItemsGroups.map((group, index) => {
          return renderGroup(group, index !== menuItemsGroups.length - 1);
        })}
      </DropdownMenuContent>
    </OriginDropdownMenu>
  );
}
