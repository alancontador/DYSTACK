import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertQuoteRequestSchema, 
  insertContactMessageSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for categories
  app.get("/api/categories", async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req: Request, res: Response) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // API routes for products
  app.get("/api/products", async (_req: Request, res: Response) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/category/:slug", async (req: Request, res: Response) => {
    try {
      const products = await storage.getProductsByCategorySlug(req.params.slug);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  app.get("/api/products/:slug", async (req: Request, res: Response) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // API routes for blog posts
  app.get("/api/blog", async (_req: Request, res: Response) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req: Request, res: Response) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // API routes for testimonials
  app.get("/api/testimonials", async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // API routes for calculator types
  app.get("/api/calculators", async (_req: Request, res: Response) => {
    try {
      const calculatorTypes = await storage.getCalculatorTypes();
      res.json(calculatorTypes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch calculator types" });
    }
  });

  app.get("/api/calculators/:slug", async (req: Request, res: Response) => {
    try {
      const calculatorType = await storage.getCalculatorTypeBySlug(req.params.slug);
      if (!calculatorType) {
        return res.status(404).json({ message: "Calculator type not found" });
      }
      res.json(calculatorType);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch calculator type" });
    }
  });

  // API routes for quote requests
  app.post("/api/quote", async (req: Request, res: Response) => {
    try {
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      const quoteRequest = await storage.createQuoteRequest(validatedData);
      res.status(201).json(quoteRequest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid quote request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create quote request" });
    }
  });

  // API routes for contact messages
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(validatedData);
      res.status(201).json(contactMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact message data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create contact message" });
    }
  });

  // Material calculator endpoint
  app.post("/api/calculate", (req: Request, res: Response) => {
    try {
      const { calculatorType, length, width, height } = req.body;
      
      if (!calculatorType || !length || !width || (calculatorType !== 'pintura' && !height)) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
      
      let result: any = {};
      
      // Calculate based on calculator type
      switch (calculatorType) {
        case 'alvenaria':
          // Calculate bricks and mortar for wall
          const area = length * height;
          const bricksPerM2 = 25; // 25 bricks per square meter
          const mortarPerM2 = 0.02; // 0.02 cubic meters per square meter
          
          result = {
            bricks: Math.ceil(area * bricksPerM2),
            mortar: (area * mortarPerM2).toFixed(2),
            area: area.toFixed(2)
          };
          break;
          
        case 'concreto':
          // Calculate concrete components
          const volume = length * width * height;
          
          result = {
            cement: Math.ceil(volume * 350), // 350kg of cement per cubic meter
            sand: (volume * 0.7).toFixed(2), // 0.7 cubic meters of sand per cubic meter
            gravel: (volume * 0.8).toFixed(2), // 0.8 cubic meters of gravel per cubic meter
            volume: volume.toFixed(2)
          };
          break;
          
        case 'piso-revestimento':
          // Calculate tiles and adhesive
          const floorArea = length * width;
          const tilesPerM2 = 4; // Assuming 50x50cm tiles (4 per square meter)
          const adhesivePerM2 = 4; // 4kg per square meter
          
          result = {
            tiles: Math.ceil(floorArea * tilesPerM2 * 1.1), // 10% extra for cuts and waste
            adhesive: Math.ceil(floorArea * adhesivePerM2),
            grout: Math.ceil(floorArea * 0.5), // 0.5kg per square meter
            area: floorArea.toFixed(2)
          };
          break;
          
        case 'pintura':
          // Calculate paint
          const wallArea = length * height;
          const paintCoveragePerL = 10; // 10 square meters per liter
          const coats = 2; // 2 coats of paint
          
          result = {
            paint: Math.ceil((wallArea / paintCoveragePerL) * coats),
            primer: Math.ceil(wallArea / 12), // 12 square meters per liter for primer
            area: wallArea.toFixed(2)
          };
          break;
          
        default:
          return res.status(400).json({ message: "Invalid calculator type" });
      }
      
      res.json({ result });
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate materials" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
