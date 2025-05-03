import { TagColor, TagType, BackgroundType } from "./types";

export const TAGS: { label: TagType; color: TagColor }[] = [
  { label: "アイデア", color: "blue" },
  { label: "質問", color: "orange" },
  { label: "フィードバック", color: "green" },
  { label: "タスク", color: "purple" },
  { label: "その他", color: "red" },
];

export const BACKGROUNDS: { value: BackgroundType; label: string }[] = [
  { value: "white", label: "白" },
  { value: "#f0f9ff", label: "青" },
  { value: "#f0fdf4", label: "緑" },
  { value: "#fffbeb", label: "黄" },
  { value: "#fff5f5", label: "赤" },
  { value: "#faf5ff", label: "紫" },
  { value: "pattern1", label: "パターン1" },
  { value: "pattern2", label: "パターン2" },
];

export const PATTERN_URLS = {
  pattern1: "https://images.unsplash.com/photo-1546074177-ffdda98d214f?auto=format&fit=crop&w=500&h=300",
  pattern2: "https://images.unsplash.com/photo-1643208589808-0cf368ae0507?auto=format&fit=crop&w=500&h=300",
};

export const getTagColor = (tag: TagType): TagColor => {
  const foundTag = TAGS.find((t) => t.label === tag);
  return foundTag ? foundTag.color : "blue";
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}年${month}月${day}日 ${hours}:${minutes}`;
};

export const DEFAULT_IDEA_FORM_DATA: Omit<FormData, "title" | "content" | "tag"> = {
  background: "white",
};
