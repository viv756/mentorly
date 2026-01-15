import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddNewSkillForm from "./add-new-skill-form";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";

const AddNewSkill = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (!isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button>Add new skill</Button>
        </SheetTrigger>
        <SheetContent className="min-w-120">
          <SheetHeader>
            <SheetTitle>Add new skill</SheetTitle>
            <SheetDescription>Enter the details to add your skill</SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto">
            <AddNewSkillForm onClose={ ()=>setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Add new skill</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>Add new skill</DrawerTitle>
          <DrawerDescription>Enter the details to add your skill</DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-4">
          <AddNewSkillForm onClose={ ()=>setOpen(false)}/>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddNewSkill;
