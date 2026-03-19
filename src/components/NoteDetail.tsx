import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { marked } from 'marked';
import DOMPurify from 'dompurify'; // 新增：用于防范 XSS 攻击

// ✅ 修复 1：将静态配置移到组件外部，避免每次渲染重新生成引用导致 useEffect 死循环
const notesConfig = [
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

const NoteDetail = () => {
    // 进入详情页自动滚动到顶部
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
  // 音乐播放控制
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handleMusicToggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 自动同步播放状态（防止手动暂停后按钮状态不同步）
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, []);
  const { id } = useParams();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // 根据路由参数查找对应的文章元数据
  const noteMeta = notesConfig.find(n => n.id === Number(id));

  // 根据笔记 id 选择音乐（必须在 noteMeta 定义后）
  let musicSrc = "/music.mp3";
  let musicName = "音乐";
  if (noteMeta?.id === 1) {
    musicSrc = "/Butterflies.aac";
    musicName = "Butterflies";
  }else if (noteMeta?.id === 2) {
    musicSrc = "/赛博朋克2077.aac";
    musicName = "赛博朋克2077";
  } else if (noteMeta?.id === 3) {
    musicSrc = "/雨爱.mp3";
    musicName = "雨爱";
  }

  useEffect(() => {
    const fetchContent = async () => {
      if (!noteMeta?.file) return;
      
      try {
        const response = await fetch(noteMeta.file);
        const text = await response.text();
        
        // ✅ 修复 2：使用最新 marked API（传参代替 setOptions）
        // 转换为 string 以确保类型安全
        let html = marked.parse(text, {
          gfm: true,
          breaks: true
        }) as string; 
        
        // ✅ 修复 3：添加 's' 修饰符，让点号(.)能够匹配包含换行符的多行文本
        html = html.replace(/<center>(.*?)<\/center>/gis, '<p class="text-center">$1</p>');
        
        // ✅ 修复 4：使用 DOMPurify 清洗 HTML，防范潜在的 XSS 攻击
        const cleanHtml = DOMPurify.sanitize(html);
        
        setContent(cleanHtml);
      } catch (error) {
        console.error('Error loading markdown:', error);
        setContent('<p class="text-center text-slate-500 py-10">文章加载失败，请稍后重试。</p>');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [noteMeta?.file]); // ✅ 依赖项改为基础类型数据（文件路径），确保只在路径变化时重新请求

  if (!noteMeta) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-atmosphere">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">文章未找到</h2>
          <Link to="/" className="text-purple-600 hover:text-purple-800 transition-colors hover:underline">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-atmosphere selection:bg-purple-200 selection:text-purple-900 py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        <button
          type="button"
          onClick={() => window.history.length > 1 ? window.history.back() : window.location.assign('/#notes')}
          className="inline-flex items-center gap-2 text-black/60 hover:text-black transition-colors group bg-transparent border-0 p-0 cursor-pointer"
        >
          <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md transition-all">
            <ArrowLeft size={20} />
          </div>
          <span className="font-medium">返回我的笔记</span>
        </button>
        
        <div className="space-y-6 text-center py-8">
          <div className="flex items-center justify-center gap-3 text-sm font-bold tracking-widest text-black/40 uppercase">
            <span>{noteMeta.date}</span>
            <span className="w-1 h-1 bg-black/20 rounded-full" />
            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full">{noteMeta.category}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight bg-gradient-to-br from-black to-black/60 bg-clip-text text-transparent">
            {noteMeta.title}
          </h1>
          {/* 音乐播放按钮，标题下方右对齐 */}
          <div className="flex flex-col items-end mt-2 pr-2 md:pr-8">
            <button
              onClick={handleMusicToggle}
              className={`flex items-center gap-2 px-2 py-1 rounded-full font-semibold shadow transition-all mb-1 text-xs md:text-sm border ${isPlaying ? 'bg-purple-100 text-purple-500 border-purple-100' : 'bg-white text-gray-500 border-gray-200'} opacity-80 saturate-50`}
              style={{minHeight:'28px'}}
            >
              本期音乐：<span className="font-semibold" style={{color: isPlaying ? '#a78bfa' : '#888'}}>{musicName}</span>
              <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
                {isPlaying ? (
                  <>
                    <rect x="4" y="4" width="4" height="12" rx="1" fill="currentColor" />
                    <rect x="12" y="4" width="4" height="12" rx="1" fill="currentColor" />
                  </>
                ) : (
                  <polygon points="4,3 18,10 4,17" fill="currentColor" />
                )}
              </svg>
            </button>
            <audio ref={audioRef} src={musicSrc} preload="auto" />
            <span className="text-[10px] text-gray-400 mt-0.5">（建议搭配食用）</span>
          </div>
        </div>

        <div className="glass p-8 md:p-16 rounded-[40px] shadow-xl shadow-purple-900/5 bg-white/80 backdrop-blur-sm">
           {loading ? (
             <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
           </div>
         ) : (
          <article 
            className="prose prose-slate max-w-none font-sans
              /* 整体字体调小 */
              prose-sm md:prose-base 
              /* 标题样式微调 */
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
              prose-h1:text-2xl prose-h1:mb-6 prose-h1:leading-tight
              prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h2:border-slate-200
              prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
              
              /* 段落紧凑 */
              prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-5
              prose-strong:font-bold prose-strong:text-slate-900
              
              /* 链接 */
              prose-a:text-purple-600 prose-a:font-medium prose-a:underline prose-a:underline-offset-2 
              hover:prose-a:text-purple-800 hover:prose-a:decoration-purple-800 prose-a:transition-colors
              
              /* 引用 */
              prose-blockquote:border-l-4 prose-blockquote:border-purple-400 prose-blockquote:bg-purple-50/50 
              prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:italic 
              prose-blockquote:text-slate-600 prose-blockquote:shadow-sm prose-blockquote:my-6 prose-blockquote:text-sm
              
              /* 列表 */
              prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-1 prose-ul:mb-5
              prose-ol:list-decimal prose-ol:pl-5 prose-ol:space-y-1 prose-ol:mb-5
              prose-li:text-slate-700 marker:text-slate-400
              
              /* 图片 */
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-img:mx-auto prose-img:border prose-img:border-slate-100
              
              /* 分割线 */
              prose-hr:my-10 prose-hr:border-slate-200
              
              /* 代码 */
              prose-code:text-purple-700 prose-code:bg-purple-50 prose-code:px-1 prose-code:py-0.5 
              prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-code:text-xs
              prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:rounded-xl prose-pre:shadow-lg 
              prose-pre:p-4 prose-pre:my-6 prose-pre:overflow-x-auto prose-pre:text-xs"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
         )}
        </div>
        
        <div className="text-center pt-12 pb-20">
          <p className="text-sm text-black/40 italic">感谢阅读，期待与你交流想法。</p>
        </div>
      </motion.div>
    </div>
  );
};

export default NoteDetail;