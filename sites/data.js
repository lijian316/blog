const SITES_DATA = [
  {
    id: 1,
    name: "网页视频录制工具",
    url: "https://lijian316.github.io/record/",
    description: "简单易用的网页视频录制解决方案，支持屏幕、摄像头录制",
    category: "tool",
    icon: "🎬",
    featured: false,
    tags: ["视频", "录制", "屏幕"]
  },
  {
    id: 2,
    name: "PairDrop",
    url: "https://pairdrop.net/",
    description: "跨设备文件传输工具，无需注册即可使用",
    category: "tool",
    icon: "📡",
    featured: false,
    tags: ["文件传输", "跨设备"]
  },
  {
    id: 3,
    name: "阿里巴巴矢量图标库",
    url: "https://www.iconfont.cn/",
    description: "官方矢量图标库，提供丰富的图标资源，支持在线编辑和下载",
    category: "design",
    icon: "✏️",
    featured: false,
    tags: ["图标", "矢量", "设计"]
  },
  {
    id: 4,
    name: "Linux.do 社区",
    url: "https://linux.do/",
    description: "Linux / 开源 / 极客社区，技术交流与资源分享",
    category: "other",
    icon: "🐧",
    featured: false,
    tags: ["社区", "Linux", "开源"]
  },
  {
    id: 5,
    name: "SharedChat",
    url: "https://sharedchat.fun/",
    description: "免费 AI 对话平台，支持多模型和插件扩展",
    category: "ai",
    icon: "🤖",
    featured: false,
    tags: ["AI", "对话", "免费"]
  },
  {
    id: 6,
    name: "Flaticon",
    url: "https://www.flaticon.com/",
    description: "全球最大的图标资源网站，提供数百万个高质量矢量图标",
    category: "design",
    icon: "🎨",
    featured: false,
    tags: ["图标", "矢量", "设计"]
  }
];

const CATEGORIES = {
  all:      { label: "全部",   icon: "🌐" },
  tool:     { label: "工具",   icon: "🔧" },
  ai:       { label: "AI",    icon: "🤖" },
  design:   { label: "设计",   icon: "🎨" },
  dev:      { label: "开发",   icon: "⚡" },
  blog:     { label: "博客",   icon: "📝" },
  resource: { label: "资源",   icon: "📦" },
  other:    { label: "其他",   icon: "🗂️" }
};
