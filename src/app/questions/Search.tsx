"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Search = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = React.useState(
    searchParams.get("search") || ""
  );

  React.useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      newSearchParams.set("search", search.trim());
      newSearchParams.set("page", "1");
    } else {
      newSearchParams.delete("search");
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <form
      className="flex w-full flex-row gap-4"
      onSubmit={handleSearch}
    >
      <Input
        type="text"
        placeholder="Search questions"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="
          bg-white
          text-black
          placeholder:text-gray-500
          focus-visible:ring-orange-500
          dark:bg-zinc-900
          dark:text-white
          dark:placeholder:text-gray-400
        "
      />

      <button
        type="submit"
        className="
          shrink-0
          rounded
          bg-orange-500
          px-4
          py-2
          font-bold
          text-white
          transition
          hover:bg-orange-600
          active:scale-95
        "
      >
        Search
      </button>
    </form>
  );
};

export default Search;
