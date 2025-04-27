'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import {useState} from 'react';
import {generateInterviewFeedback} from '@/ai/flows/generate-interview-feedback';
import {Loader2} from 'lucide-react';

interface Company {
  name: string;
  logo: string;
}

const predefinedCompanies: Company[] = [
  {name: 'Google', logo: 'google.com'},
  {name: 'Microsoft', logo: 'microsoft.com'},
  {name: 'Amazon', logo: 'amazon.com'},
  {name: 'Facebook', logo: 'facebook.com'},
  {name: 'Apple', logo: 'apple.com'},
  {name: 'Netflix', logo: 'netflix.com'},
];

const predefinedRounds = ['First Round', 'Technical Interview', 'Final Round'];

const predefinedRejectionReasons = [
  'Lack of experience',
  'Poor communication skills',
  'Not a good fit for the company culture',
  'Technical skills lacking',
  'Better candidate found',
];

export default function Home() {
  const [interviewDetails, setInterviewDetails] = useState({
    company: '',
    round: '',
    rejectionReason: '',
  });

  const [isOtherCompany, setIsOtherCompany] = useState(false);
  const [isOtherRound, setIsOtherRound] = useState(false);
  const [isOtherRejectionReason, setIsOtherRejectionReason] = useState(false);
  const [companies, setCompanies] = useState<Company[]>(predefinedCompanies);
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
    <div className="container mx-auto p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Interview Tracking Card */}
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
                {companies.map(company => (
                  <SelectItem key={company.name} value={company.name}>
                    {company.logo && (
                      <img
                        src={`https://logo.clearbit.com/${company.logo}`}
                        alt={company.name}
                        className="mr-2 h-5 w-5 rounded-full object-cover"
                      />
                    )}
                    {company.name}
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

            <Button type="submit" disabled={isLoading}>
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

      {/* AI Feedback Card */}
      {aiFeedback && (
        <Card className="bg-secondary">
          <CardHeader>
            <CardTitle>AI Interview Feedback</CardTitle>
            <CardDescription>Here's what our AI thinks about your interview:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <h3 className="text-lg font-semibold">Feedback:</h3>
              <p>{aiFeedback.feedback}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Improvement Plan:</h3>
              <p>{aiFeedback.improvementPlan}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Cheat Sheet:</h3>
              <p>{aiFeedback.cheatSheet}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
