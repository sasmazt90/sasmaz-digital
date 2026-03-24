import { useLanguage } from '@/contexts/LanguageContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, Cell
} from 'recharts';

const careerMetrics = [
  { year: '2014', role: 'CRM Specialist', level: 1 },
  { year: '2015', role: 'Client Manager', level: 2 },
  { year: '2016', role: 'Account Manager', level: 3 },
  { year: '2017', role: 'DM Specialist', level: 4 },
  { year: '2020', role: 'DM Manager', level: 5 },
  { year: '2021', role: 'DM Manager', level: 6 },
  { year: '2022', role: 'CRM Manager', level: 7 },
  { year: '2024', role: 'Head of Digital', level: 9 },
];

const impactMetrics = [
  { metric: 'E-com Growth', value: 35, color: '#2563EB' },
  { metric: 'OPEX Reduction', value: 17, color: '#10B981' },
  { metric: 'CTR Improvement', value: 60, color: '#8B5CF6' },
  { metric: 'LTV Increase', value: 69, color: '#F59E0B' },
  { metric: 'Revenue Growth', value: 40, color: '#EF4444' },
  { metric: 'Conversion Rate', value: 25, color: '#06B6D4' },
];

const skillRadarData = [
  { skill: 'AI/GenAI', value: 90 },
  { skill: 'Performance\nMarketing', value: 95 },
  { skill: 'CRM &\nAutomation', value: 92 },
  { skill: 'Data\nAnalytics', value: 88 },
  { skill: 'Team\nLeadership', value: 85 },
  { skill: 'Strategy', value: 93 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3">
        <p className="font-bold text-gray-900 text-sm font-['Space_Grotesk']">{label}</p>
        <p className="text-blue-600 font-semibold text-sm">+{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function MetricsSection() {
  const { language } = useLanguage();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-['Space_Grotesk']">
            {language === 'tr' ? 'Ölçülebilir Etki' :
             language === 'de' ? 'Messbare Wirkung' :
             'Measurable Impact'}
          </h2>
          <p className="mt-3 text-lg text-gray-500 font-['Nunito_Sans']">
            {language === 'tr' ? 'Kariyer boyunca elde edilen somut iş sonuçları' :
             language === 'de' ? 'Konkrete Geschäftsergebnisse über die gesamte Karriere' :
             'Concrete business outcomes delivered across the career'}
          </p>
          <div className="mt-4 w-16 h-1 bg-blue-600 rounded-full mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Impact Metrics Bar Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 font-['Space_Grotesk']">
              {language === 'tr' ? 'Temel Performans Artışları (%)' :
               language === 'de' ? 'Wichtigste Performance-Steigerungen (%)' :
               'Key Performance Improvements (%)'}
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={impactMetrics} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis
                  dataKey="metric"
                  tick={{ fontSize: 11, fill: '#6B7280', fontFamily: 'Nunito Sans' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6B7280', fontFamily: 'Nunito Sans' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {impactMetrics.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Radar Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 font-['Space_Grotesk']">
              {language === 'tr' ? 'Yetkinlik Profili' :
               language === 'de' ? 'Kompetenzprofil' :
               'Competency Profile'}
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={skillRadarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{ fontSize: 11, fill: '#6B7280', fontFamily: 'Nunito Sans' }}
                />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="#2563EB"
                  fill="#2563EB"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  );
}
