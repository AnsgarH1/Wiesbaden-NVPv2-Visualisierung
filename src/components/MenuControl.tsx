import { X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export const MenuControl = ({ toggleMenu }: { toggleMenu: () => void }) => (
  <div className="flex gap-10 justify-between items-center w-full">
    <ModeToggle />
    <h1 className="text-lg font-bold ">Ansicht konfigurieren</h1>
    <Button
      variant="outline"
      size="icon"
      aria-label="Menü schließen"
      onClick={toggleMenu}
    >
      <X />
    </Button>
  </div>
);
