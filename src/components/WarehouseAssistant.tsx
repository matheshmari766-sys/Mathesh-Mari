import React, { useState, useEffect } from 'react';
import { 
  PackageCheck, 
  Plus, 
  Printer, 
  Copy, 
  Check, 
  Share2, 
  AlertTriangle, 
  ShieldCheck, 
  FileCheck2, 
  Truck, 
  MapPin, 
  Clock, 
  Search,
  Filter,
  Eye,
  X
} from 'lucide-react';
import { WarehouseRecord } from '../types';

const INITIAL_RECORDS: WarehouseRecord[] = [
  {
    id: 'rec-1',
    type: 'GRN',
    referenceNo: 'GRN-DXB-2026-081',
    orderOrBlNo: 'MEDUBL1294829',
    partnerName: 'Al Futtaim Electronics LLC',
    bayNumber: 'Dock Bay 04',
    warehouseLocation: 'Logistics Hub 3, Dubai Industrial City (DIC)',
    packageCount: 450,
    packageType: 'Cartons',
    grossWeightKg: 8100,
    cbm: 26.5,
    condition: 'Good & Intact',
    sealNumber: 'ML-DXB-99281',
    driverName: 'Mohammed Rashid',
    driverPhone: '+971 52 987 6543',
    driverEmiratesId: '784-1988-1234567-1',
    vehiclePlateNo: 'Dubai 48192 (Trailer 7728)',
    remarks: 'Container seal verified against manifest before cutting. All cartons counted and intact.',
    inspectorName: 'Mathesh M. (Account Leader)',
    createdAt: '2026-10-21 14:30 GST',
    status: 'Released / Putaway',
  },
  {
    id: 'rec-2',
    type: 'GDN',
    referenceNo: 'GDN-DXB-2026-042',
    orderOrBlNo: 'DO-2026-9182',
    partnerName: 'Emirates Retail Solutions FZCO',
    bayNumber: 'Dock Bay 02',
    warehouseLocation: 'JAFZA South Warehouse 18',
    packageCount: 24,
    packageType: 'Pallets',
    grossWeightKg: 6400,
    cbm: 38.0,
    condition: 'Good & Intact',
    driverName: 'Harpreet Singh',
    driverPhone: '+971 50 839 2011',
    driverEmiratesId: '784-1992-8910293-2',
    vehiclePlateNo: 'Sharjah 88123 (Curtain Truck)',
    remarks: 'Dispatched for direct delivery to client warehouse in Al Quoz Industrial 3. Gate pass issued.',
    inspectorName: 'Mathesh M.',
    createdAt: '2026-10-21 11:15 GST',
    status: 'Released / Putaway',
  },
  {
    id: 'rec-3',
    type: 'GRN',
    referenceNo: 'GRN-DXB-2026-082',
    orderOrBlNo: 'HLCUDXB2948102',
    partnerName: 'Gulf Star Distribution FZCO',
    bayNumber: 'Dock Bay 07',
    warehouseLocation: 'DWC Logistics City Hub',
    packageCount: 120,
    packageType: 'Cartons',
    grossWeightKg: 2800,
    cbm: 9.8,
    condition: 'Minor Damage Noted',
    sealNumber: 'HLX-77192',
    driverName: 'Tariq Mehmood',
    driverPhone: '+971 55 491 8273',
    driverEmiratesId: '784-1985-5591823-1',
    vehiclePlateNo: 'Dubai 19284',
    remarks: '3 cartons showed bottom moisture staining. Segregated into quarantine rack Q-2 for surveyor.',
    inspectorName: 'Mathesh M.',
    createdAt: '2026-10-20 16:45 GST',
    status: 'Flagged Discrepancy',
  },
];

export const WarehouseAssistant: React.FC = () => {
  const [records, setRecords] = useState<WarehouseRecord[]>(() => {
    try {
      const saved = localStorage.getItem('logimate_warehouse_records');
      return saved ? JSON.parse(saved) : INITIAL_RECORDS;
    } catch {
      return INITIAL_RECORDS;
    }
  });

  const [activeTab, setActiveTab] = useState<'all' | 'GRN' | 'GDN'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecordForSlip, setSelectedRecordForSlip] = useState<WarehouseRecord | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'GRN' | 'GDN'>('GRN');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State for new entry
  const [formData, setFormData] = useState({
    partnerName: '',
    orderOrBlNo: '',
    bayNumber: 'Dock Bay 04',
    warehouseLocation: 'Logistics Hub 3, Dubai Industrial City (DIC)',
    packageCount: 100,
    packageType: 'Cartons' as WarehouseRecord['packageType'],
    grossWeightKg: 1500,
    cbm: 6.5,
    condition: 'Good & Intact' as WarehouseRecord['condition'],
    sealNumber: '',
    driverName: '',
    driverPhone: '',
    driverEmiratesId: '',
    vehiclePlateNo: '',
    remarks: '',
    inspectorName: 'Mathesh M.',
  });

  useEffect(() => {
    try {
      localStorage.setItem('logimate_warehouse_records', JSON.stringify(records));
    } catch (e) {
      console.warn('Failed to save warehouse records to localStorage', e);
    }
  }, [records]);

  // Filtered list
  const filteredRecords = records.filter((rec) => {
    if (activeTab !== 'all' && rec.type !== activeTab) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      rec.referenceNo.toLowerCase().includes(q) ||
      rec.orderOrBlNo.toLowerCase().includes(q) ||
      rec.partnerName.toLowerCase().includes(q) ||
      rec.driverName.toLowerCase().includes(q) ||
      rec.vehiclePlateNo.toLowerCase().includes(q)
    );
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const countOfYear = records.filter((r) => r.type === createType).length + 1;
    const refPrefix = createType === 'GRN' ? 'GRN-DXB-2026' : 'GDN-DXB-2026';
    const newRecord: WarehouseRecord = {
      id: `rec-${Date.now()}`,
      type: createType,
      referenceNo: `${refPrefix}-${String(countOfYear).padStart(3, '0')}`,
      orderOrBlNo: formData.orderOrBlNo || 'REF-N/A',
      partnerName: formData.partnerName || 'Confidential Client',
      bayNumber: formData.bayNumber,
      warehouseLocation: formData.warehouseLocation,
      packageCount: Number(formData.packageCount) || 1,
      packageType: formData.packageType,
      grossWeightKg: Number(formData.grossWeightKg) || 0,
      cbm: Number(formData.cbm) || 0,
      condition: formData.condition,
      sealNumber: formData.sealNumber || undefined,
      driverName: formData.driverName || 'Verified Driver',
      driverPhone: formData.driverPhone || '+971 50 000 0000',
      driverEmiratesId: formData.driverEmiratesId,
      vehiclePlateNo: formData.vehiclePlateNo || 'Dubai Plate',
      remarks: formData.remarks || 'Standard offloading inspection completed with zero discrepancies.',
      inspectorName: formData.inspectorName,
      createdAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai', hour12: false }) + ' GST',
      status: formData.condition.includes('Damage') || formData.condition.includes('Broken') ? 'Flagged Discrepancy' : 'Released / Putaway',
    };

    setRecords([newRecord, ...records]);
    setShowCreateModal(false);
    setSelectedRecordForSlip(newRecord);
  };

  const handleCopyWhatsAppUpdate = (record: WarehouseRecord) => {
    const isGrn = record.type === 'GRN';
    const text = `🚨 *DUBAI LOGISTICS SHIPMENT UPDATE*
----------------------------------------
*Type:* ${isGrn ? '📥 GRN (Goods Received Note)' : '📤 GDN (Goods Dispatch Note)'}
*Document Ref:* ${record.referenceNo}
*BL / Order No:* ${record.orderOrBlNo}
*Party:* ${record.partnerName}

*Location:* ${record.warehouseLocation}
*Dock Bay:* ${record.bayNumber}
*Packages:* ${record.packageCount} ${record.packageType}
*Weight / Volume:* ${record.grossWeightKg} KG | ${record.cbm} CBM
*Cargo Condition:* ${record.condition}
${record.sealNumber ? `*Seal Number:* ${record.sealNumber} (Verified)` : ''}

*Vehicle / Driver:* ${record.vehiclePlateNo} | ${record.driverName}
*Status:* ${record.status}
*Remarks:* ${record.remarks}
----------------------------------------
*Logged by:* ${record.inspectorName} | ${record.createdAt}
LogiMate AI Logistics Suite • Dubai, UAE`;

    navigator.clipboard.writeText(text);
    setCopiedId(record.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400 shrink-0">
            <PackageCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white">Warehouse Assistant (GRN / GDN)</h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Free & Persistent
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Generate Goods Received Notes, Goods Dispatch Notes, driver inspection tallies, and instant WhatsApp updates.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          <button
            onClick={() => {
              setCreateType('GRN');
              setShowCreateModal(true);
            }}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New GRN (Inward)</span>
          </button>
          <button
            onClick={() => {
              setCreateType('GDN');
              setShowCreateModal(true);
            }}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New GDN (Dispatch)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="flex rounded-lg bg-slate-950 p-0.5 border border-slate-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'all' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Records ({records.length})
            </button>
            <button
              onClick={() => setActiveTab('GRN')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'GRN' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              GRN Inward ({records.filter((r) => r.type === 'GRN').length})
            </button>
            <button
              onClick={() => setActiveTab('GDN')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'GDN' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              GDN Outward ({records.filter((r) => r.type === 'GDN').length})
            </button>
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search BL#, Reference, Consignee, Driver..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Doc Ref / Date</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">BL / PO / DO No</th>
                <th className="px-4 py-3">Client / Shipper</th>
                <th className="px-4 py-3">Cargo Spec</th>
                <th className="px-4 py-3">Bay & Driver</th>
                <th className="px-4 py-3">Condition</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-500">
                    No warehouse records found matching your filter.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-bold text-white font-mono">{rec.referenceNo}</p>
                      <p className="text-[10px] text-slate-400">{rec.createdAt}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          rec.type === 'GRN'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        }`}
                      >
                        {rec.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-amber-400 font-semibold">
                      {rec.orderOrBlNo}
                    </td>
                    <td className="px-4 py-3 text-slate-200">
                      <p className="font-semibold line-clamp-1">{rec.partnerName}</p>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{rec.warehouseLocation}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      <p className="font-semibold">{rec.packageCount} {rec.packageType}</p>
                      <p className="text-[10px] text-slate-400">{rec.cbm} CBM • {rec.grossWeightKg.toLocaleString()} KG</p>
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      <p className="font-semibold text-white">{rec.bayNumber}</p>
                      <p className="text-[10px] text-slate-400">{rec.driverName} ({rec.vehiclePlateNo})</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                          rec.condition.includes('Damage') || rec.condition.includes('Broken')
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {rec.condition.includes('Damage') ? (
                          <AlertTriangle className="w-2.5 h-2.5 text-rose-400" />
                        ) : (
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                        )}
                        <span>{rec.condition}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedRecordForSlip(rec)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="View Official Printable Slip"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleCopyWhatsAppUpdate(rec)}
                          className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold transition-all"
                          title="Copy formatted WhatsApp Status"
                        >
                          {copiedId === rec.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Share2 className="w-3 h-3 text-emerald-400" />
                          )}
                          <span>{copiedId === rec.id ? 'Copied' : 'WhatsApp'}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Official Printable Slip Preview */}
      {selectedRecordForSlip && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative my-8">
            <button
              onClick={() => setSelectedRecordForSlip(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official Slip Printable Container */}
            <div id="printable-warehouse-slip" className="bg-white text-slate-950 rounded-xl p-6 sm:p-8 font-sans shadow space-y-6">
              {/* Slip Header */}
              <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-extrabold tracking-tight text-slate-900">APEX GLOBAL LOGISTICS DUBAI</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    DP World Approved CFS & Warehouse Hub • Jebel Ali Free Zone / DIC, Dubai, UAE
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    UAE VAT TRN: 100293847100003 • Dubai Customs Code: AE-94819
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded bg-slate-950 text-white font-extrabold text-xs tracking-wider uppercase">
                    {selectedRecordForSlip.type === 'GRN' ? 'GOODS RECEIVED NOTE' : 'GOODS DISPATCH NOTE'}
                  </span>
                  <p className="text-base font-extrabold font-mono text-slate-900 mt-1">
                    {selectedRecordForSlip.referenceNo}
                  </p>
                  <p className="text-[11px] text-slate-600 font-mono">{selectedRecordForSlip.createdAt}</p>
                </div>
              </div>

              {/* Two Column Grid Information */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Shipper / Consignee</p>
                  <p className="font-bold text-slate-900 text-sm">{selectedRecordForSlip.partnerName}</p>
                  <p className="text-slate-600"><strong>BL / Order Ref:</strong> {selectedRecordForSlip.orderOrBlNo}</p>
                  <p className="text-slate-600"><strong>Facility:</strong> {selectedRecordForSlip.warehouseLocation}</p>
                  <p className="text-slate-600"><strong>Assigned Bay:</strong> {selectedRecordForSlip.bayNumber}</p>
                </div>

                <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Driver & Vehicle Verification</p>
                  <p className="font-bold text-slate-900 text-sm">{selectedRecordForSlip.driverName}</p>
                  <p className="text-slate-600"><strong>Mobile:</strong> {selectedRecordForSlip.driverPhone}</p>
                  <p className="text-slate-600"><strong>Vehicle Plate:</strong> {selectedRecordForSlip.vehiclePlateNo}</p>
                  {selectedRecordForSlip.driverEmiratesId && (
                    <p className="text-slate-600"><strong>Emirates ID:</strong> {selectedRecordForSlip.driverEmiratesId}</p>
                  )}
                  {selectedRecordForSlip.sealNumber && (
                    <p className="text-emerald-700 font-mono font-bold"><strong>Container Seal:</strong> {selectedRecordForSlip.sealNumber} (Verified)</p>
                  )}
                </div>
              </div>

              {/* Cargo Specification Table */}
              <table className="w-full text-xs text-left border border-slate-300">
                <thead className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold">
                  <tr>
                    <th className="p-2.5">Package Type</th>
                    <th className="p-2.5">Manifested Qty</th>
                    <th className="p-2.5">Gross Weight (KG)</th>
                    <th className="p-2.5">Volume (CBM)</th>
                    <th className="p-2.5">Physical Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">{selectedRecordForSlip.packageType}</td>
                    <td className="p-2.5 font-bold font-mono text-slate-900">{selectedRecordForSlip.packageCount} Units</td>
                    <td className="p-2.5 font-mono text-slate-900">{selectedRecordForSlip.grossWeightKg.toLocaleString()} KG</td>
                    <td className="p-2.5 font-mono text-slate-900">{selectedRecordForSlip.cbm} CBM</td>
                    <td className="p-2.5">
                      <span className="font-bold text-slate-900">{selectedRecordForSlip.condition}</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Inspector Remarks & Visual Barcode */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                <p className="text-[10px] font-bold uppercase text-slate-500">Inspector Inspection Remarks</p>
                <p className="text-slate-800 leading-relaxed">{selectedRecordForSlip.remarks}</p>
              </div>

              {/* Visual Simulated Barcode */}
              <div className="flex flex-col items-center justify-center pt-2">
                <div className="h-8 flex space-x-1 items-center">
                  {[4,2,6,1,3,5,2,4,7,3,2,5,3,6,2,4,6,1,3,5,2,4,7,3,2,5,3,6,2,4,5,2,4,6,3].map((w, i) => (
                    <div key={i} className="bg-slate-900 h-8" style={{ width: `${w}px` }} />
                  ))}
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-600 mt-1">
                  *{selectedRecordForSlip.referenceNo}*
                </span>
              </div>

              {/* Signatures Block */}
              <div className="grid grid-cols-2 gap-8 pt-4 border-t-2 border-slate-300 text-xs">
                <div>
                  <p className="font-bold text-slate-900">Haulier / Driver Signature:</p>
                  <p className="text-[11px] text-slate-500 mb-6">I confirm the cargo count & condition specified above.</p>
                  <div className="border-b border-slate-400 w-4/5 pt-6" />
                  <p className="text-[11px] text-slate-600 mt-1">{selectedRecordForSlip.driverName}</p>
                </div>

                <div>
                  <p className="font-bold text-slate-900">Warehouse Supervisor / Account Leader:</p>
                  <p className="text-[11px] text-slate-500 mb-6">Authorized official warehouse receipt.</p>
                  <div className="border-b border-slate-400 w-4/5 pt-6" />
                  <p className="text-[11px] text-slate-600 mt-1">{selectedRecordForSlip.inspectorName}</p>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-4 mt-2">
              <button
                onClick={() => handleCopyWhatsAppUpdate(selectedRecordForSlip)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy WhatsApp Update</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePrintSlip}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={() => setSelectedRecordForSlip(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create GRN / GDN */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative my-8">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                <PackageCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                Create {createType === 'GRN' ? 'Goods Received Note (Inward)' : 'Goods Dispatch Note (Outward)'}
              </h3>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    {createType === 'GRN' ? 'Supplier / Shipper' : 'Consignee / Customer'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.partnerName}
                    onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                    placeholder="e.g. Al Futtaim Logistics Trading"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">BL / PO / Delivery Order #</label>
                  <input
                    type="text"
                    required
                    value={formData.orderOrBlNo}
                    onChange={(e) => setFormData({ ...formData, orderOrBlNo: e.target.value })}
                    placeholder="e.g. MEDUBL1294829 or PO-99182"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Warehouse Facility</label>
                  <select
                    value={formData.warehouseLocation}
                    onChange={(e) => setFormData({ ...formData, warehouseLocation: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Logistics Hub 3, Dubai Industrial City (DIC)">Dubai Industrial City (DIC)</option>
                    <option value="JAFZA South Warehouse Bay 18">JAFZA South Freezone</option>
                    <option value="Al Quoz Industrial 3 Warehouse">Al Quoz Industrial 3</option>
                    <option value="DWC Logistics City Hub (Dubai South)">DWC Logistics City (Airport)</option>
                    <option value="KIZAD Logistics Park (Abu Dhabi Corridor)">KIZAD Logistics Park</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Assigned Dock Bay</label>
                  <input
                    type="text"
                    value={formData.bayNumber}
                    onChange={(e) => setFormData({ ...formData, bayNumber: e.target.value })}
                    placeholder="e.g. Dock Bay 04"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Units Qty</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.packageCount}
                    onChange={(e) => setFormData({ ...formData, packageCount: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Package Type</label>
                  <select
                    value={formData.packageType}
                    onChange={(e) => setFormData({ ...formData, packageType: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Cartons">Cartons</option>
                    <option value="Pallets">Pallets</option>
                    <option value="Wooden Crates">Wooden Crates</option>
                    <option value="Drums">Drums</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Weight (KG)</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.grossWeightKg}
                    onChange={(e) => setFormData({ ...formData, grossWeightKg: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Volume (CBM)</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.cbm}
                    onChange={(e) => setFormData({ ...formData, cbm: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Physical Cargo Condition</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Good & Intact">Good & Intact (Standard)</option>
                    <option value="Minor Damage Noted">Minor Damage Noted (Carton Dent)</option>
                    <option value="Crushed / Wet">Crushed / Wet (Survey Required)</option>
                    <option value="Seal Broken / Discrepancy">Seal Broken / Discrepancy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Container Bolt Seal #</label>
                  <input
                    type="text"
                    value={formData.sealNumber}
                    onChange={(e) => setFormData({ ...formData, sealNumber: e.target.value })}
                    placeholder="e.g. ML-DXB-99281"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Driver Name</label>
                  <input
                    type="text"
                    required
                    value={formData.driverName}
                    onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                    placeholder="e.g. Mohammed Rashid"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Driver UAE Phone</label>
                  <input
                    type="text"
                    value={formData.driverPhone}
                    onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Vehicle Plate</label>
                  <input
                    type="text"
                    value={formData.vehiclePlateNo}
                    onChange={(e) => setFormData({ ...formData, vehiclePlateNo: e.target.value })}
                    placeholder="Dubai 48192"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Inspection Remarks / Instructions</label>
                <textarea
                  rows={2}
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  placeholder="e.g. Container seal checked and matched manifest before destuffing. Placed into Bay 4 racks."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
                >
                  Generate {createType} Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
