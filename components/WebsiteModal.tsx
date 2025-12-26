
import React, { useState, useEffect } from 'react';
import { Website, WebsiteFormData, WebsiteCategory, Attribute, SupportType } from '../types';

interface WebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: WebsiteFormData) => void;
  initialData?: Website | null;
}

const WebsiteModal: React.FC<WebsiteModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<WebsiteFormData>({
    name: '',
    url: '',
    category: WebsiteCategory.VIDEO,
    attributes: [],
    supportType: SupportType.GENERAL,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        url: initialData.url,
        category: initialData.category,
        attributes: initialData.attributes,
        supportType: initialData.supportType,
      });
    } else {
      setFormData({
        name: '',
        url: '',
        category: WebsiteCategory.VIDEO,
        attributes: [],
        supportType: SupportType.GENERAL,
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAttributeToggle = (attr: Attribute) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes.includes(attr)
        ? prev.attributes.filter(a => a !== attr)
        : [...prev.attributes, attr]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {initialData ? '编辑网站信息' : '添加支持网站'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">网站名称</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="例如: pornobande"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">网站链接 (URL)</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={formData.url}
                onChange={e => setFormData({ ...formData, url: e.target.value })}
                placeholder="例如: pornobande.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">网站类型</label>
            <div className="flex space-x-4">
              {Object.values(WebsiteCategory).map(cat => (
                <label key={cat} className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="radio"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    checked={formData.category === cat}
                    onChange={() => setFormData({ ...formData, category: cat })}
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">支持类型</label>
            <div className="flex space-x-4">
              {Object.values(SupportType).map(type => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="radio"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    checked={formData.supportType === type}
                    onChange={() => setFormData({ ...formData, supportType: type })}
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">支持属性 (可多选)</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.values(Attribute).map(attr => (
                <button
                  key={attr}
                  type="button"
                  onClick={() => handleAttributeToggle(attr)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center space-x-2 border ${
                    formData.attributes.includes(attr)
                      ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                      : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {formData.attributes.includes(attr) && <i className="fas fa-check-circle"></i>}
                  <span>{attr}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 pt-4 border-t border-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
            >
              确定
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WebsiteModal;
