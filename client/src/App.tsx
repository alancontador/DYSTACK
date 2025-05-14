import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Layouts
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

// Pages
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductCategory from "@/pages/ProductCategory";
import ProductDetails from "@/pages/ProductDetails";
import Calculators from "@/pages/Calculators";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/produtos" component={Products} />
          <Route path="/produtos/categoria/:categoryId" component={ProductCategory} />
          <Route path="/produtos/:productId" component={ProductDetails} />
          <Route path="/calculadoras" component={Calculators} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:postId" component={BlogPost} />
          <Route path="/sobre" component={About} />
          <Route path="/contato" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
