import { useLanguage } from '@/contexts/LanguageContext';
import { Brain, Zap, BarChart3, Bot, Cpu, Network } from 'lucide-react';

const aiCapabilities = [
  {
    icon: Brain,
    title: { en: 'GenAI Systems Architecture', tr: 'GenAI Sistem Mimarisi', de: 'GenAI-Systemarchitektur' },
    desc: {
      en: 'Designed PIM-integrated GenAI knowledge assistants and customer-facing chatbots for regulated healthcare environments',
      tr: 'Düzenlenmiş sağlık ortamları için PIM entegre GenAI bilgi asistanları ve müşteriye yönelik chatbot\'lar tasarladım',
      de: 'PIM-integrierte GenAI-Wissensassistenten und kundenorientierte Chatbots für regulierte Gesundheitsumgebungen entwickelt',
    },
    color: '#8B5CF6',
  },
  {
    icon: Zap,
    title: { en: 'AI Workflow Automation', tr: 'Yapay Zeka İş Akışı Otomasyonu', de: 'KI-Workflow-Automatisierung' },
    desc: {
      en: 'Built end-to-end automation pipelines using Power Automate, n8n, and OpenAI API for reporting, follow-ups, and content localization',
      tr: 'Raporlama, takip ve içerik yerelleştirmesi için Power Automate, n8n ve OpenAI API kullanarak uçtan uca otomasyon hattı kurdum',
      de: 'End-to-End-Automatisierungspipelines mit Power Automate, n8n und OpenAI API für Reporting, Follow-ups und Content-Lokalisierung aufgebaut',
    },
    color: '#F59E0B',
  },
  {
    icon: BarChart3,
    title: { en: 'AI Pricing Intelligence', tr: 'Yapay Zeka Fiyat Zekası', de: 'KI-Preisintelligenz' },
    desc: {
      en: 'Developed AI & ML-driven pricing validation platform connecting PIM for compliance monitoring and competitor benchmarking',
      tr: 'Uyumluluk izleme ve rakip kıyaslaması için PIM\'i bağlayan yapay zeka ve makine öğrenimi destekli fiyat doğrulama platformu geliştirdim',
      de: 'KI & ML-gesteuerte Preisvalidierungsplattform entwickelt, die PIM für Compliance-Monitoring und Wettbewerber-Benchmarking verbindet',
    },
    color: '#10B981',
  },
  {
    icon: Bot,
    title: { en: 'GenAI Localization & OCR Pipelines', tr: 'GenAI Yerelleştirme & OCR Hattı', de: 'GenAI-Lokalisierung & OCR-Pipelines' },
    desc: {
      en: 'Engineered OCR and GenAI-driven creative localization pipelines achieving +60% CTR improvement and +25% conversion rate uplift',
      tr: '+%60 CTR iyileşmesi ve +%25 dönüşüm oranı artışı sağlayan OCR ve GenAI destekli kreatif yerelleştirme hattı kurdum',
      de: 'OCR- und GenAI-gesteuerte kreative Lokalisierungspipelines entwickelt mit +60% CTR-Verbesserung und +25% Conversion-Rate-Steigerung',
    },
    color: '#EF4444',
  },
  {
    icon: Cpu,
    title: { en: 'AI Customer Value Modeling', tr: 'Yapay Zeka Müşteri Değeri Modellemesi', de: 'KI-Kundenwermodellierung' },
    desc: {
      en: 'Built CLV/LTV-driven segmentation and field prioritization models achieving +69% LTV increase and +60% LTV/CAC improvement',
      tr: '+%69 LTV artışı ve +%60 LTV/CAC iyileşmesi sağlayan CLV/LTV destekli segmentasyon ve saha önceliklendirme modelleri kurdum',
      de: 'CLV/LTV-gesteuerte Segmentierungs- und Feldpriorisierungsmodelle entwickelt mit +69% LTV-Steigerung und +60% LTV/CAC-Verbesserung',
    },
    color: '#2563EB',
  },
  {
    icon: Network,
    title: { en: 'Low-Code AI Systems', tr: 'Düşük Kodlu Yapay Zeka Sistemleri', de: 'Low-Code KI-Systeme' },
    desc: {
      en: 'Delivered AI-powered Power Apps including visit planning, task management, e-prescription systems, and executive dashboards',
      tr: 'Ziyaret planlama, görev yönetimi, e-reçete sistemleri ve yönetici panoları dahil yapay zeka destekli Power Apps uygulamaları geliştirdim',
      de: 'KI-gestützte Power Apps entwickelt, darunter Besuchsplanung, Aufgabenverwaltung, E-Rezept-Systeme und Executive-Dashboards',
    },
    color: '#6366F1',
  },
];

export default function AIShowcaseSection() {
  const { language } = useLanguage();

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        backgroundImage: `url(/assets/backgrounds/background-dark-theme.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-900/85" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full mb-4">
            <Brain size={16} className="text-blue-400" />
            <span className="text-sm font-semibold text-blue-300 font-['Space_Grotesk']">
              {language === 'tr' ? 'Yapay Zeka Sistemleri & Otomasyonu' :
               language === 'de' ? 'KI-Systeme & Automatisierung' :
               'AI Systems & Automation'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Space_Grotesk']">
            {language === 'tr' ? 'Uygulamalı Yapay Zeka & Dijital İnovasyon' :
             language === 'de' ? 'Angewandte KI & Digitale Innovation' :
             'Applied AI & Digital Innovation'}
          </h2>
          <p className="mt-3 text-lg text-gray-300 font-['Nunito_Sans'] max-w-2xl mx-auto">
            {language === 'tr' ? 'Ölçülebilir iş etkisi yaratan yapay zeka sistemleri tasarlama ve dağıtma konusundaki pratik deneyimim' :
             language === 'de' ? 'Praktische Erfahrung im Design und der Bereitstellung von KI-Systemen, die messbare Geschäftswirkung liefern' :
             'Hands-on experience designing and deploying AI systems that deliver measurable business impact'}
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {aiCapabilities.map((cap, i) => {
            const Icon = cap.icon;
            const title = cap.title[language as keyof typeof cap.title] || cap.title.en;
            const desc = cap.desc[language as keyof typeof cap.desc] || cap.desc.en;

            return (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${cap.color}25` }}
                >
                  <Icon size={22} style={{ color: cap.color }} />
                </div>
                <h3 className="font-bold text-white font-['Space_Grotesk'] mb-2 group-hover:text-blue-300 transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed font-['Nunito_Sans']">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
