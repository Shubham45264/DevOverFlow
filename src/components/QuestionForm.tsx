"use client";

import RTE from "@/components/RTE";
import Meteors from "@/components/magicui/meteors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/Auth";
import { cn } from "@/lib/utils";
import slugify from "@/utils/slugify";
import { IconX } from "@tabler/icons-react";
import { Models, ID } from "appwrite";
import { useRouter } from "next/navigation";
import React from "react";
import { databases, storage } from "@/models/client/config";
import { db, questionAttachmentBucket, questionCollection } from "@/models/name";
import { Confetti } from "@/components/magicui/confetti";

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col space-y-2 overflow-hidden rounded-xl border border-white/20 bg-slate-950 p-4",
        className
      )}
    >
      <Meteors number={30} />
      {children}
    </div>
  );
};

const inputStyles = `
  bg-slate-900
  text-white
  placeholder:text-slate-400
  border-slate-700
  focus-visible:ring-orange-500
`;

const QuestionForm = ({ question }: { question?: Models.Document }) => {
  const { user } = useAuthStore();
  const router = useRouter();

  const [tag, setTag] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [formData, setFormData] = React.useState({
    title: String(question?.title || ""),
    content: String(question?.content || ""),
    authorId: user?.$id,
    tags: new Set((question?.tags || []) as string[]),
    attachment: null as File | null,
  });

  const create = async () => {
    if (!formData.attachment) throw new Error("Please upload an image");

    const file = await storage.createFile(
      questionAttachmentBucket,
      ID.unique(),
      formData.attachment
    );

    return databases.createDocument(db, questionCollection, ID.unique(), {
      title: formData.title,
      content: formData.content,
      authorId: formData.authorId,
      tags: Array.from(formData.tags),
      attachmentId: file.$id,
    });
  };

  const update = async () => {
    if (!question) throw new Error("Invalid question");

    const attachmentId = formData.attachment
      ? (
          await storage.createFile(
            questionAttachmentBucket,
            ID.unique(),
            formData.attachment
          )
        ).$id
      : question.attachmentId;

    return databases.updateDocument(db, questionCollection, question.$id, {
      title: formData.title,
      content: formData.content,
      authorId: formData.authorId,
      tags: Array.from(formData.tags),
      attachmentId,
    });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.authorId) {
      setError("Please fill out all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = question ? await update() : await create();
      router.push(`/questions/${response.$id}/${slugify(formData.title)}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      {error && (
        <LabelInputContainer>
          <p className="text-center text-red-500">{error}</p>
        </LabelInputContainer>
      )}

      {/* TITLE */}
      <LabelInputContainer>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={e =>
            setFormData(prev => ({ ...prev, title: e.target.value }))
          }
          placeholder="e.g. How to debounce search in React?"
          className={inputStyles}
        />
      </LabelInputContainer>

      {/* CONTENT */}
      <LabelInputContainer>
        <Label>Details</Label>
        <RTE
          value={formData.content}
          onChange={v =>
            setFormData(prev => ({ ...prev, content: v || "" }))
          }
        />
      </LabelInputContainer>

      {/* IMAGE */}
      <LabelInputContainer>
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          className={inputStyles}
          onChange={e =>
            setFormData(prev => ({
              ...prev,
              attachment: e.target.files?.[0] || null,
            }))
          }
        />
      </LabelInputContainer>

      {/* TAGS */}
      <LabelInputContainer>
        <Label>Tags</Label>
        <div className="flex gap-4">
          <Input
            value={tag}
            onChange={e => setTag(e.target.value)}
            placeholder="e.g. react nextjs appwrite"
            className={inputStyles}
          />
          <button
            type="button"
            onClick={() => {
              if (!tag) return;
              setFormData(prev => ({
                ...prev,
                tags: new Set([...Array.from(prev.tags), tag]),
              }));
              setTag("");
            }}
            className="rounded bg-slate-700 px-6 text-white hover:bg-slate-600"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from(formData.tags).map(tag => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs text-white"
            >
              {tag}
              <IconX
                size={12}
                className="cursor-pointer"
                onClick={() =>
                  setFormData(prev => ({
                    ...prev,
                    tags: new Set(
                      Array.from(prev.tags).filter(t => t !== tag)
                    ),
                  }))
                }
              />
            </span>
          ))}
        </div>
      </LabelInputContainer>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="h-12 rounded-md bg-orange-500 px-6 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
      >
        {question ? "Update" : "Publish"}
      </button>
    </form>
  );
};

export default QuestionForm;
