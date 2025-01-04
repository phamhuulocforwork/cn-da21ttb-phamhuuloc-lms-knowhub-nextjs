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
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { categoryService } from "@/services/categoryService";
import { projectService } from "@/services/projectService";

import MultipleSelector, { Option } from "@/components/ui/MultipleSelector";

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

export function CreateProjectForm() {
  const t = useTranslations("teacher.projects.create");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Option[]>([]);

  const fetchCategories = useCallback(async (search: string = "") => {
    const { categories } = await categoryService.getCategories({
      page: 1,
      limit: 10,
      search,
    });

    const mappedCategories = categories.map((category) => ({
      label: category.name,
      value: category.id,
    }));

    setCategories(mappedCategories);
    return mappedCategories;
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "https://placehold.co/600x400",
      categoryIds: [],
    },
  });

  const onSubmit = async (values: CreateProjectFormValues) => {
    try {
      setLoading(true);
      await projectService.createProject(values);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* //TODO: add thumbnail */}

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
                <MultipleSelector
                  disabled={loading}
                  defaultOptions={categories}
                  onSearch={fetchCategories}
                  triggerSearchOnFocus={true}
                  value={
                    field.value
                      .map((id) => categories.find((cat) => cat.value === id))
                      .filter(Boolean) as Option[]
                  }
                  onChange={(selected) => {
                    field.onChange(selected.map((opt) => opt.value));
                  }}
                  placeholder={t("categories")}
                  emptyIndicator={t("no_results")}
                  options={categories}
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
