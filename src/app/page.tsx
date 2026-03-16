"use client";

import { useState } from "react";
import Image from "next/image";

// ─── BRAND COLORS ────────────────────────────────────────────────────────────
// #89121a  (primary dark red)
// #922831  (accent red)
// #a54a50  (medium red)
// #b7696f  (soft red)
// #cb9296  (rose)
// #eedbdb  (blush background)

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface MenuItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  emoji: string;
  cat: "bayas" | "cafe" | "snack" | "dulce";
  tags: string[];
  featured?: boolean;
  badge?: string;
}

interface CartItem extends MenuItem {
  qty: number;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const MENU_ITEMS: MenuItem[] = [
  // Bebidas de Bayas
  {
    id: 1, name: "Kaffa Signature", desc: "La auténtica bebida de bayas con un toque de frescura exclusivo.",
    price: 3800, emoji: "🫐", cat: "bayas", tags: ["Bayas", "Favorito"], featured: true, badge: "Favorito",
  },
  {
    id: 2, name: "Kaffa Maqui", desc: "Potente antioxidante con maqui chileno del sur.",
    price: 3400, emoji: "🍇", cat: "bayas", tags: ["Bayas", "Chileno"], featured: true, badge: "Nuevo",
  },
  {
    id: 3, name: "Kaffa Frutilla", desc: "Frutillas frescas de temporada, endulzado naturalmente.",
    price: 3200, emoji: "🍓", cat: "bayas", tags: ["Bayas", "Temporada"], featured: true, badge: "Chef",
  },
  {
    id: 4, name: "Kaffa Original", desc: "Bebida de bayas naturales, sin azúcar añadida.",
    price: 3200, emoji: "🫐", cat: "bayas", tags: ["Bayas", "Sin azúcar"],
  },
  {
    id: 5, name: "Berry Latte", desc: "Mezcla especial de bayas con leche vaporizada artesanal.",
    price: 3500, emoji: "🍓", cat: "bayas", tags: ["Bayas", "Con leche"],
  },
  // Cafetería
  {
    id: 6, name: "Espresso Doble", desc: "100% Arábica de especialidad, extracción perfecta.",
    price: 2500, emoji: "☕", cat: "cafe", tags: ["Café"],
  },
  {
    id: 7, name: "Latte Vainilla", desc: "Textura sedosa, dulzor equilibrado y vainilla real.",
    price: 3200, emoji: "🥛", cat: "cafe", tags: ["Café", "Caliente"],
  },
  {
    id: 8, name: "Cappuccino", desc: "Espuma densa, café intenso y leche cremosa artesanal.",
    price: 2800, emoji: "🍵", cat: "cafe", tags: ["Café", "Clásico"],
  },
  {
    id: 9, name: "Cold Brew", desc: "Extracción en frío 16 horas. Suave y concentrado.",
    price: 3500, emoji: "🧋", cat: "cafe", tags: ["Café", "Frío"],
  },
  {
    id: 10, name: "Americano", desc: "Espresso largo, limpio y con cuerpo equilibrado.",
    price: 2200, emoji: "☕", cat: "cafe", tags: ["Café"],
  },
  // Snacks Salados
  {
    id: 11, name: "Sándwich Hunter", desc: "Pan de masa madre, pollo, pesto y tomates deshidratados.",
    price: 4200, emoji: "🥪", cat: "snack", tags: ["Salado", "Especial"],
  },
  {
    id: 12, name: "Tostado Queso", desc: "Mezcla de quesos fundidos sobre pan artesanal crujiente.",
    price: 2900, emoji: "🧀", cat: "snack", tags: ["Salado"],
  },
  {
    id: 13, name: "Croissant Relleno", desc: "Masa madre, crema de avellanas y almendras tostadas.",
    price: 2500, emoji: "🥐", cat: "snack", tags: ["Salado"],
  },
  {
    id: 14, name: "Croissant Jamón", desc: "Croissant hojaldrado, jamón serrano y queso crema.",
    price: 2500, emoji: "🥐", cat: "snack", tags: ["Salado"],
  },
  // Dulces
  {
    id: 15, name: "Tarta de Chocolate", desc: "Bizcocho húmedo, ganache oscuro y frambuesas frescas.",
    price: 3000, emoji: "🍰", cat: "dulce", tags: ["Dulce", "Sin gluten"],
  },
  {
    id: 16, name: "Muffin de Berries", desc: "Masa esponjosa con mix de berries del sur de Chile.",
    price: 1800, emoji: "🧁", cat: "dulce", tags: ["Dulce", "Artesanal"],
  },
  {
    id: 17, name: "Cheesecake Maqui", desc: "Base crocante, crema suave y coulis de maqui chileno.",
    price: 3200, emoji: "🍮", cat: "dulce", tags: ["Dulce", "Chileno"],
  },
];

const CATEGORIES = [
  { id: "all", label: "Todo" },
  { id: "bayas", label: "🫐 Bebidas de Bayas" },
  { id: "cafe", label: "☕ Cafetería" },
  { id: "snack", label: "🥐 Snacks Salados" },
  { id: "dulce", label: "🍰 Dulces" },
];

const FEATURED = MENU_ITEMS.filter((i) => i.featured);

// ─── FEATURED BG COLORS ───────────────────────────────────────────────────────
const FEAT_BG: Record<number, string> = {
  1: "#f5e8e8",
  2: "#ede8f5",
  3: "#f5ece8",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function TopBar({ cartCount, onCartOpen }: { cartCount: number; onCartOpen: () => void }) {
  return (
    <div className="flex items-center justify-between px-5 pt-4 pb-2">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 relative">
          <Image src="/assets/kaffa logo.png" alt="Kaffa Logo" fill className="object-contain" />
        </div>
        <div>
          <p className="text-[#89121a] font-bold text-[13px] tracking-[3px] uppercase leading-none">KAFFA</p>
          <p className="text-[#a54a50] font-light text-[9px] tracking-[2px] uppercase mt-0.5 whitespace-nowrap">Una Bebida de Bayas</p>
        </div>
      </div>
      <button
        onClick={onCartOpen}
        className="relative w-10 h-10 rounded-full bg-[#89121a] flex items-center justify-center active:scale-95 transition-transform shadow-lg shadow-[#89121a]/20"
      >
        <span className="text-white text-lg">🛒</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-[#89121a] text-[10px] font-black flex items-center justify-center border-2 border-[#89121a]">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
}

function Hero({ onAdd }: { onAdd: (item: MenuItem) => void }) {
  const sig = MENU_ITEMS[0];
  return (
    <section className="relative mx-4 mt-3 h-[42vh] rounded-[2.5rem] overflow-hidden flex flex-col justify-end p-8 shadow-2xl group">
      {/* background image */}
      <Image
        src="/assets/kaffa.jpeg"
        alt="KAFFA Signature"
        fill
        priority
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Dynamic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#89121a]/95 via-[#89121a]/40 to-black/10 z-10" />

      {/* big K watermark */}
      <span className="absolute right-5 top-4 text-white/5 font-black text-[140px] leading-none select-none z-0">K</span>

      <div className="relative z-20">
        <span className="inline-block bg-[#cb9296] text-[#89121a] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg mb-4">
          ★ NUEVO LANZAMIENTO
        </span>
        <h2 className="text-5xl font-black text-white leading-[0.95] tracking-tighter drop-shadow-2xl">
          KAFFA<br />
        </h2>
        <p className="text-[#eedbdb]/90 text-[14px] font-light mt-4 max-w-[85%] leading-relaxed drop-shadow-md">
          Nuestra bebida de bayas exclusiva. Refrescante, intensa y a medida.
        </p>
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => onAdd(sig)}
            className="bg-white text-[#89121a] font-black px-8 py-3.5 rounded-full text-[14px] shadow-[0_10px_20px_rgba(255,255,255,0.2)] active:scale-95 transition-all"
          >
            Pedir ahora
          </button>
          <span className="text-white font-black text-2xl tracking-tight">{fmt(sig.price)}</span>
        </div>
      </div>
    </section>
  );
}

function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <section className="mt-8 px-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#89121a] font-black text-xl tracking-tight">Nuestra Carta</h3>
        <span className="text-[11px] text-[#a54a50] font-bold uppercase tracking-widest">Explorar</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`flex-shrink-0 px-6 h-12 rounded-[20px] text-[13px] font-bold transition-all active:scale-95 flex items-center gap-2 border shadow-sm ${
              active === cat.id
                ? "bg-[#89121a] text-white border-[#89121a] shadow-[#89121a]/30"
                : "bg-white text-[#89121a] border-[#cb9296]/30 hover:border-[#89121a]/50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </section>
  );
}

function FeaturedCard({ item, onAdd }: { item: MenuItem; onAdd: (i: MenuItem) => void }) {
  return (
    <article className="flex-shrink-0 w-[240px] bg-white rounded-[2rem] overflow-hidden border border-[#cb9296]/20 shadow-xl shadow-[#89121a]/5 flex flex-col group">
      <div
        className="w-full h-40 flex items-center justify-center relative overflow-hidden"
        style={{ background: FEAT_BG[item.id] ?? "#f5e8e8" }}
      >
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
        <span className="text-6xl z-10 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">{item.emoji}</span>
        {item.badge && (
          <span className="absolute top-4 left-4 bg-[#89121a] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full z-20">
            {item.badge}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-black text-[18px] text-[#89121a] leading-tight">{item.name}</h4>
        <p className="text-xs text-[#a54a50] mt-2 leading-relaxed line-clamp-2 flex-1">{item.desc}</p>
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-[#eedbdb]">
          <span className="font-black text-[20px] text-[#922831] tracking-tighter">{fmt(item.price)}</span>
          <button
            onClick={() => onAdd(item)}
            className="w-10 h-10 rounded-2xl bg-[#89121a] text-white text-2xl flex items-center justify-center active:scale-90 transition-all shadow-lg shadow-[#89121a]/30"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

function FeaturedSection({ onAdd }: { onAdd: (i: MenuItem) => void }) {
  return (
    <section className="mt-8">
      <div className="flex items-end justify-between px-5 mb-5">
        <h3 className="text-[#89121a] font-black text-[26px] leading-[0.9] tracking-tighter">
          Recomendación<br />del Barista
        </h3>
        <button className="text-[#a54a50] text-[11px] font-black uppercase tracking-widest border-b-2 border-[#cb9296]/30 pb-1">
          Ver todo
        </button>
      </div>
      <div className="flex gap-5 overflow-x-auto px-5 pb-6 no-scrollbar">
        {FEATURED.map((item) => (
          <FeaturedCard key={item.id} item={item} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

function MenuListItem({ item, onAdd }: { item: MenuItem; onAdd: (i: MenuItem) => void }) {
  return (
    <article className="flex items-center gap-4 bg-white rounded-[1.5rem] p-4 border border-[#cb9296]/15 shadow-sm active:scale-[0.97] transition-all hover:shadow-md">
      <div className="w-16 h-16 rounded-[20px] bg-[#eedbdb]/40 flex items-center justify-center text-[30px] flex-shrink-0 border border-white/50 shadow-inner">
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-black text-[15px] text-[#89121a] truncate">{item.name}</h4>
        <p className="text-[11px] text-[#a54a50] mt-1 leading-snug line-clamp-2 font-medium">{item.desc}</p>
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {item.tags.map((t) => (
            <span
              key={t}
              className="text-[9px] font-black uppercase tracking-[0.1em] bg-[#eedbdb] text-[#89121a] px-2.5 py-0.5 rounded-full border border-[#cb9296]/20"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="text-right flex-shrink-0 pl-2">
        <p className="font-black text-[17px] text-[#922831] tracking-tighter">{fmt(item.price)}</p>
        <button
          onClick={() => onAdd(item)}
          className="mt-2 w-8 h-8 rounded-[12px] bg-[#eedbdb] text-[#89121a] text-xl flex items-center justify-center ml-auto transition-all active:scale-90 hover:bg-[#89121a] hover:text-white shadow-sm"
        >
          +
        </button>
      </div>
    </article>
  );
}

function MenuList({ filter, onAdd }: { filter: string; onAdd: (i: MenuItem) => void }) {
  const items = filter === "all" ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.cat === filter);
  return (
    <section className="mt-8 px-5">
      <div className="flex items-center gap-3 mb-5">
        <h3 className="text-[#89121a] font-black text-xl tracking-tight">
          {filter === "all" ? "Toda la Carta" : CATEGORIES.find((c) => c.id === filter)?.label ?? ""}
        </h3>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-[#cb9296]/50 to-transparent" />
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <MenuListItem key={item.id} item={item} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

function CartModal({
  cart,
  onClose,
  onChangeQty,
  onCheckout,
}: {
  cart: CartItem[];
  onClose: () => void;
  onChangeQty: (id: number, delta: number) => void;
  onCheckout: () => void;
}) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div
      className="fixed inset-0 bg-[#89121a]/20 backdrop-blur-md z-50 flex items-end"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-lg mx-auto rounded-t-[3rem] p-8 max-h-[85vh] overflow-y-auto shadow-[0_-20px_50px_rgba(137,18,26,0.15)] flex flex-col">
        {/* handle */}
        <div className="w-12 h-1.5 bg-[#eedbdb] rounded-full mx-auto mb-6" />
        <h2 className="text-3xl font-black text-[#89121a] mb-6 tracking-tighter">Tu Pedido</h2>

        {cart.length === 0 ? (
          <div className="py-16 text-center">
            <span className="text-6xl opacity-30">☕</span>
            <p className="mt-4 text-[#b7696f] font-bold">Tu carrito está esperando por ti</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 overflow-y-auto mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b border-[#eedbdb]/60">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <p className="font-black text-[15px] text-[#89121a] leading-tight">{item.name}</p>
                      <p className="text-[12px] text-[#a54a50] mt-0.5 font-bold">{fmt(item.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2.5 bg-[#eedbdb]/40 p-1 rounded-2xl">
                      <button
                        onClick={() => onChangeQty(item.id, -1)}
                        className="w-8 h-8 rounded-[12px] bg-white text-[#89121a] font-black text-xl flex items-center justify-center shadow-sm active:scale-90 transition-transform"
                      >
                        −
                      </button>
                      <span className="font-black text-[15px] text-[#89121a] w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => onChangeQty(item.id, 1)}
                        className="w-8 h-8 rounded-[12px] bg-[#89121a] text-white font-black text-xl flex items-center justify-center shadow-sm active:scale-90 transition-transform"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#eedbdb]/30 p-6 rounded-[2rem] border border-[#cb9296]/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[11px] font-black text-[#a54a50] uppercase tracking-widest">{count} PRODUCTO{count !== 1 ? "S" : ""}</p>
                  <p className="font-black text-2xl text-[#89121a] tracking-tighter mt-1">Total a pagar</p>
                </div>
                <p className="font-black text-3xl text-[#922831] tracking-tighter">{fmt(total)}</p>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full mt-6 bg-[#89121a] text-white font-black text-[16px] py-5 rounded-[2rem] active:scale-95 transition-all shadow-2xl shadow-[#89121a]/40 tracking-widest uppercase flex items-center justify-center gap-3"
            >
              Confirmar Pedido <span className="text-xl">→</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <div
      className={`fixed top-8 left-1/2 -translate-x-1/2 bg-[#89121a] text-white px-8 py-3.5 rounded-full shadow-[0_15px_30px_rgba(137,18,26,0.3)] transition-all duration-500 z-[100] whitespace-nowrap border-2 border-[#cb9296]/30 flex items-center gap-3 font-black text-[13px] tracking-wide ${
        show ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0 scale-90"
      }`}
    >
      <span className="text-xl bg-white/20 w-8 h-8 rounded-full flex items-center justify-center">✨</span>
      {message}
    </div>
  );
}

function StickyFooter({
  count,
  total,
  onOpen,
}: {
  count: number;
  total: number;
  onOpen: () => void;
}) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-sm z-40">
      <button
        onClick={onOpen}
        className="w-full bg-[#89121a] text-white rounded-[2.2rem] py-5 px-6 flex items-center justify-between font-black text-[15px] tracking-[0.1em] uppercase shadow-[0_20px_50px_rgba(137,18,26,0.5)] active:scale-[0.98] transition-all border-t-2 border-white/10"
      >
        <div className="flex items-center gap-4">
          <span className="bg-white text-[#89121a] rounded-[14px] px-3 py-1 text-[13px] font-black shadow-inner">{count}</span>
          <span className="drop-shadow-md">Mi Pedido</span>
        </div>
        <span className="font-black text-[18px] tracking-tighter bg-white/10 px-4 py-1.5 rounded-2xl">{fmt(total)}</span>
      </button>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "" });

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2500);
  };

  const handleAdd = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    showToast(`${item.name} agregado`);
  };

  const handleQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    );
  };

  const handleCheckout = () => {
    setCart([]);
    setCartOpen(false);
    showToast("¡Pedido confirmado con éxito!");
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Toast message={toast.msg} show={toast.show} />

      <div className="min-h-screen bg-[#eedbdb] pb-32 max-w-lg mx-auto">
        <TopBar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
        <Hero onAdd={handleAdd} />
        <CategoryFilter active={activeFilter} onChange={setActiveFilter} />
        {activeFilter === "all" && <FeaturedSection onAdd={handleAdd} />}
        <MenuList filter={activeFilter} onAdd={handleAdd} />
      </div>

      {cartCount > 0 && (
        <StickyFooter count={cartCount} total={cartTotal} onOpen={() => setCartOpen(true)} />
      )}

      {cartOpen && (
        <CartModal
          cart={cart}
          onClose={() => setCartOpen(false)}
          onChangeQty={handleQty}
          onCheckout={handleCheckout}
        />
      )}
    </>
  );
}
