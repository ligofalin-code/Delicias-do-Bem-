import { useState, ReactNode, useEffect } from 'react';
import { 
  Check, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus, 
  Clock, 
  Heart, 
  Utensils, 
  BookOpen, 
  Zap, 
  Star,
  XCircle,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border-b border-cocoa/10 last:border-0 transition-colors ${isOpen ? 'bg-vanilla/30' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-5 text-left hover:bg-vanilla/20 transition-colors"
      >
        <span className="pr-8 text-lg font-bold text-dark-chocolate leading-tight">{question}</span>
        <div className="flex-shrink-0">
          {isOpen ? (
            <div className="rounded-full bg-caramel/10 p-1">
              <Minus className="text-caramel" size={20} />
            </div>
          ) : (
            <div className="rounded-full bg-caramel/10 p-1">
              <Plus className="text-caramel" size={20} />
            </div>
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-5 text-dark-chocolate/70 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PulseButton = ({ children, className = "", onClick }: { children: ReactNode, className?: string, onClick?: () => void }) => (
  <motion.button
    onClick={onClick}
    animate={{ 
      scale: [1, 1.03, 1],
      boxShadow: [
        "0 10px 20px -5px rgba(34, 197, 94, 0.4)",
        "0 20px 40px -10px rgba(34, 197, 94, 0.6)",
        "0 10px 20px -5px rgba(34, 197, 94, 0.4)"
      ]
    }}
    transition={{ 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={`w-full rounded-2xl bg-cta py-5 text-xl font-bold text-white shadow-2xl transition-all hover:bg-cta-hover active:scale-95 uppercase ${className}`}
  >
    {children}
  </motion.button>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 17); // 14 minutes and 17 seconds in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-bright-red py-2 text-white text-center sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-center gap-2">
        <Clock size={16} className="animate-pulse" />
        <span className="font-bold uppercase tracking-widest text-xs md:text-sm">
          ESSA OFERTA EXPIRA EM {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

const TestimonialCarousel = () => {
  const testimonials = [
    { src: "https://res.cloudinary.com/dyqfspsap/image/upload/v1774975343/Depoimento_01_i86wcw.webp", text: "minha pele melhorou muito" },
    { src: "https://res.cloudinary.com/dyqfspsap/image/upload/v1774975343/Depoimento_02_sel5kd.webp", text: "parei de ter espinhas direto" },
    { src: "https://res.cloudinary.com/dyqfspsap/image/upload/v1774975343/Depoimento_03_eiwmpu.webp", text: "nem parece sem açúcar" },
    { src: "https://res.cloudinary.com/dyqfspsap/image/upload/v1774975343/Depoimento_04_ckadg9.webp", text: "achei que não ia funcionar, mas funcionou mesmo" },
    { src: "https://res.cloudinary.com/dyqfspsap/image/upload/v1774975343/Depoimento_05_peqzxa.webp", text: "minha pele melhorou muito" }
  ];

  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative mx-auto max-w-lg px-4">
      <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white">
        <motion.div 
          className="flex"
          animate={{ x: `-${current * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {testimonials.map((item, index) => (
            <div key={index} className="min-w-full aspect-square bg-white flex flex-col items-center justify-center p-4">
              <motion.img
                src={item.src}
                className="max-w-full max-h-[70%] object-contain mb-4"
                alt={`Depoimento ${index + 1}`}
                referrerPolicy="no-referrer"
                animate={{ 
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <p className="text-lg font-bold text-dark-chocolate italic">"{item.text}"</p>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={prev} 
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 rounded-full bg-cta p-2 text-white shadow-lg hover:bg-cta-hover transition-colors md:-translate-x-6 md:p-3"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={next} 
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 rounded-full bg-cta p-2 text-white shadow-lg hover:bg-cta-hover transition-colors md:translate-x-6 md:p-3"
        aria-label="Próximo"
      >
        <ChevronRight size={24} />
      </button>

      <div className="mt-4 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${current === index ? 'w-6 bg-cta' : 'w-2 bg-cocoa/30'}`}
            aria-label={`Ir para depoimento ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const scrollToOffer = () => {
    document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans">
      <CountdownTimer />
      {/* Hero Section */}
      <section className="bg-vanilla px-4 pt-6 pb-8 md:pt-10 md:pb-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-strawberry">Se sua pele está piorando, o açúcar é o motivo</p>
          <h1 className="mb-6 text-3xl font-bold leading-tight text-dark-chocolate md:text-6xl">
            Você ama doce, mas o açúcar está <span className="text-strawberry">destruindo sua pele, causando espinhas, ressecamento, rugas, acelerando o envelhecimento</span> e você nem percebe
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-text-main md:text-xl leading-relaxed">
            Você tenta evitar, mas sempre volta, porque <span className="font-bold text-chocolate">ninguém consegue viver sem comer o que gosta.</span>
          </p>
          
          <div className="mx-auto mb-8 max-w-3xl overflow-hidden rounded-3xl shadow-xl">
            <img 
              src="https://res.cloudinary.com/dyqfspsap/image/upload/v1774983716/01_idxrux.webp" 
              alt="Mulher comendo doce" 
              className="w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="mb-8 text-center bg-white/50 p-6 rounded-2xl border border-caramel/10">
            <p className="text-lg font-medium text-dark-chocolate mb-4">Se você já pensou:</p>
            <div className="italic text-text-main/70 space-y-1 mb-4">
              <p>‘Só hoje não tem problema…’</p>
              <p>‘Depois eu compenso…’</p>
              <p>‘Será que isso está piorando minha pele?’</p>
            </div>
            <p className="text-xl font-bold text-strawberry">Você não é o problema.</p>
          </div>

          <p className="mb-8 text-sm font-bold text-chocolate">Mais de milhares de pessoas já estão mudando isso sem parar de comer doce</p>

          <div className="mb-6 flex flex-col items-center gap-3 text-left md:flex-row md:justify-center md:gap-6">
            <div className="flex items-center gap-2 font-bold text-chocolate text-sm md:text-base">
              <Check className="text-strawberry" size={18} />
              <span>Receitas fáceis</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-chocolate text-sm md:text-base">
              <Check className="text-strawberry" size={18} />
              <span>Ingredientes simples</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-chocolate text-sm md:text-base">
              <Check className="text-strawberry" size={18} />
              <span>Sabor de verdade</span>
            </div>
          </div>

          <div className="mb-6 inline-block rounded-xl bg-white p-4 shadow-md border border-caramel/20">
            <p className="text-[10px] uppercase tracking-widest text-chocolate">Oferta Exclusiva</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-base text-price-old font-bold line-through">R$ 99,90</span>
              <span className="text-2xl font-bold text-price md:text-3xl">R$ 10,00</span>
            </div>
          </div>

          <div className="mx-auto max-w-xs">
            <PulseButton onClick={scrollToOffer} className="py-4 text-lg uppercase">
              QUERO COMER DOCE SEM PREJUDICAR MINHA PELE
            </PulseButton>
            <p className="mt-3 text-xs font-bold text-strawberry animate-pulse">Essa condição pode acabar hoje</p>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="bg-white px-4 py-4 md:py-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 text-center">
            <h2 className="mb-3 text-2xl font-bold text-dark-chocolate md:text-3xl">
              <span className="text-strawberry">🚨 ISSO PODE ESTAR ACONTECENDO COM VOCÊ…</span> E VOCÊ NEM PERCEBE
            </h2>
            <div className="text-lg font-medium text-text-main/80 space-y-2">
              <p>Você já percebeu sua pele mudando, mas não sabia o motivo?</p>
              <p>Talvez você esteja passando por isso:</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              { label: 'Espinhas (acne) que aparecem sem explicação', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973423/acne_ysx15x.webp' },
              { label: 'Pele seca, sem brilho e sem vida', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973424/Pele_seca_doxb5m.webp' },
              { label: 'Rugas cada vez mais visíveis', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973427/rugas_uemzf4.webp' },
              { label: 'Envelhecimento precoce da pele', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973424/envelhecimento_precoce_fzde4h.webp' },
              { label: 'Degradação do colágeno', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973424/degrada%C3%A7%C3%A3o_do_col%C3%A1geno_srbmhz.webp' },
              { label: 'Flacidez e perda de firmeza', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973424/flacidez_hgltlj.webp' },
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl shadow-md">
                <img 
                  src={item.src} 
                  alt={item.label} 
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-chocolate/90 via-dark-chocolate/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                  <span className="text-sm font-bold text-white leading-tight">{item.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-vanilla p-6 shadow-inner">
              <h3 className="mb-4 text-xl font-bold text-dark-chocolate">O problema não é falta de disciplina.</h3>
              <p className="mb-4 text-text-main/80">O problema é que você foi levada a acreditar que precisa:</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 font-bold text-strawberry">
                  <XCircle size={20} />
                  <span>Parar de comer doce</span>
                </li>
                <li className="flex items-center gap-3 font-bold text-strawberry">
                  <XCircle size={20} />
                  <span>Fazer dietas restritivas</span>
                </li>
                <li className="flex items-center gap-3 font-bold text-strawberry">
                  <XCircle size={20} />
                  <span>Viver com culpa</span>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-chocolate/10">
                <p className="font-bold text-dark-chocolate mb-3">Mas a verdade é simples:</p>
                <ul className="space-y-2 text-sm text-text-main/70">
                  <li>Você não precisa parar de comer o que gosta.</li>
                  <li>Você só precisa aprender a fazer do jeito certo.</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col justify-center text-center md:text-left">
              <h2 className="mb-4 text-2xl font-bold text-dark-chocolate leading-tight">
                Foi aí que tudo mudou…
              </h2>
              <p className="mb-6 text-lg text-text-main/80">
                Quando eu percebi que não precisava abrir mão do doce, só precisava mudar a forma de preparar.
              </p>
              <p className="mb-4 text-sm font-bold text-strawberry">E o pior, isso pode estar sendo causado pelo que você come todos os dias.</p>
              <PulseButton onClick={scrollToOffer} className="px-6 text-base uppercase">
                QUERO APRENDER O JEITO CERTO
              </PulseButton>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-vanilla-dark px-4 py-4 md:py-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-dark-chocolate md:text-3xl">
            SÃO APENAS 3 PASSOS PARA TRANSFORMAR SUA PELE
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { 
                step: '1', 
                title: 'Pare de se sentir culpada toda vez que come doce', 
                desc: 'Tenha acesso a receitas práticas para o dia a dia' 
              },
              { 
                step: '2', 
                title: 'Coma sem prejudicar sua pele', 
                desc: 'Receitas simples, rápidas e com sabor de verdade' 
              },
              { 
                step: '3', 
                title: 'Volte a se sentir bem com sua pele', 
                desc: 'Menos acne, mais firmeza, mais confiança' 
              }
            ].map((item, i) => (
              <div key={i} className="relative rounded-3xl bg-white p-6 pt-10 shadow-md">
                <div className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-xl bg-dark-chocolate text-xl font-bold text-white shadow-md">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-bold text-dark-chocolate leading-tight">{item.title}</h3>
                <p className="text-sm text-text-main/70 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white px-4 py-4 md:py-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-dark-chocolate md:text-3xl">
            POR QUE VOCÊ PRECISA DISSO AGORA?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Utensils size={20} />, title: 'Comer doce sem culpa', desc: 'Saboreie o que você ama sem o peso na consciência.' },
              { icon: <Heart size={20} />, title: 'Reduzir espinhas e oleosidade', desc: 'Sinta a diferença imediata na saúde da sua pele.' },
              { icon: <Zap size={20} />, title: 'Melhorar a textura da pele', desc: 'Recupere o brilho e a saúde da sua pele.' },
              { icon: <Star size={20} />, title: 'Reduzir sinais de envelhecimento', desc: 'Combata rugas e flacidez de dentro para fora.' },
              { icon: <Clock size={20} />, title: 'Ter mais energia no dia a dia', desc: 'Evite os picos de açúcar e tenha disposição constante.' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl bg-vanilla/20 p-5 transition-all hover:bg-vanilla/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-caramel shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h3 className="mb-1 text-base font-bold text-dark-chocolate">{item.title}</h3>
                  <p className="text-sm text-text-main/70 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="bg-vanilla px-4 py-4 md:py-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-dark-chocolate md:text-3xl">
            O SEU GUIA COMPLETO PARA UMA PELE SAUDÁVEL E SEM CULPA
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-base text-text-main/80 leading-relaxed">
            Você não vai precisar pensar no que comer… <span className="font-bold text-caramel">já está tudo pronto pra você</span>.
          </p>

          <div className="grid gap-4">
            {[
              { title: 'CAFÉ DA MANHÃ E LANCHES', text: 'Café da manhã gostoso e sem culpa', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973424/cafe_da_manha_yi2kxn.webp' },
              { title: 'ALMOÇO E JANTAR', text: 'Almoço e jantar com comida de verdade', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973423/almo%C3%A7o_e_jantar_svesw0.webp' },
              { title: 'DOCES E SOBREMESAS', text: 'Sobremesas que parecem normais, mas não prejudicam sua pele', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973423/doces_e_sobremesas_jchkov.webp' },
              { title: 'MOLHOS E PATÊS', text: 'Receitas simples que funcionam na prática', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973424/pates_lnbksg.webp' },
              { title: 'SOPAS E CREMES', text: 'Leves, cremosos e reconfortantes', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973428/sopas_vw4jek.webp' }
            ].map((item, i) => (
              <div key={i} className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition-all hover:shadow-lg md:flex-row">
                <div className="h-40 overflow-hidden md:h-auto md:w-1/3">
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div className="flex flex-col justify-center p-6 text-left md:w-2/3">
                  <span className="mb-2 inline-block text-xs font-bold tracking-[0.2em] text-strawberry uppercase">{item.title}</span>
                  <h3 className="text-xl font-bold text-dark-chocolate leading-tight">{item.text}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <PulseButton onClick={scrollToOffer} className="max-w-xs px-8 uppercase">
              QUERO MINHAS RECEITAS
            </PulseButton>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white px-4 py-4 md:py-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-dark-chocolate md:text-3xl">O que estão dizendo sobre o Delícias do Bem</h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="bg-vanilla-dark px-4 py-4 md:py-6">
        <div className="mx-auto max-w-2xl text-center">
          <img 
            src="https://res.cloudinary.com/dyqfspsap/image/upload/v1773788489/SELO_GARANTIA_IMAGEM_pekub3.webp" 
            alt="Selo de Garantia" 
            className="mx-auto mb-4 w-full max-w-xs"
            referrerPolicy="no-referrer"
          />
          <h2 className="mb-2 text-xl font-bold text-dark-chocolate md:text-2xl">GARANTIA DE SATISFAÇÃO</h2>
          <p className="text-base text-text-main/80">
            Você tem 7 dias para testar. Se não gostar, devolvemos 100% do seu dinheiro.
          </p>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="bg-vanilla px-4 py-4 md:py-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-dark-chocolate md:text-3xl">As Delícias do Bem são para você se você quer:</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Acabar com as espinhas e a oleosidade', desc: 'Sua pele reflete o que você come. Aprenda a comer doce sem causar inflamações.' },
              { title: 'Combater o envelhecimento precoce', desc: 'O açúcar degrada o colágeno. Nossas receitas ajudam a manter a firmeza e a elasticidade da pele.' },
              { title: 'Reduzir rugas e flacidez', desc: 'Nutra sua pele de dentro para fora com ingredientes que realmente fazem bem.' },
              { title: 'Comer doce sem culpa e sem medo', desc: 'Liberte-se da restrição e aproveite o sabor de verdade sem prejudicar sua saúde.' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-caramel/10 text-caramel">
                  <Check size={14} strokeWidth={4} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark-chocolate leading-tight">{item.title}</h3>
                  <p className="text-sm text-text-main/70 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <PulseButton onClick={scrollToOffer} className="max-w-xs px-8 uppercase">
              QUERO COMEÇAR AGORA
            </PulseButton>
            <p className="mt-3 text-xs font-bold text-strawberry">Não sei até quando esse valor vai continuar disponível</p>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="bg-white px-4 py-4 md:py-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-2 inline-block rounded-full bg-strawberry/10 px-4 py-1 text-xs font-bold text-strawberry uppercase tracking-widest">Bônus Exclusivos</span>
          <h2 className="mb-4 text-2xl font-bold text-dark-chocolate md:text-3xl">PRA VOCÊ QUE CHEGOU ATÉ AQUI</h2>
          <p className="mb-4 text-lg text-text-main/80">
            Além das receitas, você ainda recebe bônus exclusivos para facilitar sua rotina
          </p>

          <div className="mb-6">
            <img 
              src="https://res.cloudinary.com/dyqfspsap/image/upload/v1774978246/bbba6cbf-7218-4c45-b4ea-cb5055a8d76b_1_sjxkxa.webp" 
              alt="Mockup Bônus" 
              className="mx-auto w-full max-w-2xl drop-shadow-xl"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="grid gap-3 text-left sm:grid-cols-2">
              {[
                'Bônus: Receitas de Chás',
                'Bônus: Sucos Detox',
                'Receitas de Doces Zero',
                'Receitas de Molhos e Patês',
                'Receitas de Sopas e Cremes',
                'Receitas de Farinhas sem Glúten',
                'Receitas de Pães'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 py-1">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cta/10 text-cta">
                    <Check size={14} strokeWidth={4} />
                  </div>
                  <span className="text-base font-bold text-dark-chocolate">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-lg text-text-main/60">Tudo o que você vai receber soma mais de <span className="font-bold text-price-old line-through">R$ 99,90</span></p>
            <p className="mt-2 text-xl font-bold text-dark-chocolate">Mas hoje você não irá pagar esse valor, embora valha cada centavo.</p>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="oferta" className="bg-vanilla-dark px-4 py-4 md:py-6">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-6 text-center shadow-xl md:p-10 border border-gray-100">
          <h2 className="mb-4 text-2xl font-bold text-strawberry md:text-4xl uppercase">Hoje você não precisa abrir mão do que gosta</h2>
          
          <p className="mb-8 text-xl font-bold text-dark-chocolate">
            Por um valor simbólico, você tem acesso a tudo isso
          </p>

          <div className="mb-4 flex flex-col items-center gap-6 md:flex-row">
            <div className="md:w-1/2">
              <img 
                src="https://res.cloudinary.com/dyqfspsap/image/upload/v1774975805/mockup_02-Photoroom_zdqdp8.webp" 
                alt="Mockup Delícias do Bem" 
                className="w-full drop-shadow-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left md:w-1/2">
              <h3 className="mb-4 text-xl font-bold text-dark-chocolate">O que você leva hoje:</h3>
              <ul className="space-y-2">
                {[
                  '+365 Receitas Zero Açúcar e sem Glúten',
                  'Bônus: Receitas de Chás',
                  'Bônus: Sucos Detox',
                  'Receitas de Doces Zero',
                  'Receitas de Molhos e Patês',
                  'Receitas de Sopas e Cremes',
                  'Receitas de Farinhas sem Glúten',
                  'Receitas de Pães'
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-strawberry/10 text-strawberry">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className="text-base font-bold text-dark-chocolate/90">{text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-bold text-caramel">Menos que um doce comum</p>
              <p className="mt-2 text-sm font-bold text-caramel">Menos de R$0,03 por receita</p>
              <p className="mt-2 text-sm font-bold text-strawberry animate-pulse">Essa condição pode sair do ar a qualquer momento</p>
            </div>
          </div>

          <div className="mb-4 rounded-2xl bg-vanilla p-6">
            <p className="text-base text-price-old font-bold line-through">DE: R$ 99,90</p>
            <p className="text-lg font-bold text-dark-chocolate uppercase tracking-widest">POR APENAS</p>
            <p className="text-4xl font-bold text-price whitespace-nowrap md:text-5xl">R$ 10,00</p>
          </div>

          <div className="mx-auto max-w-xs">
            <div className="mb-4 text-sm font-bold text-text-main space-y-2">
              <p>Se você sair dessa página, vai continuar comendo da mesma forma…</p>
              <p>E isso continua afetando sua pele todos os dias.</p>
            </div>
            <PulseButton 
              onClick={() => window.location.href = 'https://pay.wiapy.com/cC4Kzh6lIn'} 
              className="py-4 text-xl uppercase"
            >
              COMPRAR AGORA
            </PulseButton>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-white px-4 py-4 md:py-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-dark-chocolate md:text-3xl">O que funciona de verdade?</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {/* What doesn't work */}
            <div className="group relative overflow-hidden rounded-2xl bg-strawberry/5 p-6 border border-strawberry/10">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-strawberry">
                <XCircle size={24} strokeWidth={2.5} />
                O que NÃO funciona
              </h3>
              <ul className="space-y-3">
                {[
                  "Parar de comer doce e viver com desejo",
                  "Gastar rios de dinheiro com cremes caros",
                  "Fazer dietas que você não consegue manter"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-strawberry/10">
                      <Minus className="text-strawberry" size={12} strokeWidth={4} />
                    </div>
                    <span className="text-base font-medium text-dark-chocolate leading-tight">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What works */}
            <div className="group relative overflow-hidden rounded-2xl bg-cta/5 p-6 border border-cta/10">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-cta">
                <CheckCircle2 size={24} strokeWidth={2.5} />
                O que dá RESULTADO
              </h3>
              <ul className="space-y-3">
                {[
                  "Comer doce sem prejudicar sua pele",
                  "Combater o envelhecimento de dentro para fora",
                  "Ter prazer ao comer e ver sua pele melhorar"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cta/10">
                      <Check className="text-cta" size={12} strokeWidth={4} />
                    </div>
                    <span className="text-base font-medium text-dark-chocolate leading-tight">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <PulseButton 
              onClick={() => window.location.href = 'https://pay.wiapy.com/cC4Kzh6lIn'} 
              className="max-w-xs px-8 uppercase"
            >
              QUERO O MÉTODO QUE FUNCIONA
            </PulseButton>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-vanilla px-4 py-4 md:py-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-dark-chocolate md:text-3xl">Perguntas Frequentes</h2>
          <div className="space-y-2">
            <FAQItem 
              question="Como recebo as receitas?" 
              answer="Você receberá no seu e-mail os dados de acesso à plataforma com todo conteúdo imediatamente após a confirmação do pagamento." 
            />
            <FAQItem 
              question="Consigo acessar pelo celular?" 
              answer="Sim! Você pode acessar por qualquer dispositivo: celular, tablet ou computador, a qualquer hora e em qualquer lugar." 
            />
            <FAQItem 
              question="Por quanto tempo terei acesso?" 
              answer="O acesso ao conteúdo é totalmente vitalício. Você paga uma única vez e as receitas são suas para sempre." 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-chocolate px-4 py-12 text-center text-white">
        <h2 className="mb-4 text-2xl font-bold">Delícias do Bem</h2>
        <p className="mb-8 text-white/60">Sabor de verdade, saúde garantida.</p>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm uppercase tracking-widest text-white/40">Suporte</span>
          <a href="mailto:suporteativo4@gmail.com" className="text-caramel hover:underline">suporteativo4@gmail.com</a>
        </div>
        <p className="mt-12 text-xs text-white/20">© 2026 Delícias do Bem. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
