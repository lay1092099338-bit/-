
export enum WebsiteCategory {
  LIVE = '直播网站',
  VIDEO = '视频网站'
}

export enum Attribute {
  AI_SYNC = 'ai sync',
  FAVORITE = '收藏',
  MULTI_SCREEN = '多屏'
}

export enum SupportType {
  SPECIAL = '特殊适配',
  GENERAL = '通用适配'
}

export interface Website {
  id: string;
  name: string;
  url: string;
  category: WebsiteCategory;
  attributes: Attribute[];
  supportType: SupportType;
  updatedAt: string;
}

export type WebsiteFormData = Omit<Website, 'id' | 'updatedAt'>;
