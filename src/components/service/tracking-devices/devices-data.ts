export type DeviceSpec = { label: string; value: string }

export type Device = {
  slug: string
  name: string
  /** Short line shown on the catalog card. */
  tagline: string
  /** Full paragraph shown on the detail page. */
  body: string
  group: 'trackers' | 'accessories'
  image?: string
  imageW?: number
  imageH?: number
  specs?: DeviceSpec[]
  /** Rendered as a numbered list under "Where it fits". */
  useCases?: string[]
  comingSoon?: boolean
}

export const DEVICE_GROUPS = [
  {
    id: 'trackers' as const,
    eyebrow: 'GPS Trackers',
    title: 'Vehicle & asset trackers',
    lead: 'Teltonika terminals we install, configure, and support across the UAE — each one feeding straight into the LOCATOR platform.',
  },
  {
    id: 'accessories' as const,
    eyebrow: 'Sensors & Accessories',
    title: 'Sensors, readers & adapters',
    lead: 'The add-ons that turn a tracker into a full telematics install — driver ID, fuel, temperature, and CAN bus data.',
  },
]

export const DEVICES: Device[] = [
  {
    slug: 'fmb120',
    name: 'FMB120',
    tagline: 'GNSS/GSM/Bluetooth tracker with internal antennas and battery',
    body: 'FMB120 is a small and professional tracker with internal high gain GSM and GNSS antennas, which is able to collect device coordinates and other useful data and transfer them via GSM network to server. This device is perfectly suitable for applications where location acquirement of remote objects is needed: fleet management, car rental companies, taxi companies, public transport, logistics companies, personal cars and so on. FMB120 can perform tasks on remote objects, such as monitoring engine status, controlling truck’s door etc.',
    group: 'trackers',
    image: '/tracking_devices/fmb120.webp',
    imageW: 600,
    imageH: 600,
    specs: [
      { label: 'Connectivity', value: 'GNSS / GSM / Bluetooth' },
      { label: 'Antennas', value: 'Internal high gain' },
      { label: 'Battery', value: 'Internal Li-Ion 170 mAh' },
      { label: 'Power supply', value: '10–30 V DC' },
    ],
    useCases: [
      'Fleet management and logistics operations',
      'Car rental, taxi, and public transport fleets',
      'Engine status monitoring and door control on remote objects',
    ],
  },
  {
    slug: 'fmb920',
    name: 'FMB920',
    tagline: 'Small and smart tracker with Bluetooth and internal backup battery',
    body: 'Teltonika FMB920 is a compact and smart tracker with Bluetooth connectivity, internal High Gain GNSS and GSM antennas and integrated backup battery. FMB920 is designed for light vehicles tracking in applications like insurance telematics, rental cars, recovery of stolen cars, public safety services, delivery transport, taxi and much more. Inputs/outputs extend device usage scenarios. Digital input can be used for ignition, door or alarm button status monitoring. Vehicle remote immobilizing may be achieved using FMB920 digital output.',
    group: 'trackers',
    image: '/tracking_devices/fmb920.webp',
    imageW: 600,
    imageH: 600,
    specs: [
      { label: 'Connectivity', value: 'GNSS / GSM / Bluetooth' },
      { label: 'Antennas', value: 'Internal high gain' },
      { label: 'Battery', value: 'Internal backup Li-Ion' },
      { label: 'I/O', value: 'Digital input & output' },
    ],
    useCases: [
      'Insurance telematics and rental car fleets',
      'Stolen vehicle recovery and public safety services',
      'Delivery transport and taxi operations',
      'Remote vehicle immobilizing via digital output',
    ],
  },
  {
    slug: 'fmb202',
    name: 'FMB202',
    tagline: 'Waterproof IP67 tracker with high capacity Ni-MH battery',
    body: 'Teltonika FMB202 is a SPECIAL waterproof (IP67) tracker with Bluetooth connectivity, internal high gain GNSS and GSM antennas and integrated high capacity backup battery. Device is designed to work longer without power supply. FMB202 with NiMH battery can work up to 2 days in power saving mode. FMB202 is perfectly suitable for agriculture, delivery, refrigerated transport, trailers tracking, security & emergency services and even more. 6–30V power supply makes FMB202 suitable for motorbikes and water transport.',
    group: 'trackers',
    image: '/tracking_devices/fmb202.webp',
    imageW: 600,
    imageH: 600,
    specs: [
      { label: 'Protection', value: 'IP67 waterproof' },
      { label: 'Battery', value: 'Ni-MH 7.2 V 400 mAh' },
      { label: 'Autonomy', value: 'Up to 2 days in power saving' },
      { label: 'Power supply', value: '6–30 V DC' },
    ],
    useCases: [
      'Agriculture and refrigerated transport',
      'Trailer tracking without a permanent power source',
      'Security and emergency services',
      'Motorbikes and water transport',
    ],
  },
  {
    slug: 'ibutton-reader-tag',
    name: 'iButton Reader & Tag',
    tagline: 'Driver identification and immobilizer key accessory',
    body: 'One of the implemented features for fleet management devices is 1-Wire data protocol, which enables connection of iButton. The iButton device is perfect for any application where AVL data needs to travel along with a person or object identification.',
    group: 'accessories',
    image: '/tracking_devices/ibutton_.webp',
    imageW: 600,
    imageH: 600,
    specs: [
      { label: 'Protocol', value: '1-Wire' },
      { label: 'Function', value: 'Driver ID / immobilizer' },
    ],
    useCases: [
      'Driver authorization — restrict vehicle use to specific iButton owners and identify which driver is on the road.',
      'Immobilizer — without iButton authorization the engine starter cannot run and the vehicle cannot be used.',
    ],
  },
  {
    slug: 'rfid-reader-tag',
    name: 'RFID Reader & Tag',
    tagline: 'RFID reader and PVC cards for fleet management devices',
    body: 'RFID reader and PVC Cards for fleet management devices. Driver authorization gives the ability to use a vehicle only for specific RFID card owners and identify which driver is on the road.',
    group: 'accessories',
    image: '/tracking_devices/RFID_Reader.jpg',
    imageW: 522,
    imageH: 522,
    specs: [
      { label: 'Media', value: 'PVC cards / key fobs' },
      { label: 'Function', value: 'Driver ID' },
    ],
    useCases: [
      'Driver authorization for specific RFID card owners',
      'Identify which driver is on the road at any time',
    ],
  },
  {
    slug: 'fuel-sensor',
    name: 'Fuel Sensor',
    tagline: 'Capacitive fuel level sensor for tanks and vehicles',
    body: 'Coming shortly.',
    group: 'accessories',
    image: '/tracking_devices/Fuel_Sensor.jpg',
    imageW: 600,
    imageH: 600,
    comingSoon: true,
  },
  {
    slug: 'temperature-sensor',
    name: 'Temperature Sensor',
    tagline: 'Temperature sensor for fleet management devices',
    body: 'One of the implemented features for fleet management devices is 1-Wire data protocol, which enables connection of temperature sensors. It is a perfect accessory for temperature monitoring.',
    group: 'accessories',
    image: '/tracking_devices/Temperature.webp',
    imageW: 600,
    imageH: 600,
    specs: [
      { label: 'Protocol', value: '1-Wire' },
      { label: 'Function', value: 'Temperature monitoring' },
    ],
    useCases: [
      'Cold-chain and refrigerated transport monitoring',
      'Engine and cargo compartment temperature logging',
    ],
  },
  {
    slug: 'lv-can200',
    name: 'LV-CAN200',
    tagline: 'Light vehicle CAN adapter',
    body: 'Access to CAN Bus data enables fleet operators to report on a wide range of information. You can effectively identify areas of improvement within their vehicle operation to drive down overheads and minimize environmental impact.',
    group: 'accessories',
    image: '/tracking_devices/LVCAN.png',
    imageW: 600,
    imageH: 600,
    specs: [
      { label: 'Interface', value: 'CAN1 / CAN2' },
      { label: 'Power supply', value: '+12…24 V DC' },
      { label: 'Vehicle type', value: 'Light vehicles' },
    ],
    useCases: [
      'Read factory-accurate fuel, odometer, and engine data',
      'Identify areas of improvement in vehicle operation',
      'Drive down overheads and minimize environmental impact',
    ],
  },
  {
    slug: 'bluetooth-temperature-humidity',
    name: 'Bluetooth Temperature & Humidity',
    tagline: 'Wireless Bluetooth 4.0 LE temperature and humidity sensor',
    body: 'Extend device limits with the new Bluetooth 4.0 LE temperature and humidity sensor. Easy to set up, easy to use — Bluetooth wireless communication technology to monitor the temperature and humidity of your cargo.',
    group: 'accessories',
    image: '/tracking_devices/Temperature_Humidity_Sensor.png',
    imageW: 600,
    imageH: 600,
    specs: [
      { label: 'Connectivity', value: 'Bluetooth 4.0 LE' },
      { label: 'Measures', value: 'Temperature & humidity' },
      { label: 'Mounting', value: 'Wireless, adhesive puck' },
    ],
    useCases: [
      'Cargo temperature and humidity monitoring',
      'Cold-chain compliance without extra wiring',
    ],
  },
]

export function getDevice(slug: string) {
  return DEVICES.find((d) => d.slug === slug)
}
