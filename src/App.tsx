import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Customize from "./pages/Customize";
import Enquiry from "./pages/Enquiry";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <SchemaMarkup />
    <Toaster />
    <Sonner position="top-center" />
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:handle" element={<ProductDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/customize" element={<Customize />} />
      <Route path="/enquiry" element={<Enquiry />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </TooltipProvider>
);

export default App;