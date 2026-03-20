import { useState } from "react";
import Icon from "@/components/ui/icon";

const documents = [
  {
    id: 1,
    name: "Курсовая_Экономика.docx",
    topic: "Влияние цифровой экономики на рынок труда",
    size: "1.2 МБ",
    pages: 30,
    date: "20 марта 2025",
    type: "course",
  },
  {
    id: 2,
    name: "Курсовая_Психология.docx",
    topic: "Психология принятия решений в условиях неопределённости",
    size: "0.9 МБ",
    pages: 40,
    date: "17 марта 2025",
    type: "course",
  },
  {
    id: 3,
    name: "Изображение_Космос.png",
    topic: "Космонавт в неоновом городе",
    size: "3.4 МБ",
    pages: null,
    date: "19 марта 2025",
    type: "image",
  },
  {
    id: 4,
    name: "Курсовая_Право.docx",
    topic: "Правовое регулирование криптовалют в России",
    size: "1.1 МБ",
    pages: 25,
    date: "15 марта 2025",
    type: "course",
  },
  {
    id: 5,
    name: "Изображение_Дракон.png",
    topic: "Дракон среди горных вершин",
    size: "4.1 МБ",
    pages: null,
    date: "18 марта 2025",
    type: "image",
  },
];

export default function Documents() {
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");
  const [search, setSearch] = useState("");

  const filtered = documents
    .filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.topic.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "size") return parseFloat(b.size) - parseFloat(a.size);
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const totalSize = documents.reduce((acc, d) => acc + parseFloat(d.size), 0).toFixed(1);

  return (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="pill bg-neon-green text-black">ДОКУМЕНТЫ</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Мои <span className="neon-green text-glow-green">файлы</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-body">Все созданные документы и изображения</p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Всего файлов", value: String(documents.length), icon: "Folder" },
            { label: "Занято места", value: `${totalSize} МБ`, icon: "HardDrive" },
            { label: "Документов Word", value: String(documents.filter(d => d.type === "course").length), icon: "FileText" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neon-green/10 flex items-center justify-center flex-shrink-0">
                <Icon name={s.icon} size={18} className="text-neon-green" />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-white">{s.value}</p>
                <p className="font-body text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3">
            <Icon name="Search" size={16} className="text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Поиск файлов..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-white placeholder-muted-foreground font-body text-sm w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-muted-foreground">Сортировка:</span>
            {(["date", "name", "size"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`pill transition-all duration-200 ${
                  sortBy === s ? "bg-neon-green text-black" : "bg-muted text-muted-foreground hover:text-white"
                }`}
              >
                {s === "date" ? "Дата" : s === "name" ? "Имя" : "Размер"}
              </button>
            ))}
          </div>
        </div>

        {/* Files */}
        <div className="space-y-3">
          {filtered.map((doc, i) => (
            <div
              key={doc.id}
              className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 card-hover animate-fade-in"
              style={{ animationDelay: `${i * 0.06}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                doc.type === "course" ? "bg-neon-purple/10" : "bg-neon-green/10"
              }`}>
                <Icon
                  name={doc.type === "course" ? "FileText" : "Image"}
                  size={22}
                  className={doc.type === "course" ? "text-neon-purple" : "text-neon-green"}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-body text-sm text-white font-medium truncate">{doc.name}</p>
                <p className="font-body text-xs text-muted-foreground truncate mt-0.5">{doc.topic}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-body text-xs text-muted-foreground">{doc.date}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="font-body text-xs text-muted-foreground">{doc.size}</span>
                  {doc.pages && (
                    <>
                      <span className="text-muted-foreground">·</span>
                      <span className="font-body text-xs text-muted-foreground">{doc.pages} стр.</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <button className="w-9 h-9 rounded-xl bg-muted hover:bg-border flex items-center justify-center transition-colors">
                  <Icon name="Eye" size={15} className="text-muted-foreground" />
                </button>
                <button className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  doc.type === "course"
                    ? "bg-neon-purple/10 hover:bg-neon-purple/20"
                    : "bg-neon-green/10 hover:bg-neon-green/20"
                }`}>
                  <Icon
                    name="Download"
                    size={15}
                    className={doc.type === "course" ? "text-neon-purple" : "text-neon-green"}
                  />
                </button>
                <button className="w-9 h-9 rounded-xl bg-destructive/10 hover:bg-destructive/20 flex items-center justify-center transition-colors">
                  <Icon name="Trash2" size={15} className="text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 opacity-40">
            <Icon name="FolderOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="font-display text-sm text-muted-foreground">Файлы не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
}
