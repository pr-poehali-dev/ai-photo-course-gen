import { useState } from "react";
import Icon from "@/components/ui/icon";

const styles = ["Реализм", "Аниме", "Масло", "Акварель", "Киберпанк", "Минимализм", "Поп-арт", "Ретро"];
const sizes = ["1:1", "16:9", "9:16", "4:3"];
const qualities = ["Стандарт", "HD", "4K"];

const mockImages = [
  "https://picsum.photos/seed/neuro1/600/600",
  "https://picsum.photos/seed/neuro2/600/600",
  "https://picsum.photos/seed/neuro3/600/600",
  "https://picsum.photos/seed/neuro4/600/600",
  "https://picsum.photos/seed/neuro5/600/600",
];

export default function Generator() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Реализм");
  const [selectedSize, setSelectedSize] = useState("1:1");
  const [selectedQuality, setSelectedQuality] = useState("HD");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [count, setCount] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!generatedImage) return;
    setIsDownloading(true);
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "neuro-image.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(generatedImage, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    setTimeout(() => {
      setGeneratedImage(mockImages[Math.floor(Math.random() * mockImages.length)]);
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="pill bg-neon-green text-black">ГЕНЕРАТОР</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Генерация <span className="neon-green text-glow-green">изображений</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-body">Опиши что хочешь увидеть — ИИ нарисует за секунды</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LEFT: Controls */}
          <div className="lg:col-span-2 space-y-5">
            {/* Prompt */}
            <div className="gradient-border rounded-2xl p-5">
              <label className="font-display text-xs text-muted-foreground uppercase tracking-widest mb-3 block">Описание</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Космонавт в неоновом городе будущего, дождь, отражения в лужах..."
                className="w-full bg-transparent text-white placeholder-muted-foreground font-body text-sm resize-none outline-none leading-relaxed min-h-[100px]"
              />
            </div>

            {/* Style */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <label className="font-display text-xs text-muted-foreground uppercase tracking-widest mb-3 block">Стиль</label>
              <div className="flex flex-wrap gap-2">
                {styles.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStyle(s)}
                    className={`pill transition-all duration-200 ${
                      selectedStyle === s
                        ? "bg-neon-green text-black"
                        : "bg-muted text-muted-foreground hover:text-white hover:bg-border"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Size & Quality */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <label className="font-display text-xs text-muted-foreground uppercase tracking-widest mb-3 block">Формат</label>
              <div className="flex gap-2 mb-4">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`flex-1 py-2 rounded-xl text-xs font-display transition-all duration-200 ${
                      selectedSize === s
                        ? "bg-neon-purple text-white glow-purple"
                        : "bg-muted text-muted-foreground hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <label className="font-display text-xs text-muted-foreground uppercase tracking-widest mb-3 block">Качество</label>
              <div className="flex gap-2 mb-4">
                {qualities.map((q) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQuality(q)}
                    className={`flex-1 py-2 rounded-xl text-xs font-display transition-all duration-200 ${
                      selectedQuality === q
                        ? "bg-accent text-black"
                        : "bg-muted text-muted-foreground hover:text-white"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <label className="font-display text-xs text-muted-foreground uppercase tracking-widest mb-3 block">
                Количество: <span className="neon-green">{count}</span>
              </label>
              <input
                type="range"
                min={1}
                max={4}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full accent-[#00FF7F]"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className={`w-full py-4 rounded-2xl font-display text-sm font-bold transition-all duration-300 ${
                prompt.trim() && !isGenerating
                  ? "bg-neon-green text-black glow-green hover:scale-[1.02] active:scale-95"
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
                  <Icon name="Sparkles" size={16} />
                  СГЕНЕРИРОВАТЬ
                </span>
              )}
            </button>
          </div>

          {/* RIGHT: Result */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-2xl overflow-hidden h-full min-h-[500px] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-display text-xs text-muted-foreground uppercase tracking-widest">Результат</span>
                {generatedImage && (
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted hover:bg-border transition-colors text-xs text-white font-body">
                      <Icon name="RefreshCw" size={12} />
                      Заново
                    </button>
                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neon-green text-black hover:opacity-90 transition-opacity text-xs font-display font-bold disabled:opacity-60"
                    >
                      <Icon name={isDownloading ? "Loader2" : "Download"} size={12} className={isDownloading ? "animate-spin" : ""} />
                      {isDownloading ? "..." : "СКАЧАТЬ"}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1 flex items-center justify-center p-6">
                {isGenerating ? (
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full border-2 border-neon-green border-t-transparent animate-spin mx-auto mb-4" />
                    <p className="font-display text-sm neon-green">Создаю шедевр...</p>
                    <p className="font-body text-xs text-muted-foreground mt-1">
                      Стиль: {selectedStyle} · {selectedQuality}
                    </p>
                  </div>
                ) : generatedImage ? (
                  <div className="w-full animate-fade-in-scale">
                    <img
                      src={generatedImage}
                      alt="Сгенерированное изображение"
                      className="w-full max-h-[440px] object-cover rounded-xl"
                    />
                    <div className="flex gap-2 mt-3 flex-wrap">
                      <span className="pill bg-muted text-muted-foreground">{selectedStyle}</span>
                      <span className="pill bg-muted text-muted-foreground">{selectedSize}</span>
                      <span className="pill bg-muted text-muted-foreground">{selectedQuality}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center opacity-40">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 animate-float">
                      <Icon name="ImagePlus" size={32} className="text-muted-foreground" />
                    </div>
                    <p className="font-display text-sm text-muted-foreground">Изображение появится здесь</p>
                    <p className="font-body text-xs text-muted-foreground mt-1">Опиши что хочешь и нажми Сгенерировать</p>
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