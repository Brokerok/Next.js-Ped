import { redirect } from "next/navigation";
import { headers } from "next/headers";

function getLocale(acceptLang: string): "en" | "uk" | "ru" {
  if (acceptLang.startsWith("uk")) return "uk";
  if (acceptLang.startsWith("ru")) return "ru";
  return "en";
}

export default async function RootPage() {
  const headersList = await headers();
  const acceptLang = headersList.get("accept-language") ?? "";
  redirect(`/${getLocale(acceptLang)}`);
}
