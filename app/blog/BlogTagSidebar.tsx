import Link from "next/link";

interface TagWithCount {
  readonly id: string;
  readonly name: string;
  readonly count: number;
}

interface BlogTagSidebarProps {
  readonly tags: readonly TagWithCount[];
  readonly totalCount: number;
  /** 現在選択中のタグID（未選択は空文字）。サーバーで searchParams から解決して渡す */
  readonly currentTag: string;
}

// サーバーコンポーネント。currentTag を props で受け取り、useSearchParams によるSSRデオプトを避ける。
export function BlogTagSidebar({ tags, totalCount, currentTag }: BlogTagSidebarProps) {
  const itemClass = (active: boolean) =>
    `flex shrink-0 items-center justify-between gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer lg:w-full lg:rounded-lg lg:px-3 ${
      active
        ? "bg-[#B37A4C] font-bold text-[#FFFDF9]"
        : "border border-[#E4D6C3] bg-[#FFFDF9] text-[#6E5B4A] hover:border-[#B37A4C] hover:text-[#B37A4C] lg:border-transparent lg:bg-transparent lg:hover:border-[#E4D6C3]"
    }`;

  return (
    <nav className="lg:sticky lg:top-24">
      <h2 className="mb-3 hidden text-sm font-bold tracking-wide text-[#8A7461] lg:block">
        タグでさがす
      </h2>
      <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
        <li>
          <Link href="/blog" className={itemClass(currentTag === "")}>
            すべての記事
            <span className="text-xs opacity-70">{totalCount}</span>
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link
              href={`/blog?tag=${tag.id}`}
              className={itemClass(currentTag === tag.id)}
            >
              {tag.name}
              <span className="text-xs opacity-70">{tag.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
