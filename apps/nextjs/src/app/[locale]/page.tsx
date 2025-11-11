import { FaHeart, FaRocket, FaStar } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

import { StoreDemo } from "~/components/store-demo";
import type { Locale } from "~/i18n";
import { getTranslations } from "~/i18n";
import { HydrateClient, prefetch, trpc } from "~/trpc/server";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = getTranslations(locale);

  prefetch(trpc.post.all.queryOptions());

  return (
    <HydrateClient>
      <main className="container min-h-screen py-16">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              {t.home.title}
            </h1>
            <p className="text-xl text-muted-foreground">{t.home.welcome}</p>
            <div className="flex items-center gap-4">
              <FaRocket className="h-8 w-8 text-blue-500" />
              <FaHeart className="h-8 w-8 text-red-500" />
              <FaStar className="h-8 w-8 text-yellow-500" />
              <HiSparkles className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          <StoreDemo />
        </div>
      </main>
    </HydrateClient>
  );
}
