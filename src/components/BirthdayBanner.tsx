import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Sparkles, CalendarDays, Music2 } from 'lucide-react';
import { BIRTHDAY_DATE } from '@/lib/constants';
import { Button } from './ui/button';
import { HeartFireworks } from './HeartFireworks';

const celebrationPromises = [
  {
    title: 'Sunrise wishes',
    detail: 'Reading the love letter while the sun rises over Dagupan Bay.',
  },
  {
    title: 'Secret serenade',
    detail: 'A mini concert of your favorite songs (yes, I practiced!).',
  },
  {
    title: 'Polaroid adventure',
    detail: '12 snapshots for 12 wishes we will make together.',
  },
];

interface BirthdayBannerProps {
  onOpenStory: () => void;
  onOpenPlaylist: () => void;
}

export function BirthdayBanner({ onOpenStory, onOpenPlaylist }: BirthdayBannerProps) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const target = BIRTHDAY_DATE.getTime();
    const timer = setInterval(() => {
      const now = Date.now();
      const difference = target - now;

      if (difference > 0) {
        setIsBirthday(false);
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsBirthday(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-100 px-4 py-16">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="relative overflow-hidden rounded-[2.5rem] border border-white/50 bg-gradient-to-r from-pink-200 via-rose-200 to-amber-100 p-10 shadow-[0_35px_80px_-30px_rgba(244,114,182,0.8)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 opacity-30">
            {[...Array(16)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 16 + 8}px`,
                }}
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random(),
                }}
              >
                *
              </motion.span>
            ))}
          </div>

          <HeartFireworks active={isBirthday} />

          <div className="relative z-10 grid items-center gap-10 text-slate-900 md:grid-cols-[1.6fr,1fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-800">
                <Sparkles className="h-4 w-4" />
                Birthday Countdown
                <CalendarDays className="h-4 w-4" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-semibold md:text-5xl">
                  {isBirthday ? 'Happy Birthday, Annielyn! 🎉' : 'Happy birthday month, Annielyn! 🎂'}
                </h1>
                <p className="text-lg text-slate-700">
                  {isBirthday
                    ? 'Tonight we celebrate you completely—cake, music, letters, and a sky full of heart fireworks.'
                    : "I want every moment of your day to feel soft, magical, and completely yours. Here's what I'm preparing while we count down the last few sleeps."
                  }
                </p>
                <p className="text-sm uppercase tracking-[0.4em] text-slate-600">
                  Softer hugs · brighter laughter · starlit wishes
                </p>
              </div>

              {!isBirthday && (
                <div className="flex flex-wrap gap-4 text-slate-900">
                  {[
                    { label: 'Days', value: countdown.days },
                    { label: 'Hours', value: countdown.hours },
                    { label: 'Minutes', value: countdown.minutes },
                    { label: 'Seconds', value: countdown.seconds },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex min-w-[110px] flex-col rounded-2xl bg-white/80 px-4 py-3 text-center shadow-sm"
                    >
                      <span className="text-3xl font-bold">{item.value.toString().padStart(2, '0')}</span>
                      <span className="text-xs uppercase tracking-wide text-slate-500">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <Button size="lg" className="min-w-[180px]" onClick={onOpenStory}>
                  See our story
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="min-w-[200px] border-white/70 bg-white/70 text-slate-900 hover:bg-white"
                  onClick={onOpenPlaylist}
                >
                  Play birthday playlist
                </Button>
              </div>
            </div>

            <div className="rounded-3xl bg-white/80 p-6 text-slate-900 shadow-lg shadow-rose-200/70">
              <div className="flex items-center gap-3">
                <Gift className="h-10 w-10 text-amber-500" />
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Highlight of the night</p>
                  <p className="text-lg font-semibold">Star-gazing dessert picnic</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Handmade cake, fairy lights, and a playlist that ends with the song we danced to the first night we met.
                I&apos;m handling every detail—you just bring your brightest smile.
              </p>

              <div className="mt-5 space-y-3">
                {celebrationPromises.map((promise) => (
                  <div key={promise.title} className="flex gap-3 rounded-2xl bg-slate-900/5 px-3 py-2 shadow-inner">
                    <Music2 className="h-5 w-5 text-rose-500" />
                    <div>
                      <p className="text-sm font-semibold">{promise.title}</p>
                      <p className="text-xs text-slate-600">{promise.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
