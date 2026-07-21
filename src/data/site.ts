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
  number: "01" | "02";
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
  themes: ("Perturb-seq" | "Reliable discovery")[];
  summary: string;
  visual: {
    motif: "perturbation" | "design" | "calibration" | "conditional" | "selection" | "masking" | "regulation" | "integration" | "measurement" | "multiple-testing" | "theory";
    seed: number;
  };
  links?: Link[];
  featured?: boolean;
};

export type SoftwareItem = {
  name: string;
  label: string;
  description: string;
  detail?: string;
  tags: string[];
  links: Link[];
  papers?: Link[];
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
    title: "Perturb-seq, from design to discovery",
    short: "Making single-cell CRISPR screens more informative at every stage.",
    question: "How can we design, analyze, and interpret perturbational experiments so their discoveries are both powerful and trustworthy?",
    description:
      "We develop statistical methods and open-source tools for the full Perturb-seq lifecycle: planning well-powered experiments, assigning perturbations, testing perturbation–gene effects, scaling analysis, and mapping regulatory circuitry.",
    work: ["PerturbPlan", "sceptre", "Scalable Perturb-seq analysis", "Regulatory mapping"],
    accent: "teal"
  },
  {
    number: "02",
    title: "Statistics for reliable discovery",
    short: "Flexible methods that keep uncertainty attached to the claims scientists actually make.",
    question: "How can scientists explore structured, dependent, noisy, or adaptively analyzed data without losing track of uncertainty?",
    description:
      "We develop robust, powerful, and computationally practical methods for conditional importance, variable selection, multiple testing, and post-hoc uncertainty. The aim is useful rigor: guarantees for the lists, scales, and comparisons scientists actually report.",
    work: ["Which variables matter?", "Robust and adaptive tests", "Discovery across scales", "Post-hoc uncertainty"],
    accent: "gold"
  }
] satisfies ResearchPillar[];

export const corePeople: Person[] = [
  {
    name: "Eugene Katsevich",
    role: "Principal investigator",
    affiliation: "Assistant Professor, Statistics and Data Science",
    description:
      "Eugene develops statistical methods and research software for reliable discovery and perturbational genomics.",
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
    papers: [
      { label: "SCEPTRE (2021)", href: "https://doi.org/10.1186/s13059-021-02545-2" },
      { label: "STING-seq (2023)", href: "https://doi.org/10.1126/science.adh7699" },
      { label: "Measurement error (2024)", href: "https://doi.org/10.1093/biostatistics/kxae010" },
      { label: "Low-MOI screens (2024)", href: "https://doi.org/10.1186/s13059-024-03254-2" }
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
      { label: "Package source", href: "https://github.com/Katsevich-Lab/perturbplan" },
      { label: "App source", href: "https://github.com/Katsevich-Lab/perturbplanApp" },
      { label: "Reproduction", href: "https://github.com/Katsevich-Lab/perturbplan-replication" }
    ],
    papers: [{ label: "PerturbPlan paper (2026)", href: "https://doi.org/10.64898/2026.05.22.727199" }],
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
    links: [
      { label: "Documentation", href: "https://timothy-barry.github.io/ondisc/" },
      { label: "Source", href: "https://github.com/timothy-barry/ondisc" }
    ],
    logo: ondiscLogo
  },
  {
    name: "simulatr",
    label: "Research infrastructure",
    description: "Portable, scalable numerical simulations using an R package and Nextflow pipeline.",
    tags: ["R", "Nextflow", "Reproducibility"],
    links: [
      { label: "Documentation", href: "https://timothy-barry.github.io/simulatr/" },
      { label: "Source", href: "https://github.com/timothy-barry/simulatr" }
    ]
  },
  {
    name: "spaCRT",
    label: "Research code",
    description: "Reproducible code for fast conditional-independence testing via saddlepoint approximations.",
    tags: ["R", "Conditional inference", "Methods"],
    links: [
      { label: "Source", href: "https://github.com/Katsevich-Lab/spacrt" },
      { label: "Reproduction", href: "https://github.com/Katsevich-Lab/spacrt-manuscript" }
    ],
    papers: [{ label: "spaCRT paper (2024)", href: "https://arxiv.org/abs/2407.08911" }]
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
    themes: ["Perturb-seq", "Reliable discovery"],
    summary: "Large Perturb-seq studies turn data import, guide assignment, and millions of association tests into computational bottlenecks. This ongoing work is rebuilding and benchmarking sceptre’s package and distributed pipeline, with the goal of keeping rigorous analyses practical at modern scale.",
    visual: { motif: "integration", seed: 1 },
    links: [{ label: "Software", href: "https://github.com/Katsevich-Lab/sceptre" }]
  },
  {
    title: "PerturbPlan: An analytical framework for designing Perturb-seq experiments",
    authors: "Z. Niu, Y. He, J. Galante, A. R. Gschwind, J. Ray, L. M. Steinmetz, J. M. Engreitz, E. Katsevich",
    venue: "bioRxiv; under review at Nature Methods",
    year: 2026,
    status: "Under review",
    themes: ["Perturb-seq"],
    summary: "PerturbPlan turns Perturb-seq design into an interactive power-and-cost problem. Its analytical approximation replaces months of simulation with near-instant calculations, helping researchers choose cells, reads, targets, and assay type before committing to an experiment.",
    visual: { motif: "design", seed: 2 },
    featured: true,
    links: [
      { label: "Paper", href: "https://doi.org/10.64898/2026.05.22.727199" },
      { label: "Web app", href: "https://perturbplan.com/" },
      { label: "R package", href: "https://katsevich-lab.github.io/perturbplan/" },
      { label: "Code", href: "https://github.com/Katsevich-Lab/perturbplan-replication" }
    ]
  },
  {
    title: "Power of masking methods for adaptive testing in a multivariate normal means problem",
    authors: "A. Chakraborty, J. Lee, E. Katsevich",
    venue: "arXiv; under review at Biometrika",
    year: 2026,
    status: "Under review",
    themes: ["Reliable discovery"],
    summary: "Masking lets a method learn where signals may lie without double dipping. In a stylized normal-means model, null augmentation outperforms sample splitting and can approach an oracle benchmark with surprisingly little added null data.",
    visual: { motif: "masking", seed: 3 },
    featured: true,
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2601.07764" },
      { label: "Code", href: "https://github.com/Katsevich-Lab/masking-power" }
    ]
  },
  {
    title: "The permuted score test for robust differential expression analysis",
    authors: "T. Barry, Z. Niu, E. Katsevich, X. Lin",
    venue: "arXiv",
    year: 2025,
    status: "Working manuscript",
    themes: ["Perturb-seq", "Reliable discovery"],
    summary: "Standard differential-expression tests can fail when counts are sparse or their model is wrong. The permuted score test calibrates a regression score with permutations, delivering reliable error control across much broader conditions while retaining nearly the speed and power of standard regression.",
    visual: { motif: "calibration", seed: 4 },
    links: [{ label: "Paper", href: "https://arxiv.org/abs/2501.03530" }]
  },
  {
    title: "The conditional saddlepoint approximation for fast and accurate large-scale hypothesis testing",
    authors: "Z. Niu, J. Ray Choudhury, E. Katsevich",
    venue: "arXiv",
    year: 2024,
    status: "Working manuscript",
    themes: ["Perturb-seq", "Reliable discovery"],
    summary: "Tiny p-values are hardest to trust when data are sparse and discrete—the norm in Perturb-seq. spaCRT replaces expensive randomization with a rigorous saddlepoint calculation, matching dCRT’s tail accuracy while accelerating an 85,000-test analysis about 250-fold.",
    visual: { motif: "calibration", seed: 5 },
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2407.08911" },
      { label: "Software", href: "https://github.com/Katsevich-Lab/spacrt" },
      { label: "Code", href: "https://github.com/Katsevich-Lab/spacrt-manuscript" }
    ]
  },
  {
    title: "Doubly robust and computationally efficient high-dimensional variable selection",
    authors: "A. Chakraborty, J. Zhang, E. Katsevich",
    venue: "arXiv",
    year: 2024,
    status: "Working manuscript",
    themes: ["Reliable discovery"],
    summary: "Tower PCM asks which predictors add information after accounting for all the others, without fitting a new machine-learning model for each one. It returns robust per-variable p-values and achieves up to 130-fold speedups when predictor structure can be modeled efficiently.",
    visual: { motif: "selection", seed: 6 },
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
    themes: ["Perturb-seq"],
    summary: "DC-TAP-seq combines targeted measurement, random element selection, and power-aware analysis to survey distal regulation without the usual selection bias. The study finds that most detected element–gene effects are small and local, and exposes blind spots in current predictive models.",
    visual: { motif: "regulation", seed: 7 },
    links: [{ label: "Paper", href: "https://www.biorxiv.org/content/10.1101/2025.09.16.676677v1" }]
  },
  {
    title: "Enhancer-gene regulatory interactions in colorectal cancer revealed through genome-wide CRISPRi perturbations",
    authors: "P. J. Law, J. Vijayakrishnan, J. Smith, et al.",
    venue: "bioRxiv; under review at Wellcome Open Research",
    year: 2026,
    status: "Under review",
    themes: ["Perturb-seq"],
    summary: "A genome-wide CRISPRi Perturb-seq screen maps 238 enhancer–gene links in colorectal cancer. Integrating chromatin state and 3D genome structure yields a functional wiring diagram for prioritizing noncoding cancer drivers.",
    visual: { motif: "regulation", seed: 8 },
    links: [{ label: "Preprint", href: "https://doi.org/10.64898/2026.06.05.730086" }]
  },
  {
    title: "Location tests with noisy proxies for latent variables",
    authors: "L. Deutsch, E. Katsevich",
    venue: "Statistics and Probability Letters",
    year: 2026,
    status: "Published",
    themes: ["Perturb-seq", "Reliable discovery"],
    summary: "In Perturb-seq, whether a perturbation worked in a cell is latent, and a learned proxy may be informative—or merely noisy. This paper derives the bias–variance threshold at which proxy weighting helps and develops adaptive tests that refine or ignore the proxy.",
    visual: { motif: "measurement", seed: 9 },
    links: [
      { label: "Paper", href: "https://www.sciencedirect.com/science/article/pii/S0167715225002354" },
      { label: "Code", href: "https://github.com/Katsevich-Lab/noisy-proxies" }
    ]
  },
  {
    title: "GWAS-informed data integration and non-coding CRISPRi screen illuminate genetic etiology of bone mineral density",
    authors: "M. Conery, J. A. Pippin, Y. Wagley, et al.",
    venue: "Genome Biology",
    year: 2025,
    status: "Published",
    themes: ["Perturb-seq"],
    summary: "By combining human genetics with a single-cell CRISPRi screen in osteoblasts, this study links noncoding bone-mineral-density loci to candidate effector genes and validates effects on bone-cell maturation. It also shows that some signals likely act through tissues beyond bone.",
    visual: { motif: "regulation", seed: 10 },
    links: [{ label: "Paper", href: "https://genomebiology.biomedcentral.com/articles/10.1186/s13059-025-03802-4" }]
  },
  {
    title: "Pooled CRISPR screens with joint single-nucleus chromatin accessibility and transcriptome profiling",
    authors: "R. E. Yan, A. Corman, L. Katgara, et al.",
    venue: "Nature Biotechnology",
    year: 2024,
    status: "Published",
    themes: ["Perturb-seq"],
    summary: "MultiPerturb-seq captures guide identity, chromatin accessibility, and gene expression together in pooled screens. Applied to a rare pediatric cancer, it identifies differentiation regulators and nominates ZNHIT1 as a potential reprogramming target.",
    visual: { motif: "integration", seed: 11 },
    links: [{ label: "Paper", href: "https://www.nature.com/articles/s41587-024-02475-x" }]
  },
  {
    title: "Robust differential expression testing for single-cell CRISPR screens at low multiplicity of infection",
    authors: "T. Barry, K. Mason, K. Roeder, E. Katsevich",
    venue: "Genome Biology",
    year: 2024,
    status: "Published",
    themes: ["Perturb-seq", "Reliable discovery"],
    summary: "Benchmarking six widely used methods revealed false positives driven by sparse counts, confounding, and misspecified expression models. SCEPTRE low-MOI combines covariate-adjusted score statistics with permutation calibration, producing more trustworthy—and often more sensitive—perturbation–gene discoveries.",
    visual: { motif: "calibration", seed: 12 },
    featured: true,
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
    themes: ["Perturb-seq", "Reliable discovery"],
    summary: "Guide counts are noisy evidence of whether a cell was truly perturbed, so hard thresholds can shrink effect estimates and force a bias–variance tradeoff. GLM-EIV jointly models guide counts and expression, yielding principled soft assignments and more reliable estimates when contamination is substantial.",
    visual: { motif: "measurement", seed: 13 },
    links: [
      { label: "Paper", href: "https://doi.org/10.1093/biostatistics/kxae010" },
      { label: "Software", href: "https://github.com/Katsevich-Lab/sceptre" }
    ]
  },
  {
    title: "Reconciling model-X and doubly robust approaches to conditional independence testing",
    authors: "Z. Niu, A. Chakraborty, O. Dukes, E. Katsevich",
    venue: "Annals of Statistics",
    year: 2024,
    status: "Published",
    themes: ["Reliable discovery"],
    summary: "Model-X methods assume the predictor distribution is known, but in practice it is usually learned from the same data. This paper shows how outcome modeling can compensate when the two models are accurate enough in combination, and unifies resampling-based and doubly robust tests.",
    visual: { motif: "conditional", seed: 14 },
    links: [
      { label: "Paper", href: "https://doi.org/10.1214/24-AOS2372" },
      { label: "Software", href: "https://github.com/Katsevich-Lab/symcrt" },
      { label: "Code", href: "https://github.com/Katsevich-Lab/symcrt-manuscript" }
    ]
  },
  {
    title: "Discovery of target genes and pathways at GWAS loci by pooled single-cell CRISPR screens",
    authors: "J. A. Morris, C. Caragine, Z. Daniloski, et al.",
    venue: "Science",
    year: 2023,
    status: "Published",
    themes: ["Perturb-seq"],
    summary: "STING-seq combines pooled CRISPR perturbations with multimodal single-cell readouts to connect noncoding blood-trait GWAS loci to target genes and regulatory pathways. Base-editing follow-up moves from associated regions toward specific causal variants and mechanisms.",
    visual: { motif: "regulation", seed: 15 },
    links: [
      { label: "Paper", href: "https://www.science.org/doi/10.1126/science.adh7699" },
      { label: "Software", href: "https://github.com/Katsevich-Lab/sceptre" }
    ]
  },
  {
    title: "Large-scale simultaneous inference under dependence",
    authors: "J. Tian, X. Chen, E. Katsevich, J. Goeman, A. Ramdas",
    venue: "Scandinavian Journal of Statistics",
    year: 2023,
    status: "Published",
    themes: ["Reliable discovery"],
    summary: "Researchers often compare several discovery lists after seeing the data, but rigorous post-hoc guarantees have traditionally been computationally prohibitive. For separable score-sum tests, this work gives mostly linear-time algorithms and shows how sparsity and dependence should shape the test.",
    visual: { motif: "multiple-testing", seed: 16 },
    links: [
      { label: "Paper", href: "https://doi.org/10.1111/sjos.12614" },
      { label: "Code", href: "https://github.com/annavesely/sumSome" }
    ]
  },
  {
    title: "Filtering the rejection set while preserving false discovery rate control",
    authors: "E. Katsevich, C. Sabatti, M. Bogomolov",
    venue: "Journal of the American Statistical Association",
    year: 2023,
    status: "Published",
    themes: ["Reliable discovery"],
    summary: "Scientists routinely shorten redundant discovery lists—choosing representative diseases, pathways, or genomic regions—but naïve filtering can destroy false-discovery guarantees. Focused BH builds a pre-specified filter into the testing rule, protecting the concise list scientists actually interpret.",
    visual: { motif: "multiple-testing", seed: 17 },
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
    themes: ["Reliable discovery"],
    summary: "What actually makes a conditional test powerful? This paper shows that likelihood-based scores are optimal against specified alternatives, quantifies how prediction error degrades power, and gives a resampling-free test needing only conditional means and variances.",
    visual: { motif: "design", seed: 18 },
    links: [
      { label: "Paper", href: "https://doi.org/10.1214/22-EJS2085" },
      { label: "Code", href: "https://github.com/Katsevich-Lab/crtpower-manuscript" }
    ]
  },
  {
    title: "Fast and powerful conditional randomization testing via distillation",
    authors: "M. Liu, E. Katsevich, L. Janson, A. Ramdas",
    venue: "Biometrika",
    year: 2022,
    status: "Published",
    themes: ["Reliable discovery"],
    summary: "The original conditional randomization test can use powerful machine learning but has to refit it for every resample. Distillation moves the expensive learning outside that loop, making model-X testing hundreds of times faster while retaining fine-grained p-values and finite-sample validity under model-X assumptions.",
    visual: { motif: "conditional", seed: 19 },
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
    themes: ["Perturb-seq", "Reliable discovery"],
    summary: "Technical factors affect both whether a perturbation is detected and how gene expression is measured, creating spurious links. SCEPTRE conditions on those factors and resamples perturbation assignments instead of trusting a brittle expression model, producing calibrated tests and hundreds of biologically supported relationships.",
    visual: { motif: "calibration", seed: 20 },
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
    themes: ["Reliable discovery"],
    summary: "Instead of forcing analysts to choose a cutoff before seeing the data, this work gives high-confidence false-discovery bounds along a covered sequence of candidate lists. It lets domain knowledge guide the final tradeoff between list size and reliability in structured, regression, and online analyses.",
    visual: { motif: "multiple-testing", seed: 21 },
    links: [
      { label: "Paper", href: "https://doi.org/10.1214/19-AOS1938" },
      { label: "Code", href: "https://github.com/ekatsevi/simultaneous-fdp" }
    ]
  },
  {
    title: "Multi-resolution localization of causal variants across the genome",
    authors: "M. Sesia, E. Katsevich, S. Bates, E. Candès, C. Sabatti",
    venue: "Nature Communications",
    year: 2020,
    status: "Published",
    themes: ["Reliable discovery"],
    summary: "KnockoffZoom uses synthetic genotypes as negative controls to separate conditional associations from associations created by linkage disequilibrium, zooming from broad loci to individual variants. It unifies locus discovery and fine mapping with false-discovery control separately at each pre-specified resolution.",
    visual: { motif: "regulation", seed: 22 },
    links: [
      { label: "Paper", href: "https://www.nature.com/articles/s41467-020-14791-2" },
      { label: "Code", href: "https://github.com/msesia/knockoffzoom" }
    ]
  },
  {
    title: "Exploratory Gene Ontology analysis with interactive visualization",
    authors: "J. Zhu, Q. Zhao, E. Katsevich, C. Sabatti",
    venue: "Scientific Reports",
    year: 2019,
    status: "Published",
    themes: ["Reliable discovery"],
    summary: "AEGIS turns the vast Gene Ontology into an interactive focus-and-context map, helping researchers see both local relationships and their place in the full hierarchy. The same interface supports hypothesis generation, simulation, and power analysis.",
    visual: { motif: "integration", seed: 23 },
    links: [{ label: "Paper", href: "https://www.nature.com/articles/s41598-019-42178-x" }]
  },
  {
    title: "Multilayer knockoff filter: Controlled variable selection at multiple resolutions",
    authors: "E. Katsevich, C. Sabatti",
    venue: "Annals of Applied Statistics",
    year: 2019,
    status: "Published",
    themes: ["Reliable discovery"],
    summary: "A result can be credible at the variant level yet misleading at the gene level. The multilayer knockoff filter coordinates selection across both scales, providing false-discovery guarantees for each reported type with little power loss in simulations.",
    visual: { motif: "selection", seed: 24 },
    links: [{ label: "Paper", href: "https://doi.org/10.1214/18-AOAS1185" }]
  }
];

export const featuredPublications = publications.filter((publication) => publication.featured);
