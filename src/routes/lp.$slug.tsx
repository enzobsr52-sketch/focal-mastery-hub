import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Camera, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { campaignTitles } from "@/lib/course-content";
import heroAsset from "@/assets/hero-students.webp.asset.json";
import practiceAsset from "@/assets/practice-collage.webp.asset.json";

export const Route = createFileRoute("/lp/$slug")({
  loader: ({ params }) => { const content = campaignTitles[params.slug]; if (!content) throw notFound(); return content; },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.eyebrow ?? "Fotografia em Brasília"} | ETFB` },
    { name: "description", content: "Conheça os caminhos de formação em fotografia da Escola Técnica de Fotografia de Brasília." },
    { property: "og:title", content: loaderData?.title ?? "Fotografia em Brasília | ETFB" },
    { property: "og:description", content: "Converse com a equipe e encontre uma formação alinhada ao seu objetivo." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: LandingPage,
});

function LandingPage() {
  const content = Route.useLoaderData();
  const whatsapp = `https://wa.me/556132240000?text=${encodeURIComponent(`Olá! Vi o anúncio sobre ${content.eyebrow} e gostaria de receber informações.`)}`;
  return <main className="min-h-screen bg-background text-foreground">
    <header className="absolute inset-x-0 top-0 z-20"><div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5"><a href="/" className="flex items-center gap-3 font-display font-bold"><span className="grid size-10 place-items-center border border-primary text-primary"><Camera size={20} /></span> ETFB</a><span className="hidden text-xs uppercase tracking-widest text-foreground/55 sm:block">30 anos de tradição</span></div></header>
    <section className="relative min-h-[88svh] overflow-hidden"><img src={heroAsset.url} alt="Alunos praticando fotografia em Brasília" className="absolute inset-0 size-full object-cover object-center" /><div className="absolute inset-0 bg-[linear-gradient(to_bottom,oklch(0.1_0_0/0.2),oklch(0.1_0_0/0.95))]" /><div className="relative mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-5 pb-14 pt-28"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{content.eyebrow}</p><h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.96] sm:text-7xl">{content.title}</h1><p className="mt-6 max-w-xl text-lg text-foreground/70">Aprenda com uma escola especializada e descubra o caminho mais alinhado ao seu momento.</p><Button asChild size="lg" className="mt-8 self-start"><a href={whatsapp} target="_blank" rel="noreferrer">Quero receber informações <ArrowRight size={17} /></a></Button><p className="mt-4 text-xs text-foreground/55">Atendimento direto com a equipe da escola.</p></div></section>
    <section className="bg-secondary py-20 text-secondary-foreground"><div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-widest text-secondary-foreground/45">Fotografia se aprende fotografando</p><h2 className="mt-5 text-4xl font-semibold sm:text-5xl">Técnica, criatividade e prática.</h2><p className="mt-5 text-secondary-foreground/60">A escola reúne caminhos para quem quer começar, evoluir ou explorar uma especialidade.</p><div className="mt-8 space-y-4">{["Orientação de acordo com seu objetivo", "Formações para diferentes níveis", "Informações atuais direto com a escola"].map(item => <p key={item} className="flex items-center gap-3"><Check size={18} className="text-primary" />{item}</p>)}</div></div><img src={practiceAsset.url} alt="Aulas práticas de fotografia" loading="lazy" className="max-h-[600px] w-full object-cover" /></div></section>
    <section className="px-5 py-20 text-center"><h2 className="mx-auto max-w-3xl text-4xl font-semibold sm:text-6xl">Encontre seu próximo passo na fotografia.</h2><p className="mx-auto mt-5 max-w-xl text-muted-foreground">Converse com a equipe e tire suas dúvidas sobre cursos, turmas e disponibilidade.</p><Button asChild size="lg" variant="whatsapp" className="mt-8"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={19} /> Falar no WhatsApp</a></Button></section>
  </main>;
}