export type DimensionUnit = 'cm' | 'm' | 'in' | 'ft';

export interface CargoItem {
  id: string;
  description: string;
  length: number;
  width: number;
  height: number;
  unit: DimensionUnit;
  quantity: number;
  grossWeightPerPieceKg: number;
}

export interface CbmCalculationResult {
  totalPieces: number;
  totalCbm: number;
  totalCft: number;
  totalGrossWeightKg: number;
  airVolumetricKgStandard: number; // 1:6000
  airVolumetricKgCourier: number;  // 1:5000
  chargeableAirWeightKg: number;
  seaChargeableWeightTon: number; // 1 CBM = 1000 kg (Revenue Ton)
  containerRecommendation: {
    recommendedType: 'LCL' | '20FT' | '40FT' | '40HC' | 'MULTI_CONTAINER';
    title: string;
    description: string;
    fitPercentage: number;
    containerName: string;
    maxCbm: number;
  };
  truckRecommendation: {
    vehicleType: string;
    capacityCbm: number;
    capacityPayloadTon: number;
    notes: string;
  };
  itemsBreakdown: {
    id: string;
    description: string;
    quantity: number;
    unitCbm: number;
    totalCbm: number;
    unitWeightKg: number;
    totalWeightKg: number;
  }[];
}

export type EmailCategory =
  | 'customs_delay'
  | 'demurrage_waiver'
  | 'rate_quotation'
  | 'arrival_notice'
  | 'delivery_order'
  | 'warehouse_appointment'
  | 'damage_discrepancy'
  | 'payment_reminder';

export interface EmailTemplateDef {
  id: EmailCategory;
  title: string;
  badge: string;
  description: string;
  subjectTemplate: string;
  bodyTemplate: string;
  defaultVariables: Record<string, string>;
  variableHints: Record<string, string>;
}

export interface WarehouseRecord {
  id: string;
  type: 'GRN' | 'GDN';
  referenceNo: string; // GRN-2026-001 or GDN-2026-001
  orderOrBlNo: string;
  partnerName: string; // Shipper or Consignee
  bayNumber: string;
  warehouseLocation: string; // e.g. Dubai Industrial City (DIC), JAFZA South, Al Quoz
  packageCount: number;
  packageType: 'Cartons' | 'Pallets' | 'Wooden Crates' | 'Drums' | 'Rolls' | 'Mixed';
  grossWeightKg: number;
  cbm: number;
  condition: 'Good & Intact' | 'Minor Damage Noted' | 'Crushed / Wet' | 'Seal Broken / Discrepancy';
  sealNumber?: string;
  driverName: string;
  driverPhone: string;
  driverEmiratesId?: string;
  vehiclePlateNo: string;
  remarks: string;
  inspectorName: string;
  createdAt: string;
  status: 'Draft' | 'Inspected' | 'Released / Putaway' | 'Flagged Discrepancy';
}

export interface SpeakingScenario {
  id: string;
  title: string;
  category: 'Client Relations' | 'Customs & Port' | 'Shipping Lines' | 'Warehouse & Drivers' | 'Negotiation';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  situationTanglish: string;
  clientSaysEnglish: string;
  recommendedEnglish: string;
  tanglishExplanation: string;
  whyThisWorks: string;
  alternatives: string[];
  dubaiProTip: string;
  keyVocabulary: { term: string; meaningTanglish: string }[];
}

export interface TanglishGlossaryItem {
  term: string;
  category: string;
  meaningEnglish: string;
  tanglishExplanation: string;
  exampleSentence: string;
}
