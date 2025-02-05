import BackgroundPaths from "@/components/home/BackgroundPaths";
import { ContentLayout } from "@/components/painel/content-layout";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "To do List",
  description: "Gerador de lista de tarefas",
};
 
export default function HomePage() {
  return (
      <ContentLayout title="Home">
      <BackgroundPaths />
      </ContentLayout>

  )
}