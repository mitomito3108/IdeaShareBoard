export type TagType = "アイデア" | "質問" | "フィードバック" | "タスク" | "その他";

export type TagColor = "blue" | "orange" | "green" | "purple" | "red";

export type BackgroundType = 
  | "white" 
  | "#f0f9ff" 
  | "#f0fdf4" 
  | "#fffbeb" 
  | "#fff5f5" 
  | "#faf5ff" 
  | "pattern1" 
  | "pattern2";

export interface Idea {
  id: number;
  title: string;
  content: string;
  tag: TagType;
  background: BackgroundType;
  timestamp: number;
  updatedAt: number;
}

export interface FormData {
  title: string;
  content: string;
  tag: TagType;
  background: BackgroundType;
}
