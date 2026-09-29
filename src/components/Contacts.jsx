import { useState } from 'react'
import { Phone, Send, Clock, Mail, MessageCircle, Check, ArrowUpRight } from 'lucide-react'
import { brand } from '../content/site'
import { useLang } from '../lib/i18n'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import Bench from './icons/Bench'

const ICONS = { Phone, Send, Bench, Clock, Mail, MessageCircle }

const EMPTY = { name: '', contact: '', goal: '', comment: '' }

export default function Contacts() {
  const { t } = useLang()
  const contacts = t.contacts
  // goal хранит id цели, а не подпись: при смене языка выбор в селекте сохраняется.
  const emptyForm = () => ({ ...EMPTY, goal: contacts.goals[0]?.id ?? '' })
  const [form, setForm] = useState(emptyForm)
  const [sent, setSent] = useState(false)

  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value })

  // ВНИМАНИЕ: заявка пока никуда не уходит — нужен бэкенд или Telegram-бот.
  // Подробности в README, раздел «Форма заявки».
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Lead:', form)
    setSent(true)
  }

  const inputClass =
    'h-12 w-full rounded-md border border-white/15 bg-white/[0.04] px-4 font-body text-base text-white placeholder-white/35 outline-none transition-colors focus:border-emerald-400/70 focus:bg-white/[0.07]'

  return (
    <section
      id="contacts"
      className="scroll-mt-16 bg-[#0B0E10] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1360px]">
        <SectionHead
          dark
          label={contacts.label}
          title={contacts.title}
          subtitle={contacts.subtitle}
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
          {/* Форма */}
          <Reveal delay={0.1}>
            {sent ? (
              <div className="flex h-full flex-col justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.07] p-8 lg:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600">
                  <Check size={22} strokeWidth={2} className="text-white" />
                </span>
                <p
                  className="mt-6 font-display text-[22px] text-white lg:text-[26px]"
                  style={{ letterSpacing: '-0.04em', lineHeight: 1.1 }}
                >
                  {contacts.successTitle}
                </p>
                <p
                  className="mt-3 max-w-[420px] font-body text-base text-white/60"
                  style={{ lineHeight: 1.5 }}
                >
                  {contacts.successText}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyForm())
                    setSent(false)
                  }}
                  className="mt-7 w-fit font-body text-sm text-emerald-300 underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  {contacts.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-1">
                  <span className="mb-2 block font-body text-sm text-white/50">{contacts.form.name}</span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={update('name')}
                    placeholder={contacts.form.namePlaceholder}
                    className={inputClass}
                  />
                </label>

                <label className="sm:col-span-1">
                  <span className="mb-2 block font-body text-sm text-white/50">
                    {contacts.form.contact}
                  </span>
                  <input
                    type="text"
                    required
                    value={form.contact}
                    onChange={update('contact')}
                    placeholder={contacts.form.contactPlaceholder}
                    className={inputClass}
                  />
                </label>

                <label className="sm:col-span-2">
                  <span className="mb-2 block font-body text-sm text-white/50">{contacts.form.goal}</span>
                  <select value={form.goal} onChange={update('goal')} className={inputClass}>
                    {contacts.goals.map((goal) => (
                      <option key={goal.id} value={goal.id} className="bg-[#0B0E10]">
                        {goal.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="sm:col-span-2">
                  <span className="mb-2 block font-body text-sm text-white/50">
                    {contacts.form.comment}{' '}
                    <span className="text-white/30">{contacts.form.optional}</span>
                  </span>
                  <textarea
                    rows={4}
                    value={form.comment}
                    onChange={update('comment')}
                    placeholder={contacts.form.commentPlaceholder}
                    className={`${inputClass} h-auto resize-none py-3`}
                  />
                </label>

                <button
                  type="submit"
                  className="mt-2 flex h-14 items-center justify-center gap-2 rounded-md bg-white font-body font-medium text-black transition-colors duration-300 hover:bg-emerald-300 sm:col-span-2 sm:w-[280px] lg:h-16"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  <span className="text-base lg:text-lg">{contacts.submit}</span>
                  <ArrowUpRight size={20} strokeWidth={1.6} />
                </button>
              </form>
            )}
          </Reveal>

          {/* Контакты */}
          <div className="flex h-fit flex-col divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
            {brand.contacts.map((item, i) => {
              const Icon = ICONS[item.icon] ?? Phone
              const Tag = item.href ? 'a' : 'div'
              const external = Boolean(item.href && item.href.startsWith('http'))
              return (
                <Reveal
                  as={Tag}
                  key={item.id}
                  delay={0.18 + i * 0.07}
                  href={item.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className={`flex items-center gap-4 bg-[#0B0E10] px-6 py-5 lg:px-7 ${
                    item.href ? 'transition-colors hover:bg-white/[0.05]' : ''
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15">
                    <Icon size={Icon === Bench ? 20 : 17} strokeWidth={1.5} className="text-emerald-400" />
                  </span>
                  <span>
                    <span className="block font-body text-xs uppercase tracking-[0.14em] text-white/35">
                      {contacts.details[item.id]}
                    </span>
                    <span
                      className="mt-1 block font-body text-base text-white lg:text-lg"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {item.value}
                    </span>
                  </span>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
