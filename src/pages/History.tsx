import { useState } from "react";
import Icon from "@/components/ui/icon";

const historyData = [
  {
    id: 1,
    type: "image",
    title: "Космонавт в неоновом городе",
    date: "20 марта, 14:32",
    tags: ["Киберпанк", "HD"],
    preview: "https://images.unsplash.com/photo-1686541988360-39b88a4ebb25?w=80&q=60",
  },
  {
    id: 2,
    type: "course",
    title: "Влияние цифровой экономики на рынок труда",
    date: "19 марта, 09:15",
    tags: ["Экономика", "30 стр"],
    preview: null,
  },
  {
    id: 3,
    type: "image",
    title: "Дракон среди горных вершин",
    date: "18 марта, 22:48",
    tags: ["Фэнтези", "4K"],
    preview: "https://images.unsplash.com/photo-1682685797406-97f364419b4a?w=80&q=60",
  },
  {
    id: 4,
    type: "course",
    title: "Психология принятия решений в условиях неопределённости",
    date: "17 марта, 16:05",
    tags: ["Психология", "40 стр"],
    preview: null,
  },
  {
    id: 5,
    type: "image",
    title: "Абстрактный цифровой арт",
    date: "16 марта, 11:20",
    tags: ["Минимализм", "1:1"],
    preview: "https://images.unsplash.com/photo-1684779847639-fbcc3c8b8a3a?w=80&q=60",
  },
];

type Filter = "all" | "image" | "course";

export default function History() {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const filtered = historyData.filter(item => {
    const matchType = filter === "all" || item.type === filter;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="pill bg-accent text-black">ИСТОРИЯ</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Все <span className="neon-yellow" style={{textShadow: '0 0 20px rgba(255,230,0,0.7)'}}>запросы</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-body">Все созданные изображения и курсовые работы</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3">
            <Icon name="Search" size={16} className="text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-white placeholder-muted-foreground font-body text-sm w-full"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "image", "course"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`pill transition-all duration-200 ${
                  filter === f
                    ? "bg-accent text-black"
                    : "bg-muted text-muted-foreground hover:text-white"
                }`}
              >
                {f === "all" ? "Все" : f === "image" ? "Изображения" : "Курсовые"}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 opacity-40">
            <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="font-display text-sm text-muted-foreground">Ничего не найдено</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 card-hover cursor-pointer animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                {/* Icon / Preview */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center">
                  {item.preview ? (
                    <img src={item.preview} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-neon-purple/10 flex items-center justify-center">
                      <Icon name="FileText" size={22} className="text-neon-purple" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm text-white truncate">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-body text-xs text-muted-foreground">{item.date}</span>
                    <span className="text-muted-foreground">·</span>
                    <div className="flex gap-1">
                      {item.tags.map(tag => (
                        <span key={tag} className="pill bg-muted text-muted-foreground text-[10px] py-0.5">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Type badge */}
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className={`pill text-[10px] ${
                    item.type === "image" ? "bg-neon-green/10 text-neon-green" : "bg-neon-purple/10 text-neon-purple"
                  }`}>
                    {item.type === "image" ? "Изображение" : "Курсовая"}
                  </span>
                  <button className="w-8 h-8 rounded-xl bg-muted hover:bg-border flex items-center justify-center transition-colors">
                    <Icon name="Download" size={14} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <p className="font-body text-xs text-muted-foreground text-center mt-6">
            Показано {filtered.length} из {historyData.length} записей
          </p>
        )}
      </div>
    </div>
  );
}
