import { EmailCategory, EmailTemplateDef } from '../types';

export const DUBAI_EMAIL_TEMPLATES: EmailTemplateDef[] = [
  {
    id: 'demurrage_waiver',
    title: 'Demurrage & Detention Waiver Request',
    badge: 'Shipping Line / Jebel Ali',
    description: 'Request additional free days or demurrage waiver from shipping line (MSC, Maersk, CMA CGM) due to customs hold.',
    subjectTemplate: 'URGENT: Request for Demurrage / Detention Waiver - BL# {{blNo}} | Container: {{containerNo}}',
    bodyTemplate: `Dear Customer Service & Detention Management Team,

Warm greetings from {{companyName}}.

I am writing regarding the subject shipment currently positioned at DP World Jebel Ali Terminal under Bill of Lading No: {{blNo}}, comprising Container No: {{containerNo}}.

Vessel / Voyage: {{vesselName}}
Discharge Date: {{dischargeDate}}
Last Free Day: {{lastFreeDay}}
Consignee: {{consigneeName}}

We respectfully request a waiver / extension of {{requestedDays}} additional calendar days for detention and demurrage charges for this container. 

The delay was entirely beyond our control due to an unforeseen Dubai Customs Mirsal 2 physical inspection requirement and delay in laboratory sample clearance at Jebel Ali Inspection Center. All customs duty payments and documentation have been processed today.

Given our regular business volume with your esteemed line and the genuine non-commercial cause of this hold, we kindly ask for your management approval to grant this waiver so we may effect smooth gate-out.

We would deeply appreciate your prompt confirmation today to facilitate terminal release.

Best regards,

{{senderName}}
Account Leader - Logistics Operations
{{companyName}} | Dubai, UAE
Mobile: {{senderPhone}} | Email: {{senderEmail}}`,
    defaultVariables: {
      blNo: 'MEDUBL1294829',
      containerNo: 'MEDU7649210',
      vesselName: 'MSC BARI V.2405W',
      dischargeDate: '24-Oct-2026',
      lastFreeDay: '28-Oct-2026',
      requestedDays: '5',
      consigneeName: 'Al Futtaim Logistics Trading LLC',
      companyName: 'Apex Global Logistics Dubai',
      senderName: 'Mathesh M.',
      senderPhone: '+971 50 123 4567',
      senderEmail: 'mathesh@apexlogistics.ae',
    },
    variableHints: {
      blNo: 'Ocean Bill of Lading Number',
      containerNo: 'Container ID (e.g. MSKU..., MEDU...)',
      vesselName: 'Vessel Name and Voyage number',
      dischargeDate: 'Date container was offloaded at Jebel Ali',
      lastFreeDay: 'Official last free day granted on DO',
      requestedDays: 'Number of extra days requested',
      consigneeName: 'Registered consignee in UAE',
    },
  },
  {
    id: 'customs_delay',
    title: 'Dubai Customs Mirsal 2 Inspection Delay',
    badge: 'Client Notification',
    description: 'Politely inform a client that their cargo is flagged for Dubai Customs inspection without causing anxiety.',
    subjectTemplate: 'Shipment Status Update: BL# {{blNo}} - Dubai Customs Inspection Scheduling | {{consigneeName}}',
    bodyTemplate: `Dear {{clientContactName}},

Good day and hope you are having a productive week.

I am writing to provide an operational status update on your inbound ocean shipment arriving under BL No: {{blNo}} (Container: {{containerNo}}).

The container was safely discharged at Jebel Ali Terminal and our clearing team immediately submitted the customs declaration through Dubai Trade Mirsal 2. 

During the automated declaration assessment, the consignment has been routed for a routine Dubai Customs physical inspection / X-ray scan at the terminal inspection bay. Please be assured that this is a standard regulatory procedure applied across random import manifests and all your shipping documents are in full order.

Expected Timeline:
- Inspection Bay Slot: {{inspectionDate}}
- Customs Clearance Clearance & Gate Pass: Expected within 24–36 hours post-inspection
- Scheduled Warehouse Delivery: {{targetDeliveryDate}}

Our ground operations team is actively monitoring the status at Jebel Ali Inspection Area 1 to expedite release as soon as the customs seal is verified. 

We will keep you notified immediately once the Bill of Entry (BOE) green channel pass is issued. Please let me know if you need any further details in the interim.

Warm regards,

{{senderName}}
Account Leader
{{companyName}} | Dubai, UAE
Mobile: {{senderPhone}}`,
    defaultVariables: {
      clientContactName: 'Mr. Tariq Al Mansoori',
      blNo: 'ONEYDXB981240',
      containerNo: 'ONEU9182374',
      consigneeName: 'Al Mansoori General Trading',
      inspectionDate: 'Tomorrow morning, 09:30 AM GST',
      targetDeliveryDate: 'Thursday afternoon, 2:00 PM GST',
      companyName: 'Apex Global Logistics Dubai',
      senderName: 'Mathesh M.',
      senderPhone: '+971 50 123 4567',
    },
    variableHints: {
      clientContactName: 'Client Contact Person Name',
      blNo: 'Bill of Lading Number',
      containerNo: 'Container Number',
      inspectionDate: 'Estimated inspection time slot',
      targetDeliveryDate: 'Target delivery to client warehouse',
    },
  },
  {
    id: 'rate_quotation',
    title: 'Freight Rate Quotation with Port Breakdown',
    badge: 'Sales / Quotation',
    description: 'Send a crystal clear freight rate breakdown in AED including Dubai terminal and customs costs with 5% VAT.',
    subjectTemplate: 'Freight Quotation: {{shipmentType}} from {{originPort}} to Jebel Ali, Dubai | Ref: QT-{{quoteRef}}',
    bodyTemplate: `Dear {{clientContactName}},

Thank you for reaching out to {{companyName}}. We are pleased to submit our comprehensive freight and logistics rate offer for your upcoming shipment:

SHIPMENT PARAMETERS:
- Route: {{originPort}} to Jebel Ali Port (Dubai, UAE)
- Scope: Port to Door Delivery ({{deliveryLocation}})
- Volume / Equipment: {{cargoVolume}} ({{equipmentType}})
- Commodity: {{commodity}}

RATE BREAKDOWN (IN AED):
1. Ocean Freight (Port to Port): AED {{oceanFreightAed}}
2. Jebel Ali Terminal Handling Charges (THC): AED {{thcAed}}
3. Shipping Line Delivery Order (DO) Fee: AED {{doFeeAed}} (at actuals)
4. Dubai Customs Bill of Entry (Mirsal 2): AED 270.00
5. Customs Clearance Professional Fee: AED {{clearanceFeeAed}}
6. Dubai Local Transportation to {{deliveryLocation}}: AED {{transportAed}}
7. UAE VAT (5% applicable on local services): AED {{vatAed}}
-----------------------------------------------------------
ESTIMATED TOTAL (Excl. 5% Customs Duty): AED {{totalAed}}

Notes & Exclusions:
- Standard 5% Dubai Customs Duty on CIF value to be billed as per official Customs Receipt.
- Shipping Line Free Time: 7 Days Demurrage / 7 Days Detention.
- Quotation validity: Valid until {{validUntilDate}} subject to space and vessel schedule.

Please confirm your acceptance of this quote by replying to this email so we can initiate booking placement with the shipping line.

Kind regards,

{{senderName}}
Account Leader - Commercial Freight
{{companyName}} | Dubai, UAE
Direct: {{senderPhone}}`,
    defaultVariables: {
      clientContactName: 'Mr. Rajesh Kumar',
      shipmentType: "1x 40' High Cube FCL",
      originPort: 'Nhava Sheva (JNPT), India',
      deliveryLocation: 'Dubai Industrial City (DIC)',
      cargoVolume: '58 CBM / 18,500 KG',
      equipmentType: "40' HC Container",
      commodity: 'Automotive Spare Parts',
      quoteRef: '2026-DXB-849',
      oceanFreightAed: '4,650.00',
      thcAed: '1,150.00',
      doFeeAed: '650.00',
      clearanceFeeAed: '450.00',
      transportAed: '1,200.00',
      vatAed: '173.50',
      totalAed: '8,273.50',
      validUntilDate: '15-Nov-2026',
      companyName: 'Apex Global Logistics Dubai',
      senderName: 'Mathesh M.',
      senderPhone: '+971 50 123 4567',
    },
    variableHints: {
      clientContactName: 'Client Contact Name',
      originPort: 'Port of Loading',
      deliveryLocation: 'Destination Warehouse in UAE',
      oceanFreightAed: 'Sea freight in AED',
      totalAed: 'Total estimated cost in AED',
    },
  },
  {
    id: 'arrival_notice',
    title: 'Cargo Arrival Notice & DO Collection',
    badge: 'Import Operations',
    description: 'Notify consignee of vessel arrival at Jebel Ali, provide free time details, and request clearance documents.',
    subjectTemplate: 'ARRIVAL NOTICE: Vessel Berthed @ Jebel Ali | BL# {{blNo}} | Consignee: {{consigneeName}}',
    bodyTemplate: `Dear Valued Customer,

Please be advised that the vessel carrying your shipment has arrived and berthed at DP World Jebel Ali Terminal.

SHIPMENT PARTICULARS:
- Master BL No: {{blNo}}
- Container No(s): {{containerNo}}
- Carrying Vessel: {{vesselName}}
- Port of Loading: {{originPort}}
- Discharge Date: {{dischargeDate}}
- Free Time Validity: {{freeDays}} Days (Last Free Day: {{lastFreeDay}})

To ensure timely customs clearance through Dubai Trade and prevent any terminal port storage or detention charges, kindly provide the following documents at your earliest convenience:
1. Endorsed Original Bill of Lading (or Telex Release confirmation)
2. Commercial Invoice with UAE Chamber of Commerce attestation
3. Certificate of Origin (COO)
4. Detailed Packing List
5. Valid UAE VAT TRN Certificate & Import Code

Please remit the applicable Delivery Order (DO) settlement of AED {{doAmountAed}} to our account to enable immediate DO release from the carrier.

Should you require our team to handle full customs clearance and trailer delivery to your premises, please confirm so we can allocate transportation.

Best regards,

{{senderName}}
Import Documentation & Accounts
{{companyName}} | Dubai, UAE
Contact: {{senderPhone}}`,
    defaultVariables: {
      blNo: 'HLCUDXB2948102',
      containerNo: 'HLXU8273615',
      vesselName: 'AL DHAEN V.102W',
      originPort: 'Ningbo, China',
      dischargeDate: '26-Oct-2026',
      freeDays: '7',
      lastFreeDay: '02-Nov-2026',
      doAmountAed: '850.00',
      consigneeName: 'Gulf Star Distribution FZCO',
      companyName: 'Apex Global Logistics Dubai',
      senderName: 'Mathesh M.',
      senderPhone: '+971 50 123 4567',
    },
    variableHints: {
      blNo: 'Ocean Bill of Lading Number',
      containerNo: 'Container ID',
      vesselName: 'Vessel Name',
      originPort: 'Port of Loading',
      lastFreeDay: 'Demurrage cut-off date',
    },
  },
  {
    id: 'warehouse_appointment',
    title: 'Warehouse Offloading & Bay Booking',
    badge: 'Warehouse Logistics',
    description: 'Book or confirm trailer offloading appointment and dock bay with warehouse manager at JAFZA / DIC / Al Quoz.',
    subjectTemplate: 'OFFLOADING APPOINTMENT REQUEST: {{containerNo}} | PO# {{poNo}} | {{warehouseLocation}}',
    bodyTemplate: `Dear Warehouse Operations Team,

Please arrange dock bay scheduling and labour allocation for offloading the incoming container detailed below:

OFFLOADING SPECIFICATIONS:
- Container No: {{containerNo}} ({{equipmentType}})
- Reference / PO No: {{poNo}}
- Shipper / Client: {{clientName}}
- Cargo Summary: {{cargoSummary}}
- Gross Weight: {{grossWeight}} KG | Est. Pallets: {{palletCount}} Pallets
- Target Arrival at Warehouse: {{deliveryDate}} at {{deliveryTimeSlot}}
- Destination Facility: {{warehouseLocation}} (Bay Requested: {{bayRequested}})

DRIVER & VEHICLE DETAILS:
- Haulier / Transporter: {{transporterName}}
- Driver Name: {{driverName}} (Mobile: {{driverPhone}})
- Vehicle / Trailer Plate: {{trailerPlate}}
- Exit Pass / JAFZA Gate E-Pass: Confirmed & Attached

Special Instructions:
- Please verify container bolt seal number ({{sealNo}}) prior to cutting.
- Kindly conduct physical tally sheet counting and generate GRN (Goods Received Note).
- Report any carton dampness or crushing immediately with photographs before destuffing.

Kindly acknowledge receipt and confirm dock bay availability.

Best regards,

{{senderName}}
Account Leader - Operations
{{companyName}} | Dubai, UAE
Mobile: {{senderPhone}}`,
    defaultVariables: {
      containerNo: 'TGHU9283741',
      equipmentType: "40' High Cube",
      poNo: 'PO-2026-4491',
      clientName: 'Emirates Retail Solutions LLC',
      cargoSummary: 'Packed electronics & domestic appliances',
      grossWeight: '14,800',
      palletCount: '24 Pallets (Standard EUR)',
      deliveryDate: 'Tomorrow, 25-Oct-2026',
      deliveryTimeSlot: '10:00 AM - 12:00 PM GST',
      warehouseLocation: 'Logistics Hub 3, Dubai Industrial City (DIC)',
      bayRequested: 'Dock Bay 04',
      transporterName: 'Al Hamra Heavy Transport Dubai',
      driverName: 'Mohammed Rashid',
      driverPhone: '+971 52 987 6543',
      trailerPlate: 'Dubai Plate 48192 (Trailer 7728)',
      sealNo: 'ML-DXB-99281',
      companyName: 'Apex Global Logistics Dubai',
      senderName: 'Mathesh M.',
      senderPhone: '+971 50 123 4567',
    },
    variableHints: {
      containerNo: 'Container ID',
      poNo: 'Purchase Order or Warehouse Inward ref',
      deliveryDate: 'Scheduled delivery date',
      warehouseLocation: 'Warehouse facility name & zone',
      sealNo: 'Customs / Shipping Line bolt seal number',
    },
  },
  {
    id: 'damage_discrepancy',
    title: 'Cargo Discrepancy & Marine Insurance Notice',
    badge: 'Discrepancy / Claims',
    description: 'Formal notification to shipping line, consignee, or warehouse regarding carton damage, seal tampering, or shortage.',
    subjectTemplate: 'FORMAL NOTICE OF CARGO DISCREPANCY & DAMAGE: BL# {{blNo}} | Container: {{containerNo}}',
    bodyTemplate: `Dear Claims & Operations Department,

We write to formally lodge a preliminary notice of cargo discrepancy and physical damage observed during the destuffing of container {{containerNo}} under Bill of Lading No: {{blNo}}.

SHIPMENT DETAILS:
- BL No: {{blNo}}
- Container No: {{containerNo}}
- Carrying Vessel: {{vesselName}}
- Place of Destuffing: {{destuffingLocation}}
- Tally Date & Time: {{tallyDateTime}}

OBSERVED DISCREPANCIES / DAMAGE:
1. {{damageDescription}}
2. Total Units Affected: {{damagedUnitsCount}} cartons out of {{manifestedUnitsCount}} manifested.
3. Condition of Container Seal upon arrival: {{sealCondition}}.

In accordance with maritime transport regulations and the UAE Commercial Maritime Law, this letter serves as our formal notice holding all carriers, stevedores, and handling parties strictly liable for the consequential losses.

We invite your appointed marine surveyor to attend a joint inspection at {{destuffingLocation}} within 24 hours. The damaged goods have been segregated and retained in our quarantine area for official survey inspection.

Photographic evidence and the tally sheet signed by warehouse supervisors and the container driver are attached for your immediate review.

Yours faithfully,

{{senderName}}
Account Leader - Logistics & Cargo Claims
{{companyName}} | Dubai, UAE
Contact: {{senderPhone}}`,
    defaultVariables: {
      blNo: 'MAEU98231456',
      containerNo: 'MRKU8237190',
      vesselName: 'MAERSK MC-KINNEY MOLLER V.2604',
      destuffingLocation: 'JAFZA Free Zone Warehouse Bay 12, Dubai',
      tallyDateTime: '24-Oct-2026 at 11:30 AM GST',
      damageDescription: 'Severe bottom-tier carton crushing and seawater dampness found on 3 rear pallets due to floorboard leakage.',
      damagedUnitsCount: '48 Cartons crushed / 12 Cartons water-stained',
      manifestedUnitsCount: '650 Cartons total',
      sealCondition: 'Original Bolt Seal intact (Seal No: MAEU-77182)',
      companyName: 'Apex Global Logistics Dubai',
      senderName: 'Mathesh M.',
      senderPhone: '+971 50 123 4567',
    },
    variableHints: {
      blNo: 'Bill of Lading Number',
      containerNo: 'Container ID',
      damageDescription: 'Clear factual description of the damage',
      damagedUnitsCount: 'Count of damaged items',
    },
  },
  {
    id: 'payment_reminder',
    title: 'Payment Reminder Before Delivery Order (DO) Release',
    badge: 'Finance / Accounts',
    description: 'Polite but firm request for freight and port charge settlement before releasing original documents or gate pass.',
    subjectTemplate: 'Payment Follow-up: Freight Settlement & DO Release | Invoice# {{invoiceNo}} | BL# {{blNo}}',
    bodyTemplate: `Dear {{financeContactName}},

Greetings from the Finance & Accounts Team at {{companyName}}.

We hope you are having a pleasant day.

We are writing regarding your inbound shipment arriving at Jebel Ali under BL No: {{blNo}} (Container: {{containerNo}}).

To facilitate prompt release of the Shipping Line Delivery Order (DO) and secure the Dubai Customs clearance gate pass before free time expiry on {{freeTimeExpiry}}, kindly confirm payment of the outstanding invoice below:

INVOICE SUMMARY:
- Invoice Reference: INV-{{invoiceNo}}
- Amount Due: AED {{amountDueAed}} (Incl. UAE 5% VAT)
- Services Covered: Ocean Freight, Terminal Handling (THC), Dubai Port DO fee, & Customs processing.

BANK TRANSFER DETAILS:
- Bank Name: Emirates NBD (Dubai Main Branch)
- Account Name: {{companyName}}
- IBAN: AE48 0260 0001 2345 6789 012
- Swift Code: EBILAEADXXX

Kindly forward the bank transfer receipt / swift copy at your earliest convenience. Once verified, our operations team will immediately upload the DO to the Dubai Trade portal and schedule your delivery.

Thank you for your prompt attention and valued partnership.

Warm regards,

{{senderName}}
Account Leader - Client Accounts
{{companyName}} | Dubai, UAE
Mobile: {{senderPhone}}`,
    defaultVariables: {
      financeContactName: 'Accounts Payable Team / Mr. Saleem',
      invoiceNo: '2026-DXB-914',
      blNo: 'CMAU92837410',
      containerNo: 'CMAU7362910',
      freeTimeExpiry: '27-Oct-2026',
      amountDueAed: '11,450.00',
      companyName: 'Apex Global Logistics Dubai',
      senderName: 'Mathesh M.',
      senderPhone: '+971 50 123 4567',
    },
    variableHints: {
      financeContactName: 'Client finance officer or accounts payable',
      invoiceNo: 'Invoice number',
      amountDueAed: 'Total amount due in AED',
      freeTimeExpiry: 'Date when demurrage begins',
    },
  },
];

export function renderEmailTemplate(template: EmailTemplateDef, variables: Record<string, string>): { subject: string; body: string } {
  let subject = template.subjectTemplate;
  let body = template.bodyTemplate;

  Object.entries(variables).forEach(([key, val]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    subject = subject.replace(regex, val || '');
    body = body.replace(regex, val || '');
  });

  return { subject, body };
}
