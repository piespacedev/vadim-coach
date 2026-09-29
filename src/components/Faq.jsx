import FAQs from '@/components/ui/text-reveal-faqs'
import { images } from '../content/site'
import { useLang } from '../lib/i18n'

/** Обёртка: ставит shadcn-компонент FAQ на фон секции сайта. */
export default function Faq() {
  const { t } = useLang()

  return (
    <section id="faq" className="scroll-mt-16 bg-[#0B0E10]">
      <FAQs {...t.faq} supportHref="#contacts" icon={images.faqIcon} />
    </section>
  )
}
