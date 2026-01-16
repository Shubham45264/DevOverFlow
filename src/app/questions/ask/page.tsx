import QuestionForm from "@/components/QuestionForm";
import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto px-4 pb-20 pt-36">
      <h1 className="mb-10 text-3xl font-bold">Ask a question</h1>
      <QuestionForm />
    </div>
  );
};

export default Page;
