import { CreateProjectForm } from "../_components/CreateProjectForm";

export default function CreateProjectPage() {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create New Project</h1>
        <p className="text-muted-foreground">
          Create a new project to organize your courses, quizzes and wikis.
        </p>
      </div>
      <CreateProjectForm />
    </div>
  );
}
