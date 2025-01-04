"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Clock, FileText, MonitorPlay } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Course {
  id: string;
  title: string;
  type: "Course";
  materials: number;
  completion?: number;
  deadline: {
    type: "days" | "hours";
    value: number;
  };
  image: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Mastering UI/UX Design: A Guide",
    type: "Course",
    materials: 5,
    deadline: {
      type: "days",
      value: 1,
    },
    image: "https://placehold.co/400x400",
  },
  {
    id: "2",
    title: "Creating Engaging Learning Journey",
    type: "Course",
    materials: 12,
    completion: 64,
    deadline: {
      type: "hours",
      value: 12,
    },
    image: "https://placehold.co/400x400",
  },
];

export default function LearningProgress() {
  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          In progress learning content
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs">
            i
          </span>
        </h2>
        <Link href="#" className="text-sm text-blue-600 hover:text-blue-800">
          View all
        </Link>
      </div>
      <div className="space-y-4">
        {courses.map((course) => (
          <Card key={course.id} className="p-4">
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={course.image}
                  width={80}
                  height={80}
                  alt=""
                  unoptimized={true} //FIXME: Xóa khi sử dụng ảnh thật
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-50"
                  >
                    <MonitorPlay className="mr-1 h-3 w-3" />
                    {course.type}
                  </Badge>
                </div>
                <h3 className="mb-2 truncate text-lg font-medium">
                  {course.title}
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>{course.materials} Material</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {course.completion ? (
                      <div className="flex items-center gap-2">
                        <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-blue-500">
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                        </div>
                        {course.completion}%
                      </div>
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>
                      {course.deadline.value} {course.deadline.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
