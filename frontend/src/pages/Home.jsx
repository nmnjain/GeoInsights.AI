import React, { useEffect, useMemo, useState } from "react";
import {
  Mic,
  Brain,
  MessageCircle,
  FileText,
  Zap,
  ArrowRight,
  BarChart3,
  Circle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "Framer-motion";

// Small CountUp component for animated stats
const CountUp = ({
  end = 0,
  duration = 1600,
  formatter = (n) => n.toLocaleString(),
  suffix = "+",
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);

  return (
    <span>
      {formatter(value)}
      {suffix}
    </span>
  );
};

const Home = () => {
  const features = useMemo(
    () => [
      {
        icon: FileText,
        title: "What makes it unique?",
        description:
          "We combine satellite data, census stats, and AI-powered narratives into one easy-to-use dashboard with transparency and source citations.",
        path: "/app-uniquness",
        gradient: "from-cyan-500 via-blue-500 to-fuchsia-600",
      },
      {
        icon: Brain,
        title: "What is this platform about?",
        description:
          "It's a role-based dashboard that shows how Pune is changing—urban growth, green cover loss, and flood risks—through maps, charts, and simple insights.",
        path: "/about-platform",
        gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
      },
      {
        icon: Mic,
        title: "Do I need technical Knowledge to use it?",
        description:
          "No, the dashboard is simple, citizens get plain language summaries, while NGOs/reporters can drive deeper.",
        path: "/earth",
        gradient: "from-blue-500 via-cyan-500 to-emerald-500",
      },
      {
        icon: MessageCircle,
        title: "How is this different from Google Maps?",
        description:
          "Unlike maps, we show change over time (urban growth, green loss) with role based insights.",
        path: "/ai-doubt-solver",
        gradient: "from-amber-500 via-orange-500 to-rose-500",
      },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { icon: FileText, label: "million popuation", value: 4 },
      { icon: Brain, label: "Colonies", value: 400 },
      { icon: Mic, label: "Services", value: 4000 },
    ],
    []
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section with Earth Background */}
      <div className="relative w-screen h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(./textures/landingBg.jpg)` }}
        />

        {/* Tagline Overlay */}
        <div className="absolute inset-x-0 bottom-30 flex justify-center">
          <div className="text-center">
            {/* Brand Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full mb-8 backdrop-blur-sm bg-white/10">
              <Circle className="w-2 h-2 fill-cyan-400 text-cyan-400" />
              <span className="text-sm tracking-wide text-white">Bayes-ic</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter mb-6">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent opacity-90 hover:opacity-100 transition-opacity duration-500">
                Map.{" "}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent opacity-90 hover:opacity-100 transition-opacity duration-500">
                Analyze.{" "}
              </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-white bg-clip-text text-transparent opacity-90 hover:opacity-100 transition-opacity duration-500">
                Transform.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
              See Pune's Evolution Through Data
            </p>

            {/* CTA Button */}
            <Link
              to="/earth"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-white/20 rounded-full text-white hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="text-lg">Explore Platform</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-0" />
      </div>

      {/* Main Content Section with Black Background */}
      <section className="relative bg-black text-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full mb-6 text-sm text-white/60">
              <Zap className="w-4 h-4 text-cyan-400" />
              Platform Overview
            </div>
            <h2 className="text-5xl tracking-tight mb-6">
              See Pune's Change,{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Shape Its Future
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Making complex satellite and census data simple for reporters, NGOs and citizens.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative p-8 border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-500 backdrop-blur-sm bg-white/[0.02] hover:bg-white/[0.05]">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl mb-4 leading-tight">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-6">{feature.description}</p>
                  
                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-cyan-400 group-hover:gap-3 transition-all duration-300">
                    <span className="text-sm">Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h3 className="text-3xl mb-4">See your City Evolve, One Map at a Time.</h3>
            <p className="text-white/60 mb-16">Four focused tools. One seamless experience.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="p-8 border border-white/10 rounded-2xl backdrop-blur-sm bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4 mx-auto">
                      <stat.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="text-4xl mb-2">
                      <CountUp end={stat.value} />
                    </div>
                    <div className="text-white/60">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/earth"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(34,211,238,0.3)] group"
            >
              <span className="text-lg">Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;