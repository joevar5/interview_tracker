'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarSeparator, SidebarTrigger} from '@/components/ui/sidebar';
import {useState} from 'react';

export default function Home() {
  const [interviewDetails, setInterviewDetails] = useState({
    company: '',
    round: '',
    status: '',
    rejectionReason: '',
  });

  const handleChange = (e: any) => {
    setInterviewDetails({...interviewDetails, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // TODO: Implement the logic to save interview details and trigger AI feedback
    console.log('Interview Details:', interviewDetails);
  };

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
                <Input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={interviewDetails.company}
                  onChange={handleChange}
                />
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

