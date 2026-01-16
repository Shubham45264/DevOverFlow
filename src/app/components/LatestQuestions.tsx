export const dynamic = "force-dynamic";

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

const LatestQuestions = async () => {
  const questions = await databases.listDocuments(db, questionCollection, [
    Query.orderDesc("$createdAt"),
    Query.limit(5),
  ]);

  console.log("Fetched Questions:", questions.total);

  const enrichedQuestions = await Promise.all(
    questions.documents.map(async ques => {
      const [author, answers, votes] = await Promise.all([
        users.get<UserPrefs>(ques.authorId),
        databases.listDocuments(db, answerCollection, [
          Query.equal("questionId", ques.$id),
          Query.limit(1),
        ]),
        databases.listDocuments(db, voteCollection, [
          Query.equal("type", "question"),
          Query.equal("typeId", ques.$id),
          Query.limit(1),
        ]),
      ]);

      return {
        ...ques,
        totalAnswers: answers.total ?? 0,
        totalVotes: votes.total ?? 0,
        author: {
          $id: author.$id,
          reputation: author.prefs.reputation ?? 0,
          name: author.name,
        },
      };
    })
  );

  return (
    <div className="space-y-6">
      {enrichedQuestions.length === 0 ? (
        <p className="text-sm text-gray-500">No questions yet.</p>
      ) : (
        enrichedQuestions.map(question => (
          <QuestionCard key={question.$id} ques={question} />
        ))
      )}
    </div>
  );
};

export default LatestQuestions;
