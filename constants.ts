
import { DaySchedule, ChecklistItem, LocationDetail, UsefulLink, EmergencyContact } from './types';

// 極致安全的環境變數讀取
const getEnvUrl = () => {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      return (import.meta as any).env.VITE_APP_SCRIPT_URL;
    }
  } catch (e) {
    // 忽略錯誤
  }
  return null;
};

export const GOOGLE_SCRIPT_URL = getEnvUrl() || 'https://script.google.com/macros/library/d/1JqnXlruwn9z3Of-vlP_Y2yRMC1eRs9NoCmP_AsL7DIfS_LOSW_0BoSAM/1';
export const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1g56zj7vPeU1t8vPkr3QoqR1pedwT9RhbIdEmxLdAynI/edit?gid=1478645828#gid=1478645828';

export const PRE_TRIP_NOTES = [
  "印度簽證 (e-Visa) 需列印紙本備查",
  "氣溫炎熱 (30-35°C)，注意防曬與補充水分",
  "絕對飲用瓶裝水，避免路邊生食或切好的水果",
  "火車誤點為常態，行程保留彈性，手機安裝 IRCTC/Ixigo",
  "攜帶腸胃藥、止痛藥與防蚊液 (登革熱預防)",
  "進入寺廟通常需要脫鞋，建議穿著易穿脫的涼鞋"
];

export const TODO_LIST: ChecklistItem[] = [
  { id: 'todo_1', text: '申請印度電子簽證 (e-Visa)' },
  { id: 'todo_2', text: '網卡 (Airtel/Jio) 或開漫遊' },
  { id: 'todo_3', text: '預約機場接送 / 下載 Uber & Ola' },
  { id: 'todo_4', text: '換少量美金或盧比 (大部分用 ATM 提款)' },
  { id: 'todo_5', text: '列印火車票與住宿憑證 (部分車站需查驗)' },
];

export const PACKING_CARRY_ON: ChecklistItem[] = [
  { id: 'co_1', text: '護照、簽證列印本、機票' },
  { id: 'co_2', text: '行動電源 (火車長途必備)' },
  { id: 'co_3', text: '常備藥品 (胃藥、益生菌、感冒藥)' },
  { id: 'co_4', text: '錢包 (信用卡、美金)' },
  { id: 'co_5', text: '保濕噴霧 / 乾洗手' },
  { id: 'co_7', text: '頸枕 (紅眼班機/火車用)' },
];

export const PACKING_CHECKED: ChecklistItem[] = [
  { id: 'ch_1', text: '透氣棉麻衣物 (長裙/長褲進廟用)' },
  { id: 'ch_2', text: '薄外套 (火車/飛機冷氣強)' },
  { id: 'ch_3', text: '遮陽帽、太陽眼鏡' },
  { id: 'ch_5', text: '好走的涼鞋/運動鞋' },
  { id: 'ch_6', text: '防蚊液、防曬乳 (消耗量大)' },
  { id: 'ch_7', text: '萬用轉接頭 (Type D/M 圓孔)' },
  { id: 'ch_8', text: '衛生紙/濕紙巾 (極度重要)' },
];

export const USEFUL_LINKS: UsefulLink[] = [
  { title: 'Indian Visa Online', url: 'https://indianvisaonline.gov.in/evisa/tvoa.html' },
  { title: 'IRCTC 火車訂票', url: 'https://www.irctc.co.in/' },
  { title: 'Ixigo Trains App', url: 'https://www.ixigo.com/trains' },
  { title: 'Uber India', url: 'https://www.uber.com/in/en/' },
  { title: 'Kerala Tourism', url: 'https://www.keralatourism.org/' },
  { title: 'Incredible India', url: 'https://www.incredibleindia.org/' },
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { title: '全台緊急求助', number: '112' },
  { title: '警察', number: '100' },
  { title: '救護車', number: '102' },
  { title: '駐印度代表處', number: '+91-11-2614-7464' },
];

export const JAPANESE_PHRASES = [
  {
    category: 'Hindi (北印/通用)',
    vocab: [
      { jp: 'Namaste', cn: '你好 (納瑪斯泰)' },
      { jp: 'Dhanyavaad', cn: '謝謝 (達尼亞瓦)' },
      { jp: 'Haan / Nahi', cn: '是 / 不是' },
      { jp: 'Kitna hai?', cn: '多少錢？' },
      { jp: 'Paani', cn: '水' },
      { jp: 'Chalo', cn: '走吧' },
      { jp: 'Bas', cn: '夠了/停' },
      { jp: 'Acha', cn: '好/OK' },
    ],
    sentences: [
      { jp: 'Yeh kitne ka hai?', cn: '這個多少錢？' },
      { jp: 'Spicy nahi chahiye.', cn: '不要辣。' },
    ]
  },
  {
    category: 'Malayalam (喀拉拉邦)',
    vocab: [
      { jp: 'Namaskaram', cn: '你好' },
      { jp: 'Nanni', cn: '謝謝' },
      { jp: 'Vellam', cn: '水' },
      { jp: 'Sheri', cn: '好/OK' },
    ],
    sentences: []
  }
];

export const LOCATION_DETAILS: Record<string, LocationDetail> = {
  'safire_residency': {
    id: 'safire_residency',
    title: 'Safire Residency',
    description: '位於 Trivandrum 的便利住宿，靠近 Aristo Junction。',
    address: '25/992 Aristo Junction, Thycaud, Trivandrum',
    mapUrl: 'https://maps.google.com/?q=Safire+Residency+Trivandrum',
    reservation: {
      id: 'NT282',
      sections: [{ title: '住宿資訊', items: [{ label: '費用', value: '801 rs' }] }]
    }
  },
  'padmanabhaswamy': {
    id: 'padmanabhaswamy',
    title: 'Sree Padmanabhaswamy Temple',
    description: '世界上最富有的寺廟，供奉毗濕奴神。非印度教徒可能無法進入核心區域，需著傳統服裝。',
    openingHours: '03:30–07:20, 08:30–11:00, 17:00–19:30',
    mapUrl: 'https://maps.google.com/?q=Sree+Padmanabhaswamy+Temple'
  },
  'hostel_stories': {
    id: 'hostel_stories',
    title: 'The Hostel Stories',
    description: '位於 Varkala Helipad Road，氣氛輕鬆的背包客棧，離懸崖海灘很近。',
    address: 'Varkala - Helipad Road, Varkala',
    mapUrl: 'https://maps.google.com/?q=The+Hostel+Stories+Varkala',
    reservation: {
      id: 'NT301',
      sections: [{ title: '住宿資訊', items: [{ label: '費用', value: '855 rs' }] }]
    }
  },
  'varkala_cliff': {
    id: 'varkala_cliff',
    title: 'Varkala Cliff & Beach',
    description: '著名的紅色懸崖海灘，懸崖上有許多餐廳與商店，日落景色絕美。',
    mapUrl: 'https://maps.google.com/?q=Varkala+Cliff'
  },
  'bastian_homestay': {
    id: 'bastian_homestay',
    title: 'Bastian Homestay',
    description: 'Kochi 柯钦堡的民宿，體驗當地家庭生活。',
    address: 'Fort Kochi',
    mapUrl: 'https://maps.google.com/?q=Bastian+Homestay+Kochi',
    reservation: {
      id: 'NT599',
      sections: [{ title: '住宿資訊', items: [{ label: '費用', value: '1701 rs' }] }]
    }
  },
  'kochi_nets': {
    id: 'kochi_nets',
    title: 'Chinese Fishing Nets',
    description: '柯钦堡的標誌性景觀，古代中國傳入的捕魚方式，夕陽下剪影迷人。',
    mapUrl: 'https://maps.google.com/?q=Chinese+Fishing+Nets+Kochi'
  },
  'kathakali': {
    id: 'kathakali',
    title: 'Kathakali Centre',
    description: '欣賞喀拉拉邦傳統舞蹈 Kathakali，包含化妝過程展示。',
    websiteUrl: 'https://www.keralakathakali.com/',
    openingHours: '17:00 - 21:00'
  },
  'hotel_eden_palace': {
    id: 'hotel_eden_palace',
    title: 'Hotel Eden Palace',
    description: 'Thrissur 的住宿點。',
    reservation: {
      id: 'NT488',
      sections: [{ title: '住宿資訊', items: [{ label: '費用', value: '1387 rs' }] }]
    }
  },
  'ktdc_folk_land': {
    id: 'ktdc_folk_land',
    title: 'KTDC Folk Land',
    description: '位於 Parassinikadavu 的政府營運飯店。',
    reservation: {
      id: 'NT444',
      sections: [{ title: '住宿資訊', items: [{ label: '費用', value: '1260 rs' }] }]
    }
  },
  'guruvayur': {
    id: 'guruvayur',
    title: 'Guruvayur Sri Krishna Temple',
    description: '重要的克里希納神廟，亦有大象營 Punnathur Kotta。',
    mapUrl: 'https://maps.google.com/?q=Guruvayur+Temple'
  },
  'hotel_swadesh': {
    id: 'hotel_swadesh',
    title: 'Hotel Swadesh Heritage',
    description: 'Udupi 的住宿選擇。',
    reservation: {
      id: 'NT670',
      sections: [{ title: '住宿資訊', items: [{ label: '費用', value: '1900 rs' }] }]
    }
  },
  'murudeshwar_temple': {
    id: 'murudeshwar_temple',
    title: 'Shri Murudeshwara Shiva Temple',
    description: '擁有世界第二高的濕婆神像，位於海濱，景觀壯麗。',
    mapUrl: 'https://maps.google.com/?q=Murudeshwar+Temple'
  },
  'moonstar_guesthouse': {
    id: 'moonstar_guesthouse',
    title: 'Moonstar Guesthouse',
    description: 'Murudeshwar 的住宿。',
    reservation: {
      id: 'NT317',
      sections: [{ title: '住宿資訊', items: [{ label: '費用', value: '900 rs' }] }]
    }
  },
  'gokarna_beaches': {
    id: 'gokarna_beaches',
    title: 'Gokarna & Kudle Beach',
    description: 'Gokarna 擁有神聖的 Mahabaleshwar 廟宇以及美麗的 Kudle Beach、Om Beach。',
    mapUrl: 'https://maps.google.com/?q=Kudle+Beach'
  },
  'katyayani_residency': {
    id: 'katyayani_residency',
    title: 'Katyayani Residency',
    description: 'Gokarna 的住宿。',
    reservation: {
      id: 'NT629',
      sections: [{ title: '住宿資訊', items: [{ label: '費用', value: '1784 rs' }] }]
    }
  },
  'peaceful_guesthouse': {
    id: 'peaceful_guesthouse',
    title: 'Peaceful Guest House',
    description: 'Goa 的住宿。',
    reservation: {
      id: 'NT905',
      sections: [{ title: '住宿資訊', items: [{ label: '費用', value: '2570 rs' }] }]
    }
  },
  'dudhsagar': {
    id: 'dudhsagar',
    title: 'Dudhsagar Falls',
    description: '牛奶瀑布，果阿邦著名的四層瀑布。',
    mapUrl: 'https://maps.google.com/?q=Dudhsagar+Falls'
  },
  'mumbai_city': {
    id: 'mumbai_city',
    title: 'Mumbai City Tour',
    description: 'Gateway of India, Taj Mahal Palace, Colaba Causeway, CST Station.',
    mapUrl: 'https://maps.google.com/?q=Gateway+of+India'
  },
  'backpacker_cowies': {
    id: 'backpacker_cowies',
    title: 'Backpacker Cowies',
    description: '位於 Colaba 的背包客棧，位置極佳。',
    address: '15, Walton Road, Colaba, Mumbai',
    reservation: {
      id: 'NT887',
      sections: [{ title: '住宿資訊', items: [{ label: '3晚費用', value: '2517 rs' }] }]
    }
  }
};

export const ITINERARY: DaySchedule[] = [
  {
    date: '3/28',
    weekday: '週六',
    title: 'TPE → SIN → Trivandrum',
    accommodation: 'Safire Residency',
    mapUrl: 'https://maps.google.com/?q=Trivandrum',
    events: [
      { time: '01:45', description: 'TPE (TR 897) 起飛', note: '前往新加坡轉機' },
      { time: '06:25', description: '抵達 SIN T1', note: '轉機停留 14hr' },
      { time: '20:30', description: 'SIN (TR 530) 起飛' },
      { time: '22:15', description: '抵達 Trivandrum (TRV)', note: '辦理入境手續' },
      { time: '23:30', description: '入住 Safire Residency', locationId: 'safire_residency' }
    ]
  },
  {
    date: '3/29',
    weekday: '週日',
    title: 'Trivandrum → Varkala',
    accommodation: 'The Hostel Stories',
    mapUrl: 'https://maps.google.com/?q=Varkala',
    events: [
      { time: '05:00', description: 'Sree Padmanabhaswamy Temple', isHighlight: true, locationId: 'padmanabhaswamy' },
      { time: '08:00', description: 'Attukal Bhagavathy Temple & 早餐' },
      { time: '12:15', description: '搭乘火車前往 Varkala', note: 'Kerala SF Exp (12625) / 12:52 抵達' },
      { time: '14:30', description: 'Ponnumthuruthu (Golden) Island' },
      { time: '17:00', description: 'Cafe Sarwaa & Varkala Cliff 夕陽', isHighlight: true, locationId: 'varkala_cliff' },
      { time: '19:00', description: '入住 The Hostel Stories', locationId: 'hostel_stories' }
    ]
  },
  {
    date: '3/30',
    weekday: '週一',
    title: 'Varkala → Kochi',
    accommodation: 'Bastian Homestay',
    mapUrl: 'https://maps.google.com/?q=Kochi',
    events: [
      { time: '05:00', description: 'Janardana Swamy Temple' },
      { time: '09:55', description: '搭乘火車前往 Kochi', note: 'Nethravathi Exp (16346) / 13:45 抵達 Ernakulam' },
      { time: '15:00', description: '入住 Bastian Homestay', locationId: 'bastian_homestay' },
      { time: '16:00', description: 'Fusion Bay 晚餐' },
      { time: '17:00', description: 'Kathakali 傳統舞蹈表演', isHighlight: true, locationId: 'kathakali' }
    ]
  },
  {
    date: '3/31',
    weekday: '週二',
    title: 'Kochi Backwaters',
    accommodation: 'Bastian Homestay',
    events: [
      { time: '08:30', description: 'Kochi Backwater 遊船', isHighlight: true, note: '體驗迴水潟湖生態 (至 16:00)' },
      { time: '16:30', description: 'Chinese Fishing Nets 夕陽', locationId: 'kochi_nets' },
      { time: '18:00', description: 'Warehouse Cafe Fortkochi' }
    ]
  },
  {
    date: '4/01',
    weekday: '週三',
    title: 'Kochi → Thrissur',
    accommodation: 'Hotel Eden Palace',
    events: [
      { time: '05:00', description: 'Chottanikkara Bhagavathy Temple' },
      { time: '08:00', description: 'Mattancherry Palace & Jew Town', isHighlight: true },
      { time: '10:00', description: 'Paradesi Synagogue' },
      { time: '13:00', description: 'Kayees Rahmathulla Cafe' },
      { time: '19:20', description: '搭乘火車前往 Thrissur', note: 'Mail (12624) / 20:40 抵達' },
      { time: '21:00', description: '入住 Hotel Eden Palace', locationId: 'hotel_eden_palace' }
    ]
  },
  {
    date: '4/02',
    weekday: '週四',
    title: 'Thrissur → Kannur',
    accommodation: 'KTDC Folk Land',
    events: [
      { time: '05:00', description: 'Vadakkumnathan Temple' },
      { time: '08:00', description: 'Guruvayur Sri Krishna Temple', locationId: 'guruvayur' },
      { time: '10:00', description: 'Punnathur Kotta (大象營)' },
      { time: '15:40', description: '搭乘火車前往 Kannur', note: 'Gimb Humsafar (20923) / 19:47 抵達' },
      { time: '20:30', description: '入住 KTDC Folk Land', locationId: 'ktdc_folk_land' }
    ]
  },
  {
    date: '4/03',
    weekday: '週五',
    title: 'Kannur → Udupi',
    accommodation: 'Hotel Swadesh Heritage',
    events: [
      { time: '05:00', description: 'Parassinikadavu Muthappan Temple' },
      { time: '09:00', description: 'St. Angelo Fort Kannur' },
      { time: '13:00', description: 'Hotel Odhen\'s 午餐' },
      { time: '17:55', description: '搭乘火車前往 Udupi', note: 'TVCN YNRK SF EX (22659) / 21:20 抵達' },
      { time: '22:00', description: '入住 Hotel Swadesh Heritage', locationId: 'hotel_swadesh' }
    ]
  },
  {
    date: '4/04',
    weekday: '週六',
    title: 'Udupi → Murudeshwar',
    accommodation: 'Moonstar Guesthouse',
    events: [
      { time: '05:00', description: 'Udupi Sri Krishna Matha' },
      { time: '10:42', description: '搭乘火車前往 Murudeshwar', note: 'SMVB MRDW EXP (16585) / 12:55 抵達' },
      { time: '14:30', description: 'Shri Murudeshwara Shiva Temple', isHighlight: true, locationId: 'murudeshwar_temple' },
      { time: '18:00', description: 'Nayak Fish Land 晚餐' },
      { time: '19:30', description: '入住 Moonstar Guesthouse', locationId: 'moonstar_guesthouse' }
    ]
  },
  {
    date: '4/05',
    weekday: '週日',
    title: 'Murudeshwar → Gokarna',
    accommodation: 'Katyayani Residency',
    events: [
      { time: '06:06', description: '搭乘火車前往 Gokarna Road', note: 'Panchaganga Exp (16595) / 06:57 抵達' },
      { time: '09:00', description: 'Mahabaleshwar Temple & Ganapati Temple' },
      { time: '15:00', description: 'Kudle Beach 放鬆', isHighlight: true, locationId: 'gokarna_beaches' },
      { time: '17:00', description: 'Mantra Cafe 夕陽' },
      { time: '19:00', description: '入住 Katyayani Residency', locationId: 'katyayani_residency' }
    ]
  },
  {
    date: '4/06',
    weekday: '週一',
    title: 'Gokarna → Goa',
    accommodation: 'Peaceful Guest House',
    events: [
      { time: '08:30', description: '搭乘火車前往 Goa (Madgaon)', note: 'Marusagar SF Exp (12977) / 10:30 抵達' },
      { time: '13:00', description: 'Mangeshi Temple' },
      { time: '15:00', description: 'Immaculate Conception Church' },
      { time: '18:00', description: 'Kokni Kanteen 晚餐' },
      { time: '20:00', description: '入住 Peaceful Guest House', locationId: 'peaceful_guesthouse' }
    ]
  },
  {
    date: '4/07',
    weekday: '週二',
    title: 'Goa Exploration',
    accommodation: 'Peaceful Guest House',
    events: [
      { time: '09:00', description: 'Dudhsagar Falls (牛奶瀑布)', isHighlight: true, locationId: 'dudhsagar' },
      { time: '14:00', description: 'Sahakari Spice Farm 香料園' },
      { time: '17:00', description: 'Shri Shantadurga Temple' },
      { time: '19:00', description: 'The Fisherman\'s Wharf Panjim' }
    ]
  },
  {
    date: '4/08',
    weekday: '週三',
    title: 'Goa → Mumbai',
    accommodation: 'Night Train',
    events: [
      { time: '09:00', description: 'Basilica de Bom Jesus (世界遺產)', isHighlight: true },
      { time: '11:00', description: 'Se Cathedral' },
      { time: '13:00', description: 'Archaeological Museum' },
      { time: '19:00', description: '搭乘夜車前往 Mumbai', note: 'Konkan Kanya Exp (20112) / 隔日 05:40 抵達' }
    ]
  },
  {
    date: '4/09',
    weekday: '週四',
    title: 'Mumbai City',
    accommodation: 'Backpacker Cowies',
    events: [
      { time: '05:40', description: '抵達 Mumbai CSMT 車站' },
      { time: '07:00', description: 'Olympia Coffee House 早餐' },
      { time: '09:00', description: 'Shree Siddhivinayak Temple' },
      { time: '11:00', description: 'Shri Mahalakshmi Temple' },
      { time: '13:00', description: 'Britannia & Co. 午餐' },
      { time: '15:00', description: 'Crawford Market & Kyani & Co.' },
      { time: '18:00', description: '入住 Backpacker Cowies', locationId: 'backpacker_cowies' }
    ]
  },
  {
    date: '4/10',
    weekday: '週五',
    title: 'Mumbai Shopping',
    accommodation: 'Backpacker Cowies',
    events: [
      { time: '11:00', description: 'Phoenix Marketcity 購物' },
      { time: '17:00', description: 'Bagdadi Restaurant' },
      { time: '19:00', description: 'Bademiya - Colaba 街頭小吃', isHighlight: true }
    ]
  },
  {
    date: '4/11',
    weekday: '週六',
    title: 'Mumbai → KL',
    accommodation: 'Flight',
    events: [
      { time: '09:00', description: 'Sassoon Dock & Leopold Cafe' },
      { time: '13:00', description: 'Gateway Of India', isHighlight: true, locationId: 'mumbai_city' },
      { time: '19:00', description: '前往 Mumbai 機場 (BOM)' },
      { time: '23:25', description: 'BOM (MH195) 起飛', note: '前往吉隆坡' }
    ]
  },
  {
    date: '4/12',
    weekday: '週日',
    title: 'KL → TPE',
    accommodation: 'Home',
    events: [
      { time: '07:25', description: '抵達 KUL T1' },
      { time: '09:15', description: 'KUL (MH366) 起飛' },
      { time: '14:10', description: '返抵桃園機場 (TPE)', isHighlight: true }
    ]
  }
];
