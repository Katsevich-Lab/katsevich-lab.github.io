import eugenePhoto from "../../images/teampic/Eugene_Katsevich_square.jpg";
import ziangPhoto from "../../images/teampic/ziang-niu.jpeg";
import louisPhoto from "../../images/teampic/louis-deutsch.jpeg";
import timPhoto from "../../images/teampic/tim-barry.jpeg";
import abhinavPhoto from "../../images/teampic/abhinav-chakraborty.jpeg";
import jeffPhoto from "../../images/teampic/jeff-zhang.jpeg";
import jyotishkaPhoto from "../../images/teampic/jyotishka-ray-choudhury.jpeg";
import sceptreLogo from "../../images/softwarepic/sceptre-hex.png";
import perturbPlanLogo from "../../images/softwarepic/perturbplan-hex.png";
import ondiscLogo from "../../images/softwarepic/ondisc-hex.png";
import type { ImageMetadata } from "astro";

export type Link = { label: string; href: string };

export type ResearchPillar = {
  number: "01" | "02" | "03";
  title: string;
  short: string;
  question: string;
  description: string;
  work: string[];
  accent: "teal" | "coral" | "gold";
};

export type Person = {
  name: string;
  role: string;
  affiliation?: string;
  description: string;
  themes: string[];
  links?: Link[];
  image?: ImageMetadata;
  imagePosition?: string;
  initials?: string;
  note?: string;
};

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  status: "Working manuscript" | "Under review" | "Published";
  area: "Genomics" | "Statistics" | "Imaging";
  links?: Link[];
  featured?: boolean;
  takeaway?: string;
};

export type SoftwareItem = {
  name: string;
  label: string;
  description: string;
  detail?: string;
  tags: string[];
  links: Link[];
  logo?: ImageMetadata;
  accent?: "teal" | "coral";
};

export type Update = {
  date: string;
  title: string;
  text: string;
  href: string;
};

export type FundingItem = {
  name: string;
  funder: string;
  award?: string;
  period: string;
  href: string;
};

export type Funding = {
  current: FundingItem[];
  past: FundingItem[];
};

export const navItems = [
  { label: "Research", href: "/research/" },
  { label: "People", href: "/people/" },
  { label: "Software", href: "/software/" },
  { label: "Publications", href: "/publications/" },
  { label: "Join", href: "/join/" }
] satisfies Link[];

export const researchPillars = [
  {
    number: "01",
    title: "Single-cell CRISPR analysis",
    short: "From noisy guide counts to reliable regulatory discoveries.",
    question: "Which perturbations change which genes—and can we trust the signal?",
    description:
      "We build statistically calibrated methods for guide assignment, quality control, association testing, and differential expression in single-cell CRISPR screens.",
    work: ["sceptre", "Scalable Perturb-seq analysis", "Guide-assignment benchmarking"],
    accent: "teal"
  },
  {
    number: "02",
    title: "Experimental design",
    short: "Planning perturbational experiments for power, cost, and scale.",
    question: "How should a screen be designed before the first cell is sequenced?",
    description:
      "We translate experimental choices—cells, guides, sequencing depth, effect sizes, and multiplicity—into interpretable power and cost tradeoffs.",
    work: ["PerturbPlan", "Perturb-seq and TAP-seq design", "Power analysis"],
    accent: "coral"
  },
  {
    number: "03",
    title: "High-dimensional inference",
    short: "Fast, robust tests for complex and dependent data.",
    question: "How can we test many subtle hypotheses without fragile model assumptions?",
    description:
      "We develop conditional-independence tests, saddlepoint approximations, masking methods, and robust score tests with finite-sample and asymptotic guarantees.",
    work: ["spaCRT", "Permuted score tests", "Doubly robust selection", "Masking methods"],
    accent: "gold"
  }
] satisfies ResearchPillar[];

export const corePeople: Person[] = [
  {
    name: "Eugene Katsevich",
    role: "Principal investigator",
    affiliation: "Assistant Professor, Statistics and Data Science",
    description:
      "Eugene develops statistical methods and research software for high-dimensional inference and functional genomics.",
    themes: ["Statistical genomics", "Multiple testing", "Research software"],
    links: [
      { label: "Academic site", href: "https://ekatsevi.github.io/" },
      { label: "Penn profile", href: "https://statistics.wharton.upenn.edu/profile/ekatsevi/" },
      { label: "CV", href: "/files/CV_Eugene_Katsevich.pdf" }
    ],
    image: eugenePhoto,
    imagePosition: "center 24%"
  },
  {
    name: "Ziang Niu",
    role: "Doctoral student",
    affiliation: "Wharton Statistics and Data Science",
    description:
      "Ziang works on conditional-independence testing, saddlepoint approximations, robust differential expression, and PerturbPlan.",
    themes: ["spaCRT", "PerturbPlan", "Robust inference"],
    links: [
      { label: "Academic site", href: "https://ziangniu6.github.io/" },
      { label: "Penn profile", href: "https://statistics.wharton.upenn.edu/profile/ziangniu/" }
    ],
    image: ziangPhoto,
    imagePosition: "center 25%",
    note: "Co-advised with Bhaswar Bhattacharya"
  },
  {
    name: "Louis Deutsch",
    role: "Doctoral student",
    affiliation: "Wharton Statistics and Data Science",
    description:
      "Louis works on statistical genomics, noisy proxy variables, single-cell CRISPR methodology, and scalable benchmarking for sceptre.",
    themes: ["Single-cell CRISPR", "sceptre", "Noisy proxies"],
    links: [{ label: "Academic site", href: "https://www.jld-stats.com/" }],
    image: louisPhoto,
    imagePosition: "center 26%"
  }
];

export const collaborators: Person[] = [
  {
    name: "Timothy Barry",
    role: "Alumnus · research collaborator",
    affiliation: "Boston Children’s Hospital and Massachusetts General Hospital",
    description:
      "Longtime collaborator and co-maintainer of sceptre, working on CRISPR-screen methods, robust differential expression, and scalable software.",
    themes: ["sceptre", "CRISPR screens", "Differential expression"],
    links: [{ label: "Academic site", href: "https://timothy-barry.github.io/" }],
    image: timPhoto,
    imagePosition: "center 28%"
  },
  {
    name: "Abhinav Chakraborty",
    role: "Former trainee · research collaborator",
    affiliation: "Columbia University",
    description:
      "Abhinav develops reliable statistical-learning methods, including conditional-independence tests, variable selection, and masking methods.",
    themes: ["Conditional independence", "Variable selection", "Masking"],
    links: [{ label: "Academic site", href: "https://abhinavc3.github.io/" }],
    image: abhinavPhoto,
    imagePosition: "center 30%"
  },
  {
    name: "Jeffrey Zhang",
    role: "Former trainee · research collaborator",
    affiliation: "University of Chicago Data Science Institute",
    description:
      "Jeffrey works on causal-inference methodology and high-dimensional variable selection.",
    themes: ["Causal inference", "Variable selection", "symCRT"],
    links: [{ label: "Profile", href: "https://datascience.uchicago.edu/people/jeffrey-zhang/" }],
    image: jeffPhoto,
    imagePosition: "center 30%"
  },
  {
    name: "Junu Lee",
    role: "Former trainee · research collaborator",
    affiliation: "Wharton Statistics and Data Science",
    description:
      "Junu studies selective and post-selection inference, multiple testing, e-values, and distribution-free methods.",
    themes: ["Multiple testing", "Selective inference", "Masking"],
    links: [{ label: "Penn profile", href: "https://statistics.wharton.upenn.edu/profile/junulee/" }],
    initials: "JL"
  },
  {
    name: "Yihui He",
    role: "Trainee · research collaborator",
    affiliation: "Wharton Statistics and Data Science",
    description:
      "Yihui contributes experimental-design modeling, validation, and Perturb-seq data processing to PerturbPlan.",
    themes: ["PerturbPlan", "Experimental design", "Causal inference"],
    links: [{ label: "Penn profile", href: "https://statistics.wharton.upenn.edu/profile/yihuihe/" }],
    initials: "YH"
  },
  {
    name: "Zhihan Huang",
    role: "Research collaborator",
    affiliation: "Wharton Statistics and Data Science",
    description:
      "Zhihan contributes finite-sample theory and proof development to the lab’s conditional-inference work.",
    themes: ["Finite-sample theory", "spaCRT", "Probability"],
    links: [{ label: "Penn profile", href: "https://statistics.wharton.upenn.edu/profile/zhihanh/" }],
    initials: "ZH"
  },
  {
    name: "Jyotishka Ray Choudhury",
    role: "Research collaborator",
    affiliation: "Georgia Institute of Technology · Machine Learning PhD",
    description:
      "Jyotishka collaborates on fast and accurate conditional-independence testing using saddlepoint approximations.",
    themes: ["spaCRT", "Conditional inference", "Saddlepoint methods"],
    links: [{ label: "Georgia Tech profile", href: "https://www.isye.gatech.edu/users/jyotishka-ray-choudhury" }],
    image: jyotishkaPhoto,
    imagePosition: "center 24%"
  }
];

export const software = [
  {
    name: "sceptre",
    label: "Flagship software",
    description:
      "An R package for statistically calibrated analysis of single-cell CRISPR screens—from guide assignment and quality control to association testing and discovery.",
    detail: "Featured in an official 10x Genomics analysis guide.",
    tags: ["R", "Open source", "Single-cell CRISPR"],
    links: [
      { label: "Documentation", href: "https://katsevich-lab.github.io/sceptre/" },
      { label: "Source", href: "https://github.com/Katsevich-Lab/sceptre" },
      { label: "10x guide", href: "https://www.10xgenomics.com/analysis-guides/single-cell-crispr-screen-analysis-with-sceptre" }
    ],
    logo: sceptreLogo,
    accent: "teal"
  },
  {
    name: "PerturbPlan",
    label: "Flagship software",
    description:
      "A web application and R package for designing Perturb-seq and TAP-seq experiments by making power, cost, and experimental tradeoffs explicit.",
    detail: "Fast, interactive planning across cells, guides, depth, multiplicity, and effect sizes.",
    tags: ["Web app", "R", "Experimental design"],
    links: [
      { label: "Launch app", href: "https://perturbplan.com/" },
      { label: "R package", href: "https://katsevich-lab.github.io/perturbplan/" },
      { label: "Preprint", href: "https://doi.org/10.64898/2026.05.22.727199" }
    ],
    logo: perturbPlanLogo,
    accent: "coral"
  }
] satisfies SoftwareItem[];

export const secondarySoftware = [
  {
    name: "ondisc",
    label: "Stable package",
    description: "Out-of-core data structures and workflows for large single-cell datasets.",
    tags: ["R", "Single-cell data", "Scalability"],
    links: [{ label: "Documentation", href: "https://timothy-barry.github.io/ondisc/" }],
    logo: ondiscLogo
  },
  {
    name: "simulatr",
    label: "Research infrastructure",
    description: "Portable, scalable numerical simulations using an R package and Nextflow pipeline.",
    tags: ["R", "Nextflow", "Reproducibility"],
    links: [
      { label: "Documentation", href: "https://katsevich-lab.github.io/simulatr/" },
      { label: "Source", href: "https://github.com/Katsevich-Lab/simulatr" }
    ]
  },
  {
    name: "spaCRT",
    label: "Research code",
    description: "Reproducible code for fast conditional-independence testing via saddlepoint approximations.",
    tags: ["R", "Conditional inference", "Methods"],
    links: [
      { label: "Source", href: "https://github.com/Katsevich-Lab/spacrt-manuscript" },
      { label: "Preprint", href: "https://arxiv.org/abs/2407.08911" }
    ]
  }
] satisfies SoftwareItem[];

export const updates = [
  {
    date: "May 2026",
    title: "PerturbPlan preprint",
    text: "A new analytical framework makes power and cost tradeoffs explicit when designing Perturb-seq experiments.",
    href: "https://doi.org/10.64898/2026.05.22.727199"
  },
  {
    date: "January 2026",
    title: "Power of masking methods",
    text: "New theory studies when adaptive masking strategies gain power in multivariate testing problems.",
    href: "https://arxiv.org/abs/2601.07764"
  },
  {
    date: "2024",
    title: "Low-MOI CRISPR analysis",
    text: "Genome Biology work extends robust differential-expression testing to low-multiplicity single-cell screens.",
    href: "https://doi.org/10.1186/s13059-024-03254-2"
  }
] satisfies Update[];

export const funding = {
  current: [
    {
      name: "Doubly-robust variable selection in high dimensions",
      funder: "National Science Foundation",
      award: "NSF 2310654",
      period: "2023–2027",
      href: "https://www.nsf.gov/awardsearch/showAward?AWD_ID=2310654"
    }
  ],
  past: [
    {
      name: "Testing and estimation for multi-modality single-cell genomics",
      funder: "National Science Foundation",
      award: "NSF 2113072",
      period: "2021–2024",
      href: "https://www.nsf.gov/awardsearch/showAward?AWD_ID=2113072"
    },
    {
      name: "Statistical software for single-cell CRISPR screens",
      funder: "Analytics at Wharton",
      period: "2021–2023",
      href: "https://analytics.wharton.upenn.edu/"
    }
  ]
} satisfies Funding;

export const publications: Publication[] = [
  {
    title: "Scaling sceptre to large Perturb-seq datasets",
    authors: "L. Deutsch, T. Barry, E. Katsevich",
    venue: "In preparation",
    year: 2026,
    status: "Working manuscript",
    area: "Genomics"
  },
  {
    title: "An analytical framework for designing Perturb-seq experiments",
    authors: "Z. Niu, Y. He, J. Galante, A. Gschwind, J. Engreitz, E. Katsevich",
    venue: "bioRxiv; under review at Nature Methods",
    year: 2026,
    status: "Under review",
    area: "Genomics",
    featured: true,
    takeaway: "A practical framework for balancing power and cost before running a Perturb-seq experiment.",
    links: [
      { label: "Paper", href: "https://doi.org/10.64898/2026.05.22.727199" },
      { label: "Web app", href: "https://perturbplan.com/" }
    ]
  },
  {
    title: "Power of masking methods for adaptive testing in a multivariate normal means problem",
    authors: "A. Chakraborty, J. Lee, E. Katsevich",
    venue: "arXiv; under review at Biometrika",
    year: 2026,
    status: "Under review",
    area: "Statistics",
    featured: true,
    takeaway: "Theory clarifying when adaptive masking can increase power while preserving valid inference.",
    links: [{ label: "Paper", href: "https://arxiv.org/abs/2601.07764" }]
  },
  {
    title: "The permuted score test for robust differential expression analysis",
    authors: "T. Barry, Z. Niu, E. Katsevich, X. Lin",
    venue: "arXiv",
    year: 2025,
    status: "Working manuscript",
    area: "Statistics",
    links: [{ label: "Paper", href: "https://arxiv.org/abs/2501.03530" }]
  },
  {
    title: "The conditional saddlepoint approximation for fast and accurate large-scale hypothesis testing",
    authors: "Z. Niu, J. Ray Choudhury, E. Katsevich",
    venue: "arXiv",
    year: 2024,
    status: "Working manuscript",
    area: "Statistics",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2407.08911" },
      { label: "Code", href: "https://github.com/Katsevich-Lab/spacrt-manuscript" }
    ]
  },
  {
    title: "Doubly robust and computationally efficient high-dimensional variable selection",
    authors: "A. Chakraborty, J. Zhang, E. Katsevich",
    venue: "arXiv",
    year: 2024,
    status: "Working manuscript",
    area: "Statistics",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2409.09512" },
      { label: "Code", href: "https://github.com/Katsevich-Lab/symcrt2-manuscript" }
    ]
  },
  {
    title: "An unbiased survey of distal element-gene regulatory interactions with direct-capture targeted Perturb-seq",
    authors: "J. Ray, E. Jagoda, M. U. Sheth, et al.",
    venue: "bioRxiv; under review at Nature Genetics",
    year: 2025,
    status: "Under review",
    area: "Genomics",
    links: [{ label: "Paper", href: "https://www.biorxiv.org/content/10.1101/2025.09.16.676677v1" }]
  },
  {
    title: "Enhancer-gene regulatory interactions in colorectal cancer revealed through genome-wide CRISPRi perturbations",
    authors: "P. J. Law, J. Vijayakrishnan, J. Smith, et al.",
    venue: "bioRxiv; under review at Wellcome Open Research",
    year: 2026,
    status: "Under review",
    area: "Genomics",
    links: [{ label: "Preprint", href: "https://doi.org/10.64898/2026.06.05.730086" }]
  },
  {
    title: "Location tests with noisy proxies for latent variables",
    authors: "L. Deutsch, E. Katsevich",
    venue: "Statistics and Probability Letters",
    year: 2025,
    status: "Published",
    area: "Statistics",
    links: [{ label: "Paper", href: "https://www.sciencedirect.com/science/article/pii/S0167715225002354" }]
  },
  {
    title: "GWAS-informed data integration and non-coding CRISPRi screen illuminate genetic etiology of bone mineral density",
    authors: "M. Conery, J. A. Pippin, Y. Wagley, et al.",
    venue: "Genome Biology",
    year: 2025,
    status: "Published",
    area: "Genomics",
    links: [{ label: "Paper", href: "https://genomebiology.biomedcentral.com/articles/10.1186/s13059-025-03802-4" }]
  },
  {
    title: "Pooled CRISPR screens with joint single-nucleus chromatin accessibility and transcriptome profiling",
    authors: "R. E. Yan, A. Corman, L. Katgara, et al.",
    venue: "Nature Biotechnology",
    year: 2024,
    status: "Published",
    area: "Genomics",
    links: [{ label: "Paper", href: "https://www.nature.com/articles/s41587-024-02475-x" }]
  },
  {
    title: "Robust differential expression testing for single-cell CRISPR screens at low multiplicity of infection",
    authors: "T. Barry, K. Mason, K. Roeder, E. Katsevich",
    venue: "Genome Biology",
    year: 2024,
    status: "Published",
    area: "Genomics",
    featured: true,
    takeaway: "A calibrated approach for low-multiplicity single-cell CRISPR screens, implemented in sceptre.",
    links: [
      { label: "Paper", href: "https://doi.org/10.1186/s13059-024-03254-2" },
      { label: "Software", href: "https://katsevich-lab.github.io/sceptre/" },
      { label: "Code", href: "https://github.com/Katsevich-Lab/sceptre2-manuscript" }
    ]
  },
  {
    title: "Exponential family measurement error models for single-cell CRISPR screens",
    authors: "T. Barry, K. Roeder, E. Katsevich",
    venue: "Biostatistics",
    year: 2024,
    status: "Published",
    area: "Statistics",
    links: [{ label: "Paper", href: "https://doi.org/10.1093/biostatistics/kxae010" }]
  },
  {
    title: "Reconciling model-X and doubly robust approaches to conditional independence testing",
    authors: "Z. Niu, A. Chakraborty, O. Dukes, E. Katsevich",
    venue: "Annals of Statistics",
    year: 2024,
    status: "Published",
    area: "Statistics",
    links: [
      { label: "Paper", href: "https://doi.org/10.1214/24-AOS2372" },
      { label: "Code", href: "https://github.com/Katsevich-Lab/symcrt-manuscript" }
    ]
  },
  {
    title: "Discovery of target genes and pathways at GWAS loci by pooled single-cell CRISPR screens",
    authors: "J. A. Morris, C. Caragine, Z. Daniloski, et al.",
    venue: "Science",
    year: 2023,
    status: "Published",
    area: "Genomics",
    links: [{ label: "Paper", href: "https://www.science.org/doi/10.1126/science.adh7699" }]
  },
  {
    title: "Large-scale simultaneous inference under dependence",
    authors: "J. Tian, X. Chen, E. Katsevich, J. Goeman, A. Ramdas",
    venue: "Scandinavian Journal of Statistics",
    year: 2023,
    status: "Published",
    area: "Statistics",
    links: [{ label: "Paper", href: "https://doi.org/10.1111/sjos.12614" }]
  },
  {
    title: "Filtering the rejection set while preserving false discovery rate control",
    authors: "E. Katsevich, C. Sabatti, M. Bogomolov",
    venue: "Journal of the American Statistical Association",
    year: 2023,
    status: "Published",
    area: "Statistics",
    links: [
      { label: "Paper", href: "https://doi.org/10.1080/01621459.2021.1920958" },
      { label: "Code", href: "https://github.com/ekatsevi/Focused-BH" }
    ]
  },
  {
    title: "On the power of conditional independence testing under model-X",
    authors: "E. Katsevich, A. Ramdas",
    venue: "Electronic Journal of Statistics",
    year: 2022,
    status: "Published",
    area: "Statistics",
    links: [{ label: "Paper", href: "https://doi.org/10.1214/22-EJS2085" }]
  },
  {
    title: "Fast and powerful conditional randomization testing via distillation",
    authors: "M. Liu, E. Katsevich, L. Janson, A. Ramdas",
    venue: "Biometrika",
    year: 2022,
    status: "Published",
    area: "Statistics",
    links: [
      { label: "Paper", href: "https://doi.org/10.1093/biomet/asab039" },
      { label: "Code", href: "https://github.com/moleibobliu/Distillation-CRT" }
    ]
  },
  {
    title: "SCEPTRE improves calibration and sensitivity in single-cell CRISPR screen analysis",
    authors: "T. Barry, X. Wang, J. A. Morris, K. Roeder, E. Katsevich",
    venue: "Genome Biology",
    year: 2021,
    status: "Published",
    area: "Genomics",
    links: [
      { label: "Paper", href: "https://doi.org/10.1186/s13059-021-02545-2" },
      { label: "Software", href: "https://katsevich-lab.github.io/sceptre/" },
      { label: "Code", href: "https://github.com/Katsevich-Lab/sceptre-manuscript" }
    ]
  },
  {
    title: "Simultaneous high-probability bounds on the false discovery proportion in structured, regression, and online settings",
    authors: "E. Katsevich, A. Ramdas",
    venue: "Annals of Statistics",
    year: 2020,
    status: "Published",
    area: "Statistics",
    links: [{ label: "Paper", href: "https://doi.org/10.1214/19-AOS1938" }]
  },
  {
    title: "Multi-resolution localization of causal variants across the genome",
    authors: "M. Sesia, E. Katsevich, S. Bates, E. Candès, C. Sabatti",
    venue: "Nature Communications",
    year: 2020,
    status: "Published",
    area: "Genomics",
    links: [{ label: "Paper", href: "https://www.nature.com/articles/s41467-020-14791-2" }]
  },
  {
    title: "Exploratory Gene Ontology analysis with interactive visualization",
    authors: "J. Zhu, Q. Zhao, E. Katsevich, C. Sabatti",
    venue: "Scientific Reports",
    year: 2019,
    status: "Published",
    area: "Genomics",
    links: [{ label: "Paper", href: "https://www.nature.com/articles/s41598-019-42178-x" }]
  },
  {
    title: "Multilayer knockoff filter: Controlled variable selection at multiple resolutions",
    authors: "E. Katsevich, C. Sabatti",
    venue: "Annals of Applied Statistics",
    year: 2019,
    status: "Published",
    area: "Statistics",
    links: [{ label: "Paper", href: "https://doi.org/10.1214/18-AOAS1185" }]
  },
  {
    title: "Covariance estimation using conjugate gradient for 3D classification in cryo-EM",
    authors: "J. Andén, E. Katsevich, A. Singer",
    venue: "IEEE International Symposium on Biomedical Imaging",
    year: 2015,
    status: "Published",
    area: "Imaging",
    links: [{ label: "Paper", href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4679407/" }]
  },
  {
    title: "Covariance matrix estimation for the cryo-EM heterogeneity problem",
    authors: "E. Katsevich, A. Katsevich, A. Singer",
    venue: "SIAM Journal on Imaging Sciences",
    year: 2015,
    status: "Published",
    area: "Imaging",
    links: [{ label: "Paper", href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4331039/" }]
  },
  {
    title: "Image registration for motion estimation in cardiac CT",
    authors: "B. Shi, E. Katsevich, B. Chiang, A. Katsevich, A. Zamyatin",
    venue: "SPIE Medical Imaging",
    year: 2014,
    status: "Published",
    area: "Imaging",
    links: [{ label: "Paper", href: "https://doi.org/10.1117/12.2043559" }]
  },
  {
    title: "Stability of the interior problem for polynomial region of interest",
    authors: "E. Katsevich, A. Katsevich, G. Wang",
    venue: "Inverse Problems",
    year: 2012,
    status: "Published",
    area: "Imaging",
    links: [{ label: "Paper", href: "https://pubmed.ncbi.nlm.nih.gov/24058227/" }]
  }
];

export const featuredPublications = publications.filter((publication) => publication.featured);
