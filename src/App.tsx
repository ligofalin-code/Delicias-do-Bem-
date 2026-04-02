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
        "0 10px 15px -3px rgba(34, 197, 94, 0.3)",
        "0 20px 25px -5px rgba(34, 197, 94, 0.5)",
        "0 10px 15px -3px rgba(34, 197, 94, 0.3)"
      ]
    }}
    transition={{ 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={`w-full rounded-full bg-cta py-5 text-xl font-bold text-white shadow-xl transition-all hover:bg-cta-hover active:scale-95 uppercase ${className}`}
  >
    {children}
  </motion.button>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 23); // 14 minutes and 23 seconds in seconds

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
    { src: "https://res.cloudinary.com/dyqfspsap/image/upload/v1774975343/Depoimento_01_i86wcw.webp", text: "fiz e deu super certo" },
    { src: "https://res.cloudinary.com/dyqfspsap/image/upload/v1774975343/Depoimento_02_sel5kd.webp", text: "não acredito que ficou tão bom assim" },
    { src: "https://res.cloudinary.com/dyqfspsap/image/upload/v1774975343/Depoimento_03_eiwmpu.webp", text: "finalmente uma receita que funciona" },
    { src: "https://res.cloudinary.com/dyqfspsap/image/upload/v1774975343/Depoimento_04_ckadg9.webp", text: "achei que ia ser ruim, mas é muito gostoso" },
    { src: "https://res.cloudinary.com/dyqfspsap/image/upload/v1774975343/Depoimento_05_peqzxa.webp", text: "fiz e deu super certo" }
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
          <h1 className="mb-6 text-3xl font-bold leading-tight text-dark-chocolate md:text-6xl">
            Você ama doce, mas ele pode estar <span className="text-strawberry">destruindo sua pele, seu corpo e sua saúde</span>, mesmo sem você perceber
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-dark-chocolate/80 md:text-xl leading-relaxed">
            E o pior, você tenta evitar, mas sempre volta. Porque <span className="font-bold text-cocoa">ninguém aguenta viver sem comer o que gosta.</span>
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
            <p className="text-lg font-medium text-dark-chocolate mb-4">Se você já pensou isso, presta atenção:</p>
            <div className="italic text-dark-chocolate/70 space-y-1 mb-4">
              <p>“Eu sei que não devia, mas eu como mesmo assim”</p>
              <p>“Será que isso vai me fazer mal?”</p>
              <p>“Depois eu compenso…”</p>
            </div>
            <p className="text-xl font-bold text-strawberry">Você não é o problema.</p>
          </div>

          <div className="mb-6 flex flex-col items-center gap-3 text-left md:flex-row md:justify-center md:gap-6">
            <div className="flex items-center gap-2 font-bold text-cocoa text-sm md:text-base">
              <Check className="text-strawberry" size={18} />
              <span>Receitas fáceis</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-cocoa text-sm md:text-base">
              <Check className="text-strawberry" size={18} />
              <span>Ingredientes simples</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-cocoa text-sm md:text-base">
              <Check className="text-strawberry" size={18} />
              <span>Sabor de verdade</span>
            </div>
          </div>

          <div className="mb-6 inline-block rounded-xl bg-white p-4 shadow-md border border-caramel/20">
            <p className="text-[10px] uppercase tracking-widest text-cocoa">Oferta Exclusiva</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-base text-bright-red font-bold line-through">R$ 99,90</span>
              <span className="text-2xl font-bold text-cta md:text-3xl">R$ 10,00</span>
            </div>
          </div>

          <div className="mx-auto max-w-xs">
            <PulseButton onClick={scrollToOffer} className="py-4 text-lg uppercase">
              Quero comer sem medo
            </PulseButton>
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
            <p className="text-lg font-medium text-dark-chocolate/80">
              E muitas vezes, o problema está no que você come todos os dias.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              { label: 'Acne', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973423/acne_ysx15x.webp' },
              { label: 'Pele seca', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973424/Pele_seca_doxb5m.webp' },
              { label: 'Rugas', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973427/rugas_uemzf4.webp' },
              { label: 'Envelhecimento precoce', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973424/envelhecimento_precoce_fzde4h.webp' },
              { label: 'Degradação do colágeno', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973424/degrada%C3%A7%C3%A3o_do_col%C3%A1geno_srbmhz.webp' },
              { label: 'Flacidez', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973424/flacidez_hgltlj.webp' },
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
              <h3 className="mb-4 text-xl font-bold text-dark-chocolate">O problema não é falta de força de vontade.</h3>
              <p className="mb-4 text-dark-chocolate/80">O problema é que você foi colocado em uma escolha impossível:</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 font-bold text-strawberry">
                  <XCircle size={20} />
                  <span>Ou você abre mão do que gosta</span>
                </li>
                <li className="flex items-center gap-3 font-bold text-strawberry">
                  <XCircle size={20} />
                  <span>Ou você aceita as consequências</span>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-cocoa/10">
                <p className="font-bold text-dark-chocolate mb-3">Você não está sozinho se:</p>
                <ul className="space-y-2 text-sm text-dark-chocolate/70">
                  <li>• Já tentou fazer receita saudável e ficou ruim?</li>
                  <li>• Já tentou cortar tudo e não aguentou?</li>
                  <li>• Já ficou na dúvida se aquilo realmente era saudável?</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col justify-center text-center md:text-left">
              <h2 className="mb-4 text-2xl font-bold text-dark-chocolate leading-tight">
                A verdade é simples: <span className="text-caramel">Você não precisa parar de comer.</span>
              </h2>
              <p className="mb-6 text-lg text-dark-chocolate/80">Você só precisa aprender a fazer do jeito certo.</p>
              <PulseButton onClick={scrollToOffer} className="px-6 text-base uppercase">
                QUERO APRENDER O JEITO CERTO
              </PulseButton>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-vanilla px-4 py-4 md:py-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { 
                step: '1', 
                title: 'Pare de viver na dúvida', 
                desc: 'Tenha receitas que realmente funcionam e que não te deixam na mão na hora de preparar.' 
              },
              { 
                step: '2', 
                title: 'Coma sem medo', 
                desc: 'Sem açúcar, sem glúten e sem aquele impacto devastador no seu corpo e na sua saúde.' 
              },
              { 
                step: '3', 
                title: 'Volte a sentir prazer em comer', 
                desc: 'Sem culpa, sem restrição extrema e sem aquela sensação de estar sempre perdendo o melhor da vida.' 
              }
            ].map((item, i) => (
              <div key={i} className="relative rounded-3xl bg-white p-6 pt-10 shadow-md">
                <div className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-xl bg-dark-chocolate text-xl font-bold text-white shadow-md">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-bold text-dark-chocolate leading-tight">{item.title}</h3>
                <p className="text-sm text-dark-chocolate/70 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white px-4 py-4 md:py-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-dark-chocolate md:text-3xl">
            Os benefícios que você começa a sentir na prática
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Utensils size={20} />, title: 'Comer sem medo', desc: 'Saboreie o que você ama sem a preocupação constante com o que isso está fazendo com você.' },
              { icon: <Heart size={20} />, title: 'Parar de se sentir culpado', desc: 'Elimine de vez o peso na consciência após cada refeição ou sobremesa.' },
              { icon: <Zap size={20} />, title: 'Segurança no consumo', desc: 'Tenha a certeza absoluta de que o que você está comendo é realmente saudável.' },
              { icon: <Star size={20} />, title: 'Leveza real', desc: 'Sinta a diferença imediata no seu corpo, sem inchaço e com muito mais disposição.' },
              { icon: <Clock size={20} />, title: 'Voltar a gostar de comer', desc: 'Recupere o prazer genuíno de se alimentar bem, sem as amarras da restrição severa.' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl bg-vanilla/20 p-5 transition-all hover:bg-vanilla/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-caramel shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h3 className="mb-1 text-base font-bold text-dark-chocolate">{item.title}</h3>
                  <p className="text-sm text-dark-chocolate/70 leading-snug">{item.desc}</p>
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
            📅 365 DIAS DE CARDÁPIOS PRONTOS PRA VOCÊ
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-base text-dark-chocolate/80 leading-relaxed">
            Você não vai precisar pensar no que comer… <span className="font-bold text-caramel">já está tudo pronto pra você</span>.
          </p>

          <div className="grid gap-4">
            {[
              { title: 'CAFÉ DA MANHÃ E LANCHES', text: 'Café da manhã prático e gostoso', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973424/cafe_da_manha_yi2kxn.webp' },
              { title: 'ALMOÇO E JANTAR', text: 'Comida de verdade, com sabor de verdade', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973423/almo%C3%A7o_e_jantar_svesw0.webp' },
              { title: 'DOCES E SOBREMESAS', text: 'Sobremesas que você pode comer sem culpa', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973423/doces_e_sobremesas_jchkov.webp' },
              { title: 'MOLHOS E PATÊS', text: 'Sabores que transformam qualquer refeição', src: 'https://res.cloudinary.com/dyqfspsap/image/upload/v1774973424/pates_lnbksg.webp' },
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
      <section className="bg-vanilla px-4 py-4 md:py-6">
        <div className="mx-auto max-w-2xl text-center">
          <img 
            src="https://res.cloudinary.com/dyqfspsap/image/upload/v1773788489/SELO_GARANTIA_IMAGEM_pekub3.webp" 
            alt="Selo de Garantia" 
            className="mx-auto mb-4 w-full max-w-xs"
            referrerPolicy="no-referrer"
          />
          <h2 className="mb-2 text-xl font-bold text-dark-chocolate md:text-2xl">GARANTIA DE SATISFAÇÃO</h2>
          <p className="text-base text-dark-chocolate/80">
            Você tem 7 dias para testar todas as receitas. Se por qualquer motivo você não gostar, nós devolvemos 100% do seu dinheiro.
          </p>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="bg-vanilla px-4 py-4 md:py-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-dark-chocolate md:text-3xl">As Delícias do Bem são para você se:</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Pessoas com restrições alimentares', desc: 'Indivíduos que precisam evitar açúcar e glúten por questões de saúde, como diabetes e intolerâncias.' },
              { title: 'Famílias saudáveis', desc: 'Pais que buscam oferecer uma alimentação nutritiva e saborosa para seus filhos, promovendo hábitos saudáveis desde cedo.' },
              { title: 'Adeptos de estilos de vida saudáveis', desc: 'Pessoas que seguem dietas como low carb, paleo ou veganas e desejam receitas que se encaixem nessas abordagens.' },
              { title: 'Busca de controle de peso', desc: 'Pessoas que desejam perder ou manter o peso, precisando de receitas que sejam satisfatórias, mas que ajudem a controlar as calorias.' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-caramel/10 text-caramel">
                  <Check size={14} strokeWidth={4} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark-chocolate leading-tight">{item.title}</h3>
                  <p className="text-sm text-dark-chocolate/70 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <PulseButton onClick={scrollToOffer} className="max-w-xs px-8 uppercase">
              QUERO COMEÇAR AGORA
            </PulseButton>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="bg-white px-4 py-4 md:py-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-2 inline-block rounded-full bg-strawberry/10 px-4 py-1 text-xs font-bold text-strawberry uppercase tracking-widest">Bônus Exclusivos</span>
          <h2 className="mb-4 text-2xl font-bold text-dark-chocolate md:text-3xl">PRA VOCÊ QUE CHEGOU ATÉ AQUI</h2>
          <p className="mb-4 text-lg text-dark-chocolate/80">
            AO COMPRAR AS DELICIAS DO BEM HOJE, VOCÊ RECEBERÁ <span className="font-bold text-caramel">6 BÔNUS EXCLUSIVOS</span>
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
            <p className="text-lg text-dark-chocolate/60">Tudo o que você vai receber soma mais de <span className="font-bold text-bright-red line-through">R$ 99,90</span></p>
            <p className="mt-2 text-xl font-bold text-dark-chocolate">Mas hoje você não irá pagar esse valor... embora valha cada centavo.</p>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="oferta" className="bg-vanilla px-4 py-4 md:py-6">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-6 text-center shadow-xl md:p-10">
          <h2 className="mb-4 text-2xl font-bold text-strawberry md:text-4xl">OFERTA POR TEMPO LIMITADO!</h2>
          
          <p className="mb-8 text-xl font-bold text-dark-chocolate">
            Você pode continuar vivendo na dúvida… <br/>
            <span className="text-cta">ou pode finalmente ter controle sobre o que você come</span>
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
              <h3 className="mb-4 text-xl font-bold text-dark-chocolate">Hoje você não precisa abrir mão do que gosta:</h3>
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
              <p className="mt-6 text-sm font-bold text-strawberry animate-pulse">Mas essa condição pode sair do ar a qualquer momento</p>
            </div>
          </div>

          <div className="mb-4 rounded-2xl bg-vanilla p-6">
            <p className="text-base text-bright-red font-bold line-through">DE: R$ 99,90</p>
            <p className="text-lg font-bold text-dark-chocolate uppercase tracking-widest">POR APENAS</p>
            <p className="text-4xl font-bold text-cta whitespace-nowrap md:text-5xl">R$ 10,00</p>
          </div>

          <div className="mx-auto max-w-xs">
            <p className="mb-4 text-sm font-bold text-dark-chocolate">Ou você continua abrindo mão de tudo… ou aprende de uma vez por todas a fazer do jeito certo</p>
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
                  "Comer pouco e passar fome",
                  "Seguir dietas complicadas e caras",
                  "Deixar de comer o que você gosta"
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
                  "Comer comida de verdade e saborosa",
                  "Receitas simples, práticas e rápidas",
                  "Alimentação sem açúcar e sem glúten"
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
