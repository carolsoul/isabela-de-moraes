// Trabalhos selecionados: cards da home, páginas /trabalhos/:slug e imagens do Hero.
//
// `brand` aparece na etiqueta do card, `focus` ajusta o enquadramento da imagem
// no card e `thumb` é um recorte quadrado e otimizado (WebP) usado no Hero.
// `summary` é o texto curto do card; os demais campos montam a página do projeto.
//
// Rascunho: `agency`, `role` e `impact` foram escritos a partir da descrição de
// cada projeto e da experiência da Isabela na Agência Fuego — validar com ela
// e trocar por números reais (alcance, público, engajamento) quando houver.
export const projects = [
  {
    slug: 'bioage-truck-skincare',
    title: 'Bioage Truck Skincare',
    brand: 'BioAge',
    category: 'Ativação de marca',
    summary: 'Truck lúdico que levou a hidratação facial da BioAge para o parque.',
    img: '/bioage.png',
    focus: '30% 50%',
    thumb: '/hero/bioage.webp',
    agency: 'Agência Fuego',
    challenge:
      'Apresentar a linha de hidratação facial da BioAge de um jeito leve e memorável, em pleno verão e fora do ponto de venda.',
    idea:
      'Um truck personalizado instalado no parque, com roleta de brindes, testes de hidratação, massagens faciais e sorvetes saudáveis. A ambientação leve conectou produto, verão e bem-estar.',
    role: [
      'Planejamento estratégico da ativação',
      'Concepção criativa e roteiro da experiência',
      'Storytelling alinhado à identidade da marca',
      'Apresentação da proposta ao cliente',
    ],
    impact:
      'A experiência sensorial aproximou o público do produto de forma espontânea, e a presença de influencers levou a ação para além do parque, nas redes.',
    deliverables: ['Conceito', 'Ativação em parque', 'Truck personalizado', 'Ação com influencers'],
  },
  {
    slug: 'cafeteria-conceito-brasil-cacau',
    title: 'Cafeteria Conceito — Brasil Cacau',
    brand: 'Brasil Cacau',
    category: 'PDV · Experiência de marca',
    summary: 'Cafeteria conceito que leva a marca para um novo momento de consumo.',
    img: '/brasilcacau.png',
    focus: '45% 50%',
    thumb: '/hero/brasilcacau.webp',
    agency: 'Agência Fuego',
    challenge:
      'Levar a Brasil Cacau para além da loja de chocolates, posicionando a marca em um novo ambiente e gerando valor agregado ao consumo.',
    idea:
      'Uma cafeteria conceito acolhedora, com cafés inspirados nos chocolates da marca e espaços para leitura, descanso e encontros.',
    role: [
      'Planejamento e conceito do ponto de venda',
      'Pesquisa de tendências de mercado',
      'Narrativa de marca para o novo ambiente',
      'Elaboração da apresentação da proposta',
    ],
    impact:
      'O chocolate deixa de ser só produto e vira experiência: um território novo para a marca, com mais tempo de permanência e conexão com o público.',
    deliverables: ['Conceito de PDV', 'Experiência de consumo', 'Apresentação comercial'],
  },
  {
    slug: 'encontro-corporativo-daiichi-sankyo',
    title: 'Encontro Corporativo Daiichi Sankyo',
    brand: 'Daiichi Sankyo',
    category: 'Evento corporativo · Cenografia',
    summary: 'Cenografia inspirada no Kaizen para um encontro interno de equipes.',
    img: '/daiichi.png',
    focus: '50% 50%',
    thumb: '/hero/daiichi.webp',
    agency: 'Agência Fuego',
    challenge:
      'Traduzir os valores da Daiichi Sankyo em um ambiente que inspirasse os colaboradores durante um encontro interno.',
    idea:
      'Conceito e cenografia inspirados na cultura japonesa e no Kaizen, a filosofia da melhoria contínua, valorizando o desenvolvimento das equipes.',
    role: [
      'Criação do conceito criativo',
      'Roteirização do encontro',
      'Coordenação de cronograma entre criação e produção',
    ],
    impact:
      'Valores institucionais viraram experiência para quem está dentro da empresa, reforçando a cultura da marca no próprio espaço do evento.',
    deliverables: ['Conceito', 'Cenografia', 'Roteiro do evento'],
  },
  {
    slug: 'estande-bettanin',
    title: 'Estande Bettanin',
    brand: 'Bettanin',
    category: 'Feira de varejo · Estande',
    summary: 'Estande lúdico e gamificado na maior feira de varejo do país.',
    img: '/bettanin.png',
    focus: '28% 50%',
    thumb: '/hero/bettanin.webp',
    agency: 'Agência Fuego',
    challenge:
      'Dar destaque a produtos do dia a dia, como vassouras, rodos e sacos de lixo, em meio a centenas de marcas na maior feira de varejo do país.',
    idea:
      'Um estande lúdico e inovador, com vitrines dinâmicas, cores vibrantes e totens com gamificação virtual que traduzem a essência da marca no espaço.',
    role: [
      'Planejamento estratégico do estande',
      'Concepção criativa da experiência gamificada',
      'Pesquisa de tendências para embasar a proposta',
    ],
    impact:
      'Produtos funcionais ganharam protagonismo: a gamificação convidou o público a parar, interagir e lembrar da marca.',
    deliverables: ['Conceito', 'Cenografia', 'Gamificação', 'Vitrines'],
  },
  {
    slug: 'loreal-brandstorm',
    title: 'Evento L’Oréal Brandstorm',
    brand: 'L’Oréal',
    category: 'Evento interno · Ambientação',
    summary: 'Sede ambientada para engajar estudantes na competição Brandstorm.',
    img: '/loreal.png',
    focus: '50% 50%',
    thumb: '/hero/loreal.webp',
    agency: 'Agência Fuego',
    challenge:
      'Receber estudantes na sede da L’Oréal com foco em empregabilidade e inovação, mantendo o engajamento durante toda a competição.',
    idea:
      'Ambientação com estandes, totens, adesivos vinílicos e espaços instagramáveis, além da estrutura para a premiação.',
    role: [
      'Planejamento da ambientação e da jornada no evento',
      'Concepção dos espaços instagramáveis',
      'Coordenação de entregas entre criação e produção',
    ],
    impact:
      'Os espaços instagramáveis estenderam a experiência para as redes dos participantes, reforçando a marca empregadora junto aos jovens talentos.',
    deliverables: ['Ambientação', 'Espaços instagramáveis', 'Estrutura de premiação'],
  },
  {
    slug: 'tour-workshop-celmar',
    title: 'Tour e Workshop Fábrica Celmar',
    brand: 'Celmar',
    category: 'Experiência de marca · Tour',
    summary: 'Galpão industrial transformado em exposição e tour para arquitetos.',
    img: '/celmar.png',
    focus: '40% 50%',
    thumb: '/hero/celmar.webp',
    agency: 'Agência Fuego',
    challenge: 'Como transformar um galpão industrial em uma exposição?',
    idea:
      'O ambiente foi delimitado com paletes, criando uma área de exibição para revestimentos, pisos e móveis, com moodboards de aplicação e um tour guiado que começa em um pórtico com retratos e a história da Celmar.',
    role: [
      'Planejamento da experiência e do roteiro do tour',
      'Storytelling da história da marca no pórtico',
      'Elaboração da proposta e da apresentação',
    ],
    impact:
      'Arquitetos, público decisivo para a marca, viveram os materiais em contexto: da história da fábrica à aplicação nos próprios projetos.',
    deliverables: ['Exposição', 'Moodboards', 'Tour guiado', 'Pórtico histórico'],
  },
];
