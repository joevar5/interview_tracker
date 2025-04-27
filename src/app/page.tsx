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
import {generateInterviewFeedback} from '@/ai/flows/generate-interview-feedback';
import {Loader2} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {Badge} from '@/components/ui/badge';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

interface Company {
  name: string;
  logo: string;
}

const predefinedCompanies: Company[] = [
  {name: 'Amazon', logo: 'https://picsum.photos/id/237/40/40'},
  {name: 'Google', logo: 'https://picsum.photos/id/238/40/40'},
  {name: 'Microsoft', logo: 'https://picsum.photos/id/239/40/40'},
  {name: 'Facebook', logo: 'https://picsum.photos/id/240/40/40'},
  {name: 'Apple', logo: 'https://picsum.photos/id/241/40/40'},
  {name: 'Netflix', logo: 'https://picsum.photos/id/242/40/40'},
];

const predefinedRounds = ['First Round', 'Technical Interview', 'Final Round'];

const predefinedRejectionReasons = [
  'Poor communication skills',
  'Lack of experience',
  'Not a good fit for the company culture',
  'Technical skills lacking',
  'Better candidate found',
];

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
      const feedback = await generateInterviewFeedback({
        company: interviewDetails.company,
        round: interviewDetails.round,
        rejectionReason: interviewDetails.rejectionReason,
      });

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

      <div className="flex flex-wrap -mx-4">
        <div className="px-4 mb-4 w-full">
          <Card className="bg-secondary">
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
        </div>

        {aiFeedback && (
          <div className="px-4 mb-4 w-full">
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
                      <Badge className="mr-2">Feedback</Badge>
                    </AccordionTrigger>
                    <AccordionContent>{aiFeedback.feedback}</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="improvement-plan">
                    <AccordionTrigger>
                      <Badge className="mr-2">Improvement Plan</Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal pl-5">
                        {aiFeedback.improvementPlan.split('\n').map((step: string, index: number) =>
                          step.trim() !== '' ? (
                            <li key={index} className="mb-2">
                              {step}
                            </li>
                          ) : null
                        )}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="cheat-sheet">
                    <AccordionTrigger>
                      <Badge className="mr-2">Cheat Sheet</Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal pl-5">
                        {aiFeedback.cheatSheet.split('\n').map((item: string, index: number) =>
                          item.trim() !== '' ? (
                            <li key={index} className="mb-2">
                              {item}
                            </li>
                          ) : null
                        )}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <footer className="mt-8 text-center text-muted-foreground">
        <p>InterviewPilotDashboard © 2025 InterviewPilot</p>
      </footer>
    </div>
  );
}
