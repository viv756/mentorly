import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  SKILL_CATEGORY,
  SKILL_CATEGORY_ENUM,
  SKILL_LEVEL,
  SKILL_LEVEL_ENUM,
  SKILL_TYPE_ENUM,
} from "@/constant";
import { cn } from "@/lib/utils";
import { useCreateNewSkill } from "@/hooks/api/skills/use-create-new-skill";
import { Spinner } from "@/components/ui/spinner";

// const availabilitySchema = z.object({
//   days: z
//     .array(z.enum(Object.values(WEEK_DAY) as [string, ...string[]]))
//     .min(1, "At least one day is required"),

//   timeSlots: z
//     .array(z.string().regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/, "Invalid time slot"))
//     .min(1, "At least one time slot is required"),
// });

type AddNewSkillFormProps = {
  onClose: () => void;
};

const formSchema = z
  .object({
    skillName: z.string().min(2, { message: "skill name must be at least 2 characters." }),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters")
      .max(150, "Description must be at most 200 characters"),
    skillType: z.enum([SKILL_TYPE_ENUM.LEARN, SKILL_TYPE_ENUM.TEACH]),
    skillLevel: z.enum([
      SKILL_LEVEL_ENUM.BEGINNER,
      SKILL_LEVEL_ENUM.INTERMEDIATE,
      SKILL_LEVEL_ENUM.ADVANCED,
    ]),
    category: z.enum([
      SKILL_CATEGORY_ENUM.BUSINESS,
      SKILL_CATEGORY_ENUM.DESIGN,
      SKILL_CATEGORY_ENUM.EDUCATION,
      SKILL_CATEGORY_ENUM.FITNESS,
      SKILL_CATEGORY_ENUM.HOBBIES,
      SKILL_CATEGORY_ENUM.LANGUAGES,
      SKILL_CATEGORY_ENUM.MUSIC,
      SKILL_CATEGORY_ENUM.PERSONAL_DEVELOPMENT,
      SKILL_CATEGORY_ENUM.TECHNOLOGY,
    ]),
    experienceYears: z.number().int().min(0).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.skillType === SKILL_TYPE_ENUM.TEACH) {
      if (data.experienceYears == null) {
        ctx.addIssue({
          path: ["experienceYears"],
          message: "Experience years is required for teaching skills",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

const AddNewSkillForm = ({ onClose }: AddNewSkillFormProps) => {
  const { mutate: createNewSkill, isPending } = useCreateNewSkill();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      skillName: "",
      description: "",
      category: SKILL_CATEGORY_ENUM.PERSONAL_DEVELOPMENT,
      skillLevel: SKILL_LEVEL_ENUM.BEGINNER,
      skillType: SKILL_TYPE_ENUM.LEARN,
      experienceYears: undefined,
    },
  });

  // for watching skillType to enable or disable experience in years
  const skillType = form.watch("skillType");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const payload = {
      skillName: values.skillName,
      skillType: values.skillType,
      skillLevel: values.skillLevel,
      category: values.category,
      description: values.description,
      experienceYears: values.experienceYears,
    };
    createNewSkill(payload, {
      onSuccess: () => {
        form.reset(form.formState.defaultValues);
        onClose();
      },
    });
  };

  return (
    <div className="px-4">
      <form id="form-create-skill" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="skillName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-create-skill-skillName">Skill name</FieldLabel>
                <Input
                  {...field}
                  id="form-create-skill-skillName"
                  aria-invalid={fieldState.invalid}
                  placeholder="React"
                  required
                  autoComplete="off"
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="skillType"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Skill Type</FieldLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex space-x-2 ">
                  <Label
                    htmlFor="skill-type-learn"
                    className={cn(
                      `text-sm font-normal leading-none cursor-pointer
                        flex items-center space-x-2 rounded-md 
                        shadow-sm border p-2 flex-1 justify-center`,
                      field.value === SKILL_TYPE_ENUM.LEARN && "border-primary!"
                    )}>
                    <RadioGroupItem
                      value={SKILL_TYPE_ENUM.LEARN}
                      id="skill-type-learn"
                      className="border-primary!"
                    />
                    Learn
                  </Label>

                  <Label
                    htmlFor="skill-type-teach"
                    className={cn(
                      `text-sm font-normal leading-none cursor-pointer
                        flex items-center space-x-2 rounded-md 
                        shadow-sm border p-2 flex-1 justify-center`,
                      field.value === SKILL_TYPE_ENUM.TEACH && "border-primary!"
                    )}>
                    <RadioGroupItem
                      value={SKILL_TYPE_ENUM.TEACH}
                      id="skill-type-teach"
                      className="border-primary!"
                    />
                    Teach
                  </Label>
                </RadioGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="skillLevel"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-create-skill-skillLevel">Select skill level</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="select skill level" />
                  </SelectTrigger>
                  <SelectContent side="bottom" position="popper">
                    {SKILL_LEVEL.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-create-skill-description">Description</FieldLabel>
                <Textarea
                  {...field}
                  id="form-create-skill-description"
                  aria-invalid={fieldState.invalid}
                  placeholder="write about the skill"
                  required
                  autoComplete="off"
                />
                <FieldDescription>Write a short description about the skill</FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-create-skill-category">Select category</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="select category" />
                  </SelectTrigger>
                  <SelectContent side="bottom" position="popper">
                    {SKILL_CATEGORY.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {skillType === SKILL_TYPE_ENUM.TEACH && (
            <>
              <Controller
                name="experienceYears"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-create-skill-experience">
                      Years of Experience
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-create-skill-experience"
                      type="number"
                      min="0"
                      aria-invalid={fieldState.invalid}
                      placeholder="5"
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      value={field.value ?? ""}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </>
          )}

          <FieldSeparator />
          <Field orientation="responsive">
            <Button type="submit" className="mb-4" disabled={isPending}>
              {isPending ? <Spinner /> : " Submit"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default AddNewSkillForm;
