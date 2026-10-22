import { CargoItem, CbmCalculationResult, DimensionUnit } from '../types';

/**
 * Pure mathematical CBM Calculator - runs 100% locally in browser, zero API calls, zero cost.
 */

// Convert any dimension to meters
export function convertToMeters(value: number, unit: DimensionUnit): number {
  if (value <= 0 || isNaN(value)) return 0;
  switch (unit) {
    case 'cm':
      return value / 100;
    case 'm':
      return value;
    case 'in':
      return value * 0.0254;
    case 'ft':
      return value * 0.3048;
    default:
      return value / 100;
  }
}

// Convert any dimension to centimeters
export function convertToCm(value: number, unit: DimensionUnit): number {
  return convertToMeters(value, unit) * 100;
}

export function calculateCbm(items: CargoItem[]): CbmCalculationResult {
  let totalPieces = 0;
  let totalCbm = 0;
  let totalGrossWeightKg = 0;
  let totalVolumetricKgStandard = 0;
  let totalVolumetricKgCourier = 0;

  const itemsBreakdown = items.map((item) => {
    const qty = Math.max(0, Number(item.quantity) || 0);
    const lMeters = convertToMeters(item.length, item.unit);
    const wMeters = convertToMeters(item.width, item.unit);
    const hMeters = convertToMeters(item.height, item.unit);

    const unitCbm = lMeters * wMeters * hMeters;
    const lineTotalCbm = unitCbm * qty;

    const lCm = convertToCm(item.length, item.unit);
    const wCm = convertToCm(item.width, item.unit);
    const hCm = convertToCm(item.height, item.unit);

    // Air volumetric: (L * W * H in cm) / 6000 for standard IATA, / 5000 for courier
    const unitAirVolStandard = (lCm * wCm * hCm) / 6000;
    const unitAirVolCourier = (lCm * wCm * hCm) / 5000;

    const lineTotalWeight = (Number(item.grossWeightPerPieceKg) || 0) * qty;

    totalPieces += qty;
    totalCbm += lineTotalCbm;
    totalGrossWeightKg += lineTotalWeight;
    totalVolumetricKgStandard += unitAirVolStandard * qty;
    totalVolumetricKgCourier += unitAirVolCourier * qty;

    return {
      id: item.id,
      description: item.description || 'Cargo item',
      quantity: qty,
      unitCbm: Number(unitCbm.toFixed(4)),
      totalCbm: Number(lineTotalCbm.toFixed(3)),
      unitWeightKg: Number(item.grossWeightPerPieceKg) || 0,
      totalWeightKg: Number(lineTotalWeight.toFixed(2)),
    };
  });

  // 1 CBM = 35.3147 CFT (Cubic Feet)
  const totalCft = totalCbm * 35.3147;

  // Chargeable air weight = higher of gross weight or volumetric weight (using standard 1:6000)
  const chargeableAirWeightKg = Math.max(totalGrossWeightKg, totalVolumetricKgStandard);

  // Sea Freight W/M (Weight or Measurement rule): 1 CBM = 1000 kg (1 MT). Revenue Ton is max(CBM, Weight in MT)
  const grossWeightMetricTon = totalGrossWeightKg / 1000;
  const seaChargeableWeightTon = Math.max(totalCbm, grossWeightMetricTon);

  // Container Selection Logic (based on standard safe loading thresholds)
  // 20ft: Usable 28 CBM, Max payload 21,700 kg
  // 40ft: Usable 58 CBM, Max payload 26,500 kg
  // 40ft HC: Usable 68 CBM, Max payload 26,500 kg
  let containerRecommendation: CbmCalculationResult['containerRecommendation'];

  if (totalCbm === 0 && totalGrossWeightKg === 0) {
    containerRecommendation = {
      recommendedType: 'LCL',
      title: 'Awaiting Dimensions',
      description: 'Enter your package dimensions to receive container and vehicle recommendations.',
      fitPercentage: 0,
      containerName: 'None',
      maxCbm: 0,
    };
  } else if (totalCbm <= 14 && totalGrossWeightKg <= 10000) {
    // Under 14 CBM is best as LCL (Less than Container Load) through Jebel Ali
    const percentOf20ft = Math.min(100, (totalCbm / 28) * 100);
    containerRecommendation = {
      recommendedType: 'LCL',
      title: 'LCL (Less than Container Load)',
      description: `Your cargo volume is ${totalCbm.toFixed(2)} CBM. Booking LCL consolidation through Jebel Ali Port or DWC CFS is significantly more cost-effective than a dedicated FCL container.`,
      fitPercentage: Math.round(percentOf20ft),
      containerName: 'LCL Consolidation',
      maxCbm: 28,
    };
  } else if (totalCbm <= 28 && totalGrossWeightKg <= 21700) {
    const fit = Math.min(100, (totalCbm / 28) * 100);
    containerRecommendation = {
      recommendedType: '20FT',
      title: "20' Standard Dry Container (20' GP)",
      description: `Fits perfectly in a single 20-foot container. Usable volume is approx 28 CBM with max payload of 21.7 MT.`,
      fitPercentage: Math.round(fit),
      containerName: "20' GP Box",
      maxCbm: 28,
    };
  } else if (totalCbm <= 58 && totalGrossWeightKg <= 26500) {
    const fit = Math.min(100, (totalCbm / 58) * 100);
    containerRecommendation = {
      recommendedType: '40FT',
      title: "40' Standard Dry Container (40' GP)",
      description: `Cargo exceeds 20' capacity. A 40-foot standard container provides approx 58 CBM usable capacity and 26.5 MT max payload.`,
      fitPercentage: Math.round(fit),
      containerName: "40' GP Box",
      maxCbm: 58,
    };
  } else if (totalCbm <= 68 && totalGrossWeightKg <= 26500) {
    const fit = Math.min(100, (totalCbm / 68) * 100);
    containerRecommendation = {
      recommendedType: '40HC',
      title: "40' High Cube Container (40' HC)",
      description: `Ideal for voluminous cargo. High Cube gives an extra 1 foot height (9'6" total) offering up to 68 CBM usable space.`,
      fitPercentage: Math.round(fit),
      containerName: "40' HC Box",
      maxCbm: 68,
    };
  } else {
    const count40Hc = Math.ceil(totalCbm / 65);
    containerRecommendation = {
      recommendedType: 'MULTI_CONTAINER',
      title: `Multiple FCL Containers (${count40Hc}x 40' HC recommended)`,
      description: `Total volume ${totalCbm.toFixed(2)} CBM exceeds single container capacity. Recommend splitting into approximately ${count40Hc}x 40' High Cube containers.`,
      fitPercentage: 100,
      containerName: `${count40Hc}x 40' HC Containers`,
      maxCbm: count40Hc * 68,
    };
  }

  // Dubai Local Trucking Fleet Recommendation
  let truckRecommendation: CbmCalculationResult['truckRecommendation'];
  if (totalCbm <= 4 && totalGrossWeightKg <= 1000) {
    truckRecommendation = {
      vehicleType: '1-Ton Pickup (Single Cabin)',
      capacityCbm: 4,
      capacityPayloadTon: 1,
      notes: 'Standard Dubai city courier & small cargo transport (e.g. Al Quoz, Deira, Business Bay).',
    };
  } else if (totalCbm <= 12 && totalGrossWeightKg <= 3000) {
    truckRecommendation = {
      vehicleType: '3-Ton Box / Curtain Pickup',
      capacityCbm: 12,
      capacityPayloadTon: 3,
      notes: 'Most popular Dubai transport for pallet delivery from JAFZA / DIC to client warehouses.',
    };
  } else if (totalCbm <= 24 && totalGrossWeightKg <= 7000) {
    truckRecommendation = {
      vehicleType: '7-Ton Truck (Enclosed Body)',
      capacityCbm: 24,
      capacityPayloadTon: 7,
      notes: 'Suitable for intermediate volume distribution across Dubai, Sharjah, and Abu Dhabi.',
    };
  } else if (totalCbm <= 45 && totalGrossWeightKg <= 10000) {
    truckRecommendation = {
      vehicleType: '10-Ton / 12-Meter Heavy Truck',
      capacityCbm: 45,
      capacityPayloadTon: 10,
      notes: 'High capacity cross-emirates transfer between Jebel Ali Port, DWC, and KIZAD.',
    };
  } else {
    truckRecommendation = {
      vehicleType: "40' Flatbed or Box Articulated Trailer",
      capacityCbm: 70,
      capacityPayloadTon: 25,
      notes: 'Standard port-to-warehouse container haulier chassis (DP World gate pass compatible).',
    };
  }

  return {
    totalPieces,
    totalCbm: Number(totalCbm.toFixed(3)),
    totalCft: Number(totalCft.toFixed(2)),
    totalGrossWeightKg: Number(totalGrossWeightKg.toFixed(2)),
    airVolumetricKgStandard: Number(totalVolumetricKgStandard.toFixed(2)),
    airVolumetricKgCourier: Number(totalVolumetricKgCourier.toFixed(2)),
    chargeableAirWeightKg: Number(chargeableAirWeightKg.toFixed(2)),
    seaChargeableWeightTon: Number(seaChargeableWeightTon.toFixed(2)),
    containerRecommendation,
    truckRecommendation,
    itemsBreakdown,
  };
}

export const PRESET_CARGO_SIZES = [
  { name: 'Standard Export Carton', length: 50, width: 40, height: 35, unit: 'cm' as DimensionUnit, weight: 15 },
  { name: 'Euro Pallet (EUR 1)', length: 120, width: 80, height: 140, unit: 'cm' as DimensionUnit, weight: 450 },
  { name: 'Standard Industrial Pallet', length: 120, width: 100, height: 150, unit: 'cm' as DimensionUnit, weight: 600 },
  { name: 'Steel Drum (200L / 55 Gal)', length: 60, width: 60, height: 90, unit: 'cm' as DimensionUnit, weight: 220 },
  { name: 'Machinery Crate (Large)', length: 200, width: 120, height: 160, unit: 'cm' as DimensionUnit, weight: 1200 },
];
