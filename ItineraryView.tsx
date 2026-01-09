import React, { useState, useEffect } from 'react';
import { ItineraryEvent, DaySchedule } from '../types';
import { BedIcon, MapIcon, ChevronRightIcon, PlusIcon, EditIcon, TrashIcon, XIcon } from '../components/Icons';

interface ItineraryViewProps {
  itineraryData: DaySchedule[];
  setItineraryData: (data: DaySchedule[]) => void;
  onNavigateToDetail: (id: string) => void;
  selectedDateIdx: number;
}

const TimelineEvent: React.FC<{ 
  event: ItineraryEvent; 
  isLast: boolean; 
  onLocationClick: (id: string) => void;
  onEdit: (event: ItineraryEvent) => void;
  onDelete: (event: ItineraryEvent) => void;
}> = ({ event, isLast, onLocationClick, onEdit, onDelete }) => {
  return (
    <div className="flex relative group">
      <div className="w-14 pt-1 flex-shrink-0 text-right pr-4">
        <span className="text-sm font-bold text-mag-black font-mono">{event.time}</span>
      </div>
      <div className="flex flex-col items-center mr-4 relative">
        <div className={`w-3 h-3 rounded-full border-2 z-10 bg-mag-paper ${event.isHighlight ? 'border-mag-red' : 'border-gray-300'}`}></div>
        {!isLast && <div className="w-[1.5px] bg-gray-200 flex-grow my-1"></div>}
      </div>
      <div className="flex-1 pb-6 min-w-0">
        <div 
          onClick={() => event.locationId && onLocationClick(event.locationId)}
          className={`relative p-5 rounded-none transition-all group-hover:border-mag-gray/30 ${
            event.isHighlight 
              ? 'bg-mag-gold-light border border-mag-gold/20' 
              : 'bg-white border-gray-100 shadow-soft'
          } ${event.locationId ? 'cursor-pointer active:bg-gray-50' : ''}`}
        >
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <p className={`text-base leading-snug ${event.isHighlight ? 'text-mag-black font-black' : 'text-mag-black font-bold'}`}>
                {event.description}
              </p>
              {event.note && <p className="text-sm text-mag-gray mt-1.5 font-medium">{event.note}</p>}
            </div>
            <div className="flex flex-col items-end gap-2">
              {event.locationId && (
                <div className="text-mag-gold">
                  <ChevronRightIcon className="w-5 h-5" />
                </div>
              )}
              {/* Edit Controls */}
              <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => onEdit(event)} className="text-gray-300 hover:text-mag-gold p-1">
                  <EditIcon className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(event)} className="text-gray-300 hover:text-red-500 p-1">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ItineraryView: React.FC<ItineraryViewProps> = ({ itineraryData, setItineraryData, onNavigateToDetail, selectedDateIdx }) => {
  const currentDay = itineraryData[selectedDateIdx];
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editEventId, setEditEventId] = useState<string | null>(null);
  
  // Form State
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');
  const [isHighlight, setIsHighlight] = useState(false);

  // Delete Confirmation
  const [deleteConfirmEvent, setDeleteConfirmEvent] = useState<ItineraryEvent | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenAdd = () => {
    setModalMode('add');
    setEditEventId(null);
    // Auto set time to current time or last event time + 1 hour, or default 09:00
    const lastEvent = currentDay.events[currentDay.events.length - 1];
    setTime(lastEvent ? lastEvent.time : '09:00');
    setDescription('');
    setNote('');
    setIsHighlight(false);
    setShowModal(true);
  };

  const handleOpenEdit = (event: ItineraryEvent) => {
    setModalMode('edit');
    setEditEventId(event.id || null); // Use ID or we might have issues if no ID exists, but we'll handle index fallback
    setTime(event.time);
    setDescription(event.description);
    setNote(event.note || '');
    setIsHighlight(!!event.isHighlight);
    
    // If no ID (legacy data), we use temporary index logic in submit, 
    // but ideally we should migrate data to have IDs.
    // For this implementation, we will compare object references if ID is missing in the submit handler?
    // Better: let's rely on finding the event in the current array.
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!description || !time) return;

    const newEvent: ItineraryEvent = {
      id: modalMode === 'edit' && editEventId ? editEventId : `evt_${Date.now()}`,
      time,
      description,
      note: note.trim() || undefined,
      isHighlight,
      locationId: modalMode === 'edit' ? currentDay.events.find(e => e.id === editEventId || (editEventId === null && e.time === time && e.description === description))?.locationId : undefined
    };

    const newItinerary = [...itineraryData];
    const dayEvents = [...newItinerary[selectedDateIdx].events];

    if (modalMode === 'add') {
      dayEvents.push(newEvent);
    } else {
      // Find index to replace
      const idx = dayEvents.findIndex(e => e.id === editEventId || (editEventId === null && e.description === description && e.time === time)); // Fallback match
      if (idx !== -1) {
        // Preserve locationId if it existed
        newEvent.locationId = dayEvents[idx].locationId;
        dayEvents[idx] = newEvent;
      }
    }

    // Sort by time
    dayEvents.sort((a, b) => a.time.localeCompare(b.time));

    newItinerary[selectedDateIdx] = {
      ...newItinerary[selectedDateIdx],
      events: dayEvents
    };

    setItineraryData(newItinerary);
    setShowModal(false);
  };

  const handleDelete = () => {
    if (!deleteConfirmEvent) return;
    
    const newItinerary = [...itineraryData];
    const dayEvents = newItinerary[selectedDateIdx].events.filter(e => e !== deleteConfirmEvent);
    
    newItinerary[selectedDateIdx] = {
      ...newItinerary[selectedDateIdx],
      events: dayEvents
    };

    setItineraryData(newItinerary);
    setDeleteConfirmEvent(null);
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="pb-32">
        <div className="flex justify-between items-end pt-6 mb-3">
          <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-mag-gold">
            Daily Journey Log
          </p>
          <button 
             onClick={handleOpenAdd}
             className="bg-mag-black text-white p-2 shadow-md flex items-center justify-center active:scale-95 transition-transform"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-8 relative">
          <div className="pr-14">
             <h2 className="text-[18px] font-serif font-black text-mag-black mb-1.5 tracking-tight leading-tight">{currentDay.title}</h2>
             {currentDay.accommodation && (
               <div className="flex items-center gap-2 mt-2.5">
                 <BedIcon className="w-4 h-4 text-mag-gold" />
                 {currentDay.accommodationMapUrl ? (
                   <a href={currentDay.accommodationMapUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-black text-mag-gray active:text-mag-red">
                     {currentDay.accommodation}
                   </a>
                 ) : (
                   <span className="text-sm font-black text-mag-gray">{currentDay.accommodation}</span>
                 )}
               </div>
             )}
          </div>
          {currentDay.mapUrl && (
             <a href={currentDay.mapUrl} target="_blank" rel="noopener noreferrer" className="absolute right-0 top-1 p-3 bg-white rounded-none border border-gray-100 shadow-float text-mag-gold active:scale-90 transition-transform">
                <MapIcon className="w-5 h-5" />
             </a>
          )}
        </div>

        <div className="relative">
          {currentDay.events.map((event, idx) => (
            <TimelineEvent 
              key={event.id || idx} 
              event={event} 
              isLast={idx === currentDay.events.length - 1} 
              onLocationClick={onNavigateToDetail}
              onEdit={handleOpenEdit}
              onDelete={setDeleteConfirmEvent}
            />
          ))}
          
          {currentDay.events.length === 0 && (
             <div className="text-center py-10 border border-dashed border-gray-200 text-gray-400 font-bold text-sm">
               點擊右上方 + 新增行程
             </div>
          )}
        </div>
      </div>

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-10 right-6 z-40 p-2.5 bg-mag-black text-white rounded-none shadow-2xl transition-all duration-300 active:scale-90 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
      </button>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="bg-white w-full max-w-sm p-5 z-10 border-t-4 border-mag-black shadow-2xl animate-in zoom-in-95">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-bold">{modalMode === 'edit' ? '編輯行程' : '新增行程'}</h3>
               <button onClick={() => setShowModal(false)} className="text-mag-gray p-1"><XIcon className="w-5 h-5" /></button>
             </div>
             
             <div className="space-y-4">
                <div>
                  <label className="text-[9px] font-black text-mag-gray block mb-1 uppercase tracking-wider">時間 TIME (24H)</label>
                  <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-[#F7F7F7] p-2 font-bold text-sm outline-none border border-transparent focus:border-mag-gold h-[42px]" />
                </div>

                <div>
                  <label className="text-[9px] font-black text-mag-gray block mb-1 uppercase tracking-wider">描述 DESCRIPTION</label>
                  <input type="text" placeholder="要做什麼..." value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-[#F7F7F7] p-2.5 font-bold text-sm outline-none border border-transparent focus:border-mag-gold h-[42px]" />
                </div>

                <div>
                  <label className="text-[9px] font-black text-mag-gray block mb-1 uppercase tracking-wider">備註 NOTE</label>
                  <input type="text" placeholder="細節..." value={note} onChange={e => setNote(e.target.value)} className="w-full bg-[#F7F7F7] p-2.5 font-bold text-sm outline-none border border-transparent focus:border-mag-gold h-[42px]" />
                </div>
                
                <div className="flex items-center gap-3 py-2 cursor-pointer" onClick={() => setIsHighlight(!isHighlight)}>
                   <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${isHighlight ? 'bg-mag-gold border-mag-gold' : 'border-gray-300'}`}>
                      {isHighlight && <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                   </div>
                   <span className="text-sm font-bold text-mag-black">標記為重點行程 (Highlight)</span>
                </div>

                <button onClick={handleSubmit} className="w-full py-3.5 bg-mag-black text-white font-bold text-xs tracking-[0.2em] shadow-lg active:scale-[0.98] active:bg-mag-gold transition-all mt-2">
                  {modalMode === 'edit' ? '儲存變更 SAVE' : '確認新增 ADD'}
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmEvent && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteConfirmEvent(null)} />
           <div className="bg-white p-8 z-10 w-full max-w-xs text-center border-t-8 border-red-500 shadow-2xl animate-in zoom-in-95">
              <h3 className="text-xl font-bold mb-8">確定要刪除？</h3>
              <p className="mb-6 text-sm text-gray-500 font-bold">{deleteConfirmEvent.time} - {deleteConfirmEvent.description}</p>
              <div className="flex gap-3">
                 <button onClick={() => setDeleteConfirmEvent(null)} className="flex-1 py-4 bg-gray-100 font-bold text-gray-500">取消</button>
                 <button onClick={handleDelete} className="flex-1 py-4 bg-red-500 text-white font-bold active:bg-red-600 transition-colors">確認刪除</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
