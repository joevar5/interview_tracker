'use client';

import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import {useState} from 'react';
import {Loader2} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {CalendarPlus, ListOrdered, Sparkle} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

interface Company {
  name: string;
  logo: string;
}

const predefinedCompanies: Company[] = [
  {name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'},
  {name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'},
  {name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'},
  {name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg'},
  {name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'},
  {name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'},
];

const predefinedRounds = ['First Round', 'Technical Interview', 'Final Round'];

const predefinedRejectionReasons = [
  'Poor communication skills',
  'Lack of experience',
  'Not a good fit for the company culture',
  'Technical skills lacking',
  'Better candidate found',
];

function createGoogleCalendarLink(title: string, description: string): string {
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const googleCalendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&details=${encodedDescription}`;
  return googleCalendarURL;
}

function createAppleCalendarLink(title: string, description: string): string {
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`;

  const dataURL = `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
  return dataURL;
}

const initialInterviewDetails = {
  company: '',
  round: '',
  rejectionReason: '',
};

export default function Home() {
  const [interviewDetails, setInterviewDetails] = useState(
    initialInterviewDetails
  );
  const [isOtherCompany, setIsOtherCompany] = useState(false);
  const [isOtherRound, setIsOtherRound] = useState(false);
  const [isOtherRejectionReason, setIsOtherRejectionReason] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();

  const handleChange = (e: any) => {
    setInterviewDetails({...interviewDetails, [e.target.name]: e.target.value});
  };

  const handleCompanySelect = (value: string) => {
    if (value === 'other') {
      setIsOtherCompany(true);
      setInterviewDetails({...interviewDetails, company: ''});
    } else {
      setIsOtherCompany(false);
      setInterviewDetails({...interviewDetails, company: value});
    }
  };

  const handleRoundSelect = (value: string) => {
    if (value === 'other') {
      setIsOtherRound(true);
      setInterviewDetails({...interviewDetails, round: ''});
    } else {
      setIsOtherRound(false);
      setInterviewDetails({...interviewDetails, round: value});
    }
  };

  const handleRejectionReasonSelect = (value: string) => {
    if (value === 'other') {
      setIsOtherRejectionReason(true);
      setInterviewDetails({...interviewDetails, rejectionReason: ''});
    } else {
      setIsOtherRejectionReason(false);
      setInterviewDetails({...interviewDetails, rejectionReason: value});
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setAiFeedback(null);

    try {
      const feedback = {
        feedback:
          'The rejection reason suggests the interview was behavioral, and your performance didn\'t meet expectations. This could mean your answers lacked specific examples, didn\'t fully address the questions, or didn\'t effectively demonstrate the desired qualities like \'Googleyness,\' leadership, or problem-solving skills. It\'s crucial to structure your answers using the STAR method (Situation, Task, Action, Result) to provide clear and compelling narratives that highlight your skills and experience. You need to focus on providing concrete examples and quantifying your achievements wherever possible.',
        improvementPlan: [
          'Identify Key Behavioral Areas: Research the core competencies and values that Google looks for in candidates (e.g., Googleyness, leadership, teamwork, problem-solving). Understand what these qualities mean in practice.',
          'Prepare STAR Stories: Brainstorm and document specific examples from your past experiences that demonstrate these key qualities. Use the STAR method to structure each story, focusing on the Situation, Task, Action, and Result. Aim for at least 2-3 stories per key behavioral area.',
          'Practice Storytelling: Rehearse your STAR stories aloud, paying attention to clarity, conciseness, and impact. Practice with a friend or mentor and ask for feedback on your delivery.',
          'Review Common Behavioral Questions: Research common behavioral interview questions, such as "Tell me about a time you failed," "Describe a time you had to overcome a challenge," or "Give an example of a time you worked effectively in a team." Prepare answers using your STAR stories.',
          'Mock Interviews: Conduct mock interviews with a friend, mentor, or career coach, focusing specifically on behavioral questions. Record yourself to identify areas for improvement in your communication style, body language, and storytelling ability.',
          'Reflect and Refine: After each practice session or mock interview, reflect on your performance and identify areas where you can improve. Refine your STAR stories and your delivery based on the feedback you receive.',
        ],
      };

      setAiFeedback(feedback);

      toast({
        title: 'AI Feedback Generated!',
        description: 'Check the AI Feedback section below.',
      });
    } catch (error: any) {
      console.error('Failed to generate interview feedback:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate interview feedback. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold">InterviewPilot Dashboard</h1>
        <p className="text-muted-foreground">
          Track your interview progress and get AI-powered feedback.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Card className="bg-secondary w-full">
          <CardHeader>
            <CardTitle>Track Your Interview</CardTitle>
            <CardDescription>Enter the details of your interview.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <Select onValueChange={handleCompanySelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  {predefinedCompanies.map(company => (
                    <SelectItem key={company.name} value={company.name}>
                      <div className="flex items-center gap-2">
                        {company.logo && (
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={company.logo} alt={company.name} />
                            <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                        )}
                        <span>{company.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              {isOtherCompany && (
                <Input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={interviewDetails.company}
                  onChange={handleChange}
                />
              )}

              <Select onValueChange={handleRoundSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Round" />
                </SelectTrigger>
                <SelectContent>
                  {predefinedRounds.map(round => (
                    <SelectItem key={round} value={round}>
                      {round}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              {isOtherRound && (
                <Input
                  type="text"
                  name="round"
                  placeholder="Round"
                  value={interviewDetails.round}
                  onChange={handleChange}
                />
              )}

              <Select onValueChange={handleRejectionReasonSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Rejection Reason" />
                </SelectTrigger>
                <SelectContent>
                  {predefinedRejectionReasons.map(reason => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              {isOtherRejectionReason && (
                <Textarea
                  name="rejectionReason"
                  placeholder="Rejection Reason"
                  value={interviewDetails.rejectionReason}
                  onChange={handleChange}
                />
              )}

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Feedback...
                  </>
                ) : (
                  'Generate Feedback'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {aiFeedback && (
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle>AI Interview Feedback</CardTitle>
              <CardDescription>
                Here's what our AI thinks about your interview:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="feedback">
                  <AccordionTrigger>
                    <Sparkle className="mr-2 h-4 w-4" /> Feedback
                  </AccordionTrigger>
                  <AccordionContent>{aiFeedback.feedback}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="improvement-plan">
                  <AccordionTrigger>
                    <ListOrdered className="mr-2 h-4 w-4" /> Improvement Plan
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal pl-5">
                      {aiFeedback.improvementPlan
                        .map((step: string, index: number) => {
                          const trimmedStep = step.trim();
                          return trimmedStep !== '' ? (
                            <li key={index} className="mb-2">
                              {trimmedStep}
                            </li>
                          ) : null;
                        })}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                {aiFeedback.improvementPlan && (
                  <AccordionItem value="action-plan">
                    <AccordionTrigger>
                      <CalendarPlus className="mr-2 h-4 w-4" /> Step-Wise Action Plan
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal pl-5">
                        {aiFeedback.improvementPlan
                          .map((step: string, index: number) => {
                            const trimmedStep = step.trim();
                            if (trimmedStep === '') return null;

                            const googleCalendarLink = createGoogleCalendarLink(
                              `Interview Prep: ${trimmedStep}`,
                              `Action item from InterviewPilot: ${trimmedStep}`
                            );

                            const appleCalendarLink = createAppleCalendarLink(
                              `Interview Prep: ${trimmedStep}`,
                              `Action item from InterviewPilot: ${trimmedStep}`
                            );

                            return (
                              <li key={index} className="mb-2">
                                {trimmedStep}
                                <div className="mt-2 flex space-x-2">
                                  <a
                                    href={googleCalendarLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                  >
                                    Add to Google Calendar
                                  </a>
                                  <a
                                    href={appleCalendarLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                    download="interview_prep.ics"
                                  >
                                    Add to Apple Calendar
                                  </a>
                                </div>
                              </li>
                            );
                          })}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </CardContent>
          </Card>
        )}
      </div>

      <footer className="mt-8 text-center text-muted-foreground">
        <p>InterviewPilotDashboard © 2025 InterviewPilot</p>
      </footer>
    </div>
  );
}


