export interface LocalProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  category: string;
  price: number;
  currencyCode: string;
  image: string;
  images: string[];
  featured?: boolean;
  shopifyVariantId?: string | null;
}

const products: LocalProduct[] = [
  // === Resin Art & Decor ===
  {
    id: "resin-clock-1",
    title: "Custom Resin Clock",
    description: "Hand-poured resin clock with custom colors and embedded elements. Each piece features unique swirl patterns and can be personalized with names, dates or logos. A timeless gift for home or office.",
    handle: "custom-resin-clock",
    category: "resin-art",
    price: 89.99,
    currencyCode: "USD",
    image: "/products/resinclock.png",
    images: ["/products/resinclock.png", "/products/resinclock2.png"],
    featured: true
  },
  {
    id: "resin-memory",
    title: "Resin Memory Keepsake",
    description: "Preserve cherished memories in clear resin. Ideal for displaying baby shoes, wedding flowers, handwritten notes or small mementos. Each piece is handcrafted and bubble-free.",
    handle: "resin-memory-keepsake",
    category: "resin-art",
    price: 74.99,
    currencyCode: "USD",
    image: "/products/resinmemory.png",
    images: ["/products/resinmemory.png"],
    featured: true
  },
  {
    id: "resin-scene",
    title: "Resin Scene Art",
    description: "Intricate layered resin scene with depth and dimension. Custom ocean, forest, galaxy or abstract themes available. Perfect as a centerpiece or wall art.",
    handle: "resin-scene-art",
    category: "resin-art",
    price: 129.99,
    currencyCode: "USD",
    image: "/products/resinscene.png",
    images: ["/products/resinscene.png"]
  },
  {
    id: "decor-piece-1",
    title: "Resin Decor Piece",
    description: "Elegant resin decor piece for modern interiors. Available in various sizes and color combinations. Each piece is one of a kind with natural stone, glitter or metallic accents.",
    handle: "resin-decor-piece",
    category: "resin-art",
    price: 59.99,
    currencyCode: "USD",
    image: "/products/decorpiece.png",
    images: ["/products/decorpiece.png", "/products/decorpiece2.png"],
    featured: true
  },
  {
    id: "decor-piece-2",
    title: "Large Resin Decor Panel",
    description: "Statement resin decor panel designed for wall mounting. Features deep dimensional layers, metallic foils and embedded crystals. Custom sizes available for commercial projects.",
    handle: "large-resin-decor",
    category: "resin-art",
    price: 199.99,
    currencyCode: "USD",
    image: "/products/decorpiece2.png",
    images: ["/products/decorpiece2.png"]
  },
  {
    id: "natured-lamp-1",
    title: "Nature-Themed Resin Lamp",
    description: "Handcrafted resin lamp with embedded natural elements. Features warm LED lighting and a hand-poured resin base with flowers, stones or shells preserved inside.",
    handle: "nature-resin-lamp",
    category: "resin-art",
    price: 149.99,
    currencyCode: "USD",
    image: "/products/nlamp.png",
    images: ["/products/nlamp.png", "/products/nlamp2.png", "/products/nlamp3.png", "/products/nlamp4.png", "/products/nlamp5.png"],
    featured: true
  },
  {
    id: "natured-lamp-2",
    title: "Mini Resin Night Lamp",
    description: "Compact resin night lamp with soft ambient glow. Ideal for bedside tables, nursery rooms or desk decor. Available in multiple color themes.",
    handle: "mini-resin-lamp",
    category: "resin-art",
    price: 49.99,
    currencyCode: "USD",
    image: "/products/nlamp2.png",
    images: ["/products/nlamp2.png"]
  },
  {
    id: "natured-lamp-3",
    title: "Resin Himalayan-Style Lamp",
    description: "Resin lamp crafted to mimic natural Himalayan salt crystal textures. Warm amber glow creates a cozy atmosphere. Great for gifting or personal wellness spaces.",
    handle: "resin-himalayan-lamp",
    category: "resin-art",
    price: 79.99,
    currencyCode: "USD",
    image: "/products/nlamp3.png",
    images: ["/products/nlamp3.png"]
  },
  {
    id: "natured-lamp-4",
    title: "Geode Resin Lamp",
    description: "Stunning geode-inspired resin lamp with crystal center. Features metallic accents and color-changing LED base. A dramatic conversation piece for any room.",
    handle: "geode-resin-lamp",
    category: "resin-art",
    price: 169.99,
    currencyCode: "USD",
    image: "/products/nlamp4.png",
    images: ["/products/nlamp4.png"]
  },
  {
    id: "natured-lamp-5",
    title: "Abstract Resin Table Lamp",
    description: "Modern abstract resin table lamp with fluid art design. Each lamp is uniquely poured with coordinating colors. Fits contemporary and bohemian interiors.",
    handle: "abstract-resin-lamp",
    category: "resin-art",
    price: 119.99,
    currencyCode: "USD",
    image: "/products/nlamp5.png",
    images: ["/products/nlamp5.png"]
  },
  {
    id: "nature-scene",
    title: "Nature Scene Resin Art",
    description: "Panoramic nature scene preserved in resin. Custom landscapes, seascapes or forest scenes with embedded natural materials. Museum-quality finish.",
    handle: "nature-scene-resin",
    category: "resin-art",
    price: 189.99,
    currencyCode: "USD",
    image: "/products/nscene.png",
    images: ["/products/nscene.png"]
  },
  {
    id: "gradient-art-1",
    title: "Gradient Resin Art Panel",
    description: "Fluid gradient resin art panel with smooth color transitions. Perfect for modern wall decor. Available in warm sunset, ocean blue or custom color schemes.",
    handle: "gradient-resin-panel",
    category: "resin-art",
    price: 89.99,
    currencyCode: "USD",
    image: "/products/grad.png",
    images: ["/products/grad.png", "/products/grad2.png", "/products/grad3.png", "/products/grad4.png"]
  },
  {
    id: "gradient-art-2",
    title: "Ombre Resin Wall Art",
    description: "Large format ombre resin wall art piece. Hand-poured with precision to achieve seamless color flows. Each panel is signed and dated by the artist.",
    handle: "ombre-resin-wall-art",
    category: "resin-art",
    price: 149.99,
    currencyCode: "USD",
    image: "/products/grad2.png",
    images: ["/products/grad2.png"]
  },
  {
    id: "gradient-art-3",
    title: "Metallic Resin Art",
    description: "Resin art with embedded metallic foils and pearlescent pigments. Shifts color in different lighting. A striking addition to modern office or living spaces.",
    handle: "metallic-resin-art",
    category: "resin-art",
    price: 109.99,
    currencyCode: "USD",
    image: "/products/grad3.png",
    images: ["/products/grad3.png"]
  },
  {
    id: "gradient-art-4",
    title: "Marble Resin Decor",
    description: "Luxury marble-effect resin decor piece. Suitable as a serving tray, catch-all or standalone sculpture. Each piece features unique veining patterns.",
    handle: "marble-resin-decor",
    category: "resin-art",
    price: 69.99,
    currencyCode: "USD",
    image: "/products/grad4.png",
    images: ["/products/grad4.png"]
  },
  {
    id: "tiles",
    title: "Custom Resin Tiles",
    description: "Bespoke resin tiles for interior design projects. Available in various sizes with custom colors, patterns and embedded elements. Ideal for feature walls, backsplashes and tabletops.",
    handle: "custom-resin-tiles",
    category: "resin-art",
    price: 39.99,
    currencyCode: "USD",
    image: "/products/tiles.png",
    images: ["/products/tiles.png"]
  },
  {
    id: "container",
    title: "Resin Storage Container",
    description: "Handcrafted resin container with lid. Perfect for jewelry, keepsakes or desk organization. Available in multiple sizes and color combinations.",
    handle: "resin-storage-container",
    category: "resin-art",
    price: 44.99,
    currencyCode: "USD",
    image: "/products/container.png",
    images: ["/products/container.png"]
  },

  // === Engraved Items ===
  {
    id: "engraved-name",
    title: "Personalized Name Plate",
    description: "Laser-engraved name plate in wood or acrylic. Perfect for desks, doors or display. Choose from multiple fonts, sizes and finishes.",
    handle: "personalized-name-plate",
    category: "engraved",
    price: 24.99,
    currencyCode: "USD",
    image: "/products/name.png",
    images: ["/products/name.png"]
  },
  {
    id: "engraved-letter-1",
    title: "Personalized Letter Art",
    description: "Custom engraved letter art featuring your chosen initial or monogram. Beautifully crafted in wood or acrylic with optional gold or silver leaf accents.",
    handle: "personalized-letter-art",
    category: "engraved",
    price: 34.99,
    currencyCode: "USD",
    image: "/products/letter.png",
    images: ["/products/letter.png", "/products/letter2.png"]
  },
  {
    id: "engraved-elegance",
    title: "Engraved Elegance Plaque",
    description: "Premium engraved plaque for awards, recognition or commemorative purposes. Precision laser engraving on solid wood or brushed acrylic.",
    handle: "engraved-elegance-plaque",
    category: "engraved",
    price: 49.99,
    currencyCode: "USD",
    image: "/products/engraved_elegance.png",
    images: ["/products/engraved_elegance.png"]
  },
  {
    id: "papa-keepsake",
    title: "Personalized Papa Gift",
    description: "Heartfelt engraved keepsake designed as a gift for fathers and father figures. Custom text and design options available. A meaningful and lasting tribute.",
    handle: "personalized-papa-gift",
    category: "engraved",
    price: 39.99,
    currencyCode: "USD",
    image: "/products/papa.png",
    images: ["/products/papa.png"]
  },
  {
    id: "music-keepsake",
    title: "Music-Themed Engraved Keepsake",
    description: "Engraved keepsake featuring musical notes, lyrics or song dedications. Ideal for musicians, music lovers or as a wedding gift featuring your first dance song.",
    handle: "music-engraved-keepsake",
    category: "engraved",
    price: 44.99,
    currencyCode: "USD",
    image: "/products/music.png",
    images: ["/products/music.png"]
  },
  {
    id: "ornament-engraved",
    title: "Engraved Holiday Ornament",
    description: "Custom engraved ornament for holidays, weddings or memory celebrations. Double-sided engraving available. Each ornament comes in a gift box.",
    handle: "engraved-ornament",
    category: "engraved",
    price: 29.99,
    currencyCode: "USD",
    image: "/products/ornament.png",
    images: ["/products/ornament.png"]
  },
  {
    id: "calendar-engraved",
    title: "Custom Engraved Calendar",
    description: "Perpetual calendar with engraved wood or acrylic base. Custom dates, names or messages can be added. A practical and elegant desk accessory.",
    handle: "engraved-calendar",
    category: "engraved",
    price: 54.99,
    currencyCode: "USD",
    image: "/products/calendar.png",
    images: ["/products/calendar.png"]
  },
  {
    id: "light-engraved",
    title: "Engraved Light Box",
    description: "LED light box with engraved front panel. Custom text or design illuminates beautifully. Great for businesses, events or bedroom decor.",
    handle: "engraved-light-box",
    category: "engraved",
    price: 64.99,
    currencyCode: "USD",
    image: "/products/light.png",
    images: ["/products/light.png"]
  },
  {
    id: "tree-engraved",
    title: "Engraved Family Tree",
    description: "Custom engraved family tree plaque showing generations. Names and dates precision engraved on solid wood. A meaningful heirloom piece.",
    handle: "engraved-family-tree",
    category: "engraved",
    price: 79.99,
    currencyCode: "USD",
    image: "/products/tree.png",
    images: ["/products/tree.png"]
  },

  // === Certificates & Awards ===
  {
    id: "certificate-1",
    title: "Custom Certificate Award",
    description: "Premium certificate award with engraved wooden or acrylic mount. Suitable for employee recognition, sports achievements or academic milestones.",
    handle: "custom-certificate-award",
    category: "frames",
    price: 44.99,
    currencyCode: "USD",
    image: "/products/certificate.png",
    images: ["/products/certificate.png", "/products/certificate2.png"]
  },
  {
    id: "certificate-2",
    title: "Framed Certificate Plaque",
    description: "Elegant framed certificate plaque with glass front and engraved plate. Ideal for professional certifications, diplomas and formal recognitions.",
    handle: "framed-certificate-plaque",
    category: "frames",
    price: 59.99,
    currencyCode: "USD",
    image: "/products/certificate2.png",
    images: ["/products/certificate2.png"]
  },
  {
    id: "caricature",
    title: "Custom Caricature Portrait",
    description: "Hand-drawn digital caricature printed and framed. Send us your photo and we create a personalized caricature. Great for gifts, events and office decor.",
    handle: "custom-caricature-portrait",
    category: "frames",
    price: 49.99,
    currencyCode: "USD",
    image: "/products/caricature.png",
    images: ["/products/caricature.png"]
  },
  {
    id: "apotrait",
    title: "Custom Portrait Art",
    description: "Personalized portrait created from your photograph. Available in various artistic styles including pencil sketch, watercolor effect and pop art. Framed ready.",
    handle: "custom-portrait-art",
    category: "frames",
    price: 69.99,
    currencyCode: "USD",
    image: "/products/apotrait.png",
    images: ["/products/apotrait.png"]
  },

  // === Bottles & Drinkware ===
  {
    id: "bottle-1",
    title: "Custom Engraved Bottle",
    description: "Premium stainless steel bottle with custom engraving. Double-wall insulated, keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.",
    handle: "custom-engraved-bottle",
    category: "bottles",
    price: 34.99,
    currencyCode: "USD",
    image: "/products/bottle.png",
    images: ["/products/bottle.png"],
    featured: true
  },
  {
    id: "tumbler-1",
    title: "Custom Sublimated Tumbler",
    description: "Full-color sublimated tumbler with fade-resistant print. Double-wall vacuum insulation. Fits most cup holders. Perfect for coffee, tea or cold beverages.",
    handle: "custom-sublimated-tumbler",
    category: "bottles",
    price: 29.99,
    currencyCode: "USD",
    image: "/products/tumbler.png",
    images: ["/products/tumbler.png", "/products/tumbler2.png"],
    featured: true
  },
  {
    id: "stanley-cup",
    title: "Custom Stanley Cup",
    description: "Personalized Stanley Adventure Quencher with custom engraving or sublimation. The iconic tumbler now customized for you. Available in multiple sizes and colors.",
    handle: "custom-stanley-cup",
    category: "bottles",
    price: 54.99,
    currencyCode: "USD",
    image: "/products/stanley.png",
    images: ["/products/stanley.png"]
  },
  {
    id: "bottle-2",
    title: "Personalized Water Bottle",
    description: "Lightweight aluminum water bottle with custom design. Perfect for sports teams, corporate events or personal use. Matching lids and accessories available.",
    handle: "personalized-water-bottle",
    category: "bottles",
    price: 24.99,
    currencyCode: "USD",
    image: "/products/bottle.png",
    images: ["/products/bottle.png"]
  },

  // === Keychains, Tags & Small Items ===
  {
    id: "luggage-tag",
    title: "Custom Engraved Luggage Tag",
    description: "Personalized leather or acrylic luggage tag with engraved contact details. Stylish and practical for travel. Coordinates with our bag collection.",
    handle: "custom-luggage-tag",
    category: "keychains",
    price: 14.99,
    currencyCode: "USD",
    image: "/products/luggagetag.png",
    images: ["/products/luggagetag.png"]
  },
  {
    id: "keychain-chain",
    title: "Custom Chain Keychain",
    description: "Bold chain keychain with custom engraved plate. Durable construction with premium metal finish. Great for branding, events or personal use.",
    handle: "custom-chain-keychain",
    category: "keychains",
    price: 19.99,
    currencyCode: "USD",
    image: "/products/chain.png",
    images: ["/products/chain.png"]
  },
  {
    id: "magnets",
    title: "Custom Magnets",
    description: "Set of custom magnets with your design, logo or artwork. Strong magnetic backing, suitable for refrigerators, whiteboards or office filing cabinets.",
    handle: "custom-magnets",
    category: "keychains",
    price: 12.99,
    currencyCode: "USD",
    image: "/products/magnets.png",
    images: ["/products/magnets.png"]
  },
  {
    id: "papercharm",
    title: "Paper Charm Keepsake",
    description: "Delicate paper charm preserved in resin or acrylic. Perfect for preserving a special note, drawing or printed photo in a portable keepsake form.",
    handle: "paper-charm-keepsake",
    category: "keychains",
    price: 16.99,
    currencyCode: "USD",
    image: "/products/papercharm.png",
    images: ["/products/papercharm.png"]
  },
  {
    id: "puzzle-piece-1",
    title: "Custom Puzzle Piece Keychain",
    description: "Personalized puzzle piece keychain symbolizing connection and unity. Great for couples, families, teams or autism awareness. Laser engraved with names or dates.",
    handle: "puzzle-piece-keychain",
    category: "keychains",
    price: 17.99,
    currencyCode: "USD",
    image: "/products/puzzlepiece.png",
    images: ["/products/puzzlepiece.png", "/products/puzzlepiece2.png"]
  },

  // === Bags, Purses & Packaging ===
  {
    id: "bag-1",
    title: "Custom Tote Bag",
    description: "Premium canvas tote bag with custom print or embroidery. Durable construction with reinforced handles. Ideal for brand giveaways, events and retail packaging.",
    handle: "custom-tote-bag",
    category: "custom",
    price: 29.99,
    currencyCode: "USD",
    image: "/products/bag.png",
    images: ["/products/bag.png", "/products/bag2.png"],
    featured: true
  },
  {
    id: "bag-2",
    title: "Personalized Gift Bag",
    description: "Luxury gift bag with custom printing, ribbon handles and tissue paper. Perfect for retail packaging, corporate gifts and special occasion gifting.",
    handle: "personalized-gift-bag",
    category: "custom",
    price: 19.99,
    currencyCode: "USD",
    image: "/products/bag2.png",
    images: ["/products/bag2.png"]
  },
  {
    id: "purse",
    title: "Custom Clutch Purse",
    description: "Personalized clutch purse with custom engraving or monogram. Premium materials with elegant finish. Ideal for weddings, bridal parties and special events.",
    handle: "custom-clutch-purse",
    category: "custom",
    price: 49.99,
    currencyCode: "USD",
    image: "/products/purse.png",
    images: ["/products/purse.png"]
  },
  {
    id: "basket-1",
    title: "Custom Gift Basket",
    description: "Curated gift basket assembled with premium items. Customizable with your choice of products, colors and themes. Perfect for corporate and personal gifting.",
    handle: "custom-gift-basket",
    category: "custom",
    price: 89.99,
    currencyCode: "USD",
    image: "/products/basket.png",
    images: ["/products/basket.png", "/products/basket2.png"]
  },
  {
    id: "gift-packaging",
    title: "Luxury Gift Packaging Set",
    description: "Complete gift packaging set including custom box, tissue paper, ribbon and card. Elevate your gift presentation with branded, premium packaging.",
    handle: "luxury-gift-packaging",
    category: "custom",
    price: 24.99,
    currencyCode: "USD",
    image: "/products/giftpackaging.png",
    images: ["/products/giftpackaging.png"]
  },

  // === Boxes ===
  {
    id: "box-1",
    title: "Custom Gift Box",
    description: "Premium custom gift box with lid. Available in various sizes with custom printing, foil stamping or engraving. Ideal for retail, corporate and event gifting.",
    handle: "custom-gift-box",
    category: "custom",
    price: 22.99,
    currencyCode: "USD",
    image: "/products/box.png",
    images: ["/products/box.png", "/products/box2.png", "/products/box3.png"],
    featured: true
  },
  {
    id: "box-2",
    title: "Engraved Wooden Box",
    description: "Solid wood keepsake box with laser-engraved lid. Perfect for jewelry, watches, cigars or sentimental items. Available in multiple wood types and sizes.",
    handle: "engraved-wooden-box",
    category: "custom",
    price: 59.99,
    currencyCode: "USD",
    image: "/products/box2.png",
    images: ["/products/box2.png"]
  },
  {
    id: "box-3",
    title: "Magnetic Closure Gift Box",
    description: "Premium rigid gift box with magnetic closure. Lined with velvet or satin interior. Custom foam inserts available for product presentation.",
    handle: "magnetic-gift-box",
    category: "custom",
    price: 34.99,
    currencyCode: "USD",
    image: "/products/box3.png",
    images: ["/products/box3.png"]
  },

  // === Apparel & Textiles ===
  {
    id: "shirt-1",
    title: "Custom Printed Shirt",
    description: "Premium t-shirt with custom sublimation or screen printing. Soft, breathable fabric with fade-resistant print. Available in all sizes and multiple colors.",
    handle: "custom-printed-shirt",
    category: "custom",
    price: 29.99,
    currencyCode: "USD",
    image: "/products/shirt.png",
    images: ["/products/shirt.png"]
  },
  {
    id: "socks",
    title: "Custom Socks",
    description: "Custom printed socks with your design, logo or pattern. Comfortable knit fabric with reinforced heel and toe. Great for corporate gifts, events and branding.",
    handle: "custom-socks",
    category: "custom",
    price: 14.99,
    currencyCode: "USD",
    image: "/products/socks.png",
    images: ["/products/socks.png"]
  },

  // === Sublimation & Printing ===
  {
    id: "sublimation-print",
    title: "Sublimation Print Service",
    description: "Professional sublimation printing on various substrates including metal, ceramic, polyester and more. Full-color, photo-quality prints that never fade.",
    handle: "sublimation-print-service",
    category: "custom",
    price: 19.99,
    currencyCode: "USD",
    image: "/products/sublimation.png",
    images: ["/products/sublimation.png"]
  },
  {
    id: "vinyl-dtf",
    title: "Custom Vinyl & DTF Transfer",
    description: "Custom vinyl decals and DTF (Direct to Film) transfers for apparel and accessories. Weather-resistant outdoor vinyl available. Bulk pricing for businesses.",
    handle: "custom-vinyl-dtf",
    category: "custom",
    price: 9.99,
    currencyCode: "USD",
    image: "/products/vinyldtf.png",
    images: ["/products/vinyldtf.png"]
  },

  // === Books & Stationery ===
  {
    id: "book",
    title: "Custom Photo Book",
    description: "Personalized photo book printed on premium paper with custom cover. Layflat pages, multiple sizes available. Perfect for weddings, graduations and family memories.",
    handle: "custom-photo-book",
    category: "custom",
    price: 44.99,
    currencyCode: "USD",
    image: "/products/book.png",
    images: ["/products/book.png"]
  },

  // === Wood Creations ===
  {
    id: "wood-creation",
    title: "Custom Wood Creation",
    description: "Bespoke wood creation crafted to your specifications. From signs and decor to functional pieces. Each item is cut, sanded and finished by hand.",
    handle: "custom-wood-creation",
    category: "engraved",
    price: 54.99,
    currencyCode: "USD",
    image: "/products/woodcreation.png",
    images: ["/products/woodcreation.png"]
  },

  // === Whiteboards ===
  {
    id: "whiteboard-1",
    title: "Custom Whiteboard",
    description: "Personalized whiteboard with custom print or engraving. Perfect for offices, classrooms or home organization. Dry-erase surface with magnetic backing.",
    handle: "custom-whiteboard",
    category: "custom",
    price: 39.99,
    currencyCode: "USD",
    image: "/products/whiteboard.png",
    images: ["/products/whiteboard.png", "/products/whiteboard2.png"]
  },

  // === Specialty Items ===
  {
    id: "chocolate-cup",
    title: "Chocolate Cup Gift Set",
    description: "Decorative chocolate cup filled with premium treats. Custom packaging with your message or branding. A sweet gift for clients, teams and special occasions.",
    handle: "chocolate-cup-gift",
    category: "custom",
    price: 24.99,
    currencyCode: "USD",
    image: "/products/chocolatecup.png",
    images: ["/products/chocolatecup.png"]
  },
  {
    id: "cycle-art-1",
    title: "Custom Bicycle Art",
    description: "Custom bicycle-themed art piece. Engraved or printed with your design, team name or event details. Great for cycling clubs, events and enthusiasts.",
    handle: "custom-bicycle-art",
    category: "custom",
    price: 49.99,
    currencyCode: "USD",
    image: "/products/cycle.png",
    images: ["/products/cycle.png", "/products/cycle2.png"]
  },
];

export default products;

export const productCategories = [
  { id: "all", name: "All Products" },
  { id: "resin-art", name: "Resin Art" },
  { id: "engraved", name: "Engraved Items" },
  { id: "frames", name: "Frames & Art" },
  { id: "bottles", name: "Water Bottles" },
  { id: "keychains", name: "Keychains" },
  { id: "custom", name: "Custom Gifts" },
];

export function getProductByHandle(handle: string): LocalProduct | undefined {
  return products.find(p => p.handle === handle);
}

export function formatPrice(amount: number, currencyCode: string = "USD"): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}
