
import React from 'react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: 'fa-house', label: '首页' },
    { icon: 'fa-puzzle-piece', label: 'Cam Extension', hasSub: true },
    { icon: 'fa-layer-group', label: 'Stream Master App', hasSub: true },
    { icon: 'fa-headphones', label: 'Kinky Night Event', hasSub: true },
    { 
      icon: 'fa-star', 
      label: 'Fanberry', 
      hasSub: true, 
      subItems: [
        'Advertisement 广告', 'Rising Star', 'Video', 'PC', 'Fanberry 动态 emoji', 'Prize Config 奖励配置'
      ] 
    },
    { icon: 'fa-vial', label: '试验性功能' },
    { icon: 'fa-wand-magic-sparkles', label: 'Big model promt' },
    { icon: 'fa-circle-info', label: 'Model Info' },
    { icon: 'fa-code-branch', label: 'Version Management' },
    { icon: 'fa-route', label: '渠道归因配置' },
    { icon: 'fa-bell', label: 'APP消息通知' },
    { icon: 'fa-desktop', label: '屏幕列表' },
    { icon: 'fa-globe', label: '网站管理', active: true }, // 用户圈出来的重点位置
  ];

  return (
    <aside className="w-64 bg-[#001529] text-gray-400 min-h-screen flex flex-col transition-all duration-300 overflow-y-auto border-r border-gray-800">
      <div className="p-4 flex items-center space-x-3 bg-[#001529] mb-2 sticky top-0 z-10">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-lg shadow-blue-500/20">
          <i className="fas fa-bolt text-white text-xs"></i>
        </div>
        <span className="text-white font-bold text-base tracking-tight">Cam Admin</span>
      </div>
      
      <nav className="flex-1 px-2 space-y-0.5 mb-8">
        {menuItems.map((item, idx) => (
          <div key={idx} className="group">
            <div
              className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-all rounded-md ${
                item.active 
                  ? 'text-white bg-blue-600' 
                  : 'hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-3">
                <i className={`fas ${item.icon} w-4 text-center text-[14px]`}></i>
                <span className="text-[13px] font-medium whitespace-nowrap">{item.label}</span>
              </div>
              {item.hasSub && (
                <i className="fas fa-chevron-down text-[10px] opacity-50 group-hover:opacity-100 transition-opacity"></i>
              )}
            </div>
            {item.subItems && (
              <div className="ml-9 mt-1 space-y-1">
                {item.subItems.map((sub, sIdx) => (
                  <div key={sIdx} className="text-[12px] py-2 px-3 text-gray-500 hover:text-white cursor-pointer rounded-md transition-colors">
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
