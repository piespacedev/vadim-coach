import { GlareCard } from '@/components/ui/glare-cards'
import { Sparkles, Network, Activity } from 'lucide-react'
import { motion } from 'framer-motion'
import { AreaChart, Area, ResponsiveContainer, Tooltip, BarChart, Bar } from 'recharts'

// Mock data for Recharts
const chartData = [
  { time: '00:00', value: 45 },
  { time: '04:00', value: 52 },
  { time: '08:00', value: 48 },
  { time: '12:00', value: 70 },
  { time: '16:00', value: 61 },
  { time: '20:00', value: 85 },
  { time: '23:59', value: 99 },
]

export default function DemoOne() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505] p-6 font-sans lg:p-24">
      {/* 1. Dynamic Background Orbs */}
      <div className="pointer-events-none absolute -left-20 top-0 h-[500px] w-[500px] animate-pulse rounded-full bg-blue-600/10 mix-blend-screen blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[600px] w-[600px] rounded-full bg-emerald-500/10 mix-blend-screen blur-[160px]" />

      {/* 2. Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mb-20 text-center"
      >
        <p className="mx-auto max-w-xl text-lg font-light leading-relaxed text-zinc-500">
          Real-time neural telemetry and generative optics powered by distributed node
          architecture.
        </p>
      </motion.div>

      {/* 3. Grid Layout */}
      <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Recharts Area Animation */}
        <GlareCard
          tiltIntensity={12}
          className="h-[450px] border-zinc-800/50 bg-zinc-900/50 p-8"
        >
          <div className="flex h-full flex-col">
            <div className="mb-auto flex items-start justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Activity size={18} />
                  <span className="font-mono text-xs uppercase tracking-widest">Live Flow</span>
                </div>
                <h3 className="text-2xl font-semibold text-white">Neural Load</h3>
              </div>
              <span className="font-mono text-3xl text-white/90">82%</span>
            </div>

            <div className="mt-8 h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181b',
                      border: '1px solid #3f3f46',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorVal)"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </GlareCard>

        {/* Card 2: Interactive Media Focus */}
        <GlareCard
          tiltIntensity={20}
          glareColor="rgba(56, 189, 248, 0.4)"
          className="group h-[450px] overflow-hidden border-none p-0"
        >
          {/* В Vite нет next/image — обычный <img> с фоном на весь блок */}
          <img
            src="https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=1200&q=80&auto=format&fit=crop"
            alt="Core engine"
            className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />

          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
            <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
              <h3 className="mb-2 text-2xl font-bold text-white">Synthetic Core</h3>
              <p className="mb-6 text-sm text-zinc-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                Accessing the primary rendering pipeline for cross-chain verification.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-white/20" />
                <Sparkles className="animate-pulse text-blue-400" size={16} />
              </div>
            </div>
          </div>
        </GlareCard>

        {/* Card 3: System Analytics Bar Chart */}
        <GlareCard
          tiltIntensity={15}
          glareColor="rgba(244, 63, 94, 0.2)"
          className="h-[450px] border-white/5 bg-zinc-950/80 p-0"
        >
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-6 p-8">
              <div className="flex items-center justify-between">
                <Network className="text-rose-500" size={24} />
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-rose-500"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1 font-mono text-xs uppercase tracking-tighter text-zinc-500">
                  Latent Response
                </p>
                <h3 className="text-4xl font-bold tracking-tighter text-white">
                  0.002<span className="text-lg text-rose-500">ms</span>
                </h3>
              </div>
            </div>

            <div className="h-40 w-full overflow-hidden px-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <Bar
                    dataKey="value"
                    fill="#f43f5e"
                    radius={[4, 4, 0, 0]}
                    animationBegin={500}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </GlareCard>
      </div>
    </div>
  )
}
