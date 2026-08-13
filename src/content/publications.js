import arcProImage from '../assets/publications/arcpro.webp'
import clrWireImage from '../assets/publications/clr-wire.webp'
import emoSetImage from '../assets/publications/emoset.webp'
import genTextImage from '../assets/publications/gentext.webp'
import graphiMindImage from '../assets/publications/graphimind.webp'

export const publications = [
  {
    id: 'arcpro',
    year: 2025,
    title:
      'ArcPro: Architectural Programs for Structured 3D Abstraction of Sparse Points',
    authors: [
      'Qirui Huang',
      'Runze Zhang',
      'Kangjun Liu',
      'Minglun Gong',
      'Hao Zhang',
      'Hui Huang',
    ],
    venue: 'CVPR 2025',
    award: 'Highlight',
    summary:
      'Recovers structured, low-face-count building meshes from extremely sparse and noisy point clouds by predicting executable architectural programs.',
    image: {
      alt: 'ArcPro converts sparse urban point clouds into structured architectural abstractions.',
      height: 406,
      src: arcProImage,
      width: 1400,
    },
    priority: true,
    links: [
      { label: 'Project', href: 'https://vcc.tech/research/2025/ArcPro' },
      { label: 'Paper', href: 'https://arxiv.org/abs/2503.02745' },
      {
        label: 'CVPR',
        href: 'https://openaccess.thecvf.com/content/CVPR2025/html/Huang_ArcPro_Architectural_Programs_for_Structured_3D_Abstraction_of_Sparse_Points_CVPR_2025_paper.html',
      },
    ],
    bibtex: `@inproceedings{ArcPro25,
  title     = {ArcPro: Architectural Programs for Structured 3D Abstraction of Sparse Points},
  author    = {Qirui Huang and Runze Zhang and Kangjun Liu and Minglun Gong and Hao Zhang and Hui Huang},
  booktitle = {CVPR},
  pages     = {6563--6572},
  year      = {2025}
}`,
  },
  {
    id: 'clr-wire',
    year: 2025,
    title:
      'CLR-Wire: Towards Continuous Latent Representations for 3D Curve Wireframe Generation',
    authors: [
      'Xueqi Ma',
      'Yilin Liu',
      'Tianlong Gao',
      'Qirui Huang',
      'Hui Huang',
    ],
    venue: 'ACM SIGGRAPH 2025',
    summary:
      'Learns a unified continuous latent space for 3D curve geometry and topology, enabling wireframe generation, interpolation, and conditional synthesis.',
    image: {
      alt: 'CLR-Wire continuously interpolates and generates 3D curve wireframes with changing topology.',
      height: 532,
      src: clrWireImage,
      width: 1400,
    },
    links: [
      {
        label: 'Project',
        href: 'https://vcc.tech/research/2025/CLRWire',
      },
      { label: 'Paper', href: 'https://arxiv.org/abs/2504.19174' },
      { label: 'Code', href: 'https://github.com/qixuema/CLR-Wire' },
      { label: 'DOI', href: 'https://doi.org/10.1145/3721238.3730638' },
    ],
    bibtex: `@inproceedings{CLRWire25,
  title     = {CLR-Wire: Towards Continuous Latent Representations for 3D Curve Wireframe Generation},
  author    = {Xueqi Ma and Yilin Liu and Tianlong Gao and Qirui Huang and Hui Huang},
  booktitle = {ACM SIGGRAPH},
  pages     = {77:1--77:11},
  year      = {2025}
}`,
  },
  {
    id: 'graphimind',
    year: 2024,
    title: 'GraphiMind: LLM-centric Interface for Information Graphics Design',
    authors: [
      'Qirui Huang',
      'Min Lu',
      'Joel Lanir',
      'Dani Lischinski',
      'Daniel Cohen-Or',
      'Hui Huang',
    ],
    venue: 'arXiv preprint, 2024',
    summary:
      'Combines a tool-augmented LLM conversational interface with direct graphical manipulation to support end-to-end infographic design.',
    image: {
      alt: 'GraphiMind combines conversational design assistance with a graphical editing canvas.',
      height: 308,
      src: graphiMindImage,
      width: 992,
    },
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2401.13245' },
      { label: 'Code', href: 'https://github.com/qrhuang2021/GraphiMind' },
    ],
    bibtex: `@article{huang2024graphimind,
  title   = {GraphiMind: LLM-centric Interface for Information Graphics Design},
  author  = {Qirui Huang and Min Lu and Joel Lanir and Dani Lischinski and Daniel Cohen-Or and Hui Huang},
  journal = {arXiv preprint arXiv:2401.13245},
  year    = {2024}
}`,
  },
  {
    id: 'emoset',
    year: 2023,
    title: 'EmoSet: A Large-scale Visual Emotion Dataset with Rich Attributes',
    authors: [
      'Jingyuan Yang',
      'Qirui Huang',
      'Tingting Ding',
      'Dani Lischinski',
      'Danny Cohen-Or',
      'Hui Huang',
    ],
    venue: 'ICCV 2023',
    award: 'Graphics Open Source Dataset Award · CAD&CG 2024',
    summary:
      'Introduces a 3.3M-image visual emotion dataset, including 118K human-annotated images with rich, interpretable attributes.',
    image: {
      alt: 'EmoSet examples illustrate visual emotion attributes such as expression, scene, object, action, brightness, and colorfulness.',
      height: 823,
      src: emoSetImage,
      width: 1244,
    },
    links: [
      { label: 'Project', href: 'https://vcc.tech/EmoSet' },
      {
        label: 'Paper',
        href: 'https://openaccess.thecvf.com/content/ICCV2023/html/Yang_EmoSet_A_Large-scale_Visual_Emotion_Dataset_with_Rich_Attributes_ICCV_2023_paper.html',
      },
      { label: 'Code', href: 'https://github.com/JingyuanYY/EmoSet' },
      { label: 'Data', href: 'https://vcc.tech/EmoSet#download' },
    ],
    bibtex: `@inproceedings{yang2023emoset,
  title     = {EmoSet: A Large-scale Visual Emotion Dataset with Rich Attributes},
  author    = {Yang, Jingyuan and Huang, Qirui and Ding, Tingting and Lischinski, Dani and Cohen-Or, Danny and Huang, Hui},
  booktitle = {Proceedings of the IEEE/CVF International Conference on Computer Vision},
  pages     = {20383--20394},
  year      = {2023}
}`,
  },
  {
    id: 'gentext',
    year: 2022,
    title:
      'GenText: Unsupervised Artistic Text Generation via Decoupled Font and Texture Manipulation',
    authors: ['Qirui Huang', 'Bin Fu', 'Aozhong Zhang', 'Yu Qiao'],
    venue: 'arXiv preprint, 2022',
    summary:
      'Separates content, font, and texture to support unsupervised, controllable artistic text generation from unpaired examples.',
    image: {
      alt: 'GenText separates content, font, and texture inputs for controllable artistic text generation.',
      height: 726,
      src: genTextImage,
      width: 1230,
    },
    links: [{ label: 'Paper', href: 'https://arxiv.org/abs/2207.09649' }],
    bibtex: `@article{huang2022gentext,
  title   = {GenText: Unsupervised Artistic Text Generation via Decoupled Font and Texture Manipulation},
  author  = {Qirui Huang and Bin Fu and Aozhong Zhang and Yu Qiao},
  journal = {arXiv preprint arXiv:2207.09649},
  year    = {2022}
}`,
  },
]
