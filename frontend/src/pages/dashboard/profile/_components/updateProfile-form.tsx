import { useEffect } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Upload, User, XIcon } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCurrentUserProfile } from "@/hooks/api/profile/use-get-current-user-profile";
import { useUpdateProfile } from "@/hooks/api/profile/use-update-profile";
import { Spinner } from "@/components/ui/spinner";

const optionalInput = (schema: z.ZodString) => schema.optional().or(z.literal(""));
const avatarSchema = z.union([
  z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "File size must be less than 5MB")
    .refine((file) => file.type.startsWith("image/"), "Only image files are allowed"),

  z.string().url("Avatar must be a valid URL"),
]);

export const formSchema = z.object({
  name: optionalInput(
    z
      .string()
      .min(3, "name must be at least 3 characters.")
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, "Name can only contain letters and spaces."),
  ),
  bio: optionalInput(z.string().max(120, "Bio must be at most 120 characters")),
  aboutMe: optionalInput(
    z
      .string()
      .min(100, "About me must be at least 100 characters")
      .max(1500, "About me must be at most 1500 characters"),
  ),
  location: optionalInput(z.string()),
  socialLinks: z
    .array(
      z.object({
        platform: z.enum(["linkedin", "github", "twitter"]),
        url: z.string().url("Please enter a valid URL"),
      }),
    )
    .optional(),
  avatar: avatarSchema.optional(),
});

const socialLinks = [
  { label: "Linkedin", value: "linkedin" },
  { label: "Github", value: "github" },
  { label: "Twitter", value: "twitter" },
] as const;

const UpdateProfileForm = () => {
  const { data, isLoading } = useGetCurrentUserProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      bio: "",
      aboutMe: "",
      location: "",
      socialLinks: [],
      avatar: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  useEffect(() => {
    if (!data || !data.userProfile) return;
    const profile = data.userProfile;

    form.reset({
      name: profile.userId.name || "",
      bio: profile.bio || "",
      aboutMe: profile.aboutMe || "",
      location: profile.location || "",
      socialLinks: profile.socialLinks || [],
      avatar: profile.avatar || "",
    });
  }, [data, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const payload = new FormData();

    if (data.name) payload.append("name", data.name);
    if (data.bio) payload.append("bio", data.bio);
    if (data.aboutMe) payload.append("aboutMe", data.aboutMe);
    if (data.location) payload.append("location", data.location);
    if (data.socialLinks) payload.append("socialLinks", JSON.stringify(data.socialLinks));
    if (data.avatar) payload.append("avatar", data.avatar);

    updateProfile(payload);
  };

  return (
    <div className="w-full max-w-xl">
      <form id="form-update-profile" onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
        <FieldSet>
          <FieldLegend>Profile Details</FieldLegend>
          <FieldDescription>Update your personal information and preferences.</FieldDescription>
          <Controller
            name="avatar"
            control={form.control}
            render={({ field: controllerField, fieldState }) => (
              <div className="flex flex-col items-center ">
                <div className="flex justify-between items-center w-full">
                  {/* Avatar Preview */}
                  <div className="relative">
                    <div className="w-28 h-28 rounded-xl border-2 border-border overflow-hidden bg-muted flex items-center justify-center">
                      {controllerField.value ? (
                        <img
                          src={
                            typeof controllerField.value === "string"
                              ? controllerField.value
                              : URL.createObjectURL(controllerField.value)
                          }
                          alt="Avatar preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-16 h-16 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Upload Button */}
                  <div className="flex gap-2">
                    <Button
                      className=""
                      type="button"
                      variant="link"
                      onClick={() => document.getElementById("avatar-upload")?.click()}>
                      <Upload className="h-4 w-4" />
                      {controllerField.value ? "Change Avatar" : "Upload Avatar"}
                    </Button>

                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Validate file size (e.g., max 5MB)
                          if (file.size > 5 * 1024 * 1024) {
                            alert("File size must be less than 5MB");
                            return;
                          }
                          controllerField.onChange(file);
                        }
                      }}
                    />
                  </div>
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </div>
            )}
          />

          {/* name filed */}
          <FieldSet>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-update-profile-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="form-update-profile-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Jhon Doe"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="bio"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-update-profile-bio">Intro yourself</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="form-update-profile-bio"
                        placeholder="Passionate bio building intuitive user experiences..."
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align={"block-end"}>
                        <InputGroupText className="tabular-nums">
                          {field?.value?.length}/120 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>

                    <FieldDescription>
                      Write a short headline that describes you or your expertise.
                    </FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <FieldGroup>
            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="form-update-profile-location">Location</FieldLabel>
                  <Input
                    {...field}
                    id="form-update-profile-location"
                    aria-invalid={fieldState.invalid}
                    placeholder="New york"
                    autoComplete="off"
                  />
                  <FieldDescription>Add your location for best matching</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="aboutMe"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-update-profile-aboutMe">About Me</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-update-profile-aboutMe"
                      rows={5}
                      placeholder="Write about your self"
                      className="min-h-50 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align={"block-end"}>
                      <InputGroupText className="tabular-nums">
                        {field?.value?.length}/1500 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Share a brief summary about yourself, your experience, and what you’re currently
                    focused on.
                  </FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldSet>
            <FieldLegend>Add social links</FieldLegend>
            <FieldDescription>Add social links so that people can connect you</FieldDescription>
            <FieldGroup>
              {fields.map((field, index) => (
                <Controller
                  key={field.id}
                  name={`socialLinks.${index}`}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Field>
                      <FieldLabel>Social Link {index + 1}</FieldLabel>
                      <div className="flex gap-2">
                        <Select
                          value={controllerField.value?.platform || "linkedin"}
                          onValueChange={(value) => {
                            controllerField.onChange({
                              ...controllerField.value,
                              platform: value,
                              url: controllerField.value?.url || "",
                            });
                          }}>
                          <SelectTrigger className="bg-background w-45 ">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {socialLinks.map((item, index) => (
                              <SelectItem key={index} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <InputGroup>
                          <InputGroupInput
                            type="url"
                            placeholder={
                              controllerField.value?.platform === "linkedin"
                                ? "linkedin.com/in/username"
                                : controllerField.value?.platform === "github"
                                  ? "github.com/username"
                                  : "twitter.com/username"
                            }
                            value={controllerField.value?.url || ""}
                            onChange={(e) => {
                              controllerField.onChange({
                                ...controllerField.value,
                                platform: controllerField.value?.platform || "linkedin",
                                url: e.target.value,
                              });
                            }}
                            className="flex-1"
                          />

                          <InputGroupAddon align={"inline-end"}>
                            <InputGroupButton
                              type="button"
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => remove(index)}
                              aria-label={`Remove link ${index + 1}`}>
                              <XIcon />
                            </InputGroupButton>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>

                      {fieldState?.error && (
                        <p className="text-sm text-destructive mt-1">{fieldState.error.message}</p>
                      )}
                    </Field>
                  )}
                />
              ))}

              {fields.length < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ platform: "linkedin", url: "" })}
                  className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Social Link
                </Button>
              )}
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <Field orientation="responsive">
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner /> : "Submit"}
            </Button>
          </Field>
        </FieldSet>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
