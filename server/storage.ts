import {
  Category, InsertCategory, 
  Product, InsertProduct,
  BlogPost, InsertBlogPost,
  Testimonial, InsertTestimonial,
  QuoteRequest, InsertQuoteRequest,
  ContactMessage, InsertContactMessage,
  CalculatorType, InsertCalculatorType
} from "@shared/schema";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCategoryId(categoryId: number): Promise<Product[]>;
  getProductsByCategorySlug(slug: string): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Quote Requests
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Calculator Types
  getCalculatorTypes(): Promise<CalculatorType[]>;
  getCalculatorTypeBySlug(slug: string): Promise<CalculatorType | undefined>;
  createCalculatorType(type: InsertCalculatorType): Promise<CalculatorType>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private blogPosts: Map<number, BlogPost>;
  private testimonials: Map<number, Testimonial>;
  private quoteRequests: Map<number, QuoteRequest>;
  private contactMessages: Map<number, ContactMessage>;
  private calculatorTypes: Map<number, CalculatorType>;
  
  private categoryId: number;
  private productId: number;
  private blogPostId: number;
  private testimonialId: number;
  private quoteRequestId: number;
  private contactMessageId: number;
  private calculatorTypeId: number;

  constructor() {
    this.categories = new Map();
    this.products = new Map();
    this.blogPosts = new Map();
    this.testimonials = new Map();
    this.quoteRequests = new Map();
    this.contactMessages = new Map();
    this.calculatorTypes = new Map();
    
    this.categoryId = 1;
    this.productId = 1;
    this.blogPostId = 1;
    this.testimonialId = 1;
    this.quoteRequestId = 1;
    this.contactMessageId = 1;
    this.calculatorTypeId = 1;
    
    // Initialize with seed data
    this.initializeData();
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const newCategory: Category = { ...category, id };
    this.categories.set(id, newCategory);
    return newCategory;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategoryId(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId
    );
  }

  async getProductsByCategorySlug(slug: string): Promise<Product[]> {
    const category = await this.getCategoryBySlug(slug);
    if (!category) return [];
    return this.getProductsByCategoryId(category.id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug
    );
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const created = new Date();
    const newProduct: Product = { ...product, id, created };
    this.products.set(id, newProduct);
    return newProduct;
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostId++;
    const publishDate = new Date();
    const newPost: BlogPost = { ...post, id, publishDate };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialId++;
    const newTestimonial: Testimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  // Quote Requests
  async createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = this.quoteRequestId++;
    const created = new Date();
    const status = "new";
    const newRequest: QuoteRequest = { ...request, id, created, status };
    this.quoteRequests.set(id, newRequest);
    return newRequest;
  }

  // Contact Messages
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const created = new Date();
    const newMessage: ContactMessage = { ...message, id, created };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }

  // Calculator Types
  async getCalculatorTypes(): Promise<CalculatorType[]> {
    return Array.from(this.calculatorTypes.values());
  }

  async getCalculatorTypeBySlug(slug: string): Promise<CalculatorType | undefined> {
    return Array.from(this.calculatorTypes.values()).find(
      (type) => type.slug === slug
    );
  }

  async createCalculatorType(type: InsertCalculatorType): Promise<CalculatorType> {
    const id = this.calculatorTypeId++;
    const newType: CalculatorType = { ...type, id };
    this.calculatorTypes.set(id, newType);
    return newType;
  }

  // Initialize seed data
  private async initializeData() {
    // Create categories
    const categories = [
      { name: "Tijolos e Blocos", slug: "tijolos-blocos", icon: "fa-cubes", description: "Tijolos, blocos de concreto e outros materiais para alvenaria" },
      { name: "Cimento e Argamassa", slug: "cimento-argamassa", icon: "fa-prescription-bottle", description: "Cimentos, argamassas e produtos para assentamento e reboco" },
      { name: "Areia e Brita", slug: "areia-brita", icon: "fa-water", description: "Materiais em diversos granulados para sua obra" },
      { name: "Ferragens", slug: "ferragens", icon: "fa-link", description: "Ferragens para estrutura de concreto, conexões e fixadores" },
      { name: "Ferramentas", slug: "ferramentas", icon: "fa-tools", description: "Ferramentas manuais e elétricas para profissionais e amadores" },
      { name: "Material Elétrico", slug: "material-eletrico", icon: "fa-bolt", description: "Fios, cabos, tomadas, interruptores e acessórios elétricos" }
    ];

    for (const category of categories) {
      await this.createCategory(category);
    }

    // Create products
    const products = [
      {
        name: "Cimento CPII 50kg",
        slug: "cimento-cpii-50kg",
        description: "Cimento Portland composto, ideal para uso geral em construção civil. Saco de 50kg.",
        categoryId: 2,
        imageUrl: "https://images.unsplash.com/photo-1518674660708-0e2c0473e68e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        price: "Consultar",
        inStock: true,
        specifications: {
          peso: "50kg",
          tipo: "CPII",
          resistencia: "32MPa",
          aplicacao: "Uso geral em construção civil",
          norma: "NBR 11578"
        }
      },
      {
        name: "Tijolo Cerâmico 8 Furos",
        slug: "tijolo-ceramico-8-furos",
        description: "Tijolo cerâmico com 8 furos, medidas 9x19x19cm. Ideal para construção de paredes e divisórias.",
        categoryId: 1,
        imageUrl: "https://pixabay.com/get/gc0a9648895e3aad317b59720d34499aa819bf85edefda7c2f7f0e41b114f88483934b1c66a42b60aba35285ec0ff96c045fc4b07ac2faa3f69c782addd393be8_1280.jpg",
        price: "Consultar",
        inStock: true,
        specifications: {
          dimensoes: "9x19x19cm",
          material: "Cerâmica",
          furos: "8",
          pesoPorUnidade: "2,5kg",
          unidadesPorM2: "25"
        }
      },
      {
        name: "Kit Ferramentas Básicas",
        slug: "kit-ferramentas-basicas",
        description: "Kit completo com ferramentas básicas para construção, inclui martelo, chaves de fenda, alicate e trena.",
        categoryId: 5,
        imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        price: "R$ 189,90",
        inStock: true,
        specifications: {
          conteudo: "Martelo, jogo de chaves, alicate, trena",
          material: "Aço carbono com cabo emborrachado",
          garantia: "3 meses",
          peso: "1,8kg"
        }
      },
      {
        name: "Areia Média m³",
        slug: "areia-media",
        description: "Areia média lavada, ideal para preparo de concretos e argamassas. Vendida por metro cúbico.",
        categoryId: 3,
        imageUrl: "https://images.unsplash.com/photo-1567093322102-6bdd32fba67d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        price: "Consultar",
        inStock: true,
        specifications: {
          tipo: "Média",
          granulometria: "0,3mm a 0,9mm",
          aplicacao: "Argamassas e concretos",
          unidadeMedida: "Metro cúbico (m³)"
        }
      }
    ];

    for (const product of products) {
      await this.createProduct(product);
    }

    // Create blog posts
    const blogPosts = [
      {
        title: "Como preparar concreto corretamente para diferentes aplicações",
        slug: "como-preparar-concreto-corretamente",
        summary: "Aprenda as proporções ideais de cimento, areia e brita para cada tipo de estrutura e garanta a durabilidade da sua obra.",
        content: "O concreto é um dos materiais mais utilizados na construção civil, sendo essencial entender como prepará-lo adequadamente para diferentes aplicações...",
        imageUrl: "https://images.unsplash.com/photo-1582798358481-d199fb7347bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
      },
      {
        title: "Guia básico de instalação elétrica residencial",
        slug: "guia-basico-instalacao-eletrica-residencial",
        summary: "Conheça os materiais necessários, as normas de segurança e as melhores práticas para uma instalação elétrica eficiente.",
        content: "Uma instalação elétrica bem feita é fundamental para a segurança e eficiência energética da sua casa...",
        imageUrl: "https://pixabay.com/get/gf62ba32e832a4abe8fb1dafba8a43bcdfbb99454416100d7bb7fbebd9a552b423ea53fbe60e5e4c82e780ecdce85ac70b94f193ebbf6c953a6ec261a7f609c2c_1280.jpg"
      },
      {
        title: "5 dicas para uma pintura perfeita em paredes internas",
        slug: "dicas-pintura-perfeita-paredes-internas",
        summary: "Descubra técnicas profissionais para preparar a superfície, escolher as tintas certas e obter um acabamento impecável.",
        content: "A pintura é um dos acabamentos mais importantes em uma construção ou reforma, impactando diretamente na aparência e durabilidade dos ambientes...",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
      }
    ];

    for (const post of blogPosts) {
      await this.createBlogPost(post);
    }

    // Create testimonials
    const testimonials = [
      {
        name: "Carlos Pereira",
        role: "Mestre de Obras",
        content: "Trabalho com construção há 15 anos e a Dystack tem os melhores materiais e o melhor atendimento que já encontrei. Desde que descobri, não compro em outro lugar.",
        rating: 5
      },
      {
        name: "Ana Silva",
        role: "Arquiteta",
        content: "Excelente atendimento e rapidez na entrega. Os materiais chegaram no prazo e com a qualidade que eu esperava. Com certeza vou continuar comprando na Dystack.",
        rating: 5
      },
      {
        name: "Marcelo Santos",
        role: "Engenheiro Civil",
        content: "A calculadora de materiais da Dystack me ajudou muito a planejar minha reforma. O orçamento foi preciso e o atendimento esclareceu todas as minhas dúvidas. Recomendo!",
        rating: 5
      }
    ];

    for (const testimonial of testimonials) {
      await this.createTestimonial(testimonial);
    }

    // Create calculator types
    const calculatorTypes = [
      {
        name: "Alvenaria (Tijolos)",
        slug: "alvenaria",
        description: "Calcule a quantidade de tijolos e argamassa necessários para construir paredes."
      },
      {
        name: "Concreto",
        slug: "concreto",
        description: "Calcule a quantidade de cimento, areia e brita para preparar concreto."
      },
      {
        name: "Piso e Revestimento",
        slug: "piso-revestimento",
        description: "Calcule a quantidade de pisos, azulejos e argamassa para revestimentos."
      },
      {
        name: "Pintura",
        slug: "pintura",
        description: "Calcule a quantidade de tinta necessária para pintar paredes e tetos."
      }
    ];

    for (const type of calculatorTypes) {
      await this.createCalculatorType(type);
    }
  }
}

export const storage = new MemStorage();
