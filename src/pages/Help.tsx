import { useState } from "react";
import Icon from "@/components/ui/icon";

const faqs = [
  {
    q: "Как сгенерировать изображение?",
    a: "Перейдите в раздел «Генератор», опишите желаемое изображение в поле описания, выберите стиль, размер и качество. Нажмите «Сгенерировать» — результат появится справа. Затем можно скачать изображение.",
    tag: "Генератор"
  },
  {
    q: "Как написать курсовую работу?",
    a: "Откройте раздел «Курсовые», введите тему работы, выберите предмет, количество страниц и нужные разделы структуры. Нажмите «Написать курсовую» — ИИ сформирует документ, который можно скачать в формате Word (.docx).",
    tag: "Курсовые"
  },
  {
    q: "В каком формате скачивается курсовая?",
    a: "Курсовые работы скачиваются в формате Microsoft Word (.docx). Файл открывается в Word, Google Docs и LibreOffice.",
    tag: "Документы"
  },
  {
    q: "Можно ли менять структуру курсовой?",
    a: "Да! В разделе «Курсовые» вы можете включать и отключать нужные разделы: введение, теоретическую часть, практическую часть, заключение и список литературы.",
    tag: "Курсовые"
  },
  {
    q: "Где найти скачанные файлы?",
    a: "Все созданные файлы хранятся в разделе «Документы». Там можно просмотреть, скачать или удалить любой файл.",
    tag: "Документы"
  },
  {
    q: "Какие стили доступны для изображений?",
    a: "Доступны стили: Реализм, Аниме, Масло, Акварель, Киберпанк, Минимализм, Поп-арт, Ретро. Каждый стиль даёт уникальный визуальный результат.",
    tag: "Генератор"
  },
];

const tags = ["Все", "Генератор", "Курсовые", "Документы"];

export default function Help() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState("Все");
  const [message, setMessage] = useState("");

  const filtered = faqs.filter(f => activeTag === "Все" || f.tag === activeTag);

  return (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="pill bg-neon-purple text-white">СПРАВКА</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Помощь и <span className="neon-purple text-glow-purple">поддержка</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-body">Ответы на популярные вопросы</p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { icon: "Image", label: "Генератор", color: "neon-green" },
            { icon: "BookOpen", label: "Курсовые", color: "neon-purple" },
            { icon: "FolderOpen", label: "Документы", color: "neon-yellow" },
            { icon: "MessageCircle", label: "Поддержка", color: "neon-pink" },
          ].map((item) => (
            <div key={item.label} className={`bg-card border border-border rounded-2xl p-4 text-center card-hover cursor-pointer`}>
              <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center mx-auto mb-2`}>
                <Icon name={item.icon} size={18} className={`text-${item.color}`} />
              </div>
              <p className="font-display text-xs text-white">{item.label}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <p className="font-display text-xs text-muted-foreground uppercase tracking-widest">Вопросы</p>
            <div className="flex gap-2 flex-wrap">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`pill transition-all duration-200 ${
                    activeTag === tag ? "bg-neon-purple text-white" : "bg-muted text-muted-foreground hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {filtered.map((faq, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="pill bg-neon-purple/10 text-neon-purple text-[10px] flex-shrink-0">{faq.tag}</span>
                    <span className="font-body text-sm text-white truncate">{faq.q}</span>
                  </div>
                  <Icon
                    name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                    size={16}
                    className="text-muted-foreground flex-shrink-0 ml-2"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 animate-fade-in">
                    <div className="h-px bg-border mb-3" />
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-card border border-neon-purple/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-neon-purple/10 flex items-center justify-center">
              <Icon name="MessageCircle" size={18} className="text-neon-purple" />
            </div>
            <div>
              <p className="font-display text-sm text-white">Написать в поддержку</p>
              <p className="font-body text-xs text-muted-foreground">Ответим в течение 24 часов</p>
            </div>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Опишите вашу проблему или вопрос..."
            className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-white placeholder-muted-foreground font-body text-sm resize-none outline-none focus:border-neon-purple/40 transition-colors min-h-[100px] mb-3"
          />
          <button
            disabled={!message.trim()}
            className={`px-6 py-3 rounded-xl font-display text-sm font-bold transition-all duration-200 ${
              message.trim()
                ? "bg-neon-purple text-white glow-purple hover:opacity-90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            <span className="flex items-center gap-2">
              <Icon name="Send" size={14} />
              ОТПРАВИТЬ
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
