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

// Mock data for common companies
const commonCompanies = [
  {name: 'Google', logo: 'https://www.google.com/favicon.ico'},
  {name: 'Microsoft', logo: 'https://www.microsoft.com/favicon.ico'},
  {name: 'Amazon', logo: 'https://www.amazon.com/favicon.ico'},
  {name: 'Facebook', logo: 'https://www.facebook.com/favicon.ico'},
  {name: 'Apple', logo: 'https://www.apple.com/favicon.ico'},
];

export default function Home() {
  const [interviewDetails, setInterviewDetails] = useState({
    company: '',
    round: '',
    status: '',
    rejectionReason: '',
  });

  const [isOtherCompany, setIsOtherCompany] = useState(false);

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

  // Fetch common companies from an API endpoint (replace with your actual endpoint)
  useEffect(() => {
    // fetch('/api/common-companies')
    //   .then(response => response.json())
    //   .then(data => setCommonCompanies(data));
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
                    {commonCompanies.map(company => (
                      <SelectItem key={company.name} value={company.name}>
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="mr-2 h-5 w-5 rounded-full object-cover"
                        />
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
