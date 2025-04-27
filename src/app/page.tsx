'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {useState, useEffect} from 'react';

interface Company {
  name: string;
  logo: string;
}

export default function Home() {
  const [interviewDetails, setInterviewDetails] = useState({
    company: '',
    round: '',
    status: '',
    rejectionReason: '',
  });

  const [isOtherCompany, setIsOtherCompany] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // TODO: Implement the logic to save interview details and trigger AI feedback
    console.log('Interview Details:', interviewDetails);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_SERPER_API_KEY;
        if (!apiKey) {
          console.error('Serper API key is missing. Please set the NEXT_PUBLIC_SERPER_API_KEY environment variable.');
          return;
        }
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
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h2>InterviewPilot</h2>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Dashboard</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Interviews</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>AI Feedback</SidebarMenuButton>
            </SidebarMenuItem>
            {/* Add more menu items as needed */}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <p className="text-center text-xs">
            © {new Date().getFullYear()} InterviewPilot
          </p>
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 p-4">
        <div className="md:hidden">
          <SidebarTrigger className="block md:hidden" />
        </div>
        <div className="space-y-4">
          <Card>
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
                <Input
                  type="text"
                  name="status"
                  placeholder="Status"
                  value={interviewDetails.status}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="rejectionReason"
                  placeholder="Rejection Reason"
                  value={interviewDetails.rejectionReason}
                  onChange={handleChange}
                />
                <Button type="submit">Submit</Button>
              </form>
            </CardContent>
          </Card>
          {/* AI Feedback and other components will be added here */}
        </div>
      </div>
    </SidebarProvider>
  );
}
