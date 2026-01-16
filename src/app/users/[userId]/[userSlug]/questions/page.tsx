export const dynamic = "force-dynamic";

import Pagination from "@/components/Pagination";
import QuestionCard from "@/components/QuestionCard";
import {
  answerCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { Query } from "node-appwrite";
import React from "react";

const PAGE_SIZE = 25;

const Page = async ({
  params,
  searchParams,
}: {
  params: { userId: string; userSlug: string };
  searchParams: { page?: string };
}) => {
  const currentPage = Math.max(1, Number(searchParams.page ?? 1));
  const offset = (currentPage - 1) * PAGE_SIZE;

  /* ---------------- Fetch Questions ---------------- */
  const questionsRes = await databases.listDocuments(db, questionCollection, [
    Query.equal("authorId", params.userId),
    Query.orderDesc("$createdAt"),
    Query.offset(offset),
    Query.limit(PAGE_SIZE),
  ]);

  /* ---------------- Empty State ---------------- */
  if (questionsRes.total === 0) {
    return (
      <div className="px-4">
        <p className="text-gray-500">
          This user hasn’t asked any questions yet.
        </p>
      </div>
    );
  }

  /* ---------------- Enrich Questions ---------------- */
  const enrichedQuestions = await Promise.all(
    questionsRes.documents.map(async question => {
      const [author, answersRes, votesRes] = await Promise.all([
        users.get<UserPrefs>(question.authorId),

        databases.listDocuments(db, answerCollection, [
          Query.equal("questionId", question.$id),
        ]),

        databases.listDocuments(db, voteCollection, [
          Query.equal("type", "question"),
          Query.equal("typeId", question.$id),
        ]),
      ]);

      return {
        ...question,
        totalAnswers: answersRes.total,
        totalVotes: votesRes.total,
        author: {
          $id: author.$id,
          name: author.name,
          reputation: Number(author.prefs.reputation ?? 0),
        },
      };
    })
  );

  /* ---------------- Render ---------------- */
  return (
    <div className="px-4">
      <div className="mb-4">
        <p>{questionsRes.total} questions</p>
      </div>

      <div className="mb-4 max-w-3xl space-y-6">
        {enrichedQuestions.map(question => (
          <QuestionCard key={question.$id} ques={question} />
        ))}
      </div>

      <Pagination total={questionsRes.total} limit={PAGE_SIZE} />
    </div>
  );
};

export default Page;
