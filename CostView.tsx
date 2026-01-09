import React, { useState } from 'react';
import { GOOGLE_SCRIPT_URL, GOOGLE_SHEET_URL } from '../constants';
import { SheetIcon, PlusIcon, RefreshIcon, EditIcon, TrashIcon, XIcon } from '../components/Icons';
import { ExpenseRecord } from '../types';

interface CostViewProps {
  expenses: ExpenseRecord[];
  isLoading: boolean;
  fetchError: string | null;
  onRefresh: () => void;
  onAddSuccess: () => void;
}

export const CostView: React.FC<CostViewProps> = ({ expenses, isLoading, onRefresh, onAddSuccess }) => {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'INR' | 'TWD'>('INR');
  const [item, setItem] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('現金');
  const [note, setNote] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Main Totals
  const totalTWD = expenses.reduce((sum, r) => sum + r.amountTwd, 0);
  const totalINR = expenses.reduce((sum, r) => sum + r.amountInr, 0);

  // Breakdown Calculations
  const cashExpenses = expenses.filter(r => r.paymentMethod === '現金');
  const cardExpenses = expenses.filter(r => r.paymentMethod === '信用卡');

  const cashINR = cashExpenses.reduce((sum, r) => sum + r.amountInr, 0);
  const cashTWD = cashExpenses.reduce((sum, r) => sum + r.amountTwd, 0);
  
  const cardINR = cardExpenses.reduce((sum, r) => sum + r.amountInr, 0);
  const cardTWD = cardExpenses.reduce((sum, r) => sum + r.amountTwd, 0);

  const handleOpenAdd = () => {
    setMode('add'); setEditingRowIndex(null);
    const today = new Date();
    setDate(today.toISOString().split('T')[0]);
    setAmount(''); setItem(''); setNote(''); setCurrency('INR'); setPaymentMethod('現金');
    setShowModal(true);
  };

  const handleOpenEdit = (e: React.MouseEvent, record: ExpenseRecord) => {
    e.stopPropagation(); setMode('edit'); setEditingRowIndex(record.rowIndex);
    setDate(new Date(record.date).toISOString().split('T')[0]);
    setItem(record.item); setNote(record.note || ''); setPaymentMethod(record.paymentMethod || '現金');
    
    const isTWD = record.amountTwd > 0;
    setCurrency(isTWD ? 'TWD' : 'INR');
    const amt = isTWD ? record.amountTwd : record.amountInr;
    setAmount(String(amt));
    
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmId === null) return;
    setIsDeleting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'delete', rowIndex: deleteConfirmId }) });
      setDeleteConfirmId(null); onAddSuccess();
    } catch { console.error("刪除失敗"); } finally { setIsDeleting(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!amount || !item) return;
    setIsSubmitting(true);
    const total = Number(amount) || 0;

    const payload = {
      action: mode, 
      rowIndex: editingRowIndex, 
      date: date.replace(/-/g, '/'), 
      item: item.trim(), 
      // Send Payment Method to 'payer' field (Column C)
      payer: paymentMethod, 
      amountTwd: currency === 'TWD' ? total : 0, 
      amountInr: currency === 'INR' ? total : 0, 
      paymentType: '', 
      note: note.trim()
    };

    try { await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) }); setShowModal(false); onAddSuccess(); }
    catch { console.error("儲存失敗"); } finally { setIsSubmitting(false); }
  };

  const getBadgeColor = (method: string) => {
    if (method === '現金') return 'bg-emerald-600';
    if (method === '信用卡') return 'bg-blue-600';
    return 'bg-gray-500';
  };

  return (
    <div className="pb-32 pt-1 animate-in fade-in duration-700">
      <div className="bg-white border border-gray-200 rounded-none overflow-hidden mb-8 shadow-sm">
        <div className="px-5 py-3 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-xl font-noto font-bold text-mag-black">旅費總覽</h2>
          <div className="flex items-center gap-3">
            <a href={GOOGLE_SHEET_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-mag-gold flex items-center gap-1.5 p-1 transition-colors">
              <SheetIcon className="w-5 h-5" />
            </a>
            <button onClick={onRefresh} className="text-gray-400 p-1 hover:text-mag-black transition-colors">
              <RefreshIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-gray-100">
          <div className="p-3 text-center">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">INR</div>
            <div className="text-2xl font-bold font-mono">₹{totalINR.toLocaleString()}</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">TWD</div>
            <div className="text-2xl font-bold font-mono">${totalTWD.toLocaleString()}</div>
          </div>
        </div>

        {/* Breakdown Row */}
        <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100 bg-gray-50/80">
           <div className="p-2.5 text-center flex flex-col items-center justify-center">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">現金 CASH</div>
              <div className="text-xs font-bold font-mono text-emerald-600 leading-tight">
                {cashINR > 0 && <span>₹{cashINR.toLocaleString()}</span>}
                {cashINR > 0 && cashTWD > 0 && <span className="mx-1 text-gray-300">/</span>}
                {cashTWD > 0 && <span>${cashTWD.toLocaleString()}</span>}
                {cashINR === 0 && cashTWD === 0 && '-'}
              </div>
           </div>
           <div className="p-2.5 text-center flex flex-col items-center justify-center">
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">信用卡 CARD</div>
              <div className="text-xs font-bold font-mono text-blue-600 leading-tight">
                {cardINR > 0 && <span>₹{cardINR.toLocaleString()}</span>}
                {cardINR > 0 && cardTWD > 0 && <span className="mx-1 text-gray-300">/</span>}
                {cardTWD > 0 && <span>${cardTWD.toLocaleString()}</span>}
                {cardINR === 0 && cardTWD === 0 && '-'}
              </div>
           </div>
        </div>
      </div>

      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xl font-noto font-bold text-mag-black">支出明細</h3>
        <button onClick={handleOpenAdd} className="bg-mag-black text-white p-2 shadow-md flex items-center justify-center active:scale-95 transition-transform"><PlusIcon className="w-5 h-5" /></button>
      </div>

      <div className="space-y-3">
        {expenses.length === 0 && !isLoading ? (
          <div className="text-center py-10 text-gray-400 font-bold border border-dashed border-gray-200">目前尚無消費紀錄</div>
        ) : (
          expenses.map((record) => (
            <div key={record.rowIndex} className="bg-white p-4 border border-gray-100 flex items-center gap-2 overflow-hidden shadow-soft active:bg-gray-50 cursor-pointer" onClick={(e) => handleOpenEdit(e, record)}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`shrink-0 px-2 py-0.5 text-[9px] font-bold text-white ${getBadgeColor(record.paymentMethod)}`}>{record.paymentMethod}</span>
                  <span className="text-base font-bold text-mag-black truncate">{record.item}</span>
                </div>
                <div className="text-[10px] font-mono font-bold text-gray-400">{record.date.split('T')[0].replace(/-/g, '/')}</div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                 <div className="text-lg font-bold font-mono">{record.amountInr > 0 ? `₹${record.amountInr.toLocaleString()}` : `$${record.amountTwd.toLocaleString()}`}</div>
                 <div className="flex gap-1 shrink-0">
                   <button onClick={(e) => handleOpenEdit(e, record)} className="p-1.5 text-gray-300 hover:text-mag-gold transition-colors"><EditIcon className="w-4 h-4" /></button>
                   <button onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(record.rowIndex); }} className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"><TrashIcon className="w-4 h-4" /></button>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="bg-white w-full max-w-sm p-5 z-10 border-t-4 border-mag-black shadow-2xl animate-in zoom-in-95 max-h-[92vh] overflow-y-auto">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-bold">{mode === 'edit' ? '編輯消費' : '新增消費'}</h3>
               <button onClick={() => setShowModal(false)} className="text-mag-gray p-1"><XIcon className="w-5 h-5" /></button>
             </div>
             <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-full">
                    <label className="text-[9px] font-black text-mag-gray block mb-1 uppercase tracking-wider">日期 DATE</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-[#F7F7F7] p-2 font-bold text-sm outline-none border border-transparent focus:border-mag-gold h-[42px]" />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black text-mag-gray block mb-1 uppercase tracking-wider">內容 ITEM</label>
                  <input type="text" placeholder="消費明細..." value={item} onChange={e => setItem(e.target.value)} className="w-full bg-[#F7F7F7] p-2.5 font-bold text-sm outline-none border border-transparent focus:border-mag-gold h-[42px]" />
                </div>

                <div>
                  <label className="text-[9px] font-black text-mag-gray block mb-1 uppercase tracking-wider">金額 AMOUNT</label>
                  <div className="relative flex bg-[#F7F7F7] items-center px-3 h-[42px] border border-transparent focus-within:border-mag-gold overflow-hidden">
                      <input 
                        type="number" 
                        placeholder="0" 
                        value={amount} 
                        onChange={e => setAmount(e.target.value)} 
                        className="flex-1 bg-transparent font-bold text-xl outline-none min-w-0" 
                      />
                      <div className="flex bg-white shadow-sm border border-gray-200 h-[28px] shrink-0 ml-2 overflow-hidden">
                          <button type="button" onClick={() => setCurrency('INR')} className={`px-2.5 font-bold text-[9px] transition-colors border-r border-gray-100 ${currency === 'INR' ? 'bg-mag-black text-white' : 'text-gray-400 hover:bg-gray-50'}`}>INR</button>
                          <button type="button" onClick={() => setCurrency('TWD')} className={`px-2.5 font-bold text-[9px] transition-colors ${currency === 'TWD' ? 'bg-mag-black text-white' : 'text-gray-400 hover:bg-gray-50'}`}>TWD</button>
                      </div>
                  </div>
                </div>

                <div>
                   <label className="text-[9px] font-black text-mag-gray block mb-1 uppercase tracking-wider">付款方式 PAYMENT METHOD</label>
                   <div className="flex gap-2">
                      <button type="button" onClick={() => setPaymentMethod('現金')} className={`flex-1 py-2 font-bold text-xs border ${paymentMethod === '現金' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200'}`}>現金</button>
                      <button type="button" onClick={() => setPaymentMethod('信用卡')} className={`flex-1 py-2 font-bold text-xs border ${paymentMethod === '信用卡' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200'}`}>信用卡</button>
                   </div>
                </div>

                <div>
                  <label className="text-[9px] font-black text-mag-gray block mb-1 uppercase tracking-wider">備註 NOTE</label>
                  <input type="text" placeholder="選填項目..." value={note} onChange={e => setNote(e.target.value)} className="w-full bg-[#F7F7F7] p-2 font-bold text-sm outline-none border border-transparent focus:border-mag-gold h-[42px]" />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-mag-black text-white font-bold text-xs tracking-[0.2em] shadow-lg active:scale-[0.98] active:bg-mag-gold transition-all disabled:opacity-50 mt-2">
                  {isSubmitting ? '正在儲存...' : '儲存紀錄 SAVE'}
                </button>
             </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteConfirmId(null)} />
           <div className="bg-white p-8 z-10 w-full max-w-xs text-center border-t-8 border-red-500 shadow-2xl animate-in zoom-in-95">
              <h3 className="text-xl font-bold mb-8">確定要刪除？</h3>
              <div className="flex gap-3">
                 <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-4 bg-gray-100 font-bold text-gray-500">取消</button>
                 <button onClick={handleConfirmDelete} className="flex-1 py-4 bg-red-500 text-white font-bold active:bg-red-600 transition-colors">{isDeleting ? '...' : '確認刪除'}</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};