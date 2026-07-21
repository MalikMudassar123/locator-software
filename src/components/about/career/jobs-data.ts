export type Job = {
  slug: string
  title: string
  department: string
  /** Country the role is filtered by on the listing page. */
  country: string
  location: string
  type: string
  intro: string
  responsibilities: string[]
  requirements: string[]
  /** Single yes/no screening question shown on the application form. */
  screeningQuestion: string
}

export const JOBS: Job[] = [
  {
    slug: 'sales-executive',
    title: 'Sales Executive',
    department: 'Sales',
    country: 'United Arab Emirates',
    location: 'Dubai, United Arab Emirates',
    type: 'On-site · Full-time',
    intro:
      'We are looking for a driven and results-oriented Sales Executive to join our growing team. The ideal candidate will play a key role in expanding our client base by promoting our advanced GPS tracking systems and innovative software solutions. This role requires strong communication skills, a proactive approach to sales, and the ability to understand and present technical products effectively.',
    responsibilities: [
      'Identify, approach, and engage with potential clients who can benefit from GPS tracking and software solutions.',
      'Conduct effective product presentations and live demonstrations tailored to client needs.',
      'Execute active sales strategies including cold calling, door-to-door visits, field marketing, and scheduled client meetings.',
      'Generate and follow up on leads to convert proposals into successful sales.',
      'Build and maintain long-term business relationships through consistent communication and high-quality after-sales support.',
      'Stay updated on market trends, competitor offerings, and client requirements to support strategic sales planning.',
      'Prepare accurate reports on sales activities, forecasts, and client feedback.',
    ],
    requirements: [
      'Strong communication skills in English (spoken and written).',
      '1–2 years of experience in sales, preferably in GPS systems, ERP, CRM, or other IT/software products.',
      'Ability to understand, explain, and demonstrate technical products clearly to clients.',
      'Proactive, self-motivated, and comfortable with field sales activities.',
      'Male candidates from Kerala are preferred.',
      'Valid UAE driving license is an advantage.',
      'Strong negotiation skills and a customer-centric approach.',
    ],
    screeningQuestion: 'Do you have prior experience in GPS systems, ERP, CRM, or other IT/software sales?',
  },
  {
    slug: 'it-technical-support',
    title: 'IT Technical Support',
    department: 'IT Support',
    country: 'United Arab Emirates',
    location: 'Dubai, United Arab Emirates',
    type: 'On-site · Full-time',
    intro:
      'The IT Technical Support will be responsible for providing professional, responsive, and high-quality support to clients using Synosys Technologies software products. This role involves resolving technical issues, delivering product training, and ensuring a seamless user experience through outstanding customer service.',
    responsibilities: [
      'Respond promptly to customer inquiries via phone, email, and in-person.',
      'Provide software training, product demonstrations, and feature walkthroughs to clients.',
      'Diagnose and resolve technical issues related to software products and IT systems.',
      'Ensure a high level of customer satisfaction through courteous, efficient, and solution-oriented support.',
      'Log and document support activities, technical resolutions, and client feedback in the internal system.',
      'Coordinate with the development team to escalate unresolved issues and track resolution progress.',
      'Assist in improving support processes and contribute to knowledge-base documentation.',
    ],
    requirements: [
      'Male candidates from Kerala are preferred.',
      '1–2 years of experience in IT support or software customer service.',
      'Strong understanding of IT support processes, troubleshooting methodologies, and support tools.',
      'Bachelor’s degree in IT, Computer Science, Electronics & Communication, or a related field.',
      'Excellent verbal and written English communication skills.',
      'Strong analytical thinking, problem-solving skills, and a customer-first attitude.',
      'Ability to learn new software systems quickly and adapt to technical challenges.',
      'UAE driving license is an added advantage.',
    ],
    screeningQuestion: 'Do you have prior experience in IT support or software customer service?',
  },
  {
    slug: 'gps-field-technician',
    title: 'GPS Field Technician',
    department: 'Field Operations',
    country: 'United Arab Emirates',
    location: 'Dubai, United Arab Emirates',
    type: 'On-site · Full-time',
    intro:
      'We are seeking a skilled and reliable Technician with experience in CCTV installation, auto electrical systems, or GPS tracking device setup. The ideal candidate should have hands-on technical expertise, strong problem-solving abilities, and the capability to perform field installations with accuracy and professionalism.',
    responsibilities: [
      'Install, configure, and troubleshoot CCTV cameras, access control systems, and related software.',
      'Perform field installations.',
      'Diagnose and resolve technical issues during installation or maintenance visits.',
      'Ensure proper testing, calibration, and verification of installed equipment.',
      'Provide on-site technical support and respond to client inquiries promptly.',
    ],
    requirements: [
      'Degree, ITI/ITC, or Diploma in Electronics, Electrical, IT, or related field.',
      '1–3 years of relevant work experience in CCTV installation, auto electrical work, or GPS tracker installation.',
      'Mandatory: previous field installation experience.',
      'Strong understanding of embedded systems and basic electronic principles.',
      'Good communication and customer-handling skills.',
      'Ability to work independently and manage field tasks efficiently.',
      'Male candidates, preferably from India.',
    ],
    screeningQuestion: 'Do you have hands-on field installation experience (CCTV, GPS trackers, or auto electrical)?',
  },
]

export function getJob(slug: string) {
  return JOBS.find((j) => j.slug === slug)
}
