// 图库数据
// 把你的图片放在 gallery/images/ 目录下，然后在这里添加数据
// 或者使用外链图片 URL（如 Unsplash、自建图床等）
const PHOTOS_DATA = [
  {
    id: 1,
    title: "城市夜景",
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=70",
    date: "2025-03-01",
    location: "上海",
    tags: ["城市", "夜景", "建筑"],
    width: 800,
    height: 533
  },
  {
    id: 2,
    title: "山间云海",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70",
    date: "2025-02-15",
    location: "黄山",
    tags: ["自然", "山川", "云"],
    width: 800,
    height: 533
  },
  {
    id: 3,
    title: "街角咖啡馆",
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=70",
    date: "2025-02-20",
    location: "北京",
    tags: ["生活", "咖啡", "街拍"],
    width: 800,
    height: 600
  },
  {
    id: 4,
    title: "秋日落叶",
    src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=70",
    date: "2024-11-10",
    location: "北京香山",
    tags: ["自然", "秋天", "枫叶"],
    width: 800,
    height: 533
  },
  {
    id: 5,
    title: "海边日落",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70",
    date: "2024-10-05",
    location: "三亚",
    tags: ["海边", "日落", "旅行"],
    width: 800,
    height: 533
  },
  {
    id: 6,
    title: "古镇水巷",
    src: "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=400&q=70",
    date: "2024-09-18",
    location: "乌镇",
    tags: ["古镇", "江南", "水乡"],
    width: 800,
    height: 533
  },
  {
    id: 7,
    title: "都市清晨",
    src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&q=70",
    date: "2025-01-08",
    location: "上海",
    tags: ["城市", "清晨", "建筑"],
    width: 800,
    height: 533
  },
  {
    id: 8,
    title: "雨后街道",
    src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=70",
    date: "2025-01-20",
    location: "成都",
    tags: ["街拍", "雨天", "生活"],
    width: 800,
    height: 533
  }
];

// 标签列表（自动从数据中提取）
const PHOTO_TAGS = ['全部', ...new Set(PHOTOS_DATA.flatMap(p => p.tags))];
