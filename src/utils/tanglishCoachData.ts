import { SpeakingScenario, TanglishGlossaryItem } from '../types';

export const SPEAKING_SCENARIOS: SpeakingScenario[] = [
  {
    id: 'vessel_delay_client',
    title: 'Explaining Vessel Delay to a Frustrated Client',
    category: 'Client Relations',
    difficulty: 'Intermediate',
    situationTanglish:
      'Client romba tension-ah phone panraanga: "My cargo was supposed to reach yesterday! What is happening?". Direct-ah "Vessel late sir, enna pandrathu" nu solla koodathu. Professional-ah, calm-ah factual reason solli, next action plan tharanum.',
    clientSaysEnglish:
      '"Hello Mathesh, we have a production deadline tomorrow and our container is still not delivered! Why was I not informed earlier about this delay?"',
    recommendedEnglish:
      'Good morning Mr. Tariq. I completely understand your urgency and I sincerely appreciate you bringing this to my immediate attention. Due to heavy vessel berthing congestion at Jebel Ali Terminal 2, port authorities rescheduled the vessel discharge by 18 hours. The positive update is that the vessel safely berthed this morning at 6:00 AM, and our customs team has already pre-filed your Mirsal 2 declaration. We have our dedicated trailer on standby to pull the container as soon as the terminal releases it tomorrow morning. I am personally tracking this shipment and will send you a live milestone update every two hours.',
    tanglishExplanation:
      'Ippadi pesum pothu 3 steps follow panrom: (1) First "I completely understand your urgency" nu avanga frustration-ai acknowledge panrom. (2) Reason solrom: "vessel berthing congestion at Jebel Ali Terminal" - idhu port authority decision nu puriyum. (3) Solution: "pre-filed Mirsal 2" and "dedicated trailer on standby". Client-ku namma control-la irukkom nu confidence varum.',
    whyThisWorks:
      'Converts client panic into trust by showing proactive control, official logistics reasons (port berthing congestion), and an immediate update commitment.',
    alternatives: [
      'Short phone call version: "Mr. Tariq, I understand the critical deadline. The vessel berthed at Jebel Ali early this morning after a short port delay. Our clearing team is on-site and we are expediting the gate-out for first thing tomorrow."',
      'Escalation tone: "We have prioritized your container with DP World operations to ensure immediate discharging and zero dwell time."',
    ],
    dubaiProTip:
      'Dubai-la clients always value transparency. Mirsal 2 declaration number and vessel berthing time sonna client will realize you are actively working on it.',
    keyVocabulary: [
      { term: 'Berthing congestion', meaningTanglish: 'Kappal port-la vandhu nirka edam illama wait panra delay.' },
      { term: 'Pre-filed declaration', meaningTanglish: 'Vessel varathukku munnadiye Dubai Trade portal-la customs file panniyachu.' },
      { term: 'Dwell time', meaningTanglish: 'Container port terminal-la wait panra total hours/days.' },
      { term: 'Dedicated trailer', meaningTanglish: 'Vera evanukum koodukama, ungalukku mattum assign panna exclusive truck.' },
    ],
  },
  {
    id: 'shipping_line_do_followup',
    title: 'Calling Shipping Line for Urgent Delivery Order (DO)',
    category: 'Shipping Lines',
    difficulty: 'Intermediate',
    situationTanglish:
      'Shipping line counter (Maersk / MSC / CMA CGM) kitta call panrom. Payment panniyachu, bank swift receipt upload panniyachu, aana DO release aagala. Cut-off time 3:00 PM GST. Polite-ah but urgent push pannanum.',
    clientSaysEnglish:
      '"Customer service, MSC Dubai. How may I assist you with your booking or documentation?"',
    recommendedEnglish:
      'Good afternoon, this is Mathesh calling from Apex Logistics Dubai. I am following up on the urgent Delivery Order release for Bill of Lading MEDUBL1294829, container MEDU7649210. We submitted the endorsed OBL and processed the online payment through Dubai Trade this morning at 10:15 AM. Reference payment number is DT-88291. Since our driver is scheduled at the Jebel Ali gate before the 3:00 PM terminal cut-off, could you kindly expedite the counter approval and release the electronic DO on the portal? We have only 2 free days remaining and want to avoid demurrage.',
    tanglishExplanation:
      'Shipping line customer care kitta direct-ah "urgent sir" nu mattum solla koodathu. Reference number (BL, Container, Dubai Trade Payment ID) clear-ah ready-ah vechitu pesanum. "Our driver is scheduled before 3 PM cut-off" nu deadline sonna avanga internal team escalate panni click pannuvaanga.',
    whyThisWorks:
      'Provides exact payment transaction ID, mentions driver at the gate, and notes demurrage free-time risk, prompting instant counter authorization.',
    alternatives: [
      'Counter follow-up: "Could you kindly check payment batch DT-88291? We have satisfied all detention deposits and need the e-DO pushed to Dubai Trade immediately."',
      'Gentle pressure: "If possible, could you please escalate this to your documentation supervisor so we can clear before the weekend cut-off?"',
    ],
    dubaiProTip:
      'Dubai Trade portal-la payment panna aparam, shipping lines-ku 1 to 2 hours edukkum DO approve panna. Always have the Dubai Trade Transaction ID handy before calling.',
    keyVocabulary: [
      { term: 'Delivery Order (DO)', meaningTanglish: 'Shipping line thara official order letter. Idhu irundha thaan port-la container release pannuvaanga.' },
      { term: 'Endorsed OBL', meaningTanglish: 'Original Bill of Lading-la consignee seal & sign potta copy.' },
      { term: 'Terminal cut-off', meaningTanglish: 'DP World gate or documentation close aagura kadaisi time.' },
      { term: 'Electronic DO (e-DO)', meaningTanglish: 'Dubai Trade portal-la paperless-ah release panra digital clearance token.' },
    ],
  },
  {
    id: 'volumetric_vs_gross_weight',
    title: 'Explaining Chargeable Weight vs Gross Weight',
    category: 'Client Relations',
    difficulty: 'Advanced',
    situationTanglish:
      'Client invoice paathutu shock aagi call panraanga: "My cargo is only 200 kg! Why did you bill me for 650 kg air freight?". IATA Volumetric rule (1:6000) concept-ai Tanglish logic-la client-ku soft-ah explain pannanum.',
    clientSaysEnglish:
      '"Why am I being charged for 650 kg? Your quote said 200 kg! This looks like an overcharge on my account."',
    recommendedEnglish:
      'Thank you for raising this question Mr. Ramesh, and I am very glad to clarify how airlines calculate freight charges. In international air freight, airlines charge based on "Chargeable Weight", which is the higher value between actual gross weight on the scale and volumetric weight. Your cargo actual weight is indeed 200 kg. However, because the cargo consists of 15 large lightweight packaging boxes measuring 80 by 60 by 70 centimeters each, it occupies substantial physical space inside the aircraft cargo hold. Under standard IATA regulations, dividing the cubic centimeters by 6000 yields a volumetric weight of 650 kg. Because the airline allocates cargo hold space that could otherwise carry 650 kg, the carrier bills on volume. I have attached the airline airway bill manifest showing this exact calculation for your records.',
    tanglishExplanation:
      'Client-ku doubt varum pothu defensive aaga koodathu. "Thank you for asking, let me clarify" nu start panrom. Example: Cotton candy vs Iron. Aeroplane-la edam perusa pidicha airline adhigam charge pannum. "IATA international standard regulation" nu sonna avangaluku puriyum idhu namma potta rate illa, global airline rule nu.',
    whyThisWorks:
      'Educates the client politely with transparent IATA standards, demonstrates that the Account Leader is competent and honest, and prevents pricing disputes.',
    alternatives: [
      'Simple analogy: "Just like 100 kg of cotton takes up more room in a plane than 100 kg of steel, airlines must charge for the space occupied when volume exceeds scale weight."',
      'Quick recap: "Your actual scale weight is 200 kg, but the aircraft space used equates to 650 kg under the IATA 1:6000 ratio."',
    ],
    dubaiProTip:
      'DXB and DWC air freight shipments-la always quote in advance: "Rate is per kg chargeable weight, whichever is higher (Gross vs Volumetric)". This prevents 99% of invoice disputes.',
    keyVocabulary: [
      { term: 'Chargeable Weight', meaningTanglish: 'Gross weight & Volumetric weight rendu-la ethu perusa irukko adha vechu calculate panra weight.' },
      { term: 'IATA ratio (1:6000)', meaningTanglish: 'Air freight global formula: (L x W x H in cm) / 6000.' },
      { term: 'Cargo hold capacity', meaningTanglish: 'Vimanaathula luggage & cargo vekka irukira physical space.' },
      { term: 'Airway Bill (AWB)', meaningTanglish: 'Air freight shipping contract document (sea-ku BL maadhiri).' },
    ],
  },
  {
    id: 'driver_bay_dispatch',
    title: 'Directing a Heavy Truck Driver to Warehouse Bay',
    category: 'Warehouse & Drivers',
    difficulty: 'Beginner',
    situationTanglish:
      'Trailer driver phone pandraaru: "Bhai, main Dubai Industrial City pahunch gaya, kidhar lagana gaadi?". Driver kitta clear-ah gate pass, bay number, and safety helmet instructions English/Urdu mix-la puriyara maadhiri sollanum.',
    clientSaysEnglish:
      '"Hello sir, I have reached DIC warehouse gate. Security is asking for bay pass and job order. Where should I park the trailer?"',
    recommendedEnglish:
      'Hello Rashid. Please show Security the electronic Gate Pass number GP-9482 on your phone and report to Logistics Hub 3. Go straight past the weighbridge and park at Dock Bay Number 04. Please do not cut the container bolt seal yourself. Wait for Warehouse Supervisor Mr. Anwar to check the seal number ML-DXB-99281 and sign your delivery tally sheet. Please remember to wear your safety shoes and high-visibility safety vest before entering the loading apron. Call me back once you are docked.',
    tanglishExplanation:
      'Drivers kitta romba complex English thevai illa. Clear checklist: (1) Gate Pass number (2) Weighbridge & Dock Bay number (3) Romba mukkiyam: "Do not cut the seal" - supervisor paarkaama seal cut panna customs / client dispute aagidum! (4) Safety PPE rules (Dubai Municipality requirement).',
    whyThisWorks:
      'Prevents unsealed cargo discrepancies, ensures warehouse safety compliance, and directs the truck straight to the assigned dock.',
    alternatives: [
      'Short SMS/WhatsApp text to driver: "Rashid, park at DIC Hub 3, Dock Bay 04. Do NOT cut seal. Wait for supervisor Anwar with seal ML-DXB-99281. Wear safety shoes."',
      'Security guard briefing: "Security officer, container 7728 has arrived for Bay 4 offloading. Please verify driver Emirates ID and permit entry."',
    ],
    dubaiProTip:
      'Dubai-la warehouse safety inspection romba strict. Drivers must wear High-Vis Vest and Safety Shoes in JAFZA and DIC, otherwise 500 AED warehouse fine potruvanga.',
    keyVocabulary: [
      { term: 'Dock Bay', meaningTanglish: 'Truck container back panni warehouse ulla cargo irakkura loading door.' },
      { term: 'Bolt Seal', meaningTanglish: 'Container lock panni irukira heavy metal seal. Idhai cut panna seal number match aaganum.' },
      { term: 'Weighbridge', meaningTanglish: 'Lorry weight paakura periya tharaas/scale entry gate-la.' },
      { term: 'Loading apron', meaningTanglish: 'Warehouse bay munnadi trucks turn panni park panra concrete area.' },
    ],
  },
  {
    id: 'freight_negotiation_carrier',
    title: 'Negotiating Freight Rates with Shipping Line Rep',
    category: 'Negotiation',
    difficulty: 'Advanced',
    situationTanglish:
      'Shipping line account manager kitta rate discount kettu pesurom. Namma client 20 containers per month koduppaanga. Direct-ah "kammi pannunga" nu kekkama, volume commitment koduthu targeted rate vaangurathu.',
    clientSaysEnglish:
      '"Our spot freight rate for 40HC from Ningbo to Jebel Ali is currently USD 2,450 all-in. Market is very tight this week."',
    recommendedEnglish:
      'Good morning Sarah, thank you for sharing the market update. We have a regular contract client moving approximately 20 to 25 forty-foot High Cube containers monthly on this exact Ningbo to Jebel Ali corridor. While we appreciate the current market tightness, competitor lines are offering USD 2,200 with 14 days combined demurrage and detention. If you can support us with a competitive rate of USD 2,250 all-in with 10 days free time at Jebel Ali, I am prepared to confirm the initial allocation of 8 containers with your line on next week\'s sailing. Can you secure this for us on this volume?',
    tanglishExplanation:
      'Negotiation-la 3 golden points: (1) Volume commitment solrom: "20 to 25 containers monthly". (2) Benchmark rate solrom: "Competitor is offering 2200 with 14 days free time". (3) Immediate incentive: "I can confirm 8 containers next week itself". Shipping lines love guaranteed bookings!',
    whyThisWorks:
      'Uses volume leverage, competitor benchmarking, and an immediate booking commitment to secure both freight savings and extra free days.',
    alternatives: [
      'Free-time focus: "If the ocean freight rate of USD 2,350 is firm, can you at least grant us 14 days combined free time at Jebel Ali to offset our client\'s local clearance risk?"',
      'Follow-up close: "Let me have your written rate filing by 2 PM so I can lock the shipper\'s shipping order today."',
    ],
    dubaiProTip:
      'Dubai-la freight rate mattum mukkiyam illa; "Free Time at Jebel Ali" is equally valuable. 14 days free time saves thousands of Dirhams in demurrage if customs has any delay.',
    keyVocabulary: [
      { term: 'Spot rate', meaningTanglish: 'Innaiku irukkura instant market ocean freight rate (contract rate illa).' },
      { term: 'All-in rate', meaningTanglish: 'Freight + BAF (bunker fuel) + security charges ellam serndha total rate.' },
      { term: 'Combined free time', meaningTanglish: 'Port demurrage + Shipping line detention serthu kodukkira free days.' },
      { term: 'Sailing allocation', meaningTanglish: 'Adutha ship-la namakku reserve panni vecha container spaces.' },
    ],
  },
  {
    id: 'customs_hold_reassurance',
    title: 'Reassuring Client During Customs Mirsal 2 Hold',
    category: 'Customs & Port',
    difficulty: 'Intermediate',
    situationTanglish:
      'Dubai Customs declaration potta udane "Inspection Hold" aagiduchu. Client tension aagi "Enna prachana?" nu kepaanga. Legal/customs terms bayamillama, routine process nu explain pannanum.',
    clientSaysEnglish:
      '"Mathesh, I received an SMS saying our consignment has a Customs Inspection Hold at Jebel Ali. Did something go wrong with our paperwork?"',
    recommendedEnglish:
      'Please do not worry Mr. Khalid, everything with your paperwork is 100% compliant and in order. In Dubai Customs, the Mirsal 2 automated risk engine randomly routes a percentage of import declarations for physical cargo verification or terminal X-ray scanning. This is a routine regulatory compliance check and does not indicate any issue with your invoices or HS codes. Our licensed customs broker is currently at Jebel Ali Inspection Bay 2 with the original delivery order. As soon as the inspection officer signs off the inspection tally, the customs Bill of Entry green channel will clear automatically. I expect this to be completed by early afternoon, with zero impact on our final delivery schedule.',
    tanglishExplanation:
      'Client "Customs Hold" nu kettadhum criminal case or fine nu bayanthuruvanga. So: "Please do not worry, your paperwork is 100% compliant" nu first line-laye relief tharanum. Aparam "random risk assessment scan" nu clear panni, "our broker is on-site" nu action sollanum.',
    whyThisWorks:
      'Immediately eliminates client anxiety, explains Dubai Customs automated routine inspection, and confirms on-site broker presence.',
    alternatives: [
      'Quick update: "This is a standard Mirsal 2 routine scan at Jebel Ali. Our broker is already at the bay and we expect release by 2:00 PM today."',
      'Written email version: "We confirm that container ONEU9182374 is undergoing routine customs inspection. All documentation has been validated with no fines or penalties."',
    ],
    dubaiProTip:
      'Dubai Trade Mirsal 2 has Green Channel (instant automated release), Yellow Channel (document check), and Red Channel (physical/X-ray inspection). Explaining this reassures clients.',
    keyVocabulary: [
      { term: 'Mirsal 2', meaningTanglish: 'Dubai Customs-oda official electronic clearance system.' },
      { term: 'Bill of Entry (BOE)', meaningTanglish: 'Customs duty katti pass vaangura official customs receipt.' },
      { term: 'HS Code', meaningTanglish: 'Harmonized System Code - unga product-ku customs potta 8-digit international tax number.' },
      { term: 'Green Channel', meaningTanglish: 'Endha inspection-um illama direct-ah clear aagura fast track.' },
    ],
  },
  {
    id: 'warehouse_damage_tally',
    title: 'Reporting Container Cargo Damage to Client',
    category: 'Warehouse & Drivers',
    difficulty: 'Advanced',
    situationTanglish:
      'Warehouse-la container open panraanga. Ulla 30 cartons crush aagi, water leak aagi irukku. Client kitta idha inform panni, photos eduthu, insurance surveyor koopda sollanum.',
    clientSaysEnglish:
      '"Hi Mathesh, has the offloading finished for our container at the Dubai Industrial City warehouse?"',
    recommendedEnglish:
      'Hello Mr. Sunil. Offloading is currently underway at DIC Bay 3, and I wanted to proactively bring an important matter to your attention. While opening container MRKU8237190, our warehouse supervisor noted that although the shipping line bolt seal was intact, the bottom tier of cargo on two rear pallets suffered carton crushing and moisture ingress. We have immediately stopped destuffing that specific section and quarantined 35 affected cartons. Our team has taken high-resolution photographs with time stamps and noted this discrepancy on the official GRN tally sheet signed by the driver. We recommend notifying your marine cargo insurance underwriters right away to schedule a joint survey, and we are holding all damaged packaging for inspection.',
    tanglishExplanation:
      'Damage irundha marakka koodathu. Transparent-ah sollanum. But highlight panna vendiya details: (1) Bolt seal intact (so driver thirudala, transit-la aagirukku). (2) Quarantined affected goods. (3) Photos eduthachu + Tally sheet-la driver signature vaangiyachu. (4) Insurance surveyor-ku call panna solrom.',
    whyThisWorks:
      'Protects legal claims rights, documents driver endorsement before truck leaves, and follows standard UAE marine insurance protocol.',
    alternatives: [
      'Urgent call: "Mr. Sunil, we detected dampness in 35 cartons during destuffing. We have secured the cargo, documented photographic proof, and endorsed the delivery tally for your insurance claim."',
      'Survey request: "We request your surveyor to attend Bay 3 before 4 PM today so we can conclude the joint damage inspection."',
    ],
    dubaiProTip:
      'Once a truck leaves the warehouse gate without driver signature on the damage tally, insurance companies in UAE will reject the claim! Always get the driver signature immediately on GRN.',
    keyVocabulary: [
      { term: 'Moisture ingress', meaningTanglish: 'Container thara or roof vazhiya thanni kothu cargo nananjathu.' },
      { term: 'Quarantine area', meaningTanglish: 'Damage aana porulai nalla porul kooda mix aagama thaniya vekkira safety zone.' },
      { term: 'Joint Survey', meaningTanglish: 'Insurance company aalu, warehouse supervisor, and shipping line aalu serndhu inspect panrathu.' },
      { term: 'Delivery tally sheet', meaningTanglish: 'Warehouse-la irakkum pothu box box-ah count panni sign panra official sheet.' },
    ],
  },
  {
    id: 'overdue_payment_obl',
    title: 'Overdue Payment Follow-up Before Releasing DO',
    category: 'Client Relations',
    difficulty: 'Intermediate',
    situationTanglish:
      'Client DO kekkuraanga, aana past invoice 15,000 AED innum varala. Direct-ah "kaasu tharamudiyathu" nu sollaama, diplomatic-ah policy solli payment vaangurathu.',
    clientSaysEnglish:
      '"Mathesh, please release the Delivery Order on Dubai Trade immediately. Our truck is waiting and we will settle the invoice next week as usual."',
    recommendedEnglish:
      'Good afternoon Mr. Vikram. I appreciate your call and our team has already completed the clearance documentation for your shipment. However, our finance compliance policy requires receipt of settlement for outstanding Invoice INV-849 prior to the electronic release of the Delivery Order. I know your transport is already scheduled, so to avoid any gate delays or port demurrage, if your accounts team can share the bank swift transfer confirmation or proof of payment by 1:00 PM, I will obtain special management dispensation to push the DO release on Dubai Trade immediately. I am on standby to ensure your driver picks up without delay.',
    tanglishExplanation:
      'Ippadi pesum pothu: "I am not refusing, my company finance compliance policy requires this" nu company policy mela vechitu, "If you send swift copy by 1 PM, I will get management approval" nu solution kodukrom. Idhanala client manasu novama payment-um seekiram varum.',
    whyThisWorks:
      'Maintains professional warmth while protecting company cash flow, providing a win-win path via swift copy approval.',
    alternatives: [
      'Firm email: "We are ready to release your DO immediately upon receipt of the bank transfer slip for AED 15,400. Thank you for your usual cooperation."',
      'Urgent mobile call: "Mr. Vikram, to prevent demurrage today, kindly have finance WhatsApp me the swift confirmation so I can authorize the DO right away."',
    ],
    dubaiProTip:
      'In UAE freight forwarding, releasing Delivery Order or Original BL without payment settlement transfers full commercial liability to the Account Leader. Always ask for swift copy first.',
    keyVocabulary: [
      { term: 'Management dispensation', meaningTanglish: 'Boss kitta special approval vaangi exception tharathu.' },
      { term: 'Swift transfer copy', meaningTanglish: 'Bank-la transfer panni mudicha official payment receipt / reference screenshot.' },
      { term: 'Credit limit', meaningTanglish: 'Client-ku company kodutha maximum unpaid amount & days threshold.' },
    ],
  },
];

export const DUBAI_LOGISTICS_GLOSSARY: TanglishGlossaryItem[] = [
  {
    term: 'Demurrage',
    category: 'Port & Terminal',
    meaningEnglish: 'Charges levied when container remains inside the port terminal beyond granted free days.',
    tanglishExplanation: 'Container port terminal (DP World Jebel Ali) kulla free days thaandi ninnu irundha port/line podura fine penalty.',
    exampleSentence: 'We requested 14 days free time to avoid heavy demurrage charges at Jebel Ali.',
  },
  {
    term: 'Detention',
    category: 'Equipment',
    meaningEnglish: 'Charges applied when the empty container is not returned to shipping line depot on time after port gate-out.',
    tanglishExplanation: 'Port-la irundhu container-ai veliya eduthutu poitu, empty container-ai thirumba depot-la thara late aana podura charge.',
    exampleSentence: 'Make sure the trailer returns the empty box to JAFZA depot today to prevent detention.',
  },
  {
    term: 'Delivery Order (DO)',
    category: 'Documentation',
    meaningEnglish: 'Document issued by shipping carrier releasing cargo custody to the named consignee or forwarder.',
    tanglishExplanation: 'Shipping line thara official letter. Idhu irundha thaan port authority container-ai unga truck-ku veliya viduvaanga.',
    exampleSentence: 'Once the freight invoice is paid, the carrier releases the electronic DO on Dubai Trade.',
  },
  {
    term: 'Bill of Entry (BOE)',
    category: 'Dubai Customs',
    meaningEnglish: 'Official declaration document generated through Dubai Customs Mirsal 2 verifying duty and cargo clearance.',
    tanglishExplanation: 'Dubai Customs-la 5% duty katti, customs officer approve panni thara official green pass receipt.',
    exampleSentence: 'The customs broker received the cleared Bill of Entry with green channel status.',
  },
  {
    term: 'THC (Terminal Handling Charges)',
    category: 'Port Charges',
    meaningEnglish: 'Charges paid to the port authority for crane handling, stevedoring, and container movement.',
    tanglishExplanation: 'Port-la crane vechu container-ai ship-la irundhu irakka DP World vaangura handling fees.',
    exampleSentence: 'Jebel Ali THC is charged at actuals as per DP World tariff.',
  },
  {
    term: 'LCL (Less than Container Load)',
    category: 'Freight Mode',
    meaningEnglish: 'Cargo shipment where multiple shippers share space in a single ocean container.',
    tanglishExplanation: 'Periya container thevai illama, 2 or 5 CBM mattum irukkura chinna cargo-va vera aalunga kooda share panni anuppurathu.',
    exampleSentence: 'For 6 CBM, booking LCL consolidation is much cheaper than booking a full 20ft container.',
  },
  {
    term: 'FCL (Full Container Load)',
    category: 'Freight Mode',
    meaningEnglish: 'An entire container dedicated to a single shipper or consignee.',
    tanglishExplanation: 'Orutharukke full 20ft or 40ft container exclusive-ah book panni anuppurathu.',
    exampleSentence: 'We moved 5 FCL containers from Shanghai to Jebel Ali on Maersk.',
  },
  {
    term: 'Mirsal 2',
    category: 'Dubai Systems',
    meaningEnglish: 'Dubai Customs state-of-the-art electronic customs declaration clearance system.',
    tanglishExplanation: 'Dubai Customs-oda official software system. Idhula thaan Dubai-la ella import, export, freezone transit declarations file aagum.',
    exampleSentence: 'Our broker pre-cleared the cargo on Mirsal 2 before vessel berthing.',
  },
  {
    term: 'Cross-docking',
    category: 'Warehouse',
    meaningEnglish: 'Unloading cargo from inbound truck and directly loading onto outbound vehicle with minimal storage.',
    tanglishExplanation: 'Warehouse rack-la adukki vekkama, oru truck-la irandhu irakki udane adutha delivery van-la mathi anuppurathu.',
    exampleSentence: 'We performed cross-docking at our Al Quoz warehouse for immediate delivery to Abu Dhabi.',
  },
  {
    term: 'Transshipment',
    category: 'Shipping',
    meaningEnglish: 'Cargo transferred from one mother vessel to another feeder vessel at an intermediate port.',
    tanglishExplanation: 'Direct ship illama, Jebel Ali port-la cargo-va mathi innoru chinna ship-la Dammam or Doha-ku anuppurathu.',
    exampleSentence: 'Jebel Ali is the biggest transshipment hub connecting Asia to Africa and the GCC.',
  },
];
