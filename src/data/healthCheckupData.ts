
// Sample providers data
export const providers = [
  { id: "p1", name: "Dr. Emma Wilson", specialty: "Pediatrician" },
  { id: "p2", name: "Dr. Michael Chen", specialty: "Family Doctor" },
  { id: "p3", name: "Dr. Sarah Johnson", specialty: "Neonatologist" }
];

// Sample appointment types
export const appointmentTypes = [
  { id: "regular", name: "Regular Checkup", duration: "30 min" },
  { id: "vaccination", name: "Vaccination", duration: "15 min" },
  { id: "development", name: "Developmental Assessment", duration: "45 min" }
];

// Summary cards data
export const appointmentSummaryData = [
  {
    icon: "calendar",
    title: "Next Checkup",
    value: "Jun 15, 2023"
  },
  {
    icon: "hospital",
    title: "Primary Provider",
    value: "Dr. Sarah Johnson"
  },
  {
    icon: "calendar-check",
    title: "Last Visit",
    value: "May 10, 2023"
  }
];

// Chatbot responses by category
export const chatbotResponses = {
  growth: [
    "Your baby's growth is tracking well at the 60th percentile for weight and height. Would you like to see the detailed growth chart?",
    "Based on your baby's current measurements, they are developing at a healthy rate. Their weight gain is consistent with what we'd expect.",
    "Looking at the growth data, your baby is following their growth curve nicely. This suggests proper nutrition and development."
  ],
  feeding: [
    "For optimal feeding, newborns typically need to feed 8-12 times in 24 hours. Would you like me to help schedule feeding reminders?",
    "At this age, your baby should be consuming approximately 2-3 ounces per feeding. Are you noticing any feeding difficulties?",
    "Breastfed babies often feed more frequently than formula-fed babies. The current pattern you're describing is normal for their age."
  ],
  sleep: [
    "Newborns typically sleep 14-17 hours per day in short periods of 2-4 hours. Does this match your baby's patterns?",
    "At 3-6 months, many babies start developing more predictable sleep patterns. Have you considered establishing a bedtime routine?",
    "Sleep regression is common around 4 months, 8 months, and 18 months due to developmental leaps. Would you like tips for managing this?"
  ],
  milestones: [
    "Your baby should be reaching for objects at 3-4 months, sitting without support at 6 months, and may start crawling around 9 months. Would you like a detailed milestone tracker?",
    "Babbling and making consonant sounds typically begins around 6 months. Is your baby showing these communication developments?",
    "First steps often happen between 9-15 months. Every baby develops at their own pace, so this wide range is completely normal."
  ],
  symptoms: [
    "If your baby has a fever over 100.4°F (38°C), contact your doctor immediately. For mild symptoms, I can help you track them.",
    "Diaper rash is common and usually responds well to barrier creams and brief periods of diaper-free time. Would you like specific recommendations?",
    "Colic symptoms typically peak around 6 weeks and improve by 3-4 months. The '5 S's' method (swaddling, side/stomach position, shushing, swinging, and sucking) can help soothe a colicky baby."
  ],
  appointment: [
    "I can help you schedule a virtual consultation with a pediatrician. Would you prefer a video call or secure chat? Our next available appointments are tomorrow at 2 PM and 4 PM.",
    "Your baby's next recommended checkup should be at 9 months. Would you like me to show available appointment slots?",
    "Before your appointment, it's helpful to note any questions or concerns you want to discuss with the doctor. Would you like help preparing a list?"
  ],
  emergency: [
    "This sounds urgent. Please call your doctor or emergency services immediately. Signs that require immediate attention include difficulty breathing, prolonged high fever, and unusual lethargy.",
    "Based on what you're describing, this situation requires prompt medical attention. Please contact your healthcare provider right away.",
    "While waiting for medical help, keep your baby in a safe position, monitor their breathing, and do not give any medications unless directed by a healthcare professional."
  ],
  default: [
    "I'm here to help with maternal and newborn health questions. I can provide personalized advice on growth tracking, development milestones, feeding schedules, and more. What specific information are you looking for?",
    "I can assist with tracking your baby's development, scheduling appointments, or answering questions about common concerns. How can I help you today?",
    "As your AI health assistant, I'm here to provide guidance on newborn care, maternal health, and developmental milestones. What would you like to know?"
  ]
};
