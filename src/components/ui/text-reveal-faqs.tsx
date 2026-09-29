'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import React from 'react'
import { motion } from 'framer-motion'

export interface FaqItem {
  id: string
  question: string
  answer: string
}

/** Все тексты приходят пропсами — из словаря `faq` в src/content/site.ts. */
export interface FAQsProps {
  title: string
  subtitle: string
  /** Текст под подзаголовком. {link} заменяется на ссылку supportLabel → supportHref. */
  supportText: string
  supportLabel: string
  supportHref: string
  items: FaqItem[]
  /** Картинка-украшение в левой колонке (3D-иконка). */
  icon?: string
}

export default function FAQs({
  title,
  subtitle,
  supportText,
  supportLabel,
  supportHref,
  items,
  icon,
}: FAQsProps) {
  const [beforeLink, afterLink] = supportText.split('{link}')

  const support = (
    <>
      {beforeLink}
      <a href={supportHref} className="font-medium text-primary hover:underline">
        {supportLabel}
      </a>
      {afterLink}
    </>
  )

  return (
    <section className="py-16 text-foreground md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            {icon && (
              <img
                src={icon}
                alt=""
                aria-hidden="true"
                className="mb-6 h-24 w-24 object-contain drop-shadow-2xl"
              />
            )}
            <h2 className="font-display text-4xl font-semibold text-foreground">{title}</h2>
            <p className="mt-4 text-balance text-lg text-muted-foreground">{subtitle}</p>
            <p className="mt-6 hidden text-muted-foreground md:block">{support}</p>
          </div>

          <div className="md:col-span-3">
            <Accordion type="single" collapsible>
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-gray-200 dark:border-white/10"
                >
                  <AccordionTrigger className="cursor-pointer text-left text-base font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <BlurredStagger text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className="mt-6 text-muted-foreground md:hidden">{support}</p>
        </div>
      </div>
    </section>
  )
}

export const BlurredStagger = ({ text = 'built by ruixen.com' }: { text?: string }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
      },
    },
  }

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
    },
    show: {
      opacity: 1,
      filter: 'blur(0px)',
    },
  }

  // Каждая буква — отдельный inline-block. Если сыпать их подряд, перенос
  // строки может случиться посреди слова, а русские слова длинные.
  // Поэтому буквы собраны в слова, а между словами стоит обычный пробел
  // ТЕКСТОМ — только он даёт браузеру точку переноса.
  const words = text.split(' ')

  return (
    <div className="w-full">
      <motion.p
        variants={container}
        initial="hidden"
        animate="show"
        className="whitespace-normal break-words text-base leading-relaxed text-muted-foreground"
      >
        {words.map((word, wordIndex) => (
          <React.Fragment key={wordIndex}>
            <span className="inline-block whitespace-nowrap">
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={letterAnimation}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {wordIndex < words.length - 1 && ' '}
          </React.Fragment>
        ))}
      </motion.p>
    </div>
  )
}
