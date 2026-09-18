import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Camera, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses, type CourseSlug } from "@/lib/course-content";
import heroAsset from "@/assets/hero-students.webp.asset.json";
import practiceAsset from "@/assets/practice-collage.webp.asset.json";

export const Route = createFileRoute("/cursos/$slug")({
  loader: ({ params }) => {
    const course = courses[params.slug as CourseSlug];
    if (!course) throw notFound();
    return course;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.title ?? "Curso de Fotografia"} em Brasília | ETFB` },
    { name: "description", content: loaderData?.intro ?? "Conheça os cursos da Escola Técnica de Fotografia de Brasília." },
    { property: "og:title", content: `${loaderData?.title ?? "Curso de Fotografia"} | ETFB` },
    { property: "og:description", content: loaderData?.intro ?? "Conheça os cursos da ETFB." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CoursePage,
});

function CoursePage() {
  const course = Route.useLoaderData();
  const whatsapp = `https://wa.me/556132240000?text=${encodeURIComponent(`Olá! Vim pelo site e gostaria de receber informações atualizadas sobre ${course.title}.`)}`;
  return <main className="min-h-screen bg-background text-foreground">
    <header className="absolute inset-x-0 top-0 z-20"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10"><a href="/" className="flex items-center gap-3 font-display font-bold"><span className="grid size-10 place-items-center border border-primary text-primary"><Camera size={20} /></span> ETFB</a><Button asChild><a href={whatsapp} target="_blank" rel="noreferrer">Falar com a escola</a></Button></div></header>
    <section className="relative flex min-h-[82svh] items-end overflow-hidden pb-16 pt-28"><img src={heroAsset.url} alt="Alunos da Escola Técnica de Fotografia de Brasília" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-[linear-gradient(to_bottom,oklch(0.1_0_0/0.35),oklch(0.1_0_0/0.94))]" /><div className="relative mx-auto w-full max-w-7xl px-5 lg:px-10"><a href="/#cursos" className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/70"><ArrowLeft size={15} /> Todos os cursos</a><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Curso de fotografia em Brasília</p><h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-none sm:text-7xl">{course.title}</h1><p className="mt-6 max-w-2xl text-lg text-foreground/70">{course.intro}</p><Button asChild size="lg" className="mt-8"><a href={whatsapp} target="_blank" rel="noreferrer">Quero saber mais <ArrowRight size={17} /></a></Button></div></section>
    <section className="bg-secondary py-20 text-secondary-foreground"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-10"><div><p className="text-xs font-bold uppercase tracking-widest text-secondary-foreground/45">Antes de escolher</p><h2 className="mt-5 text-4xl font-semibold sm:text-5xl">Um curso deve fazer sentido para o seu momento.</h2><p className="mt-5 max-w-lg text-secondary-foreground/60">A equipe pode orientar você de acordo com sua experiência, equipamento e objetivo. Conteúdo, calendário, duração e investimento serão informados diretamente pela escola.</p><div className="mt-8 space-y-3">{["Orientação para escolher o caminho", "Informações atualizadas sobre turmas", "Atendimento direto pelo WhatsApp"].map(item => <p key={item} className="flex items-center gap-3 text-sm"><Check size={17} className="text-primary" />{item}</p>)}</div></div><img src={practiceAsset.url} alt="Atividades práticas da escola" loading="lazy" className="max-h-[620px] w-full object-cover" /></div></section>
    <section className="px-5 py-20 text-center lg:px-10"><h2 className="mx-auto max-w-3xl text-4xl font-semibold sm:text-6xl">Pronto para conversar sobre {course.title}?</h2><p className="mx-auto mt-5 max-w-xl text-muted-foreground">Tire suas dúvidas e consulte as informações atuais com a equipe.</p><Button asChild size="lg" className="mt-8"><a href={whatsapp} target="_blank" rel="noreferrer">Conversar no WhatsApp</a></Button></section>
  </main>;
}