export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">FashionHero prototype</h1>
        <p className="text-lg text-foreground/70 max-w-2xl">
          This is a fresh Next.js scaffold ready for your prototype work.
          Edit{" "}
          <code className="bg-foreground/10 px-1.5 py-0.5 rounded font-[family-name:var(--font-geist-mono)] text-sm">
            src/app/page.tsx
          </code>{" "}
          to start, or ask Claude Code to scaffold something for you.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-foreground/[.08] transition-colors flex items-center justify-center hover:bg-foreground/[.05] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js docs
          </a>
          <a
            className="rounded-full border border-solid border-foreground/[.08] transition-colors flex items-center justify-center hover:bg-foreground/[.05] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            shadcn/ui docs
          </a>
        </div>
      </main>
    </div>
  );
}
