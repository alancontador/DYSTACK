import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Schema for form validation
const quoteFormSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone inválido" }),
  address: z.string().optional(),
  message: z.string().min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" }),
  products: z.array(z.number()).optional(),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

const QuoteForm = () => {
  const [location] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  // Get products for selection
  const { data: products } = useQuery({
    queryKey: ["/api/products"],
  });

  // Initialize form with react-hook-form
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
      products: [],
    },
  });

  useEffect(() => {
    // Check if there's a product ID in the URL query params
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    
    if (productId) {
      const productIdNumber = parseInt(productId, 10);
      if (!isNaN(productIdNumber)) {
        setSelectedProducts([productIdNumber]);
        form.setValue('products', [productIdNumber]);
      }
    }
  }, [form]);

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await apiRequest("POST", "/api/quote", {
        ...data,
        products: selectedProducts.length > 0 ? selectedProducts : undefined,
      });
      
      toast({
        title: "Solicitação enviada!",
        description: "Entraremos em contato com o seu orçamento em breve.",
      });
      
      form.reset();
      setSelectedProducts([]);
    } catch (error) {
      console.error("Error submitting quote form:", error);
      toast({
        title: "Erro ao enviar solicitação",
        description: "Por favor, tente novamente ou entre em contato por telefone.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });

    // Update the form value as well
    const updatedProducts = selectedProducts.includes(productId)
      ? selectedProducts.filter(id => id !== productId)
      : [...selectedProducts, productId];
    
    form.setValue('products', updatedProducts);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="seu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(00) 00000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço da Obra (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Endereço completo da obra" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {products && products.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-3">Selecione os produtos para seu orçamento:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 max-h-48 overflow-y-auto border rounded-md p-3">
              {products.map((product: any) => (
                <div key={product.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`product-${product.id}`}
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => toggleProductSelection(product.id)}
                  />
                  <label 
                    htmlFor={`product-${product.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {product.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem / Detalhes do Orçamento</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva detalhes do seu projeto, quantidades desejadas e outras informações relevantes para o orçamento..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Solicitar Orçamento"}
        </Button>
      </form>
    </Form>
  );
};

export default QuoteForm;
