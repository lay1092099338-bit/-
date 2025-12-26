
import React from 'react';

interface DocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DocModal: React.FC<DocModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-end bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="bg-white w-full max-w-3xl h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-800">产品设计与开发文档 (PRD)</h2>
            <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide">VERSION 1.2 · FOR DEVELOPERS ONLY</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors">
            <i className="fas fa-times text-gray-500"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 leading-relaxed text-gray-700">
          {/* 核心业务概述 */}
          <section>
            <h3 className="text-lg font-bold text-blue-600 mb-4 flex items-center">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
              1. 核心业务概述
            </h3>
            <p className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-sm">
              本模块主要负责管理 <strong>Vibemate Ai Sync</strong> 功能所支持的第三方内容平台列表。通过维护该列表，前端应用可根据域名自动识别并加载对应的同步策略。
            </p>
          </section>

          {/* 数据结构定义 */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-database mr-3 text-gray-400"></i>
              2. 数据模型 (Data Structure)
            </h3>
            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-100 font-bold">
                  <tr>
                    <th className="px-4 py-3">字段名</th>
                    <th className="px-4 py-3">类型</th>
                    <th className="px-4 py-3">说明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr><td className="px-4 py-3 font-mono text-blue-600">id</td><td className="px-4 py-3">String</td><td className="px-4 py-3 text-gray-500">唯一标识符 (Client-side Generated)</td></tr>
                  <tr><td className="px-4 py-3 font-mono text-blue-600">name</td><td className="px-4 py-3">String</td><td className="px-4 py-3 text-gray-500">网站显示名称，用于搜索和列表展示</td></tr>
                  <tr><td className="px-4 py-3 font-mono text-blue-600">url</td><td className="px-4 py-3">String</td><td className="px-4 py-3 text-gray-500">主域名，唯一约束</td></tr>
                  <tr><td className="px-4 py-3 font-mono text-blue-600">category</td><td className="px-4 py-3">Enum</td><td className="px-4 py-3 text-gray-500">分类：直播网站 / 视频网站</td></tr>
                  <tr><td className="px-4 py-3 font-mono text-blue-600">attributes</td><td className="px-4 py-3">Array</td><td className="px-4 py-3 text-gray-500">支持属性：ai sync, 收藏, 多屏</td></tr>
                  <tr><td className="px-4 py-3 font-mono text-blue-600">supportType</td><td className="px-4 py-3">Enum</td><td className="px-4 py-3 text-gray-500">适配深度：通用适配 / 特殊适配</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 核心业务逻辑 */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-microchip mr-3 text-gray-400"></i>
              3. 业务逻辑与算法 (Logic & Algorithms)
            </h3>
            <ul className="space-y-4 text-sm list-none pl-0">
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5"><i className="fas fa-check text-[10px]"></i></div>
                <div>
                  <span className="font-bold block">模糊搜索逻辑：</span>
                  <span>采用 <code>toLowerCase().includes()</code> 策略。搜索范围覆盖 <strong>网站名称</strong> 和 <strong>网站链接</strong>，两个字段任一匹配即返回。</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5"><i className="fas fa-check text-[10px]"></i></div>
                <div>
                  <span className="font-bold block">高级筛选逻辑：</span>
                  <span>搜索框与筛选按钮为 <strong>"且 (AND)"</strong> 关系。分类与适配类型之间也为 "且" 关系。筛选器默认值为 "全部"，此时忽略对应维度的过滤。</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5"><i className="fas fa-check text-[10px]"></i></div>
                <div>
                  <span className="font-bold block">更新机制：</span>
                  <span>每次保存（新增或编辑）时，必须自动刷新 <code>updatedAt</code> 字段。格式固定为：<code>YYYY-MM-DD HH:mm:ss</code>。</span>
                </div>
              </li>
            </ul>
          </section>

          {/* UI/UX 规范 */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-paint-brush mr-3 text-gray-400"></i>
              4. UI/UX 开发规范
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 border border-gray-100 rounded-lg">
                <span className="text-gray-400 block mb-1">主色调</span>
                <span className="font-mono font-bold">#2563eb (Blue-600)</span>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <span className="text-gray-400 block mb-1">字体栈</span>
                <span className="font-bold">Inter / PingFang SC</span>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <span className="text-gray-400 block mb-1">圆角标准</span>
                <span className="font-bold">8px / 12px (Regular / Modal)</span>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <span className="text-gray-400 block mb-1">交互反馈</span>
                <span className="font-bold">Hover Transition 200ms</span>
              </div>
            </div>
          </section>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
          <button onClick={onClose} className="px-8 py-2 bg-gray-800 text-white rounded-lg font-bold hover:bg-black transition-colors">
            已阅
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocModal;
