import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

/* -------------------- HELPERS -------------------- */
async function updateReputation(userId: string, delta: number) {
  const user = await users.get(userId);

  const current = parseInt(
    String(user.prefs?.reputation ?? "0"),
    10
  );

  const next = Math.max(current + delta, 0);

  await users.updatePrefs(userId, {
    ...user.prefs,
    reputation: String(next),
  });
}

/* -------------------- POST: Create Answer -------------------- */
export async function POST(request: NextRequest) {
  try {
    const { questionId, answer, authorId } = await request.json();

    const response = await databases.createDocument(
      db,
      answerCollection,
      ID.unique(),
      {
        content: answer,
        authorId,
        questionId,
      }
    );

    await updateReputation(authorId, +1);

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Error creating answer" },
      { status: error?.status || error?.code || 500 }
    );
  }
}

/* -------------------- DELETE: Delete Answer -------------------- */
export async function DELETE(request: NextRequest) {
  try {
    const { answerId } = await request.json();

    const answer = await databases.getDocument(
      db,
      answerCollection,
      answerId
    );

    const response = await databases.deleteDocument(
      db,
      answerCollection,
      answerId
    );

    await updateReputation(answer.authorId, -1);

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Error deleting the answer" },
      { status: error?.status || error?.code || 500 }
    );
  }
}
