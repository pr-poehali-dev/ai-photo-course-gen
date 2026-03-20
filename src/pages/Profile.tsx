import { useState } from "react";
import Icon from "@/components/ui/icon";

const stats = [
  { label: "Изображений", value: "24", icon: "Image", color: "neon-green" },
  { label: "Курсовых", value: "7", icon: "BookOpen", color: "neon-purple" },
  { label: "Документов", value: "12", icon: "FileText", color: "neon-yellow" },
  { label: "Запросов", value: "156", icon: "Zap", color: "neon-pink" },
];

const plan = {
  name: "PRO",
  imagesLeft: 76,
  imagesTotal: 100,
  coursesLeft: 3,
  coursesTotal: 10,
};

export default function Profile() {
  const [name, setName] = useState("Александр");
  const [email, setEmail] = useState("user@example.com");
  const [editing, setEditing] = useState(false);

  return (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="pill bg-neon-pink text-white">ПРОФИЛЬ</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Мой <span className="neon-pink" style={{textShadow: '0 0 20px rgba(255,0,110,0.7)'}}>профиль</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar & Info */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-green to-neon-purple flex items-center justify-center mx-auto">
                  <span className="font-display text-3xl font-bold text-black">
                    {name.charAt(0)}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-neon-green flex items-center justify-center">
                  <Icon name="Camera" size={14} className="text-black" />
                </button>
              </div>
              <h2 className="font-display text-lg font-bold text-white">{name}</h2>
              <p className="font-body text-sm text-muted-foreground">{email}</p>
              <span className="pill bg-neon-yellow/10 text-neon-yellow mt-3 inline-block">
                ⭐ {plan.name} план
              </span>
            </div>

            {/* Plan */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="font-display text-xs text-muted-foreground uppercase tracking-widest">Лимиты</p>
                <button className="pill bg-neon-green/10 text-neon-green text-[10px] hover:bg-neon-green/20 transition-colors">
                  Upgrade
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-body text-xs text-muted-foreground">Изображения</span>
                    <span className="font-body text-xs text-white">{plan.imagesLeft}/{plan.imagesTotal}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="bg-neon-green h-1.5 rounded-full"
                      style={{ width: `${(plan.imagesLeft / plan.imagesTotal) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-body text-xs text-muted-foreground">Курсовые</span>
                    <span className="font-body text-xs text-white">{plan.coursesLeft}/{plan.coursesTotal}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="bg-neon-purple h-1.5 rounded-full"
                      style={{ width: `${(plan.coursesLeft / plan.coursesTotal) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Settings */}
          <div className="lg:col-span-2 space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center card-hover">
                  <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center mx-auto mb-2`}>
                    <Icon name={s.icon} size={18} className={`text-${s.color}`} />
                  </div>
                  <p className={`font-display text-2xl font-bold text-${s.color}`}>{s.value}</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Edit form */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <p className="font-display text-xs text-muted-foreground uppercase tracking-widest">Настройки</p>
                <button
                  onClick={() => setEditing(!editing)}
                  className={`pill transition-all ${editing ? "bg-neon-green text-black" : "bg-muted text-muted-foreground hover:text-white"}`}
                >
                  {editing ? "Сохранить" : "Редактировать"}
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="font-display text-xs text-muted-foreground uppercase tracking-widest mb-2 block">Имя</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!editing}
                    className={`w-full bg-muted border rounded-xl px-4 py-3 text-white font-body text-sm outline-none transition-all ${
                      editing ? "border-neon-green/30 focus:border-neon-green" : "border-transparent opacity-60"
                    }`}
                  />
                </div>
                <div>
                  <label className="font-display text-xs text-muted-foreground uppercase tracking-widest mb-2 block">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!editing}
                    className={`w-full bg-muted border rounded-xl px-4 py-3 text-white font-body text-sm outline-none transition-all ${
                      editing ? "border-neon-green/30 focus:border-neon-green" : "border-transparent opacity-60"
                    }`}
                  />
                </div>
                <div>
                  <label className="font-display text-xs text-muted-foreground uppercase tracking-widest mb-2 block">Пароль</label>
                  <input
                    type="password"
                    value="••••••••"
                    disabled={!editing}
                    className={`w-full bg-muted border rounded-xl px-4 py-3 text-white font-body text-sm outline-none transition-all ${
                      editing ? "border-neon-green/30 focus:border-neon-green" : "border-transparent opacity-60"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Danger zone */}
            <div className="bg-card border border-destructive/20 rounded-2xl p-5">
              <p className="font-display text-xs text-destructive uppercase tracking-widest mb-4">Опасная зона</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-body">
                  <Icon name="Trash2" size={14} />
                  Удалить историю
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-body">
                  <Icon name="UserX" size={14} />
                  Удалить аккаунт
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}