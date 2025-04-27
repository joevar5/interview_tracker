'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {useState, useEffect} from 'react';

interface Company {
  name: string;
  logo: string;
}

const data = [
  {name: 'Round 1', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Round 2', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Round 3', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Round 4', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Round 5', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Round 6', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Round 7', uv: 3490, pv: 4300, amt: 2100},
];

export default function Home() {
  const [interviewDetails, setInterviewDetails] = useState({
    company: '',
    round: '',
    rejectionReason: '',
  });

  const [isOtherCompany, setIsOtherCompany] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [aiFeedback, setAiFeedback] = useState<any>(null);
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Ensure generateInterviewFeedback is correctly typed to handle async calls
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
    }
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      const apiKey = process.env.NEXT_PUBLIC_SERPER_API_KEY;
      if (!apiKey) {
        console.error('Serper API key is missing. Please set the NEXT_PUBLIC_SERPER_API_KEY environment variable.');
        return;
      }
      try {
        const query = 'list of companies in the world';
        const apiUrl = `https://google.serper.dev/search?q=${query}`;

        const response = await fetch(apiUrl, {
          headers: {
            'X-API-KEY': apiKey,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.organic) {
          const extractedCompanies: Company[] = data.organic.map((item: any) => ({
            name: item.title.replace(/ - Crunchbase Company Profile$/, ''), //Cleans up the name from the API
            logo: item.website, // Use website as a placeholder, refine as needed.
          }));
          setCompanies(extractedCompanies);
        } else {
          console.warn('No organic results found in the Serper API response.');
        }
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    fetchCompanies();
  }, []);

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
            <Input
              type="text"
              name="round"
              placeholder="Round"
              value={interviewDetails.round}
              onChange={handleChange}
            />
            <Textarea
              name="rejectionReason"
              placeholder="Rejection Reason"
              value={interviewDetails.rejectionReason}
              onChange={handleChange}
            />
            <Button type="submit">Generate Feedback</Button>
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

      {/* Mock Performance Chart Card */}
      <Card className="bg-secondary">
        <CardHeader>
          <CardTitle>Interview Performance</CardTitle>
          <CardDescription>Visual representation of your interview performance over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
