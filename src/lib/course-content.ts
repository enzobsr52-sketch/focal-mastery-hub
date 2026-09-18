export const courses = {
  "fotografia-celular": { title: "Fotografia Celular", intro: "Desenvolva seu olhar e explore os recursos do equipamento que está sempre com você." },
  "fotografia-digital-basico": { title: "Introdução à Fotografia Digital — Básico", intro: "Um ponto de partida para compreender os fundamentos da fotografia digital." },
  "fotografia-intermediaria": { title: "Fotografia Intermediária", intro: "Aprofunde técnica, linguagem e prática para evoluir suas imagens." },
  "fotografia-avancada-i": { title: "Fotografia Avançada I", intro: "Avance no domínio técnico e na construção de uma linguagem fotográfica." },
  "fotografia-avancada-ii": { title: "Fotografia Avançada II", intro: "Continue desenvolvendo repertório, intenção e consistência fotográfica." },
  "fotografia-moda-book": { title: "Fotografia de Moda / Book", intro: "Explore o universo da imagem de moda e da produção de books." },
  "fotografia-arquitetonica": { title: "Fotografia Arquitetônica", intro: "Aprenda a observar e representar espaços, volumes e linhas." },
  "fotografia-imobiliaria": { title: "Fotografia Imobiliária", intro: "Desenvolva imagens voltadas à apresentação de ambientes e imóveis." },
  "fotografia-natureza": { title: "Fotografia de Natureza", intro: "Explore paisagens, detalhes e a relação entre luz e ambiente natural." },
  "fotografia-industrial": { title: "Fotografia Industrial", intro: "Conheça possibilidades visuais aplicadas a ambientes e processos industriais." },
  "fotografia-noturna": { title: "Fotografia Noturna", intro: "Explore a luz disponível e as possibilidades criativas da fotografia à noite." },
  fotopublicidade: { title: "Fotopublicidade", intro: "Construa imagens pensadas para comunicar produtos, ideias e marcas." },
  fotojornalismo: { title: "Fotojornalismo", intro: "Desenvolva um olhar atento para narrar acontecimentos através da imagem." },
  "fotografia-social": { title: "Fotografia Social", intro: "Explore o registro de pessoas, encontros e acontecimentos sociais." },
  "fotografia-estudio": { title: "Fotografia de Estúdio", intro: "Conheça as possibilidades de criação e controle da luz em estúdio." },
  "fotografia-investigativa": { title: "Fotografia Investigativa", intro: "Conheça aplicações técnicas da imagem em contextos investigativos." },
  "fotografia-aerea": { title: "Fotografia Aérea", intro: "Explore novas perspectivas e composições a partir da fotografia aérea." },
  "foto-splash": { title: "Fotografia Hidrodinâmica / Foto Splash", intro: "Explore movimento, precisão e criatividade em imagens com líquidos." },
  "lightroom-classic": { title: "Lightroom Classic", intro: "Organize e desenvolva suas fotografias em um fluxo de edição consistente." },
  "photoshop-basico": { title: "Photoshop Básico", intro: "Conheça ferramentas fundamentais para tratamento e edição de imagens." },
} as const;

export type CourseSlug = keyof typeof courses;

export const slugByCourse = Object.fromEntries(
  Object.entries(courses).map(([slug, course]) => [course.title, slug]),
) as Record<string, CourseSlug>;

export const campaignTitles: Record<string, { title: string; eyebrow: string }> = {
  fotografia: { title: "Aprenda fotografia em Brasília.", eyebrow: "Seu próximo passo começa aqui" },
  "fotografia-iniciante": { title: "Comece a fotografar com intenção.", eyebrow: "Fotografia para iniciantes" },
  "fotografia-celular": { title: "Seu melhor equipamento pode estar no seu bolso.", eyebrow: "Fotografia com celular" },
  "fotografia-profissional": { title: "Leve sua fotografia mais longe.", eyebrow: "Aperfeiçoamento fotográfico" },
  "fotografia-imobiliaria": { title: "Espaços bem fotografados comunicam melhor.", eyebrow: "Fotografia imobiliária" },
  "fotografia-moda": { title: "Transforme conceito, direção e luz em imagem.", eyebrow: "Fotografia de moda" },
  "fotografia-estudio": { title: "Entenda a luz. Construa a imagem.", eyebrow: "Fotografia de estúdio" },
};