/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import NoteDetail from './components/NoteDetail';
import { 
  Mail,
  Instagram,
  MessageCircle,
  Linkedin, 
  Github, 
  Twitter, 
  Moon, 
  Sun, 
  Send, 
  Download,
  ExternalLink,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import avatar1 from '../avatar1.jpg';
import avatar2 from '../avatar2.jpg';
import avatar3 from '../avatar3.jpg';
import avatar4 from '../avatar4.jpg';
// import avatar5 from '../avatar5.jpg';

// --- Components ---

const Navbar = () => {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium opacity-70">
            <span className="cursor-pointer hover:opacity-100 transition-opacity" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>首页</span>
            <a href="#about" className="hover:opacity-100 transition-opacity">关于我</a>
            <a href="#notes" className="hover:opacity-100 transition-opacity">我的笔记</a>
            {/* <a href="#projects" className="hover:opacity-100 transition-opacity">我的作品</a> */}
            <a href="#contact" className="hover:opacity-100 transition-opacity">联系我</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pr-4 border-r border-black/10">
            <a href="#" className="hover:scale-110 transition-transform"><Linkedin size={18} /></a>
            <a href="#" className="hover:scale-110 transition-transform"><Twitter size={18} /></a>
            <a href="#" className="hover:scale-110 transition-transform"><Github size={18} /></a>
          </div>
          <button className="w-10 h-6 bg-black/5 rounded-full relative p-1 flex items-center">
            <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [index, setIndex] = useState(0);
  const photos = [
    avatar1,
    avatar2,
    avatar3,
    avatar4
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [photos.length]);

  return (
    <section className="min-h-screen pt-40 pb-20 px-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-24">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 space-y-8 pl-[10px]"
      >
        <div className="space-y-6">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl font-medium text-black/40 leading-tight">
              我是 <span className="text-black font-bold relative">
                Jessie Huang
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-purple-400/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>
          </div>
          
          <div className="flex flex-col gap-2">
            <img src="/component2.PNG" alt="需求池垂钓者 X 体验地图探险家" className="h-10 md:h-12 w-auto object-contain self-start" />
            <p className="text-lg text-black/40 max-w-lg leading-relaxed pt-2">
              致力于在复杂的需求中钓取核心价值，在用户体验的广袤地图中探索未知的惊喜。
            </p>
            <div className="pt-4">
              <img src="/component1.PNG" alt="Decoration" className="w-48 md:w-64 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 pt-8">
          <button className="bg-black text-white px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-black/80 transition-colors shadow-xl shadow-black/10">
            下载简历 <Download size={16} />
          </button>
          <button className="bg-white text-black px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-white/80 transition-colors shadow-xl shadow-black/5">
            联系我 <Send size={16} />
          </button>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 flex justify-center md:justify-end relative pr-[70px]"
      >
        {/* Doodles */}
        <div className="absolute -bottom-10 -right-10 text-orange-400 opacity-40">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 38C15 10 35 2 78 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 8"/>
          </svg>
        </div>

        {/* Animated Photo Stack */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 cursor-pointer" onClick={() => setIndex((prev) => (prev + 1) % photos.length)}>
          <AnimatePresence mode="popLayout">
            {[0, 1, 2].map((offset) => {
              const photoIndex = (index + offset) % photos.length;
              const photo = photos[photoIndex];
              if (!photo) return null;
              
              return (
                <motion.div
                  key={`${photoIndex}-${index}`} // 组合 key 确保在切换时能触发动画
                  initial={{ opacity: 0, x: 50, rotate: 10 }}
                  animate={{ 
                    opacity: 1 - offset * 0.3, 
                    x: offset * 20, 
                    y: -offset * 20,
                    rotate: offset * 5,
                    zIndex: 10 - offset,
                    scale: 1 - offset * 0.05
                  }}
                  exit={{ opacity: 0, x: -100, rotate: -20, transition: { duration: 0.4 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 bg-white p-3 rounded-2xl shadow-xl"
                >
                  <img 
                    src={photo} 
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const experiences = [
    {
      year: "未来",
      title: "The World",
      company: "待定～",
      description: "步履不停，探索更多可能性。"
    },
    {
      year: "2026",
      title: "字节跳动",
      company: "Tiktok PM intern",
      description: "待补充..."
    },
    {
      year: "2025 - 2027",
      title: "新加坡国立大学",
      company: "AI for Science",
      description: "科学发现的第五范式，终极展望是发明AI届爱因斯坦"
    },
    {
      year: "2025",
      title: "百度",
      company: "Prodcut manager intern",
      description: "主要负责To B定制化SaaS服务、设计低代码平台自动化Agent"
    },
    {
      year: "2021 - 2025",
      title: "华南理工大学",
      company: "软件工程",
      description: "我和小鹏有六人定律，我班主任的隔壁室友是小鹏"
    }
  ];

  return (
    <section id="about" className="py-32 px-6 max-w-6xl mx-auto space-y-32">
      {/* Title */}
      <div className="space-y-4">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">
          <span className="text-black/30">关于</span> 我
        </h2>
        <p className="text-sm font-bold tracking-widest uppercase text-black/40">我是谁，以及我的生活轨迹。</p>
      </div>

      {/* MBTI & Intro */}
      <div className="grid md:grid-cols-3 gap-8">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="md:col-span-1 glass p-10 rounded-[40px] flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-xs font-bold tracking-[0.2em] text-black/30 uppercase">我的人格类型</span>
          <h3 className="text-7xl font-black tracking-tighter bg-gradient-to-br from-purple-600 to-orange-500 bg-clip-text text-transparent">
            ENFJ
          </h3>
          <p className="text-sm font-medium text-black/50">“主持人” - Earth Needs Funny Jigsaw.</p>
        </motion.div>
        
        <div className="md:col-span-2 glass p-10 rounded-[40px] flex flex-col justify-center space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-black/40">最喜欢的一句话</h3>
          <div className="text-xl text-black/70 leading-relaxed italic">
            "People with very high expectations have very low <span className="font-bold bg-gradient-to-r from-yellow-200 to-yellow-400 bg-[length:100%_40%] bg-no-repeat bg-bottom px-1">resilience</span>. Unfortunately <span className="font-bold bg-gradient-to-r from-yellow-200 to-yellow-400 bg-[length:100%_40%] bg-no-repeat bg-bottom px-1">resilience</span> matters in success. Greatness comes from character and character isn’t formed out of smart people. It’s formed out of people who suffered."
            <div className="text-right mt-4 text-sm font-medium not-italic text-black/50">
              ——黄仁勋
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-16">
        <h3 className="text-xs font-bold uppercase tracking-widest text-black/40 text-center">学业与实习经历</h3>
        <div className="relative space-y-12 before:absolute before:left-[17px] md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-black/5">
          {experiences.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full glass flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>
              
              <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-right'}`}>
                <div className="glass p-8 rounded-3xl space-y-2 hover:shadow-xl transition-shadow">
                  <span className="text-xs font-bold text-purple-500">{exp.year}</span>
                  <h4 className="text-xl font-bold">{exp.title}</h4>
                  <p className="text-sm font-medium opacity-50">{exp.company}</p>
                  <p className="text-sm text-black/60 pt-2">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bento Grid Interests */}
      <div className="space-y-16">
        <h3 className="text-xs font-bold uppercase tracking-widest text-black/40 text-center">生活方式与爱好</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Reading */}
          <motion.div whileHover={{ y: -5 }} className="col-span-2 glass p-8 rounded-[40px] space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-widest text-black/30 uppercase">正在阅读</span>
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">📖</div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-20 h-28 bg-black/5 rounded-lg shadow-inner flex-shrink-0 overflow-hidden">
                <img src="https://picsum.photos/seed/book/200/300" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold">《生而为人》</h4>
                <p className="text-xs opacity-50">毕啸南</p>
                <div className="pt-2 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-black/5 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-orange-400" />
                  </div>
                  <span className="text-[10px] font-bold opacity-30">75%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Music */}
          <motion.div whileHover={{ y: -5 }} className="col-span-2 md:col-span-1 glass p-8 rounded-[40px] flex flex-col justify-between aspect-square md:aspect-auto">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-widest text-black/30 uppercase">最爱的歌</span>
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">🎵</div>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold leading-tight">青山绿野</h4>
              <p className="text-xs opacity-50">渡辺雅二</p>
            </div>
            <div className="flex gap-1 items-end h-8">
              {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4].map((h, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: [`${h*100}%`, `${Math.random()*100}%`, `${h*100}%`] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                  className="flex-1 bg-purple-400 rounded-t-sm"
                />
              ))}
            </div>
          </motion.div>

          {/* Travel */}
          <motion.div whileHover={{ y: -5 }} className="col-span-2 md:col-span-1 glass p-8 rounded-[40px] flex flex-col justify-between overflow-hidden relative group">
            <img 
              src="https://picsum.photos/seed/travel/400/600" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="relative z-10 flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-widest text-black/30 uppercase">足迹</span>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">✈️</div>
            </div>
            <div className="relative z-10">
              <h4 className="font-bold">墨西哥-亡灵节</h4>
              <p className="text-xs opacity-50">下一个目的地</p>
            </div>
          </motion.div>

          {/* Movie */}
          <motion.div whileHover={{ y: -5 }} className="col-span-2 glass p-8 rounded-[40px] flex items-center gap-8">
            <div className="flex-1 space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-black/30 uppercase">电影推荐</span>
              <h4 className="text-2xl font-bold">《寻梦环游记》</h4>
              <p className="text-xs opacity-50 leading-relaxed">“死亡不是终点，遗忘才是。”</p>
            </div>
            <div className="w-24 h-36 bg-black/5 rounded-xl shadow-2xl overflow-hidden rotate-6 hover:rotate-0 transition-transform">
              <img src="/movie.jpg" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Hobbies */}
          <motion.div whileHover={{ y: -5 }} className="col-span-2 glass p-8 rounded-[40px] grid grid-cols-3 gap-4">
            <div className="col-span-3">
              <span className="text-[10px] font-bold tracking-widest text-black/30 uppercase">兴趣爱好</span>
            </div>
            {['旅游✈️', '吉他🎸', '网球🎾', '游泳🏊', '写作✏️', '看书📖'].map((hobby, i) => (
              <div key={i} className="bg-black/5 py-2 px-4 rounded-xl flex items-center justify-center text-center text-xs font-bold hover:bg-black hover:text-white transition-colors cursor-default">
                {hobby}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Vision OS",
      description: "企业项目、个人项目、作品与创作。",
      image: "https://picsum.photos/seed/vision/1200/800",
      icon: ""
    },
    {
      title: "设计系统",
      description: "设计并开发一套现代化的组件库。",
      image: "https://picsum.photos/seed/design/1200/800",
      icon: "✦"
    }
  ];

  return (
    <section id="projects" className="py-32 px-6 max-w-6xl mx-auto space-y-24">
      <div className="space-y-4">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">
          <span className="text-black/30">我的</span> 作品
        </h2>
        <p className="text-sm font-bold tracking-widest uppercase text-black/40">企业项目、个人项目、作品与创作。</p>
      </div>
      
      <div className="space-y-40">
        {projects.map((project, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="group cursor-pointer"
          >
            <div className="flex items-center gap-6 mb-12">
              <span className="text-6xl md:text-8xl">{project.icon}</span>
              <h3 className="text-7xl md:text-9xl font-bold tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                {project.title}
              </h3>
            </div>
            <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden glass group-hover:shadow-2xl transition-all duration-500">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 max-w-6xl mx-auto space-y-24">
      <div className="space-y-4">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">
          保持 <span className="text-black/30">联系</span>
        </h2>
        <p className="text-sm font-bold tracking-widest uppercase text-black/40">通过邮件或社交媒体与我联系。</p>
      </div>
      
      <div className="max-w-3xl mx-auto grid gap-6">
        {/* Email Card */}
        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass p-8 rounded-3xl flex items-center justify-between group cursor-pointer"
          onClick={() => window.location.href = "mailto:h15260588036@gmail.com"}
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-500">
              <Mail size={32} />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold">Email</h4>
              <div className="flex flex-col text-sm opacity-60 font-medium">
                <span>h15260588036@gmail.com</span>
                <span>sijiehuang0915@qq.com</span>
              </div>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
            <ArrowRight size={20} />
          </div>
        </motion.div>

        {/* Instagram Card */}
        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass p-8 rounded-3xl flex items-center justify-between group cursor-pointer"
          onClick={() => window.open("https://instagram.com/isnotjessie", "_blank")}
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-50 flex items-center justify-center text-pink-600 shadow-sm group-hover:scale-110 transition-transform duration-500">
              <Instagram size={32} />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold">Instagram</h4>
              <p className="text-sm opacity-60 font-medium">@isnotjessie</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
            <ArrowRight size={20} />
          </div>
        </motion.div>

        {/* WeChat Card */}
        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass p-8 rounded-3xl flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center text-green-600 shadow-sm group-hover:scale-110 transition-transform duration-500">
              <MessageCircle size={32} />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold">WeChat</h4>
              <p className="text-sm opacity-60 font-medium">H15260588036</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
            <ArrowRight size={20} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Notes = () => {
  const [activeCategory, setActiveCategory] = useState("全部");
  const categories = ["全部", "AI产品思考", "概念探索", "感悟-碎碎念"];

  const notes = [
    {
      id: 1,
      date: "2026年3月12日",
      title: "从SaaS到CaaS",
      category: "AI产品思考",
      file: '/paper1.md'
    },
    {
      id: 2,
      date: "2026年3月5日",
      title: "【论】元宇宙存亡",
      category: "概念探索",
      file: '/paper2.md'
    },
    {
      id: 3,
      date: "2026年3月17日",
      title: "re + salire",
      category: "感悟-碎碎念",
      file: '/paper3.md'
    }
  ];

  const filteredNotes = activeCategory === "全部" 
    ? notes 
    : notes.filter(note => note.category === activeCategory);

  return (
    <section id="notes" className="py-32 px-6 max-w-6xl mx-auto space-y-24">
      <div className="space-y-4">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">
          <span className="text-black/30">我的</span> 笔记
        </h2>
        <p className="text-sm font-bold tracking-widest uppercase text-black/40">思考、教程与分享。</p>
      </div>
      
      {/* Category Tabs */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide pl-2 pt-2">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
              activeCategory === cat 
                ? 'bg-black text-white shadow-lg scale-105' 
                : 'bg-white/50 hover:bg-white hover:shadow-md text-black/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredNotes.map((note) => (
            <Link to={`/note/${note.id}`} key={note.id}>
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="glass p-8 rounded-[32px] space-y-6 flex flex-col justify-between group cursor-pointer h-full"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold tracking-widest text-black/30">{note.date}</span>
                    <span className="text-[10px] font-bold tracking-widest px-3 py-1 bg-black/5 rounded-full">{note.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold leading-tight group-hover:text-purple-600 transition-colors">
                    {note.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold opacity-40 group-hover:opacity-100 transition-opacity">
                  阅读更多 <ChevronRight size={16} />
                </div>
              </motion.div>
            </Link>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="bg-atmosphere min-h-screen selection:bg-black selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Notes />
        {/* <Projects /> */}
        <Contact />
      </main>
      
      <footer className="py-20 px-6 text-center border-t border-black/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm opacity-40 font-medium">
            © 2026 Jessie Huang. 版权所有。
          </p>
          <div className="flex items-center gap-6 text-sm font-medium opacity-70">
            <span className="cursor-pointer hover:opacity-100 transition-opacity" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>首页</span>
            <a href="#" className="hover:opacity-100 transition-opacity">领英</a>
            <a href="#" className="hover:opacity-100 transition-opacity">推特</a>
            <a href="#" className="hover:opacity-100 transition-opacity">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </Router>
  );
}
