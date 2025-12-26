
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
            <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide">VERSION 1.3 · FOR DEVELOPERS ONLY</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors">
            <i className="fas fa-times text-gray-500"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 leading-relaxed text-gray-700">
          {/* 1. 核心业务概述 */}
          <section>
            <h3 className="text-lg font-bold text-blue-600 mb-4 flex items-center">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
              1. 核心业务概述
            </h3>
            <p className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-sm">
              本模块主要负责管理 <strong>Vibemate Ai Sync</strong> 功能所支持的第三方内容平台列表。通过维护该列表，前端应用可根据域名自动识别并加载对应的同步策略。
            </p>
          </section>

          {/* 2. 数据模型 */}
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
                  <tr><td className="px-4 py-3 font-mono text-blue-600">id</td><td className="px-4 py-3">String</td><td className="px-4 py-3 text-gray-500">唯一标识符</td></tr>
                  <tr><td className="px-4 py-3 font-mono text-blue-600">name</td><td className="px-4 py-3">String</td><td className="px-4 py-3 text-gray-500">网站显示名称</td></tr>
                  <tr><td className="px-4 py-3 font-mono text-blue-600">url</td><td className="px-4 py-3">String</td><td className="px-4 py-3 text-gray-500">主域名，唯一约束</td></tr>
                  <tr><td className="px-4 py-3 font-mono text-blue-600">category</td><td className="px-4 py-3">Enum</td><td className="px-4 py-3 text-gray-500">分类：直播 / 视频</td></tr>
                  <tr><td className="px-4 py-3 font-mono text-blue-600">attributes</td><td className="px-4 py-3">Array</td><td className="px-4 py-3 text-gray-500">支持属性 (ai sync, 收藏等)</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. 核心交互逻辑 */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-edit mr-3 text-gray-400"></i>
              3. 添加/编辑交互逻辑
            </h3>
            <div className="space-y-4 text-sm bg-gray-50 p-5 rounded-xl border border-gray-100">
              <div className="flex items-start">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold mr-3 shrink-0">ADD</span>
                <p>点击“添加支持网站”打开模态框，初始表单为空。网站名称和链接为必填项。提交后，前端需自动为 <code>id</code> 分配随机 UUID，并生成 <code>updatedAt</code>。</p>
              </div>
              <div className="flex items-start">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold mr-3 shrink-0">EDIT</span>
                <p>点击列表末尾的“设置”进入编辑模式，表单回填当前记录的所有数据。支持修改所有字段（除 ID 外），保存时更新 <code>updatedAt</code> 为当前客户端时间。</p>
              </div>
            </div>
          </section>

          {/* 4. 运维与状态异常处理 */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-triangle-exclamation mr-3 text-orange-400"></i>
              4. 运维与状态异常处理 (重要)
            </h3>
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                <p className="font-bold text-orange-800 mb-2">数据初始化规则：</p>
                <p>第一版数据导入后，<strong>支持属性 (Attributes)</strong> 必须由开发团队根据技术规范预先定义并注入。运营人员在后台可根据实际情况进行二次修改。</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <p className="font-bold text-red-800 mb-2">异常状态视觉逻辑：</p>
                <p>如果未来在库中直接新增了网站（如通过 API 脚本或后台同步），而未配置属性：</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>网站名称：</strong> 必须标红显示 (Text Color: #dc2626)，作为告警提示。</li>
                  <li><strong>支持属性：</strong> 保持为空，以便运营人员通过视觉差异快速定位。</li>
                  <li><strong>运营操作：</strong> 此时需运营人员手动点击“设置”进行字段补充完善。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. 模糊搜索与筛选算法 */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-search mr-3 text-gray-400"></i>
              5. 检索逻辑算法
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>模糊搜索：</strong> 关键词对 <code>name</code> 和 <code>url</code> 进行 <code>String.prototype.includes()</code> 匹配。</li>
              <li>• <strong>多重筛选：</strong> 搜索关键词、分类、适配策略三个维度取“交集”结果。</li>
            </ul>
          </section>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
          <button onClick={onClose} className="px-8 py-2 bg-gray-800 text-white rounded-lg font-bold hover:bg-black transition-colors">
            确认并已阅
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocModal;
