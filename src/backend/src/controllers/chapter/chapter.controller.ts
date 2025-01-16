import { Request, Response } from "express";
import { db } from "../../config/db";

class ChapterController {
  getChapters = async (req: Request, res: Response) => {
    try {
      const { courseId } = req.params;
      const chapters = await db.chapter.findMany({
        where: { courseId },
        orderBy: { position: "asc" },
      });
      res.json(chapters);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  createChapter = async (req: Request, res: Response) => {
    try {
      const { courseId } = req.params;
      const { title, description, position, isPublished } = req.body;

      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }

      const chapter = await db.chapter.create({
        data: {
          title,
          description,
          position,
          isPublished,
          courseId,
        },
      });

      res.status(201).json(chapter);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getChapter = async (req: Request, res: Response) => {
    try {
      const { courseId, chapterId } = req.params;
      const chapter = await db.chapter.findFirst({
        where: {
          id: chapterId,
          courseId,
        },
      });

      if (!chapter) {
        return res.status(404).json({ message: "Chapter not found" });
      }
      res.json(chapter);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  updateChapter = async (req: Request, res: Response) => {
    try {
      const { courseId, chapterId } = req.params;
      const chapter = await db.chapter.update({
        where: {
          id: chapterId,
          courseId,
        },
        data: req.body,
      });
      res.json(chapter);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  updateChapterPosition = async (req: Request, res: Response) => {
    try {
      const { courseId, chapterId } = req.params;
      const { position } = req.body;

      const chapter = await db.chapter.findFirst({
        where: {
          id: chapterId,
          courseId,
        },
      });

      if (!chapter) {
        return res.status(404).json({ message: "Chapter not found" });
      }

      // Get all chapters to reorder
      const chapters = await db.chapter.findMany({
        where: { courseId },
        orderBy: { position: "asc" },
      });

      // Remove the chapter from its current position
      const chapterIndex = chapters.findIndex((c: any) => c.id === chapterId);
      chapters.splice(chapterIndex, 1);

      // Insert the chapter at the new position
      chapters.splice(position, 0, chapter);

      // Update all positions in a transaction
      await db.$transaction(
        chapters.map((chapter: any, index: number) =>
          db.chapter.update({
            where: { id: chapter.id },
            data: { position: index },
          })
        )
      );

      const updatedChapter = await db.chapter.findFirst({
        where: {
          id: chapterId,
          courseId,
        },
      });

      res.json(updatedChapter);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteChapter = async (req: Request, res: Response) => {
    try {
      const { courseId, chapterId } = req.params;

      // Delete the chapter
      await db.chapter.delete({
        where: {
          id: chapterId,
          courseId,
        },
      });

      // Reorder remaining chapters
      const remainingChapters = await db.chapter.findMany({
        where: { courseId },
        orderBy: { position: "asc" },
      });

      await db.$transaction(
        remainingChapters.map((chapter: any, index: number) =>
          db.chapter.update({
            where: { id: chapter.id },
            data: { position: index },
          })
        )
      );

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default new ChapterController();
