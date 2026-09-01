import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Search,
  Filter,
  ExternalLink,
  ShieldAlert,
  Calendar,
  MapPin,
  Building2,
  Tag,
  CheckCircle2,
  AlertOctagon
} from 'lucide-react';
import { apiService } from '../services/api';

export const Alerts = () => {
  const [recalls, setRecalls] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [recallsRes, alertsRes] = await Promise.all([
          apiService.getRecalls(),
          apiService.getAlerts()
        ]);
        setRecalls(recallsRes.data || []);
        setAlerts(alertsRes.data || []);
      } catch (err) {
        console.error("Error fetching alerts:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredRecalls = recalls.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === 'all' || item.severity.toLowerCase() === severityFilter.toLowerCase();
    const matchesCategory = categoryFilter === 'all' || item.category.toLowerCase().includes(categoryFilter.toLowerCase());

    return matchesSearch && matchesSeverity && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Official Food Recall Radar & Alerts</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Food Safety Alerts & Recalls
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Public safety advisories, manufacturer recalls, and regulatory warning notices with verified official sources.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 card-shadow space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by product name, manufacturer, or recall reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Severity Filter */}
          <div className="md:col-span-3">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-600 text-slate-800"
            >
              <option value="all">All Severities</option>
              <option value="urgent">🔴 Urgent</option>
              <option value="warning">🟡 Warning</option>
              <option value="info">🟢 Informational</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-600 text-slate-800"
            >
              <option value="all">All Food Categories</option>
              <option value="spices">Spices</option>
              <option value="beverages">Beverages</option>
              <option value="packaged snacks">Packaged Snacks</option>
              <option value="dairy">Dairy</option>
            </select>
          </div>

        </div>

      </div>

      {/* GENERAL SAFETY ADVISORY CARDS */}
      {alerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <span>Active Public Advisories</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alt) => (
              <div key={alt.id} className="p-5 bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-2xl border border-amber-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-200 text-amber-900">
                    {alt.category}
                  </span>
                  <span className="text-xs text-amber-900/80 font-mono">{alt.publishedDate}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{alt.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed">{alt.summary}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-amber-200/60">
                  <span>Source: <strong>{alt.advisorySource}</strong></span>
                  <span>Regions: <strong>{alt.affectedRegions}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECALL NOTICES GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-600" />
            <span>Product Recall Catalog</span>
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            Showing {filteredRecalls.length} recorded recalls
          </span>
        </div>

        {filteredRecalls.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-xs text-slate-500 border">
            No food recalls matched your current filter criteria.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecalls.map((recall) => (
              <div
                key={recall.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        recall.severity === 'Urgent'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : recall.severity === 'Warning'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {recall.severity === 'Urgent' && '🔴 Urgent Recall'}
                        {recall.severity === 'Warning' && '🟡 Warning Notice'}
                        {recall.severity === 'Info' && '🟢 Informational'}
                      </span>
                      <span className="text-xs font-mono text-slate-500">Batch: {recall.batchNumber}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{recall.productName}</h3>
                  </div>

                  <div className="text-xs text-slate-500 sm:text-right">
                    <div className="font-semibold text-slate-800">{recall.manufacturer}</div>
                    <div className="text-[11px]">Recalled: {recall.recalledDate}</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="text-slate-700 font-medium">
                    <strong>Reason for Action:</strong> {recall.reason}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border">
                    <div>Affected Region: <strong className="text-slate-800">{recall.region}</strong></div>
                    <div>Category: <strong className="text-slate-800">{recall.category}</strong></div>
                  </div>
                </div>

                {/* Source attribution link */}
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Verified Source: <strong>{recall.source}</strong></span>
                  <a
                    href={recall.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-800 hover:text-emerald-900 font-bold inline-flex items-center gap-1"
                  >
                    <span>View Reference Notice</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
