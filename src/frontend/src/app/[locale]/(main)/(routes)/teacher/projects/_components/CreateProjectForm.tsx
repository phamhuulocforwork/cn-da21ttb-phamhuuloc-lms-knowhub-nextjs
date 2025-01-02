"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { MultiSelect } from "@/components/ui/MultiSelect";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  categoryIds: z.array(z.string()).min(1, {
    message: "At least one category is required",
  }),
});

type CreateProjectFormValues = z.infer<typeof formSchema>;

interface Category {
  id: string;
  name: string;
}

export function CreateProjectForm() {
  const t = useTranslations("teacher.projects.create");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Category 1",
    },
    {
      id: "2",
      name: "Category 2",
    },
  ]);

  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      categoryIds: [],
    },
  });

  const onSubmit = async (values: CreateProjectFormValues) => {
    try {
      setLoading(true);
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("thumbnail")}</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("title")}</FormLabel>
              <FormControl>
                <Input disabled={loading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("description")}</FormLabel>
              <FormControl>
                <Textarea disabled={loading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("categories")}</FormLabel>
              <FormControl>
                <MultiSelect
                  disabled={loading}
                  options={categories.map((category) => ({
                    label: category.name,
                    value: category.id,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {t("create")}
        </Button>
      </form>
    </Form>
  );
}
