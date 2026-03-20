import { useState } from "react";
import Icon from "@/components/ui/icon";

const subjects = ["Экономика", "История", "Право", "Психология", "Менеджмент", "Информатика", "Физика", "Философия", "Социология", "Маркетинг"];
const structures = ["Введение", "Теоретическая часть", "Практическая часть", "Заключение", "Список литературы"];
const pages = [20, 30, 40, 50, 60];

export default function CourseWork() {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("Экономика");
  const [selectedPages, setSelectedPages] = useState(30);
  const [selectedStructure, setSelectedStructure] = useState<string[]>([...structures]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const toggleStructure = (item: string) => {
    setSelectedStructure(prev =>
      prev.includes(item) ? prev.filter(s => s !== item) : [...prev, item]
    );
  };

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setDone(false);
    setProgress(0);

    const steps = [10, 25, 45, 65, 80, 95, 100];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        setDone(true);
      }
    }, 600);
  };

  const progressLabels = [
    { at: 10, label: "Анализирую тему..." },
    { at: 25, label: "Собираю источники..." },
    { at: 45, label: "Пишу введение..." },
    { at: 65, label: "Формирую главы..." },
    { at: 80, label: "Оформляю заключение..." },
    { at: 95, label: "Создаю Word-документ..." },
    { at: 100, label: "Готово!" },
  ];

  const currentLabel = progressLabels.slice().reverse().find(l => progress >= l.at)?.label || "";

  return (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="pill bg-neon-purple text-white">КУРСОВЫЕ</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Курсовая <span className="neon-purple text-glow-purple">работа</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-body">ИИ напишет курсовую по любой теме и отправит Word-документом</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-5">
            {/* Topic */}
            <div className="gradient-border rounded-2xl p-5" style={{backgroundImage: 'linear-gradient(hsl(var(--card)), hsl(var(--card))) padding-box, linear-gradient(135deg, #9B5DE5, #FF006E) border-box'}}>
              <label className="font-display text-xs text-muted-foreground uppercase tracking-widest mb-3 block">Тема работы</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Влияние цифровой экономики на рынок труда в России..."
                className="w-full bg-transparent text-white placeholder-muted-foreground font-body text-sm resize-none outline-none leading-relaxed min-h-[80px]"
              />
            </div>

            {/* Subject */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <label className="font-display text-xs text-muted-foreground uppercase tracking-widest mb-3 block">Предмет</label>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSubject(s)}
                    className={`pill transition-all duration-200 ${
                      subject === s
                        ? "bg-neon-purple text-white"
                        : "bg-muted text-muted-foreground hover:text-white hover:bg-border"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Pages */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <label className="font-display text-xs text-muted-foreground uppercase tracking-widest mb-3 block">
                Объём: <span className="text-neon-purple">{selectedPages} страниц</span>
              </label>
              <div className="flex gap-2">
                {pages.map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPages(p)}
                    className={`flex-1 py-2 rounded-xl text-xs font-display transition-all duration-200 ${
                      selectedPages === p
                        ? "bg-neon-purple text-white"
                        : "bg-muted text-muted-foreground hover:text-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Structure */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <label className="font-display text-xs text-muted-foreground uppercase tracking-widest mb-3 block">Структура</label>
              <div className="space-y-2">
                {structures.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => toggleStructure(s)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                      selectedStructure.includes(s)
                        ? "bg-neon-purple/10 border border-neon-purple/30"
                        : "bg-muted border border-transparent opacity-40"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                      selectedStructure.includes(s) ? "bg-neon-purple" : "bg-border"
                    }`}>
                      {selectedStructure.includes(s) && <Icon name="Check" size={12} className="text-white" />}
                    </div>
                    <span className="font-body text-sm text-white">{i + 1}. {s}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className={`w-full py-4 rounded-2xl font-display text-sm font-bold transition-all duration-300 ${
                topic.trim() && !isGenerating
                  ? "bg-neon-purple text-white glow-purple hover:scale-[1.02] active:scale-95"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  ГЕНЕРИРУЮ...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Icon name="BookOpen" size={16} />
                  НАПИСАТЬ КУРСОВУЮ
                </span>
              )}
            </button>
          </div>

          {/* RIGHT: Preview */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-2xl overflow-hidden h-full min-h-[500px] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-display text-xs text-muted-foreground uppercase tracking-widest">Предпросмотр</span>
                {done && (
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neon-purple text-white hover:opacity-90 transition-opacity text-xs font-display font-bold glow-purple">
                    <Icon name="Download" size={12} />
                    СКАЧАТЬ WORD
                  </button>
                )}
              </div>

              <div className="flex-1 flex items-center justify-center p-6">
                {isGenerating ? (
                  <div className="w-full max-w-sm text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-neon-purple border-t-transparent animate-spin mx-auto mb-6" />
                    <p className="font-display text-sm text-neon-purple mb-6">{currentLabel}</p>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div
                        className="bg-neon-purple h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="font-body text-xs text-muted-foreground">{progress}% завершено</p>
                  </div>
                ) : done ? (
                  <div className="w-full animate-fade-in-scale">
                    {/* Document preview */}
                    <div className="bg-white rounded-xl p-6 text-black shadow-2xl max-h-[440px] overflow-y-auto scrollbar-thin">
                      <div className="text-center mb-6">
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">МИНИСТЕРСТВО ОБРАЗОВАНИЯ РФ</p>
                        <div className="w-full h-px bg-gray-200 my-3" />
                        <h2 className="text-base font-bold uppercase leading-tight mb-2">{subject.toUpperCase()}</h2>
                        <h3 className="text-sm font-semibold leading-snug text-gray-700">КУРСОВАЯ РАБОТА</h3>
                        <p className="text-xs text-gray-500 mt-2">на тему:</p>
                        <p className="text-sm font-bold mt-1">«{topic || "Название темы"}»</p>
                        <div className="w-full h-px bg-gray-200 my-4" />
                        <div className="text-left text-xs text-gray-500 space-y-1">
                          <p>Выполнил: Студент группы ___</p>
                          <p>Проверил: ___________</p>
                          <p className="mt-2">Москва — 2025</p>
                        </div>
                      </div>

                      <div className="space-y-4 text-sm">
                        {selectedStructure.map((s, i) => (
                          <div key={s}>
                            <p className="font-bold text-gray-800 mb-1">{i + 1}. {s.toUpperCase()}</p>
                            <p className="text-gray-600 leading-relaxed text-xs">
                              {s === "Введение"
                                ? `Данная курсовая работа посвящена исследованию темы "${topic}". Актуальность данной темы обусловлена современными тенденциями развития ${subject.toLowerCase()} и необходимостью систематического изучения...`
                                : s === "Теоретическая часть"
                                ? `В данной главе рассматриваются теоретические основы изучаемой проблемы. Анализируются ключевые концепции и подходы к исследованию в области ${subject.toLowerCase()}...`
                                : s === "Практическая часть"
                                ? `Практическая часть работы посвящена анализу конкретных примеров и случаев в контексте темы "${topic}". Проведён анализ данных и сделаны выводы...`
                                : s === "Заключение"
                                ? `В ходе написания курсовой работы были достигнуты поставленные цели и задачи. Изучены теоретические аспекты темы и проведён практический анализ...`
                                : "1. Авторский коллектив. Основы теории. — М.: Наука, 2023.\n2. Иванов А.А. Практическое руководство. — СПб.: Питер, 2024."}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3 items-center">
                      <Icon name="FileText" size={14} className="text-neon-purple" />
                      <span className="font-body text-xs text-muted-foreground">{selectedPages} страниц · {subject} · Word (.docx)</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center opacity-40">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 animate-float">
                      <Icon name="FileText" size={32} className="text-muted-foreground" />
                    </div>
                    <p className="font-display text-sm text-muted-foreground">Предпросмотр документа</p>
                    <p className="font-body text-xs text-muted-foreground mt-1">Укажи тему и нажми «Написать курсовую»</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
