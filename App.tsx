
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import WebsiteModal from './components/WebsiteModal';
import DocModal from './components/DocModal';
import { Website, WebsiteFormData, WebsiteCategory, SupportType, Attribute } from './types';
import { INITIAL_WEBSITES } from './constants';

const App: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>(INITIAL_WEBSITES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 筛选状态
  const [filterCategory, setFilterCategory] = useState<string>('全部');
  const [filterSupport, setFilterSupport] = useState<string>('全部');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const handleAddWebsite = () => {
    setEditingWebsite(null);
    setIsModalOpen(true);
  };

  const handleEditWebsite = (website: Website) => {
    setEditingWebsite(website);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (data: WebsiteFormData) => {
    const timestamp = new Date().toLocaleString('zh-CN', { 
      year: 'numeric', month: '2-digit', day: '2-digit', 
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false 
    }).replace(/\//g, '-');

    if (editingWebsite) {
      setWebsites(prev => prev.map(w => w.id === editingWebsite.id ? { ...w, ...data, updatedAt: timestamp } : w));
    } else {
      const newWebsite: Website = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        updatedAt: timestamp
      };
      setWebsites(prev => [newWebsite, ...prev]);
    }
    setIsModalOpen(false);
  };

  const filteredWebsites = useMemo(() => {
    return websites.filter(w => {
      const matchesSearch = 
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        w.url.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = filterCategory === '全部' || w.category === filterCategory;
      const matchesSupport = filterSupport === '全部' || w.supportType === filterSupport;

      return matchesSearch && matchesCategory && matchesSupport;
    });
  }, [websites, searchQuery, filterCategory, filterSupport]);

  return (
    <div className="flex h-screen bg-[#f0f2f5] overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="h-10 bg-white border-b border-gray-200 flex items-center px-4 shrink-0">
          <div className="flex items-center space-x-1 h-full">
            <div className="flex items-center px-3 h-[80%] bg-blue-50 text-blue-600 border-t-2 border-blue-600 text-xs font-medium cursor-pointer">
              <i className="fas fa-circle text-[6px] mr-2"></i>
              首页
              <i className="fas fa-times ml-2 opacity-50 hover:opacity-100"></i>
            </div>
            <div className="flex items-center px-3 h-[80%] text-gray-500 text-xs font-medium cursor-pointer hover:bg-gray-50">
              网站管理
              <i className="fas fa-times ml-2 opacity-30 hover:opacity-100"></i>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4 pr-4">
            <i className="fas fa-rotate-right text-gray-400 text-sm cursor-pointer hover:text-blue-500"></i>
            <i className="fas fa-expand text-gray-400 text-sm cursor-pointer hover:text-blue-500"></i>
          </div>
        </header>

        {/* Action Header */}
        <div className="bg-white px-8 py-4 border-b border-gray-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">网站资源管理</h2>
            
            <div className="relative group">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"></i>
              <input
                type="text"
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-80 outline-none"
                placeholder="模糊搜索网站名称、域名..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <i 
                  className="fas fa-times-circle absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 cursor-pointer"
                  onClick={() => setSearchQuery('')}
                ></i>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsDocOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-full text-[11px] font-bold hover:bg-amber-100 transition-colors shadow-sm"
            >
              <i className="fas fa-file-invoice"></i>
              <span>产品文档 (PRD)</span>
            </button>

            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg text-xs font-medium text-gray-500 border border-gray-100">
               <i className="fas fa-user-shield text-blue-500"></i>
               <span>林安逸 (Super Admin)</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
            
            <div className="p-4 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <button 
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all border ${
                      filterCategory !== '全部' || filterSupport !== '全部' 
                        ? 'bg-blue-50 border-blue-200 text-blue-600' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <i className="fas fa-filter text-xs"></i>
                    <span>高级筛选</span>
                    {(filterCategory !== '全部' || filterSupport !== '全部') && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    )}
                  </button>

                  {showFilterDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-20 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 uppercase mb-2">网站类型</label>
                          <div className="flex flex-wrap gap-2">
                            {['全部', ...Object.values(WebsiteCategory)].map(cat => (
                              <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                                  filterCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 uppercase mb-2">适配策略</label>
                          <div className="flex flex-wrap gap-2">
                            {['全部', ...Object.values(SupportType)].map(type => (
                              <button
                                key={type}
                                onClick={() => setFilterSupport(type)}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                                  filterSupport === type ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="pt-2 border-t border-gray-50 flex justify-end">
                          <button 
                            onClick={() => {
                              setFilterCategory('全部');
                              setFilterSupport('全部');
                              setShowFilterDropdown(false);
                            }}
                            className="text-[11px] text-gray-400 hover:text-blue-600 font-bold underline underline-offset-4"
                          >
                            重置所有筛选
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {(filterCategory !== '全部' || filterSupport !== '全部') && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300">|</span>
                    <div className="flex gap-2">
                      {filterCategory !== '全部' && (
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[11px] font-bold flex items-center">
                          类型: {filterCategory}
                          <i className="fas fa-times ml-1.5 cursor-pointer" onClick={() => setFilterCategory('全部')}></i>
                        </span>
                      )}
                      {filterSupport !== '全部' && (
                        <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-[11px] font-bold flex items-center">
                          适配: {filterSupport}
                          <i className="fas fa-times ml-1.5 cursor-pointer" onClick={() => setFilterSupport('全部')}></i>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleAddWebsite}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center"
                >
                  <i className="fas fa-plus mr-2"></i>
                  添加支持网站
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-[12px] uppercase tracking-wider font-bold border-b border-gray-100 sticky top-0 z-10">
                    <th className="px-6 py-4 text-center w-12"><i className="fas fa-flag"></i></th>
                    <th className="px-6 py-4">网站主体信息</th>
                    <th className="px-6 py-4">资源分类</th>
                    <th className="px-6 py-4">支持属性 (Attributes)</th>
                    <th className="px-6 py-4">核心适配类型</th>
                    <th className="px-6 py-4">最近更新</th>
                    <th className="px-6 py-4 text-right">管理操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredWebsites.length > 0 ? (
                    filteredWebsites.map((website) => (
                      <tr key={website.id} className="hover:bg-blue-50/10 transition-colors group">
                        <td className="px-6 py-4 text-center">
                           {website.attributes.length === 0 && (
                             <i className="fas fa-circle-exclamation text-red-500 animate-pulse"></i>
                           )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-500 transition-colors">
                              <i className="fas fa-globe"></i>
                            </div>
                            <div className="flex flex-col">
                              {/* 根据属性是否为空，名称标红显示 */}
                              <span className={`text-sm font-bold transition-colors ${
                                website.attributes.length === 0 ? 'text-red-600' : 'text-gray-800 group-hover:text-blue-600'
                              }`}>
                                {website.name}
                                {website.attributes.length === 0 && <span className="ml-2 text-[10px] bg-red-50 text-red-500 px-1 rounded">待补全</span>}
                              </span>
                              <span className="text-[11px] text-gray-400 font-mono tracking-tight">{website.url}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded text-[10px] font-bold inline-flex items-center ${
                            website.category === WebsiteCategory.LIVE 
                              ? 'bg-orange-100 text-orange-600' 
                              : 'bg-emerald-100 text-emerald-600'
                          }`}>
                            <i className={`fas ${website.category === WebsiteCategory.LIVE ? 'fa-broadcast-tower' : 'fa-film'} mr-1.5`}></i>
                            {website.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {website.attributes.length > 0 ? (
                              website.attributes.map(attr => (
                                <span key={attr} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] rounded border border-gray-100 font-medium">
                                  {attr}
                                </span>
                              ))
                            ) : (
                              <span className="text-[10px] text-gray-300 italic">尚未配置属性</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className={`w-2 h-2 rounded-full ${website.supportType === SupportType.SPECIAL ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                            <span className="text-xs text-gray-600 font-medium">{website.supportType}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[11px] text-gray-400 font-mono">{website.updatedAt}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleEditWebsite(website)}
                            className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-md font-bold text-xs transition-colors inline-flex items-center"
                          >
                            <i className="fas fa-cog mr-1.5"></i>
                            设置
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-20 text-center text-gray-400">
                        <i className="fas fa-folder-open text-4xl mb-4 block opacity-20"></i>
                        <span className="text-sm">没有找到匹配的网站数据</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-gray-50 flex items-center justify-between border-t border-gray-100 shrink-0">
              <p className="text-xs text-gray-500 font-medium">
                当前显示 {filteredWebsites.length} 条记录 (共 {websites.length} 条)
              </p>
              <div className="flex items-center space-x-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-400 hover:bg-gray-50">
                  <i className="fas fa-chevron-left text-[10px]"></i>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white text-xs font-bold">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 text-xs font-bold">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-400 hover:bg-gray-50">
                  <i className="fas fa-chevron-right text-[10px]"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WebsiteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingWebsite}
      />

      <DocModal 
        isOpen={isDocOpen} 
        onClose={() => setIsDocOpen(false)} 
      />
    </div>
  );
};

export default App;
