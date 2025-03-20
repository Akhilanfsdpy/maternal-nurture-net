
import { chatbotResponses } from '@/data/healthCheckupData';

// Determine the response category based on user input
export const categorizeInput = (input: string): keyof typeof chatbotResponses => {
  const inputLower = input.toLowerCase();
  
  if (inputLower.includes('growth') || inputLower.includes('weight') || inputLower.includes('height') || 
      inputLower.includes('tall') || inputLower.includes('big') || inputLower.includes('measure')) {
    return 'growth';
  } 
  else if (inputLower.includes('feed') || inputLower.includes('eat') || inputLower.includes('formula') || 
           inputLower.includes('breastfeed') || inputLower.includes('hungry') || inputLower.includes('milk')) {
    return 'feeding';
  } 
  else if (inputLower.includes('sleep') || inputLower.includes('nap') || inputLower.includes('bed') || 
           inputLower.includes('night') || inputLower.includes('awake') || inputLower.includes('tired')) {
    return 'sleep';
  } 
  else if (inputLower.includes('milestone') || inputLower.includes('development') || inputLower.includes('crawl') || 
           inputLower.includes('sit') || inputLower.includes('roll') || inputLower.includes('walk') || 
           inputLower.includes('talk') || inputLower.includes('smile')) {
    return 'milestones';
  }
  else if (inputLower.includes('symptom') || inputLower.includes('sick') || inputLower.includes('fever') || 
           inputLower.includes('rash') || inputLower.includes('diarrhea') || inputLower.includes('cough') || 
           inputLower.includes('cold') || inputLower.includes('vomit') || inputLower.includes('pain')) {
    return 'symptoms';
  }
  else if (inputLower.includes('doctor') || inputLower.includes('appointment') || inputLower.includes('visit') || 
           inputLower.includes('checkup') || inputLower.includes('schedule') || inputLower.includes('hospital')) {
    return 'appointment';
  }
  else if (inputLower.includes('emergency') || inputLower.includes('urgent') || inputLower.includes('help') || 
           inputLower.includes('serious') || inputLower.includes('immediately') || inputLower.includes('critical')) {
    return 'emergency';
  } 
  else {
    return 'default';
  }
};

// Get a random response from the appropriate category
export const getResponse = (category: keyof typeof chatbotResponses): string => {
  const responses = chatbotResponses[category];
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};
