import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, Camera, Check, Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import heroAsset from "@/assets/hero-students.webp.asset.json";
import practiceAsset from "@/assets/practice-collage.webp.asset.json";
import workAsset from "@/assets/student-work.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Curso de Fotografia em Brasília | ETFB" },
      { name: "description", content: "Aprenda fotografia em Brasília com uma escola especializada. Conheça cursos para iniciantes, aperfeiçoamento e especializações." },
      { property: "og:title", content: "Escola Técnica de Fotografia de Brasília" },
      { property: "og:description", content: "Transforme técnica, criatividade e prática em imagens que realmente comunicam." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const phone = "556132240000";
const wa = (message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const paths = [
  ["01", "Começar do zero", "Aprenda os fundamentos e descubra como tirar o máximo da sua câmera."],
  ["02", "Evoluir sua técnica", "Você já fotografa? Aprofunde seus conhecimentos e desenvolva seu olhar."],
  ["03", "Seguir uma especialidade", "Explore moda, estúdio, arquitetura, natureza, fotografia social e outras áreas."],
  ["04", "Usar profissionalmente", "Desenvolva conhecimentos que podem fazer parte da sua trajetória profissional."],
];

const courseGroups = [
  { label: "Começando na fotografia", courses: ["Fotografia Celular", "Introdução à Fotografia Digital — Básico"] },
  { label: "Aperfeiçoando a técnica", courses: ["Fotografia Intermediária", "Fotografia Avançada I", "Fotografia Avançada II"] },
  { label: "Especializações", courses: ["Fotografia de Moda / Book", "Fotografia Arquitetônica", "Fotografia Imobiliária", "Fotografia de Natureza", "Fotografia Industrial", "Fotografia Noturna", "Fotopublicidade", "Fotojornalismo", "Fotografia Social", "Fotografia de Estúdio", "Fotografia Investigativa", "Fotografia Aérea", "Fotografia Hidrodinâmica / Foto Splash"] },
  { label: "Edição", courses: ["Lightroom Classic", "Photoshop Básico"] },
];

const faqs = [
  ["Preciso ter uma câmera?", "Depende do curso. Há também formação em fotografia com celular. Nossa equipe pode orientar você pelo WhatsApp."],
  ["Posso começar do zero?", "Sim. A escola possui caminhos para quem está começando e para quem já fotografa."],
  ["Qual curso devo fazer?", "Isso depende da sua experiência, equipamento e objetivo. Faça o quiz desta página ou converse com a equipe."],
  ["Já fotografo. Qual é o próximo passo?", "Há opções intermediárias, avançadas e especializações. A equipe pode ajudar a identificar o caminho mais adequado."],
  ["Como saber valores e próximas turmas?", "Valores, disponibilidade e calendário mudam. Consulte as informações atuais diretamente pelo WhatsApp."],
];

function track(event: string, data: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Window & { dataLayer?: Record<string, unknown>[]; fbq?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...data });
  w.fbq?.("trackCustom", event, data);
}

function Brand() {
  return (
    <a href="#inicio" className="flex items-center gap-3" aria-label="ETFB — início">
      <span className="grid size-10 place-items-center border border-primary text-primary"><Camera size={20} strokeWidth={1.5} /></span>
      <span className="flex flex-col"><strong className="font-display text-sm leading-none">ETFB</strong><span className="mt-1 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Escola de Fotografia</span></span>
    </a>
  );
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quiz, setQuiz] = useState({ experience: "", equipment: "", objective: "" });
  const [leadState, setLeadState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const whatsapp = (context: string) => {
    track("ClickWhatsApp", { context });
    return wa(`Olá! Vim pelo site e gostaria de conhecer os cursos da Escola Técnica de Fotografia de Brasília. Interesse: ${context}.`);
  };

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLeadState("sending");
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams(window.location.search);
    const { error } = await supabase.from("leads").insert({
      name: String(data.get("name") ?? ""), whatsapp: String(data.get("whatsapp") ?? ""), objective: String(data.get("objective") ?? ""),
      source: "home_form", course_interest: String(data.get("objective") ?? ""),
      utm_source: params.get("utm_source"), utm_medium: params.get("utm_medium"), utm_campaign: params.get("utm_campaign"), utm_content: params.get("utm_content"),
    });
    if (error) { setLeadState("error"); return; }
    setLeadState("done"); track("FormSubmit", { source: "home" }); track("Lead", { source: "home_form" });
    event.currentTarget.reset();
  }

  async function finishQuiz(result: typeof quiz) {
    track("QuizComplete", result);
    window.open(wa(`Olá! Fiz o quiz do site. Já fotografo: ${result.experience}. Equipamento: ${result.equipment}. Objetivo: ${result.objective}. Gostaria de ajuda para escolher um curso.`), "_blank", "noopener,noreferrer");
  }

  const quizQuestions = [
    { key: "experience", title: "Você já fotografa?", options: ["Nunca", "Um pouco", "Já tenho experiência"] },
    { key: "equipment", title: "Qual equipamento utiliza?", options: ["Celular", "Câmera", "Ainda não tenho"] },
    { key: "objective", title: "Qual é o seu objetivo?", options: ["Hobby", "Aprender fotografia", "Aperfeiçoar técnica", "Fotografia profissional", "Uma especialidade específica", "Ainda não sei"] },
  ] as const;
  const currentQuestion = quizQuestions[quizStep] ?? quizQuestions[0];

  return (
    <main id="inicio" className="bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-10">
          <Brand />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
            {[['Cursos','cursos'],['A Escola','escola'],['Professores','professores'],['Dúvidas','duvidas']].map(([label,id]) => <a key={id} href={`#${id}`} className="text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">{label}</a>)}
            <Button asChild><a href={whatsapp("conhecer os cursos")} target="_blank" rel="noreferrer">Quero conhecer os cursos</a></Button>
          </nav>
          <Button variant="outline" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="border-t border-border bg-background px-5 py-6 md:hidden">{[['Cursos','cursos'],['A Escola','escola'],['Professores','professores'],['Dúvidas','duvidas']].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="block border-b border-border py-4 font-display text-xl">{label}</a>)}</nav>}
      </header>

      <section className="relative min-h-[92svh] overflow-hidden pt-16">
        <img src={heroAsset.url} alt="Alunos da escola praticando fotografia em Brasília" className="absolute inset-0 size-full object-cover object-center" fetchPriority="high" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,oklch(0.1_0_0/0.18),oklch(0.1_0_0/0.92))]" />
        <div className="relative mx-auto flex min-h-[calc(92svh-4rem)] max-w-7xl flex-col justify-end px-5 pb-10 lg:px-10 lg:pb-16">
          <div className="mb-5 flex items-center gap-4"><span className="h-px w-10 bg-primary" /><span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">30 anos de tradição</span></div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] sm:text-6xl lg:text-8xl">Seu olhar pode ir muito além de uma fotografia.</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg">Aprenda fotografia com uma escola especializada e transforme técnica, criatividade e prática em imagens que realmente comunicam.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><a href={whatsapp("aprender fotografia")} target="_blank" rel="noreferrer">Quero aprender fotografia <ArrowRight size={17} /></a></Button>
            <Button asChild size="lg" variant="outline"><a href="#cursos">Conhecer os cursos <ArrowDown size={17} /></a></Button>
          </div>
          <p className="mt-4 text-xs text-foreground/60">Fale com nossa equipe e descubra qual curso combina com seu objetivo.</p>
        </div>
      </section>

      <section className="bg-secondary py-20 text-secondary-foreground lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-secondary-foreground/45">Encontre seu ponto de partida</p>
          <h2 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">O que você quer fazer com a fotografia?</h2>
          <div className="mt-14 grid border-t border-secondary-foreground/20 md:grid-cols-2">
            {paths.map(([n,title,text]) => <a href="#cursos" key={n} className="group border-b border-secondary-foreground/20 py-8 md:px-7 md:odd:border-r">
              <span className="text-xs font-bold text-primary">{n}</span><div className="mt-5 flex items-end justify-between gap-5"><div><h3 className="text-xl font-semibold uppercase">{title}</h3><p className="mt-2 max-w-md text-sm leading-relaxed text-secondary-foreground/60">{text}</p></div><ArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" /></div>
            </a>)}
          </div>
          <Button asChild className="mt-10"><a href="#quiz">Encontrar meu caminho</a></Button>
        </div>
      </section>

      <section id="escola" className="overflow-hidden py-20 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div><span className="font-display text-[8rem] font-semibold leading-none text-primary lg:text-[12rem]">30</span><p className="mt-2 text-sm font-bold uppercase tracking-[0.2em]">anos ensinando fotografia em Brasília.</p></div>
          <div className="lg:pt-10"><h2 className="text-4xl font-semibold leading-tight sm:text-6xl">Uma trajetória construída através do ensino, da prática e da paixão pela fotografia.</h2><div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2"><div><strong className="text-sm uppercase text-primary">Escola especializada</strong><p className="mt-2 text-muted-foreground">Um espaço dedicado ao universo da fotografia.</p></div><div><strong className="text-sm uppercase text-primary">Diversos caminhos</strong><p className="mt-2 text-muted-foreground">Para diferentes níveis, interesses e objetivos.</p></div></div></div>
        </div>
      </section>

      <section className="relative min-h-[75svh] overflow-hidden">
        <img src={heroAsset.url} alt="Prática fotográfica ao ar livre em Brasília" loading="lazy" className="absolute inset-0 size-full object-cover object-[42%_center] transition-transform duration-700 hover:scale-[1.02]" />
        <div className="absolute inset-0 bg-background/55" />
        <div className="relative mx-auto flex min-h-[75svh] max-w-7xl flex-col justify-center px-5 lg:px-10"><p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">Luz. Composição. Momento. Intenção.</p><h2 className="max-w-4xl text-5xl font-semibold leading-none sm:text-7xl">Fotografar é aprender a enxergar.</h2><p className="mt-6 max-w-lg text-lg text-foreground/75">Mais do que dominar uma câmera, aprender fotografia é compreender luz, composição, momento e intenção.</p><Button asChild className="mt-8 self-start"><a href={whatsapp("desenvolver meu olhar")} target="_blank" rel="noreferrer">Quero desenvolver meu olhar</a></Button></div>
      </section>

      <section className="bg-secondary py-20 text-secondary-foreground lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-10">
          <div><p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-secondary-foreground/45">Experiência real</p><h2 className="text-5xl font-semibold">Aprenda fazendo.</h2><p className="mt-5 max-w-md text-lg leading-relaxed text-secondary-foreground/65">A fotografia se desenvolve quando conhecimento e prática caminham juntos.</p><div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-bold uppercase tracking-widest"><span>Aluno</span><span>→</span><span>Câmera</span><span>→</span><span>Prática</span><span>→</span><span>Fotografia</span></div></div>
          <img src={practiceAsset.url} alt="Registros reais de alunos em atividades práticas de fotografia" loading="lazy" className="max-h-[720px] w-full object-cover" />
        </div>
      </section>

      <section id="cursos" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-col gap-5 border-b border-border pb-10 md:flex-row md:items-end md:justify-between"><div><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">Formações e cursos</p><h2 className="max-w-3xl text-4xl font-semibold sm:text-6xl">Encontre o curso que combina com você.</h2></div><p className="max-w-sm text-sm text-muted-foreground">Consulte disponibilidade, valores e próximas turmas diretamente com a equipe.</p></div>
          <div className="divide-y divide-border">{courseGroups.map((group, i) => <div key={group.label} className="grid gap-7 py-10 md:grid-cols-[0.7fr_1.3fr]"><div><span className="text-xs text-primary">0{i+1}</span><h3 className="mt-3 text-xl font-semibold uppercase">{group.label}</h3></div><div className="grid gap-x-8 sm:grid-cols-2">{group.courses.map(course => <a key={course} href={wa(`Olá! Vim pelo site e gostaria de saber mais sobre o curso de ${course}.`)} onClick={() => track("CourseInterest", { course })} target="_blank" rel="noreferrer" className="group flex min-h-14 items-center justify-between border-b border-border py-3 text-sm"><span>{course}</span><ArrowRight size={16} className="text-primary transition-transform group-hover:translate-x-1" /></a>)}</div></div>)}</div>
          <p className="mt-8 text-xs text-muted-foreground">Os nomes e a disponibilidade atual dos cursos devem ser confirmados com a equipe antes da publicação final.</p>
        </div>
      </section>

      <section id="quiz" className="bg-primary py-20 text-primary-foreground lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-10"><div><p className="mb-5 text-xs font-bold uppercase tracking-[0.2em]">Orientação personalizada</p><h2 className="text-5xl font-semibold leading-tight">Ainda não sabe qual curso escolher?</h2><p className="mt-5 max-w-lg text-lg">Conte um pouco sobre você e nossa equipe ajuda a encontrar o caminho mais adequado.</p></div>
          <div className="border border-primary-foreground/30 bg-background p-6 text-foreground sm:p-8"><div className="mb-8 flex gap-2">{quizQuestions.map((_, i) => <span key={i} className={`h-1 flex-1 ${i <= quizStep ? "bg-primary" : "bg-muted"}`} />)}</div><p className="text-xs uppercase tracking-widest text-muted-foreground">Pergunta {quizStep + 1} de 3</p><h3 className="mt-3 text-2xl">{currentQuestion.title}</h3><div className="mt-7 grid gap-2">{currentQuestion.options.map(option => <Button key={option} variant="outline" className="justify-between normal-case tracking-normal" onClick={() => { const key = currentQuestion.key; const result = {...quiz, [key]: option}; setQuiz(result); if (quizStep === 0) track("QuizStart"); if (quizStep < 2) setQuizStep(quizStep + 1); else void finishQuiz(result); }}>{option}<ArrowRight size={16} /></Button>)}</div>{quizStep > 0 && <button className="mt-5 text-xs underline" onClick={() => setQuizStep(quizStep - 1)}>Voltar</button>}</div>
        </div>
      </section>

      <section id="professores" className="py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-10"><div className="grid gap-10 lg:grid-cols-2"><div><p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">Professores</p><h2 className="text-4xl font-semibold sm:text-6xl">Aprenda com profissionais da fotografia.</h2></div><div className="border-l border-primary pl-6 text-muted-foreground"><p>Este espaço está preparado para receber fotos, nomes, especialidades e experiências reais do corpo docente.</p><p className="mt-4 text-sm">Nenhuma informação foi inventada. O conteúdo será publicado após confirmação da escola.</p></div></div></div></section>

      <section className="bg-secondary py-20 text-secondary-foreground lg:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-10"><p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-secondary-foreground/45">Produções e referências visuais</p><h2 className="max-w-3xl text-4xl font-semibold sm:text-6xl">Veja a fotografia através de novos olhos.</h2><div className="mt-12 grid gap-3 md:grid-cols-[1.25fr_0.75fr]"><img src={workAsset.url} alt="Composição visual apresentada pela escola como referência fotográfica" loading="lazy" className="h-full max-h-[820px] w-full object-cover" /><div className="grid gap-3"><img src={practiceAsset.url} alt="Alunos em saídas fotográficas" loading="lazy" className="h-full max-h-[500px] w-full object-cover" /><div className="bg-primary p-7"><p className="font-display text-3xl font-semibold">Uma experiência que vai além da sala de aula.</p><p className="mt-4 text-sm">Depoimentos e trabalhos autorais identificados serão incluídos somente após confirmação.</p></div></div></div></div></section>

      <section id="duvidas" className="py-20 lg:py-28"><div className="mx-auto max-w-4xl px-5 lg:px-10"><p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">Dúvidas frequentes</p><h2 className="text-4xl font-semibold sm:text-6xl">Antes de começar, talvez você esteja pensando...</h2><div className="mt-12 divide-y divide-border border-y border-border">{faqs.map(([q,a]) => <details key={q} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-display text-lg font-semibold"><span>{q}</span><span className="text-primary transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 max-w-2xl pr-8 text-sm leading-relaxed text-muted-foreground">{a}</p></details>)}</div></div></section>

      <section className="relative overflow-hidden py-24 lg:py-36"><img src={heroAsset.url} alt="Alunos com câmeras durante atividade prática" loading="lazy" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-background/80" /><div className="relative mx-auto max-w-7xl px-5 lg:px-10"><h2 className="max-w-4xl text-5xl font-semibold leading-tight sm:text-7xl">Talvez esteja na hora de tirar sua fotografia do automático.</h2><p className="mt-6 max-w-xl text-lg text-foreground/70">Conte para nossa equipe o que você procura e descubra qual curso pode fazer sentido para você.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg"><a href={whatsapp("conversar com a escola")} target="_blank" rel="noreferrer">Quero conversar com a escola</a></Button><Button asChild size="lg" variant="outline"><a href="#cursos">Ver cursos</a></Button></div></div></section>

      <section className="bg-secondary py-20 text-secondary-foreground lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-10"><div><p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-secondary-foreground/45">Próximo passo</p><h2 className="text-4xl font-semibold sm:text-6xl">Descubra seu próximo passo na fotografia.</h2><p className="mt-5 max-w-md text-secondary-foreground/60">Deixe seus dados e diga o que você procura. A equipe poderá orientar você.</p></div>
        <form onSubmit={submitLead} onFocus={() => track("FormStart", { source: "home" })} className="space-y-5" aria-label="Formulário de orientação"><label className="block text-xs font-bold uppercase tracking-widest">Nome<input name="name" required minLength={2} className="mt-2 w-full border border-secondary-foreground/20 bg-transparent px-4 py-4 text-base font-normal normal-case outline-none focus:border-primary" /></label><label className="block text-xs font-bold uppercase tracking-widest">WhatsApp<input name="whatsapp" required minLength={8} inputMode="tel" placeholder="(61) 9 0000-0000" className="mt-2 w-full border border-secondary-foreground/20 bg-transparent px-4 py-4 text-base font-normal normal-case outline-none focus:border-primary" /></label><label className="block text-xs font-bold uppercase tracking-widest">Objetivo<select name="objective" required defaultValue="" className="mt-2 w-full border border-secondary-foreground/20 bg-secondary px-4 py-4 text-base font-normal normal-case outline-none focus:border-primary"><option value="" disabled>Escolha uma opção</option><option>Começar do zero</option><option>Aperfeiçoar técnica</option><option>Fotografia profissional</option><option>Uma especialidade</option><option>Ainda não sei</option></select></label><Button type="submit" size="lg" disabled={leadState === "sending"}>{leadState === "sending" ? "Enviando..." : "Quero receber orientação"}</Button>{leadState === "done" && <p className="flex items-center gap-2 text-sm"><Check size={18} /> Recebemos seus dados. Nossa equipe entrará em contato para orientar você.</p>}{leadState === "error" && <p className="text-sm">Não foi possível enviar agora. Você pode falar conosco pelo WhatsApp.</p>}</form></div></section>

      <footer className="border-t border-border px-5 py-14 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between"><div><Brand /><p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">SCS — Quadra 6 — Edifício Carioca — Sala 201, Brasília–DF<br />Fone/WhatsApp: (61) 3224-0000</p></div><div className="text-xs uppercase tracking-widest text-muted-foreground"><a href="https://instagram.com/escoladefotografia.df" target="_blank" rel="noreferrer" className="hover:text-primary">Instagram @escoladefotografia.df</a><p className="mt-4">© 2026 Escola Técnica de Fotografia de Brasília</p></div></div></footer>

      <Button asChild variant="whatsapp" className="fixed inset-x-4 bottom-4 z-50 shadow-2xl md:hidden"><a href={whatsapp("falar com a escola")} target="_blank" rel="noreferrer"><MessageCircle size={19} /> Falar no WhatsApp</a></Button>
    </main>
  );
}