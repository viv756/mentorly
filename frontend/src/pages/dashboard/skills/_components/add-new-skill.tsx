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

const AddNewSkill = () => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Add new skill</Button>
        </SheetTrigger>
        <SheetContent className="min-w-120">
          <SheetHeader>
            <SheetTitle>Add new skill</SheetTitle>
            <SheetDescription>Enter the details to add your skill</SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto">
            <AddNewSkillForm />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Add new skill</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>Add new skill</DrawerTitle>
          <DrawerDescription>Enter the details to add your skill</DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-4">
          <AddNewSkillForm />
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
