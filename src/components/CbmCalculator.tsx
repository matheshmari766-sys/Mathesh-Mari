import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Truck, 
  Container, 
  Plane, 
  Ship, 
  Info, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { CargoItem, DimensionUnit } from '../types';
import { calculateCbm, PRESET_CARGO_SIZES } from '../utils/cbmCalculator';

const INITIAL_ITEMS: CargoItem[] = [
  {
    id: 'item-1',
    description: 'Cartons of Garments / Textile',
    length: 60,
    width: 40,
    height: 40,
    unit: 'cm',
    quantity: 50,
    grossWeightPerPieceKg: 18,
  },
  {
    id: 'item-2',
    description: 'Euro Pallets of Electronics',
    length: 120,
    width: 80,
    height: 120,
    unit: 'cm',
    quantity: 6,
    grossWeightPerPieceKg: 320,
  },
];

export const CbmCalculator: React.FC = () => {
  const [items, setItems] = useState<CargoItem[]>(INITIAL_ITEMS);
  const [copied, setCopied] = useState(false);

  // Pure client-side calculations (instant, zero network latency, 100% free)
  const result = useMemo(() => calculateCbm(items), [items]);

  const handleAddItem = () => {
    const newItem: CargoItem = {
      id: `item-${Date.now()}`,
      description: `Package Line ${items.length + 1}`,
      length: 50,
      width: 40,
      height: 30,
      unit: 'cm',
      quantity: 10,
      grossWeightPerPieceKg: 15,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleApplyPreset = (preset: typeof PRESET_CARGO_SIZES[0]) => {
    const newItem: CargoItem = {
      id: `item-${Date.now()}`,
      description: preset.name,
      length: preset.length,
      width: preset.width,
      height: preset.height,
      unit: preset.unit,
      quantity: 4,
      grossWeightPerPieceKg: preset.weight,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof CargoItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          [field]: field === 'unit' || field === 'description' ? value : Number(value) || 0,
        };
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) {
      alert('Please keep at least one cargo row.');
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReset = () => {
    setItems([
      {
        id: `item-${Date.now()}`,
        description: 'Standard Cartons',
        length: 50,
        width: 40,
        height: 35,
        unit: 'cm',
        quantity: 20,
        grossWeightPerPieceKg: 15,
      },
    ]);
  };

  const handleCopySummary = () => {
    const text = `CARGO VOLUME & WEIGHT SPECIFICATION (DUBAI LOGISTICS)
--------------------------------------------------
Total Packages: ${result.totalPieces} units
Total Volume: ${result.totalCbm} CBM (${result.totalCft} CFT)
Total Gross Weight: ${result.totalGrossWeightKg.toLocaleString()} kg (${(result.totalGrossWeightKg / 1000).toFixed(2)} MT)

AIR FREIGHT METRICS:
- Volumetric Weight (1:6000 IATA): ${result.airVolumetricKgStandard.toLocaleString()} kg
- Chargeable Air Weight: ${result.chargeableAirWeightKg.toLocaleString()} kg (${result.chargeableAirWeightKg > result.totalGrossWeightKg ? 'Charged on Volume' : 'Charged on Actual Weight'})

OCEAN FREIGHT METRICS:
- Revenue Ton (W/M 1:1000): ${result.seaChargeableWeightTon} RT
- Equipment Fit: ${result.containerRecommendation.title}
- Recommended Truck: ${result.truckRecommendation.vehicleType}
--------------------------------------------------
Calculated via LogiMate AI Dubai Suite`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Free & Offline Guarantee */}
      <div className="bg-gradient-to-r from-emerald-900/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400 shrink-0">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white">Client-Side CBM & Volumetric Calculator</h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Free & No AI API Needed
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Instant mathematical calculations for Dubai port clearance, DP World Jebel Ali container planning, and IATA air freight chargeable weight.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          <button
            onClick={handleCopySummary}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copied ? 'Copied Specs!' : 'Copy Summary'}</span>
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Grid: Input Form & Visual Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Dimensions Table & Presets (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Quick Presets Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Quick Presets for Dubai Warehouses:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_CARGO_SIZES.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleApplyPreset(preset)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 hover:border-amber-500/50 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 transition-all flex items-center space-x-1"
                >
                  <Plus className="w-3 h-3 text-amber-400" />
                  <span>{preset.name}</span>
                  <span className="text-[10px] text-slate-400">({preset.length}x{preset.width}x{preset.height}{preset.unit})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cargo Lines List */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Cargo Package Lines ({items.length})
                </h3>
              </div>
              <button
                onClick={handleAddItem}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/10"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add Row</span>
              </button>
            </div>

            <div className="space-y-3.5">
              {items.map((item, index) => {
                const lMeters = item.unit === 'cm' ? item.length / 100 : item.unit === 'm' ? item.length : item.unit === 'in' ? item.length * 0.0254 : item.length * 0.3048;
                const wMeters = item.unit === 'cm' ? item.width / 100 : item.unit === 'm' ? item.width : item.unit === 'in' ? item.width * 0.0254 : item.width * 0.3048;
                const hMeters = item.unit === 'cm' ? item.height / 100 : item.unit === 'm' ? item.height : item.unit === 'in' ? item.height * 0.0254 : item.height * 0.3048;
                const lineCbm = (lMeters * wMeters * hMeters * item.quantity).toFixed(3);
                const lineWeight = (item.grossWeightPerPieceKg * item.quantity).toFixed(1);

                return (
                  <div
                    key={item.id}
                    className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-all space-y-3"
                  >
                    {/* Header line */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2 flex-1">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-[11px] font-bold text-amber-400 flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                          placeholder="Cargo Description (e.g. Cartons of electronics)"
                          className="w-full text-xs font-semibold bg-transparent border-none text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500/50 rounded px-1.5 py-0.5"
                        />
                      </div>
                      <div className="flex items-center space-x-3 shrink-0">
                        <span className="text-[11px] font-mono text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {lineCbm} CBM • {lineWeight} kg
                        </span>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete package line"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Inputs Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-1">
                      <div>
                        <label className="block text-[10px] font-medium text-slate-400 mb-1">Length</label>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={item.length || ''}
                          onChange={(e) => handleUpdateItem(item.id, 'length', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-medium text-slate-400 mb-1">Width</label>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={item.width || ''}
                          onChange={(e) => handleUpdateItem(item.id, 'width', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-medium text-slate-400 mb-1">Height</label>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={item.height || ''}
                          onChange={(e) => handleUpdateItem(item.id, 'height', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-medium text-slate-400 mb-1">Unit</label>
                        <select
                          value={item.unit}
                          onChange={(e) => handleUpdateItem(item.id, 'unit', e.target.value as DimensionUnit)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-500"
                        >
                          <option value="cm">cm</option>
                          <option value="m">m</option>
                          <option value="in">inch</option>
                          <option value="ft">feet</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-medium text-slate-400 mb-1">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity || ''}
                          onChange={(e) => handleUpdateItem(item.id, 'quantity', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-medium text-slate-400 mb-1">Wt/Piece (kg)</label>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={item.grossWeightPerPieceKg || ''}
                          onChange={(e) => handleUpdateItem(item.id, 'grossWeightPerPieceKg', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Results, Container & Air Sizing (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Key Figures Card */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Consolidated Summary</span>
              <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                {result.totalPieces} Pieces Total
              </span>
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-3.5">
                <p className="text-[11px] font-semibold text-slate-400">Total Volume</p>
                <div className="flex items-baseline space-x-1.5 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                    {result.totalCbm}
                  </span>
                  <span className="text-xs font-bold text-slate-400">CBM</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">
                  = {result.totalCft} CFT (Cubic Feet)
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5">
                <p className="text-[11px] font-semibold text-slate-400">Total Gross Weight</p>
                <div className="flex items-baseline space-x-1.5 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {result.totalGrossWeightKg.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-slate-400">KG</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">
                  = {(result.totalGrossWeightKg / 1000).toFixed(2)} Metric Tons
                </p>
              </div>
            </div>

            {/* Container Recommendation Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Container className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-slate-200">Ocean Container Recommendation</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  {result.containerRecommendation.recommendedType}
                </span>
              </div>

              <div>
                <p className="text-sm font-bold text-white">{result.containerRecommendation.title}</p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {result.containerRecommendation.description}
                </p>
              </div>

              {/* Visual Container Fill Bar */}
              {result.containerRecommendation.maxCbm > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Space Utilization</span>
                    <span className="font-bold text-amber-400">
                      {result.containerRecommendation.fitPercentage}% of {result.containerRecommendation.containerName}
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-500 ${
                        result.containerRecommendation.fitPercentage > 95
                          ? 'bg-rose-500'
                          : result.containerRecommendation.fitPercentage > 75
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                      style={{ width: `${Math.min(100, result.containerRecommendation.fitPercentage)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Air Freight Chargeable Weight Card */}
            <div className="mt-3.5 bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Plane className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-bold text-slate-200">Air Freight Chargeable Weight (DXB / DWC)</span>
                </div>
                <span className="text-[10px] font-mono text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
                  IATA 1:6000
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-xl font-extrabold text-sky-400 font-mono">
                    {result.chargeableAirWeightKg.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-slate-400 ml-1">KG Chargeable</span>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <span>Actual Scale: </span>
                  <span className="font-bold text-slate-200 font-mono">{result.totalGrossWeightKg} kg</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 text-[11px] text-slate-300 flex items-start space-x-2">
                <Info className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <p>
                  {result.chargeableAirWeightKg > result.totalGrossWeightKg ? (
                    <span>
                      <strong>Volumetric Rule Applies:</strong> Cargo is voluminous. Airline will charge on volume ({result.airVolumetricKgStandard} kg) instead of scale weight ({result.totalGrossWeightKg} kg).
                    </span>
                  ) : (
                    <span>
                      <strong>Actual Weight Applies:</strong> Cargo is dense. Airline will charge on actual scale weight ({result.totalGrossWeightKg} kg).
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Dubai Truck Fleet Sizing */}
            <div className="mt-3.5 bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-200">UAE Local Transport Fleet Match</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-bold text-emerald-300">{result.truckRecommendation.vehicleType}</span>
                <span className="text-[11px] text-slate-400 font-mono">Cap: {result.truckRecommendation.capacityCbm} CBM</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {result.truckRecommendation.notes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
